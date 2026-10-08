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
   * What was actually used in this role, rather than a detached keyword list.
   * Only technologies evidenced by this position's own bullets or by the source
   * CV's account of that period appear here; anything that could not be tied to
   * a named employer lives in `unattributedStack` instead of being guessed at.
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
 * The Profile paragraph from the October 2026 v3 draft. Replaces the three
 * labelled pillars that used to sit under the hero tagline, so the same
 * elevator pitch is on the site, in the PDF and in the markdown.
 */
export const profile =
  "Full stack engineer with 9 years' experience, deepest in client-side architecture: design systems, state and data orchestration, testing and CI. Led the rebuild of GEEIQ's analytics platform in React and built the design system and test suite it runs on. Also work in the API, Postgres and the Kubernetes services behind the frontend, and structure codebases so AI agents ship consistent, tested code. Looking for a frontend or product engineering role owning features end to end."

export const positions: Position[] = [
  {
    org: "GEEIQ",
    location: "London, UK",
    span: "Jun 2022 – Present",
    roles: [
      { title: "Senior Frontend Engineer II", span: "Aug 2025 – Present" },
      { title: "Senior Frontend Engineer", span: "Jun 2022 – Aug 2025" },
    ],
    context:
      "Data and analytics platform used by 20 to 30 brands in gaming and virtual worlds, each with multiple users. Joined as the company moved from its original Ember.js application to React.",
    groups: [
      {
        heading: "Platform and architecture",
        bullets: [
          {
            text: "Led a team of 4 rebuilding the primary client-facing application in React, reaching feature parity in 6 months.",
          },
          {
            text: "Built the design system: 40+ components on Radix UI and shadcn/ui, adopted across 296 files and documented in Storybook. Shipped two company rebrands through it, each implemented within a week.",
          },
          {
            text: "Set the frontend practice: monorepo, TypeScript strict mode, ESLint, pre-commit hooks and CI gates on every PR.",
          },
          {
            text: "Built the data visualisation layer on D3, Chart.js and Nivo, and wrote the RFC for the v2 chart library.",
          },
          {
            text: "Led the component build for Dashboard Views: rebuilt the core Card component across 67 call sites with no breaking changes, made Tabs fully keyboard accessible across 51 navigation items, and built a drag-and-resize widget grid with keyboard support.",
          },
          {
            text: "Added Zod-validated API boundaries with deduplicated Sentry reporting, alongside Elastic APM and Web Vitals monitoring.",
          },
        ],
      },
      {
        heading: "Testing and quality",
        bullets: [
          {
            text: "Built and maintain the test suite across unit, integration, Playwright E2E (130+ tests on core journeys) and Chromatic visual regression.",
          },
          {
            text: "Moved from Cypress to Playwright and sharded CI 6 ways, cutting full test runs from 15 to 20 minutes down to 5 to 10.",
          },
        ],
      },
      {
        heading: "AI engineering and fullstack",
        bullets: [
          {
            text: "Context engineering across the codebase: rules for Claude and Codex, custom agent skills, MCP integrations and git worktrees for parallel agents. Ran a sprint's remaining tickets as a parallel agent loop, getting 3 into review with previews in one day.",
          },
          {
            text: "Built custom Claude Code skills merged into the frontend repo for the whole team to aid the dev cycle: /visual-qa-sweep (pre-merge screenshot QA across every main app page vs baseline), /check-and-fix-sentry-errors (automated production error triage with a PR per fix) and /prefer-semantic-tokens (design-token migration sweep).",
          },
          {
            text: "Core contributor to nudge-agent, GEEIQ's autonomous coding agent that picks up Linear tickets and ships PRs. Built the in-cluster Fastify service that dispatches agent runs as Kubernetes Jobs, replacing an external n8n and GitHub Actions chain.",
          },
          {
            text: "Added the agent's Linear integration (OAuth, signed webhooks), a daily Slack standup of AI-handled tickets from Elasticsearch, and a Kibana dashboard tracking runs and outcomes.",
          },
          {
            text: "Work in the Next.js admin tool and the API, service and database repos (Prisma, tRPC, PostgreSQL).",
          },
        ],
      },
      {
        heading: "Leadership",
        bullets: [
          {
            text: "Ran 10+ engineering, product and culture interviews, designed the technical test and whiteboarding sessions, and onboarded engineers into React, the design system and testing.",
          },
          {
            text: "On the AI committee, helping non-engineering teams adopt AI tools.",
          },
        ],
      },
    ],
    stack: [
      "React",
      "TypeScript",
      "Next.js",
      "Tailwind CSS",
      "shadcn/ui",
      "Radix UI",
      "Storybook",
      "TanStack Query",
      "Zustand",
      "React Hook Form",
      "Zod",
      "React Router",
      "Chart.js",
      "D3",
      "Nivo",
      "Playwright",
      "Cypress",
      "Vitest",
      "Jest",
      "React Testing Library",
      "MSW",
      "Chromatic",
      "tRPC",
      "Prisma",
      "GraphQL",
      "Node.js",
      "Fastify",
      "Kubernetes",
      "Docker",
      "Elasticsearch",
      "AWS Secrets Manager",
      "GitHub Actions",
      "Sentry",
      "Elastic APM",
      "Web Vitals",
      "Kibana",
      "Claude",
      "Codex",
      "MCP",
      "Linear",
      "Figma",
      "Monorepos",
      "pnpm",
      "Vite",
      "ESLint",
      "Prettier",
      "Biome",
      "Husky",
      "Accessibility",
    ],
  },
  {
    org: "OrgVue",
    location: "London, UK",
    span: "Oct 2018 – Jun 2022",
    roles: [
      { title: "Senior Software Engineer", span: "Jun 2021 – Jun 2022" },
      { title: "Software Developer", span: "Apr 2019 – Jun 2021" },
      { title: "Junior Developer", span: "Oct 2018 – Apr 2019" },
    ],
    groups: [
      {
        bullets: [
          {
            text: "Led frontend development and technical specification of a job description generation application, mentoring a junior engineer.",
          },
          {
            text: "Consolidated multiple repositories into a monorepo to improve developer experience.",
          },
          {
            text: "Built Node tooling: a CLI for creating and updating survey data store schemas, run in CI, and a tool migrating legacy data to a new schema via REST API.",
          },
          {
            text: "Built a dynamic branding system for surveys, with a live preview rendering one application inside another.",
          },
          {
            text: "Fixed performance bottlenecks in large dataset handling and migrated an application to a new data service across the codebase.",
          },
        ],
      },
    ],
    stack: [
      "React",
      "TypeScript",
      "Next.js",
      "Redux",
      "Apollo",
      "GraphQL",
      "Node.js",
      "REST APIs",
      "Cypress",
      "Jest",
      "React Testing Library",
      "Styled Components",
      "Monorepos",
      "Azure Pipelines",
      "Scrum",
    ],
  },
  {
    org: "iWeb Solutions",
    location: "Stafford, UK",
    span: "May 2017 – Oct 2018",
    roles: [{ title: "Front End Developer", span: "May 2017 – Oct 2018" }],
    groups: [
      {
        bullets: [
          {
            text: "Built UIs for ecommerce and marketing sites on Magento and WordPress.",
          },
        ],
      },
    ],
    stack: ["HTML", "CSS", "JavaScript", "Magento", "WordPress", "PHP"],
  },
]

/**
 * The remainder.
 *
 * Real skills from the source CV that its account does not tie to a named
 * employer. They sit here as one short line rather than being distributed across
 * positions on a guess, because putting a technology under an employer is a
 * claim about that employer's codebase.
 */
export const unattributedStack = [
  "Svelte",
  "Express",
  "PostgreSQL",
  "SQL",
  "Python",
  "Flask",
  "Firebase",
  "Cloudflare Workers",
  "AWS S3",
  "Webpack",
]

export const education = {
  institution: "Staffordshire University",
  award: "Web Development BSc (Hons), 2:1",
  span: "2014 – 2017",
}

export const interests =
  "Music production, audio engineering, graphic design, motion design and branding, developed producing creative work for a band project."
