import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../../../utils/Api/customBaseFetch";

export const assessmentApi = createApi({
    reducerPath: "assessmentApi",
    baseQuery: customFetchBase,
    tagTypes: ["Assessment"],
    endpoints: (builder) => ({
        getAllAssessmentsByAssessmentTypeAndCourse: builder.query<any, { courseId: number, assessmentType: number }>({
            query: ({ courseId, assessmentType }) => {
                return {
                    url: `/student-assessment/?course=${courseId}&assessmentType=${assessmentType}`,
                    method: "GET",
                }
            }, providesTags: ["Assessment"]
        }),
        getAllAssessmentsByAssessmentType: builder.query<any, number>({
            query: (assessmentType) => {
                return {
                    url: `/student-assessment/?assessmentType=${assessmentType}`,
                    method: "GET",
                }
            }, providesTags: ["Assessment"]
        }),
        getAssessmentById: builder.query<any, string>({
            query: (assessmentId) => {
                return {
                    url: `/assessment/${assessmentId}/`,
                    method: "GET",
                }
            }, providesTags: ["Assessment"]
        }),
        getSubmittedAssessmentById: builder.query<any, { assessmentId: string, studentId: number }>({
            query: ({ assessmentId, studentId }) => {
                return {
                    url: `/submitted-assignments/?assessment=${assessmentId}&student=${studentId}`,
                    method: "GET",
                }
            }, providesTags: ["Assessment"]
        }),
        getSubmittedAssessmentBySubmissionId: builder.query<any, number>({
            query: (submittedId) => {
                return {
                    url: `/submit-assignments/${submittedId}`,
                    method: "GET",
                }
            }, providesTags: ["Assessment"]
        }),
        getAllSubmittedAssessment: builder.query<any, string>({
            query: (assessment) => {
                return {
                    url: `/submitted-assignments-by-assessment/?assessment=${assessment}`,
                    method: "GET",
                }
            }, providesTags: ["Assessment"]
        }),
        getAllAnnouncement: builder.query({
            query: () => {
                return {
                    url: `/announcements`,
                    method: "GET",
                }
            }, providesTags: ["Assessment"]
        }),

        getAllNotification: builder.query<any, number>({
            query: (studentId) => {
                return {
                    url: `/notifications/${studentId}/`,
                    method: "GET",
                }
            }, providesTags: ["Assessment"]
        }),
        submitAssessment: builder.mutation<any, any>({
            query: (data) => {
                return {
                    url: `/submit-assignments/`,
                    method: "POST",
                    body: data,
                    prepareHeaders: (headers) => {
                        headers.set("Content-Type", "multipart/form-data")
                        return headers
                    },
                }
            }, invalidatesTags: ["Assessment"]
        }),
        updateSubmitAssessment: builder.mutation<any, any>({
            query: (data) => {
                const { id, ...rest } = data
                const formData = new FormData()
                Object.entries(rest).forEach(([key, value]) => formData.append(key, value))
                return {
                    url: `/submit-assignments/${id}/`,
                    method: "PUT",
                    body: formData,
                    prepareHeaders: (headers) => {
                        headers.set("Content-Type", "multipart/form-data")
                        return headers
                    },
                }
            }, invalidatesTags: ["Assessment"]
        }),
    })

})

export const { useGetAllAssessmentsByAssessmentTypeAndCourseQuery, useGetAllAssessmentsByAssessmentTypeQuery, useGetAssessmentByIdQuery, useGetSubmittedAssessmentByIdQuery, useSubmitAssessmentMutation, useUpdateSubmitAssessmentMutation, useGetAllSubmittedAssessmentQuery, useGetAllAnnouncementQuery, useGetAllNotificationQuery } = assessmentApi