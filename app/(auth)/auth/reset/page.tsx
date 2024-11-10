import { CardWrapper } from "@/components/auth/card-wrapper"
import { ResetPasswordForm } from "@/components/auth/reset-password-form"

export default function ResetPage() {
  return (
    <CardWrapper
      title="Password Reset"
      headerLabel="Forgot your password?"
      backButtonLabel="Back to login"
      backButtonHref="/login"
    >
      <ResetPasswordForm />
    </CardWrapper>
  )
}
