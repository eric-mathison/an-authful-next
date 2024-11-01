import { CardWrapper } from "@/components/auth/card-wrapper"
import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <main className="grid grid-rows-1 justify-center items-center p-8 sm:p-20">
      <CardWrapper
        title="Login"
        headerLabel="Welcome back"
        backButtonLabel="Don't have an account?"
        backButtonHref="/register"
        showSocial
      >
        <LoginForm />
      </CardWrapper>
    </main>
  )
}
