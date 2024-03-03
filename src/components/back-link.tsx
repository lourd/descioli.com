"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { ForwardedRef, forwardRef, MouseEvent, use } from "react"

import { AppContext } from "./app-context"

export const BackLink = forwardRef(function BackLink(
  { onClick, ...props }: React.ComponentProps<typeof Link>,
  ref: ForwardedRef<HTMLAnchorElement>
) {
  const { state, setState } = use(AppContext)
  const router = useRouter()

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // if the second to last path in history matches the new destination,
    // remove the current entry and call back on the router.
    if (
      state.history.length > 1 &&
      state.history[state.history.length - 2] === props.href
    ) {
      setState((draft) => {
        draft.history.pop()
      })
      e.preventDefault()
      router.back()
    }
    onClick?.(e)
  }

  return <Link onClick={handleClick} {...props} ref={ref} />
})

export const BackLinkWithHand = forwardRef(function BackLinkWithHand(
  { onClick, className, ...props }: React.ComponentProps<typeof Link>,
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <div
      ref={ref}
      className={`left-0 right-0 top-0 z-20 h-12 flex flex-row align-center max-md:p-1 max-md:bg-white/75 dark:max-md:bg-background/75 max-md:backdrop-blur-xl md:h-0 duration-200 transition-all ${className ?? ""}`}
    >
      <BackLink
        className={`md:absolute md:top-4 md:left-4 lg:top-6 lg:left-6 hocus:bg-muted/75 md:backdrop-blur-xl md:bg-background/50 text-xl md:text-xl lg:text-2xl px-2 py-1 rounded flex items-center`}
        {...props}
      >
        <span className="mr-2">👈</span>
        Back
      </BackLink>
    </div>
  )
})
