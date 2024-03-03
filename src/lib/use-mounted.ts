import { useEffect, useState } from "react"

/**
 * Used to only render after a component is mounted/on the client.
 */
export function useMounted() {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])
  return isMounted
}
