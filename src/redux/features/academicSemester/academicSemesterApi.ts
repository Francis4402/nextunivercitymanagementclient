import { baseApi } from "@/redux/api/baseApi";


const academicSemesterApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllSemesters: builder.query({
            query: () => ({
                url: "/academic-semesters",
                method: "GET",
            })
        }),
        addAcademicSemester: builder.mutation({
            query: (data) => ({
                url: "/academic-semesters/create-academic-semester",
                method: "POST",
                body: data,
            })
        })
    })
})


export const { useGetAllSemestersQuery, useAddAcademicSemesterMutation } = academicSemesterApi;
