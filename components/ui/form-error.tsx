import { TriangleAlert } from "lucide-react"

type FormErrorProps = {
  message?: string
}

export function FormError({ message }: FormErrorProps) {
  if (!message) return null

  return (
    <div className="text-destructive-foreground bg-destructive text-sm py-2 px-3 items-center flex gap-x-2 rounded-md">
      <TriangleAlert />
      <p>{message}</p>
    </div>
  )
}
