import type { Metadata } from "next"
import { ReactNode, Suspense } from "react"

import AutoRefresh from "@/components/auto-refresh"

import "./globals.css"

import { AppProvider } from "@/components/app-context"
import { HistoryTracker } from "@/components/history-tracker"

export const metadata: Metadata = {
  title: {
    default: "DeScioli.com",
    template: "%s • DeScioli.com",
  },
  description: "The personal site of Louis R. DeScioli",
  keywords: [
    "software engineer",
    "creative coding",
    "portfolio",
    "startups",
    "entrepreneurship",
    "design",
    "personal website",
    "augmented reality",
    "MIT",
    "resume",
  ],
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AutoRefresh>
          <AppProvider>
            <Suspense fallback={null}>
              <HistoryTracker />
            </Suspense>
            {children}
          </AppProvider>
        </AutoRefresh>
      </body>
    </html>
  )
}
