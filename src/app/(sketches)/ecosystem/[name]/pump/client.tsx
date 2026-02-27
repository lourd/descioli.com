"use client"

import { range } from "d3"
import { useReducer, useTransition } from "react"

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
      className={`mt-2 p-2 border-[1px] rounded-sm transition-colors duration-500 ${isPending ? "border-accent" : "border-muted"}`}
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
            className="border-[1px] border-foreground px-1 mx-1 rounded-sm"
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
            className="border-[1px] border-foreground px-2 mx-1 rounded-sm"
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
            className="border-[1px] border-foreground px-2 mx-1 rounded-sm"
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
            className="py-[1px] col-start-2 rounded-sm bg-muted"
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
  maxCycle: number
}

type State = {
  onPeriod: number
  cycle: number
}

const getInitialState = (setting: PumpSetting): State => ({
  onPeriod: setting.sched.onTimeMins,
  cycle: setting.sched.onTimeMins + setting.sched.offTimeMins,
})

const reducer = (state: State, action: Partial<State>): State => ({
  ...state,
  ...action,
})

export function SetPumpSchedule(props: SetPumpScheduleProps) {
  const [isPending, startTransition] = useTransition()
  const [state, setState] = useReducer(reducer, props.setting, getInitialState)
  const onSubmit = () => {
    startTransition(() => {
      props.setPumpSchedule({
        onPeriod: state.onPeriod,
        offPeriod: state.cycle - state.onPeriod,
      })
    })
  }
  const cancel = () => {
    setState(getInitialState(props.setting))
  }
  return (
    <form
      className={`mt-2 p-2 border-[1px] rounded-sm transition-colors duration-500 ${isPending ? "border-accent" : "border-muted"}`}
      action={onSubmit}
    >
      <div className="mb-2 flex flex-row justify-between items-center">
        <h3 className="font-bold">Schedule</h3>
        <div>
          <select
            className="bg-muted px-1 mr-2 rounded-sm"
            onChange={(e) => {
              const newCycle = Number(e.currentTarget.value)
              setState({
                cycle: newCycle,
                onPeriod: Math.min(state.onPeriod, newCycle),
              })
            }}
            value={state.cycle}
          >
            {range(1, props.maxCycle + 1).map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
          min cycle
        </div>
      </div>
      <div className="flex gap-2 justify-center items-center">
        <span className="tabular-nums w-[10ch] text-right">
          {state.onPeriod} min on
        </span>
        <input
          type="range"
          name="onPeriod"
          value={state.onPeriod}
          onChange={(e) =>
            setState({ onPeriod: Number(e.currentTarget.value) })
          }
          className="w-40 mt-1"
          max={state.cycle}
          min={0}
        />
        <span className="tabular-nums w-[10ch]">
          {state.cycle - state.onPeriod} min off
        </span>
      </div>
      {props.authenticated && (
        <div className="flex flex-row w-full justify-around gap-2 mt-4">
          <button
            onClick={cancel}
            type="button"
            className="px-2 py-[1px] rounded-sm border-muted border grow"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-2 py-[1px] rounded-sm bg-muted grow"
          >
            Submit
          </button>
        </div>
      )}
    </form>
  )
}
