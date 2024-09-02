/* eslint-disable react-hooks/rules-of-hooks */
import moment from "moment";
import { useAppSelector } from "../../../hooks/reduxHooks";
import customFetchBase from "../../../utils/Api/customBaseFetch";
import { createApi } from "@reduxjs/toolkit/query/react";
export const courseApi = createApi({
    reducerPath: "courseApi",
    baseQuery: customFetchBase,
    tagTypes: ["Course", "Attendance"],
    endpoints: (builder) => ({
        createCourse: builder.mutation({
            query: (data) => {
                const formData = new FormData()
                data.category = parseInt(data.category)
                data.teacher = parseInt(data.teacher)
                Object.entries(data).forEach(([key, value]) => formData.append(key, value))
                return {
                    url: "/course/",
                    method: "POST",
                    body: formData,
                    prepareHeaders: (headers) => {
                        headers.set("Content-Type", "multipart/form-data")
                        return headers
                    },
                };
            }, invalidatesTags: ["Course"]
        }),
        updateCourse: builder.mutation({
            query: (data) => {
                const { id, ...newData } = data
                if (newData.featured_img === null) {
                    delete newData.featured_img
                }
                const formData = new FormData()
                newData.category = parseInt(newData.category)
                Object.entries(newData).forEach(([key, value]) => formData.append(key, value))
                return {
                    url: "/course/" + id + "/",
                    method: "PATCH",
                    body: formData,
                    prepareHeaders: (headers) => {
                        headers.set("Content-Type", "multipart/form-data")
                        return headers
                    },
                };
            }, invalidatesTags: ["Course"]
        }),
        getAllCoursesWithTitleFilter: builder.query<any, { title?: string }>({
            query: (args) => {
                const { title } = args
                const teacherId = useAppSelector((state) => state.user.user.teacher)
                return {
                    url: `/course/?teacher=${teacherId}`,
                    method: "GET",
                    params: { title }
                };
            },
        }),
        getCourseById: builder.query<any, number>({
            query: (id) => {
                return {
                    url: "/course/" + id + "/",
                    method: "GET",
                };
            }, providesTags: ['Course']
        }),
        getAllCourses: builder.query<any, number>({
            query: (id) => {
                return {
                    url: `/course/?teacher=${id}`,
                    method: "GET",
                };
            }, providesTags: ['Course']
        }),
        getAttendanceList: builder.query<any, { teacher: number, course: string }>({
            query: ({ teacher, course }) => {
                return {
                    url: `/attendances/?teacher=${teacher}&course=${course}&date=${moment(Date.now()).format('YYYY-MM-DD')}`,
                    method: "GET",
                };
            }, providesTags: ['Attendance']
        }),
        attendanceCreate: builder.mutation({
            query: (data) => {
                return {
                    url: `/attendance/`,
                    method: "POST",
                    body: data
                };
            }, invalidatesTags: ['Attendance']
        }),
        getAllCoursesStudent: builder.query<any, number>({
            query: (id) => {
                return {
                    url: `/student-course/?student=${id}`,
                    method: "GET",
                };
            }, providesTags: ['Course']
        }),
        getTeacherByUser: builder.query({
            query: () => {
                return {
                    url: "/get_teacher_by_user/",
                    method: "GET",
                };
            },
        }),
        getStudent: builder.query<any, number>({
            query: (student) => {
                return {
                    url: `/get-student/${student}/`,
                    method: "GET",
                };
            },
        }),
        getAllClasses: builder.query({
            query: () => {
                return {
                    url: "/category/",
                    method: "GET",
                };
            },
        }),
        deleteCourse: builder.mutation<any, number>({
            query: (id) => {
                return {
                    url: "/course/" + id + "/",
                    method: "DELETE",
                };
            }, invalidatesTags: ['Course']
        }),
    }),
});
export const {
    useGetAllCoursesStudentQuery,
    useGetAllCoursesQuery, useCreateCourseMutation, useGetAllCoursesWithTitleFilterQuery, useGetTeacherByUserQuery, useGetAllClassesQuery, useGetCourseByIdQuery, useUpdateCourseMutation, useDeleteCourseMutation, useGetAttendanceListQuery, useAttendanceCreateMutation, getStudent } = courseApi;
