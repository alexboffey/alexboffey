import { getCollection } from "astro:content"

/** One row in an index list. */
export interface Entry {
  href: string
  title: string
  summary?: string
  meta?: string[]
  placeholder?: boolean
}

/**
 * Collection access in one place. `published: false` never reaches a route, the
 * same gate the old Gatsby build applied, so the drafts that came across in the
 * port stay drafts.
 */

const byNewest = (a: { data: { date: Date } }, b: { data: { date: Date } }) =>
  b.data.date.valueOf() - a.data.date.valueOf()

export async function getWriting() {
  const entries = await getCollection("writing", ({ data }) => data.published)
  return entries.sort(byNewest)
}

export async function getWork() {
  const entries = await getCollection("work", ({ data }) => data.published)
  return entries.sort(byNewest)
}

export function formatDate(date: Date) {
  return date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
  })
}

export function formatFullDate(date: Date) {
  return date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

/** Reading time from the raw markdown body, at 220wpm. */
export function readingTime(body: string | undefined) {
  const words = (body ?? "").trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 220))
}
