/**
 * Standing facts, in one place, so copy does not drift between routes.
 * Everything here is confirmed in PRODUCT.md. Nothing here is a claim that
 * cannot be checked.
 */

export const site = {
  name: "Alex Boffey",
  surname: "Boffey",
  url: "https://alexboffey.co.uk",
  role: "Senior Frontend Engineer II",
  employer: "GEEIQ",
  location: "London",
  email: "alex@alexboffey.co.uk",
  years: 9,
  positioning: "Full stack engineer, deepest in client-side architecture.",
  taglineBody:
    "I build frontends that are fast to ship on, for people and for AI agents, and I own features end to end, through the API and database.",
  description:
    "Alex Boffey is a full stack engineer in London, deepest in client-side architecture, with nine years across frontend, backend services and infrastructure. He builds the codebase so engineers and AI agents can both ship from it.",
} as const

export const social = {
  linkedin: "https://www.linkedin.com/in/alexboffey/",
  github: "https://github.com/alexboffey",
  twitter: "https://www.twitter.com/alexboffey",
} as const

/**
 * The three strands of the practice, aligned to the pillars in the
 * "Positioning and Talking Points" vault note (2026-10-07): client-side
 * architecture as the core, end-to-end delivery as the breadth, AI engineering
 * on top of both.
 *
 * The first strand was called "Product engineering" until 2026-08-10 and
 * "Design systems" rode as the third until 2026-10-07; design-system work now
 * sits inside the client-side architecture strand, since the Positioning doc
 * treats it as evidence under that pillar rather than its own headline.
 */
export const strands = [
  {
    name: "Client-side architecture",
    summary:
      "Led the Ember.js to React port at feature parity in 6 months, then the work that keeps it running: rendering strategy, state and cache, build pipelines, performance budgets, a design system that absorbs rebrands (40+ components across 296 files), and a Playwright suite under 10 minutes on 6-way sharded CI.",
  },
  {
    name: "End-to-end delivery",
    summary:
      "Past the frontend remit and into the API, service and database repositories. Node and Fastify services, Postgres, GraphQL, Kubernetes jobs and RBAC, Elasticsearch, secrets management, and the CI/CD that ships all of it.",
  },
  {
    name: "AI engineering",
    summary:
      "On top of the work above, not instead. Structured rules in the repo for Claude and Codex, custom agent skills, MCP integrations, git worktrees for parallel agents, and a harness around them. nudge-agent, GEEIQ's autonomous coding agent, dispatches headless Claude sessions to pick up Linear tickets and ship PRs; a Kibana dashboard over its trace envelope is how you see what each run cost and whether it worked.",
  },
] as const
