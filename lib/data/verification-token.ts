import { db } from "@/lib/db"

export async function getVerificationTokenByIdentifier(identifier: string) {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: {
        identifier,
      },
    })
    return verificationToken
  } catch {
    return null
  }
}

export async function getVerificationTokenByToken(token: string) {
  try {
    const verificationToken = await db.verificationToken.findUnique({
      where: {
        token,
      },
    })
    return verificationToken
  } catch {
    return null
  }
}
