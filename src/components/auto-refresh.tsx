"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

let AutoRefresh = () => {
  return null
}

if (process.env.NODE_ENV === "development") {
  AutoRefresh = function AutoRefresh() {
    const router = useRouter()
    useEffect(() => {
      const ws = new WebSocket("ws://localhost:3001")
      ws.onmessage = (event) => {
        if (event.data === "refresh") {
          router.refresh()
        }
      }
      return () => {
        ws.close()
      }
    }, [router])
    return null
  }
}

export { AutoRefresh }
