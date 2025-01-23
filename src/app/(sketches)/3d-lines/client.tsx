"use client"

import { CameraControls, Line } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { interpolateRainbow, interpolateSinebow } from "d3"
import { useControls } from "leva"

export function DiamondLinesClient() {
  return (
    <div className="w-screen h-screen">
      <Canvas
        camera={{
          position: [0, 0, 8],
        }}
      >
        <DiamondLines />
        <ambientLight />
        <CameraControls maxDistance={32} />
      </Canvas>
    </div>
  )
}

const roygbiv = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"]

function DiamondLines() {
  const {
    interpolation,
    numLines,
    lineWidth,
    midHeight,
    topHeight,
    radius,
    innerRadius,
  } = useControls({
    interpolation: {
      options: ["rainbow", "sinebow", "roygbiv"],
      value: "rainbow",
    },
    numLines: {
      value: 35,
      min: 1,
      max: 100,
      step: 1,
    },
    lineWidth: {
      value: 1,
      min: 0.1,
      max: 5,
      step: 0.1,
    },
    midHeight: {
      value: 2,
      min: 0.1,
      max: 5,
      step: 0.1,
    },
    topHeight: {
      value: 5,
      min: 0.1,
      max: 25,
      step: 0.1,
    },
    radius: {
      value: 5,
      min: 0.001,
      max: 25,
      step: 0.1,
    },
    innerRadius: {
      value: 1,
      min: 0.001,
      max: 25,
      step: 0.1,
    },
  })

  const lines = Array(numLines)
    .fill(undefined)
    .map((_, i) => {
      const rotation = ((2 * Math.PI) / numLines) * i
      const t = i / (numLines - 1)

      let color: string
      if (interpolation === "rainbow") {
        color = interpolateRainbow(t)
      } else if (interpolation === "sinebow") {
        color = interpolateSinebow(t)
      } else {
        color = roygbiv[i % roygbiv.length]
      }
      return (
        <Line
          key={i}
          points={[
            [0, 0, 0],
            [1, midHeight, innerRadius],
            [0, 0, radius],
            [0, topHeight, 0],
          ]}
          lineWidth={lineWidth}
          rotation={[0, rotation, 0]}
          color={color}
        />
      )
    })
  return (
    <>
      <group>{lines}</group>
      <group rotation={[0, 0, Math.PI]}>{lines}</group>
    </>
  )
}
