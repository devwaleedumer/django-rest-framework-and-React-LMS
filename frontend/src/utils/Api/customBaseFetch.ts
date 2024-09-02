import {
    BaseQueryFn,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';
import { cleanUser } from '../../redux/features/user/userSlice';
import { getAccessToken, getRefreshToken, logout, setAccessToken } from '../Services/LocalStorageTokenService';


// Create a new mutex
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:8000/api',
    prepareHeaders: (headers) => {
        const token = getAccessToken()

        // If we have a token set in state, let's assume that we should be passing it.
        if (token) {
            headers.set('Authorization', `Bearer ${token}`)
        }

        return headers
    },
});

const customFetchBase: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    // wait until the mutex is available without locking it
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, extraOptions);
    if (result?.error?.status === 401 && (args as FetchArgs).url !== '/token/') {
        console.log((args as FetchArgs).url!)
        if (!mutex.isLocked()) {
            // lock acquired
            const release = await mutex.acquire();
            const refresh = getRefreshToken()
            try {
                const refreshResult = await baseQuery(
                    { url: '/token/refresh/', method: "POST", body: { refresh } },
                    api,
                    extraOptions
                );

                if (refreshResult.data && refreshResult.meta.response.status === 200) {
                    // Retry the initial query
                    setAccessToken(refreshResult.data.access)
                    const newArgs = args as FetchArgs
                    // (newArgs.headers as Headers)?.set('Authorization', `Bearer ${refreshResult.data?.access}`)
                    newArgs.headers = {
                        ...newArgs.headers,
                        "AUTHORIZATION": `${refreshResult.data.access}`
                    }
                    result = await baseQuery(newArgs, api, extraOptions);
                } else {
                    api.dispatch(cleanUser());
                    logout()
                    window.location.href = '/teacher-login';
                }
            } finally {
                // release must be called once the mutex should be released again.
                release();
            }
        } else {
            // wait until the mutex is available without locking it
            await mutex.waitForUnlock();
            result = await baseQuery(args, api, extraOptions);
        }
    }

    return result;
};

export default customFetchBase;