import { createRoot } from "@react-three/fiber"
import { useEffect, useState } from "react"

/**
 * A bare-bones Canvas component that uses `createRoot` from @react-three/fiber
 * to avoid the overhead and bug related to `useMeasure` that's built into the
 * default Canvas component from the library.
 */
export function Canvas(props: { children: React.ReactNode }) {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (!canvas) return
    const root = createRoot(canvas)
    root.render(props.children)
    return () => {
      root.unmount()
    }
  }, [canvas, props.children])

  return <canvas ref={setCanvas} />
}
