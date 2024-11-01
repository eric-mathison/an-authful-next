import { GoogleIcon, MicrosoftIcon } from "hugeicons-react"
import { Button } from "@/components/ui/button"

export function SocialOauth() {
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        variant="outline"
        size="lg"
        className="w-full"
        aria-label="Log in with Google"
        onClick={() => {}}
      >
        <GoogleIcon className="!size-6" />
      </Button>
      <Button
        variant="outline"
        size="lg"
        className="w-full"
        aria-label="Log in with Microsoft"
        onClick={() => {}}
      >
        <MicrosoftIcon className="!size-6" />
      </Button>
    </div>
  )
}
