"use client"

import { useCurrentUser } from "@/lib/hooks/useCurrentUser"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { toast } from "sonner"

export default function AuthorizedPage() {
  const user = useCurrentUser()

  const onAuthenticatedAPIClick = () => {
    fetch("/api/authenticated").then((response) => {
      if (response.ok) {
        toast.success("Allowed Authenticated API Route")
      } else {
        toast.error("Forbidden Authenticated API Route")
      }
    })
  }

  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>Authorized Section</CardTitle>
          <CardDescription>
            This section is only visible to authenticated users.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <h6 className="font-semibold text-sm">User Details:</h6>
          <div className="flex gap-1 flex-col mt-2">
            <p>User ID: {user?.id}</p>
            <p>Name: {user?.name}</p>
            <p>Email: {user?.email}</p>
            <p>Role: {user?.role}</p>
            <p>
              Two Factor Enabled: {user?.isTwoFactorEnabled ? "True" : "False"}
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <div className="py-4 flex flex-row w-full items-center font-medium justify-between">
            <p>Authenticated API Route</p>
            <p>
              <Button onClick={onAuthenticatedAPIClick}>Click to Test</Button>
            </p>
          </div>
        </CardFooter>
      </Card>
    </section>
  )
}
