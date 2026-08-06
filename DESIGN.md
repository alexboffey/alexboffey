---
name: alexboffey.co.uk
description: A full-bleed WebGL portal whose living pixels are the logo's own isometric geometry, under one incandescent accent and a variable grotesk driven on its width axis.
colors:
  void: "#080d18"
  abyss: "#0c1322"
  echo: "#16203a"
  glimmer: "#3a4e7a"
  mist: "#a6b4cc"
  paper: "#eaeff7"
  incandescent: "#f59333"
  ember: "#ffc08a"
  text-secondary: "#8fa0be"
  text-label: "#7c90b4"
  print-ink: "#000000"
  print-text: "#222222"
  print-rule: "#666666"
typography:
  monument:
    fontFamily: "Anybody Variable, Arial Narrow, system-ui, sans-serif"
    fontSize: "clamp(4rem, 15.5vw, 15rem)"
    fontWeight: 700
    fontStretch: "72%"
    lineHeight: 0.84
    letterSpacing: "-0.045em"
  display:
    fontFamily: "Anybody Variable, Arial Narrow, system-ui, sans-serif"
    fontSize: "clamp(2.4rem, 7vw, 6rem)"
    fontWeight: 600
    fontStretch: "82%"
    lineHeight: 1.02
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Anybody Variable, Arial Narrow, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 3.6vw, 3rem)"
    fontWeight: 600
    fontStretch: "88%"
    lineHeight: 1.02
    letterSpacing: "-0.03em"
  row-lg:
    fontFamily: "Anybody Variable, Arial Narrow, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 3.1vw, 2.375rem)"
    fontWeight: 600
    fontStretch: "88%"
    lineHeight: 1.04
    letterSpacing: "-0.03em"
  row:
    fontFamily: "Anybody Variable, Arial Narrow, system-ui, sans-serif"
    fontSize: "clamp(1.375rem, 2.8vw, 2.125rem)"
    fontWeight: 600
    fontStretch: "88%"
    lineHeight: 1.06
    letterSpacing: "-0.03em"
  row-sm:
    fontFamily: "Anybody Variable, Arial Narrow, system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 2vw, 1.5rem)"
    fontWeight: 600
    fontStretch: "88%"
    lineHeight: 1.06
    letterSpacing: "-0.03em"
  lead:
    fontFamily: "Archivo Variable, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(1.0625rem, 1.5vw, 1.375rem)"
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: "normal"
  body:
    fontFamily: "Archivo Variable, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(1rem, 0.98rem + 0.15vw, 1.0625rem)"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  small:
    fontFamily: "Archivo Variable, system-ui, -apple-system, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "Anybody Variable, Arial Narrow, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 500
    fontStretch: "88%"
    lineHeight: 1.4
    letterSpacing: "0.3em"
  micro:
    fontFamily: "Anybody Variable, Arial Narrow, system-ui, sans-serif"
    fontSize: "0.625rem"
    fontWeight: 500
    fontStretch: "88%"
    lineHeight: 1.4
    letterSpacing: "0.3em"
rounded:
  none: "0"
  soft: "2px"
  prose: "3px"
spacing:
  2xs: "0.25rem"
  xs: "0.5rem"
  sm: "0.75rem"
  md: "1.25rem"
  lg: "2rem"
  xl: "3.25rem"
  2xl: "5.25rem"
  3xl: "clamp(5rem, 12vh, 9rem)"
  section: "clamp(6rem, 16vh, 12rem)"
components:
  action:
    backgroundColor: "{colors.void}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.85em 1.35em"
  action-hover:
    backgroundColor: "{colors.incandescent}"
    textColor: "{colors.ember}"
  action-primary:
    backgroundColor: "{colors.incandescent}"
    textColor: "{colors.void}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.85em 1.35em"
  action-primary-hover:
    backgroundColor: "{colors.ember}"
    textColor: "{colors.void}"
  nav-link:
    textColor: "{colors.text-label}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
  nav-link-active:
    textColor: "{colors.paper}"
  nav-contact:
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.5em 0.9em"
  index-row:
    backgroundColor: "{colors.void}"
    textColor: "{colors.paper}"
    typography: "{typography.row}"
    rounded: "{rounded.none}"
    padding: "2rem 1.25rem"
  index-row-hover:
    backgroundColor: "{colors.abyss}"
    textColor: "{colors.ember}"
  filter-input:
    backgroundColor: "{colors.abyss}"
    textColor: "{colors.paper}"
    typography: "{typography.small}"
    rounded: "{rounded.none}"
    padding: "0.7em 0.9em"
  chip:
    textColor: "{colors.text-secondary}"
    typography: "{typography.small}"
    rounded: "{rounded.none}"
    padding: "0.25em 0.55em"
  chip-match:
    textColor: "{colors.ember}"
  disclosure-row:
    textColor: "{colors.paper}"
    typography: "{typography.row-lg}"
    rounded: "{rounded.none}"
    padding: "2rem 0"
---

# Design System: alexboffey.co.uk

## Overview

**Creative North Star: "The Lattice Portal"**

One field, seen from one angle, travelled through rather than navigated. The
whole site is a full-bleed window onto a live isometric block lattice, raymarched
in a single fragment shader, and the interface is a set of thin drawn marks laid
over it. The projection the field holds is the projection the logo mark is already
drawn in, so the field is not decoration around the identity: it is the identity,
extended past the mark and into the entire page.

The register is cold, hued and industrial. Nothing here is neutral grey, nothing
is neutral black, and there is exactly one warm colour in the system. Density is
deliberately uneven: monumental type against hairline legends, a full viewport of
atmosphere against a tight ruled list. Every surface reads as drawn rather than
boxed, which is why there is not a single shadow, radius above 3px, or card
anywhere in the build.

Two directions were rejected and both remain anti-references. Brutalist and Swiss
poster treatments were ruled out by the client. Near-black plus a single neon
accent with glowing edges was ruled out on craft grounds: it is what every
engineer portfolio ships, and this ground is a genuinely hued blue-slate for
exactly that reason.

The direction contract is committed in the source, as an HTML comment at the top
of `<body>` in `src/layouts/Root.astro` (seed key `3cf70a0a`), and it survives
into the built output. That comment, not this file, is the authority on intent;
this file records what got built.

**Key Characteristics:**

- A live WebGL lattice as the persistent ground of every route
- A fixed 30 degree axonometric projection, inherited from the logo mark
- Exactly one accent colour, the brand orange, used sparingly enough to mean something
- One variable display face driven on its **width** axis instead of extra weights
- Hairlines and tonal grounds only: no shadows, no cards, no filled containers
- The rotated square as the system's only decorative glyph
- Degradation designed as a first-class behaviour, not a fallback

## Colors

A deep hued blue-slate ground carrying the whole surface, cooled light values
descended from the mark's warm grey, and a single incandescent orange that is the
only warm thing in the system.

### Primary

- **Incandescent Orange** (`{colors.incandescent}`): the brand accent, taken
  unchanged from the logo mark. It marks the active route, fills the one primary
  action per surface, draws interactive hairlines as they heat, and picks out the
  small proportion of lattice blocks that "run hot". The only hue off the
  blue-slate axis.
- **Ember** (`{colors.ember}`): the accent's lit state. Hover and focus text,
  inline code, and the warm face bias on the closer stations. Never a fill.

### Neutral

- **Void** (`{colors.void}`): the ground of the entire site, and the page
  background. Deep, blue, and never mistaken for black.
- **Abyss** (`{colors.abyss}`): the next surface up. Local grounds, input fields,
  code blocks.
- **Echo** (`{colors.echo}`): the lattice's dark face family and its ambient
  floor. In the DOM it appears only inside `color-mix`.
- **Glimmer** (`{colors.glimmer}`): the source of every hairline, always mixed
  down to 45% (`--rule`) or 80% (`--rule-strong`), never used at full strength.
  Also the lattice's mid face family.
- **Mist** (`{colors.mist}`): the lattice's lit top faces, and the mark's grey
  parallelograms. A cooled descendant of the original warm `#CDCCCC`.
- **Paper** (`{colors.paper}`): display type and primary reading text. A cold
  white, never pure.
- **Secondary Slate** (`{colors.text-secondary}`): body copy at rest and every
  supporting paragraph. Tinted from the ground's hue, never greyed.
- **Label Slate** (`{colors.text-label}`): tracked legends, metadata and micro
  type. The floor of the text hierarchy.

### Tertiary

The print palette. Paper has no field to sit on, so the CV's print stylesheet is
the one place this system uses ink values: **Print Ink** (`{colors.print-ink}`)
for headings, **Print Text** (`{colors.print-text}`) for body, and **Print Rule**
(`{colors.print-rule}`) for markers, alongside `--print-base` and
`--print-hairline`. These exist only inside `@media print`.

### Named Rules

**The One Source Rule.** `src/styles/tokens.css` owns the palette for the DOM
*and* the GPU. `tokenRgb()` in `src/scripts/lattice.ts` reads `--void`, `--echo`,
`--glimmer`, `--mist`, `--incandescent` and `--ember` back off
`document.documentElement` at mount and feeds them to the shader as `vec3`
uniforms. Changing a hex in `tokens.css` recolours the 3D scene. Two consequences
bind: those six tokens must stay plain six-digit hex (the reader's regex is
`/^#?([0-9a-f]{6})$/i` and silently falls back to a hardcoded triple otherwise),
and no palette value may be defined anywhere but `tokens.css`.

**The One Hot Colour Rule.** There is exactly one accent and it is orange. No
second accent, no semantic colour set, no success/warning/danger palette. If a
state needs marking, it is marked with the accent, with a hairline, or with
opacity, never with a new hue.

**The Hued Ground Rule.** Nothing in this system is neutral grey or neutral
black. Every dark value carries the ground's blue-slate hue and every light value
is a cooled descendant of the mark's warm grey. Mixing happens in `oklab`.

## Typography

**Display Font:** Anybody Variable (with Arial Narrow, system-ui)
**Body Font:** Archivo Variable (with system-ui, -apple-system)
**Code Font:** the platform monospace stack, used only for actual code

**Character:** A technical signage grotesk against a workhorse text grotesk. The
display face is a variable with a genuine width axis, and that axis carries the
expressive range: the same face reads as a monument at 72% width and as an
instrument legend at 88% with 0.3em tracking. Both faces are self-hosted latin
subsets, and neither is a category default.

### Hierarchy

- **Monument** (700, `clamp(4rem, 15.5vw, 15rem)`, 0.84, width 72%): the surname
  in the first viewport, and the 404 code. Viewport-bound so it fills the measure
  by construction at every width instead of being clamped afterwards.
- **Display** (600, `clamp(2.4rem, 7vw, 6rem)`, 1.02, width 82%): page and
  section headings.
- **Title** (600, `clamp(1.75rem, 3.6vw, 3rem)`, 1.02, width 88%): reading-surface
  titles and the footer's closing line.
- **Row Large** (600, `clamp(1.5rem, 3.1vw, 2.375rem)`, 1.04, width 88%): CV
  organisation names and the practice strands.
- **Row** (600, `clamp(1.375rem, 2.8vw, 2.125rem)`, 1.06, width 88%): index row
  titles on work and writing.
- **Row Small** (600, `clamp(1.125rem, 2vw, 1.5rem)`, 1.06, width 88%): dense
  index rows.
- **Lead** (400, `clamp(1.0625rem, 1.5vw, 1.375rem)`, 1.45): the positioning
  sentence and every standfirst. Capped at 46ch.
- **Body** (400, `clamp(1rem, 0.98rem + 0.15vw, 1.0625rem)`, 1.6): running text.
  Prose is capped at `--measure` (68ch).
- **Label** (500, 0.6875rem, 0.3em tracking, uppercase, width 88%): navigation,
  actions, field labels, metadata.
- **Micro** (500, 0.625rem, 0.3em tracking, uppercase, width 88%): the rails, row
  metadata, and narrow-viewport navigation.

Two sub-heading steps sit outside the fluid ramp because they are genuinely
static: `--size-sub` (1.5rem) and `--size-sub-sm` (1.25rem). `--size-given`
(`clamp(1.25rem, 3.2vw, 2.25rem)`) is the given name above the monument.

### Named Rules

**The Width Axis Rule.** When display type needs a different feel, change
`font-stretch`, not the weight and not the family. Every display element sets an
explicit width from the named scale (`--wdth-monument` 72% through `--wdth-prose`
92%): the tighter the type has to pack, the narrower it goes. Never ship a second
display face or an extra static weight to solve something the axis can solve.

**The Legend Rule.** Small type is never just small. Anything at label or micro
size is set in the display face, uppercased, and tracked to `0.3em`, so it reads
as an instrument legend rather than shrunken body copy.

**The Ramp Follows the Component Rule.** The row and sub-heading steps exist
because the components arrived at those sizes first and the ramp was written
afterwards. When a component genuinely needs a step the ramp lacks, widen the ramp
and name the step. Do not leave a bare literal in a component, and do not snap a
considered size to a nearby token just to satisfy a linter.

## Layout

A single centred shell at `--shell` (82rem) with a fluid `--gutter`
(`clamp(1.25rem, 4vw, 3.5rem)`), and one spacing scale used everywhere from
`--space-2xs` (0.25rem) to `--space-section` (`clamp(6rem, 16vh, 12rem)`).

Composition is **left-weighted on every surface**. Headings, monument type,
actions and content all set against the left edge of the shell; the right half of
a wide viewport is deliberately left to the field. This is structural, not a
habit, and it is what makes the horizontal scrim pass possible.

Sections separate with `--space-section` top and bottom, and the footer carries
`margin-top: auto` rather than its own margin, because stacking the two left a
screen of dead ground on short pages.

Two fixed margin rails carry the standing positioning facts in vertical micro
type inside `--rail` (2.75rem) of each edge. They appear above **1180px** and are
`aria-hidden`, because the same facts are stated in flowing content on every page
and a screen reader should hear them once.

The reading measure is `--measure` (68ch), with the lead capped tighter at 46ch.

Responsive behaviour is breakpoint-light: **1180px** (rails appear, scrim goes
two-pass), **62rem** (About splits to two columns), **52rem** (index rows and CV
role headers take their multi-column grid), **46rem** (CV controls and split
sections), **34rem** (navigation drops the wordmark and closes its tracking).

## Elevation & Depth

**There are no shadows in this system.** Not one `box-shadow` exists in the build,
and none should be added. Depth comes from three sources instead: the live
lattice's own atmospheric fog, tonal grounds mixed in `oklab`, and hairlines
derived from `--glimmer`.

Layering is a small explicit z-order: the lattice at 0, page content at 2, the
rails at 3, navigation at 4, the trailing cursor at 90, the skip link at 100.

`backdrop-filter: blur(6px)` appears once, on the footer, as an actual glass
effect over the moving field rather than as decoration.

### The Scrim System

The field is live and its brightness varies by station, so text needs guaranteed
ground. `.lattice__scrim` runs two gradient passes above 1180px: a horizontal
pass that keeps the left-set text column dark while letting the right side stay
open, and a vertical pass that protects the navigation band and the baseline.

Below 1180px content is full width, so the horizontal pass has nothing to protect
and the scrim goes deliberately flat instead. On reading surfaces the `quiet` prop
on the root layout sets `body.is-quiet`, which damps the scrim hard so a long
measure never competes with motion.

### Named Rules

**The Local Ground Rule.** The scrim is not always enough. Five components carry
their own ground *because measured contrast failed over the field*, and each is
load-bearing rather than decorative: `.nav::before` (a short gradient exactly
where both scrim passes are weakest, because 11px labels were landing on bright
cube faces at about 2:1), `.entry__link` (its metadata column sits in the
right-edge zone where the horizontal pass has run out, and on the denser stations
small text measured about 2:1), `.portal__body` (the positioning sentence is the
one first-viewport element that must be read), `.section__aside` (it lives in the
right half of the shell by design), and `.caveats`. Do not remove these to "clean
up" the styling, and do add one when new text lands in the right half of a wide
viewport. Composite the alpha against a bright cube face before trusting it: 62%
was not enough and became 88%.

**The No Shadow Rule.** If something needs to separate from what is behind it,
give it a tonal ground and a hairline. Never a shadow, never a glow border, never
a gradient stroke.

## Shapes

Squared by default. Zero radius is the resting state for every interactive and
container surface: actions, navigation, inputs, chips, rows and grounds are all
hard-cornered. The only radii in the system are 2px on inline code and 3px on
prose images and code blocks, both of which exist to stop a bitmap or a syntax
block reading as a hard-edged panel.

Borders are always exactly 1px and always derived from `--glimmer` through
`--rule` or `--rule-strong`, or from `--incandescent` when a block is being set
apart. There is no 2px border anywhere, and no coloured left-border above 1px.

The recurring silhouette is the **isometric diamond**: a 3-7px square rotated 45
degrees, the smallest possible unit of the logo's geometry. It appears as the
navigation active marker, the pointer on every action, the bullet on
prose-adjacent lists, the CV disclosure marker, the rails separators, the portal
status pip, and the trailing cursor.

### Named Rules

**The No Cards Rule.** There are no cards in this world, and this has been
enforced twice against drift: the About page's contact panel and the Work page's
"what is not here" box were both bordered, filled containers at one point and were
dissolved into a single accent hairline above the content, sitting on the page's
own ground. If a block needs to be set apart, give it a hairline and a heading. Do
not reintroduce a bordered, padded, radiused container.

**The Diamond-Only Rule.** The rotated square is the only decorative glyph. No
chevrons, no arrows, no icon set, no bullets from a font. If a marker is needed,
it is a diamond.

## Components

Component styles live two ways, and this is a migration in progress rather than a
decision. `Mark`, `Rails`, `Footer`, `Nav`, `Strands` and `Portal` use CSS Modules
(`*.module.css` beside the component); `EntryList`, `Lattice` and the page-level
blocks still use Astro's scoped `<style>`. Shared primitives (`.action`,
`.section`, `.prose`, `.label`, `.shell`) are intentionally global in
`src/styles/base.css`, because prose styles have to reach unscoped markdown output.

### Actions (buttons and button-shaped links)

- **Character:** a framed instrument switch, not a button.
- **Shape:** hard-cornered, 1px `--rule-strong` frame, `0.85em 1.35em` padding.
- **Primary:** filled `{colors.incandescent}` with `{colors.void}` text. One per
  surface, maximum.
- **Secondary:** transparent-over-void ground, `{colors.paper}` text, frame only.
- **Hover / Focus:** frame goes to the accent, ground takes a 12% accent wash,
  text goes to ember, and the trailing diamond translates up and right by 2px.
- **Active:** translates down 1px.

### Navigation

- **Style:** thin corner links in label type, brand mark plus full wordmark at the
  left, contact as a framed action at the right.
- **Active:** the isometric diamond, plus `{colors.paper}` text and
  `aria-current="page"`. Never an underline or a pill.
- **Mobile (below 34rem):** the wordmark drops, tracking closes to 0.16em, sizes go
  to micro, and the active diamond moves below its label to avoid colliding with
  the previous link. Contact never drops.

### Index Rows (the signature list component)

The system's primary way of presenting a collection, and the reason there are no
cards. One hairline-ruled row per entry: title at row size on the left, metadata
tracked out small on the right, optional summary beneath.

- **Rest:** its own tonal ground at 82% void, 1px bottom hairline.
- **Hover / Focus:** the whole row translates 6px along the axis, the title goes
  ember, and a 1px accent rule scales in from the left edge. Reduced motion drops
  the translation and keeps the colour and the rule.

### Inputs

- **Style:** 1px `--rule-strong` frame on an abyss ground, hard corners, small
  body type, placeholder in label slate.
- **Focus:** the frame goes to the accent, with the global 2px accent focus ring
  on top.

### Chips

Squared 1px `--rule` outlines holding small text. Used for the per-role CV stack
and the unattributed stack. Matching a filter takes the frame to the accent and the
text to ember; non-matching chips dim to 0.55 opacity, which is the floor that
keeps them above 4.5:1.

### Disclosure (CV roles)

Native `<details>` with the marker suppressed and replaced by the isometric
diamond, which rotates to a square and fills with the accent when open. Every role
ships `open`; the script collapses rather than reveals, so a script failure leaves
the whole CV readable.

### The Lattice (the signature component)

A single fullscreen triangle running one fragment shader against raw WebGL2. No
scene graph, no geometry, no 3D library, one draw call.

The governing coupling: an orthographic camera looking down the `(1,1,1)` diagonal
of a cube grid produces exactly the 2:1 isometric projection the logo mark is
drawn in, so the mark's three flat face values *are* the shading model. `+Y` faces
take mist, `+X` takes glimmer, `+Z` takes echo, and the rare hot blocks take the
accent. Never make the camera perspective and never rotate the view direction; the
identity is the projection.

Two implementation invariants, both learned from real defects. Empty cells collapse
their box to a point, which is a valid SDF, so there are no holes to special-case;
safety comes instead from every block dimension being capped at `FILL` (0.62) of
its half-cell, with the march step clamped below the resulting gap. And every face
needs the ambient floor (`echo * 0.85`), because the pointer warp can turn a normal
away from all three lit axes and the weighted colour then divides to black.

`docs/lattice.md` is the full handover, including the debugging recipes.

### Per-route stations

Each route occupies a different *place* in the same lattice, selected by the
`scene` prop on the root layout, which becomes `data-scene` on `<body>`. Presence
is a threshold, so higher is sparser; aspect is height over width, so above 1 is a
tower and below 1 is a plate; hue is a rotation in radians about the grey axis.

| Station | Character | presence | scale | cell | aspect | hue | edge | heat | warm | position |
|---|---|---|---|---|---|---|---|---|---|---|
| `portal` | Establishing shot: even cubes, balanced | 0.58 | 1 | 1 | 1 | 0 | 1 | 0 | 0.1 | 0 |
| `work` | A skyline: tall towers, tighter grid, warm | 0.5 | 1.05 | 1.18 | 2.6 | −0.16 | 1.35 | 0.06 | 0.34 | 26 |
| `writing` | A plain: wide-spaced flat plates, cool | 0.68 | 0.9 | 1.55 | 0.3 | 0.3 | 0.75 | −0.04 | 0 | 54 |
| `about` | Close and warm: dense small cubes | 0.46 | 0.82 | 0.72 | 1 | −0.34 | 1.1 | 0.16 | 0.6 | 82 |
| `reading` | Almost empty, very flat, very far | 0.84 | 0.7 | 1.9 | 0.22 | 0.16 | 0.5 | −0.06 | 0.05 | 108 |
| `lost` | The lattice comes apart into shards | 0.86 | 0.5 | 0.68 | 1.6 | 0.62 | 1.7 | 0.35 | 0.45 | 140 |

Adding a route means adding a station with an unused position value. If `cell` or
`FILL` changes, redo the step-clamp arithmetic above.

### Motion grammar

One easing curve, `--ease` (`cubic-bezier(0.16, 1, 0.3, 1)`), on everything, at
four durations: `--dur-fast` (180ms) for colour, `--dur` (420ms) for transforms
and rules, `--dur-slow` (900ms), and `--dur-enter` (1200ms) for the canvas fade.
All four collapse to 1ms under reduced motion.

The one authored moment is the route transition. The canvas is
`transition:persist`, so the client router never destroys it: leaving spins the
camera up and thins the lattice, arriving retargets the station and coasts back
down, and every scene parameter eases toward its target once per frame. The two
halves overlap, so it reads as travel rather than a crossfade. Nothing snaps
anywhere in this system; a single `lerp` toward a target is the whole animation
model.

### Degradation (these are system rules, not footnotes)

| Condition | Behaviour |
|---|---|
| No WebGL2 | The canvas never mounts. The CSS gradient ground stands in, and nothing else is lost. |
| `prefers-reduced-motion` | One frame, then stop. No loop, no travel burst, no pointer warp, no trailing cursor. |
| Coarse pointer / narrow / ≤4 cores | 48 march steps at 0.62 render scale, versus 96 at full. |
| Tab hidden or canvas offscreen | Frames stop entirely. |
| No JavaScript | Every route renders and reads in full. The CV serves all roles open and all bullets visible. |

## Do's and Don'ts

### Do:

- **Do** define every palette value in `src/styles/tokens.css` and nowhere else,
  as plain six-digit hex for the six tokens the shader reads.
- **Do** reach for `font-stretch` from the named width scale before a weight, and
  never before a second family.
- **Do** set small type in the display face, uppercased, tracked to `0.3em`.
- **Do** give any new text in the right half of a wide viewport its own tonal
  ground, and composite the alpha against a bright cube face before trusting it.
- **Do** separate surfaces with a 1px `--rule` hairline and a tonal ground.
- **Do** use the rotated square when a marker is needed.
- **Do** keep composition left-weighted, so the scrim's horizontal pass keeps
  working.
- **Do** add a station when you add a route, with an unused position value.
- **Do** make new interactive state fail open, the way the CV does: serve the
  readable state and let the script narrow it.
- **Do** widen the type ramp and name the step when a component needs a size it
  lacks.

### Don't:

- **Don't** add a shadow. There are none, and depth comes from fog, tone and
  hairlines.
- **Don't** add a card, a filled bordered container, or a radius above 3px.
- **Don't** introduce a second accent or a semantic colour set. One hot colour.
- **Don't** use a neutral grey or a neutral black anywhere outside the print
  palette.
- **Don't** make the lattice camera perspective, or rotate its view direction.
- **Don't** remove the shader's ambient floor, or raise a block dimension past
  `FILL` without redoing the step-clamp arithmetic.
- **Don't** use a chevron, an arrow, or an icon font. The diamond is the glyph.
- **Don't** ship a second display face or an extra static weight.
- **Don't** leave a bare font-size or colour literal in a component.
- **Don't** claim the shader as a hand-written work sample; it is art direction,
  and `docs/lattice.md` is its handover.

## Known inconsistencies

Honest state of the built system, worst first. Resolved since the last pass: the
skip link's invisible focus ring, the mark animating only inside anchors, the
untokenised width axis, the canvas fade sitting outside the duration scale, and the
type-ramp drift (the ramp widened).

1. **The styling layer is mid-migration.** Six components are on CSS Modules;
   `EntryList`, `Lattice` and all page-level blocks are still on Astro scoped
   styles. Finish or revert, because two conventions is worse than either. Note the
   Astro-specific blocker: a `<script>` block cannot see the hashed names, so every
   JS-touched class needs `:global()`.
2. **Local grounds have no rule distinguishing `--void` from `--abyss`.** Five
   surfaces carry their own ground at five alphas mixed from two different base
   tokens, each arrived at by measurement. Two tokens (`--ground-strong`,
   `--ground-soft`) would settle it.
3. **`.nav__link--action` is a third action treatment.** It claims the action
   family's name, uses different padding, and has no diamond, against "one shape,
   two weights".
4. **The webfont is 89.7 KB for two faces** at full axis range across the whole
   latin subset, where five widths and three weights are actually used. Subsetting
   would return 40-50 KB.
5. **No visual regression coverage.** 28 Playwright tests cover behaviour,
   degradation and content truth, but nothing covers appearance on a design-led
   site. Snapshots need the canvas masked, since the shader is non-deterministic.
