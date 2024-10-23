import * as z from "zod"

export const loginSchema = z.object({
  email: z
    .string({ required_error: "An email address is required" })
    .trim()
    .min(1, "An email address is required")
    .email("Invalid email address"),
  password: z
    .string({ required_error: "A Password is required" })
    .min(1, "A Password is required"),
})
