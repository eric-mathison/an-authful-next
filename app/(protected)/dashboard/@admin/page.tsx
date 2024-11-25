// This is a parallel route that loads in the dashboard layout

"use client"

import { useCurrentRole } from "@/lib/hooks/useCurrentRole"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"
import { UserRole } from "@prisma/client"
import { toast } from "sonner"

export default function AdminPage() {
  const role = useCurrentRole()

  const onAdminAPIClick = () => {
    fetch("/api/admin").then((response) => {
      if (response.ok) {
        toast.success("Allowed Admin API Route")
      } else {
        toast.error("Forbidden Admin API Route")
      }
    })
  }

  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>Admin Section</CardTitle>
          <CardDescription>
            This section is only visible to users with the admin role.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {role === UserRole.ADMIN ? (
            <FormSuccess message="Your role is ADMIN!" />
          ) : (
            <FormError message="You are not of the ADMIN role" />
          )}
        </CardContent>
        <CardFooter>
          <div className="py-4 flex flex-row w-full items-center font-medium justify-between">
            <p>Admin API Route</p>
            <p>
              <Button onClick={onAdminAPIClick}>Click to Test</Button>
            </p>
          </div>
        </CardFooter>
      </Card>
    </section>
  )
}
