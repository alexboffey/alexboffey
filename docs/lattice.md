# The lattice, explained

Maintenance notes for the WebGL lattice. Written so the shader is debuggable,
changeable, and explainable without GPU-programming background. Assumes CSS
and TypeScript, nothing more.

The lattice is art direction, not a claimed engineering sample. This doc is
the handover that keeps it maintainable.

---

## 1. The one-paragraph version

There is no 3D scene. There are no cubes, no meshes, no camera object, no
three.js. There is **one triangle** covering the screen, and a small program
(`lattice.frag`) that runs **once per pixel** and answers a single question:
_"what colour is this pixel?"_ It answers by doing a bit of maths that works out
what an isometric block field would look like if one existed. The cubes on
screen are a calculation, not objects.

That is why the whole thing costs one draw call and no geometry.

---

## 2. Why there are two files

| File                       | Language   | Runs on             | Job                                                                      |
| -------------------------- | ---------- | ------------------- | ------------------------------------------------------------------------ |
| `src/shaders/lattice.vert` | GLSL       | GPU                 | Puts one triangle over the screen. Rarely needs touching.                |
| `src/shaders/lattice.frag` | GLSL       | GPU, once per pixel | Works out the colour of that pixel. This is the actual design.           |
| `src/scripts/lattice.ts`   | TypeScript | CPU, once per frame | Feeds the fragment shader its inputs, and holds all the per-route state. |

The split matters: **anything that needs to know about routes, scroll,
preferences or the DOM lives in the `.ts` file.** The `.frag` file knows nothing
about the web. It receives numbers and returns colours.

### The vertex shader, in one go

```glsl
vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
```

Three vertices, no buffers. `gl_VertexID` is 0, 1, 2 and this arithmetic turns
them into `(-1,-1)`, `(3,-1)`, `(-1,3)`, a triangle big enough to cover the
screen. Standard trick. Ignore it.

---

## 3. Uniforms: the props of the shader

A `uniform` is a value the CPU sets and every pixel reads. Think of them as
props: same value for the whole frame, set from `lattice.ts`.

```glsl
uniform vec2  uRes;        // canvas size in pixels
uniform float uTime;       // seconds since mount
uniform float uScroll;     // how far down the page, as world distance
uniform vec2  uPointer;    // cursor, -1..1
uniform float uPointerAmp; // 0 disables pointer effects (touch, reduced motion)
uniform float uDissolve;   // 0..1, fades the field
uniform float uSteps;      // march step budget, the perf dial
uniform vec4  uScene;      // presence, scale, heat, warm
uniform float uStation;    // where this route sits along the field
uniform vec4  uForm;       // cell, aspect, hue, edge
uniform vec3  uVoid, uEcho, uGlimmer, uMist, uAccent, uEmber; // the palette
```

Every one of these is set in `draw()` in `lattice.ts`. Adding a uniform
requires three things or it silently does nothing:

1. declare it in `lattice.frag`
2. add its name to `UNIFORM_NAMES` in `lattice.ts`
3. set it with a `gl.uniform*` call in `draw()`

Forgetting step 2 is the usual mistake. The lookup returns `null`, the set call
is a no-op, and the value stays 0.

---

## 4. The core idea: signed distance fields

The only concept actually needed.

A **signed distance function** (SDF) takes a point in space and returns _how far
that point is from the nearest surface_. Negative means inside. Zero means
exactly on the surface.

The SDF for a box, which is the only shape this scene uses:

```glsl
float sdBox(vec3 p, vec3 b) {
  vec3 q = abs(p) - b;                                   // b = half-extents
  return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0);
}
```

If `sdBox(p, b)` returns `2.0`, nothing lies within 2 units of `p`. That is the
useful part, because it means **a ray can safely jump 2 units forward without
missing anything.**

### Raymarching

To draw the scene, for each pixel a ray walks forward:

```
t = 0
loop:
  d = distance from (origin + direction * t) to nearest surface
  if d is tiny  -> hit something, shade it
  t = t + d     -> jump forward by exactly the safe distance
  if t too big  -> hit nothing, draw background
```

That is the loop in `main()`. `uSteps` caps how many iterations it may take,
which is why it is the performance dial: fewer steps means the ray gives up
sooner, so distant blocks vanish before near ones do.

### Infinite blocks for free

The grid is never built. Space folds instead:

```glsl
vec3 cell  = floor(w / cellSize);              // which cell is this
vec3 local = w - cellSize * (cell + 0.5);      // where inside that cell
```

Now one box SDF evaluated in `local` space produces **infinitely many boxes**,
because every cell reuses the same maths. `cell` is also a stable per-block ID,
which is how each block gets its own consistent size and heat: it is hashed.

```glsl
float hash13(vec3 p) { /* returns a repeatable 0..1 from a cell coordinate */ }
```

Same cell in, same number out, every frame. That is why the field does not
flicker.

---

## 5. Why the lattice matches the logo

The part worth being able to say out loud.

The camera is **orthographic** (no perspective, no vanishing point) and it looks
down the vector `(-1,-1,-1)`, the long diagonal of a cube.

```glsl
vec3 dir   = normalize(vec3(-1.0, -1.0, -1.0));
vec3 right = normalize(cross(dir, vec3(0.0, 1.0, 0.0)));
vec3 up    = normalize(cross(right, dir));
vec3 origin = vec3(14.0) + right * uv.x * span + up * uv.y * span;
```

Looking at a cube down its own diagonal with no perspective reveals exactly
three faces, each an identical parallelogram, at 30 degrees to the horizontal.
That is a **2:1 isometric projection**, and it is precisely the projection the
logo mark is drawn in.

So the logo is not placed on top of the scene. The scene is the logo's geometry,
extended into a field.

It goes one step further. The mark uses three flat values, one per face
direction. The shader shades by face direction too:

```glsl
float wy = max(n.y, 0.0);   // up-facing   -> the light value
float wx = max(n.x, 0.0);   // one side    -> the mid value
float wz = max(n.z, 0.0);   // other side  -> the dark value
```

`n` is the surface normal. Because of the fixed camera, only `+X`, `+Y` and `+Z`
faces are ever visible, so those three weights are the mark's three values.
**The logo's flat colour scheme is the lighting model.** Nothing else in the
shader is as important as this; changing it loses the identity.

Two rules follow, and both are load-bearing:

- **Never make the camera perspective.** The isometric identity is lost.
- **Never rotate the view direction.** Same reason. The world moves through a
  fixed projection; that is the whole gag.

---

## 6. The two traps

These are the bugs that already happened. Both are commented in the file, but
here is the reasoning.

### Trap 1: tunnelling

Most cells are empty. An empty cell returns `vec3(0.0)` for its dimensions, so
`sdBox` degenerates to `length(local)`, the distance to a point. That is still a
_valid_ SDF, which is why there are no holes to special-case.

But a point can report a large safe distance, and if the ray jumps that far it
can sail straight through a **neighbouring** cell that did contain a block.
Blocks then flicker in and out as the page scrolls.

The fix is the step clamp:

```glsl
t += min(hit.dist, STEP_CLAMP);   // never jump further than STEP_CLAMP
```

For this to be safe, `STEP_CLAMP` must be smaller than the narrowest possible gap
between two blocks. That is guaranteed by capping every block dimension at
`FILL = 0.62` of its half-cell, which leaves a gap of `0.76 × half-cell`. The
smallest half-cell any station uses is `0.91`, giving a worst case of `0.69`.
`STEP_CLAMP` is `0.5`. Comfortable.

> **Changing `CELL`, `FILL`, or any station's `cell` value means redoing that
> arithmetic.** Too large a `STEP_CLAMP` shows up as flickering blocks, not as
> an error.

### Trap 2: black triangles

The pointer warp bends space slightly. That can turn a surface normal so that
none of `n.x`, `n.y`, `n.z` is positive. Then `wx + wy + wz` is zero, the
weighted colour divides down to black, and hard black triangles punch through
the field. It looks like a rendering error.

The fix is an ambient floor:

```glsl
vec3 ambient = uEcho * 0.85;
vec3 face = mix(ambient, lit, smoothstep(0.0, 0.4, sum));
```

When `sum` is near zero the face falls back to ambient instead of to nothing.
**Do not remove this**, and any new way to perturb normals needs the field
rechecked for black shapes afterwards.

---

## 7. Stations: how each route gets its own field

The per-route variation lives entirely in `lattice.ts`:

```ts
const SCENES: Record<string, Scene> = {
  portal:  { presence: 0.58, scale: 1,    cell: 1,    aspect: 1,    hue: 0,     ... },
  work:    { presence: 0.5,  scale: 1.05, cell: 1.18, aspect: 2.6,  hue: -0.16, ... },
  writing: { presence: 0.68, scale: 0.9,  cell: 1.55, aspect: 0.3,  hue: 0.3,   ... },
  ...
}
```

| Field      | Effect                                               | Try                    |
| ---------- | ---------------------------------------------------- | ---------------------- |
| `presence` | Block threshold. **Higher is sparser.**              | `0.9` for nearly empty |
| `scale`    | Block size multiplier                                | `1.4` for chunky       |
| `cell`     | Grid spacing. Higher spreads blocks apart            | `2` for a wide plain   |
| `aspect`   | Height / width. `1` cube, `>1` tower, `<1` plate     | `4` for a skyline      |
| `hue`      | Hue rotation in **radians**                          | `0.5` for a big shift  |
| `edge`     | Hairline strength                                    | `0` to remove edges    |
| `heat`     | How readily blocks take the orange                   | `0.3` for lots         |
| `warm`     | Bends lit faces toward ember                         | `1` for very warm      |
| `station`  | Position along the field. Should be unique per route | any distinct number    |

A route picks one via the `scene` prop on `Root.astro`, which becomes
`data-scene` on `<body>`:

```astro
<Root title="Work" scene="work" description="..." />
```

### Adding a route

1. Add a station to `SCENES` with a `station` value nothing else uses.
2. Add its name to the `scene` union type in `Root.astro`.
3. Pass `scene="yourname"` from the page.

### The transition

The canvas has `transition:persist`, so Astro's client router **does not destroy
it** on navigation. The same WebGL context survives, which is what makes a route
change read as travel rather than a reload.

```ts
document.addEventListener("astro:before-preparation", () => {
  state.travelTarget = 1 // leaving: camera rushes, lattice thins
})
document.addEventListener("astro:after-swap", () => {
  state.sceneTarget = readScene() // arriving: retarget the new station
  state.travelTarget = 0 // and coast back down
})
```

Every scene field is then eased toward its target once per frame:

```ts
state.scene.cell = lerp(state.scene.cell, state.sceneTarget.cell, 0.06)
```

Nothing snaps. That single `lerp` pattern is the entire animation system.

---

## 8. Performance and degradation

Deliberate, and worth keeping. All of it is in `lattice.ts`.

```ts
function tier() {
  if (coarse || narrow || cores <= 4) return { steps: 48, scale: 0.62 }
  if (cores <= 8) return { steps: 72, scale: 0.85 }
  return { steps: 96, scale: 1 }
}
```

- `steps` is the ray iteration budget. The main quality and cost dial.
- `scale` is the render resolution multiplier. `0.62` renders at 62% and upscales.

| Condition                           | Behaviour                                                                                              |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------ |
| No WebGL2                           | Canvas never mounts. The CSS gradient ground in `Lattice.astro` is what remains. Nothing else is lost. |
| `prefers-reduced-motion`            | One frame, then stop. No loop, no travel burst, no pointer warp, no cursor.                            |
| Coarse pointer / narrow / few cores | Fewer steps, lower resolution.                                                                         |
| Tab hidden                          | `visibilitychange` stops the loop.                                                                     |
| Canvas offscreen                    | `IntersectionObserver` stops the loop.                                                                 |

**The palette is not duplicated.** `tokenRgb()` reads the CSS custom properties
off `:root` and feeds them in as uniforms, so `tokens.css` is the only place
colour is defined:

```ts
void: tokenRgb("--void", [0.031, 0.047, 0.082]),
```

One catch: that function only parses **six-digit hex**. Changing `--void` to
`oklch()` or a three-digit hex causes the shader to silently fall back to the
hardcoded default while the DOM changes. If the page and the field ever
disagree on colour, this is why.

---

## 9. Recipes

**Make a page's field calmer.** Raise `presence` and lower `scale` for that
station.

**Make the whole site calmer.** Raise `smoothstep(9.0, FAR, depth)` in the fog
line. The first number is where haze starts.

**Change the accent.** Edit `--incandescent` in `tokens.css`. Six-digit hex only.
The DOM and the shader both follow.

**Make the transition more dramatic.** In `lattice.frag`:

```glsl
origin += vec3(1.0, 0.35, -1.0) * uTravel * 9.0;   // raise 9.0
```

**Make it snappier.** In `lattice.ts`, `travelEase` is `0.2` building and `0.055`
decaying. Higher is faster.

**Turn the scene off entirely** to check the fallback: comment out `boot()` in
`Lattice.astro`'s script.

---

## 10. Debugging

The shader fails silently by design; a broken shader must not take the page
down. So when nothing renders:

1. **Check the console in dev.** Compile and link errors are logged, but only
   when `import.meta.env.DEV` is true.
2. **Is the canvas live?** `document.querySelector('[data-lattice]').dataset.live`
   should be `"true"`. If it is missing, the shader failed to compile or WebGL2
   is unavailable.
3. **Isolate the shader from the state.** Return a flat colour as the first line
   of `main()`:
   ```glsl
   fragColor = vec4(1.0, 0.0, 0.0, 1.0); return;
   ```
   Red screen means the pipeline is fine and the bug is in the scene maths.
   No red means compile, link, or mount.
4. **Visualise a value** instead of guessing. Any number can be a greyscale
   image:
   ```glsl
   fragColor = vec4(vec3(float(steps) / 96.0), 1.0); return;   // step cost
   fragColor = vec4(n * 0.5 + 0.5, 1.0); return;               // normals
   ```
5. **Flickering blocks** → the tunnelling arithmetic in section 6.
6. **Black shapes** → the ambient floor in section 6.
7. **Colours wrong after a token edit** → the six-digit hex constraint in
   section 8.

---

## 11. Further reading

In order:

- **The Book of Shaders**: <https://thebookofshaders.com/>. Covers fragment
  shaders from zero.
- **Inigo Quilez on distance functions**: <https://iquilezles.org/articles/distfunctions/>.
  The reference for SDFs; `sdBox` above is his.
- **Raymarching primer**: <https://iquilezles.org/articles/raymarchingdf/>.
- **Shadertoy**: <https://www.shadertoy.com/>. Fork things and break them.

The shader is small and conventional once the first two have been read. The
only original decision is the `(1,1,1)` camera matching the logo, and that is
a design idea rather than a technical one.
