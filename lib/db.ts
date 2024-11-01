import { PrismaClient } from "@prisma/client"

const DATABASE_URL = process.env.DATABASE_URL

if (!DATABASE_URL) {
  throw new Error(`ENV Variable: DATABASE_URL is not defined`)
}

const cached = globalThis as unknown as { db: PrismaClient }

export const db = cached.db || new PrismaClient()

if (process.env.NODE_ENV !== "production") cached.db = db
