"use client"

import { GoogleIcon, Github01Icon } from "hugeicons-react"
import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"

export function SocialOauth() {
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      redirectTo: "/dashboard",
    })
  }

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        variant="outline"
        size="lg"
        className="w-full"
        aria-label="Log in with Google"
        onClick={() => {
          onClick("google")
        }}
      >
        <GoogleIcon className="!size-6" />
      </Button>
      <Button
        variant="outline"
        size="lg"
        className="w-full"
        aria-label="Log in with Microsoft"
        onClick={() => {
          onClick("github")
        }}
      >
        <Github01Icon className="!size-6" />
      </Button>
    </div>
  )
}
