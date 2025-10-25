"use client"

import { useSelectedLayoutSegment } from "next/navigation"
import { useRef, ViewTransition } from "react"
import { CSSTransition } from "react-transition-group"

import { BackLinkWithHand } from "@/components/back-link"

import { ProfileCard } from "./profile-card"

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const segment = useSelectedLayoutSegment()
  const linkNode = useRef<HTMLAnchorElement>(null)
  return (
    <>
      <CSSTransition
        in={Boolean(segment)}
        nodeRef={linkNode}
        timeout={200}
        classNames={{
          enter: "opacity-0",
          enterActive: "transition-opacity duration-200 opacity-100",
          enterDone: "opacity-100",
          exitActive: "transition-opacity duration-200 opacity-0",
        }}
        unmountOnExit
      >
        <BackLinkWithHand
          href="/"
          // On other index pages, always go to / on back.
          useBack={!(segment === "blog" || segment === "sketches")}
          ref={linkNode}
          className="fixed"
        />
      </CSSTransition>
      <div
        className={`p-3 lg:p2 md:p-0 grid max-lg:gap-10 lg:grid-rows-1 lg:grid-cols-2`}
      >
        <div
          className={`mt-10 flex justify-center lg:mt-0 lg:sticky lg:top-0 lg:h-screen`}
        >
          <div className="lg:absolute lg:right-[12%] lg:top-1/2 lg:-translate-y-1/2">
            <ProfileCard />
          </div>
        </div>
        <div
          className={`flex flex-col items-start justify-center pb-10 lg:pt-10 max-lg:mx-auto lg:pr-4`}
        >
          <ViewTransition>{children}</ViewTransition>
        </div>
      </div>
    </>
  )
}
