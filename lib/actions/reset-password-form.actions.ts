"use server"

import { resetPasswordSchema } from "@/lib/schemas/reset-password"
import { getUserByEmail } from "@/lib/data/user"
import { sendPasswordResetEmail } from "@/lib/mail"
import { generatePasswordResetToken } from "@/lib/tokens"

export type FormState = {
  success?: string
  error?: string
  fields?: Record<string, string>
  issues?: string[]
}

export async function resetPasswordFormAction(
  prevState: FormState,
  data: FormData
): Promise<FormState> {
  const formData = Object.fromEntries(data)
  const parsed = resetPasswordSchema.safeParse(formData)

  if (!parsed.success) {
    const fields: Record<string, string> = {}
    for (const key of Object.keys(formData)) {
      fields[key] = formData[key].toString()
    }
    return {
      error: "Validation failed",
      fields,
      issues: parsed.error.issues.map((issue) => issue.message),
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
