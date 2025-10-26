"use client"

import { useSyncExternalStore } from "react"

export interface ClientOnlyProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

/**
 * Renders `children` only on the client/after hydration, with an optional `fallback`.
 */
export function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  return useHydrated() ? children : fallback
}

function useHydrated(): boolean {
  return useSyncExternalStore(
    noop,
    () => true,
    () => false
  )
}

function noop() {
  return () => {}
}
