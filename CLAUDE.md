# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # astro dev (localhost:4321)
npm run build    # astro build -> dist/
npm run preview  # serve the production build
npm run lint     # prettier --check + astro check
npm run fix      # prettier --write
npm test         # playwright, 20 smoke tests
npm run skills:link  # symlink .agents/skills into .claude/skills
```

**npm, not yarn.** The lockfile is `package-lock.json` and there is no `yarn.lock`. The scripts used to shell out to `yarn`, which broke `npm run lint` on any machine without yarn installed.

Node 22.12+ (`.nvmrc` pins 22.16.0). This is a hard floor, not a preference: Astro 7 declares `engines.node >= 22.12.0` and `astro check` refuses to run below it. Pinning 20.19.0 here is what broke CI.

Deployment: two hosts, one build, while DNS moves. After `verify` passes on master, `deploy-cloudflare` and `deploy-netlify` in `.github/workflows/ci.yml` ship the same `dist/` artifact in parallel. Netlify keeps alexboffey.co.uk until DNS moves; Cloudflare is checked at https://alexboffey.alexboffey5.workers.dev. Both deploy from CI rather than a Git connection, because Netlify's legacy Git integration lost read access when the repo went private and still serves the old Gatsby build until the Netlify job runs once.

Secrets: `CLOUDFLARE_ACCOUNT_ID` is set. Still needed: `CLOUDFLARE_API_TOKEN` (dashboard, "Edit Cloudflare Workers" template), `NETLIFY_AUTH_TOKEN` (Netlify user settings, personal access token) and `NETLIFY_SITE_ID` (site configuration, Site ID). A job with missing secrets skips itself with a notice, so the run stays green.

Cutover: delete the Netlify apex and www records in Cloudflare DNS, uncomment `routes` in `wrangler.jsonc`, push. Then remove `deploy-netlify` and `netlify.toml`.

Inline scripts are off (`assetsInlineLimit: 0` in `astro.config.mjs`) because the CSP is `script-src 'self'`; an inlined script is silently blocked.

CI is green as of `05c9391`. Two past causes of red: `.nvmrc` pinning Node below Astro 7's `>=22.12.0` floor (fails on setup), and the phone-number guard in the workflow catching the number in `docs/`.

Response headers live in `public/_headers` (copied into `dist/` by Astro and read by Workers). `netlify.toml` carries the same headers for Netlify until the cutover lands; keep the two in step.

## Architecture

Astro 5-era static site (Astro 7). Ported from Gatsby v2 in 2026-08; nothing Gatsby-shaped remains. Content is markdown on disk, no CMS.

**Zero UI framework ships to the browser.** The only client JS is the lattice engine, the CV controls, and Astro's ClientRouter. Keep it that way; there is no reason for this site to ship a framework runtime.

**The shader is art direction, not a claimed work sample.** It was AI-generated to Alex's direction and he has said he cannot maintain WebGL unaided, so the home page section that presented it as proof of his ability was removed. Do not reintroduce a claim that the engineering here demonstrates his skill. `docs/lattice.md` is the handover doc that makes the shader maintainable; keep it accurate when changing the shader.

**Content pipeline.** `src/content/{writing,work}/<slug>/index.md`, loaded by content collections in `src/content.config.ts`. Frontmatter keeps the shape the old Gatsby files used, so ported posts needed no edits: `title`, `subtitle`, `date`, `tags` (comma-separated string, normalised to an array in the schema), `published`. `published: false` never reaches a route, gated in `src/lib/entries.ts`. The `writing` collection sets `retainBody: true` because reading time is counted off the raw markdown.

Routes: `/` (CV), `/about/`, `/cover-letter/` (unlinked), 404. The `work` and `writing` collections still exist on disk but no route renders them.

**The lattice is the design.** `src/shaders/lattice.frag` raymarches an orthographic isometric block field; `src/scripts/lattice.ts` drives it against raw WebGL2, one fullscreen triangle, one draw call, no three.js.

The governing idea: an orthographic camera looking down the (1,1,1) diagonal of a cube grid produces exactly the projection in the logo mark, so the mark's three flat face values _are_ the shading model. Do not replace this with a perspective camera or a particle field; the brand motif is the geometry.

Things that will bite you in the shader:

- Empty cells collapse their box to a point (a valid SDF). Combined with `STEP_CLAMP` being below the minimum inter-block gap, this is what stops rays tunnelling through blocks. If you change `CELL` or the max block size, recheck that relationship.
- Every face needs the ambient floor. Without it, warped normals with no positive axis component render as black triangles punched in the field.
- The palette is read out of CSS custom properties by `tokenRgb()`, so `src/styles/tokens.css` is the single source of truth for colour in both the DOM and the GPU.

**Per-route scenes.** Each route names a station via the `scene` prop on `Root.astro`, which becomes `data-scene` on `<body>`; `SCENES` in `lattice.ts` maps it to density, block scale, heat, warmth and a position along the travel axis. The canvas is `transition:persist`, so a client-side navigation lerps between stations with a travel burst instead of tearing the scene down. Adding a route means adding a station.

Degradation is deliberate and should stay: no WebGL2 keeps the CSS ground, `prefers-reduced-motion` renders a single frame, coarse pointers and low core counts get fewer march steps and a lower render scale, and frames stop entirely when the tab is hidden or the canvas scrolls out of view.

**Styling** is plain CSS: `src/styles/tokens.css` (all design tokens) and `base.css` (reset, type, `.action`, `.section`, `.prose`), plus scoped `<style>` blocks per component. No CSS framework, no CSS-in-JS.

**The direction contract** is an HTML comment at the top of `<body>` in `src/layouts/Root.astro`, and it survives into the built output (`grep 3cf70a0a dist/index.html`). It records the committed visual world. Read it before making visual changes; `DESIGN.md` documents the built system.

## Content and truth

`PRODUCT.md` holds confirmed product truth and an explicit list of things that must not be fabricated. The site previously shipped invented commercial detail and it had to be cut, so: **no claim on a page unless it traces to `PRODUCT.md`, the CV markdown, or the markdown content.**

**One source of truth for the CV.** `docs/cv-sources/cv-2026-10.md` builds both the PDF download (`npm run cv`, run on `prebuild`) and the home page: `src/lib/cv.ts` parses it at build time and holds no CV copy of its own. To change the CV, edit the markdown only. The only per-site data in `cv.ts` is the stack chips, keyed by org name, and every chip must be named in the markdown. The parser throws on any line it does not recognise, so keep the existing shape (`### Org, Location (span)`, bold title lines with an optional `(span)`, an optional context paragraph, bold group headings, `- ` bullets). The smoke test counts the Experience bullets in the markdown and expects the page to show all of them. Copy that restates CV facts elsewhere (the strands in `site.ts`, `about.astro`, `docs/cover-letters/_generic.md`) is hand-written: when a CV fact changes, grep for it there too. The markdown was rewritten on 2026-10-15 and is now ahead of the vault copy (`~/Documents/Obsidian Vault/ab/career/CVs & Cover Letters/Alex Boffey CV October 2026 v2.md`). Earlier CVs in that folder plus `docs/cv-sources/cv-2022.md` and `docs/cv-sources/cv-2026-04.md` are kept as provenance only. The phone number in the vault source is deliberately excluded from the site and must stay excluded. `src/lib/site.ts` holds standing facts (name, positioning, contact channels) and the strand summaries so copy does not drift between routes.

The copy is written to the one-liner in `~/Documents/Obsidian Vault/ab/career/Job Search/Positioning and Talking Points.md`: "Product engineer with deep frontend roots." (changed from "Full stack engineer, deepest in client-side architecture." on 2026-10-08). That doc is the canonical positioning; `PRODUCT.md`, `cv.ts`, `site.ts`, the strand summaries and the sidebar rails all pull from it. Change the positioning there first, then propagate.

## Conventions

- Prettier: no semicolons, trailing commas. `prettier-plugin-astro` handles `.astro`.
- Two font families, self-hosted in `public/fonts` as latin-subset variable woff2: Anybody (display, driven on its **width** axis rather than shipping extra weights) and Archivo (text). Provenance is the two `@fontsource-variable` devDependencies.
- Favicon is a simplified single cube, not the five-parallelogram mark, which turns to mush at 16px.
- `npm run fix` before committing; `astro check` must be clean.
