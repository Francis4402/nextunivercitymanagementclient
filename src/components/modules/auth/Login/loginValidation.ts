import { z } from "zod";

export const loginSchema = z.object({
    id: z.string().min(4, {
        message: "Please enter your id"
    }),
    password: z.string().min(6, {
        message: "Please enter your password"
    }),
})