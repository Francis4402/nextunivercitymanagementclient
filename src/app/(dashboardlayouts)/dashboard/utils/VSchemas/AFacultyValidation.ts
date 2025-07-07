import z from "zod";


export const AFacultyValidationSchema = z.object({
    name: z.string().min(10, {
        message: "Please enter a valid name",
    }),
})