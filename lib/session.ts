import { cache } from "react"
import { auth } from "@/lib/auth"

export const getSession = cache(async () => {
  const session = await auth()
  if (!session) return null
  console.log("Session", session)
  return session
})
