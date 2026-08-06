#version 300 es
precision highp float;

// ---------------------------------------------------------------------------
// The lattice.
//
// An orthographic camera looking down the (1,1,1) diagonal of a cube grid
// produces exactly the projection in the logo mark: three visible face
// families, each a parallelogram, at 30 degrees. So the mark is not drawn on
// top of this scene, it IS this scene's geometry, and the mark's three flat
// values become the shading model: light on the +Y tops, slate on the +Z
// faces, and the brand orange reserved for the few blocks that run hot.
//
// Raymarched as a domain-repeated box SDF, one evaluation per step. Cells that
// hold no block collapse their box to a point, which is still a valid SDF, so
// there are no holes to guard against; the step clamp below covers the rest.
// ---------------------------------------------------------------------------

uniform vec2 uRes;
uniform float uTime;
uniform float uScroll;
uniform vec2 uPointer;
uniform float uPointerAmp;
uniform float uDissolve;
uniform float uSteps;
// Per-route scene: x = presence threshold, y = block scale, z = heat bias,
// w = warmth bias. Lerped on the CPU, so a route change is a move between
// stations in one continuous field rather than a new scene being built.
uniform vec4 uScene;
// How far along the travel axis this route's station sits.
uniform float uStation;
// Per-route form: x = cell scale, y = block aspect (y/x), z = hue rotation in
// radians, w = edge line gain. This is what makes a station a different *place*
// rather than the same place at a different density.
uniform vec4 uForm;
// Transition burst, 0 at rest. Rushes the camera and smears the field.
uniform float uTravel;
uniform vec3 uVoid;
uniform vec3 uEcho;
uniform vec3 uGlimmer;
uniform vec3 uMist;
uniform vec3 uAccent;
uniform vec3 uEmber;

out vec4 fragColor;

const float CELL = 2.6;
// Every block dimension is capped at 0.62 of its half-cell, so the narrowest
// gap between neighbours is 0.76 of a half-cell. The smallest half-cell any
// station uses is 0.91 world units, giving a worst-case gap of 0.69 — which is
// why STEP_CLAMP sits at 0.5. Change a cell scale and recheck this.
const float FILL = 0.62;
const float STEP_CLAMP = 0.5;
const float FAR = 34.0;

// Cheap Rodrigues rotation about the grey axis: a real hue shift for three
// multiply-adds, so each station can sit at its own point on the wheel without
// leaving the deep-hued ground the world commits to.
vec3 hueRotate(vec3 c, float a) {
  const vec3 k = vec3(0.57735);
  float cosA = cos(a);
  float sinA = sin(a);
  return c * cosA + cross(k, c) * sinA + k * dot(k, c) * (1.0 - cosA);
}

float hash13(vec3 p) {
  p = fract(p * 0.3183099 + vec3(0.1, 0.17, 0.23));
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}

float hash12(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

float sdBox(vec3 p, vec3 b) {
  vec3 q = abs(p) - b;
  return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0);
}

// Blocks drift on a slow swell so the field breathes without any block ever
// leaving its own cell.
// Sparse on purpose. The field has to read as depth and atmosphere with room
// for the type to sit in it, not as a solid wall of cubes.
vec3 blockDims(vec3 cell, float seed, float maxDim) {
  float presence = hash13(cell);
  if (presence < uScene.x) return vec3(0.0);
  float base = mix(0.42, 1.0, hash13(cell + 7.3)) * uScene.y;
  float swell = sin(uTime * 0.35 + seed * 6.2831) * 0.06;
  // Blocks shrink as the field dissolves and again as the camera rushes, so a
  // transition thins the lattice instead of just fading it out.
  float s = clamp(base + swell, 0.08, 1.0) *
    (1.0 - uDissolve * 0.85) *
    (1.0 - uTravel * 0.45) *
    maxDim;
  // The aspect is what turns cubes into towers or plates. Clamped per axis so a
  // tall station can never breach its cell and reintroduce tunnelling.
  return min(vec3(s, s * uForm.y, s), vec3(maxDim));
}

// Pointer displacement: the lattice leans toward the cursor. Falls off with
// distance from the pointer axis so the effect is local, not global.
vec3 warp(vec3 p) {
  if (uPointerAmp <= 0.001) return p;
  vec2 lean = uPointer * uPointerAmp;
  float fade = exp(-length(p.xy - lean * 6.0) * 0.06);
  p.xz += lean * 1.6 * fade;
  p.y += sin(p.x * 0.18 + uTime * 0.4) * 0.35 * uPointerAmp * fade;
  return p;
}

struct Hit {
  float dist;
  vec3 cell;
  vec3 local;
  vec3 dims;
};

Hit map(vec3 p) {
  float cellSize = CELL * uForm.x;
  vec3 w = warp(p);
  vec3 cell = floor(w / cellSize);
  vec3 local = w - cellSize * (cell + 0.5);
  vec3 dims = blockDims(cell, hash13(cell + 3.1), cellSize * 0.5 * FILL);
  Hit h;
  h.cell = cell;
  h.local = local;
  h.dims = dims;
  h.dist = sdBox(local, dims);
  return h;
}

vec3 normalAt(vec3 p, float eps) {
  // Tetrahedral differences: four taps instead of six.
  vec2 k = vec2(1.0, -1.0);
  vec3 n = k.xyy * map(p + k.xyy * eps).dist + k.yyx * map(p + k.yyx * eps).dist +
    k.yxy * map(p + k.yxy * eps).dist + k.xxx * map(p + k.xxx * eps).dist;
  return normalize(n);
}

void main() {
  vec2 uv = (gl_FragCoord.xy * 2.0 - uRes) / min(uRes.x, uRes.y);

  // Orthographic isometric basis. The view direction is fixed for the whole
  // life of the page: the projection never rotates, the world moves through it.
  vec3 dir = normalize(vec3(-1.0, -1.0, -1.0));
  vec3 right = normalize(cross(dir, vec3(0.0, 1.0, 0.0)));
  vec3 up = normalize(cross(right, dir));

  // A wide ortho span keeps individual blocks small, so the field reads as a
  // distant structure rather than furniture in front of the reader.
  float span = mix(16.0, 12.0, smoothstep(0.0, 900.0, uRes.x));
  vec3 origin = vec3(14.0, 14.0, 14.0) + right * uv.x * span + up * uv.y * span;
  // Scroll travels the lattice diagonally across the projection, so blocks
  // enter from the upper right and leave at the lower left.
  origin += vec3(1.0, 0.0, -1.0) * uScroll * 0.85;
  origin += vec3(0.0, -1.0, 0.0) * uScroll * 0.25;
  // Each route sits at its own station down the travel axis, so the field a
  // visitor arrives into is genuinely a different part of the lattice.
  origin += vec3(1.0, 0.6, -1.0) * uStation;
  // The burst: the camera rushes forward and the frame widens slightly, which
  // is what makes a route change read as travel rather than a crossfade.
  origin += vec3(1.0, 0.35, -1.0) * uTravel * 9.0;
  origin += right * uv.x * span * uTravel * 0.22;

  float t = 0.0;
  Hit hit;
  bool found = false;
  int steps = int(uSteps);

  for (int i = 0; i < 128; i++) {
    if (i >= steps) break;
    hit = map(origin + dir * t);
    if (hit.dist < 0.0025) {
      found = true;
      break;
    }
    t += min(hit.dist, STEP_CLAMP);
    if (t > FAR) break;
  }

  vec3 col = uVoid;

  if (found && t <= FAR) {
    vec3 p = origin + dir * t;
    vec3 n = normalAt(p, 0.004);
    float seed = hash13(hit.cell + 3.1);

    // The mark's three values, mapped to the three visible face families.
    float wy = max(n.y, 0.0);
    float wx = max(n.x, 0.0);
    float wz = max(n.z, 0.0);
    float sum = wy + wx + wz;

    // Heat is rare and it is the only place the accent appears. Blocks near
    // the pointer axis run hot too, which is what makes the field feel touched.
    float pointerHeat = uPointerAmp <= 0.001
      ? 0.0
      : smoothstep(7.0, 0.0, length(hit.cell.xz * CELL * uForm.x - uPointer * 14.0));
    float heat =
      smoothstep(0.88 - uScene.z, 0.99 - uScene.z * 0.5, seed) + pointerHeat * 0.7;
    // The burst runs the whole field hot for a moment as it passes.
    heat = clamp(heat + uTravel * 0.5, 0.0, 1.0);

    // Ambient floor. Where the warp turns a normal away from all three lit
    // axes the weighted sum collapses, and without this the block renders as a
    // black hole punched in the field.
    vec3 ambient = uEcho * 0.85;
    vec3 coolTop = uMist * 0.82;
    vec3 warmTop = mix(uMist * 0.82, uEmber, 0.5);
    vec3 lit =
      (mix(coolTop, warmTop, uScene.w) * wy + uGlimmer * wx + uEcho * 1.15 * wz) /
      max(sum, 1e-3);
    vec3 face = mix(ambient, lit, smoothstep(0.0, 0.4, sum));

    vec3 hotLit =
      (mix(uMist * 0.82, uAccent, 0.55) * wy + uAccent * wx +
        uAccent * 0.45 * wz) /
      max(sum, 1e-3);
    vec3 hotFace = mix(ambient, hotLit, smoothstep(0.0, 0.4, sum));
    col = mix(face, hotFace, heat);

    // Edge line. The second-nearest face plane in local space gives the block
    // silhouette its drafted hairline without a second render pass.
    vec3 d = abs(abs(hit.local) - hit.dims);
    float edge = min(min(max(d.x, d.y), max(d.y, d.z)), max(d.x, d.z));
    float line = 1.0 - smoothstep(0.0, 0.03, edge);
    col = mix(
      col,
      mix(uMist * 0.7, uAccent, heat * 0.8),
      line * mix(0.22, 0.7, heat) * uForm.w
    );

    // Contact glow on hot blocks, so the accent reads as emission not paint.
    col += uAccent * heat * 0.12 * (1.0 - wy);
  }

  // Atmosphere. Distance haze into the void, plus a faint accent bloom low in
  // the frame so the ground is never flat black.
  float depth = found ? t : FAR;
  col = mix(col, uVoid, smoothstep(9.0, FAR, depth));
  col += uAccent * (0.05 + uTravel * 0.1) * pow(max(0.0, 1.0 - length(uv * vec2(0.6, 1.0) + vec2(0.0, 0.75))), 3.0);

  // Route dissolve: the field washes out from the bottom of the frame up.
  col = mix(col, uVoid, smoothstep(0.0, 1.0, uDissolve * 1.6 - (uv.y * 0.5 + 0.5) * 0.6));

  // The station's own place on the hue wheel.
  col = hueRotate(col, uForm.z);

  // Fine film grain, animated only while the scene is animating.
  float grain = hash12(gl_FragCoord.xy + fract(uTime) * 371.0) - 0.5;
  col += grain * 0.016;

  fragColor = vec4(col, 1.0);
}
