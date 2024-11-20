"use server"

import { signOut } from "@/lib/auth"

export async function logoutAction() {
  // For future exit logging
  await signOut({
    redirectTo: "/login",
    redirect: true,
  })
}
