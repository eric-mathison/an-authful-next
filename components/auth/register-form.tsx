"use client"
import { useFormState } from "react-dom"
import { useRef, useState } from "react"
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
  // Using useFormState to allow us to display server side validation and errors
  // also allows us to support no JS users
  const [formState, formAction] = useFormState(registerFormAction, {})

  const formRef = useRef<HTMLFormElement>(null)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const form = useForm<z.output<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
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
        {formState?.error !== "" && !formState.issues && (
          <FormError message={formState.error} />
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
          Create an account
        </Button>
      </form>
    </Form>
  )
}
