import assert from "assert"

import { createEcosystemApi, ParticleApi } from "./ecosystem-methods"

// #region Me
assert(process.env.PARTICLE_API_TOKEN, "Missing PARTICLE_API_TOKEN")
const PARTICLE_API_TOKEN = process.env.PARTICLE_API_TOKEN
export const myParticleApi = createEcosystemApi(PARTICLE_API_TOKEN)
assert(process.env.MY_ECOSYSTEM_DEVICE_ID, "Missing MY_ECOSYSTEM_DEVICE_ID")

export const MY_ECOSYSTEM_DEVICE_ID = process.env.MY_ECOSYSTEM_DEVICE_ID
const ECOSYSTEM_PASSWORD = process.env.ECOSYSTEM_PASSWORD
assert(ECOSYSTEM_PASSWORD, "Missing ECOSYSTEM_PASSWORD")

// #region Brooks

// TODO: swap for real
export const BROOKS_ECOSYSTEM_DEVICE_ID = MY_ECOSYSTEM_DEVICE_ID

// TODO: make and use his token
const brooksParticleApi = createEcosystemApi(PARTICLE_API_TOKEN)

// Also use it as the key, why not
const signingKey = new TextEncoder().encode(ECOSYSTEM_PASSWORD)

export type GroveDatum = {
  deviceId: string
  particleApi: ParticleApi
  cookie: string
  password: string
  signingKey: Uint8Array
  name: string
  description: string
}

const groves: Partial<Record<string, GroveDatum>> = {
  lou: {
    deviceId: MY_ECOSYSTEM_DEVICE_ID,
    particleApi: myParticleApi,
    cookie: `eco-session-${MY_ECOSYSTEM_DEVICE_ID}`,
    password: ECOSYSTEM_PASSWORD,
    signingKey,
    name: "Lou's Ecosystem",
    description: "A new take on controlling my still-living Ecosystem",
  },
  brooks: {
    deviceId: BROOKS_ECOSYSTEM_DEVICE_ID,
    particleApi: brooksParticleApi,
    cookie: `eco-session-${BROOKS_ECOSYSTEM_DEVICE_ID}`,
    password: ECOSYSTEM_PASSWORD,
    signingKey,
    name: "Brooks' Ecosystem",
    description: "Brooks' still-going Grove garden",
  },
}

export function getNames(): Record<string, string> {
  const names: Record<string, string> = {}
  for (const [key, datum] of Object.entries(groves)) {
    if (!datum) continue
    names[key] = datum.name
  }
  return names
}

export function getGrove(name: string): GroveDatum | Error {
  const d = groves[name]
  if (!d) {
    return new Error(`No grove found for ${name}`)
  }
  return d
}
