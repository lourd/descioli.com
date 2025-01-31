import assert from "assert"

import { SignJWT } from "jose"
import { Metadata } from "next"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

import { protect } from "./auth"
import { EcoTime } from "./eco-time"
import { EcosystemProvider } from "./ecosystem-context"
import {
  MY_ECOSYSTEM_DEVICE_ID,
  reactCachedGetSystemStatus,
  setTimezone,
} from "./ecosystem-methods"
import { PasswordForm } from "./password-form"
import { Tabs } from "./tabs"

assert(process.env.ECOSYSTEM_PASSWORD)
const ECOSYSTEM_PASSWORD = process.env.ECOSYSTEM_PASSWORD

// Also use it as the key, why not
const key = new TextEncoder().encode(ECOSYSTEM_PASSWORD)

export const metadata: Metadata = {
  title: "Lou's Ecosystem",
  description: "A new take on controlling my still-living Ecosystem",
}

export const dynamic = "force-dynamic"

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
    ;(await cookies()).set("eco-session", jwt, {
      expires: new Date(Date.now() + ONE_YEAR),
      httpOnly: true,
    })
    return false
  }

  async function logout() {
    "use server"
    ;(await cookies()).delete("eco-session")
  }

  const authenticated = await protect()

  const response = await reactCachedGetSystemStatus(MY_ECOSYSTEM_DEVICE_ID)

  return (
    <EcosystemProvider
      time={response.body.result.time}
      timeZone={response.body.result.timeZone}
    >
      <div className="max-w-lg mx-auto pt-2 pb-8 px-[2.5%]">
        <div className="flex flex-row items-center gap-4 justify-between md:mt-6">
          <h1 className="text-3xl">{"Lou's Ecosystem"}</h1>
          {authenticated && (
            <form action={logout}>
              <button
                type="submit"
                className="bg-muted px-2 py-1 rounded-sm text-sm"
              >
                Logout
              </button>
            </form>
          )}
        </div>
        <Info />
        {!authenticated && <PasswordForm login={enterPassword} />}
        <Tabs />
        {props.children}
      </div>
    </EcosystemProvider>
  )
}

async function Info() {
  async function updateTimezone(offset: number) {
    "use server"
    const authenticated = await protect()
    if (!authenticated) {
      return -1
    }

    console.log("updating timezone to", offset)
    const response = await setTimezone(MY_ECOSYSTEM_DEVICE_ID, offset)
    revalidatePath("/ecosystem/[tab]", "layout")
    console.log("timezone response", response)
    return response.body.return_value
  }

  const response = await reactCachedGetSystemStatus(MY_ECOSYSTEM_DEVICE_ID)
  return (
    <pre className="mt-2 mb-2 text-foreground-gray text-sm">
      {response.body.result.sn}
      <EcoTime
        changeTimezone={updateTimezone}
        timeZone={response.body.result.timeZone}
      />
    </pre>
  )
}
