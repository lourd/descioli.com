"use client"

import { useRouter } from "next/navigation"
import { useContext, useEffect } from "react"
import { useFormState, useFormStatus } from "react-dom"

import { useMounted } from "@/lib/use-mounted"

import { EcosystemContext } from "./ecosystem-context"

export function EcoTime(props: {
  changeTimezone: (offset: number) => Promise<number>
  timeZone: number
}) {
  const isClient = useMounted()
  const router = useRouter()
  const ecoNow = useContext(EcosystemContext)

  const timeZone = (-1 * ecoNow.getTimezoneOffset()) / 60
  const matchingTimezones = timeZone === props.timeZone

  const [response, action] = useFormState(
    () => props.changeTimezone(timeZone),
    0
  )
  const stillMismatching = response === 1 && !matchingTimezones

  useEffect(() => {
    // There's a delay between the time being updated and the response being
    // accurate, so loop refetching the time until the timezones match.
    if (stillMismatching) {
      let timeout = 1000
      let timeoutId = setTimeout(function refresh(): void {
        router.refresh()
        timeout *= 2
        timeoutId = setTimeout(refresh, timeout)
      }, timeout)
      return () => clearTimeout(timeoutId)
    }
  }, [response, router, stillMismatching])

  if (!isClient) return null

  return (
    <>
      {" • "}
      <span
        className={response === 1 && matchingTimezones ? "text-accent" : ""}
      >
        {ecoNow.toLocaleTimeString()}
      </span>{" "}
      {!matchingTimezones && (
        <form action={action} className="inline-flex ">
          <EcoTimeButton refetching={stillMismatching} />
        </form>
      )}
    </>
  )
}

function EcoTimeButton(props: { refetching: boolean }) {
  const { pending } = useFormStatus()
  const loading = pending || props.refetching
  return (
    <button
      type="submit"
      disabled={loading}
      title="The time zone on your Ecosystem and this computer don't match. Click to update the Ecosystem's timezone"
      className={`${loading ? "bg-accent/80" : "border border-amber-500 hocus:bg-amber-500"} px-2 h-5 text-xs rounded-full transition-colors`}
    >
      {loading ? "🪄" : "⏰"}
    </button>
  )
}
