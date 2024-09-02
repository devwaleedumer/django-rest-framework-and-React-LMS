import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../../../../utils/Api/customBaseFetch";

export const quizApi = createApi({
    reducerPath: "quizApi",
    baseQuery: customFetchBase,
    tagTypes: ["Quiz"],
    endpoints: (builder) => ({
        getAllQuiz: builder.query<any, number>({
            query: (teacherId) => {
                return {
                    url: `/assessment/?teacher=${teacherId}&assessmentType=2`,
                    method: "GET",
                }
            }, providesTags: ["Quiz"]
        }),
        deleteQuiz: builder.mutation<any, number>({
            query: (id) => {
                return {
                    url: `/assessment/${id}/`,
                    method: "DELETE",
                }
            }, invalidatesTags: ["Quiz"]
        }),
        createQuiz: builder.mutation({
            query(data) {

                const formData = new FormData()
                Object.entries(data).forEach(([key, value]) => formData.append(key, value))

                return {
                    method: "POST",
                    url: "/assessment/",
                    body:
                        formData
                }
            }, invalidatesTags: ["Quiz"]
        }),
        updateQuiz: builder.mutation({
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
            }, invalidatesTags: ["Quiz"]
        }),
    })
})

export const { useGetAllQuizQuery, useCreateQuizMutation, useUpdateQuizMutation, useDeleteQuizMutation } = quizApi