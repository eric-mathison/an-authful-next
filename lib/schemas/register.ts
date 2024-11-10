import { z } from "zod"

export const registerSchema = z.object({
  email: z
    .string({ required_error: "An email address is required" })
    .min(1, "An email address is required")
    .email("Invalid email address")
    .transform((email) => email.trim().toLowerCase()),
  password: z
    .string({ required_error: "A Password is required" })
    .min(8, "A minimum of 8 characters is required"),
  name: z
    .string({ required_error: "A name is required" })
    .min(1, { message: "A name is required" }),
})
