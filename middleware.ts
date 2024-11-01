import NextAuth from "next-auth"
import authConfig from "@/lib/auth.config"

const protectedRoutes = ["/dashboard", "/settings"]
const authRoutes = ["/login", "/register"]
const mainRoute = ["/"]

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { nextUrl } = req
  const path = nextUrl.pathname
  const isLoggedIn = !!req.auth

  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route)
  )
  const isAuthRoute = authRoutes.includes(path)
  const isMainRoute = mainRoute.includes(path)

  if (isProtectedRoute && !isLoggedIn) {
    const redirectUrl = new URL("/login", nextUrl)
    return Response.redirect(redirectUrl)
  }

  if ((isAuthRoute && isLoggedIn) || (isMainRoute && isLoggedIn)) {
    const redirectUrl = new URL("/dashboard", nextUrl)
    return Response.redirect(redirectUrl)
  }
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
}
