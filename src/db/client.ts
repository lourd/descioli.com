import { ok } from "node:assert"

import postgres from "postgres"

ok(process.env.POSTGRES_URL)

export const sql = postgres(process.env.POSTGRES_URL)
