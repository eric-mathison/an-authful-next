"use client"

import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
  CardHeader,
} from "@/components/ui/card"
import { SocialOauth } from "@/components/auth/social-oauth"
import { BackButton } from "@/components/auth/back-button"

type CardWrapperProps = {
  children: React.ReactNode
  title: string
  headerLabel: string
  backButtonLabel: string
  backButtonHref: string
  showSocial?: boolean
}

export function CardWrapper({
  children,
  title,
  headerLabel,
  backButtonHref,
  backButtonLabel,
  showSocial,
}: CardWrapperProps) {
  return (
    <Card className="w-80 shadow-md">
      <CardHeader className="flex flex-col items-center justify-center gap-y-6">
        <CardTitle>🔐 {title}</CardTitle>
        <p className="text-muted-foreground text-sm">{headerLabel}</p>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <SocialOauth />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton href={backButtonHref} label={backButtonLabel} />
      </CardFooter>
    </Card>
  )
}
