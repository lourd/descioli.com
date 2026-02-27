import { addSeconds } from "date-fns"
import { revalidatePath } from "next/cache"
import { notFound } from "next/navigation"
import { ErrorBoundary } from "react-error-boundary"

import { protect } from "../auth"
import {
  PUMP_MAX_CYCLE,
  PumpInterruption,
  PumpMode,
  PumpSchedule,
  timeToDate,
} from "../ecosystem-models"
import { getGrove } from "../groves"
import { ResumeSchedule } from "../resume-schedule"
import { SetPump, SetPumpSchedule } from "./client"

export default async function PumpPage(
  props: PageProps<"/ecosystem/[name]/pump">
) {
  const params = await props.params
  const path = `/ecosystem/${params.name}/pump`

  async function handleResumeSchedule() {
    "use server"
    const isAuthenticated = await protect(params.name)
    if (!isAuthenticated) return

    const grove = getGrove(params.name)
    if (grove instanceof Error) throw grove
    const response = await grove.particleApi.resumePumpSchedule(grove.deviceId)
    revalidatePath(path)
    if (!(response.statusCode === 200 && response.body.return_value === 1)) {
      console.error(
        `Unexpected response resuming schedule, status: ${response.statusCode}, return_value: ${response.body.return_value}`
      )
    }
  }

  async function handleSetSchedule(schedule: PumpSchedule) {
    "use server"
    const isAuthenticated = await protect(params.name)
    if (!isAuthenticated) return false

    const grove = getGrove(params.name)
    if (grove instanceof Error) throw grove
    const response = await grove.particleApi.setPumpSchedule(
      grove.deviceId,
      schedule
    )
    revalidatePath(path)
    return response.statusCode === 200 && response.body.return_value === 1
  }

  async function handleInterrupt(data: PumpInterruption) {
    "use server"
    const isAuthenticated = await protect(params.name)
    if (!isAuthenticated) return false

    const grove = getGrove(params.name)
    if (grove instanceof Error) throw grove
    const response = await grove.particleApi.interruptPump(grove.deviceId, data)
    revalidatePath(path)
    return response.statusCode === 200 && response.body.return_value === 1
  }

  const grove = getGrove(params.name)
  if (grove instanceof Error) {
    notFound()
  }
  const [pumpResponse, systemResponse] = await Promise.all([
    grove.particleApi.getPump(grove.deviceId),
    grove.particleApi.getSystemStatus(grove.deviceId),
  ])
  const setting = pumpResponse.body.result

  const authenticated = await protect(params.name)

  const date = timeToDate(
    systemResponse.body.result.time,
    systemResponse.body.result.timeZone
  )
  const pauseEndDate = addSeconds(date, setting.inter.secsLeft)

  return (
    <div className="max-w-md mt-2">
      <p>
        The pump is{" "}
        <span className="font-bold">{setting.pumpOn ? "on" : "off"}</span>
      </p>
      <ResumeSchedule
        isHidden={setting.mode !== PumpMode.InterruptedContantState}
        authenticated={authenticated}
        resumeScheduleAction={handleResumeSchedule}
      >
        <p className="mt-1">
          Temporarily{" "}
          <span className="font-bold">{setting.pumpOn ? "on" : "off"}</span>{" "}
          until {pauseEndDate.toLocaleTimeString()}
        </p>
      </ResumeSchedule>
      <ErrorBoundary
        fallback={
          <p className="py-8">{"😵‍💫 well that wasn't supposed to happen..."}</p>
        }
      >
        <SetPump
          setPump={handleInterrupt}
          setting={setting}
          authenticated={authenticated}
        />
      </ErrorBoundary>

      <ErrorBoundary
        fallback={
          <p className="py-8">{"😵‍💫 well that wasn't supposed to happen..."}</p>
        }
      >
        <SetPumpSchedule
          setting={setting}
          setPumpSchedule={handleSetSchedule}
          authenticated={authenticated}
          maxCycle={PUMP_MAX_CYCLE}
        />
      </ErrorBoundary>
    </div>
  )
}
