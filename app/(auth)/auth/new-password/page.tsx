import { Suspense } from "react"
import { CardWrapper } from "@/components/auth/card-wrapper"
import { NewPasswordForm } from "@/components/auth/new-password-form"

export default function NewPasswordPage() {
  return (
    <CardWrapper
      title="Password Reset"
      headerLabel="Enter a new password"
      backButtonLabel="Back to login"
      backButtonHref="/login"
    >
      <Suspense>
        <NewPasswordForm />
      </Suspense>
    </CardWrapper>
  )
}
