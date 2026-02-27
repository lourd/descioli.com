import { SignJWT } from "jose"
import { Metadata } from "next"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"
import { Suspense, ViewTransition } from "react"

import { protect } from "./auth"
import { EcoTime } from "./eco-time"
import { EcosystemProvider } from "./ecosystem-context"
import { GroveSelect } from "./grove-select"
import { getGrove, getNames } from "./groves"
import { PasswordForm } from "./password-form"
import { Tabs } from "./tabs"

const ONE_YEAR = 1000 * 60 * 60 * 24 * 365

export async function generateMetadata(
  props: LayoutProps<"/ecosystem/[name]">
): Promise<Metadata> {
  const grove = getGrove((await props.params).name)
  if (grove instanceof Error) {
    notFound()
  }

  return {
    title: grove.name,
    description: grove.description,
  }
}

export default async function EcosystemLayout(
  props: LayoutProps<"/ecosystem/[name]">
) {
  const params = await props.params
  const names = getNames()
  return (
    <div className="max-w-lg mx-auto pt-2 pb-8">
      <div className="mx-[2.5vw] relative">
        <div className="flex flex-row items-center gap-4 justify-between md:mt-6">
          <GroveSelect options={names} />
        </div>
        <Suspense>
          <LogoutButton name={params.name} />
        </Suspense>
        <Suspense>
          <Content name={params.name}>{props.children}</Content>
        </Suspense>
      </div>
    </div>
  )
}

async function LogoutButton(props: { name: string }) {
  const authenticated = await protect(props.name)
  async function logout() {
    "use server"
    const grove = getGrove(props.name)
    if (grove instanceof Error) {
      throw grove
    }
    ;(await cookies()).delete(grove.cookie)
  }

  return (
    authenticated && (
      <form action={logout}>
        <button
          type="submit"
          className="bg-muted px-2 py-1 rounded-sm text-sm absolute mt-1 right-0 top-1"
        >
          Logout
        </button>
      </form>
    )
  )
}

async function Content(props: { name: string; children: React.ReactNode }) {
  async function enterPassword(_state: boolean, form: FormData) {
    "use server"
    const submission = form.get("password")
    const grove = getGrove(props.name)
    if (grove instanceof Error) {
      throw grove
    }
    if (submission !== grove.password) {
      return true
    }
    const jwt = await new SignJWT()
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1 year")
      .sign(grove.signingKey)
    ;(await cookies()).set(grove.cookie, jwt, {
      expires: new Date(Date.now() + ONE_YEAR),
      httpOnly: true,
    })
    return false
  }

  const authenticated = await protect(props.name)
  const grove = getGrove(props.name)
  if (grove instanceof Error) {
    notFound()
  }

  const response = await grove.particleApi.getSystemStatus(grove.deviceId)
  return (
    <EcosystemProvider
      time={response.body.result.time}
      timeZone={response.body.result.timeZone}
    >
      <Info name={props.name} />
      {!authenticated && <PasswordForm login={enterPassword} />}
      <Tabs base={`/ecosystem/${props.name}`} />
      <ViewTransition>{props.children}</ViewTransition>
    </EcosystemProvider>
  )
}

async function Info(props: { name: string }) {
  async function updateTimezone(offset: number) {
    "use server"
    const authenticated = await protect(props.name)
    if (!authenticated) {
      return -1
    }

    const grove = getGrove(props.name)
    if (grove instanceof Error) {
      throw grove
    }
    console.log("updating timezone to", offset)
    const response = await grove.particleApi.setTimezone(grove.deviceId, offset)
    revalidatePath(`/ecosystem/${props.name}/[tab]`, "layout")
    console.log("timezone response", response)
    return response.body.return_value
  }

  const grove = getGrove(props.name)
  if (grove instanceof Error) {
    notFound()
  }
  const response = await grove.particleApi.getSystemStatus(grove.deviceId)
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
