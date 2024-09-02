import { createApi, } from '@reduxjs/toolkit/query/react'
import { setUser } from "./userSlice";
import customFetchBase from '../../../utils/Api/customBaseFetch';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: customFetchBase,
    tagTypes: ['User', "Chat"],
    endpoints: (builder) => ({
        getMe: builder.query({
            query() {
                return {
                    url: '/me/',
                    method: 'GET'
                };
            },
            providesTags: ['User'],
            async onQueryStarted(_args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setUser(data));
                } catch (error) {
                    console.log(error)
                }
            },
        }),
        updateProfile: builder.mutation<any, any>({
            query: (data) => {
                if (data.profile_picture === null) {
                    delete data.profile_picture
                }
                const formData = new FormData()
                Object.entries(data).forEach(([key, value]) => formData.append(key, value))
                return {
                    url: `/update-teacher-profile/${data.id}/`,
                    method: "PUT",
                    body: formData,
                    prepareHeaders: (headers) => {
                        headers.set("Content-Type", "multipart/form-data")
                        return headers
                    },
                };
            }, invalidatesTags: ["User"]
        }),
        getStudentsByCourse: builder.query<any, string>({
            query: (courseId) => {
                return {
                    url: `/student-by-course/?course=${courseId}`,
                    method: "GET",
                };
            },
        }),
        getTeacherByStudent: builder.query<any, string>({
            query: (student) => {
                return {
                    url: `/teacher-by-student/?student=${student}`,
                    method: "GET",
                };
            },
        }),
        getAllChat: builder.query<any, any>({
            query: ({ teacherId, studentId }) => {
                return {
                    url: `/chat/?teacher=${teacherId}&student=${studentId}`,
                    method: "GET",
                };
            }, providesTags: ["Chat"]
        }),
        studentUpdateProfileById: builder.mutation<any, any>({
            query: (data) => {
                if (data.profile_picture === null) {
                    delete data.profile_picture
                }
                const formData = new FormData()
                Object.entries(data).forEach(([key, value]) => formData.append(key, value))
                return {
                    url: `/update-student-profile/${data.id}/`,
                    method: "PUT",
                    body: formData,
                    prepareHeaders: (headers) => {
                        headers.set("Content-Type", "multipart/form-data")
                        return headers
                    },
                };
            },
        }),
        getStudentProfileById: builder.query<any, string>({
            query: (student) => {
                return {
                    url: `/get-student/${student}/`,
                    method: "GET",
                };
            },
        }),
        getStudentById: builder.query<any, string>({
            query: (student) => {
                return {
                    url: `/student/${student}/`,
                    method: "GET",
                };
            },
        }),
        getTeacherById: builder.query<any, string>({
            query: (teacher) => {
                return {
                    url: `/teacher/${teacher}/`,
                    method: "GET",
                };
            },
        }),

        sendChat: builder.mutation({
            query: (data) => {
                return {
                    url: `/chat/`,
                    method: "POST",
                    body: data
                };
            }, invalidatesTags: ["Chat"]
        }),

    }),
});

export const { useGetMeQuery, useUpdateProfileMutation, useGetStudentsByCourseQuery, useGetAllChatQuery, useGetStudentByIdQuery, useSendChatMutation, useGetTeacherByIdQuery, useGetTeacherByStudentQuery, useGetStudentProfileByIdQuery, useStudentUpdateProfileByIdMutation } = userApi;
