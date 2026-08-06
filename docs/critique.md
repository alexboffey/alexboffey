# Codebase critique

Written 2026-08-06, after the Gatsby v2 → Astro 7 rebuild. Everything below is
measured against this repository, not inferred.

## Measured state

| Check | Result | Budget (your rules) | Verdict |
|---|---|---|---|
| Lighthouse accessibility (mobile) | **100**, 0 failed audits | n/a | pass |
| Lighthouse best practices | **100** | n/a | pass |
| Lighthouse SEO | **100** | n/a | pass |
| LCP | 75 ms local, 4 ms TTFB, 72 ms render delay | < 2.5 s | pass with room |
| CLS | **0.00** | < 0.1 | pass |
| JS shipped | 27 KB uncompressed (ClientRouter 16 KB + lattice 11 KB) | < 80 KB microsite | pass |
| Home page HTML | 9.5 KB gzipped, CSS fully inlined, zero CSS requests | n/a | pass |
| Webfont | 89.7 KB, two latin-subset variable faces, preloaded | n/a | acceptable, see F4 |
| `astro check` | 0 errors / 0 warnings / 0 hints | n/a | pass |
| Playwright smoke | 28/28 on desktop + mobile | n/a | pass |
| Design detector | 12 findings, all `advisory`, all one class | n/a | see F1 |
| Runtime dependencies | 2 (`astro`, `@astrojs/sitemap`) | n/a | pass |

Note LCP and TTFB are from a local preview with no network throttling. The
render-delay component (72 ms) and CLS (0.00) are real; the transfer numbers are
not representative of production.

---

## Findings, worst first

### F1. The type ramp has drifted (12 advisory detector hits)

`DESIGN.md` documents a type ramp. Eight components then declare one-off
`clamp()` font sizes that miss it, e.g. `EntryList` at
`clamp(1.375rem, 2.8vw, 2.125rem)` where `2.125rem` is not a documented step.
This is the single largest consistency problem in the codebase and it is exactly
the class of thing you would flag in a review at work.

**Fix:** add the missing steps to `tokens.css` as `--size-row`, `--size-row-dense`
and so on, then replace the literals. One commit, mechanical, and it makes the
detector clean.

### F2. Local grounds are a pattern with no rule

Five components now paint their own background to hold text contrast over the
shader field (`.nav::before`, `.entry__link`, `.section__aside`, `.caveats`, the
portal body). Three mix down from `--void`, two from `--abyss`, at five different
alphas, all arrived at by measurement rather than by rule.

It works. The reviewer re-measured the nav band from 2.03:1 to over 4.5:1. But
there is no principle telling the next person which to use.

**Fix:** two tokens, `--ground-strong` and `--ground-soft`, and a line in
`DESIGN.md` saying which surfaces get which. This is the highest
value-per-minute item on the list.

### F3. Two button treatments claim to be one

`base.css` says "one shape, two weights" and then `Nav.astro` adds
`.nav__link--action`, a third framed treatment with different padding and no
isometric diamond. `DESIGN.md` flags the same contradiction.

**Fix:** make the nav contact link a real `.action` at a smaller size, or drop
`--action` from its name and document it as its own thing.

### F4. The webfont is 90 KB for two faces

Both faces load their full variable axes for the whole latin subset. Anybody is
only ever used at five widths and three weights; Archivo at two weights.

**Fix:** subset with `fonttools` down to the glyphs and axis ranges actually
used. Realistic saving is 40-50 KB, which on a phone is the largest single win
still available. It needs a build step, which is why it is not already done.

### F5. CSS Modules conversion is half done

Six components converted (`Mark`, `Rails`, `Footer`, `Nav`, `Strands`,
`Portal`), verified emitting hashed classes such as `_nav__brand_s0vxs_32`.
Still on Astro scoped styles: `EntryList`, `Lattice`, and all seven page-level
`<style>` blocks, and 5 `data-astro-cid` attributes remain in the home page
output.

Finish it or revert it; a codebase with both conventions is worse than either.
See the CSS Modules section below for the blocker you will hit.

### F6. `DESIGN.md` is already slightly stale

It documents a `.fact` readout component that no longer exists (the
instrumentation section was removed when we dropped the claim that the shader is
your work). Regenerate it after the F1/F2 token work rather than now.

### F7. No visual regression testing

The 28 smoke tests cover behaviour, no-JS degradation, scene persistence and a
guard that forbidden claims never ship. They do not cover appearance, and this is
a design-led site where appearance is the product. Three of the real defects in
this build were only visible in a screenshot.

**Fix:** Playwright `toHaveScreenshot()` at 390 and 1440 for the five routes,
with the canvas masked (the shader is non-deterministic, so it must be excluded
or the snapshots will never be stable). Masking the canvas is the whole trick.

---

## What is genuinely good, and worth not breaking

- **Two runtime dependencies.** No framework runtime ships. Do not regress this.
- **The palette has one source.** `tokenRgb()` reads CSS custom properties off
  `:root` and feeds them to the shader, so `tokens.css` governs both the DOM and
  the GPU. Caveat: the parser only accepts six-digit hex.
- **Degradation is designed, not bolted on.** No WebGL2, reduced motion, coarse
  pointer, hidden tab and offscreen canvas each have a defined behaviour, and the
  content is DOM-first so it renders with zero JS.
- **Content survived the port unedited.** The collection schema matches the old
  Gatsby frontmatter, including normalising the comma-separated `tags` string.
- **The CV fails open.** All roles and all bullets are served visible; the script
  *collapses*. A script failure degrades to more information, not less.
- **CI enforces content truth as well as types.** The workflow greps `dist/` for claims
  `PRODUCT.md` forbids and fails the build if one reappears.

---

## On CSS Modules

You asked for this and it is done for the component layer, so this section is the
tradeoff written down rather than an argument to reopen.

**What it cost.** Astro already scopes component styles via `data-astro-cid`
hashes, so the conversion bought no new isolation. It added an import per
component and moved styles out of the file that uses them.

**The blocker, which is real and Astro-specific.** An Astro `<script>` block is
bundled separately and cannot see the frontmatter's `styles` object. Any class
JavaScript touches (`is-full`, `is-filtering`, `is-match`, `is-active`) must
therefore be wrapped in `:global()`, or the JS toggles a name that no longer
exists in the compiled CSS. This is silent: no error, the class just stops
matching. On the CV page that is four classes.

**If you finish the migration**, the order that minimises risk:

1. `EntryList`, which needs one `:global()` because `entries--dense` crosses a
   prop boundary.
2. Page-level blocks with no script: `work/index`, `writing/index`, `404`.
3. `Reading.astro` and `Root.astro`. `Root` also has `body.is-quiet` and
   `:global(.lattice__scrim)`, both of which must stay global.
4. `cv.astro` last. It has the most JS-touched classes and the only real risk.

**Recommended additions regardless of modules**, in value order:

- `@layer reset, tokens, base, components, utilities` for real cascade control.
  It also removes the `!important` on `.prose pre`.
- Native CSS nesting. Astro's compiler supports it, and it would shorten every
  BEM block.
- `@container` queries on `EntryList` and the CV role rows, which currently
  respond to viewport width when they should respond to their own.
- `:has()` for the nav active state instead of the `is-active` class, which would
  delete one of the four JS-touched classes.

---

## Suggested order of work

1. F2 ground tokens, then F1 type ramp. Both mechanical, both make the detector
   and `DESIGN.md` honest.
2. F7 visual regression with the canvas masked. Cheapest insurance on a
   design-led site.
3. F5 finish or revert CSS Modules.
4. F4 font subsetting. Biggest mobile win, needs a build step.
5. F3, then regenerate `DESIGN.md` (F6).

Deliberately not recommended: a UI framework, a CSS framework, a state library,
or an image CDN. Nothing here needs any of them.
