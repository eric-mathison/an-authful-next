"use client"

import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Loading02Icon, ViewIcon, ViewOffIcon } from "hugeicons-react"
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
import { registerSchema } from "@/lib/schemas/register"
import { registerFormAction } from "@/lib/actions/register-form.actions"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"

export function RegisterForm() {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const form = useForm<z.output<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const onSubmit = (data: z.output<typeof registerSchema>) => {
    setError("")
    setSuccess("")

    startTransition(async () => {
      const formData = new FormData()
      if (data.email) formData.append("email", data.email)
      if (data.password) formData.append("password", data.password)
      if (data.name) formData.append("name", data.name)

      registerFormAction(formData).then((data) => {
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" disabled={isPending} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
          Create an account
        </Button>
      </form>
    </Form>
  )
}
