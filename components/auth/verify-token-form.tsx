"use client"

import { useCallback, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { BeatLoader } from "react-spinners"
import { CardWrapper } from "@/components/auth/card-wrapper"
import { verifyTokenAction } from "@/lib/actions/verify-token.actions"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"

export function VerifyTokenForm() {
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()

  const searchParams = useSearchParams()

  const token = searchParams.get("token")
  const onSubmit = useCallback(() => {
    if (!token) {
      setError("Missing Token")
      return
    }

    verifyTokenAction(token)
      .then((data) => {
        setSuccess(data.success)
        setError(data.error)
      })
      .catch(() => {
        setError("Something went wrong")
      })
  }, [token])

  useEffect(() => {
    onSubmit()
  }, [onSubmit])

  return (
    <CardWrapper
      title="Verifying"
      headerLabel="Confirming your email address"
      backButtonLabel="Back to login"
      backButtonHref="/login"
    >
      <div className="flex items-center w-full justify-center">
        {!success && !error && <BeatLoader />}
        <FormError message={error} />
        <FormSuccess message={success} />
      </div>
    </CardWrapper>
  )
}
