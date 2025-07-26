import { z } from 'zod';

const userNameValidation = z.object({
    firstName: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First Name must start with a capital letter',
    }),
    middleName: z.string().optional(),
    lastName: z.string().min(1, "Last name is required").max(20, "Last name must be 20 characters or less"),
});

export const createAdminValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    admin: z.object({
        designation: z.string().min(1, "Designation is required").max(20, "Designation must be 20 characters or less"),
        name: userNameValidation,
        gender: z.enum(['male', 'female', 'other']),
        dateOfBirth: z.string().optional(),
        email: z.string().email("Please enter a valid email address"),
        contactNo: z.string().min(10, "Contact number must be at least 10 digits").max(11, {
            message: "Please enter a valid contact number"
        }).regex(/^\d+$/, "Contact number must contain only digits"),
        emergencyContactNo: z.string().min(10, "Emergency contact number must be at least 10 digits").max(11, {
            message: "Please enter a valid emergency contact number"
        }).regex(/^\d+$/, "Emergency contact number must contain only digits"),
        bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
        presentAddress: z.string().min(10, "Present address must be at least 10 characters"),
        permanentAddress: z.string().min(10, "Permanent address must be at least 10 characters"),
    }),
  }),
});

export type TName = z.infer<typeof userNameValidation>;
export type IAdminForm = z.infer<typeof createAdminValidationSchema>;
