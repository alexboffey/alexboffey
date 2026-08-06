import { glob } from "astro/loaders"
import { z } from "astro/zod"
import { defineCollection } from "astro:content"

/**
 * Frontmatter keeps the shape the markdown files already use, so the ported
 * posts needed no edits. `tags` arrives as a comma-separated string and is
 * normalised here rather than in every template.
 */
const tags = z
  .string()
  .optional()
  .transform((value) =>
    value
      ? value
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean)
      : [],
  )

const shared = {
  title: z.string(),
  subtitle: z.string().optional(),
  date: z.coerce.date(),
  published: z.boolean().default(false),
  post_type: z.string().optional(),
  tags,
}

const writing = defineCollection({
  // retainBody keeps the raw markdown on the entry, which is what the reading
  // time is counted from. Without it every post reports one minute.
  loader: glob({
    pattern: "**/index.md",
    base: "./src/content/writing",
    retainBody: true,
  }),
  schema: z.object(shared),
})

const work = defineCollection({
  loader: glob({ pattern: "**/index.md", base: "./src/content/work" }),
  schema: z.object({
    ...shared,
    featured_image: z.string().optional(),
    thumb: z.string().optional(),
    /** Marks a case study whose copy is authored placeholder, not real claims. */
    placeholder: z.boolean().default(false),
  }),
})

export const collections = { writing, work }
