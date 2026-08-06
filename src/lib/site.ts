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
  positioning:
    "Full stack software engineer. Deepest in the frontend, with real work in backend services, infrastructure and databases.",
  description:
    "Alex Boffey is a full stack software engineer in London: nine years across frontend, backend services and infrastructure.",
} as const

export const social = {
  linkedin: "https://www.linkedin.com/in/alexboffey/",
  github: "https://github.com/alexboffey",
  twitter: "https://www.twitter.com/alexboffey",
} as const

/**
 * The three strands of the practice, weighted the way the CV actually is:
 * product engineering first, backend and infrastructure second, design systems
 * as the specialism rather than the headline.
 */
export const strands = [
  {
    name: "Product engineering",
    summary:
      "Shipping production software, not prototypes. Leading a platform rebuild to feature parity, then the unglamorous work that keeps it habitable: rendering, state, build pipelines, performance budgets, and a testing strategy that someone will still trust in a year.",
  },
  {
    name: "Backend & infrastructure",
    summary:
      "Past the frontend remit and into the API, service and database repositories. Node and Fastify services, Postgres, GraphQL, Kubernetes jobs and RBAC, Elasticsearch, secrets management, and the CI/CD that ships all of it.",
  },
  {
    name: "Design systems",
    summary:
      "The specialism rather than the whole job. A component library and the rules around it: tokens, variants, and accessibility built into the primitive rather than bolted onto each feature. The interesting problems are the ones about change over time.",
  },
] as const
