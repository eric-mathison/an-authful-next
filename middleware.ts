import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"

const protectedRoutes = ["/dashboard", "/settings"]
const authRoutes = ["/login", "/register"]
const mainRoute = ["/"]

export default auth((req) => {
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route)
  )
  const isAuthRoute = authRoutes.includes(path)
  const isMainRoute = mainRoute.includes(path)

  if (isProtectedRoute && !req.auth) {
    const redirectUrl = new URL("/login", req.nextUrl)
    return NextResponse.redirect(redirectUrl)
  }

  if ((isAuthRoute && req.auth) || (isMainRoute && req.auth)) {
    const redirectUrl = new URL("/dashboard", req.nextUrl)
    return NextResponse.redirect(redirectUrl)
  }
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
}
