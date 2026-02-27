"use client"

import { Route } from "next"
import { useParams, useRouter } from "next/navigation"

export function GroveSelect(props: { options: Record<string, string> }) {
  const params = useParams<{ name: string }>()
  const router = useRouter()
  const names = Object.entries(props.options)
  return (
    <select
      className="text-3xl -mx-1"
      defaultValue={params.name}
      onChange={(evt) => {
        const slug = evt.target.value
        router.push(`/ecosystem/${slug}` as Route)
      }}
    >
      {names.map(([slug, name]) => (
        <option key={name} value={slug}>
          {name}
        </option>
      ))}
    </select>
  )
}
