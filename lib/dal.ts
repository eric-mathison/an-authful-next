import { cache } from "react"
import { auth } from "@/lib/auth"

export const currentUser = cache(async () => {
  const session = await auth()
  if (!session) return null
  return session
})

export const currentRole = async () => {
  const session = await auth()
  if (!session) return null
  return session.user.role
}
