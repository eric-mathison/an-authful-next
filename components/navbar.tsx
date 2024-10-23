"use client"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { User } from "next-auth"

type NavbarProps = {
  user: User | null
  transparent?: boolean
}

export function Navbar({
  user,
  transparent = false,
}: NavbarProps): JSX.Element {
  const initials = user?.name?.charAt(0)

  return (
    <header
      className={cn(
        "flex p-4 h-12 items-center gap-2 bg-white text-black justify-between",
        transparent && "bg-transparent text-white drop-shadow-sm"
      )}
    >
      <Link href={"/"}>
        <span className="font-bold">An Authful Next</span>
      </Link>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"}>
              <span>
                <Avatar>
                  <AvatarImage src={user.image || undefined} />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
              </span>
              <span>{user.name}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={"/dashboard"}>Dashboard</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={"/user/profile"}>Profile</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <nav>
          <span className="flex gap-6">
            <Link href={"/login"} className="font-semibold">
              Log in
            </Link>
            <Link href={"/register"} className="font-semibold">
              Join
            </Link>
          </span>
        </nav>
      )}
    </header>
  )
}
