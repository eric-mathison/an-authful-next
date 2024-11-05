import { User, type DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"
import { UserRole, User as PrismaUser } from "@prisma/client"

declare module "next-auth" {
  interface User extends PrismaUser {}

  interface Session {
    user: {
      role?: UserRole
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: UserRole
  }
}
