import axios from 'axios';
import { getAccessToken, getRefreshToken, setAccessToken } from '../Services/LocalStorageTokenService';

const BASE_URL = 'http://127.0.0.1:8000/api';

export const axiosApi = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": 'application/json', // change according header type accordingly
    },
});

// request interceptor to add authorization header

axiosApi.interceptors.request.use(
    //     on success 
    (config) => {
        const access = getAccessToken();
        if (access) {
            config.headers.Authorization = `Token ${access}`
        }
        return config
    }
    // on failure
    ,
    (error) => {
        return Promise.reject(error);
    }

)

// response interceptor

axiosApi.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && originalRequest.url === 'http://127.0.0.1:8000/api/token/') {
            return Promise.reject(error)
        }
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = getRefreshToken()
            if (refreshToken) {
                try {
                    const response = await axios.post(`${BASE_URL}/token/refresh`, { refresh: refreshToken });
                    // don't use axios instance that already configured for refresh token api call
                    const newAccessToken = response.data.access;
                    setAccessToken(newAccessToken)  //set new access token
                    originalRequest.headers.Authorization = `Token ${newAccessToken}`;
                    return axios(originalRequest); //recall Api with new token
                } catch (error) {
                    // Handle token refresh failure
                    // mostly logout the user and re-authenticate by login 
                    window.location.href = `/teacher-login`
                }
            }
        }
        return Promise.reject(error);
    }
);