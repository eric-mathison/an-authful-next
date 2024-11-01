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
import { loginSchema } from "@/lib/schemas/login"
import { LoginFormAction } from "@/lib/actions/login-form.actions"
import { FormError } from "@/components/form-error"
import { Loading02Icon } from "hugeicons-react"

export function LoginForm() {
  // Using useFormState to allow us to display server side validation and errors
  // also allows us to support no JS users
  const [formState, formAction] = useFormState(LoginFormAction, {})

  const formRef = useRef<HTMLFormElement>(null)

  const form = useForm<z.output<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      ...(formState?.fields ?? {}),
    },
  })

  return (
    <Form {...form}>
      <form
        action={formAction}
        onSubmit={form.handleSubmit(() => formRef.current?.submit())}
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="********"
                  autoCapitalize="none"
                  autoCorrect="off"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {formState?.error !== "" && !formState.issues && (
          <FormError message={formState.error} />
        )}
        {formState?.issues && (
          <div>
            <ul>
              {formState.issues.map((issue) => (
                <li key={issue} className="flex gap-1">
                  <FormError message={issue} />
                </li>
              ))}
            </ul>
          </div>
        )}
        <Button
          disabled={form.formState.isSubmitting}
          className="w-full"
          type="submit"
        >
          {form.formState.isSubmitting && (
            <Loading02Icon className="animate-spin w-6 h-6" />
          )}{" "}
          Log in
        </Button>
      </form>
    </Form>
  )
}
