import z from "zod";


export const OfferedCourseValidationSchema = z.object({
    semesterRegistration: z.string().min(1, "Semester registration is required"),
    academicFaculty: z.string().min(1, "Academic faculty is required"),
    academicDepartment: z.string().min(1, "Academic department is required"),
    course: z.string().min(1, "Course is required"),
    faculty: z.string().min(1, "Faculty is required"),
    section: z.number().min(1, "Section must be at least 1"),
    maxCapacity: z.number().min(1, "Max capacity must be at least 1"),
    days: z.array(z.string()).min(1, "At least one day must be selected"),
    startTime: z.string().min(1, "Start time is required")
        .refine(time => /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time), {
            message: "Invalid time format (HH:MM)"
        }),
    endTime: z.string().min(1, "End time is required")
        .refine(time => /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time), {
            message: "Invalid time format (HH:MM)"
        })
}).refine(data => {
    // Ensure end time is after start time
    if (!data.startTime || !data.endTime) return true;
    return new Date(`1970-01-01T${data.endTime}`) > new Date(`1970-01-01T${data.startTime}`);
}, {
    message: "End time must be after start time",
    path: ["endTime"]
});

export type OfferedCourseValidation = z.infer<typeof OfferedCourseValidationSchema>;