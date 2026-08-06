/**
 * The CV, transcribed from the vault with nothing added. Both sources are copied
 * into `docs/cv-sources/` as provenance: the April 2026 CV is the primary, and the
 * 2022 archive supplies the OrgVue and iWeb detail that the 2026 compression
 * dropped (company context, the Gizmo ETL work, the Staffordshire sessions).
 *
 * Deliberately omitted from this file: the phone number on line 1 of the source.
 * It belongs on a CV sent to a named recipient, not on a public web page that
 * scrapers read. Email and LinkedIn already serve the contact job here.
 *
 * `detail: true` marks a bullet as depth rather than headline, which is what the
 * density control on the page toggles. Every bullet is real; the split is only
 * about how much a given reader wants at once.
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
  "Senior software engineer specialising in web application frontend development. Have led platform rebuilds, built design systems, and set engineering standards across teams. Comfortable working across the full stack, with direct contributions to backend services, infrastructure, and databases. Views AI as an amplifier: strong fundamentals and a well structured codebase let you get the most out of it and move faster."

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
        text: "Led the rebuild of the core platform from Ember.js to React, reaching feature parity within 6 months.",
      },
      {
        text: "Built an internal design system of 40+ components using shadcn/ui and Radix UI, adopted across 296 files, with full Storybook documentation. Delivered two company rebrands through it, proving its flexibility.",
      },
      {
        text: "Built and maintained the testing strategy across unit, integration, E2E (Playwright) and visual regression (Chromatic). The E2E suite grew to 130+ tests covering core user journeys, sharded across parallel CI workers via GitHub Actions.",
      },
      {
        text: "Built the platform's data visualisation layer using Chart.js, D3 and Nivo. Wrote an RFC for the v2 chart library, presented it to the CTO, EM and Architect, then planned the full project in Linear.",
      },
      {
        text: "Led the migration from Cypress to Playwright, introducing parallel execution and 6-way sharding in CI to keep test runs under 10 minutes.",
        detail: true,
      },
      {
        text: "Onboarded engineers from a team of ~20 into React best practices, the design system and testing patterns through pairing sessions.",
        detail: true,
      },
      {
        text: "Heavily involved in recruitment: interviewed engineers and product candidates, ran culture interviews, and designed technical tests and whiteboarding sessions.",
        detail: true,
      },
      {
        text: "Contributed beyond the frontend remit to API, service and database repositories. Established the frontend as a monorepo with DX standards including TypeScript strict mode, ESLint, Husky and CI/CD quality gates on every PR.",
        detail: true,
      },
      {
        text: "Integrated observability tooling including Sentry error tracking, Elastic APM and Web Vitals monitoring.",
        detail: true,
      },
      {
        text: "Early adopter of AI-assisted development: engineered the codebase with structured rules for Claude and Codex, set up git worktree workflows for parallel agents, and built automation scripts for PR creation, codebase analysis and Linear project setup.",
        detail: true,
      },
      {
        text: "Participated in an internal AI committee, helping non-engineering teams understand and adopt AI tools.",
        detail: true,
      },
      {
        text: "Ongoing contributor to nudge-agent, GEEIQ's internal engineering agent: given a Linear ticket labelled ai-eligible, it runs a Claude Code agent in a per-ticket Kubernetes Job that investigates, plans and opens a PR, with engineers re-entering at review.",
      },
      {
        text: "Shipped that agent's in-cluster Fastify webhook receiver (“switchbox”), which creates Kubernetes Jobs directly via ServiceAccount RBAC and replaced an external n8n and GitHub Actions dispatch chain. Added per-ticket deduplication so a burst of label events cannot fan out into duplicate Jobs, and constrained triggering to label-add events only.",
        detail: true,
      },
      {
        text: "Built the dual-trigger architecture on top of it: the Linear Agent OAuth path alongside the label webhook, with HMAC-verified webhooks and GraphQL session and activity writeback, documented with ADRs and sequence diagrams.",
        detail: true,
      },
      {
        text: "Built the agent's observability: a Kibana dashboard (KPI tiles, live runs, outcomes donut, completed runs log) over a structured trace envelope emitted by both the switchbox and the agent Jobs, plus a daily Slack standup of AI-handled tickets as a Kubernetes CronJob aggregating from Elasticsearch with Linear and GitHub enrichment.",
        detail: true,
      },
      {
        text: "Migrated the agent's MCP credentials into a dedicated AWS Secrets Manager group, synced into Kubernetes via External Secrets Operator.",
        detail: true,
      },
      {
        text: "Owned Linear release signalling for the frontend: the contract that decides when CI tells Linear a release shipped. Built a dedicated test harness reproducing production's job graph so the semantics could be broken safely, and pinned down the three properties that actually break it: full clone depth (a shallow clone silently computes the wrong commit set), signalling gated on deploy success rather than tests passing, and sync and complete being two ordered calls rather than one.",
      },
      {
        text: "Designed the preview pipeline that surfaces per-PR preview builds in Linear. Deliberately modelled a preview as a label plus a commented URL rather than as a release, because Linear releases cannot be deleted and a preview-as-release would outlive its own environment as a dead link; teardown removes the label on close or merge, and the ticket then flows into the beta release as normal.",
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
      {
        text: "Started on Gizmo, a JavaScript-like ETL tool, building and contributing to several small and mid-sized projects. The hard part was not the tool: knowledge was siloed, documentation was thin, and third-party resources like GitHub and Stack Overflow could not be used.",
        detail: true,
      },
      {
        text: "Ran sprint rituals, reviewed code, and onboarded developers hired through an external contracting agency as well as product owners and engineering managers. Assisted in hiring and interview processes.",
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
        text: "Built UIs across multiple ecommerce and marketing sites, with some CMS development, using Magento and WordPress.",
      },
      {
        text: "Helped run two design sessions with undergraduate web development and design students at Staffordshire University in September 2017, assisting lecturers in evaluating their work, and took part in a Q&A about working in tech.",
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
