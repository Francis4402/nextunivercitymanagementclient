import z from "zod";


const studentSchema = z.object({
    firstName: z.string().min(1, "First name is required").max(20, "First name must be 20 characters or less").refine((value) => /^[A-Z]/.test(value), {
        message: "First name must start with an uppercase letter",
    }),
    middleName: z.string().optional(),
    lastName: z.string().min(1, "Last name is required").max(20, "Last name must be 20 characters or less"),
});


const createGuardianValidationSchema = z.object({
    fatherName: z.string().min(1, "Father's name is required"),
    fatherOccupation: z.string().min(1, "Father's occupation is required"),
    fatherContactNo: z.string().min(10, "Contact number must be at least 10 digits").max(11, {
        message: "Please enter a valid contact number"
    }).regex(/^\d+$/, "Contact number must contain only digits"),
    motherName: z.string().min(1, "Mother's name is required"),
    motherOccupation: z.string().min(1, "Mother's occupation is required"),
    motherContactNo: z.string().min(10, "Contact number must be at least 10 digits").max(11, {
        message: "Please enter a valid contact number"
    }).regex(/^\d+$/, "Contact number must contain only digits"),
});


const createLocalGuardianValidationSchema = z.object({
    name: z.string().min(1, "Local guardian name is required"),
    occupation: z.string().min(1, "Local guardian occupation is required"),
    contactNo: z.string().min(10, "Contact number must be at least 10 digits").max(11, {
        message: "Please enter a valid contact number"
    }).regex(/^\d+$/, "Contact number must contain only digits"),
    address: z.string().min(10, "Address must be at least 10 characters"),
});


export const createStudentValidationSchema = z.object({
    body: z.object({
        password: z.string().min(6, "Password must be at least 6 characters").max(20, "Password must be 20 characters or less").optional(),
        student: z.object({
            name: studentSchema,
            gender: z.enum(['male', 'female', 'other']),
            dateOfBirth: z.string().optional(),
            email: z.string().email("Please enter a valid email address"),
            contactNo: z.string().min(10, "Contact number must be at least 10 digits").max(11, {
                message: "Please enter a valid contact number"
            }).regex(/^\d+$/, "Contact number must contain only digits"),
            emergencyContactNo: z.string().min(10, "Emergency contact number must be at least 10 digits").max(11, {
                message: "Please enter a valid emergency contact number"
            }).regex(/^\d+$/, "Emergency contact number must contain only digits"),
            profileImg: z.string().url("Profile image must be a valid URL").optional(),
            bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
            presentAddress: z.string().min(10, "Present address must be at least 10 characters"),
            permanentAddress: z.string().min(10, "Permanent address must be at least 10 characters"),
            guardian: createGuardianValidationSchema,
            localGuardian: createLocalGuardianValidationSchema,
            admissionSemester: z.string().min(1, "Admission semester is required"),
            academicDepartment: z.string().min(1, "Academic department is required"),
        }),
    }),
});

export type TUserName = z.infer<typeof studentSchema>;
export type IGuardian = z.infer<typeof createGuardianValidationSchema>;
export type ILocalGuardian = z.infer<typeof createLocalGuardianValidationSchema>;