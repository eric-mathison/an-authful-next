"use client"

import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useSearchParams } from "next/navigation"
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
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"
import { Loading02Icon, ViewIcon, ViewOffIcon } from "hugeicons-react"
import { newPasswordSchema } from "@/lib/schemas/new-password"
import { newPasswordAction } from "@/lib/actions/new-password.actions"

export function NewPasswordForm() {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")

  const searchParams = useSearchParams()
  const token = searchParams?.get("token")

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const form = useForm<z.output<typeof newPasswordSchema>>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
    },
  })

  const onSubmit = (data: z.output<typeof newPasswordSchema>) => {
    setError("")
    setSuccess("")

    startTransition(async () => {
      const formData = new FormData()
      if (data.password) formData.append("password", data.password)

      newPasswordAction(token, formData).then((data) => {
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="********"
                    autoCapitalize="none"
                    autoCorrect="off"
                    type={isPasswordVisible ? "text" : "password"}
                    disabled={isPending}
                    {...field}
                  />
                  {isPasswordVisible ? (
                    <ViewIcon
                      className="absolute w-6 h-6 right-2 top-1.5 z-10 cursor-pointer text-muted-foreground"
                      onClick={() => {
                        setIsPasswordVisible(!isPasswordVisible)
                      }}
                    />
                  ) : (
                    <ViewOffIcon
                      className="absolute w-6 h-6 right-2 top-2 z-10 cursor-pointer text-muted-foreground"
                      onClick={() => {
                        setIsPasswordVisible(!isPasswordVisible)
                      }}
                    />
                  )}
                </div>
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
