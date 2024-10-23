import NextAuth, { AuthError } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
// import Passkey from "next-auth/providers/passkey"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/db"
import { loginSchema } from "@/lib/schemas/login"

// Extend the AuthError class to allow us to use more specific error messages
export class CustomAuthError extends AuthError {
  constructor(msg: string) {
    super()
    this.message = msg
    this.stack = undefined
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null

        // Always validate user input data
        const parsed = loginSchema.safeParse(credentials)
        console.log(credentials)
        if (!parsed.success) {
          throw new CustomAuthError("Validation failed")
        }

        // DB call to verify user exists
        user = await prisma.user.findUnique({
          where: {
            email: parsed.data.email,
          },
        })

        if (!user) {
          throw new CustomAuthError("Invalid email account")
        }

        const pwCheck = user.pwhash
          ? await bcrypt.compare(parsed.data.password, user.pwhash)
          : false

        if (!pwCheck) throw new CustomAuthError("Invalid password")

        return user
      },
    }),
    Google({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    // For future testing
    // Passkey,
  ],
  callbacks: {
    async signIn({ account, profile }) {
      console.log("account:", account)
      console.log("profile:", profile)
      return true
    },
  },
  // For future testing
  // experimental: { enableWebAuthn: true },
})
