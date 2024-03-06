"use client"

import { range, scaleLinear } from "d3"
import { clamp } from "framer-motion"
import { Draft, produce } from "immer"
import { debounce } from "lodash"
import {
  ButtonHTMLAttributes,
  Dispatch,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useTransition,
} from "react"

import { EcosystemContext } from "./ecosystem-context"
import { EcosystemLightId } from "./ecosystem-enums"
import type {
  LightInterruption,
  LightInterruptSetting,
  LightScheduleInfo,
} from "./ecosystem-models"
import classes from "./classes.module.css"

export const SECS_IN_DAY = 86400

type LightScheduleProps = {
  id: EcosystemLightId
  data: LightScheduleInfo
  setLightSchedule: (schedule: LightScheduleInfo) => Promise<boolean>
  authenticated: boolean
}

function timesToPath(
  schedule: LightScheduleInfo,
  width: number,
  height: number
) {
  const dayHeight = height * (1 - schedule.day[0] / MAX_BRIGHTNESS)
  const nightHeight = height * (1 - schedule.night[0] / MAX_BRIGHTNESS)
  return `M 0 ${nightHeight} L ${
    (schedule.times[0] / SECS_IN_DAY) * width
  } ${nightHeight} L ${
    (schedule.times[1] / SECS_IN_DAY) * width
  } ${dayHeight} L ${
    (schedule.times[2] / SECS_IN_DAY) * width
  } ${dayHeight} L ${
    (schedule.times[3] / SECS_IN_DAY) * width
  } ${nightHeight} L ${width} ${nightHeight} H ${width} V 0 H 0 V ${height} Z`
}

type ScheduleState = {
  schedule: LightScheduleInfo
  selectedTime: number | null
}

type ScheduleStateUpdate = (draft: Draft<ScheduleState>) => void

const reducer = (state: ScheduleState, action: ScheduleStateUpdate) =>
  produce(state, action)

const getInitialState = (data: LightScheduleInfo): ScheduleState => ({
  schedule: data,
  selectedTime: null,
})

const HEIGHT = 250
const MIN_COLOR = 0
const MAX_COLOR = 100
const MAX_BRIGHTNESS = 100
const WARM_COLOR = "#ffd026"
const COOL_COLOR = "#89e1ff"
const colorScale = scaleLinear(
  [MIN_COLOR, MAX_COLOR / 2, MAX_COLOR],
  [WARM_COLOR, "#ffffff", COOL_COLOR]
)
const MAX_TRANSITION_DURATION_SECS = 359 * 60

export function SetLightSchedule(props: LightScheduleProps) {
  const [state, setState] = useReducer(reducer, props.data, getInitialState)
  const [isPending, startTransition] = useTransition()
  const ecoNow = useContext(EcosystemContext)
  const currentTimeInSecs =
    (ecoNow.getHours() * 60 + ecoNow.getMinutes()) * 60 + ecoNow.getSeconds()
  const WIDTH = 350
  const offsets = state.schedule.times.map((secs) => secs / SECS_IN_DAY)
  const canvasRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLFormElement>(null)
  const selectedSetting = (() => {
    if (state.selectedTime === null) {
      return null
    }
    if (state.selectedTime === 1 || state.selectedTime === 2) {
      return state.schedule.day
    }
    return state.schedule.night
  })()
  const nightColor = colorScale(state.schedule.night[1])
  const dayColor = colorScale(state.schedule.day[1])
  const onColorChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setState((draft) => {
      if (state.selectedTime === 1 || state.selectedTime === 2) {
        draft.schedule.day[1] = Number(evt.target.value)
      } else {
        draft.schedule.night[1] = Number(evt.target.value)
      }
    })
  }

  const onSubmit = () => {
    startTransition(() => {
      props.setLightSchedule(state.schedule)
    })
  }

  const cancel = () => {
    setState((draft) => {
      draft.schedule = props.data
      draft.selectedTime = null
    })
  }

  // Unselect on click outside of container
  useEffect(() => {
    if (state.selectedTime !== null) {
      const unselectOnClickOutside = (evt: PointerEvent) => {
        if (containerRef.current?.contains(evt.target as Node) === false) {
          setState((draft) => void (draft.selectedTime = null))
        }
      }
      window.addEventListener("pointerdown", unselectOnClickOutside)
      return () =>
        window.removeEventListener("pointerdown", unselectOnClickOutside)
    }
  }, [state.selectedTime])

  return (
    <div
      className={`mt-2 p-2 border-[1px] rounded transition-colors duration-500 ${isPending ? "border-accent" : "border-muted"}`}
    >
      <h3 className="mb-2 font-semibold">Schedule</h3>
      <form action={onSubmit} ref={containerRef}>
        <div className="mb-5 mt-8">
          <div className="relative mx-auto w-fit touch-none select-none">
            <svg
              ref={canvasRef}
              xmlns="http://www.w3.org/2000/svg"
              width={WIDTH}
              height={HEIGHT}
              viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
              fill="none"
              className="rounded"
            >
              <rect
                width={WIDTH}
                height={HEIGHT}
                fill="url(#paint0_linear_1_3)"
              />
              <rect
                width={WIDTH}
                height={HEIGHT}
                fill="url(#paint1_linear_1_3)"
              />
              <path
                d={timesToPath(state.schedule, WIDTH, HEIGHT)}
                fill="#292929"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_1_3"
                  x1="0"
                  y1={HEIGHT / 2}
                  x2={WIDTH}
                  y2={HEIGHT / 2}
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor={nightColor} />
                  {offsets.map((offset, i, offsets) => {
                    const color =
                      i === 0 || i === offsets.length - 1
                        ? nightColor
                        : dayColor
                    return <stop key={i} offset={offset} stopColor={color} />
                  })}
                </linearGradient>
                <linearGradient
                  id="paint1_linear_1_3"
                  x1={WIDTH / 2}
                  y1="0"
                  x2={WIDTH / 2}
                  y2={HEIGHT}
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="black" stopOpacity="0" offset="0" />
                  <stop stopOpacity="0.85" offset="1" />
                </linearGradient>
              </defs>
            </svg>
            <div
              style={{
                transform: `translateX(${
                  (currentTimeInSecs / SECS_IN_DAY) * WIDTH
                }px) scaleY(1.05)`,
              }}
              className="h-full w-[2px] bg-white shadow-md absolute top-0 left-0"
            >
              <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs">
                now
              </span>
            </div>
            {offsets.map((offset, i, arr) => {
              const x = offset * WIDTH
              const isLastOrFirst = i === 0 || i === arr.length - 1
              const y = isLastOrFirst
                ? (1 - state.schedule.night[0] / MAX_BRIGHTNESS) * HEIGHT
                : (1 - state.schedule.day[0] / MAX_BRIGHTNESS) * HEIGHT
              const timeOfDay = secsToHoursMin(state.schedule.times[i])
              const isSelected = state.selectedTime === i

              return (
                <Handle
                  key={i}
                  type="button"
                  className={`w-3 h-3 absolute top-0 left-0 bg-white/50 hocus:border-accent ${
                    isSelected ? "border-accent z-[1]" : ""
                  } rounded-full border-2 border-[--foreground-color] box-content`}
                  style={{
                    transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
                  }}
                  onPointerDown={() =>
                    setState((draft) => void (draft.selectedTime = i))
                  }
                  onDrag={(evt) =>
                    handleDrag(evt, canvasRef.current!, setState, i)
                  }
                >
                  <label
                    className={`absolute px-1 bg-[--background-color] rounded-full flex flex-row items-center justify-center transition-all -translate-x-1/2 left-1/2 ${
                      isSelected ? "-top-10 text-lg" : "-top-5 text-xs"
                    }`}
                  >
                    {timeOfDay.hours}:
                    {String(timeOfDay.minutes).padStart(2, "0")}
                  </label>
                  {/* tap slop */}
                  <div className="h-12 w-12 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </Handle>
              )
            })}
          </div>
        </div>
        {props.id === EcosystemLightId.Canopy && (
          <div className={!selectedSetting ? "opacity-20" : ""}>
            <label className="mb-0">Color</label>
            <input
              name="color"
              type="range"
              disabled={!selectedSetting}
              min={0}
              max={MAX_COLOR}
              value={selectedSetting?.[1] ?? 0}
              onChange={onColorChange}
              className={`${classes.slider} -mt-2 -mb-4 pt-4 pb-4 [&::-webkit-slider-runnable-track]:bg-gradient-to-r from-[#ffd026] via-white to-[#89e1ff]`}
            />
          </div>
        )}
        {props.authenticated && (
          <div className="flex flex-row w-full justify-around gap-2">
            <button
              onClick={cancel}
              type="button"
              className="px-2 py-[1px] rounded bg-muted flex-grow"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-2 py-[1px] rounded bg-muted flex-grow"
            >
              Submit
            </button>
          </div>
        )}
      </form>
    </div>
  )
}

function handleDrag(
  evt: PointerEvent,
  parent: Element,
  setState: Dispatch<ScheduleStateUpdate>,
  i: number
) {
  setState((draft) => {
    const parentRect = parent.getBoundingClientRect()
    const { left, right } = (() => {
      if (i === 0) {
        const right = draft.schedule.times[i + 1]
        return {
          left: Math.max(0, right - MAX_TRANSITION_DURATION_SECS),
          right,
        }
      }
      if (i === 1) {
        const left = draft.schedule.times[i - 1]
        return {
          left,
          right: Math.min(
            left + MAX_TRANSITION_DURATION_SECS,
            draft.schedule.times[i + 1]
          ),
        }
      }
      if (i === 2) {
        const right = draft.schedule.times[i + 1]
        return {
          left: Math.max(
            draft.schedule.times[i - 1],
            right - MAX_TRANSITION_DURATION_SECS
          ),
          right,
        }
      }

      const left = draft.schedule.times[i - 1]
      return {
        left,
        right: Math.min(SECS_IN_DAY - 1, left + MAX_TRANSITION_DURATION_SECS),
      }
    })()
    let time = Math.round(
      ((evt.pageX - parentRect.x) / parentRect.width) * SECS_IN_DAY
    )
    // Round to 5 minutes
    time = time - (time % 300)
    time = clamp(left, right, time)
    let intensity = Math.round(
      (1 - (evt.pageY - (parentRect.y + window.scrollY)) / parentRect.height) *
        MAX_BRIGHTNESS
    )
    intensity = clamp(0, MAX_BRIGHTNESS, intensity)
    draft.schedule.times[i] = time
    if (i === 0 || i === draft.schedule.times.length - 1) {
      draft.schedule.night[0] = intensity
    } else {
      draft.schedule.day[0] = intensity
    }
  })
}

type SetLightProps = {
  id: EcosystemLightId
  setLight: (setting: Omit<LightInterruption, "light">) => Promise<void>
  setting: LightInterruptSetting
  authenticated: boolean
}

type LightTempState = {
  hours: number
  minutes: number
  intensity: number
  color: number
}

type LightTempStateUpdate =
  | ((draft: Draft<LightTempState>) => void)
  | { type: "move" }

const lightReducer = (state: LightTempState, action: LightTempStateUpdate) => {
  if (typeof action === "function") {
    return produce(state, action)
  }
  return state
}

const getInitialLightTempState = (
  setting: LightInterruptSetting
): LightTempState => {
  const { hours, minutes } = secsToHoursMin(setting.dur)
  return {
    hours,
    minutes,
    intensity: setting.ls[0],
    color: setting.ls[1],
  }
}

export function SetLight(props: SetLightProps) {
  const [state, dispatch] = useReducer(
    lightReducer,
    props.setting,
    getInitialLightTempState
  )
  const stateRef = useRef(state)
  useEffect(() => {
    stateRef.current = state
  }, [state])
  const [isPending, startTransition] = useTransition()
  const canvasRef = useRef<SVGSVGElement>(null)
  const debouncedSetLight = useMemo(() => {
    return debounce(() => {
      startTransition(() => {
        props.setLight({
          color: Math.round(stateRef.current.color),
          intensity: Math.round(stateRef.current.intensity),
          duration: stateRef.current.hours * 60 + stateRef.current.minutes,
        })
      })
    }, 500)
  }, [props])

  const WIDTH = 350
  const x = (state.color / MAX_COLOR) * WIDTH
  const y = (1 - state.intensity / MAX_BRIGHTNESS) * HEIGHT

  const handleDrag = useCallback(
    (evt: PointerEvent | React.PointerEvent) => {
      const parentRect = canvasRef.current!.getBoundingClientRect()
      const newColor =
        clamp(0, 1, (evt.pageX - parentRect.x) / parentRect.width) * MAX_COLOR
      let newIntensity =
        clamp(
          0,
          1,
          1 - (evt.pageY - (parentRect.y + window.scrollY)) / parentRect.height
        ) * MAX_BRIGHTNESS
      newIntensity = Math.round(newIntensity)
      dispatch((draft) => {
        draft.intensity = newIntensity
        draft.color = newColor
      })
      if (props.authenticated) {
        debouncedSetLight()
      }
    },
    [debouncedSetLight, props.authenticated]
  )

  return (
    <div
      className={`mt-2 p-2 border-[1px] rounded transition-colors duration-500 ${isPending ? "border-accent" : "border-muted"}`}
    >
      <div className="flex flex-col">
        <div className="mt-[2px] mb-[10px] flex flex-row items-center">
          <h3 className="font-semibold">Set temporarily</h3>
          <div className="ml-3 flex flex-row items-center">
            <select
              value={state.hours}
              onChange={(e) => {
                dispatch((draft) => {
                  draft.hours = Number(e.target.value)
                })
              }}
              className="dark:bg-[--background-color] border-[1px] border-foreground pl-2 rounded"
            >
              {range(0, 24).map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
            <label htmlFor="hours" className="ml-2">
              hrs
            </label>
            <select
              value={state.minutes}
              onChange={(e) => {
                dispatch((draft) => {
                  draft.minutes = Number(e.target.value)
                })
              }}
              className="ml-2 dark:bg-[--background-color] border-[1px] border-foreground pl-2 rounded"
            >
              {range(0, 60).map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
            <label htmlFor="minutes" className="ml-2 mr-4">
              mins
            </label>
          </div>
        </div>
        <div className="relative mx-auto w-fit touch-none select-none mb-3">
          <svg
            ref={canvasRef}
            xmlns="http://www.w3.org/2000/svg"
            width={WIDTH}
            height={HEIGHT}
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            fill="none"
            className="rounded cursor-pointer"
            onPointerDown={(evt) => {
              handleDrag(evt)
              window.addEventListener("pointermove", handleDrag)
              window.addEventListener(
                "pointerup",
                () => {
                  window.removeEventListener("pointermove", handleDrag)
                },
                { once: true }
              )
            }}
          >
            <rect
              width={WIDTH}
              height={HEIGHT}
              fill={
                props.id === EcosystemLightId.Aquarium
                  ? "url(#paint4_linear_1_3)"
                  : "url(#paint2_linear_1_3)"
              }
            />
            <rect
              width={WIDTH}
              height={HEIGHT}
              fill="url(#paint3_linear_1_3)"
            />
            <defs>
              <linearGradient
                id="paint2_linear_1_3"
                x1="0"
                y1={HEIGHT / 2}
                x2={WIDTH}
                y2={HEIGHT / 2}
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor={colorScale(MIN_COLOR)} />
                <stop stopColor={colorScale(MAX_COLOR / 2)} offset={0.5} />
                <stop stopColor={colorScale(MAX_COLOR)} offset={1} />
              </linearGradient>
              <linearGradient
                id="paint3_linear_1_3"
                x1={WIDTH / 2}
                y1="0"
                x2={WIDTH / 2}
                y2={HEIGHT}
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="black" stopOpacity="0" offset="0" />
                <stop stopOpacity="0.85" offset="1" />
              </linearGradient>
              <linearGradient
                id="paint4_linear_1_3"
                x1={WIDTH / 2}
                y1="0"
                x2={WIDTH / 2}
                y2={HEIGHT}
              >
                <stop stopColor="white" stopOpacity="1" offset="0" />
                {/* <stop stopOpacity="0.85" offset="1" /> */}
              </linearGradient>
            </defs>
          </svg>
          <button
            className={`w-5 h-5 absolute top-0 left-0 bg-white/50 rounded-full border-2 border-[--foreground-color] box-content pointer-events-none`}
            style={{
              transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
            }}
          />
        </div>
      </div>
    </div>
  )
}

type HandleProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onDrag"> & {
  onDrag: (evt: PointerEvent) => void
}

function Handle({ onDrag, ...props }: HandleProps) {
  return (
    <button
      {...props}
      className={`touch-none ${props.className}`}
      onPointerDown={(evt) => {
        props.onPointerDown?.(evt)
        window.addEventListener("pointermove", onDrag)
        window.addEventListener(
          "pointerup",
          () => {
            window.removeEventListener("pointermove", onDrag)
          },
          { once: true }
        )
      }}
    />
  )
}

function secsToHoursMin(secs: number) {
  return {
    hours: Math.floor(secs / 60 / 60),
    minutes: Math.floor(secs / 60) % 60,
  }
}
