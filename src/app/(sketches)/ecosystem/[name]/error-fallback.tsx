"use client"

export function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="mt-2">
      There was like, an error or something?
      <pre className="text-red-400 text-sm mt-1">{error.message}</pre>
    </div>
  )
}
