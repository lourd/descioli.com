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

export type ParticleApi = ReturnType<typeof createEcosystemApi>

const SystemStatusCodec = jsonCodec(SystemStatus)
const LightSettingsCodec = jsonCodec(LightSettings)
const PumpSettingCodec = jsonCodec(PumpSetting)

export function createEcosystemApi(apiToken: string) {
  return {
    getLight,
    setLightSchedule,
    resumeLightSchedule,
    interruptLight,
    setTimezone,
    getPump,
    setPumpSchedule,
    resumePumpSchedule,
    interruptPump,
    getSystemStatus: cache(getSystemStatus),
  }

  type StructuredVariableResponse<T> = Omit<GetVariableResponse, "body"> & {
    body: Omit<GetVariableResponse["body"], "result"> & {
      result: T
    }
  }

  async function getSystemStatus(
    deviceId: string
  ): Promise<StructuredVariableResponse<SystemStatus>> {
    console.log(`getting system for device ${deviceId}`)
    const response = await getVariable({
      auth: apiToken,
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

  async function getLight(
    deviceId: string,
    light: LightVariable
  ): Promise<StructuredVariableResponse<LightSettings>> {
    console.log(`getting light for device ${deviceId}`)
    const response = await getVariable({
      auth: apiToken,
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

  async function setLightSchedule(deviceId: string, schedule: LightSchedule) {
    const str = createLightScheduleString(LightSchedule.parse(schedule))
    return callFunction({
      auth: apiToken,
      deviceId,
      name: EcosystemFunctions.SetLight,
      argument: `schedule-${str}`,
    })
  }

  function resumeLightSchedule(deviceId: string, light: EcosystemLightId) {
    return callFunction({
      auth: apiToken,
      deviceId,
      name: EcosystemFunctions.SetLight,
      argument: `schedule-${light}:resume`,
    })
  }

  function interruptLight(deviceId: string, setting: LightInterruption) {
    const str = createLightInterruptionString(setting)
    return callFunction({
      auth: apiToken,
      deviceId,
      name: EcosystemFunctions.SetLight,
      argument: `temp-${str}`,
    })
  }

  function setTimezone(deviceId: string, timezone: number) {
    return callFunction({
      auth: apiToken,
      deviceId,
      name: EcosystemFunctions.MuxFunction,
      argument: `timeZoneOffset-${timezone}`,
    })
  }

  async function getPump(
    deviceId: string
  ): Promise<StructuredVariableResponse<PumpSetting>> {
    console.log(`getting pump for device ${deviceId}`)
    const response = await getVariable({
      auth: apiToken,
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

  function setPumpSchedule(deviceId: string, schedule: PumpSchedule) {
    const str = createPumpScheduleString(PumpSchedule.parse(schedule))
    return callFunction({
      auth: apiToken,
      deviceId,
      name: EcosystemFunctions.SetPump,
      argument: `schedule-${str}`,
    })
  }

  function resumePumpSchedule(deviceId: string) {
    return callFunction({
      auth: apiToken,
      deviceId,
      name: EcosystemFunctions.SetPump,
      argument: "schedule-resume",
    })
  }

  function interruptPump(deviceId: string, setting: PumpInterruption) {
    const str = createPumpInterruptionString(PumpInterruption.parse(setting))
    return callFunction({
      auth: apiToken,
      deviceId,
      name: EcosystemFunctions.SetPump,
      argument: `temp-${str}`,
    })
  }
}
