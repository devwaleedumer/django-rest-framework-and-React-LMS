import customFetchBase from "../../../utils/Api/customBaseFetch";
import { userApi } from "../user/userApi";
import { createApi } from "@reduxjs/toolkit/query/react";
export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: customFetchBase,
    tagTypes: ["Auth"],
    endpoints: (builder) => ({
        registerUser: builder.mutation<any, any>({
            query: (data) => {
                const formData = new FormData()
                Object.entries(data).forEach(([key, value]) => formData.append(key, value))
                console.log(formData)
                return {
                    url: "/register-teacher/",
                    method: "POST",
                    body: formData,
                    prepareHeaders: (headers) => {
                        headers.set("Content-Type", "multipart/form-data")
                        return headers
                    },
                };
            }, invalidatesTags: ["Auth"]
        }),
        registerStudent: builder.mutation<any, any>({
            query: (data) => {
                data.enrolledclass = parseInt(data.enrolledclass)
                const formData = new FormData()
                Object.entries(data).forEach(([key, value]) => formData.append(key, value))
                return {
                    url: "/register-student/",
                    method: "POST",
                    body: formData,
                    prepareHeaders: (headers) => {
                        headers.set("Content-Type", "multipart/form-data")
                        return headers
                    },
                };
            }, invalidatesTags: ["Auth"]
        }),
        loginUser: builder.mutation<any, any>({
            query: (data) => {
                console.log(data)
                return {
                    "Content-Type": "application/json",
                    url: "/token/",
                    method: "POST",
                    body: data,
                };
            },
            async onQueryStarted(_args, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    await dispatch(userApi.endpoints.getMe.initiate(null));
                } catch (error) {
                    console.log(error)
                }
            },
        }),
        refresh: builder.mutation({
            query: () => {
                return {
                    url: "/token/refresh/",
                    method: "POST",
                };
            },
        }),
        accountConfirmation: builder.query<any, { uid: string, token: string }>({
            query: ({ uid, token }) => {
                return {
                    url: `/verify-email/?uid=${uid}&token=${token}`,
                    method: "GET",
                };
            },
        }),


    }),
});
export const {
    useLoginUserMutation,
    useRefreshMutation,
    useRegisterUserMutation,
    useAccountConfirmationQuery,
    useRegisterStudentMutation
} = authApi;
