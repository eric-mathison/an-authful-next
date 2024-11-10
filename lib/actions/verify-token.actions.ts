"use server"

import { db } from "@/lib/db"
import { getUserByEmail } from "@/lib/data/user"
import { getVerificationTokenByToken } from "@/lib/data/verification-token"

export async function verifyTokenAction(token: string) {
  const existingToken = await getVerificationTokenByToken(token)

  if (!existingToken) {
    return { error: "Token does not exist!" }
  }

  const hasExpired = new Date(existingToken.expires) < new Date()

  if (hasExpired) {
    return { error: "Token has expired." }
  }

  const existingUser = await getUserByEmail(existingToken.identifier)

  if (!existingUser) {
    return { error: "User does not exist." }
  }

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.identifier,
    },
  })

  await db.verificationToken.delete({
    where: { id: existingToken.id },
  })

  return { success: "Account verified." }
}
