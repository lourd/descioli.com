import { ClientOnly } from "@/components/client-only"

import { HandTrackingClient } from "./client"

export const metadata = {
  title: "Hand Tracking",
}

export default function HandTrackingPage() {
  return <HandTrackingClient />
}
