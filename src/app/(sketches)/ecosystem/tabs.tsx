"use client"

import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"

const tabs = [
  ["Canopy", null],
  ["Aquarium", "aquarium"],
  ["Pump", "pump"],
]

export function Tabs() {
  const segment = useSelectedLayoutSegment()

  return (
    <div className="border-muted border rounded-full flex flex-row w-fit">
      {tabs.map(([name, slug]) => {
        return (
          <Link
            key={name}
            className={`px-3 py-1 transition-colors hocus:bg-muted/50 first:rounded-l-full last:rounded-r-full aria-pressed:bg-muted!`}
            href={`/ecosystem${slug ? `/${slug}` : ""}`}
            aria-pressed={segment === slug ? true : undefined}
          >
            {name}
          </Link>
        )
      })}
    </div>
  )
}
