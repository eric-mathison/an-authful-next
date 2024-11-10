"use server"

import { AuthError } from "next-auth"
import { signIn } from "@/lib/auth"
import { loginSchema } from "@/lib/schemas/login"

export type FormState = {
  success?: string
  error?: string
  fields?: Record<string, string>
  issues?: string[]
}

export async function loginFormAction(
  prevState: FormState,
  data: FormData
): Promise<FormState> {
  const formData = Object.fromEntries(data)
  const parsed = loginSchema.safeParse(formData)

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

  const { email, password } = parsed.data

  try {
    await signIn("credentials", { email, password, redirectTo: "/dashboard" })
    return { success: "" }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: "Invalid credentials",
            fields: parsed.data,
          }
        case "AccessDenied":
          return {
            error: "Email not verified",
            fields: parsed.data,
          }
        default:
          return {
            error: "Something went wrong!",
            fields: parsed.data,
          }
      }
    }
    throw error
  }
}
