import type { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"
import { AuthError } from "next-auth"
import Credentials from "next-auth/providers/credentials"
// import Passkey from "next-auth/providers/passkey"
import bcrypt from "bcryptjs"
import { loginSchema } from "@/lib/schemas/login"
import { getUserByEmail } from "@/lib/data/user"

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials)

        if (!parsed.success) return null

        const { email, password } = parsed.data

        const user = await getUserByEmail(email)

        if (!user || !user.password) return null

        const pwCheck = await bcrypt.compare(password, user.password)

        if (pwCheck) return user

        return null
      },
    }),
    // For future testing
    // Passkey,
    Google({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
} satisfies NextAuthConfig
