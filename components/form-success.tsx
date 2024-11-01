import { CheckIcon } from "lucide-react"

type FormSuccessProps = {
  message?: string
}

export function FormSuccess({ message }: FormSuccessProps) {
  if (!message) return null

  return (
    <div className="text-emerald-500 bg-emerald-500/15 text-sm py-2 px-3 items-center flex gap-x-2 rounded-md">
      <CheckIcon />
      <p className="leading-5">{message}</p>
    </div>
  )
}
