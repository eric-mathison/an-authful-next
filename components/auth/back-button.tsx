import Link from "next/link"
import { Button } from "@/components/ui/button"

type BackButtonProps = {
  label: string
  href: string
}

export function BackButton({ href, label }: BackButtonProps) {
  return (
    <Button variant="link" size="sm" className="font-normal w-full" asChild>
      <Link href={href}>{label}</Link>
    </Button>
  )
}
