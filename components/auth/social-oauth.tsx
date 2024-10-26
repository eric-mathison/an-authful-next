import { GoogleIcon, MicrosoftIcon } from "hugeicons-react"
import { Button } from "@/components/ui/button"

export function SocialOauth() {
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button className="w-full" aria-label="Log in with Google">
        <GoogleIcon className="mx-auto" />
      </Button>
      <Button className="w-full" aria-label="Log in with Microsoft">
        <MicrosoftIcon className="mx-auto" />
      </Button>
    </div>
  )
}
