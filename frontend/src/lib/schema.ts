import z from "zod"

export const registerSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required"
    }),
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(6, {
        message: "Min 6 characters required"
    }),
})

export const loginSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(1, {
        message: "Password required"
    }),
})