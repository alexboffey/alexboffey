/**
 * Standing facts, in one place, so copy does not drift between routes.
 * Everything here is confirmed in PRODUCT.md. Nothing here is a claim that
 * cannot be checked.
 */

export const site = {
  name: "Alex Boffey",
  surname: "Boffey",
  url: "https://alexboffey.co.uk",
  role: "Senior Frontend Engineer",
  employer: "GEEIQ",
  location: "London",
  email: "alex@alexboffey.co.uk",
  years: 9,
  positioning: "Product engineer, with deep frontend roots.",
  taglineBody:
    "I own features end to end, from working out the problem to the API, the data model and the UI. I also set up codebases so AI agents ship work that's consistent and tested.",
  description:
    "Alex Boffey is a product engineer in London with nine years' experience. He's strongest on the frontend and owns features end to end, through the API, the database and the services behind them.",
} as const

export const social = {
  linkedin: "https://www.linkedin.com/in/alexboffey/",
  github: "https://github.com/alexboffey",
  twitter: "https://www.twitter.com/alexboffey",
} as const

/**
 * The three strands of the practice, aligned to the pillars in the
 * "Positioning and Talking Points" vault note. Since 2026-10-08 end-to-end
 * delivery leads (the product engineer framing), client-side architecture is
 * the depth, and AI engineering sits on top of both.
 *
 * The first strand was called "Product engineering" until 2026-08-10 and
 * "Design systems" rode as the third until 2026-10-07; design-system work now
 * sits inside the client-side architecture strand, since the Positioning doc
 * treats it as evidence under that pillar rather than its own headline.
 */
export const strands = [
  {
    name: "End-to-end delivery",
    summary:
      "I follow a feature past the frontend into the API, service and database repos. At GEEIQ that meant Postgres through Prisma and tRPC, Node and Fastify services, GraphQL, Kubernetes jobs and RBAC, Elasticsearch, secrets management and the CI/CD that ships it.",
  },
  {
    name: "Client-side architecture",
    summary:
      "Where I'm deepest. I led the rebuild of GEEIQ's main client app in React, reaching feature parity in 6 months, then kept it healthy: state and cache, build pipelines, performance budgets, a design system that has carried two rebrands (40+ components across 296 files), and a Playwright suite that runs in under 10 minutes on 6-way sharded CI.",
  },
  {
    name: "AI engineering",
    summary:
      "This sits on top of the other two. The repo has rules for Claude and Codex, custom agent skills, MCP integrations (Figma included, so component work starts from the design source rather than screenshots) and git worktrees for running agents in parallel. I also worked on nudge-agent, GEEIQ's autonomous coding agent, which picks up Linear tickets and ships PRs. A Kibana dashboard over its traces shows what each run cost and whether it worked.",
  },
] as const
