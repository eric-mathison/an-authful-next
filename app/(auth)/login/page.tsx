// import { signIn } from "@/app/_lib/auth"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { LoginForm } from "@/components/auth/login-form"
import { SocialOauth } from "@/components/auth/social-oauth"

export default function LoginPage() {
  return (
    <main className="grid grid-rows-1 justify-center items-center p-8 sm:p-20 max-h-svh">
      <Card className="max-w-80">
        <CardHeader>
          <CardTitle>🔐 Login</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
          <SocialOauth />
          {/* <form
            action={async () => {
              "use server"
              await signIn("google")
            }}
          >
            <button
              type="submit"
              className="flex py-2 rounded-md px-4 items-center justify-center w-full bg-white text-black hover:bg-black hover:text-white hover:ring-2 hover:ring-white"
            >
              Log in with Google
            </button>
          </form> */}
        </CardContent>
      </Card>
    </main>
  )
}
