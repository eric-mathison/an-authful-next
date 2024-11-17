"use client"

import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  const onOpenChangeState = () => {
    router.back()
  }

  return (
    <Dialog defaultOpen onOpenChange={onOpenChangeState}>
      <DialogContent
        aria-describedby={undefined}
        className="p-0 max-w-fit rounded-lg"
      >
        <DialogTitle className="sr-only">Authentication</DialogTitle>
        {children}
      </DialogContent>
    </Dialog>
  )
}
