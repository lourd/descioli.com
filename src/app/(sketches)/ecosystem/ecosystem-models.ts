import { z } from "zod"

import { EcosystemLightId, FadeType } from "./ecosystem-enums"

const LightIntensity = z.number().gte(0).lte(100)

const LightColor = z.number().int().gte(0).lte(100)

export const LightSchedule = z
  .object({
    fadeType: z.enum(FadeType),
    light: z.enum(EcosystemLightId),
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
  light: z.enum(EcosystemLightId),
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

/** intensity and color temperature, 0-100 */
export const LightSetting = z.tuple([LightIntensity, LightColor])

export type LightSetting = z.infer<typeof LightSetting>

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
export enum SettingCause {
  AUTO = "AUTO",
  OTA = "OTA",
  FP = "FP",
}

export const LightScheduleInfo = z.object({
  /** Period we think we're in (only updated in SCHED_SS or FADEtoSCHED mode) */
  lastPeriod: z.string(),
  /** {@link FadeType} of sunrise+sunset */
  fType: z.enum(FadeType),
  /**
   * SECONDS since midnight when transitions occur in schedule.
   * 1. sunriseBeginTimeOfDay - time when sunrise begins / nighttime ends
   * 2. daylightBeginTimeOfDay - time when daylight begins / sunrise ends
   * 3. sunsetBeginTimeOfDay - time when sunset begins / daylight ends
   * 4. nighttimeBeginTimeOfDay - time when nighttime starts / sunset ends
   */
  times: z.tuple([
    z.number().int().gte(0),
    z.number().int().gte(0),
    z.number().int().gte(0),
    z.number().int().gte(0),
  ]),
  /** {@link LightSetting} for "daytime", as defined by "times"  */
  day: LightSetting,
  /** {@link LightSetting} for "nighttime", as defined by "times"  */
  night: LightSetting,
})

export type LightScheduleInfo = z.infer<typeof LightScheduleInfo>

export const LightInterruptSetting = z.object({
  /** indicates if this is an indefinite length interruption */
  indef: z.boolean(),
  /** Total requested duration of this interruption in minutes */
  dur: z.number().int().gte(0),
  /** # seconds left in this interruption, if active */
  secsLeft: z.number().int().gte(0),
  /** {@link LightSetting} we'll be following while interrupted */
  ls: LightSetting,
})

export type LightInterruptSetting = z.infer<typeof LightInterruptSetting>

export const LightSettings = z.object({
  mode: z.enum(LightMode),
  why: z.enum(SettingCause),
  /** Current intensity outputted to each of this light's N strings (%) */
  sInt: z.array(LightIntensity),
  sched: LightScheduleInfo,
  /** relevant data IF we're interrupted */
  inter: LightInterruptSetting,
})

export type LightSettings = z.infer<typeof LightSettings>

export const SafeMode = z.object({
  on: z.boolean(),
  verbose: z.boolean(),
})

export type SafeMode = z.infer<typeof SafeMode>

export const Wifi = z.object({
  ssid: z.string(),
  rssi: z.number(),
  ip: z.string(),
  APs: z.array(z.string()),
  uptime: z.number(),
})

export type Wifi = z.infer<typeof Wifi>

export const Time = z.object({
  /** Epoch time Photon believes it is, from RTC and Particle cloud */
  epoch: z.number(),
  /** How many seconds we think we're past midnight, using TZ offset */
  secOfDay: z.number(),
  /** How many millseconds have elapsed since boot */
  millis: z.number(),
})

export type Time = z.infer<typeof Time>

export const FancyP = z.object({
  peripheral: z.string(),
  dMode: z.number(),
  secsSinceTouch: z.number(),
})

export type FancyP = z.infer<typeof FancyP>

export const SystemStatus = z.object({
  userSW: z.string(),
  sysSW: z.string(),
  sn: z.string(),
  powerOn: z.boolean(),
  safeMode: SafeMode,
  timeZone: z.number(),
  setUp: z.boolean(),
  knobIntDur: z.number(),
  aquaTempTarget: z.number(),
  watchdog: z.number(),
  loopTime: z.number(),
  freeMemory: z.number(),
  i2cMisfires: z.number(),
  wifi: Wifi,
  state: z.object({
    listening: z.boolean(),
  }),
  time: Time,
  fancyP: FancyP,
})

export type SystemStatus = z.infer<typeof SystemStatus>

export function timeToDate(time: Time, tzOffset: number) {
  const now = new Date()
  // Get UTC time in ms
  // convert to ms and add/subtract local time zone offset.
  const utc = now.getTime() + now.getTimezoneOffset() * 60 * 1000
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

export enum PumpMode {
  /** Won't ever turn on automatically */
  Disabled = "DISABLED",
  /** Won't ever turn off automatically */
  ConstantOn = "CONSTANT_ON",
  /** x mins on then y mins off... forever = EA behavior */
  ArbitraryDutyCycle = "SCHEDULE_ARBITRARY_DUTY_CYCLE",
  /** Default sched mode - deterministic on/off state by current minute */
  HourAligned = "SCHEDULE_HOUR_ALIGNED",
  /** Interrupted, holding an on/off state */
  InterruptedContantState = "INTERRUPTED_CONSTANT_STATE",
}

export const PumpSetting = z.object({
  pumpOn: z.boolean(),
  mode: z.enum(PumpMode),
  why: z.enum(SettingCause),
  /** nested object w/ data regarding our stored schedule */
  sched: z.object({
    /** mins for which pump will stay continuously ON */
    onTimeMins: z.number().int().gte(0),
    /** mins for which pump will stay continuously OFF */
    offTimeMins: z.number().int().gte(0),
    /** If in mode `SCHEDULE_ARBITRARY_DUTY_CYCLE`, # secs left until we flip states */
    arbitraryModeSecsLeft: z.number().int().gte(0).optional(),
  }),
  /** nested object - relevant data IF we're interrupted */
  inter: z.object({
    /** indicates if this is an indefinite length interruption */
    indef: z.boolean(),
    /** Total requested duration of this interruption in minutes */
    dur: z.number().int().gte(0),
    /** seconds left in this interruption, if active */
    secsLeft: z.number().int().gte(0),
  }),
  /** data regarding pump power readings */
  power: z.object({
    /** if != 0, an alarm is active (not implemented) */
    alarm: z.number().int().gte(0),
    /** our most recent current reading (watts) */
    value: z.number().gte(0),
  }),
})

export type PumpSetting = z.infer<typeof PumpSetting>

export const PUMP_MAX_CYCLE = 255

export const PumpSchedule = z.object({
  onPeriod: z.number().int().gte(0).lte(PUMP_MAX_CYCLE),
  offPeriod: z.number().int().gte(0).lte(PUMP_MAX_CYCLE),
})

export type PumpSchedule = z.infer<typeof PumpSchedule>

export function createPumpScheduleString(param: PumpSchedule) {
  return [pad(3, param.onPeriod), pad(3, param.offPeriod)].join(":")
}

export const PumpInterruption = z.object({
  state: z.boolean(),
  duration: z.number().int().gte(0).lt(1440),
})

export type PumpInterruption = z.infer<typeof PumpInterruption>

export function createPumpInterruptionString(param: PumpInterruption) {
  return [Number(param.state), pad(4, param.duration)].join(":")
}
