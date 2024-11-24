"use server"

import { z } from "zod"
import bcrypt from "bcryptjs"
import { db } from "@/lib/db"
import { SettingsSchema } from "@/lib/schemas/settings"
import { getUserByEmail, getUserById } from "@/lib/data/user"
import { currentUser } from "@/lib/dal"
import { generateVerificationToken } from "../tokens"
import { sendVerificationEmail } from "../mail"

export async function settingsAction(values: z.infer<typeof SettingsSchema>) {
  const parsed = SettingsSchema.safeParse(values)

  const user = await currentUser()

  if (!user) {
    return {
      error: "Unauthorized",
    }
  }

  const dbUser = await getUserById(user.id!)

  if (!dbUser) {
    return { error: "Unauthorized" }
  }

  if (user.isOAuth) {
    values.email = undefined
  }

  if (user?.isOAuth) {
    values.password = undefined
    values.newPassword = undefined
    values.isTwoFactorEnabled = undefined
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email)

    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email already in use" }
    }

    const verificationToken = await generateVerificationToken(values.email)

    await sendVerificationEmail(
      verificationToken.identifier,
      verificationToken.token
    )

    return { success: "Verification email sent" }
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordsMatch = await bcrypt.compare(
      values.password,
      dbUser.password
    )

    if (!passwordsMatch) return { error: "Incorrect password" }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10)
    values.password = hashedPassword
    values.newPassword = undefined
  }

  await db.user.update({
    where: {
      id: dbUser.id,
    },
    data: {
      ...parsed.data,
    },
  })

  return { success: "Settings updated" }
}
