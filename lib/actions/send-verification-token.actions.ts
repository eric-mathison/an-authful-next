"use server"

import { generateVerificationToken } from "@/lib/tokens"
import { sendVerificationEmail } from "@/lib/mail"

export async function sendVerificationTokenAction(email: string) {
  const verificationToken = await generateVerificationToken(email)

  await sendVerificationEmail(
    verificationToken.identifier,
    verificationToken.token
  )
}
