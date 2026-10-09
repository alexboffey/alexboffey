// Render a markdown cover letter to an A4 PDF.
// Usage: node scripts/letter-pdf.mjs <input.md> [output.pdf]
//
// Matches the CV PDF's typography for the name heading and contact line, then
// uses letter-sized body paragraphs. Reads only the body between
// `## The letter` and the next `## ` heading if present, so a letter file can
// carry notes and swap-ins alongside the sendable letter without them leaking
// into the PDF.

import { readFile, writeFile, mkdtemp } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join, resolve, dirname, basename } from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"
import { chromium } from "playwright"

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const fontUrl = (file) => pathToFileURL(join(root, "public/fonts", file)).href

const [input, outputArg] = process.argv.slice(2)
if (!input) {
  console.error("Usage: node scripts/letter-pdf.mjs <input.md> [output.pdf]")
  process.exit(1)
}
const output = resolve(outputArg ?? input.replace(/\.md$/, ".pdf"))

const escape = (text) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

const linkify = (html) =>
  html
    .replace(/([\w.+-]+@[\w-]+(?:\.[\w-]+)+)/g, '<a href="mailto:$1">$1</a>')
    .replace(
      /(^|[\s(])((?:[\w-]+\.)+(?:com|co\.uk|dev|io)(?:\/[\w./-]*)?)(?![^<]*<\/a>)/g,
      '$1<a href="https://$2">$2</a>',
    )

const inline = (text) =>
  linkify(
    escape(text)
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/`(.+?)`/g, "<code>$1</code>"),
  )

// Pull the body between `## The letter` and the next `## ` heading. If no
// section marker is found, the whole file is treated as the body.
const extractBody = (markdown) => {
  const marker = /^##\s+The letter\s*$/m
  const match = markdown.match(marker)
  if (!match) return markdown
  const after = markdown.slice(match.index + match[0].length)
  const end = after.search(/^##\s+/m)
  return (end === -1 ? after : after.slice(0, end)).trim()
}

// Letter structure: an h1 (the name), a contact line, then paragraphs
// separated by blank lines. Headings render once, paragraphs stack. The h1 is
// detected on the first non-blank line; the paragraph that immediately follows
// it is treated as the contact line (dot-separated links).
const toHtml = (markdown) => {
  const out = []
  const paragraphs = markdown
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)

  for (const [index, block] of paragraphs.entries()) {
    const heading = block.match(/^#\s+(.+)$/)
    if (heading) {
      out.push(`<h1>${inline(heading[1])}</h1>`)
      continue
    }
    if (index === 1) {
      out.push(`<p class="contact">${inline(block)}</p>`)
      continue
    }
    const lines = block.split("\n").map((line) => line.trim()).map(inline)
    out.push(`<p>${lines.join("<br>")}</p>`)
  }

  return out.join("\n")
}

const css = `
@font-face {
  font-family: "Anybody";
  src: url("${fontUrl("anybody-var.woff2")}") format("woff2-variations");
  font-weight: 100 900;
  font-stretch: 50% 150%;
}
@font-face {
  font-family: "Archivo";
  src: url("${fontUrl("archivo-var.woff2")}") format("woff2-variations");
  font-weight: 100 900;
}
@page { size: A4; margin: 18mm 20mm; }
* { box-sizing: border-box; }
body {
  margin: 0;
  font-family: "Archivo", sans-serif;
  font-size: 10.5pt;
  line-height: 1.55;
  color: #151515;
  max-width: 170mm;
}
a { color: inherit; text-decoration: none; }
h1 {
  font-family: "Anybody", sans-serif;
  font-size: 24pt;
  font-weight: 650;
  font-stretch: 112%;
  letter-spacing: -0.01em;
  line-height: 1;
  margin: 0 0 6pt;
}
h1 + p.contact {
  margin: 0 0 20pt;
  font-size: 9pt;
  color: #444;
  line-height: 1.4;
}
p { margin: 0 0 11pt; }
strong { font-weight: 600; }
`

const source = await readFile(resolve(input), "utf8")
const body = extractBody(source)
const html = `<!doctype html><html lang="en-GB"><head><meta charset="utf-8">
<title>${escape(basename(output, ".pdf"))}</title><style>${css}</style></head>
<body>${toHtml(body)}</body></html>`

const dir = await mkdtemp(join(tmpdir(), "letter-pdf-"))
const htmlPath = join(dir, "letter.html")
await writeFile(htmlPath, html)

const browser = await chromium.launch({ channel: "chromium" })
try {
  const page = await browser.newPage()
  await page.goto(pathToFileURL(htmlPath).href)
  await page.evaluate(() => document.fonts.ready)
  await page.pdf({
    path: output,
    format: "A4",
    preferCSSPageSize: true,
    printBackground: true,
  })
  console.log(`Wrote ${output}`)
} finally {
  await browser.close()
}
