"use server"

import bcrypt from "bcryptjs"
import { registerSchema } from "@/lib/schemas/register"
import { db } from "@/lib/db"
import { getUserByEmail } from "@/lib/data/user"
import { generateVerificationToken } from "@/lib/tokens"

export type FormState = {
  success?: string
  error?: string
  fields?: Record<string, string>
  issues?: string[]
}

export async function RegisterFormAction(
  prevState: FormState,
  data: FormData
): Promise<FormState> {
  const formData = Object.fromEntries(data)
  const parsed = registerSchema.safeParse(formData)

  if (!parsed.success) {
    const fields: Record<string, string> = {}
    for (const key of Object.keys(formData)) {
      fields[key] = formData[key].toString()
    }
    return {
      error: "Invalid form data",
      fields,
      issues: parsed.error.issues.map((issue) => issue.message),
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

  const verificationToken = await generateVerificationToken(email)

  // TODO: Send verificiation email

  return { success: "Email confirmation sent" }
}
