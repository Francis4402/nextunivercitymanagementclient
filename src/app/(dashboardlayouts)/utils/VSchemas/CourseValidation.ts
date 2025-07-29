import z from "zod";


export const CourseValidationSchema = z.object({
    title: z.string().min(1, "Title is required").max(20, "Title must be 20 characters or less"),
    prefix: z.string().min(1, "Prefix is required").max(20, "Prefix must be 20 characters or less"),
    code: z.number().min(1, "Code is required"),
    credits: z.number().min(1, "Credits is required"),
    preRequisiteCourses: z.array(z.object({
        course: z.string(),
        isDeleted: z.boolean()
    })).optional(),
    isDeleted: z.boolean()
});

export type TCourse = z.infer<typeof CourseValidationSchema>;