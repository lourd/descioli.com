import { readdir, readFile } from "fs/promises"

import { compareDesc } from "date-fns"
import matter from "gray-matter"
import { notFound } from "next/navigation"

import { isFulfilled } from "./assert-settled"

const WPM = 300

/**
 * Gets the stories from the public directory, parsed into their data and string
 * content, sorted with most recent first by date then publication.
 */
export async function getStories() {
  const entries = await readdir("public/stories", { withFileTypes: true })
  const promises = await Promise.allSettled(
    entries
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .map(async (slug) => {
        const file = await readFile(`public/stories/${slug}/index.md`, "utf8")
        const { data, content } = matter(file)
        const wordCount = getWordCount(content)
        const readLength = Math.ceil(wordCount / WPM)
        return { slug, data, content, wordCount, readLength }
      })
  )
  return promises
    .filter(isFulfilled)
    .map((promise) => promise.value)
    .sort((a, b) => {
      if (a.data.date || b.data.date) {
        return compareDesc(a.data.date, b.data.date)
      }
      return compareDesc(a.data.publication, b.data.publication)
    })
}

function getWordCount(content: string): number {
  const matches = content.match(/\w+/g)
  return matches?.length ?? 0
}

export async function getStory(slug: string) {
  const stories = await getStories()
  const index = stories.findIndex((story) => story.slug === slug)
  if (index === -1) {
    notFound()
  }

  const story = stories[index]
  const next = stories[index - 1]
  const previous = stories[index + 1]

  const directory = "public/stories/" + slug
  const filename = directory + "/index.md"

  const lastEditUrl =
    "https://www.github.com/lourd/descioli.com/commits/main/" + filename

  return { ...story, lastEditUrl, index, next, previous }
}

export type Story = typeof getStory extends (slug: string) => Promise<infer T>
  ? T
  : never

export async function getSlugs() {
  const entries = await readdir("public/stories/", { withFileTypes: true })
  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => ({ slug: entry.name }))
}
