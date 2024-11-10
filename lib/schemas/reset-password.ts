import { z } from "zod"

export const resetPasswordSchema = z.object({
  email: z
    .string({ required_error: "An email address is required" })
    .min(1, "An email address is required")
    .email("Invalid email address")
    .transform((email) => email.trim().toLowerCase()),
})
