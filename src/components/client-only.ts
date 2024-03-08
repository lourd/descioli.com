"use client"

import { useEffect, useState } from "react"

export function ClientOnly(props: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])
  return isMounted ? props.children : null
}
