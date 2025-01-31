"use client"

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion"
import React, { useState } from "react"

type Idea = "exact" | "spring" | "spring-and-scale" | "exact-framer"

export function CursorFollowStudy() {
  const [active, setActive] = useState("exact" as Idea)
  return (
    <>
      <div className="absolute top-0 left-0 right-0 flex flex-row justify-center items-center mt-2 z-10 gap-1">
        <select
          name="active"
          id="active"
          value={active}
          onChange={(evt) => {
            setActive(evt.target.value as Idea)
          }}
          className="mt-16 border border-muted bg-transparent px-2 py-1 rounded-sm"
        >
          <option value="exact">Exact follow with React</option>
          <option value="exact-framer">Exact follow with Framer</option>
          <option value="spring">Spring-based follow</option>
          <option value="spring-and-scale">
            Spring-based follow {"&"} scale
          </option>
        </select>
      </div>
      {active === "exact" && <SetState />}
      {active === "exact-framer" && <FramerImmediate />}
      {active === "spring" && <FramerSpring />}
      {active === "spring-and-scale" && <FramerSpringScale />}
    </>
  )
}

/**
 * Immediate matching of the circle's position to the mouse. Updates the state
 * through React's rendering with `useState`.
 */
function SetState() {
  const [state, setState] = useState({ x: 0, y: 0 })
  const handleMouseMove = (
    evt: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    setState({ x: evt.clientX, y: evt.clientY })
  }

  return (
    <svg
      onPointerMove={handleMouseMove}
      className="absolute top-0 h-full w-full fill-transparent touch-none"
    >
      <circle cx={state.x} cy={state.y} r={24} className="stroke-foreground" />
    </svg>
  )
}

function FramerImmediate() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const handleMouseMove = (
    evt: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    x.jump(evt.clientX)
    y.jump(evt.clientY)
  }
  return (
    <svg
      onPointerMove={handleMouseMove}
      className="absolute top-0 h-full w-full fill-transparent touch-none"
    >
      <motion.circle cx={x} cy={y} r={24} className="stroke-foreground" />
    </svg>
  )
}

const wobblySpring = {
  stiffness: 200,
  damping: 12,
}

const stiffSpring = {
  stiffness: 300,
  damping: 20,
}

/**
 * Delayed movement of the circle to the mouse, mediated through a spring
 * object. Updates the state outside of React's rendering with `useSpring`.
 */
function FramerSpring() {
  const x = useSpring(0, wobblySpring)
  const y = useSpring(0, wobblySpring)
  const handleMouseMove = (
    evt: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    x.set(evt.clientX)
    y.set(evt.clientY)
  }
  return (
    <svg
      onPointerMove={handleMouseMove}
      className="absolute top-0 h-full w-full fill-transparent touch-none"
    >
      <motion.circle cx={x} cy={y} r={24} className="stroke-foreground" />
    </svg>
  )
}

function FramerSpringScale() {
  const x = useSpring(0, wobblySpring)
  const y = useSpring(0, wobblySpring)
  const scaleX = useSpring(1, stiffSpring)

  const handleMouseMove = (
    evt: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    x.set(evt.clientX)
    y.set(evt.clientY)
    const currentX = x.get()
    // If the mouse is to the right of the object, leave it "facing" right
    // its original scale. If the mouse is to the left of the object, flip it
    // around to face right.
    scaleX.set(evt.clientX > currentX ? 1 : -1)
  }

  const transform = useMotionTemplate`translate(${x}px, ${y}px) scale(${scaleX}, 1)`

  return (
    <div
      className="absolute top-0 h-full w-full touch-none"
      onPointerMove={handleMouseMove}
    >
      <motion.div style={{ transform }} className="absolute h-0 w-0">
        <svg
          className="-translate-x-[96%] -translate-y-[96%] fill-transparent"
          width="93"
          height="51"
          viewBox="13 1 93 51"
        >
          <path
            d="M66.5 11.5C80 17.5673 96.0001 44 96.0001 44C96.0001 44 91.5001 24.2813 89.0001 20.2364C86.5001 16.1915 65.5001 2.03447 48.0001 1.02325C30.5001 0.0120331 14.5 8.5 14.5 8.5C14.5 8.5 8.5 19.0842 20 11.5C31.5 3.91585 53 5.43269 66.5 11.5Z"
            className="stroke-foreground"
          />
          <path
            d="M65.5 27.2364C79 33.3037 96.5 42.5 96.5 42.5C96.5 42.5 91.5 31.2812 89 27.2364C86.5 23.1915 64 9.51119 46.5 8.49997C29 7.48875 19 16 19 16C19 16 7.50003 34.8205 19 27.2364C30.5 19.6522 52 21.1691 65.5 27.2364Z"
            className="stroke-foreground"
          />
          <circle cx="97" cy="43" r="8" className="stroke-foreground" />
        </svg>
      </motion.div>
    </div>
  )
}
