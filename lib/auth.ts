import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db"
import authConfig from "@/lib/auth.config"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  ...authConfig,
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
