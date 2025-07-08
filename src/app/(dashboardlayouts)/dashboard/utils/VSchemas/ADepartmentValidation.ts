import z from "zod";


export const ADepartmentValidationSchema = z.object({
    name: z.string().min(10, {
        message: "Please enter name"
    }),
    academicFaculty: z.string({
        message: "Please select a faculty"
    })
})