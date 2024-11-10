import { CardWrapper } from "@/components/auth/card-wrapper"
import { RegisterForm } from "@/components/auth/register-form"

export default function RegisterPage() {
  return (
    <CardWrapper
      title="Register"
      headerLabel="Create an account"
      backButtonLabel="Already have an account?"
      backButtonHref="/login"
      showSocial
    >
      <RegisterForm />
    </CardWrapper>
  )
}
