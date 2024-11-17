"use client"
import { useContext } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModalContext } from "@/lib/providers/modal"

type BackButtonProps = {
  label: string
  href: string
}

export function BackButton({ href, label }: BackButtonProps) {
  const { isModal } = useContext(ModalContext)
  return (
    <Button variant="link" size="sm" className="font-normal w-full" asChild>
      <Link href={href} replace={isModal}>
        {label}
      </Link>
    </Button>
  )
}
