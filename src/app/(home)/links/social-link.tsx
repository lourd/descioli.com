"use client"

import type { Link } from "./links"

export function SocialLink({ link }: { link: Link }) {
  const Component = link.copyToClipboard ? "button" : "a"

  return (
    <Component
      key={link.link}
      href={link.copyToClipboard ? undefined : link.link}
      onClick={
        link.copyToClipboard
          ? async () => {
              try {
                await navigator.clipboard.writeText(link.link)
                alert("Copied to clipboard")
              } catch {
                // ignore it
              }
            }
          : undefined
      }
      style={
        {
          "--color": link.color,
        } as React.CSSProperties
      }
      className="group relative flex items-center py-2 px-2 no-underline transitionhocus:underline hocus:z-10 text-[1.7rem] font-light hocus:duration duration-1000 hocus:duration-200 leading-none text-foreground hocus:text-[--color] text-shadow-sm shadow-gray-900/30"
      title={link.name}
    >
      {link.description}
      <div
        style={{ background: link.bg }}
        className="absolute top-0 left-0 right-0 bottom-0 transition-transform scale-x-[0.01] -translate-x-[1%] group-hover:scale-x-100 group-focus:scale-x-100 group-hover:translate-x-0 group-focus:translate-x-0 -z-10 origin-left duration-1000 group-hover:duration-200"
      />
    </Component>
  )
}
