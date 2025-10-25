"use client"

import { useEffect, useState } from "react"

let isClient = false

export function ClientOnly(props: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(isClient)
  useEffect(() => {
    if (!isClient) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- Intentional cascading render
      setIsMounted(true)
      isClient = true
    }
  }, [])
  return isMounted ? props.children : null
}
