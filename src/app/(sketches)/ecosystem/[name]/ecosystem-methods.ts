import assert from "assert"

import { cache } from "react"
import z from "zod"

import { jsonCodec } from "@/lib/json-codec"

import {
  EcosystemFunctions,
  EcosystemLightId,
  EcosystemVariables,
  LightVariable,
} from "./ecosystem-enums"
import {
  createLightInterruptionString,
  createLightScheduleString,
  createPumpInterruptionString,
  createPumpScheduleString,
  LightInterruption,
  LightSchedule,
  LightSettings,
  PumpInterruption,
  PumpSchedule,
  PumpSetting,
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

const SystemStatusCodec = jsonCodec(SystemStatus)
const LightSettingsCodec = jsonCodec(LightSettings)
const PumpSettingCodec = jsonCodec(PumpSetting)

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
  const result = SystemStatusCodec.safeDecode(response.body.result)
  if (!result.success) {
    throw new Error(
      `Failed to decode system status: ${z.prettifyError(result.error)}`
    )
  }
  return {
    ...response,
    body: {
      ...response.body,
      result: result.data,
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
  const result = LightSettingsCodec.safeDecode(response.body.result)
  if (!result.success) {
    throw new Error(
      `Failed to decode light settings: ${z.prettifyError(result.error)}`
    )
  }
  return {
    ...response,
    body: {
      ...response.body,
      result: result.data,
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

export async function getPump(
  deviceId: string
): Promise<StructuredVariableResponse<PumpSetting>> {
  console.log("getting pump")
  const response = await getVariable({
    auth: PARTICLE_API_TOKEN,
    deviceId,
    name: EcosystemVariables.Pump,
  })
  if (response.statusCode !== 200) {
    throw new Error(`Particle ${response.statusCode}: ${response.body.error}`)
  }
  const result = PumpSettingCodec.safeDecode(response.body.result)
  if (!result.success) {
    throw new Error(
      `Failed to decode pump settings: ${z.prettifyError(result.error)}`
    )
  }
  return {
    ...response,
    body: {
      ...response.body,
      result: result.data,
    },
  }
}

export function setPumpSchedule(deviceId: string, schedule: PumpSchedule) {
  const str = createPumpScheduleString(PumpSchedule.parse(schedule))
  return callFunction({
    auth: PARTICLE_API_TOKEN,
    deviceId,
    name: EcosystemFunctions.SetPump,
    argument: `schedule-${str}`,
  })
}

export function resumePumpSchedule(deviceId: string) {
  return callFunction({
    auth: PARTICLE_API_TOKEN,
    deviceId,
    name: EcosystemFunctions.SetPump,
    argument: "schedule-resume",
  })
}

export function interruptPump(deviceId: string, setting: PumpInterruption) {
  const str = createPumpInterruptionString(PumpInterruption.parse(setting))
  return callFunction({
    auth: PARTICLE_API_TOKEN,
    deviceId,
    name: EcosystemFunctions.SetPump,
    argument: `temp-${str}`,
  })
}
