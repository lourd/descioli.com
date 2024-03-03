import { ok as assert } from "node:assert"

import { cache } from "react"

import {
  EcosystemFunctions,
  EcosystemLightId,
  EcosystemVariables,
  LightVariable,
} from "./ecosystem-enums"
import {
  createLightInterruptionString,
  createLightScheduleString,
  LightInterruption,
  LightSchedule,
  LightSettings,
  SystemStatus,
} from "./ecosystem-models"
import { callFunction, getVariable, GetVariableResponse } from "./particle-api"

assert(process.env.PARTICLE_API_TOKEN, "Missing PARTICLE_API_TOKEN")
const PARTICLE_API_TOKEN = process.env.PARTICLE_API_TOKEN

assert(process.env.MY_ECOSYSTEM_DEVICE_ID, "Missing MY_ECOSYSTEM_DEVICE_ID")
export const MY_ECOSYSTEM_DEVICE_ID = process.env.MY_ECOSYSTEM_DEVICE_ID

export const reactCachedGetSystemStatus = cache(getSystemStatus)

type StructuredVariableResponse<T> = Omit<GetVariableResponse, "body"> & {
  body: Omit<GetVariableResponse["body"], "result"> & {
    result: T
  }
}

async function getSystemStatus(
  deviceId: string
): Promise<StructuredVariableResponse<SystemStatus>> {
  console.log("getting system")
  const response = await getVariable({
    auth: PARTICLE_API_TOKEN,
    deviceId,
    name: EcosystemVariables.GroveSystem,
  })
  if (response.statusCode !== 200) {
    throw new Error(`Particle ${response.statusCode}: ${response.body.error}`)
  }
  return {
    ...response,
    body: {
      ...response.body,
      result: JSON.parse(response.body.result) as SystemStatus,
    },
  }
}

export async function getLight(
  deviceId: string,
  light: LightVariable
): Promise<StructuredVariableResponse<LightSettings>> {
  console.log("getting light")
  const response = await getVariable({
    auth: PARTICLE_API_TOKEN,
    deviceId,
    name: light,
  })
  if (response.statusCode !== 200) {
    throw new Error(`Particle ${response.statusCode}: ${response.body.error}`)
  }
  return {
    ...response,
    body: {
      ...response.body,
      result: JSON.parse(response.body.result) as LightSettings,
    },
  }
}

export async function setLightSchedule(
  deviceId: string,
  schedule: LightSchedule
) {
  const str = createLightScheduleString(LightSchedule.parse(schedule))
  return callFunction({
    auth: PARTICLE_API_TOKEN,
    deviceId,
    name: EcosystemFunctions.SetLight,
    argument: `schedule-${str}`,
  })
}

export function resumeLightSchedule(deviceId: string, light: EcosystemLightId) {
  return callFunction({
    auth: PARTICLE_API_TOKEN,
    deviceId,
    name: EcosystemFunctions.SetLight,
    argument: `schedule-${light}:resume`,
  })
}

export function interruptLight(deviceId: string, setting: LightInterruption) {
  const str = createLightInterruptionString(setting)
  return callFunction({
    auth: PARTICLE_API_TOKEN,
    deviceId,
    name: EcosystemFunctions.SetLight,
    argument: `temp-${str}`,
  })
}

export function setTimezone(deviceId: string, timezone: number) {
  return callFunction({
    auth: PARTICLE_API_TOKEN,
    deviceId,
    name: EcosystemFunctions.MuxFunction,
    argument: `timeZoneOffset-${timezone}`,
  })
}
