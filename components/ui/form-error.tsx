import { Alert02Icon } from "hugeicons-react"

type FormErrorProps = {
  message?: string
}

export function FormError({ message }: FormErrorProps) {
  if (!message) return null

  return (
    <div className="text-red-600 bg-red-100 text-sm py-2 px-3 items-center flex gap-x-2 rounded-md">
      <Alert02Icon />
      <p>{message}</p>
    </div>
  )
}
