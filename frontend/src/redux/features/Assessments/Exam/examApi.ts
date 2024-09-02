import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../../../../utils/Api/customBaseFetch";

export const ExamApi = createApi({
    reducerPath: "examApi",
    baseQuery: customFetchBase,
    tagTypes: ["Exam"],
    endpoints: (builder) => ({
        getAllExam: builder.query<any, number>({
            query: (teacherId) => {
                return {
                    url: `/get-assessment-exam-teacher/?teacher=${teacherId}`,
                    method: "GET",
                }
            }, providesTags: ["Exam"]
        }),
        deleteExam: builder.mutation<any, number>({
            query: (id) => {
                return {
                    url: `/assessment/${id}/`,
                    method: "DELETE",
                }
            }, invalidatesTags: ["Exam"]
        }),
        createExam: builder.mutation({
            query(data) {

                const formData = new FormData()
                Object.entries(data).forEach(([key, value]) => formData.append(key, value))

                return {
                    method: "POST",
                    url: "/assessment/",
                    body:
                        formData
                }
            }, invalidatesTags: ["Exam"]
        }),
        updateExam: builder.mutation({
            query: (data) => {
                const { id, ...newData } = data
                if (newData.assessment_material_url === null) {
                    delete newData.assessment_material_url
                }
                const formData = new FormData()
                Object.entries(newData).forEach(([key, value]) => formData.append(key, value))
                return {
                    url: "/assessment/" + id + "/",
                    method: "PATCH",
                    body: formData,
                    prepareHeaders: (headers) => {
                        headers.set("Content-Type", "multipart/form-data")
                        return headers
                    },
                };
            }, invalidatesTags: ["Exam"]
        }),
    })
})

export const { useGetAllExamQuery, useCreateExamMutation, useUpdateExamMutation, useDeleteExamMutation } = ExamApi