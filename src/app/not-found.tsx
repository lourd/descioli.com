import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6">
      <h1 className="text-3xl leading-relaxed text-center">
        {"¯\\_(ツ)_/¯"}
        <br />
        page not found
      </h1>
      <Link
        href="/"
        className="border border-foreground rounded px-2 py-1 hocus:bg-muted transition-colors duration-200"
      >
        Go home
      </Link>
    </div>
  )
}
