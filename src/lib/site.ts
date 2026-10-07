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
  description:
    "Alex Boffey is a full stack engineer in London, deepest in client-side architecture, with nine years across frontend, backend services and infrastructure. Treats a well-structured codebase as the context AI agents work within.",
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
      "Leading a platform rebuild to feature parity, then the unglamorous work that keeps it habitable: rendering strategy, state and cache, build pipelines, performance budgets, a design system that absorbs rebrands, and a testing strategy someone will still trust in a year.",
  },
  {
    name: "End-to-end delivery",
    summary:
      "Past the frontend remit and into the API, service and database repositories. Node and Fastify services, Postgres, GraphQL, Kubernetes jobs and RBAC, Elasticsearch, secrets management, and the CI/CD that ships all of it.",
  },
  {
    name: "AI engineering",
    summary:
      "On top of the work above, not instead. Context engineering across the codebase so agents produce consistent output; harness design and observability around them; custom agent skills and MCP integrations. nudge-agent, GEEIQ's autonomous coding agent, dispatches headless Claude sessions to pick up Linear tickets and ship PRs, with a Kibana dashboard over the trace envelope.",
  },
] as const
