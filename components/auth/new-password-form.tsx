"use client"

import { useFormState } from "react-dom"
import { useRef } from "react"
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
import { Loading02Icon } from "hugeicons-react"
import { newPasswordSchema } from "@/lib/schemas/new-password"
import { newPasswordAction } from "@/lib/actions/new-password.actions"
import { ResendVerificationLink } from "@/components/auth/resend-verification-link"

export function NewPasswordForm() {
  const searchParams = useSearchParams()
  const token = searchParams?.get("token")

  const [formState, formAction] = useFormState(
    newPasswordAction.bind(null, token),
    {}
  )

  const formRef = useRef<HTMLFormElement>(null)

  const form = useForm<z.output<typeof newPasswordSchema>>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
      ...(formState?.fields ?? {}),
    },
  })

  return (
    <Form {...form}>
      <form
        action={formAction}
        onSubmit={(event) => {
          event.preventDefault()
          form.handleSubmit(() => formAction(new FormData(formRef.current!)))(
            event
          )
        }}
        className="space-y-8"
        ref={formRef}
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="********" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {formState?.error && !formState?.issues && (
          <div className="flex flex-col gap-1">
            {formState?.error !== "" && !formState.issues && (
              <FormError message={formState.error} />
            )}
          </div>
        )}
        {formState?.issues && (
          <div>
            <ul className="flex flex-col gap-y-1">
              {formState.issues.map((issue) => (
                <li key={issue} className="flex gap-1">
                  <FormError message={issue} />
                </li>
              ))}
            </ul>
          </div>
        )}
        {formState?.success !== "" && (
          <FormSuccess message={formState.success} />
        )}
        <Button
          disabled={form.formState.isSubmitting}
          className="w-full"
          type="submit"
        >
          {form.formState.isSubmitting && (
            <Loading02Icon className="animate-spin w-6 h-6" />
          )}{" "}
          Reset Password
        </Button>
      </form>
    </Form>
  )
}
