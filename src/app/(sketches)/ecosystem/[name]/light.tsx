import { addSeconds } from "date-fns"
import { revalidatePath } from "next/cache"
import { notFound } from "next/navigation"
import { ErrorBoundary } from "react-error-boundary"

import { protect } from "./auth"
import { SetLight, SetLightSchedule } from "./client"
import { EcosystemLamp, FadeType } from "./ecosystem-enums"
import {
  LightInterruption,
  LightMode,
  LightScheduleInfo,
  timeToDate,
} from "./ecosystem-models"
import { getGrove } from "./groves"
import { ResumeSchedule } from "./resume-schedule"

type LightProps = EcosystemLamp & {
  path: string
  name: string
}

export async function Light(props: LightProps) {
  async function handleResumeSchedule() {
    "use server"
    const isAuthenticated = await protect(props.name)
    if (!isAuthenticated) return

    const grove = getGrove(props.name)
    if (grove instanceof Error) throw grove
    const response = await grove.particleApi.resumeLightSchedule(
      grove.deviceId,
      props.id
    )
    revalidatePath(props.path)
    if (!(response.statusCode === 200 && response.body.return_value === 1)) {
      console.error(
        `Unexpected response resuming schedule, status: ${response.statusCode}, return_value: ${response.body.return_value}`
      )
    }
  }

  async function handleSetSchedule(schedule: LightScheduleInfo) {
    "use server"
    const isAuthenticated = await protect(props.name)
    if (!isAuthenticated) return false

    const grove = getGrove(props.name)
    if (grove instanceof Error) throw grove
    const response = await grove.particleApi.setLightSchedule(grove.deviceId, {
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
    const isAuthenticated = await protect(props.name)
    if (!isAuthenticated) return false

    const setting = LightInterruption.parse({
      ...data,
      light: props.id,
    })
    const grove = getGrove(props.name)
    if (grove instanceof Error) throw grove
    const response = await grove.particleApi.interruptLight(
      grove.deviceId,
      setting
    )
    revalidatePath(props.path)
    return response.statusCode === 200 && response.body.return_value === 1
  }

  const grove = getGrove(props.name)
  if (grove instanceof Error) {
    notFound()
  }
  const [lightResponse, systemResponse] = await Promise.all([
    grove.particleApi.getLight(grove.deviceId, props.variable),
    grove.particleApi.getSystemStatus(grove.deviceId),
  ])
  const setting = lightResponse.body.result

  const authenticated = await protect(props.name)

  const date = timeToDate(
    systemResponse.body.result.time,
    systemResponse.body.result.timeZone
  )
  const pauseEndDate = addSeconds(date, setting.inter.secsLeft)

  return (
    <div className="max-w-md mt-2">
      <ResumeSchedule
        isHidden={
          setting.mode === LightMode.SCHED_SS ||
          setting.mode === LightMode.FADEtoSCHED
        }
        authenticated={authenticated}
        resumeScheduleAction={handleResumeSchedule}
      >
        <p>Temporarily set until {pauseEndDate.toLocaleTimeString()}</p>
      </ResumeSchedule>

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
