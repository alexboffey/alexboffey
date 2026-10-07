/**
 * The CV, transcribed from the vault with nothing added. The current source is
 * `docs/cv-sources/cv-2026-10.md` (October 2026); the April 2026 and 2022
 * archive files alongside it are kept as provenance for anything the newer
 * compressions dropped.
 *
 * Deliberately omitted from this file: the phone number on line 1 of the source.
 * It belongs on a CV sent to a named recipient, not on a public web page that
 * scrapers read. Email and LinkedIn already serve the contact job here.
 *
 * `detail: true` marks a bullet as depth rather than headline, which is what the
 * density control on the page toggles. The source markdown is flat; the split
 * here is editorial and preserved across source updates. Every bullet is real.
 */

export interface Bullet {
  text: string
  detail?: boolean
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
  bullets: Bullet[]
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

export const summary =
  "Full stack engineer, deepest in client-side architecture, with 9 years across frontend, backend services and infrastructure. Led the Ember.js to React port at feature parity in 6 months. Built the design system (40+ components across 296 files, two rebrands shipped through it) and the Playwright suite (130+ tests, 6-way sharded CI under 10 minutes). Also ship through the API, services, Postgres and Kubernetes jobs when a feature needs it. The codebase is the context AI agents work within; strict types, tests and CI gates are what make their output reviewable at a glance."

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
      "GEEIQ is a data and analytics platform for brands operating in gaming and virtual worlds. Joined as the company was transitioning from its original Ember.js application to a modern React stack.",
    bullets: [
      {
        text: "Led the Ember.js to React port at feature parity in 6 months.",
      },
      {
        text: "Built the design system: 40+ components on shadcn/ui and Radix UI, adopted across 296 files, Storybook docs. Two company rebrands shipped through it.",
      },
      {
        text: "Built and maintain the test suite: unit, integration, Playwright E2E (130+ tests on core journeys), Chromatic visual regression. Moved from Cypress to Playwright and sharded CI 6 ways; the suite stays under 10 minutes.",
      },
      {
        text: "Set the frontend practice: TypeScript strict, ESLint, Husky, squash-merge releases, CI gates on every PR. Monorepo so the gates apply once.",
      },
      {
        text: "Ongoing contributor to nudge-agent, GEEIQ's autonomous coding agent that picks up Linear tickets and ships PRs.",
      },
      {
        text: "Also work in the API, service and database repos (Prisma, tRPC, Postgres). Recent: Zod-validated API boundaries with deduped Sentry reporting.",
        detail: true,
      },
      {
        text: "Built the data visualisation layer on Chart.js, D3 and Nivo. Wrote the RFC for the v2 chart library, presented it to the CTO, EM and Architect, then planned the project in Linear.",
        detail: true,
      },
      {
        text: "Wired up observability: Sentry, Elastic APM, Web Vitals.",
        detail: true,
      },
      {
        text: "Shipped switchbox, an in-cluster Fastify webhook receiver that creates Kubernetes Jobs via ServiceAccount RBAC. Replaced an external n8n + GitHub Actions dispatch chain. Added the Linear Agent OAuth trigger path with HMAC-verified webhook and GraphQL session/activity writeback.",
        detail: true,
      },
      {
        text: "Built a daily Slack standup of AI-handled tickets as a Kubernetes CronJob aggregating from Elasticsearch with Linear and GitHub enrichment.",
        detail: true,
      },
      {
        text: "Built the agent's Kibana dashboard (KPI tiles, live runs, outcomes donut, completed runs log) on top of a structured trace envelope the switchbox and the agent Jobs both emit.",
        detail: true,
      },
      {
        text: "Moved the agent's MCP credentials into an AWS Secrets Manager group, synced to Kubernetes via External Secrets Operator.",
        detail: true,
      },
      {
        text: "Context engineering across the GEEIQ codebase: structured rules for Claude and Codex, git worktrees for parallel agents, custom agent skills, MCP integrations. The design system, state patterns, strict types, tests and CI gates are the context those sessions work within.",
        detail: true,
      },
      {
        text: "Built /visual-qa-sweep, a Claude Code skill that screenshots every main app page on a test build vs baseline and posts a draggable comparison. Used it to clear a shared component change across 23 routes before merge.",
        detail: true,
      },
      {
        text: "Ran a sprint delivery day with the agent in parallel: one git worktree per Linear ticket, personal verification before push. Three tickets In Review with deploy previews by end of day.",
        detail: true,
      },
      {
        text: "On the internal AI committee, helping non-engineering teams pick up AI tools.",
        detail: true,
      },
      {
        text: "Onboarded engineers into React, the design system and the testing patterns. Also in recruitment: ran engineering and product interviews, culture interviews, and designed the technical test and whiteboarding sessions.",
        detail: true,
      },
    ],
    stack: [
      "React",
      "TypeScript",
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
    context:
      "OrgVue is a SaaS business in org design, HR tooling and workforce planning. During my time there it moved from bespoke consulting services to a recurring-revenue SaaS model. Aside from internal tooling, I worked on the applications for administering and taking surveys.",
    bullets: [
      {
        text: "Led frontend development and technical specification of a job description generation application while mentoring a junior engineer.",
      },
      {
        text: "Built a dynamic branding system for surveys with a preview feature rendering one application inside another.",
      },
      {
        text: "Developed a Node CLI tool for creating and updating data store schemas used in survey applications, integrated into the CI pipeline.",
        detail: true,
      },
      {
        text: "Built a data migration tool in Node for transitioning legacy data structures to a new schema via REST API.",
        detail: true,
      },
      {
        text: "Optimised performance bottlenecks that surfaced when working with large datasets.",
        detail: true,
      },
      {
        text: "Migrated an application to a new data service, refactoring downstream changes across the entire codebase.",
        detail: true,
      },
      {
        text: "Consolidated multiple existing repositories into a monorepo to improve developer experience.",
        detail: true,
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
    context:
      "A small agency building ecommerce for clients across B2C and B2B markets, on Magento and WordPress. Mostly implementing UI designs in markup, styling, JavaScript and PHP, which is where the CSS came from.",
    bullets: [
      {
        text: "Mostly built UIs across multiple ecommerce and marketing sites, with some CMS development, using Magento and WordPress.",
      },
      {
        text: "Assisted university lecturers in running design sessions and evaluating undergraduate students' work.",
        detail: true,
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
  "Next.js",
  "Svelte",
  "Prisma",
  "tRPC",
  "PostgreSQL",
  "SQL",
  "Python",
  "Flask",
  "Express",
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
  "Music production, audio engineering, graphic design, motion design and branding, developed through coordinating and producing creative work for a band project."
