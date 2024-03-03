"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { use, useEffect } from "react"

import { AppContext } from "./app-context"

/**
 * Adds the full paths of the URL (path + search params) to `history` in app state
 * as it changes. Does not reflect the browser's history accurately; unable to handle
 * built-in back/forward correctly without more support from Next.js.
 */
export function HistoryTracker() {
  const { setState } = use(AppContext)
  const path = usePathname()
  const searchParams = useSearchParams()
  const href = `${path}${searchParams ? `?${searchParams.toString()}` : ""}`

  useEffect(() => {
    setState((draft) => {
      if (
        !draft.history.length ||
        // If the new path is the same as the last path, don't add it to history.
        // This achieves two things:
        // 1. handling the double-effect execution in strict mode
        // 2. coordinating with BackLink behavior - not the path to history when the user
        draft.history[draft.history.length - 1] !== href
      ) {
        draft.history.push(href)
      }
    })
  }, [href, setState])

  return null
}
