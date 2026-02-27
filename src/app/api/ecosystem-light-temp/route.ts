import assert from "assert"

import { LightInterruption } from "../../(sketches)/ecosystem/[name]/ecosystem-models"
import { getGrove } from "../../(sketches)/ecosystem/[name]/groves"

assert(process.env.API_SECRET, "API_SECRET not set")
const API_SECRET = process.env.API_SECRET

export async function POST(request: Request) {
  const authHeader = request.headers.get("authorization")
  if (authHeader !== `Bearer ${API_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    })
  }

  let setting: LightInterruption

  try {
    const json = await request.json()
    setting = LightInterruption.parse(json)
  } catch (err) {
    return new Response((err as Error).message, {
      status: 400,
    })
  }

  const grove = getGrove("lou")
  if (grove instanceof Error) {
    return new Response("Grove not found", {
      status: 404,
    })
  }
  const result = await grove.particleApi.interruptLight(grove.deviceId, setting)
  return new Response(undefined, { status: result.statusCode })
}
