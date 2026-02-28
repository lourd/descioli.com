import assert from "assert"

import { createEcosystemApi, ParticleApi } from "./ecosystem-methods"

// #region Me
assert(process.env.PARTICLE_API_TOKEN, "Missing PARTICLE_API_TOKEN")
assert(process.env.MY_ECOSYSTEM_DEVICE_ID, "Missing MY_ECOSYSTEM_DEVICE_ID")
assert(process.env.ECOSYSTEM_PASSWORD, "Missing ECOSYSTEM_PASSWORD")

// Also use it as the key, why not
const signingKey = new TextEncoder().encode(process.env.ECOSYSTEM_PASSWORD)

// #region Brooks

assert(
  process.env.BROOKS_ECOSYSTEM_DEVICE_ID,
  "Missing BROOKS_ECOSYSTEM_DEVICE_ID"
)
assert(
  process.env.BROOKS_PARTICLE_API_TOKEN,
  "Missing BROOKS_PARTICLE_API_TOKEN"
)
assert(
  process.env.BROOKS_ECOSYSTEM_PASSWORD,
  "Missing BROOKS_ECOSYSTEM_PASSWORD"
)
const brooksSigningKey = new TextEncoder().encode(
  process.env.BROOKS_ECOSYSTEM_PASSWORD
)

// #region Groves

export type GroveDatum = {
  deviceId: string
  particleApi: ParticleApi
  cookie: string
  password: string
  signingKey: Uint8Array
  name: string
  description: string
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

const groves: Partial<Record<string, GroveDatum>> = {
  lou: {
    deviceId: process.env.MY_ECOSYSTEM_DEVICE_ID,
    particleApi: createEcosystemApi(process.env.PARTICLE_API_TOKEN),
    cookie: `eco-session-${process.env.MY_ECOSYSTEM_DEVICE_ID}`,
    password: process.env.ECOSYSTEM_PASSWORD,
    signingKey,
    name: "Lou's Ecosystem",
    description: "A new take on controlling my still-living Ecosystem",
  },
  brooks: {
    deviceId: process.env.BROOKS_ECOSYSTEM_DEVICE_ID,
    particleApi: createEcosystemApi(process.env.BROOKS_PARTICLE_API_TOKEN),
    cookie: `eco-session-${process.env.BROOKS_ECOSYSTEM_DEVICE_ID}`,
    password: process.env.BROOKS_ECOSYSTEM_PASSWORD,
    signingKey: brooksSigningKey,
    name: "Brooks' Ecosystem",
    description: "Brooks' still-going Grove garden",
  },
}
