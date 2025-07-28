import z from "zod"


export const ASemesterValidationSchema = z.object({
    name: z.string().min(4, {
        message: "Please enter a name"
    }).max(50),
    year: z.string({
        message: "Please enter a year"
    }),
    code: z.string().min(1, {
        message: "Please enter a code"
    }),
    startMonth: z.string({
        message: "Please enter a start month"
    }),
    endMonth: z.string({
        message: "Please enter an end month"
    }),
})