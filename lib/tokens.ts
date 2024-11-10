"use server"
import { v4 as uuidv4 } from "uuid"
import { getVerificationTokenByIdentifier } from "@/lib/data/verification-token"
import { getPasswordResetTokenByEmail } from "./data/password-reset-token"
import { db } from "@/lib/db"

export async function generateVerificationToken(email: string) {
  const token = uuidv4()
  const expires = new Date(new Date().getTime() + 3600 * 1000)

  const existingToken = await getVerificationTokenByIdentifier(email)

  if (existingToken) {
    await db.verificationToken.delete({
      where: { id: existingToken.id },
    })
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      identifier: email,
      token,
      expires,
    },
  })

  return verificationToken
}

export async function generatePasswordResetToken(email: string) {
  const token = uuidv4()
  const expires = new Date(new Date().getTime() + 3600 * 1000)

  const existingToken = await getPasswordResetTokenByEmail(email)

  if (existingToken) {
    await db.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    })
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  })

  return passwordResetToken
}
