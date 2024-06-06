"use client"

import { range } from "d3"
import { useState, useTransition } from "react"

import type {
  PumpInterruption,
  PumpSchedule,
  PumpSetting,
} from "../ecosystem-models"

type SetPumpProps = {
  setPump: (setting: PumpInterruption) => void
  setting: PumpSetting
  authenticated: boolean
}

export function SetPump(props: SetPumpProps) {
  const [isPending, startTransition] = useTransition()
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    startTransition(() => {
      props.setPump({
        state: Boolean(Number(form.get("state"))),
        duration: Number(form.get("hours")) * 60 + Number(form.get("mins")),
      })
    })
  }
  return (
    <form
      className={`mt-2 p-2 border-[1px] rounded transition-colors duration-500 ${isPending ? "border-accent" : "border-muted"}`}
      onSubmit={onSubmit}
    >
      <div className="w-[220px] mx-auto flex flex-col gap-2">
        <div>
          <span className="font-semibold w-[84px] text-right mr-1">
            Turn pump
          </span>
          <select
            defaultValue={Number(props.setting.pumpOn)}
            name="state"
            className="dark:bg-[--background-color] border-[1px] border-foreground px-2 mx-1 rounded"
          >
            <option value={1}>on</option>
            <option value={0}>off</option>
          </select>
        </div>
        <div>
          <span className="w-[84px] text-right inline-block mr-1">for</span>
          <select
            name="hours"
            defaultValue={0}
            className="dark:bg-[--background-color] border-[1px] border-foreground px-2 mx-1 rounded"
          >
            {range(0, 24).map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
          <label htmlFor="hours" className="ml-2">
            hours
          </label>
        </div>
        <div>
          <span className="w-[84px] text-right inline-block mr-1">and</span>
          <select
            name="mins"
            defaultValue={0}
            className="dark:bg-[--background-color] border-[1px] border-foreground px-2 mx-1 rounded"
          >
            {range(0, 60).map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
          <label htmlFor="mins" className="ml-2">
            minutes
          </label>
        </div>
      </div>
      {props.authenticated && (
        <div className="mt-4 grid grid-cols-2">
          <button
            type="submit"
            className="py-[1px] col-start-2 rounded bg-muted"
          >
            Submit
          </button>
        </div>
      )}
    </form>
  )
}

type SetPumpScheduleProps = {
  setPumpSchedule: (schedule: PumpSchedule) => void
  setting: PumpSetting
  authenticated: boolean
}

export function SetPumpSchedule(props: SetPumpScheduleProps) {
  const [isPending, startTransition] = useTransition()
  const [state, setState] = useState(props.setting.sched.onTimeMins)
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    startTransition(() => {
      props.setPumpSchedule({
        onPeriod: state,
        offPeriod: 60 - state,
      })
    })
  }
  const cancel = () => {
    setState(props.setting.sched.onTimeMins)
  }
  return (
    <form
      className={`mt-2 p-2 border-[1px] rounded transition-colors duration-500 ${isPending ? "border-accent" : "border-muted"}`}
      onSubmit={onSubmit}
    >
      <h3 className="font-bold mb-2">Schedule</h3>
      <div className="flex gap-2 justify-center items-center">
        <span className="tabular-nums w-[76px] text-right">{state} min on</span>
        <input
          type="range"
          name="onPeriod"
          value={state}
          onChange={(e) => setState(Number(e.currentTarget.value))}
          className="w-40 mt-1"
          max={60}
          min={0}
        />
        <span className="tabular-nums w-[76px]">{60 - state} min off</span>
      </div>
      {props.authenticated && (
        <div className="flex flex-row w-full justify-around gap-2 mt-4">
          <button
            onClick={cancel}
            type="button"
            className="px-2 py-[1px] rounded border-muted border flex-grow"
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
  )
}
