import { z } from "zod"

export const newPasswordSchema = z.object({
  password: z
    .string({ required_error: "A password is required" })
    .min(8, "Minimum of 8 characters is required"),
})
