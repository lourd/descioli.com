import { addSeconds } from "date-fns"
import { revalidatePath } from "next/cache"
import { ErrorBoundary } from "react-error-boundary"

import { protect } from "../auth"
import {
  getPump,
  interruptPump,
  MY_ECOSYSTEM_DEVICE_ID,
  reactCachedGetSystemStatus,
  resumePumpSchedule,
  setPumpSchedule,
} from "../ecosystem-methods"
import {
  PUMP_MAX_CYCLE,
  PumpInterruption,
  PumpMode,
  PumpSchedule,
  timeToDate,
} from "../ecosystem-models"
import { SetPump, SetPumpSchedule } from "./client"

const PATH = "/ecosystem/pump"

export default async function PumpPage() {
  async function handleResumeSchedule() {
    "use server"
    const isAuthenticated = await protect()
    if (!isAuthenticated) return false

    const response = await resumePumpSchedule(MY_ECOSYSTEM_DEVICE_ID)
    revalidatePath(PATH)
    return response.statusCode === 200 && response.body.return_value === 1
  }

  async function handleSetSchedule(schedule: PumpSchedule) {
    "use server"
    const isAuthenticated = await protect()
    if (!isAuthenticated) return false

    const response = await setPumpSchedule(MY_ECOSYSTEM_DEVICE_ID, schedule)
    revalidatePath(PATH)
    return response.statusCode === 200 && response.body.return_value === 1
  }

  async function handleInterrupt(data: PumpInterruption) {
    "use server"
    const isAuthenticated = await protect()
    if (!isAuthenticated) return false

    const response = await interruptPump(MY_ECOSYSTEM_DEVICE_ID, data)
    revalidatePath(PATH)
    return response.statusCode === 200 && response.body.return_value === 1
  }

  const [pumpResponse, systemResponse] = await Promise.all([
    getPump(MY_ECOSYSTEM_DEVICE_ID),
    reactCachedGetSystemStatus(MY_ECOSYSTEM_DEVICE_ID),
  ])
  const setting = pumpResponse.body.result

  const authenticated = await protect()

  return (
    <div className="max-w-md mt-2">
      <p>
        The pump is{" "}
        <span className="font-bold">{setting.pumpOn ? "on" : "off"}</span>
      </p>
      {(() => {
        if (setting.mode !== PumpMode.InterruptedContantState) {
          return null
        }

        const date = timeToDate(
          systemResponse.body.result.time,
          systemResponse.body.result.timeZone
        )
        const pauseEndDate = addSeconds(date, setting.inter.secsLeft)

        return (
          <div className="flex flex-row items-center text-sm mt-1">
            <p>
              Temporarily{" "}
              <span className="font-bold">{setting.pumpOn ? "on" : "off"}</span>{" "}
              until {pauseEndDate.toLocaleTimeString()}
            </p>
            {authenticated && (
              <form action={handleResumeSchedule} className="ml-2">
                <button className="px-2 py-0 rounded bg-gray-200 dark:bg-gray-700 whitespace-nowrap">
                  Resume schedule
                </button>
              </form>
            )}
          </div>
        )
      })()}

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
