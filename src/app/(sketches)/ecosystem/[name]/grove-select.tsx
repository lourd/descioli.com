"use client"

import { Route } from "next"
import { usePathname, useRouter } from "next/navigation"

export function GroveSelect(props: {
  children: React.ReactNode
  value: string
}) {
  const path = usePathname()
  const router = useRouter()
  return (
    <select
      className="text-3xl -mx-1"
      value={props.value}
      onChange={(evt) => {
        router.push(path.replace(props.value, evt.target.value) as Route)
      }}
    >
      {props.children}
    </select>
  )
}
