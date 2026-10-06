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
  positioning: "Full stack engineer, frontend-deep.",
  description:
    "Alex Boffey is a full stack engineer in London, frontend-deep, with nine years across frontend, backend services and infrastructure.",
} as const

export const social = {
  linkedin: "https://www.linkedin.com/in/alexboffey/",
  github: "https://github.com/alexboffey",
  twitter: "https://www.twitter.com/alexboffey",
} as const

/**
 * The three strands of the practice, weighted the way the CV actually is:
 * client-side architecture first, backend and infrastructure second, design
 * systems as the specialism rather than the headline.
 *
 * The first strand was called "Product engineering" until 2026-08-10. The label
 * was vague while its summary was already describing systems work, so the
 * heading now claims what the evidence underneath it supports.
 */
export const strands = [
  {
    name: "Client-side architecture",
    summary:
      "Leading a platform rebuild to feature parity, then the unglamorous work that keeps it habitable: rendering strategy, state and cache, build pipelines, performance budgets, and a testing strategy that someone will still trust in a year.",
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
