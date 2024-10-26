"use server"

import { signIn } from "@/lib/auth"
import { loginSchema } from "@/lib/schemas/login"

export type FormState = {
  message: string
  fields?: Record<string, string>
  issues?: string[]
}

export async function LoginFormAction(
  prevState: FormState,
  data: FormData
): Promise<FormState> {
  // Validate inputs early so we can return the form with helpful errors
  // Auth.js throws a simple error if the authentication function fails
  // for any reason
  // https://github.com/nextauthjs/next-auth/issues/9900
  const formData = Object.fromEntries(data)
  const parsed = loginSchema.safeParse(formData)

  if (!parsed.success) {
    const fields: Record<string, string> = {}
    for (const key of Object.keys(formData)) {
      fields[key] = formData[key].toString()
    }
    return {
      message: "Invalid form data",
      fields,
      issues: parsed.error.issues.map((issue) => issue.message),
    }
  }

  try {
    await signIn("credentials", data)

    return {
      message: "Logged in",
    }
  } catch (error) {
    // Using switch case to allow us to send creative messages back to the user
    // but still see helpful errors in server logs
    switch ((error as Error).message) {
      case "Invalid email account":
        return {
          message:
            "Oops! Something doesn't look right. Please try to log in again.",
          fields: parsed.data,
        }
      case "Invalid password":
        return {
          message:
            "Oops! Something doesn't look right. Please try to log in again.",
          fields: parsed.data,
        }
      default:
        console.log(error)
        return {
          message: "Woah! Looks like we ran into an error. Please try again.",
          fields: parsed.data,
        }
    }
  }
}
