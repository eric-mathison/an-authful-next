import { CardWrapper } from "@/components/auth/card-wrapper"
import { RegisterForm } from "@/components/auth/register-form"

export default function RegisterPage() {
  return (
    <main className="grid grid-rows-1 justify-center items-center p-8 sm:p-20">
      <CardWrapper
        title="Register"
        headerLabel="Create an account"
        backButtonLabel="Already have an account?"
        backButtonHref="/login"
        showSocial
      >
        <RegisterForm />
      </CardWrapper>
    </main>
  )
}
