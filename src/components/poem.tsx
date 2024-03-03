import { ReactNode } from "react"

export function Poem({
  children,
  title,
}: {
  children: ReactNode
  title: ReactNode
}) {
  return (
    <pre className="border-l-4 border-gray-300 px-4 bg-gray-100 font-serif overflow-auto dark:border-gray-950 dark:bg-gray-800">
      <br />
      <h3 className="mb-2 sticky left-0">{title}</h3>
      <div className="text-xs leading-tight">{children}</div>
    </pre>
  )
}
