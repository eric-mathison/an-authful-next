import { cache } from "react"
import { auth } from "@/lib/auth"

export const verifySession = cache(async () => {
  const session = await auth()
  if (!session) return null
  return session
})

export const getUser = cache(async () => {
  const session = await verifySession()
  if (!session?.user) return null
  console.log(session)
  return session.user
})
