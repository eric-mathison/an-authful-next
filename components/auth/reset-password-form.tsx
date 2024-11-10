"use client"
import { useFormState } from "react-dom"
import { useRef } from "react"
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
  // Using useFormState to allow us to display server side validation and errors
  // also allows us to support no JS users
  const [formState, formAction] = useFormState(resetPasswordFormAction, {})

  const formRef = useRef<HTMLFormElement>(null)

  const form = useForm<z.output<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
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
                  {...field}
                />
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
            {formState?.error === "Email not verified" && !formState.issues && (
              <ResendVerificationLink email={formState?.fields?.email!} />
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
