"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { sendVerificationTokenAction } from "@/lib/actions/send-verification-token.actions"

export function ResendVerificationLink({ email }: { email?: string }) {
  const [isDisabled, setIsDisabled] = React.useState(false)
  const [timeLeft, setTimeLeft] = React.useState(60)

  const handleClick = () => {
    if (email) {
      setIsDisabled(true)
      setTimeLeft(60)
      sendVerificationTokenAction(email)
    }
  }

  React.useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    if (isDisabled) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime === 0) {
            setIsDisabled(false)
            clearInterval(timer)
            return 60
          } else {
            return prevTime - 1
          }
        })
      }, 1000)
    }

    return () => clearInterval(timer)
  }, [isDisabled])

  return (
    email && (
      <Button
        className="justify-start"
        variant="link"
        disabled={isDisabled}
        onClick={handleClick}
      >
        Resend verification
        {isDisabled && ` ... ${timeLeft}`}
      </Button>
    )
  )
}
