"use client"

import { createContext, useEffect, useReducer } from "react"

import { Time, timeToDate } from "./ecosystem-models"

export const EcosystemContext = createContext<Date>(null as never)

const getTimeState = (args: { time: Time; timeZone: number }) => {
  const now = new Date()
  const givenEcoTime = timeToDate(args.time, args.timeZone)
  return {
    now,
    delta: givenEcoTime.getTime() - now.getTime(),
  }
}

type State = ReturnType<typeof getTimeState>

const reducer = (state: State, action: Partial<State>) => {
  return { ...state, ...action }
}

export const EcosystemProvider = (props: {
  time: Time
  timeZone: number
  children: React.ReactNode
}) => {
  const [state, dispatch] = useReducer(reducer, props, getTimeState)

  const ecoNow = new Date(state.now.getTime() + state.delta)

  useEffect(() => {
    dispatch(getTimeState({ time: props.time, timeZone: props.timeZone }))
  }, [props.time, props.timeZone])

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch({ now: new Date() })
    }, 1000)
    return () => clearInterval(intervalId)
  }, [])

  return <EcosystemContext value={ecoNow}>{props.children}</EcosystemContext>
}
