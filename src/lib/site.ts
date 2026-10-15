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
  description:
    "Alex Boffey is a product engineer in London with nine years' experience. He owns features end to end, from the problem through the API and data model to the UI, and his deepest experience is on the frontend.",
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
      "I take a feature from the problem to production, and that usually means going past the frontend into the API, service and database repos. At GEEIQ that's been Postgres through Prisma and tRPC, Node and Fastify services, Kubernetes jobs, Elasticsearch, and the CI/CD that ships it all.",
  },
  {
    name: "Client-side architecture",
    summary:
      "Where I'm deepest, and the reason I can move quickly everywhere else. I led a team of 4 moving GEEIQ's main app from Ember.js to React, and the old app was gone in 6 months. Since then I've kept it healthy: the design system (40+ components across 296 files, through two rebrands), state and caching patterns, the build pipeline, and a Playwright suite that runs in under 10 minutes across 6 CI shards.",
  },
  {
    name: "AI engineering",
    summary:
      "This sits on top of the other two. An agent copies whatever patterns it finds, so I set our codebase up for it: rules for Claude and Codex, custom skills, MCP integrations (Figma included, so component work starts from the design files) and git worktrees for running agents in parallel. I'm also a core contributor to GEEIQ's autonomous coding agent, which picks up Linear tickets and opens PRs, and I built the Kibana dashboard that tracks every run.",
  },
] as const
