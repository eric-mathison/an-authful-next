"use server"

import { resetPasswordSchema } from "@/lib/schemas/reset-password"
import { getUserByEmail } from "@/lib/data/user"
import { sendPasswordResetEmail } from "@/lib/mail"
import { generatePasswordResetToken } from "@/lib/tokens"

export type FormState = {
  success?: string
  error?: string
}

export async function resetPasswordFormAction(
  data: FormData
): Promise<FormState> {
  const formData = Object.fromEntries(data)
  const parsed = resetPasswordSchema.safeParse(formData)

  if (!parsed.success) {
    return {
      error: "Invalid form data",
    }
  }

  const { email } = parsed.data
  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    const passwordResetToken = await generatePasswordResetToken(email)
    await sendPasswordResetEmail(
      passwordResetToken.email,
      passwordResetToken.token
    )
  }

  return { success: "Password reset confirmation sent." }
}
