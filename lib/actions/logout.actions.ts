import { signOut } from "@/lib/auth"

export async function Logout() {
  // For future exit logging
  await signOut()
}
