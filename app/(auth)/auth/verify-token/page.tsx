import { Suspense } from "react"
import { VerifyTokenForm } from "@/components/auth/verify-token-form"

export default function VerifyTokenPage() {
  return (
    <Suspense>
      <VerifyTokenForm />
    </Suspense>
  )
}
