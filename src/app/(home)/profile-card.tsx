"use client"

import {
  motion,
  MotionValue,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion"
import Image from "next/image"
import { RefObject, use, useEffect, useImperativeHandle, useRef } from "react"
import { useMedia } from "react-use"

import { AppContext, AppState } from "@/components/app-context"
import { ClientOnly } from "@/components/client-only"

/**
 * @fileoverview A card with a picture of some googly eyes placed over. The eyes
 * follow the mouse cursor or have springy physics depending on device's support
 * detected at runtime. Pressing the button triggers a request on iOS; Chrome
 * allow motion data without asking, but there's nothing to make a distinction
 * between mobile and desktop, other than actually receiving sensor data. I switch
 * between cursor-following vs physics based on if data has been received
 * that follow the mouse or device motion.
 *
 * Someday when the Sensor APIs https://developer.mozilla.org/en-US/docs/Web/API/Sensor_APIs
 * have been worked out and implemented this should be easier to do.
 *
 * TODO: Handle device orientation
 */

export function ProfileCard() {
  const { state, setState } = use(AppContext)
  const leftEye = useRef<GooglyEyeRef>(null)
  const rightEye = useRef<GooglyEyeRef>(null)
  const reducedMotion = useReducedMotion()

  const onClick = async () => {
    if (!reducedMotion && state.motion?.state === "permission-required") {
      if (
        "DeviceMotionEvent" in window &&
        "requestPermission" in window.DeviceMotionEvent
      ) {
        const res = await (
          window.DeviceMotionEvent.requestPermission as () => Promise<string>
        )()
        setState((draft) => {
          if (draft.motion) {
            draft.motion.state =
              res === "granted" ? "permission-granted" : "permission-denied"
          }
        })
      }
    }
    leftEye.current?.randomize()
    rightEye.current?.randomize()
  }

  const readyForMotion =
    state.motion?.state === "permission-granted" ||
    state.motion?.state === "auto-permitted" ||
    state.motion?.state === "received-data"

  const larger = useMedia(`(min-width: 470px)`, false)

  let eyeRadius: number
  let pupilRadius: number
  let leftClasses: string
  let rightClasses: string

  if (larger) {
    eyeRadius = 18
    pupilRadius = 9
    leftClasses = "left-[37%] top-[31.6%]"
    rightClasses = "right-[40.2%] top-[31.1%]"
  } else {
    eyeRadius = 16
    pupilRadius = 8
    leftClasses = "left-[36.5%] top-[31%]"
    rightClasses = "right-[39.4%] top-[30.7%]"
  }

  const initialX = -(0.75 * pupilRadius)
  const initialY = -(0.2 * pupilRadius)

  return (
    <div className="shadow-sm bg-white p-5 block max-w-md rotate-2 select-none">
      <div className="relative">
        <Image
          src="/home-profile.jpg"
          priority
          alt="Louis DeScioli"
          width={1200}
          height={1422}
          className="pointer-events-none"
        />

        {readyForMotion && <MotionData />}

        <ClientOnly>
          <GooglyEye
            className={leftClasses}
            pupilRadius={pupilRadius}
            eyeRadius={eyeRadius}
            initialX={initialX}
            initialY={initialY}
            ref={leftEye}
            acceleration={state.mutableAcceleration}
            motion={state.motion}
            reducedMotion={reducedMotion}
          />
          <GooglyEye
            className={rightClasses}
            pupilRadius={pupilRadius}
            eyeRadius={eyeRadius}
            initialX={initialX}
            initialY={initialY}
            ref={rightEye}
            acceleration={state.mutableAcceleration}
            motion={state.motion}
            reducedMotion={reducedMotion}
          />
        </ClientOnly>
      </div>
      <div className="text-black font-bold text-center text-3xl mt-3 w-full h-12">
        The art of{" "}
        <span className="animate-fadeIn opacity-0 animation-delay-[1.7s]">
          <button
            onClick={onClick}
            // keep transition values in sync with animation in the tailwind config
            className="px-4 py-1 transform border-b-4 border-rose-300 hocus:border-b-2 active:!border-b-0 bg-gradient-to-t from-rose-300/50  via-rose-300 via-40% to-rose-300/20 rounded-2xl hocus:translate-y-px active:!translate-y-[2px] shadow-[0px_10px_13px_-7px_#000000,_5px_5px_15px_5px_rgba(0,0,0,0)] active:shadow-[0px_3px_8px_-7px_#000000] active:to-rose-300/25 active:from-rose-300/55 active:via-rose-300 transition-all animate-pressBtn animation-delay-[2.5s] active:scale-x-[1.05] active:scale-y-[0.95]"
          >
            play
          </button>
        </span>
      </div>
    </div>
  )
}

/**
 * Renders nothing, just the effect for listening to the device motion and orientation events.
 * Exists as a separate component so the ready-status is decoupled from the effect definition.
 * @returns
 */
function MotionData() {
  const { state, setState } = use(AppContext)
  useEffect(() => {
    const updateAcceleration = (e: DeviceMotionEvent) => {
      state.mutableAcceleration.x = e.accelerationIncludingGravity?.x ?? 0
      state.mutableAcceleration.y = e.accelerationIncludingGravity?.y ?? 0
      state.mutableAcceleration.z = e.accelerationIncludingGravity?.z ?? 0

      if (state.motion?.flipAxes) {
        state.mutableAcceleration.x *= -1
        state.mutableAcceleration.y *= -1
      }
    }
    // This is its own listener because calling setState causes a re-render of AppProvider.
    // Only want it to run once.
    const markReceivedData = (e: DeviceMotionEvent) => {
      // Chrome Desktop fires the event with the values set to null
      if (e.accelerationIncludingGravity?.x === null) return
      setState((draft) => {
        draft.motion!.state = "received-data"
      })
    }

    const updateOrientation = (e: DeviceOrientationEvent) => {
      state.mutableOrientation.alpha = e.alpha ?? 0
      state.mutableOrientation.beta = e.beta ?? 0
      state.mutableOrientation.gamma = e.gamma ?? 0
    }

    window.addEventListener("devicemotion", markReceivedData, { once: true })
    window.addEventListener("devicemotion", updateAcceleration)
    window.addEventListener("deviceorientation", updateOrientation)
    return () => {
      window.removeEventListener("devicemotion", updateAcceleration)
      window.removeEventListener("devicemotion", markReceivedData)
      window.removeEventListener("deviceorientation", updateOrientation)
    }
  }, [
    state.mutableAcceleration,
    state.mutableOrientation,
    state.motion?.flipAxes,
    setState,
  ])

  return null
}

type GooglyEyeProps = {
  pupilRadius: number
  eyeRadius: number
  className?: string
  initialX: number
  initialY: number
  acceleration: AppState["mutableAcceleration"]
  motion: AppState["motion"]
  reducedMotion: boolean | null
  ref: RefObject<GooglyEyeRef | null>
}

type GooglyEyeRef = {
  randomize: () => void
}

const SPRING = { stiffness: 1000, damping: 27 }

function GooglyEye(props: GooglyEyeProps) {
  const eyeRef = useRef<HTMLDivElement>(null)
  const pupilRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(props.initialX)
  const y = useMotionValue(props.initialY)
  const sprungX = useSpring(x, SPRING)
  const sprungY = useSpring(y, SPRING)
  const transform = useMotionTemplate`translate(calc(${sprungX}px - 50%), calc(${sprungY}px - 50%))`

  useImperativeHandle(
    props.ref,
    () => {
      return {
        randomize() {
          x.set(Math.random() * props.eyeRadius - props.pupilRadius)
          y.set(Math.random() * props.eyeRadius - props.pupilRadius)
        },
      }
    },
    [props.eyeRadius, props.pupilRadius, x, y]
  )

  return (
    <div
      style={{ width: props.eyeRadius * 2 }}
      ref={eyeRef}
      className={`absolute aspect-square rounded-full origin-center bg-gradient-to-t from-gray-300 via-gray-200 to-white shadow-sm opacity-0 animate-fadeIn animation-delay-1000 ${props.className}`}
    >
      <motion.div
        ref={pupilRef}
        style={{
          transform,
          width: props.pupilRadius * 2,
        }}
        className="aspect-square absolute z-10 top-1/2 left-1/2 bg-gray-900 rounded-full shadow-sm"
      />
      {!props.reducedMotion && (
        <>
          {props.motion?.state === "received-data" && (
            <Physics
              eyeRadius={props.eyeRadius}
              pupilRef={pupilRef}
              pupilRadius={props.pupilRadius}
              x={x}
              y={y}
              acceleration={props.acceleration}
            />
          )}
          {/* Only follow cursor on browsers without support at all */}
          {!props.motion ||
            (props.motion.state === "auto-permitted" && (
              <FollowCursor
                circleRef={pupilRef}
                pupilRadius={props.pupilRadius}
                eyeRadius={props.eyeRadius}
                x={x}
                y={y}
              />
            ))}
        </>
      )}
    </div>
  )
}

function FollowCursor(props: {
  circleRef: RefObject<HTMLDivElement | null>
  pupilRadius: number
  eyeRadius: number
  x: MotionValue<number>
  y: MotionValue<number>
}) {
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const rect = props.circleRef.current?.getBoundingClientRect()
      if (!rect) return
      const center = {
        x: rect.x + rect.width / 2,
        y: rect.y + rect.height / 2,
      }
      const vector = { x: e.clientX - center.x, y: e.clientY - center.y }
      const magnitude = Math.sqrt(vector.x ** 2 + vector.y ** 2)
      const maxMagnitude = props.eyeRadius - props.pupilRadius
      if (magnitude > maxMagnitude) {
        const ratio = maxMagnitude / magnitude
        vector.x = vector.x * ratio
        vector.y = vector.y * ratio
      }
      props.x.set(vector.x)
      props.y.set(vector.y)
    }
    window.addEventListener("mousemove", onMouseMove)
    return () => window.removeEventListener("mousemove", onMouseMove)
  }, [props.circleRef, props.eyeRadius, props.pupilRadius, props.x, props.y])

  return null
}

function Physics(props: {
  pupilRef: RefObject<HTMLDivElement | null>
  eyeRadius: number
  pupilRadius: number
  x: MotionValue<number>
  y: MotionValue<number>
  acceleration: AppState["mutableAcceleration"]
}) {
  useAnimationFrame((_, deltaMs) => {
    const deltaT = deltaMs / 1000
    // 96 PPI, 2.54 cm/in and magic number based on feel
    const PX_TO_M = (96 / 2.54) * 22

    // Map hardware acceleration to screen layout, considering on device orientation
    const aX = props.acceleration.x
    const aY = props.acceleration.y * -1

    // FIXME: Tried to handle orientation changes, but the differences between standardized at all between iOS and Android,
    // if (
    //   // not in portrait orientation
    //   state.mutableOrientation.alpha > 60 &&
    //   state.mutableOrientation.alpha < 300
    // ) {
    //   // Rotated to the left
    //   if (state.mutableOrientation.alpha < 180) {
    //     let _aY = aY
    //     aY = -aX // y acceleration is now invert x acceleration
    //     aX = _aY
    //   } else {
    //     // rotated to the right
    //     let _aY = aY
    //     aY = aX
    //     aX = -_aY
    //   }
    // }

    const newPosition = {
      x:
        props.x.get() +
        props.x.getVelocity() * deltaT +
        (aX * PX_TO_M * deltaT ** 2) / 2,
      y:
        props.y.get() +
        props.y.getVelocity() * deltaT +
        (aY * PX_TO_M * deltaT ** 2) / 2,
    }
    const magnitude = Math.sqrt(newPosition.x ** 2 + newPosition.y ** 2)

    const maxMagnitude = props.eyeRadius - props.pupilRadius
    if (magnitude > maxMagnitude) {
      const ratio = maxMagnitude / magnitude
      newPosition.x = newPosition.x * ratio
      newPosition.y = newPosition.y * ratio
    }
    props.x.set(newPosition.x)
    props.y.set(newPosition.y)
  })

  return null
}
