---
version: 2026-10-09
source: vault/CVs & Cover Letters/Alex Boffey Cover Letter Template October 2026.md
---

# Generic cover letter

Source of truth for the repo. Mirrors the vault template so tailoring in the
repo and tailoring in the vault land the same letter. Change this file first,
then copy to the vault, not the other way round.

Rules:

- Under 350 words.
- Only the bracketed bits change per application.
- Opening and the "why them" line must be specific to the company.
- Never mention mid level, salary or the redundancy. Those are for a call.
- For frontend roles, swap paragraph 3 for the frontend version in Swap-ins.
- No em dashes, no en dashes, anywhere.
- No internal project names (nudge-agent, feature codenames). Describe the work by what it does. Company names (GEEIQ, OrgVue) and public tech (React, Prisma, Kubernetes, Claude Code) are fine.
- Short sentences. Plain words. Concrete nouns. No "passionate about", "excited to", "robust", "seamless", "leverage", "comprehensive".

## The letter

# Alex Boffey

alex@alexboffey.co.uk · +44 (0) 7850 260 974 · alexboffey.co.uk

[DATE]

Hi [NAME / the [COMPANY] team],

I'm applying for the [ROLE] role at [COMPANY]. [ONE SPECIFIC REASON. Something about the product, how the team works, or a line from the job description that matches owning features end to end. One or two sentences, no flattery.]

I've spent nine years building web products, most recently as a Senior Frontend Engineer at GEEIQ, an analytics platform for brands in gaming. I joined as the company moved off Ember.js. I led a team of four rebuilding the main client app in React, hitting feature parity in six months. I built the design system it runs on (40+ components across 296 files, two rebrands each shipped in a week) and the test setup around it (130+ Playwright tests sharded six ways in CI).

Over the last 18 months my work moved across the stack. Schema and API changes in Postgres through Prisma and tRPC. A Fastify service that runs our autonomous coding agent as Kubernetes jobs off signed webhooks, with a Kibana dashboard tracking each run. I also set the codebase up for the agents themselves (rules, custom skills, MCP integrations), so their output follows the same patterns and passes the same CI as the team's.

That's the work I want more of. I'm looking for a product engineering role where I own features from the problem through the API and data model to the UI, with frontend as my strongest side. [WHY IT FITS HERE. One sentence linking that to something real about the role or team.]

My CV is attached and there's more at alexboffey.co.uk. I'm available [now / from DATE] and happy to jump on a call whenever suits.

Thanks,
Alex

## Swap-ins

**Frontend version of paragraph 3** (frontend and design systems roles):

> I care about the parts of the frontend that make a team faster. A design system that absorbs a rebrand in a week. Clear state patterns (TanStack Query for server state, Zustand for client state, React Hook Form with Zod for forms). A test suite people trust. I've also set the codebase up for AI agents (rules, custom skills, MCP integrations) so their output follows the same patterns and passes the same CI. Outside the frontend I've worked in the API and Postgres through Prisma and tRPC, and built the service that runs our coding agent as Kubernetes jobs.

**Data viz roles**, add to paragraph 2:

> I built the platform's data visualisation layer on D3, Chart.js and Nivo, and wrote the RFC for the next chart library.

**AI tooling roles**, add to paragraph 3:

> I've built custom Claude Code skills that the whole team uses, including pre-merge visual QA across the main app and automated Sentry triage that opens a PR per fix.

## Example openings

Specificity level, not text to reuse. Write one per company.

- "I've used [PRODUCT] for [WHAT] and [SPECIFIC THING] is the kind of feature I'd want to own end to end."
- "Your job description says product engineers [LINE FROM JD]. That's the part of the job I've enjoyed most at GEEIQ."
- "I read [BLOG POST / TALK] about how your team [THING], and it's close to how I've been setting up codebases for AI agents."
