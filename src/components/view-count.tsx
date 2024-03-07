import { unstable_noStore } from "next/cache"
import { headers } from "next/headers"
import { userAgent } from "next/server"
import { numify } from "numify"
import { cache } from "react"

import { sql } from "@/db/client"

type ViewCountProps = {
  slug: string
  fetchAll?: boolean
  increment?: true
}

export async function ViewCount(props: ViewCountProps) {
  // Instructs framework not to pre-render at build time
  unstable_noStore()

  let views = 0
  if (props.fetchAll) {
    const allViews = await getAllViews()
    const row = allViews.find((view) => view.slug === props.slug)
    views = row?.count ?? 0
  } else {
    views = await getViewsForSlug(props.slug)
  }

  if (props.increment) {
    const agent = userAgent({ headers: headers() })
    if (!agent.isBot) {
      void incrementViews(props.slug)
    }
  }

  return <span title={views.toLocaleString()}>{numify(views)}</span>
}

async function getViewsForSlug(slug: string) {
  console.log("getting views for", slug)
  const rows = await sql<{ count: number }[]>`
    SELECT count
    FROM views
    WHERE slug = ${slug}
  `
  return rows[0]?.count ?? 0
}

const getAllViews = cache(async function getAllViews() {
  console.log("getting all blog views")
  const rows = await sql<{ slug: string; count: number }[]>`
    SELECT slug, count
    FROM views
  `
  return rows
})

const incrementViews = cache(async function incrementViews(slug: string) {
  console.log("incrementing views for", slug)
  await sql`
    INSERT INTO views (slug, count)
    VALUES (${slug}, 1)
    ON CONFLICT (slug)
    DO UPDATE SET count = views.count + 1
  `
})
