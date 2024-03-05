import { ok } from "assert"

import { SignJWT } from "jose"
import { Metadata } from "next"
import { cookies } from "next/headers"

import { protect } from "./auth"
import {
  MY_ECOSYSTEM_DEVICE_ID,
  reactCachedGetSystemStatus,
} from "./ecosystem-methods"
import { timeToDate } from "./ecosystem-models"
import { LightTabs } from "./light-tabs"
import { PasswordForm } from "./password-form"

ok(process.env.ECOSYSTEM_PASSWORD)
const ECOSYSTEM_PASSWORD = process.env.ECOSYSTEM_PASSWORD

// Also use it as the key, why not
const key = new TextEncoder().encode(ECOSYSTEM_PASSWORD)

export const metadata: Metadata = {
  title: "Lou's Ecosystem",
  description: "A new take on setting the lights on my still-living Ecosystem",
}

const ONE_YEAR = 1000 * 60 * 60 * 24 * 365

export default async function EcosystemLayout(props: {
  children: React.ReactNode
}) {
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

  const authenticated = await protect()

  return (
    <div className="max-w-lg mx-auto pt-2 pb-8 px-[2.5%]">
      <div className="flex flex-row items-center gap-4 justify-between md:mt-6">
        <h1 className="text-3xl">{"Lou's Ecosystem"}</h1>
        {authenticated && (
          <form action={logout}>
            <button
              type="submit"
              className="bg-muted px-2 py-1 rounded text-sm"
            >
              Logout
            </button>
          </form>
        )}
      </div>
      <Info />
      {!authenticated && <PasswordForm login={enterPassword} />}
      <LightTabs />
      {props.children}
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
