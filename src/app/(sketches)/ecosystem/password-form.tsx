"use client"

import { useFormState } from "react-dom"

type PasswordFormProps = {
  authenticated: boolean
  logout: () => void
  login: (isWrongPassword: boolean, form: FormData) => Promise<boolean>
}

export function PasswordForm(props: PasswordFormProps) {
  const [isWrongPassword, formAction] = useFormState(props.login, false)
  return (
    <div className="mt-4 mb-1 h-8 text-sm">
      {props.authenticated ? (
        <form action={props.logout}>
          <button type="submit" className="bg-muted px-2 py-1 rounded">
            Logout
          </button>
        </form>
      ) : (
        <form action={formAction}>
          <label htmlFor="password">
            {isWrongPassword ? "Wrong, try again" : "Enter the password"}:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="ml-2 border-muted border rounded bg-background px-1"
          />
        </form>
      )}
    </div>
  )
}
