"use client"

import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { resetPasswordSchema } from "@/lib/schemas/reset-password"
import { resetPasswordFormAction } from "@/lib/actions/reset-password-form.actions"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"
import { Loading02Icon } from "hugeicons-react"
import { ResendVerificationLink } from "@/components/auth/resend-verification-link"

export function ResetPasswordForm() {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")

  const form = useForm<z.output<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = (data: z.output<typeof resetPasswordSchema>) => {
    setError("")
    setSuccess("")

    startTransition(async () => {
      const formData = new FormData()
      if (data.email) formData.append("email", data.email)

      resetPasswordFormAction(formData).then((data) => {
        setError(data.error)
        setSuccess(data.success)
      })
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="John@email.com"
                  autoCapitalize="none"
                  autoCorrect="off"
                  type="email"
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormError message={error} />
        <FormSuccess message={success} />
        <Button disabled={isPending} className="w-full" type="submit">
          {isPending && <Loading02Icon className="animate-spin w-6 h-6" />}{" "}
          Reset Password
        </Button>
      </form>
    </Form>
  )
}
