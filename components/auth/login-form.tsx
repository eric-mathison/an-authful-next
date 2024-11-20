"use client"

import { useContext, useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
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
import { loginSchema } from "@/lib/schemas/login"
import { loginFormAction } from "@/lib/actions/login-form.actions"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"
import { ResendVerificationLink } from "@/components/auth/resend-verification-link"
import { ModalContext } from "@/lib/contexts/modal"

export function LoginForm() {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const [field, setField] = useState<string | undefined>("")

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [twoFactor, setTwoFactor] = useState(false)

  const searchParams = useSearchParams()
  const oAuthError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email is already in use with a different provider."
      : ""

  const { isModal } = useContext(ModalContext)

  const form = useForm<z.output<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      code: "",
    },
  })

  const onSubmit = (data: z.output<typeof loginSchema>) => {
    setError("")
    setSuccess("")

    startTransition(async () => {
      const formData = new FormData()
      if (data.email) formData.append("email", data.email)
      if (data.password) formData.append("password", data.password)
      if (data.code) formData.append("code", data.code)

      loginFormAction(formData).then((data) => {
        if (data?.error) {
          setError(data.error)
          setField(data.field)
        }
        if (data?.success) setSuccess(data.success)
        if (data?.twoFactor) setTwoFactor(true)
      })
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {twoFactor && (
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Two Factor Code</FormLabel>
                <FormControl>
                  <Input placeholder="123456" {...field} disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {!twoFactor && (
          <>
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
                  <Button
                    size="sm"
                    variant="link"
                    asChild
                    className="px-0 font-normal"
                  >
                    <Link href="/auth/reset" replace={isModal}>
                      Forgot Password?
                    </Link>
                  </Button>
                </FormItem>
              )}
            />
          </>
        )}
        {oAuthError !== "" && <FormError message={oAuthError} />}
        {error && (
          <div className="flex flex-col gap-1">
            <FormError message={error} />
            {error === "Email not verified" && (
              <ResendVerificationLink email={field} />
            )}
          </div>
        )}

        <FormSuccess message={success} />
        <Button disabled={isPending} className="w-full" type="submit">
          {isPending && <Loading02Icon className="animate-spin w-6 h-6" />}{" "}
          {twoFactor ? "Confirm" : "Log in"}
        </Button>
      </form>
    </Form>
  )
}
