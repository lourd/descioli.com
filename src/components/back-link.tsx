"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { MouseEvent, Ref, use } from "react"

import { AppContext } from "./app-context"

type BackLinkProps = React.ComponentProps<typeof Link> & {
  useBack?: boolean
}

export function BackLinkWithHand({
  className = "",
  useBack = true,
  ref,
  ...props
}: BackLinkProps) {
  const BackLink = useBack ? MaybeGoBackLink : Link
  return (
    <div
      ref={ref as Ref<HTMLDivElement>}
      className={`left-0 right-0 top-0 z-20 h-12 flex flex-row align-center max-md:p-1 max-md:bg-white/75 dark:max-md:bg-background/75 max-md:backdrop-blur-xl md:h-0 ${className}`}
    >
      <BackLink
        className={`md:absolute md:top-4 md:left-4 lg:top-6 lg:left-6 hocus:bg-muted/75 md:backdrop-blur-xl md:bg-background/50 text-xl md:text-xl lg:text-2xl px-2 py-1 rounded-sm flex items-center`}
        {...props}
      >
        <span className="mr-2" role="img">
          👈
        </span>
        Back
      </BackLink>
    </div>
  )
}

function MaybeGoBackLink({
  onClick,
  ref,
  ...props
}: React.ComponentProps<typeof Link>) {
  const { state } = use(AppContext)
  const router = useRouter()

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // if there is a prior history, go back
    if (state.history.length > 1) {
      e.preventDefault()
      router.back()
    }
    onClick?.(e)
  }

  return <Link onClick={handleClick} {...props} ref={ref} />
}
