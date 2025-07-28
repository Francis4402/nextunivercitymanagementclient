import z from "zod";


export const createSemesterRValidationSchema = z.object({
  body: z.object({
    academicSemester: z.string(),
    status: z.enum(["UPCOMING", "ONGOING", "ENDED"]),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    minCredit: z.number(),
    maxCredit: z.number(),
  }),
});


export type SemesterValidation = z.infer<typeof createSemesterRValidationSchema>;