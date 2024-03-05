"use client"

import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"

const lights = [
  ["Canopy", "canopy"],
  ["Aquarium", "aquarium"],
]

export function LightTabs() {
  const segment = useSelectedLayoutSegment()

  return (
    <div className="border-muted border rounded-full flex flex-row w-fit">
      {lights.map(([name, slug], i, arr) => {
        return (
          <Link
            key={name}
            className={`px-3 py-1 transition-colors hocus:bg-muted/50 ${
              segment === slug ? "!bg-muted" : ""
            } ${i === 0 ? "rounded-l-full" : ""} ${i === arr.length - 1 ? "rounded-r-full" : ""}`}
            href={`/ecosystem/${slug}`}
          >
            {name}
          </Link>
        )
      })}
    </div>
  )
}
