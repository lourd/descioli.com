import { ClientOnly } from "@/components/client-only"

import { CursorFollowStudy } from "./client"

export const metadata = {
  title: "Cursor Follow Motion Study",
  description: "A study in cursor-following animations",
}

export default function CursorFollowPage() {
  return (
    <ClientOnly>
      <CursorFollowStudy />
    </ClientOnly>
  )
}
