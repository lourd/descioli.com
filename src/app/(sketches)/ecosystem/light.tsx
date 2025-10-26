import { addSeconds } from "date-fns"
import { revalidatePath } from "next/cache"
import { connection } from "next/server"
import { ViewTransition } from "react"
import { ErrorBoundary } from "react-error-boundary"

import { protect } from "./auth"
import { SetLight, SetLightSchedule } from "./client"
import { EcosystemLamp, FadeType } from "./ecosystem-enums"
import {
  getLight,
  interruptLight,
  MY_ECOSYSTEM_DEVICE_ID,
  reactCachedGetSystemStatus,
  resumeLightSchedule,
  setLightSchedule,
} from "./ecosystem-methods"
import {
  LightInterruption,
  LightMode,
  LightScheduleInfo,
  timeToDate,
} from "./ecosystem-models"
import classes from "./classes.module.css"

type LightProps = EcosystemLamp & {
  path: string
}

export async function Light(props: LightProps) {
  async function handleResumeSchedule() {
    "use server"
    const isAuthenticated = await protect()
    if (!isAuthenticated) return

    const response = await resumeLightSchedule(MY_ECOSYSTEM_DEVICE_ID, props.id)
    revalidatePath(props.path)
    if (!(response.statusCode === 200 && response.body.return_value === 1)) {
      console.error(
        `Unexpected response resuming schedule, status: ${response.statusCode}, return_value: ${response.body.return_value}`
      )
    }
  }

  async function handleSetSchedule(schedule: LightScheduleInfo) {
    "use server"
    const isAuthenticated = await protect()
    if (!isAuthenticated) return false

    const response = await setLightSchedule(MY_ECOSYSTEM_DEVICE_ID, {
      fadeType: FadeType.QUINTIC_EASE_IN_OUT,
      light: props.id,
      sunriseBeginTime: Math.round(schedule.times[0] / 60),
      sunriseDuration: Math.round((schedule.times[1] - schedule.times[0]) / 60),
      dayIntensity: schedule.day[0],
      dayColor: schedule.day[1],
      sunsetBeginTime: Math.round(schedule.times[2] / 60),
      sunsetDuration: Math.round((schedule.times[3] - schedule.times[2]) / 60),
      nightIntensity: schedule.night[0],
      nightColor: schedule.night[1],
    })
    revalidatePath(props.path)
    return response.statusCode === 200 && response.body.return_value === 1
  }

  async function handleLightInterrupt(data: Omit<LightInterruption, "light">) {
    "use server"
    const isAuthenticated = await protect()
    if (!isAuthenticated) return false

    const setting = LightInterruption.parse({
      ...data,
      light: props.id,
    })
    const response = await interruptLight(MY_ECOSYSTEM_DEVICE_ID, setting)
    revalidatePath(props.path)
    return response.statusCode === 200 && response.body.return_value === 1
  }

  await connection() // Don't pre-render this page
  const [lightResponse, systemResponse] = await Promise.all([
    getLight(MY_ECOSYSTEM_DEVICE_ID, props.variable),
    reactCachedGetSystemStatus(MY_ECOSYSTEM_DEVICE_ID),
  ])
  const setting = lightResponse.body.result

  const authenticated = await protect()

  return (
    <div className="max-w-md mt-2">
      <div className={`${classes.tempBar} flex flex-row items-center text-sm`}>
        {(() => {
          if (
            setting.mode === LightMode.SCHED_SS ||
            setting.mode === LightMode.FADEtoSCHED
          ) {
            return null
          }

          const date = timeToDate(
            systemResponse.body.result.time,
            systemResponse.body.result.timeZone
          )
          const pauseEndDate = addSeconds(date, setting.inter.secsLeft)

          return (
            <ViewTransition>
              <p>Temporarily set until {pauseEndDate.toLocaleTimeString()}</p>
              {authenticated && (
                <form action={handleResumeSchedule} className="ml-2">
                  <button className="px-2 py-0 rounded-sm bg-gray-200 dark:bg-gray-700 whitespace-nowrap">
                    Resume schedule
                  </button>
                </form>
              )}
            </ViewTransition>
          )
        })()}
      </div>

      <ErrorBoundary
        fallback={
          <p className="py-8">{"😵‍💫 well that wasn't supposed to happen..."}</p>
        }
      >
        <SetLight
          id={props.id}
          setLight={handleLightInterrupt}
          setting={setting.inter}
          authenticated={authenticated}
        />
      </ErrorBoundary>

      <ErrorBoundary
        fallback={
          <p className="py-8">{"😵‍💫 well that wasn't supposed to happen..."}</p>
        }
      >
        <SetLightSchedule
          id={props.id}
          data={setting.sched}
          setLightSchedule={handleSetSchedule}
          authenticated={authenticated}
        />
      </ErrorBoundary>
    </div>
  )
}
