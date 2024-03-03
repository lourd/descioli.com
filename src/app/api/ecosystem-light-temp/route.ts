import { ok as assert } from "node:assert"

import {
  interruptLight,
  MY_ECOSYSTEM_DEVICE_ID,
} from "../../(sketches)/ecosystem/ecosystem-methods"
import { LightInterruption } from "../../(sketches)/ecosystem/ecosystem-models"

export const runtime = "edge"

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
    return new Response((err as any).message, {
      status: 400,
    })
  }

  const result = await interruptLight(MY_ECOSYSTEM_DEVICE_ID, setting)
  return new Response(undefined, { status: result.statusCode })
}
