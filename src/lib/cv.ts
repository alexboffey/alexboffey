import { readFileSync } from "node:fs"
import { resolve } from "node:path"

/**
 * The CV, parsed at build time from `docs/cv-sources/cv-2026-10.md`, the same
 * file `npm run cv` renders to the PDF download. That markdown is the single
 * source of truth: edit it and the site and the PDF move together. Nothing in
 * this file restates CV copy, except the stack chips below, which the
 * markdown has no place for.
 *
 * The parser handles only the shape that file uses and throws on anything it
 * does not recognise, so a structural edit breaks the build instead of
 * silently dropping a section from the site.
 */

export const CV_SOURCE = "docs/cv-sources/cv-2026-10.md"

export interface Bullet {
  text: string
}

export interface BulletGroup {
  /** Optional subheading above a cluster of bullets (e.g. "Leadership"). */
  heading?: string
  bullets: Bullet[]
}

export interface Role {
  title: string
  span: string
}

export interface Position {
  org: string
  location: string
  span: string
  /** Multiple titles where the role was promoted within one organisation. */
  roles: Role[]
  context?: string
  /** One or more clusters; a single group with no heading reads as a flat list. */
  groups: BulletGroup[]
  stack: string[]
}

/**
 * The few technologies that define each role, shown as chips on the site only.
 * Each one must be named in the CV markdown, in that position's entry or the
 * Skills list.
 */
const stacks: Record<string, string[]> = {
  GEEIQ: [
    "React",
    "TypeScript",
    "Next.js",
    "TanStack Query",
    "Radix UI",
    "D3",
    "Playwright",
    "Node.js",
    "tRPC",
    "PostgreSQL",
    "Kubernetes",
    "Claude Code",
  ],
  OrgVue: ["React", "TypeScript", "Redux", "GraphQL", "Node.js", "Cypress"],
  "iWeb Solutions": ["JavaScript", "PHP", "Magento", "WordPress"],
}

const source = readFileSync(resolve(process.cwd(), CV_SOURCE), "utf8")

/** Markdown inline marks the site renders as plain text. */
const plain = (text: string) => text.replace(/\*\*|`/g, "").trim()

function section(name: string) {
  const match = source.match(
    new RegExp(
      `^## ${name}\\s*$([\\s\\S]*?)(?=^---\\s*$|^## |(?![\\s\\S]))`,
      "m",
    ),
  )
  if (!match) throw new Error(`${CV_SOURCE}: no "## ${name}" section`)
  return match[1].trim()
}

function parsePosition(block: string): Position {
  const [head, ...lines] = block.split("\n")
  const ident = head.match(/^(.+?), (.+) \((.+)\)$/)
  if (!ident) throw new Error(`${CV_SOURCE}: bad position heading "${head}"`)
  const [, org, location, span] = ident

  const roles: Role[] = []
  const groups: BulletGroup[] = []
  let context: string | undefined

  for (const raw of lines) {
    const line = raw.trim()
    if (!line) continue
    const bold = line.match(/^\*\*(.+?)\*\*(?: \((.+)\))?$/)
    if (line.startsWith("- ")) {
      if (!groups.length) groups.push({ bullets: [] })
      groups.at(-1)!.bullets.push({ text: plain(line.slice(2)) })
    } else if (bold && !context && !groups.length) {
      // Titles sit above the context and the bullets; a bold line after them
      // is a group heading.
      roles.push({ title: bold[1], span: bold[2] ?? span })
    } else if (bold) {
      groups.push({ heading: bold[1], bullets: [] })
    } else if (!context && !groups.length) {
      context = plain(line)
    } else {
      throw new Error(`${CV_SOURCE}: unexpected line under ${org}: "${line}"`)
    }
  }

  const stack = stacks[org]
  if (!stack) throw new Error(`cv.ts: no stack chips for "${org}"`)
  return { org, location, span, roles, context, groups, stack }
}

export const profile = plain(section("Profile"))

export const positions: Position[] = section("Experience")
  .split(/^### /m)
  .filter((block) => block.trim())
  .map(parsePosition)

const educationLine = section("Education").match(
  /^\*\*(.+?)\*\*, (.+) \((.+)\)$/,
)
if (!educationLine) throw new Error(`${CV_SOURCE}: bad Education line`)

export const education = {
  institution: educationLine[1],
  award: educationLine[2],
  span: educationLine[3],
}

export const interests = plain(section("Interests"))
