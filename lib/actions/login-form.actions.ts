"use server"

import { AuthError } from "next-auth"
import { signIn } from "@/lib/auth"
import { loginSchema } from "@/lib/schemas/login"
import { getUserByEmail } from "@/lib/data/user"
import { generateTwoFactorToken } from "@/lib/tokens"
import { sendTwoFactorTokenEmail } from "@/lib/mail"
import { getTwoFactorTokenByEmail } from "@/lib/data/two-factor-token"
import { db } from "@/lib/db"
import { getTwoFactorConfirmationByUserId } from "@/lib/data/two-factor-confirmation"

export type FormState = {
  success?: string
  error?: string
  field?: string
  twoFactor?: boolean
}

export async function loginFormAction(data: FormData): Promise<FormState> {
  const formData = Object.fromEntries(data)
  const parsed = loginSchema.safeParse(formData)

  if (!parsed.success) {
    return {
      error: "Invalid form data",
    }
  }

  const { email, password, code } = parsed.data

  const existingUser = await getUserByEmail(email)

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Invalid credentials" }
  }

  if (!existingUser.emailVerified) {
    return { error: "Email not verified", field: email }
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email)

      if (!twoFactorToken) return { error: "Invalid code" }
      if (twoFactorToken.token !== code) return { error: "Invalid code" }

      const hasExpired = new Date(twoFactorToken.expires) < new Date()
      if (hasExpired) return { error: "Code expired" }

      await db.twoFactorToken.delete({
        where: { id: twoFactorToken.id },
      })

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
      )
      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        })
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      })
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email)
      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token)

      return { twoFactor: true }
    }
  }

  try {
    await signIn("credentials", { email, password, redirectTo: "/dashboard" })
    return { success: "" }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: "Invalid credentials",
          }
        default:
          return {
            error: "Something went wrong!",
          }
      }
    }
    throw error
  }
}
