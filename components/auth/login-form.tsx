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
import { FormError } from "@/components/ui/form-error"

export function LoginForm() {
  // Using useFormState to allow us to display server side validation and errors
  // also allows us to support no JS users
  const [state, formAction] = useFormState(LoginFormAction, {
    message: "",
  })

  const formRef = useRef<HTMLFormElement>(null)

  const form = useForm<z.output<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      ...(state?.fields ?? {}),
    },
  })

  return (
    <Form {...form}>
      <form
        action={formAction}
        onSubmit={(event) => {
          form.handleSubmit(() => formRef.current?.submit())(event)
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
                  placeholder="password"
                  autoCapitalize="none"
                  autoCorrect="off"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {state?.message !== "" && !state.issues && (
          <FormError message={state.message} />
        )}
        {state?.issues && (
          <div>
            <ul>
              {state.issues.map((issue) => (
                <li key={issue} className="flex gap-1">
                  <FormError message={state?.message} />
                </li>
              ))}
            </ul>
          </div>
        )}
        <Button type="submit">Log in</Button>
      </form>
    </Form>
  )
}
