import { Suspense } from "react"
import Link from "next/link"
import { ZapIcon } from "hugeicons-react"
import { UserNav } from "@/components/user-nav"

export function Header() {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center justify-between">
      <Link className="flex items-center gap-2 justify-center" href="/">
        <ZapIcon className="h-6 w-6 text-primary stroke-2" />
        <span className="text-2xl font-bold tracking-tighter">
          An Authful Next
        </span>
      </Link>
      <nav className="flex gap-4 sm:gap-6">
        <Suspense>
          <UserNav />
        </Suspense>
      </nav>
    </header>
  )
}
