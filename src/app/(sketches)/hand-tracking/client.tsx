"use client"

import { Canvas, useThree } from "@react-three/fiber"
import { Draft, produce } from "immer"
import { Suspense, useEffect, useReducer, useState } from "react"
import { suspend } from "suspend-react"
import { EventListener, XRHandSpace } from "three"

import { ClientOnly } from "@/components/client-only"

import { Hand } from "./hand"

export function HandTrackingClient() {
  return (
    <div className="absolute top-0 mt-16 px-4">
      <ClientOnly>
        <Suspense fallback={null}>
          <HandTracking />
        </Suspense>
      </ClientOnly>
    </div>
  )
}

type State = {
  xrSession: XRSession | null
  requestSessionError: any | null
}

const reducer = (state: State, action: Partial<State>) => ({
  ...state,
  ...action,
})

const initialState: State = {
  xrSession: null,
  requestSessionError: null,
}

function HandTracking() {
  const mode = "immersive-vr" as const
  const xrSystem = suspend(getIsSupported, [mode])
  const [state, setState] = useReducer(reducer, initialState)

  if (!xrSystem) {
    return (
      <div>
        <p>{"It doesn't look like you're on a device that supports WebXR"}</p>
      </div>
    )
  }

  if (!state.xrSession) {
    const getImmersive = async () => {
      try {
        const xrSession = await xrSystem.requestSession("immersive-vr", {
          optionalFeatures: ["local-floor", "bounded-floor", "hand-tracking"],
        })
        setState({ xrSession, requestSessionError: null })
        // If the session is ended from elsewhere, like the device menu
        xrSession.addEventListener(
          "end",
          () => {
            setState({ xrSession: null })
          },
          { once: true }
        )
      } catch (e) {
        setState({ requestSessionError: e })
      }
    }
    return (
      <div>
        <p>{"You've got WebXR support!"}</p>
        <button
          onClick={getImmersive}
          className="bg-accent text-white px-2 py-1 rounded"
        >
          LFG
        </button>
        {state.requestSessionError && (
          <p>
            {"There was an error requesting the session: "}
            <pre className="inline">{state.requestSessionError.toString()}</pre>
          </p>
        )}
      </div>
    )
  }

  return (
    <Canvas>
      <ImmersiveApp xrSession={state.xrSession} />
    </Canvas>
  )
}

type ImmersiveState = {
  hands: Partial<
    Record<
      XRHandedness,
      {
        space: XRHandSpace
        hand: XRHand
      }
    >
  >
  disconnects: number
}

const initialImmersiveState: ImmersiveState = {
  hands: {},
  disconnects: 0,
}

const immersiveStateReducer = (
  state: ImmersiveState,
  action: (draft: Draft<ImmersiveState>) => void
) => produce(state, action)

function ImmersiveApp(props: { xrSession: XRSession }) {
  const { gl, scene } = useThree()
  const [state, setState] = useReducer(
    immersiveStateReducer,
    initialImmersiveState
  )

  useEffect(() => {
    gl.xr.setSession(props.xrSession)
    return () => {
      gl.xr.setSession(null)
    }
  }, [gl.xr, props.xrSession])

  useEffect(() => {
    function setupHand(index: number) {
      const handSpace = gl.xr.getHand(index)
      const setHand = (input: XRInputSource) => {
        setState((draft) => {
          if (!input.hand) {
            delete draft.hands[input.handedness]
          } else {
            draft.hands[input.handedness] = {
              space: handSpace,
              hand: input.hand,
            }
          }
        })
      }
      return initHand(handSpace, setHand)
    }
    const cleanup1 = setupHand(0)
    const cleanup2 = setupHand(1)
    return () => {
      cleanup1()
      cleanup2()
    }
  }, [gl, props, scene])

  return (
    <>
      <ambientLight />
      {state.hands.left?.hand && (
        <Hand
          handedness="left"
          hand={state.hands.left.hand}
          space={state.hands.left.space}
        />
      )}
      {state.hands.right?.hand && (
        <Hand
          handedness="right"
          hand={state.hands.right.hand}
          space={state.hands.right.space}
        />
      )}
    </>
  )
}

async function getIsSupported(mode: XRSessionMode) {
  if (!navigator.xr) return null
  const isSupported = await navigator.xr.isSessionSupported(mode)
  if (!isSupported) return null
  return navigator.xr
}

type ConnectedListener = EventListener<
  {
    data: XRInputSource
  },
  "connected",
  XRHandSpace
>

type DisconnectListener = EventListener<
  {
    data: XRInputSource
  },
  "disconnected",
  XRHandSpace
>

function initHand(
  xrHand: XRHandSpace,
  setHand: (input: XRInputSource) => void
) {
  const onConnect: ConnectedListener = (evt) => {
    setHand(evt.data)
  }
  const onDisconnect: DisconnectListener = (evt) => {
    setHand(evt.data)
  }
  xrHand.addEventListener("connected", onConnect)
  // FIXME: This doesn't fire on Vision Pro, so the hands never disappear.
  // Same thing happens with the official Immersive Hands Demo.
  xrHand.addEventListener("disconnected", onDisconnect)
  return () => {
    xrHand.removeEventListener("connected", onConnect)
    xrHand.removeEventListener("disconnected", onDisconnect)
  }
}
