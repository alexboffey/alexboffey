# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn dev      # astro dev (localhost:4321)
yarn build    # astro build -> dist/
yarn preview  # serve the production build
yarn lint     # prettier --check + astro check
yarn fix      # prettier --write
```

Node 20.19+ (`.nvmrc`), npm. No test suite exists.

Deployment: Netlify today, Cloudflare planned (see `TODO.md`).

## Architecture

Astro 5-era static site (Astro 7). Ported from Gatsby v2 in 2026-08; nothing Gatsby-shaped remains. Content is markdown on disk, no CMS.

**Zero UI framework ships to the browser.** The only client JS is the lattice engine, the CV controls, and Astro's ClientRouter. Keep it that way; there is no reason for this site to ship a framework runtime.

**The shader is art direction, not a claimed work sample.** It was AI-generated to Alex's direction and he has said he cannot maintain WebGL unaided, so the home page section that presented it as proof of his ability was removed. Do not reintroduce a claim that the engineering here demonstrates his skill. `docs/lattice.md` is the handover doc that makes the shader maintainable; keep it accurate when changing the shader.

**Content pipeline.** `src/content/{writing,work}/<slug>/index.md`, loaded by content collections in `src/content.config.ts`. Frontmatter keeps the shape the old Gatsby files used, so ported posts needed no edits: `title`, `subtitle`, `date`, `tags` (comma-separated string, normalised to an array in the schema), `published`. `published: false` never reaches a route, gated in `src/lib/entries.ts`. The `writing` collection sets `retainBody: true` because reading time is counted off the raw markdown.

Routes: `/` (portal), `/cv/`, `/work/`, `/work/<slug>/`, `/writing/`, `/writing/<slug>/`, `/about/`, 404. Detail pages use `src/layouts/Reading.astro` (Read mode) rather than `Root.astro` directly.

**The lattice is the design.** `src/shaders/lattice.frag` raymarches an orthographic isometric block field; `src/scripts/lattice.ts` drives it against raw WebGL2, one fullscreen triangle, one draw call, no three.js.

The governing idea: an orthographic camera looking down the (1,1,1) diagonal of a cube grid produces exactly the projection in the logo mark, so the mark's three flat face values *are* the shading model. Do not replace this with a perspective camera or a particle field; the brand motif is the geometry.

Things that will bite you in the shader:
- Empty cells collapse their box to a point (a valid SDF). Combined with `STEP_CLAMP` being below the minimum inter-block gap, this is what stops rays tunnelling through blocks. If you change `CELL` or the max block size, recheck that relationship.
- Every face needs the ambient floor. Without it, warped normals with no positive axis component render as black triangles punched in the field.
- The palette is read out of CSS custom properties by `tokenRgb()`, so `src/styles/tokens.css` is the single source of truth for colour in both the DOM and the GPU.

**Per-route scenes.** Each route names a station via the `scene` prop on `Root.astro`, which becomes `data-scene` on `<body>`; `SCENES` in `lattice.ts` maps it to density, block scale, heat, warmth and a position along the travel axis. The canvas is `transition:persist`, so a client-side navigation lerps between stations with a travel burst instead of tearing the scene down. Adding a route means adding a station.

Degradation is deliberate and should stay: no WebGL2 keeps the CSS ground, `prefers-reduced-motion` renders a single frame, coarse pointers and low core counts get fewer march steps and a lower render scale, and frames stop entirely when the tab is hidden or the canvas scrolls out of view.

**Styling** is plain CSS: `src/styles/tokens.css` (all design tokens) and `base.css` (reset, type, `.action`, `.section`, `.prose`), plus scoped `<style>` blocks per component. No CSS framework, no CSS-in-JS.

**The direction contract** is an HTML comment at the top of `<body>` in `src/layouts/Root.astro`, and it survives into the built output (`grep 3cf70a0a dist/index.html`). It records the committed visual world. Read it before making visual changes; `DESIGN.md` documents the built system.

## Content and truth

`PRODUCT.md` holds confirmed product truth and an explicit list of things that must not be fabricated. The site previously shipped invented commercial detail and it had to be cut, so: **no claim on a page unless it traces to `PRODUCT.md`, `src/lib/cv.ts`, or the markdown content.**

`src/lib/cv.ts` is transcribed from `~/Documents/Obsidian Vault/ab/life/CVs & Cover Letters/Alex Boffey CV April 2026.md`. The phone number in that source is deliberately excluded and must stay excluded. `src/lib/site.ts` holds standing facts (title, employer, contact channels) so copy does not drift between routes.

## Conventions

- Prettier: no semicolons, trailing commas. `prettier-plugin-astro` handles `.astro`.
- Two font families, self-hosted in `public/fonts` as latin-subset variable woff2: Anybody (display, driven on its **width** axis rather than shipping extra weights) and Archivo (text). Provenance is the two `@fontsource-variable` devDependencies.
- Favicon is a simplified single cube, not the five-parallelogram mark, which turns to mush at 16px.
- `yarn fix` before committing; `astro check` must be clean.
