import { BackLinkWithHand } from "@/components/back-link"

export default function SketchesPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <BackLinkWithHand href="/sketches" className="sticky" />
      {children}
    </>
  )
}
