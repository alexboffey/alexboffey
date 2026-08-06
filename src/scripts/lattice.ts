import frag from "../shaders/lattice.frag?raw"
import vert from "../shaders/lattice.vert?raw"

/**
 * The lattice engine.
 *
 * One fullscreen triangle, one fragment shader, no scene graph and no 3D
 * library. Scroll drives the camera through the field, so the same scene is the
 * spine of every route rather than a decoration on the home page.
 *
 * Everything here degrades rather than blocks: no WebGL2 means the CSS ground
 * stays, reduced-motion means a single static frame, and a hidden tab or an
 * offscreen canvas means no frames at all.
 */

type Uniforms = Record<string, WebGLUniformLocation | null>

const UNIFORM_NAMES = [
  "uRes",
  "uTime",
  "uScroll",
  "uPointer",
  "uPointerAmp",
  "uDissolve",
  "uSteps",
  "uScene",
  "uStation",
  "uForm",
  "uTravel",
  "uVoid",
  "uEcho",
  "uGlimmer",
  "uMist",
  "uAccent",
  "uEmber",
] as const

/**
 * The stations.
 *
 * Each route occupies a different part of the same lattice, so arriving
 * somewhere new means the field genuinely changed rather than being recoloured.
 * `presence` is the block threshold (higher is sparser), `scale` the block size,
 * `heat` how readily a block takes the accent, `warm` how far the lit faces bend
 * toward ember, and `station` how far down the travel axis the camera sits.
 */
export interface Scene {
  presence: number
  scale: number
  heat: number
  warm: number
  station: number
  /** Cell spacing multiplier: bigger means the lattice opens out. */
  cell: number
  /** Block aspect (height / width). 1 is a cube, >1 towers, <1 plates. */
  aspect: number
  /** Hue rotation in radians about the grey axis. */
  hue: number
  /** Edge hairline gain. */
  edge: number
}

/**
 * Each station is a different *place* in the lattice, not the same place at a
 * different density: the cell spacing, the block proportions and the hue all
 * move, so arriving somewhere new looks like somewhere new.
 */
const SCENES: Record<string, Scene> = {
  // Establishing shot: even cubes, balanced, the accent rare enough to mean
  // something. Everything else is read as a departure from this.
  portal: {
    presence: 0.58,
    scale: 1,
    heat: 0,
    warm: 0.1,
    station: 0,
    cell: 1,
    aspect: 1,
    hue: 0,
    edge: 1,
  },
  // Work: a skyline. Tall towers on a tighter grid, warm, hard edges.
  work: {
    presence: 0.5,
    scale: 1.05,
    heat: 0.06,
    warm: 0.34,
    station: 26,
    cell: 1.18,
    aspect: 2.6,
    hue: -0.16,
    edge: 1.35,
  },
  // Writing: a plain. Wide-spaced flat plates, cool, edges softened.
  writing: {
    presence: 0.68,
    scale: 0.9,
    heat: -0.04,
    warm: 0,
    station: 54,
    cell: 1.55,
    aspect: 0.3,
    hue: 0.3,
    edge: 0.75,
  },
  // About: close and warm. Dense small cubes, the most heat on the site.
  about: {
    presence: 0.46,
    scale: 0.82,
    heat: 0.16,
    warm: 0.6,
    station: 82,
    cell: 0.72,
    aspect: 1,
    hue: -0.34,
    edge: 1.1,
  },
  // Reading: almost empty, very flat, very far. The measure owns the screen.
  reading: {
    presence: 0.84,
    scale: 0.7,
    heat: -0.06,
    warm: 0.05,
    station: 108,
    cell: 1.9,
    aspect: 0.22,
    hue: 0.16,
    edge: 0.5,
  },
  // Lost: the lattice comes apart into shards on a tight grid.
  lost: {
    presence: 0.86,
    scale: 0.5,
    heat: 0.35,
    warm: 0.45,
    station: 140,
    cell: 0.68,
    aspect: 1.6,
    hue: 0.62,
    edge: 1.7,
  },
}

function sceneFor(name: string | undefined): Scene {
  return SCENES[name ?? "portal"] ?? SCENES.portal
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t

/** Reads a design token as linear-ish RGB floats, so CSS owns the palette. */
function tokenRgb(name: string, fallback: [number, number, number]) {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim()
  const match = raw.match(/^#?([0-9a-f]{6})$/i)
  if (!match) return fallback
  const int = parseInt(match[1], 16)
  return [
    ((int >> 16) & 255) / 255,
    ((int >> 8) & 255) / 255,
    (int & 255) / 255,
  ] as [number, number, number]
}

function compile(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    if (import.meta.env.DEV) {
      console.warn("[lattice]", gl.getShaderInfoLog(shader))
    }
    gl.deleteShader(shader)
    return null
  }
  return shader
}

/**
 * Coarse device tiering. Deliberately cheap and pessimistic: the primary
 * visitor is on a phone with three other tabs open, so a wrong guess should
 * cost frames, not the page.
 */
function tier() {
  const cores = navigator.hardwareConcurrency ?? 4
  const coarse = window.matchMedia("(pointer: coarse)").matches
  const narrow = window.innerWidth < 760
  const memory = (navigator as { deviceMemory?: number }).deviceMemory ?? 8

  if (coarse || narrow || cores <= 4 || memory <= 4) {
    return { steps: 48, scale: 0.62 }
  }
  if (cores <= 8) return { steps: 72, scale: 0.85 }
  return { steps: 96, scale: 1 }
}

export function mountLattice(canvas: HTMLCanvasElement) {
  if (canvas.dataset.mounted === "true") return
  canvas.dataset.mounted = "true"

  const context = canvas.getContext("webgl2", {
    alpha: false,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: "low-power",
    failIfMajorPerformanceCaveat: false,
  })
  if (!context) return
  // Re-bound as non-null: the hoisted draw/resize declarations below cannot
  // rely on narrowing from the guard above.
  const gl: WebGL2RenderingContext = context

  const vs = compile(gl, gl.VERTEX_SHADER, vert)
  const fs = compile(gl, gl.FRAGMENT_SHADER, frag)
  if (!vs || !fs) return

  const program = gl.createProgram()
  gl.attachShader(program, vs)
  gl.attachShader(program, fs)
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    if (import.meta.env.DEV) {
      console.warn("[lattice]", gl.getProgramInfoLog(program))
    }
    return
  }
  gl.useProgram(program)

  const u: Uniforms = {}
  for (const name of UNIFORM_NAMES) {
    u[name] = gl.getUniformLocation(program, name)
  }

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
  const coarse = window.matchMedia("(pointer: coarse)")
  const { steps, scale } = tier()

  const readScene = () =>
    sceneFor(
      document.body.dataset.scene ?? document.documentElement.dataset.scene,
    )

  const initial = readScene()

  const state = {
    running: false,
    visible: true,
    scroll: 0,
    scrollTarget: 0,
    pointer: [0, 0] as [number, number],
    pointerTarget: [0, 0] as [number, number],
    pointerAmp: coarse.matches || reduced.matches ? 0 : 1,
    dissolve: 0,
    dissolveTarget: 0,
    // The scene is held twice: what is on screen, and where it is heading. Both
    // are lerped every frame so a route change is a move, never a cut.
    scene: { ...initial },
    sceneTarget: { ...initial },
    travel: 0,
    travelTarget: 0,
    start: performance.now(),
    frame: 0,
  }

  const palette = {
    void: tokenRgb("--void", [0.031, 0.047, 0.082]),
    echo: tokenRgb("--echo", [0.086, 0.125, 0.227]),
    glimmer: tokenRgb("--glimmer", [0.227, 0.306, 0.478]),
    mist: tokenRgb("--mist", [0.624, 0.69, 0.8]),
    accent: tokenRgb("--incandescent", [0.961, 0.576, 0.2]),
    ember: tokenRgb("--ember", [1, 0.753, 0.541]),
  }

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const w = Math.max(1, Math.round(canvas.clientWidth * dpr * scale))
    const h = Math.max(1, Math.round(canvas.clientHeight * dpr * scale))
    if (canvas.width === w && canvas.height === h) return
    canvas.width = w
    canvas.height = h
    gl.viewport(0, 0, w, h)
  }

  function readScroll() {
    const max = Math.max(
      1,
      document.documentElement.scrollHeight - window.innerHeight,
    )
    // Absolute progress, not per-page, so the field keeps its place across routes.
    state.scrollTarget = (window.scrollY / max) * 26
  }

  function draw(now: number) {
    const time = (now - state.start) / 1000

    // Inertia. The field always trails the scroll slightly, which is what makes
    // it read as a heavy object rather than a parallax layer.
    state.scroll += (state.scrollTarget - state.scroll) * 0.075
    state.pointer[0] += (state.pointerTarget[0] - state.pointer[0]) * 0.06
    state.pointer[1] += (state.pointerTarget[1] - state.pointer[1]) * 0.06
    state.dissolve += (state.dissolveTarget - state.dissolve) * 0.14

    // The burst decays faster than it builds, so a transition lands rather than
    // drifting back. Scene parameters ride the same clock as the travel.
    const travelEase = state.travelTarget > state.travel ? 0.2 : 0.055
    state.travel += (state.travelTarget - state.travel) * travelEase

    const settle = 0.06
    state.scene.presence = lerp(
      state.scene.presence,
      state.sceneTarget.presence,
      settle,
    )
    state.scene.scale = lerp(state.scene.scale, state.sceneTarget.scale, settle)
    state.scene.heat = lerp(state.scene.heat, state.sceneTarget.heat, settle)
    state.scene.warm = lerp(state.scene.warm, state.sceneTarget.warm, settle)
    state.scene.station = lerp(
      state.scene.station,
      state.sceneTarget.station,
      settle,
    )

    gl.uniform2f(u.uRes, canvas.width, canvas.height)
    gl.uniform1f(u.uTime, reduced.matches ? 0 : time)
    gl.uniform1f(u.uScroll, state.scroll)
    gl.uniform2f(u.uPointer, state.pointer[0], state.pointer[1])
    gl.uniform1f(u.uPointerAmp, state.pointerAmp)
    gl.uniform1f(u.uDissolve, state.dissolve)
    gl.uniform1f(u.uSteps, steps)
    gl.uniform4f(
      u.uScene,
      state.scene.presence,
      state.scene.scale,
      state.scene.heat,
      state.scene.warm,
    )
    gl.uniform1f(u.uStation, state.scene.station)
    gl.uniform4f(
      u.uForm,
      state.scene.cell,
      state.scene.aspect,
      state.scene.hue,
      state.scene.edge,
    )
    gl.uniform1f(u.uTravel, state.travel)
    gl.uniform3fv(u.uVoid, palette.void)
    gl.uniform3fv(u.uEcho, palette.echo)
    gl.uniform3fv(u.uGlimmer, palette.glimmer)
    gl.uniform3fv(u.uMist, palette.mist)
    gl.uniform3fv(u.uAccent, palette.accent)
    gl.uniform3fv(u.uEmber, palette.ember)

    gl.drawArrays(gl.TRIANGLES, 0, 3)
    state.frame += 1
  }

  function loop(now: number) {
    if (!state.running) return
    draw(now)
    requestAnimationFrame(loop)
  }

  function settled() {
    return (
      Math.abs(state.scrollTarget - state.scroll) < 0.002 &&
      Math.abs(state.pointerTarget[0] - state.pointer[0]) < 0.002 &&
      Math.abs(state.dissolveTarget - state.dissolve) < 0.002 &&
      Math.abs(state.travelTarget - state.travel) < 0.002 &&
      Math.abs(state.sceneTarget.station - state.scene.station) < 0.01
    )
  }

  function start() {
    if (state.running || !state.visible) return
    if (reduced.matches) {
      // One frame, then stop. Still the real scene, just held still.
      resize()
      draw(performance.now())
      return
    }
    state.running = true
    requestAnimationFrame(loop)
  }

  function stop() {
    state.running = false
  }

  // --- inputs -------------------------------------------------------------

  resize()
  readScroll()

  const onResize = () => {
    resize()
    readScroll()
    if (reduced.matches) draw(performance.now())
  }

  const onScroll = () => {
    readScroll()
    if (reduced.matches) draw(performance.now())
  }

  const onPointer = (event: PointerEvent) => {
    if (state.pointerAmp === 0) return
    state.pointerTarget[0] = (event.clientX / window.innerWidth) * 2 - 1
    state.pointerTarget[1] = 1 - (event.clientY / window.innerHeight) * 2
  }

  const onVisibility = () => {
    state.visible = !document.hidden
    if (state.visible) start()
    else stop()
  }

  const onMotionChange = () => {
    state.pointerAmp = coarse.matches || reduced.matches ? 0 : 1
    stop()
    start()
  }

  window.addEventListener("resize", onResize, { passive: true })
  window.addEventListener("scroll", onScroll, { passive: true })
  window.addEventListener("pointermove", onPointer, { passive: true })
  document.addEventListener("visibilitychange", onVisibility)
  reduced.addEventListener("change", onMotionChange)
  coarse.addEventListener("change", onMotionChange)

  // Only run frames while the canvas is actually on screen.
  const io = new IntersectionObserver(
    (entries) => {
      state.visible = entries[0].isIntersecting && !document.hidden
      if (state.visible) start()
      else stop()
    },
    { rootMargin: "120px" },
  )
  io.observe(canvas)

  /**
   * Route change as travel.
   *
   * Two halves fired against the same continuous scene, overlapping rather than
   * running in sequence: leaving spins the camera up to speed and thins the
   * lattice, arriving retargets the station and lets it coast back down. The
   * scene is never torn down, so there is nothing to fade between.
   */
  document.addEventListener("astro:before-preparation", () => {
    if (reduced.matches) return
    state.travelTarget = 1
    state.dissolveTarget = 0.45
    start()
  })

  document.addEventListener("astro:after-swap", () => {
    readScroll()
    const next = readScene()
    if (reduced.matches) {
      // No travel: land directly in the new station and hold one frame.
      state.scene = { ...next }
      state.sceneTarget = { ...next }
      state.travel = 0
      state.travelTarget = 0
      state.dissolve = 0
      state.dissolveTarget = 0
      resize()
      draw(performance.now())
      return
    }
    state.sceneTarget = { ...next }
    state.travelTarget = 0
    state.dissolveTarget = 0
    start()
  })

  canvas.dataset.live = "true"
  start()

  return { start, stop, settled }
}
