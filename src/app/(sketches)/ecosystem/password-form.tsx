"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"

type PasswordFormProps = {
  login: (isWrongPassword: boolean, form: FormData) => Promise<boolean>
}

export function PasswordForm(props: PasswordFormProps) {
  const [isWrongPassword, formAction] = useActionState(props.login, false)
  return (
    <form action={formAction}>
      <PasswordField isWrongPassword={isWrongPassword} />
    </form>
  )
}

function PasswordField(props: { isWrongPassword: boolean }) {
  const { pending } = useFormStatus()
  return (
    <div className="mt-4 mb-1 h-8 text-sm">
      <label htmlFor="password">
        {pending
          ? "Submitting..."
          : props.isWrongPassword
            ? "Wrong, try again"
            : "Enter the password"}
      </label>
      <input
        type="password"
        name="password"
        id="password"
        className="ml-2 border-muted border rounded-sm bg-background px-1"
        disabled={pending}
      />
    </div>
  )
}
