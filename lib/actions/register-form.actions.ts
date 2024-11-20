"use server"

import bcrypt from "bcryptjs"
import { registerSchema } from "@/lib/schemas/register"
import { db } from "@/lib/db"
import { getUserByEmail } from "@/lib/data/user"
import { sendVerificationTokenAction } from "@/lib/actions/send-verification-token.actions"

export type FormState = {
  success?: string
  error?: string
}

export async function registerFormAction(data: FormData): Promise<FormState> {
  const formData = Object.fromEntries(data)
  const parsed = registerSchema.safeParse(formData)

  if (!parsed.success) {
    return {
      error: "Invalid form data",
    }
  }

  const { email, password, name } = parsed.data
  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await getUserByEmail(email)

  if (existingUser) return { error: "Email already in use" }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  })

  await sendVerificationTokenAction(email)

  return { success: "Email confirmation sent" }
}
