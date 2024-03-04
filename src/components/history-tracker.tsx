"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { use, useEffect } from "react"

import { AppContext } from "./app-context"

/**
 * Super basic tracking of the URL, just to know if there is a place to go back to.
 * Does not reflect the browser's history accurately; unable to handle
 * built-in back/forward correctly without more support from Next.js.
 */
export function HistoryTracker() {
  const { setState } = use(AppContext)
  const path = usePathname()
  const searchParams = useSearchParams().toString()
  const href = `${path}${searchParams ? `?${searchParams}` : ""}`

  useEffect(() => {
    setState((draft) => {
      if (
        !draft.history.length ||
        // If the new path is the same as the last path, don't add it to history.
        draft.history[draft.history.length - 1] !== href
      ) {
        draft.history.push(href)
      }
    })
  }, [href, setState])

  return null
}
