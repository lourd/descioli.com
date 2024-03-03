import { z } from "zod"

import { EcosystemLightId, FadeType } from "./ecosystem-enums"

const LightIntensity = z.number().int().gte(0).lte(100)

const LightColor = z.number().int().gte(0).lte(100)

export const LightSchedule = z
  .object({
    fadeType: z.nativeEnum(FadeType),
    light: z.nativeEnum(EcosystemLightId),
    sunriseBeginTime: z.number().int().gte(0),
    sunriseDuration: z.number().int().gte(0).lt(360),
    dayIntensity: LightIntensity,
    dayColor: LightColor,
    sunsetBeginTime: z.number().int(),
    sunsetDuration: z.number().int().gte(0).lt(360),
    nightIntensity: LightIntensity,
    nightColor: LightColor,
  })
  .refine(
    (schema) => {
      return (
        schema.sunriseBeginTime + schema.sunriseDuration <
        schema.sunsetBeginTime
      )
    },
    { message: "Sunrise must end before sunset begins" }
  )

export type LightSchedule = z.infer<typeof LightSchedule>

const pad = (size: number, num: number) => String(num).padStart(size, "0")

export function createLightScheduleString(params: LightSchedule) {
  return [
    params.light,
    pad(4, params.sunriseBeginTime),
    pad(3, params.sunriseDuration),
    pad(4, params.sunsetBeginTime),
    pad(3, params.sunsetDuration),
    pad(3, params.dayIntensity),
    pad(3, params.dayColor),
    pad(3, params.nightIntensity),
    pad(3, params.nightColor),
    params.fadeType,
  ].join(":")
}

export const LightInterruption = z.object({
  light: z.nativeEnum(EcosystemLightId),
  duration: z.number().int().gte(0).lt(1440),
  intensity: LightIntensity,
  color: LightColor,
})

export type LightInterruption = z.infer<typeof LightInterruption>

export function createLightInterruptionString(param: LightInterruption) {
  return [
    param.light,
    pad(3, param.intensity),
    pad(3, param.color),
    pad(4, param.duration),
  ].join(":")
}

export type LightSettings = {
  mode: LightMode
  why: SettingCause
  /** Current intensity outputted to each of this light's N strings (%) */
  sInt: [number, number]
  sched: LightScheduleInfo
  /** relevant data IF we're interrupted */
  inter: LightInterruptSetting
}

export type LightInterruptSetting = {
  /** indicates if this is an indefinite length interruption */
  indef: boolean
  /** Total requested duration of this interruption in minutes */
  dur: number
  /** # seconds left in this interruption, if active */
  secsLeft: number
  /** {@link LightSetting} we'll be following while interrupted */
  ls: LightSetting
}

/** intensity and color temperature, 0-100 */
type LightSetting = [number, number]

export type LightScheduleInfo = {
  /** Period we think we're in (only updated in SCHED_SS or FADEtoSCHED mode) */
  lastPeriod: string
  /** {@link FadeType} of sunrise+sunset */
  fType: FadeType
  /**
   * SECONDS since midnight when transitions occur in schedule.
   * 1. sunriseBeginTimeOfDay - time when sunrise begins / nighttime ends
   * 2. daylightBeginTimeOfDay - time when daylight begins / sunrise ends
   * 3. sunsetBeginTimeOfDay - time when sunset begins / daylight ends
   * 4. nighttimeBeginTimeOfDay - time when nighttime starts / sunset ends
   */
  times: [number, number, number, number]
  /** {@link LightSetting} for "daytime", as defined by "times"  */
  day: LightSetting
  /** {@link LightSetting} for "nighttime", as defined by "times"  */
  night: LightSetting
}

export enum LightMode {
  /** In steady state, following our stored schedule */
  SCHED_SS = "SCHED_SS",
  /** In steady state, holding to our interruption setting */
  INTER_SS = "INTER_SS",
  /** Fading from any other state into a new interruption */
  FADEtoINTER = "FADEtoINTER",
  /** Fading from any other state into our stored schedule */
  FADEtoSCHED = "FADEtoSCHED",
  /** Special state to meter FP control - waiting before rushing to FADEtoINTER */
  WAITbfINTER = "WAITbfINTER",
}

/** Origin of last state change */
enum SettingCause {
  AUTO = "AUTO",
  OTA = "OTA",
  FP = "FP",
}

export type SystemStatus = {
  userSW: string
  sysSW: string
  sn: string
  powerOn: boolean
  safeMode: SafeMode
  timeZone: number
  setUp: boolean
  knobIntDur: number
  aquaTempTarget: number
  watchdog: number
  loopTime: number
  freeMemory: number
  i2cMisfires: number
  wifi: Wifi
  state: {
    listening: boolean
  }
  time: Time
  fancyP: FancyP
}

export type FancyP = {
  peripheral: string
  dMode: number
  secsSinceTouch: number
}

export type SafeMode = {
  on: boolean
  verbose: boolean
}

export type Time = {
  /** Epoch time Photon believes it is, from RTC and Particle cloud */
  epoch: number
  /** How many seconds we think we're past midnight, using TZ offset */
  secOfDay: number
  /** How many millseconds have elapsed since boot */
  millis: number
}

export function timeToDate(time: Time, tzOffset: number) {
  const now = new Date()
  // Get UTC time in ms
  // convert to ms and add/subtract local time zone offset.
  var utc = now.getTime() + now.getTimezoneOffset() * 60 * 1000
  // create new Date object for different city
  // using supplied offset
  const offsetTime = new Date(utc + tzOffset * 60 * 60 * 1000)
  return new Date(
    offsetTime.getFullYear(),
    offsetTime.getMonth(),
    offsetTime.getDate(),
    0,
    0,
    time.secOfDay,
    0
  )
}

export type Wifi = {
  ssid: string
  rssi: number
  ip: string
  APs: string[]
  uptime: number
}
