# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro. Confirmed by the user as a port target, replacing the incumbent Gatsby v2 / Node 13.12.0 build. The old stack is a constraint being removed, not preserved.

## Users

Primary: hiring managers and technical recruiters evaluating Alex Boffey for a software engineering role. They arrive from a LinkedIn profile, a CV link, or a direct send, usually with several other candidate tabs open, often on mobile, and usually giving the site well under a minute before deciding whether to keep reading or contact him.

Secondary (confirmed by existing content, not by stated priority): peer engineers landing on individual blog posts from search or a shared link.

## Product Purpose

A personal site at alexboffey.co.uk that makes a hiring decision-maker remember Alex and contact him. Two outcomes define success, in this order of the user's stated intent, both required:

1. **They remember him.** A distinctive impression that survives a week of closed tabs.
2. **They contact him.** Email, LinkedIn, or equivalent, treated as the obvious next step rather than a footnote.

The site itself is a work sample. Its execution counts as evidence, not only as the frame around the evidence.

## Positioning

Correct job title, for copy: **Senior Frontend Engineer II** at GEEIQ (since Aug 2025; Senior Frontend Engineer from Jun 2022). An earlier version of this record said "Senior Frontend Developer", which was wrong.

Alex is a **full stack software engineer**. He is deepest in the frontend, and design systems are a genuine specialism, but the site must present him as an engineer who works across the stack: backend services, infrastructure and databases are real parts of the job, evidenced by the API/service/database contributions and the Kubernetes, Fastify, Elasticsearch and AWS work on the CV.

**Revised 2026-08-06 on the user's instruction.** An earlier version of this record led with design systems and design engineering; the user judged that too design-heavy and asked to be presented as a full stack / software engineer. Design systems now sits as one strand of three rather than two of three. Do not re-weight the copy back toward design without the user asking.

**Revised 2026-08-10 on the user's instruction.** The frontend depth is now stated as **client-side architecture** rather than offset by breadth. The previous sentence ("deepest in the frontend, with real work in backend services...") treated frontend as a limitation being compensated for; the CV evidences the opposite. Client-side architecture means state, caching, data orchestration, build and release, which is what the 40+ component library across 296 files, the 130+ test Playwright suite with 6-way CI sharding, and the Ember-to-React rebuild at parity in six months actually are.

The full stack claim stands unchanged and still traces to the API/service/database contributions and the Kubernetes, Fastify, Elasticsearch and AWS work. This revision changed how the frontend half is framed, not what is claimed. Nothing new was asserted.

**Revised 2026-10-07.** The one-liner that drives every copy surface is now "Full stack engineer, deepest in client-side architecture." Set in `~/Documents/Obsidian Vault/ab/life/Job Search/Positioning and Talking Points.md`, propagated to `src/lib/site.ts`, `src/lib/cv.ts`, `src/pages/about.astro`, `src/components/Rails.astro`, and the three-strand summary. The three pillars from that doc are the strand labels on the site: client-side architecture (core), end-to-end delivery (fullstack, frontend heavy), AI engineering (on top). The old "Design systems" strand was folded into client-side architecture, where the Positioning doc already treats the design-system work as evidence. Design systems is still a real specialism, just not a headline alongside the two pillars that frame it.

Two things deliberately not on the site: the iceberg metaphor (a visual metaphor written out as prose reads as a pitch deck, and the site's job is to show rather than argue) and the traced-user-action walkthrough (good material, but it belongs in a writing post rather than in copy a recruiter skims).

## Operating Context

- Evaluated in a browser tab alongside competing candidates, frequently on a phone.
- Reached from LinkedIn, a CV, or a direct link, so it must stand alone without a referring pitch.
- Blog posts are also reached cold from search, detached from the homepage narrative.
- Deployed as a static site. Netlify today, with a planned migration to Cloudflare.

## Capabilities and Constraints

- Content is markdown on disk. No CMS, no API, no auth, no forms beyond a contact link.
- Existing content inventory: 8 published blog posts and 4 published work case studies, plus 1 unpublished blog draft and 2 unpublished work entries, under `src/content/{writing,work}/<slug>/index.md`.
- Frontmatter fields in use: `title`, `subtitle`, `date`, `tags`, `published`, and on work entries `featured_image` / `thumb`.
- 3D and heavy motion are explicitly wanted by the user. Because the primary user is often on mobile and time-poor, they carry a hard requirement: never block or delay the content and identity from being read, and always honour reduced-motion.
- **Confirmed scope: 3D is the spine of the site.** One persistent scene the whole site travels through, with sections as camera positions, rather than isolated set pieces. This is a user decision, made in full knowledge of the mobile and accessibility cost.
- **Confirmed proof strategy (revised 2026-08).** The CV is the primary evidence, supported by the 8 real blog posts and the older case studies. **The site's own engineering is explicitly NOT claimed as proof of Alex's ability:** the shader was AI-generated to his direction and he has stated he cannot build or maintain WebGL unaided, so the "This page is the portfolio" instrumentation section was removed rather than left as an unearned claim. The lattice remains as art direction. Do not reintroduce a claim that the site's build demonstrates his engineering skill.
- URL preservation was explicitly released. The current scheme (blog list at `/`, posts at `/<slug>`, `/work`, `/about`) may be restructured.

## Brand Commitments

- Name: Alex Boffey. Site: alexboffey.co.uk.
- Contact channels in use: alex@alexboffey.co.uk, linkedin.com/in/alexboffey, twitter.com/alexboffey.
- **Binding: the isometric-block logo motif** at `src/img/logo/logo.svg`. Five isometric parallelograms (the top, left, and right faces of cubes) arranged as a partially exploded axonometric block, in orange `#F59333` and grey `#CDCCCC`, on a 30 degree axonometric projection. The user pinned the motif and explicitly licensed going wild with it: the geometry and its axonometric logic must carry through the design, the specific five-face lockup need not. The orange is real brand equity and stays in the system.
- The user's phrasing for the desired direction was "modern, edgy and techy" with "flashy 3D animations", recorded verbatim as a brief input.
- **Ruled out by the user:** brutalist / Swiss poster grid treatments (huge Helvetica, hard rules, deliberately raw). Not ruled out but disallowed by craft calibration anyway: near-black plus one neon accent with glowing edges, and warm cream plus editorial serif, both being category defaults rather than decisions.

## Evidence on Hand

- Real technical writing, all authored by Alex: React 18 secondary roots, Jest window mocking, git subtree merging, SCSS reference, Magento 2 attributes and static blocks, IE10/IE11 CSS targeting, YouTube embed lazyloading. Range spans 2017 to 2024.
- Real project case studies with images: Sojourn, React Calculator, Sick Fits, Dang That's Delicious.
- **The CV, as of 2026-10.** Transcribed into `src/lib/cv.ts` from `~/Documents/Obsidian Vault/ab/life/CVs & Cover Letters/Alex Boffey CV October 2026 v2.md`. This is now the primary evidence and it supplies what was previously missing: 9 years of experience; full employment history (GEEIQ Jun 2022 to present, currently Senior Frontend Engineer II; OrgVue Oct 2018 to Jun 2022 across three titles; iWeb Solutions May 2017 to Oct 2018); Staffordshire University Web Development BSc (Hons) 2:1; and the commercial design-systems detail (a 40+ component library on shadcn/ui and Radix adopted across 296 files, two rebrands delivered through it, a 130+ test Playwright suite with 6-way CI sharding, an Ember-to-React platform rebuild at parity in 6 months, the Chart.js/D3/Nivo visualisation layer and its v2 RFC).
- **The phone number in that CV source is excluded from this site deliberately.** It belongs in a CV sent to a named recipient, not on a public page. Do not add it.
- **Still absent, must not be fabricated:** testimonials, named clients, revenue or business metrics, awards, open-source stats, and any claim of an NDA (the CV does not mention one; an earlier draft of the site invented it and it was removed).
- The user described the existing blog posts as demo content for the rebuild, with new content to be written afterwards. Treat them as real and publishable, but expect the content set to grow and change.

## Product Principles

1. **The site is the work sample.** Anything shipped here is evidence of engineering and design judgment, so nothing half-finished ships.
2. **Engineer first, frontend as the depth.** Never let the presentation flatten him into a frontend-only or visual-only candidate.
3. **Memorable beats tasteful-and-forgotten.** Given a choice between safe and distinctive, take distinctive; being one of five identical dark developer portfolios is the actual failure mode.
4. **Contact is never buried.** Every substantial surface leaves an obvious way to reach him.
5. **Spectacle never taxes the reader.** Motion and 3D are additive; the name, the positioning, and the writing must land on a mid-range phone regardless.

## Accessibility & Inclusion

No product-specific standard was established by the user. The 3D and motion ambition makes `prefers-reduced-motion` support and keyboard-reachable navigation non-negotiable regardless.
