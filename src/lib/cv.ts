/**
 * The CV, transcribed from the vault with nothing added. The current source is
 * `docs/cv-sources/cv-2026-10.md` (October 2026, v3-based structure); the
 * earlier archive files alongside it are provenance only.
 *
 * Deliberately omitted from this file: the phone number on line 1 of the
 * source. It belongs on a CV sent to a named recipient, not on a public web
 * page that scrapers read. Email and LinkedIn already serve the contact job.
 */

export interface Bullet {
  text: string
}

export interface BulletGroup {
  /** Optional subheading above a cluster of bullets (e.g. "Platform and architecture"). */
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
  /**
   * The few technologies that define this role, not a keyword list. Each one is
   * named in this position's own bullets or the source CV's account of it.
   */
  stack: string[]
}

/** Career start, from the earliest role in the history below. */
export const careerStart = new Date("2017-05-01")

/** Years of experience, derived so the claim cannot silently go stale. */
export function yearsOfExperience(now: Date = new Date()) {
  const months =
    (now.getFullYear() - careerStart.getFullYear()) * 12 +
    (now.getMonth() - careerStart.getMonth())
  return Math.floor(months / 12)
}

/**
 * The Profile paragraph from `docs/cv-sources/cv-2026-10.md`, built on the
 * product engineer one-liner in the vault Positioning doc. Keep it identical to
 * the markdown so the same pitch is on the site, in the PDF and in the vault CV.
 */
export const profile =
  "Product engineer with 9 years' experience and deep frontend roots. I own features end to end, from the problem through the API and data model to the UI. At GEEIQ I led the move from Ember.js to React and built the design system and test suite the app runs on. I also set the codebase up so AI agents ship consistent, tested code."

export const positions: Position[] = [
  {
    org: "GEEIQ",
    location: "London, UK",
    span: "Jun 2022 to Present",
    roles: [
      { title: "Senior Frontend Engineer II", span: "Aug 2025 to Present" },
      { title: "Senior Frontend Engineer", span: "Jun 2022 to Aug 2025" },
    ],
    context:
      "Analytics platform for 20 to 30 brands in gaming and virtual worlds. Joined as the company was moving its main app from Ember.js to React.",
    groups: [
      {
        heading: "Product and fullstack",
        bullets: [
          {
            text: "Led a team of 4 moving the main app from Ember.js to React. The old app was fully replaced in 6 months.",
          },
          {
            text: "Led the build of Dashboard Views: rebuilt the core Card component across 67 call sites without breaking any, made Tabs keyboard accessible across 51 nav items, and built a widget grid you can drag and resize with a mouse or the keyboard.",
          },
          {
            text: "Work across the Next.js admin tool and the API, service and database repos (Prisma, tRPC, PostgreSQL).",
          },
          {
            text: "Core contributor to GEEIQ's autonomous coding agent, which picks up Linear tickets and opens PRs. Built the in-cluster Fastify service that runs it as Kubernetes Jobs, replacing a chain of n8n and GitHub Actions.",
          },
          {
            text: "Added the agent's Linear integration (OAuth, signed webhooks), a daily Slack standup of the tickets it handled (built on Elasticsearch), and a Kibana dashboard tracking every run.",
          },
        ],
      },
      {
        heading: "Frontend architecture",
        bullets: [
          {
            text: "Built the design system: 40+ components on Radix UI and shadcn/ui, used across 296 files and documented in Storybook. Two company rebrands went through it, each done in a week.",
          },
          {
            text: "Set the frontend standards: monorepo, TypeScript strict mode, ESLint, pre-commit hooks and CI checks on every PR.",
          },
          {
            text: "Built the data visualisation layer on D3, Chart.js and Nivo, and wrote the RFC for the next chart library.",
          },
          {
            text: "Added Zod validation at the API boundary with deduplicated Sentry reporting, plus Elastic APM and Web Vitals monitoring.",
          },
        ],
      },
      {
        heading: "Testing and quality",
        bullets: [
          {
            text: "Built and maintain the test suite: unit, integration, 130+ Playwright tests on core journeys, and Chromatic visual regression.",
          },
          {
            text: "Moved end-to-end testing from Cypress to Playwright and split CI into 6 shards, cutting a full run from 15 to 20 minutes down to 5 to 10.",
          },
        ],
      },
      {
        heading: "AI engineering",
        bullets: [
          {
            text: "Set the codebase up for AI agents: rules for Claude and Codex, custom agent skills, MCP integrations and git worktrees for running agents in parallel. Ran the rest of a sprint as a parallel agent loop and got 3 tickets into review, with previews, in one day.",
          },
          {
            text: "Wrote Claude Code skills the whole team uses from the frontend repo: /visual-qa-sweep screenshots every main page against a baseline before merge, /check-and-fix-sentry-errors triages production errors and opens a PR per fix, and /prefer-semantic-tokens migrates code onto design tokens.",
          },
          {
            text: "Connected the Figma MCP to the agent setup, so component work starts from the design files instead of screenshots.",
          },
        ],
      },
      {
        heading: "Leadership",
        bullets: [
          {
            text: "Ran 10+ engineering, product and culture interviews, designed the technical test and whiteboard sessions, and onboarded new engineers onto React, the design system and the test setup.",
          },
          {
            text: "Sit on the AI committee, helping non-engineering teams start using AI tools.",
          },
        ],
      },
    ],
    stack: [
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
  },
  {
    org: "OrgVue",
    location: "London, UK",
    span: "Oct 2018 to Jun 2022",
    roles: [
      { title: "Senior Software Engineer", span: "Jun 2021 to Jun 2022" },
      { title: "Software Developer", span: "Apr 2019 to Jun 2021" },
      { title: "Junior Developer", span: "Oct 2018 to Apr 2019" },
    ],
    groups: [
      {
        bullets: [
          {
            text: "Led the frontend and wrote the technical spec for a job description generator, and mentored a junior engineer on it.",
          },
          {
            text: "Merged several repositories into one monorepo.",
          },
          {
            text: "Built Node tooling: a CLI, run in CI, for creating and updating survey data schemas, and a tool that moved legacy data onto a new schema over a REST API.",
          },
          {
            text: "Built a branding system for surveys, with a live preview that rendered one app inside another.",
          },
          {
            text: "Fixed performance bottlenecks with large datasets, and moved an application onto a new data service.",
          },
        ],
      },
    ],
    stack: ["React", "TypeScript", "Redux", "GraphQL", "Node.js", "Cypress"],
  },
  {
    org: "iWeb Solutions",
    location: "Staffordshire, UK",
    span: "May 2017 to Oct 2018",
    roles: [{ title: "Front End Developer", span: "May 2017 to Oct 2018" }],
    groups: [
      {
        bullets: [
          {
            text: "Built the frontends for ecommerce and marketing sites on Magento and WordPress.",
          },
        ],
      },
    ],
    stack: ["JavaScript", "PHP", "Magento", "WordPress"],
  },
]

export const education = {
  institution: "Staffordshire University",
  award: "Web Development BSc (Hons), 2:1",
  span: "2014 to 2017",
}

export const interests =
  "Music production, audio engineering, graphic and motion design, and branding, mostly for a band I play in."
