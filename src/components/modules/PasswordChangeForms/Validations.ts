import z from "zod";


export const changePasswordValidationSchema = z.object({
    oldPassword: z.string().min(1, "Old password is required"),
    newPassword: z.string().min(1, "New password is required")
        .refine(password => password.length >= 6, {
            message: "Password must be at least 8 characters long"
        }),
});

export type ChangePasswordValidation = z.infer<typeof changePasswordValidationSchema>;