# CV site guide

Distilled from research on well-regarded senior engineer portfolios and tech
recruiter writeups (sources at the bottom). The job this doc has: give the
content pass a short reference that is not "my taste" but patterns that
multiple sources agree on.

## This site's situation

The PDF is the artifact that enters an ATS and gets passed to the hiring
manager. The website is the "if they check it out" surface a recruiter opens
after the PDF has already done its job. That reframes everything below:

- The site does **not** need to replicate the PDF scan. The PDF did that.
- The site **does** need to look sharper and more credible than the PDF, and
  give a bit more of who the person is than a CV allows.
- The site should stay consistent with the PDF: same name, same role, same
  summary, same employers. A mismatch is a credibility hit.

## The ten-second scan

Every source agrees: a recruiter looks at a CV or site for 6–10 seconds
before deciding whether to read more closely. In that window they check:

1. **Name + contact** – first thing. If it is not top-left or top-centre, that
   already costs seconds.
2. **Current role + employer + years** – answers "what level, where, how long".
3. **Positioning line** – answers "what shape of engineer".
4. **Stack keywords** – they skim for the ones the role needs. Not a tag cloud,
   but visible somewhere in the first screen.

The site has 3 and 4 covered; name + contact + role is the tightest part.

## First-viewport checklist

| Element                              | Why                             | Status on this site                                 |
| ------------------------------------ | ------------------------------- | --------------------------------------------------- |
| Name, typographically confident      | Anchor of professional identity | Yes. `Alex Boffey` as display-scale H1              |
| Role / seniority immediately visible | Answers "level" in one second   | Partial. In facts panel below, not next to the name |
| Current employer                     | Answers "where"                 | In facts panel                                      |
| Positioning line                     | One sentence on shape of work   | Yes. Tagline                                        |
| Primary contact                      | Email, LinkedIn                 | In facts panel and footer                           |
| Nav                                  | Simple, no experimentation      | Yes. About only                                     |
| Load fast                            | No framework runtime, no CLS    | Yes. Static Astro, no JS framework                  |

**Recommendation:** promote "Senior Frontend Engineer II at GEEIQ · London" one
tier of prominence: directly under the name, not down in the facts panel.
Research-backed: multiple senior portfolios lead with name + role + "now",
then detail.

## What recurs across the strongest senior sites

- **Restrained visuals.** Motion supports readability, does not perform.
  Lattice / art direction on this site is fine as mood; it was wrong when it
  was the main stage.
- **Credentials → projects → work history → contact.** That section order wins.
  This site has roles-in-full after the header, no projects card wall. Fine
  for a frontend / platform engineer; a mobile/game person would need the wall.
- **Density is OK if it's organised.** The CV page is dense. That is a feature
  if the structure is clear (and the density toggle gives a legible first
  pass).
- **Typography carries the design.** No boxes, no cards. The site already does
  this (hairlines, type scale, no card patterns).
- **An `/about` with a point of view is a signal.** A page with real opinions
  separates experienced engineers from people who filled in a template. On
  this site that is where the voice lives.

## Anti-patterns to avoid

Patterns the research called out as weakening senior credibility:

- Hero section that fills the first screen with no substance (name + animated
  thing + "scroll to see more"). This is what the old portal was doing.
- Project card walls where every card looks the same and nothing is
  prioritised.
- Rule-of-three slogans ("innovate, create, deliver"), vague adjectives
  ("passionate", "driven"), tag-cloud skills blocks.
- Clever navigation that hides where things are.
- Mobile neglect. Recruiters open links on phones.

## Content that reads human vs AI

The signs of AI-generated writing (Wikipedia maintains the canonical list;
patterns matched to the humanizer skill in this repo):

- "The depth is X. Y are part of the same job." Copula avoidance plus
  parallelism. This was in the old tagline and has been replaced.
- "serves as", "stands as", "boasts", "nestled", "pivotal", "a testament to",
  "underscores", "intricate". Reach for these and the whole paragraph
  flattens.
- Perfect rule-of-three ("state, caching, data"). A real list of five or four
  reads human. A list of three reads optimised.
- Negative parallelism ("not just X, it's Y").
- Em-dash overuse. Comma or period is usually fine.
- Promotional language on self-description. Say what you did; the reader
  decides whether it is impressive.

The target voice for this site: short declarative sentences, concrete nouns,
specific numbers, first person when it adds something. The `/about` page's
"How I work" paragraph is the voice to match.

## When the website wins over the PDF

The site should do things a PDF cannot:

- Interactive filtering of the CV by technology (this site already does it).
- Density toggle for recruiter-skim vs engineer-deep (this site already does
  it).
- Writing linked inline. Proof of thinking the CV can only reference.
- A personality surface (/about) the CV cannot carry without becoming
  unprofessional.

If the site is only a prettier CV, the PDF makes it redundant. The site
should earn its existence by offering what the PDF cannot.

## Sources

- [Software Engineer Portfolios: 15+ Well-Designed Examples (sitebuilderreport)](https://www.sitebuilderreport.com/inspiration/software-engineer-portfolios)
- [21 Best Developer & Software Engineer Portfolio Websites (Colorlib)](https://colorlib.com/wp/developer-portfolios/)
- [How to Prepare a Strong Tech Resume (relocateme)](https://relocateme.substack.com/p/how-to-prepare-a-strong-tech-resume)
- [Optimal Resume Format for Senior Software Engineers (QuickApply)](https://blog.quickapply.dev/post/optimal-resume-format-for-senior-software-engineers-the-2026-data-driven-guide)
- [What is above the fold in web design (Wix)](https://www.wix.com/blog/what-is-above-the-fold-in-web-design)
- [Resume Website vs PDF: Which Do Recruiters Want (markdownme)](https://markdownme.com/tools/resume-to-website/resume-website-vs-pdf)
- [Wikipedia: Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing)
