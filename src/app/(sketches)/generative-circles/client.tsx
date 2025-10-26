"use client"

import { useControls } from "leva"
import React, { ReactNode } from "react"
import { useWindowSize } from "react-use"

import { ClientOnly } from "@/components/client-only"

const INITIAL_RADIAL_OFFSET = Math.PI / 6

export function GenerativeCircles() {
  const {
    numCirclesPerGroup,
    gapConstant,
    innerCircleRadius,
    numGroups,
    gapFactor,
    showContainingCircle,
    rotate,
    rotationsPerSecond, // rotations per second
  } = useControls({
    numGroups: { value: 6, min: 1, max: 72, step: 1 },
    numCirclesPerGroup: { value: 12, min: 1, max: 40, step: 1 },
    gapConstant: { value: 12, min: 0.1, max: 30 },
    gapFactor: { value: 1, min: 0, max: 4 },
    innerCircleRadius: { value: 20, min: 1, max: 100, step: 1 },
    showContainingCircle: true,
    rotate: false,
    rotationsPerSecond: { value: 0.1, min: 0.01, max: 5, step: 0.1 },
  })

  const { width: windowWidth, height: windowHeight } = useWindowSize()
  const circles: ReactNode[] = []
  for (let group = 0; group < numGroups; group++) {
    const radialOffset =
      INITIAL_RADIAL_OFFSET + (group * 2 * Math.PI) / numGroups
    for (let i = 1; i <= numCirclesPerGroup; i++) {
      const radius = innerCircleRadius + i ** gapFactor * gapConstant
      const cosine = Math.cos(radialOffset)
      const sine = Math.sin(radialOffset)
      const cxOffset = -cosine * innerCircleRadius
      const cyOffset = -sine * innerCircleRadius
      const cx = windowWidth / 2 + cosine * radius + cxOffset
      const cy = windowHeight / 2 + sine * radius + cyOffset
      circles.push(
        <circle
          key={group * numCirclesPerGroup + i}
          stroke="#fff"
          strokeWidth={1}
          r={radius}
          cx={cx}
          cy={cy}
          fillOpacity={0}
        />
      )
    }
  }
  const containingCircleRadius =
    numCirclesPerGroup ** gapFactor * gapConstant * 2 + innerCircleRadius

  return (
    <ClientOnly>
      <div className="bg-[#111245] absolute top-0 left-0 bottom-0 right-0 flex justify-center items-center overflow-hidden">
        <svg
          height={windowHeight}
          width={windowWidth}
          className={`overflow-visible ${rotate ? "animate-[spin_var(--cycle-speed)_linear_infinite]" : ""}`}
          style={
            {
              "--cycle-speed": `${1 / rotationsPerSecond}s`,
            } as React.CSSProperties
          }
        >
          <circle
            fill="#fff"
            r={innerCircleRadius}
            cx={windowWidth / 2}
            cy={windowHeight / 2}
          />
          {showContainingCircle && (
            <circle
              r={containingCircleRadius}
              cx={windowWidth / 2}
              cy={windowHeight / 2}
              stroke="#fff"
              strokeWidth={1}
              fillOpacity={0}
            />
          )}
          {circles}
        </svg>
      </div>
    </ClientOnly>
  )
}
