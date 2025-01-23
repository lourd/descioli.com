"use client"

import { Draft, produce, setAutoFreeze } from "immer"
import { createContext, ReactNode, useReducer } from "react"

// Need the mutability for rapidly updating motion data
setAutoFreeze(false)

type MotionState =
  | "auto-permitted" // Chrome
  | "permission-required" // iOS
  | "permission-granted" // iOS
  | "permission-denied" // iOS
  | "received-data" // Android Chrome & iOS

const getInitialMotionState = () => {
  // server
  if (typeof window === "undefined") return null
  // i.e. unsupported browsers
  if (!("DeviceMotionEvent" in window)) return null
  // i.e. iOS
  if ("requestPermission" in window.DeviceMotionEvent) {
    return { state: "permission-required" as MotionState }
  }
  // i.e. Chrome
  return {
    state: "auto-permitted" as MotionState,
    /** 🙈 https://stackoverflow.com/questions/22024013 */
    flipAxes: true,
  }
}

const createInitialState = () => {
  return {
    history: [] as string[],
    motion: getInitialMotionState(),
    mutableAcceleration: { x: 0, y: 0, z: 0 },
    mutableOrientation: { alpha: 0, beta: 0, gamma: 0 },
  }
}

export type AppState = ReturnType<typeof createInitialState>

type Action = Partial<AppState> | ((draft: Draft<AppState>) => void)

export type AppContext = {
  state: AppState
  setState: (update: Action) => void
}

export const AppContext = createContext<AppContext>(null as never)

type AppProviderProps = {
  children: ReactNode
}

function reducer(state: AppState, action: Action) {
  if (typeof action === "function") {
    return produce(state, action)
  }
  return { ...state, ...action }
}

export function AppProvider(props: AppProviderProps) {
  const [state, setState] = useReducer(reducer, undefined, createInitialState)

  return <AppContext value={{ state, setState }}>{props.children}</AppContext>
}
