"use client"

import clsx from "clsx"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"
import { startTransition, useOptimistic } from "react"

const tabs = [
  ["Canopy", null],
  ["Aquarium", "aquarium"],
  ["Pump", "pump"],
]

export function Tabs() {
  const segment = useSelectedLayoutSegment()
  const [optSegment, setSegment] = useOptimistic(segment)

  return (
    <div className="border-muted border rounded-full flex flex-row w-fit">
      {tabs.map(([name, slug]) => {
        return (
          <Link
            key={name}
            className={clsx(
              `px-3 py-1 transition-colors first:rounded-l-full last:rounded-r-full aria-pressed:bg-muted!`,
              optSegment === slug ? "bg-muted/60" : "hocus:bg-muted/20"
            )}
            href={`/ecosystem${slug ? `/${slug}` : ""}`}
            onNavigate={() => startTransition(() => setSegment(slug))}
            aria-pressed={segment === slug ? true : undefined}
          >
            {name}
          </Link>
        )
      })}
    </div>
  )
}
