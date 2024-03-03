import { ok } from "assert"

import { addSeconds } from "date-fns"
import { jwtVerify, SignJWT } from "jose"
import { Metadata } from "next"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import Link from "next/link"
import { ErrorBoundary } from "react-error-boundary"

import { SetLight, SetLightSchedule } from "./client"
import {
  AquariumLamp,
  CanopyLamp,
  EcosystemLamp,
  FadeType,
} from "./ecosystem-enums"
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
import { PasswordForm } from "./password-form"

const PATH = "/ecosystem"

const lights: Array<[string, EcosystemLamp]> = [
  ["Canopy", CanopyLamp],
  ["Aquarium", AquariumLamp],
]

ok(process.env.ECOSYSTEM_PASSWORD)
const ECOSYSTEM_PASSWORD = process.env.ECOSYSTEM_PASSWORD

// Also use it as the key, why not
const key = new TextEncoder().encode(ECOSYSTEM_PASSWORD)

type PageProps = {
  params: any
  searchParams: Record<string, string>
}

export const metadata: Metadata = {
  title: "Lou's Ecosystem",
  description: "A new take on setting the lights on my still-living Ecosystem",
}

async function protect() {
  const ecoSession = cookies().get("eco-session")
  if (!ecoSession) {
    throw new Error("missing header")
  }
  await jwtVerify(ecoSession.value, key, {
    algorithms: ["HS256"],
  })
}

const ONE_YEAR = 1000 * 60 * 60 * 24 * 365

export default async function EcosystemControllerPage(props: PageProps) {
  async function enterPassword(_state: boolean, form: FormData) {
    "use server"
    const submission = form.get("password")
    if (submission !== ECOSYSTEM_PASSWORD) {
      return true
    }
    const jwt = await new SignJWT()
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1 year")
      .sign(key)
    cookies().set("eco-session", jwt, {
      expires: new Date(Date.now() + ONE_YEAR),
      httpOnly: true,
    })
    return false
  }

  async function logout() {
    "use server"
    cookies().delete("eco-session")
  }

  let authenticated = false
  try {
    await protect()
    authenticated = true
  } catch {}

  return (
    <div className="max-w-3xl mx-auto pt-2 pb-8 px-[2.5%]">
      <h1 className="text-3xl md:mt-6">{"Lou's Ecosystem"}</h1>
      <Info />
      <PasswordForm
        authenticated={authenticated}
        login={enterPassword}
        logout={logout}
      />
      <div className="flex flex-row">
        {lights.map(([name, light]) => {
          return (
            <Link
              key={name}
              className={`p-2 hover:bg-slate-600 ${
                props.searchParams.light == light.id ? "underline" : ""
              }`}
              href={{
                pathname: PATH,
                query: { light: light.id },
              }}
            >
              {name}
            </Link>
          )
        })}
      </div>
      {lights.map(([name, light]) => {
        if (props.searchParams.light != light.id) {
          return null
        }
        return <Light key={name} light={light} authenticated={authenticated} />
      })}
    </div>
  )
}

async function Info() {
  const response = await reactCachedGetSystemStatus(MY_ECOSYSTEM_DEVICE_ID)
  const date = timeToDate(
    response.body.result.time,
    response.body.result.timeZone
  )
  date.getTimezoneOffset()
  return (
    <pre className="mt-2 mb-2 text-foregroundGray text-sm">
      {response.body.result.sn} • {date.toLocaleTimeString()}{" "}
      {response.body.result.timeZone} -{date.getTimezoneOffset() / 60}
    </pre>
  )
}

async function Light(props: { light: EcosystemLamp; authenticated: boolean }) {
  async function handleResumeSchedule() {
    "use server"
    await protect()
    const response = await resumeLightSchedule(
      MY_ECOSYSTEM_DEVICE_ID,
      props.light.id
    )
    revalidatePath(PATH, "layout")
    revalidatePath(`${PATH}?light=${props.light.id}`)
    return response.statusCode === 200 && response.body.return_value === 1
  }

  async function handleSetSchedule(schedule: LightScheduleInfo) {
    "use server"
    await protect()
    const response = await setLightSchedule(MY_ECOSYSTEM_DEVICE_ID, {
      fadeType: FadeType.QUINTIC_EASE_IN_OUT,
      light: props.light.id,
      sunriseBeginTime: Math.round(schedule.times[0] / 60),
      sunriseDuration: Math.round((schedule.times[1] - schedule.times[0]) / 60),
      dayIntensity: schedule.day[0],
      dayColor: schedule.day[1],
      sunsetBeginTime: Math.round(schedule.times[2] / 60),
      sunsetDuration: Math.round((schedule.times[3] - schedule.times[2]) / 60),
      nightIntensity: schedule.night[0],
      nightColor: schedule.night[1],
    })
    revalidatePath(PATH, "layout")
    revalidatePath(`${PATH}?light=${props.light.id}`)
    return response.statusCode === 200 && response.body.return_value === 1
  }

  async function handleLightInterrupt(data: Omit<LightInterruption, "light">) {
    "use server"
    await protect()
    const setting = LightInterruption.parse({
      ...data,
      light: props.light.id,
    })
    const response = await interruptLight(MY_ECOSYSTEM_DEVICE_ID, setting)
    console.log("response", response)
    revalidatePath(PATH, "layout")
    revalidatePath(`${PATH}?light=${props.light.id}`)
  }

  const [lightResponse, systemResponse] = await Promise.all([
    getLight(MY_ECOSYSTEM_DEVICE_ID, props.light.variable),
    reactCachedGetSystemStatus(MY_ECOSYSTEM_DEVICE_ID),
  ])
  const setting = lightResponse.body.result

  return (
    <div className="max-w-md mt-2">
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
          <div className="flex flex-row items-center text-sm">
            <p>Temporarily set until {pauseEndDate.toLocaleTimeString()}</p>
            {props.authenticated && (
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
        <SetLight
          id={props.light.id}
          setLight={handleLightInterrupt}
          setting={setting.inter}
          authenticated={props.authenticated}
        />
      </ErrorBoundary>

      <ErrorBoundary
        fallback={
          <p className="py-8">{"😵‍💫 well that wasn't supposed to happen..."}</p>
        }
      >
        <SetLightSchedule
          id={props.light.id}
          data={setting.sched}
          currentTime={systemResponse.body.result.time.secOfDay}
          setLightSchedule={handleSetSchedule}
          authenticated={props.authenticated}
        />
      </ErrorBoundary>
    </div>
  )
}
