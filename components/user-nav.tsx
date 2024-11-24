"use client"

import Link from "next/link"
import { signOut } from "next-auth/react"
import { UserIcon } from "hugeicons-react"
import { useCurrentUser } from "@/lib/hooks/useCurrentUser"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function UserNav() {
  const user = useCurrentUser()
  const firstName = user?.name?.split(" ").slice(0, 1).join(" ")

  const onSignOut = async () => {
    await signOut({
      redirectTo: "/login",
      redirect: true,
    })
  }

  return (
    <>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none focus:ring-ring focus:ring-1 focus:rounded">
            <div className="flex gap-2 items-center">
              <Avatar>
                <AvatarImage src={user.image || undefined} />
                <AvatarFallback>
                  <UserIcon className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              {firstName}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href="/settings/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onSignOut} className="cursor-pointer">
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <>
          <Link
            className="text-sm font-medium hover:text-accent-foreground transition-colors"
            href="/login"
          >
            Log in
          </Link>
          <Link
            className="text-sm font-medium hover:text-accent-foreground transition-colors"
            href="/register"
          >
            Register
          </Link>
        </>
      )}
    </>
  )
}
