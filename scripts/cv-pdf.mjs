// Render a markdown CV to an A4 PDF using the site's fonts.
// Usage: node scripts/cv-pdf.mjs <input.md> [output.pdf]
//
// Handles the subset of markdown the CV uses: headings (# to ###), bullet
// lists, bold, inline code, `---` rules (dropped, sections carry the spacing)
// and paragraphs. Consecutive lines in a paragraph keep their line breaks.

import { readFile, writeFile, mkdtemp } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join, resolve, dirname, basename } from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"
import { chromium } from "playwright"

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const fontUrl = (file) => pathToFileURL(join(root, "public/fonts", file)).href

const [input, outputArg] = process.argv.slice(2)
if (!input) {
  console.error("Usage: node scripts/cv-pdf.mjs <input.md> [output.pdf]")
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

const toHtml = (markdown) => {
  const out = []
  let paragraph = []
  let list = []

  const flush = () => {
    if (paragraph.length)
      out.push(`<p>${paragraph.map(inline).join("<br>")}</p>`)
    if (list.length)
      out.push(
        `<ul>${list.map((item) => `<li>${inline(item)}</li>`).join("")}</ul>`,
      )
    paragraph = []
    list = []
  }

  for (const raw of markdown.split("\n")) {
    const line = raw.trimEnd()
    const heading = line.match(/^(#{1,3}) (.+)$/)
    if (heading) {
      flush()
      const level = heading[1].length
      out.push(`<h${level}>${inline(heading[2])}</h${level}>`)
    } else if (line.startsWith("- ")) {
      if (paragraph.length) flush()
      list.push(line.slice(2))
    } else if (line === "" || line === "---") {
      flush()
    } else {
      if (list.length) flush()
      paragraph.push(line)
    }
  }
  flush()
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
@page { size: A4; margin: 15mm 16mm; }
* { box-sizing: border-box; }
body {
  margin: 0;
  font-family: "Archivo", sans-serif;
  font-size: 9.5pt;
  line-height: 1.42;
  color: #151515;
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
h1 + p { margin-top: 0; color: #444; }
h1 + p strong { color: #151515; }
h2 {
  font-family: "Anybody", sans-serif;
  font-size: 9pt;
  font-weight: 600;
  font-stretch: 90%;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border-bottom: 0.75pt solid #151515;
  padding-bottom: 2pt;
  margin: 14pt 0 6pt;
  break-after: avoid;
}
h3 {
  font-size: 11pt;
  font-weight: 650;
  margin: 10pt 0 2pt;
  break-after: avoid;
}
p { margin: 0 0 5pt; }
strong { font-weight: 600; }
ul { margin: 0 0 6pt; padding-left: 12pt; }
li { margin: 0 0 2.5pt; padding-left: 1pt; break-inside: avoid; }
li::marker { color: #777; }
code { font-family: inherit; font-weight: 500; }
p:has(+ ul) { break-after: avoid; }
`

const markdown = await readFile(resolve(input), "utf8")
const html = `<!doctype html><html lang="en-GB"><head><meta charset="utf-8">
<title>${escape(basename(output, ".pdf"))}</title><style>${css}</style></head>
<body>${toHtml(markdown)}</body></html>`

const dir = await mkdtemp(join(tmpdir(), "cv-pdf-"))
const htmlPath = join(dir, "cv.html")
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
