import { jwtVerify } from "jose"
import { cookies } from "next/headers"
import { cache } from "react"

import { getGrove } from "./groves"

export const protect = cache(async function protect(name: string) {
  const grove = getGrove(name)
  if (grove instanceof Error) {
    return false
  }
  const ecoSession = (await cookies()).get(grove.cookie)
  if (!ecoSession) {
    return false
  }
  try {
    await jwtVerify(ecoSession.value, grove.signingKey, {
      algorithms: ["HS256"],
    })
    return true
  } catch {
    return false
  }
})
