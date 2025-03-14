import assert from "assert"

import { jwtVerify } from "jose"
import { cookies } from "next/headers"
import { cache } from "react"

assert(process.env.ECOSYSTEM_PASSWORD)

// Also use it as the key, why not
const ECOSYSTEM_PASSWORD = new TextEncoder().encode(
  process.env.ECOSYSTEM_PASSWORD
)

export const protect = cache(async function protect() {
  const ecoSession = (await cookies()).get("eco-session")
  if (!ecoSession) {
    return false
  }
  try {
    await jwtVerify(ecoSession.value, ECOSYSTEM_PASSWORD, {
      algorithms: ["HS256"],
    })
    return true
  } catch {
    return false
  }
})
