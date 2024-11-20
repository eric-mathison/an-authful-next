"use server"

import bcrypt from "bcryptjs"
import { db } from "@/lib/db"
import { newPasswordSchema } from "@/lib/schemas/new-password"
import { getPasswordResetTokenByToken } from "@/lib/data/password-reset-token"
import { getUserByEmail } from "@/lib/data/user"

export type FormState = {
  success?: string
  error?: string
}

export async function newPasswordAction(
  token: string | null,
  data: FormData
): Promise<FormState> {
  const formData = Object.fromEntries(data)
  const parsed = newPasswordSchema.safeParse(formData)

  if (!token) {
    return { error: "Missing token." }
  }

  if (!parsed.success) {
    return {
      error: "Invalid form data",
    }
  }

  const { password } = parsed.data

  const existingToken = await getPasswordResetTokenByToken(token)

  if (!existingToken) return { error: "Invalid token." }

  const hasExpired = new Date(existingToken.expires) < new Date()

  if (hasExpired) return { error: "Token has expired." }

  const existingUser = await getUserByEmail(existingToken.email)

  if (!existingUser) return { error: "Email account not found." }

  const hashedPassword = await bcrypt.hash(password, 10)

  await db.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  })

  await db.passwordResetToken.delete({
    where: { id: existingToken.id },
  })

  return { success: "Password successfully reset." }
}
