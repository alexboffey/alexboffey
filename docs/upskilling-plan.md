# Upskilling plan

Written 2026-08-06. Budget: **2-4 hours a week, most weeks.** Four tracks,
sequenced.

This lives in `docs/` and is not served by the site. Astro only publishes
`src/pages` and `public`.

---

## The one rule

**Do not let an agent do the exercise.**

Everything below is chosen because you cannot currently defend it cold. If you
delegate the work, you get the artifact and skip the only thing you were after.
Use agents freely for the day job; keep them out of the study hours.

The corollary, and the reason this plan exists: your bottleneck is not ability,
it is that you have been shipping faster than you can explain. Three concrete
data points from building this repo:

- You directed a raymarched WebGL shader you told me you cannot maintain.
- Your CV carries Kubernetes RBAC, HMAC-verified webhooks, External Secrets and
  Elasticsearch aggregation. You shipped all of it. Can you whiteboard why
  ServiceAccount RBAC beat the n8n dispatch chain, unprompted, in an interview?
- You just asked this site to present you as full stack. That is now a claim a
  backend screen will test.

So every unit below ends in a **defence**: something you can explain to a
sceptical senior engineer without notes. A finished tutorial you cannot explain
scores zero.

## Honest sizing

Four phases at three hours a week is about **sixteen months**. That is the real
number and you should see it before starting, because a plan you quietly abandon
in month three is worse than a smaller plan you finish.

Phase 2 alone is six months and it is the one you actually asked for. If you want
this shorter, the drop order is:

1. **Phase 4 (agentic)** first. You do it daily and get paid for it, so study
   hours buy the least there.
2. **The algorithms unit** in Phase 3.
3. **Phase 1** compressed to just Postgres and API design, if no job search is
   live.

Do not drop Phase 2. And if you only ever do one thing from this document, do the
DDIA practice harness: you own the book, you are already reading it, and the
harness is the difference between having read it and being able to use it.

## How to run it

- **One unit at a time.** Three hours a week is one unit per one to three weeks.
- **Write the defence down** in the vault under `ab/tech/`, matching the folder
  pattern already there. If you cannot write it, you have not finished.
- **Timebox.** A unit that overruns twice gets cut, not extended.
- **Skip anything you can already defend.** Prove it by writing the defence in
  twenty minutes, then move on.

---

# Phase 1: make "full stack" defensible

**Weeks 1-10. Roughly 30 hours.**

**Why first:** it is the only track with external time pressure. The site now
claims full stack and a backend screen will test it. It is also the cheapest
phase, because you have already done the work; this is retrieval and vocabulary,
not new learning.

Strong and defensible already, so do not spend hours here: testing strategy
(Playwright, 6-way sharding, Chromatic, the Cypress migration), frontend
architecture, design systems, CI/CD, monorepo and DX.

### 1.1 Postgres past the ORM (2 units)

Your CV lists SQL and PostgreSQL; the evidenced work is Prisma and tRPC, which is
consuming a database rather than modelling one. Most likely place you get caught.

Your vault already has `n-1-problem-in-databases`,
`choosing-between-sql-and-nosql-databases`,
`database-security-with-row-level-security-rls` and
`optimize-location-based-queries-with-geospatial-indexing`. Those are the
clippings; this is the conversion.

- Model something with real relationships. The GEEIQ domain works: brands,
  worlds, campaigns, time-series metrics. Normalise it, then denormalise one part
  deliberately and be able to say why.
- Read `EXPLAIN ANALYZE` for real. Add an index, watch the plan go from
  sequential scan to index scan, describe what the B-tree is doing.
- Transactions and isolation levels: explain a lost update and a phantom read
  with a concrete example.
- Composite indexes and why column order matters.

**Defence:** given a slow query and its plan, name three plausible causes and the
diagnostic that separates them.

### 1.2 API and service design (2 units)

You have already done this thinking without naming it. The `linear-releases` work
found that a shallow clone computes the wrong commit set, that signalling must
gate on deploy success rather than tests passing, and that `sync` and `complete`
are two ordered calls. That is idempotency, ordering and failure-boundary
reasoning.

Vault: `prevent-duplicate-payments-in-a-system-design` is exactly idempotency, and
`api-types-soap-rest-and-graphql-explained` covers the protocol comparison.

- The vocabulary for what you already do: idempotency keys, at-least-once versus
  exactly-once, retries with backoff and jitter, thundering herd.
- Explain why your switchbox needed per-ticket dedup, in those terms.
- REST versus RPC versus GraphQL as a tradeoff, not a preference. You have shipped
  all three.
- Pagination: offset versus cursor, and why offset breaks at scale.

**Defence:** explain the release signalling contract you built as a distributed
systems problem, naming the failure modes.

### 1.3 Auth, properly (1 unit)

Partial credit already: you built the Linear Agent OAuth trigger path with
HMAC-verified webhooks.

- OAuth 2.0 and OIDC flows, and what the authorisation code grant with PKCE
  protects against.
- Sessions versus JWTs, and the honest tradeoff (revocation).
- Why you verify a webhook signature, and what timing-safe comparison is for.

**Defence:** whiteboard the auth code flow with PKCE and say what each step
prevents.

### 1.4 Caching, the concepts only (1 unit)

Just enough to talk about it; the hands-on version is Phase 2.1, where you have a
lab to try it in. HTTP caching (`Cache-Control`, `ETag`, stale-while-revalidate),
the tiers (CDN, reverse proxy, application, database), and why invalidation is the
hard part.

**Defence:** name where you would cache in the GEEIQ stack and what goes stale
first.

### Phase 1 exit test

A senior engineer who has not seen your CV talks to you for an hour and describes
you afterwards as an engineer who works across the stack. Not as a frontend
engineer who has touched a backend.

---

# Phase 2: system design, databases and data engineering

**Weeks 11-36. Roughly 75 hours. The main event.**

You already own **Designing Data-Intensive Applications** and you are reading it.
So this phase is not a reading list. It is the practice scaffold that the book
does not come with, because reading DDIA without building anything is how most
people get the vocabulary and none of the instinct.

Everything below hangs off a chapter you are going to read anyway.

## First: your vault is already a syllabus

You have **21 notes** in `ab/tech/System Design & Architecture`, plus
`Database Management & Scaling`, `Application Performance & Caching` and
`Core Software Engineering Concepts`. They cover the Instagram feed, Google
Drive, Zoom, chess.com, S3-like storage, BFF, API gateway versus load balancer,
proxies, consistent hashing with virtual nodes, Kafka, nginx, server estimation,
duplicate payments and vertical versus horizontal scaling.

Good coverage. The problem is what they are: nearly every one carries
`category: tech-tip` and a YouTube shorts link. You have a broad map of the
territory at about sixty seconds per topic.

**So the first habit is conversion, not collection.** One note a week: without
reopening it, write the design from memory. Data model, read path, write path,
bottleneck, failure modes. Then reopen and diff. The gap is your real curriculum
and it is specific to you in a way no course can be.

About an hour a week, and it is the highest-value hour in this plan. Put the
results in a new `ab/tech/System Design Worked` folder so you can watch the
collection turn into understanding.

## The practice lab (do this before chapter 1)

The "how do I set this up" gap is real and it is solved once, not repeatedly.
Build yourself a throwaway lab as a single `docker-compose.yml` you can bring up
in one command:

- **Postgres** primary, plus a streaming replica
- **Redis**
- **Kafka** or Redpanda (Redpanda is one container and less pain)
- **MinIO** for S3-compatible object storage
- **Toxiproxy** for injecting latency and partitions
- **Grafana and Prometheus**, or just Grafana with a Postgres source

Two hours, once. Everything below then becomes "bring the lab up and try it"
rather than "spend the session fighting installation". Standing this up yourself
*is* the infrastructure skill you asked for; do not use a managed service for the
lab, because the point is to see the moving parts.

## The DDIA practice harness

One experiment per chapter. Each is 1-3 hours, which is one unit. Read the
chapter, then do the thing, then write the defence. Chapter titles rather than
numbers, because the second edition renumbered.

| DDIA chapter | Experiment | Defence |
|---|---|---|
| Trade-offs in Data Systems Architecture | Write the architecture tradeoffs for GEEIQ's analytics platform as you understand it. One page, three decisions, the alternative for each. | Name a decision that is right for GEEIQ and wrong for a smaller product, and why. |
| Defining Nonfunctional Requirements | Write real SLOs for two systems you own: this site, and nudge-agent. Availability, latency percentiles, error budget. | Explain why p99 matters more than mean, using your own numbers. |
| Data Models and Query Languages | Model one domain three ways in the lab: relational, document (Postgres JSONB), and graph (recursive CTE). Run the same three queries against each. | Say which model wins for which query, and where the document model starts hurting. |
| Storage and Retrieval | **The best exercise in the book.** Write a log-structured key-value store: append-only file, in-memory hash index, ~150 lines. Then add compaction. Then run `EXPLAIN ANALYZE` on an indexed Postgres query and compare what a B-tree does differently. | Explain LSM-tree versus B-tree, and when write amplification decides it. |
| Encoding and Evolution | Use your real nudge-agent trace envelope. Add a field, remove a field, rename one. Break a consumer with JSON. Then do the same with Protobuf or Avro and see what survives. | Explain forward versus backward compatibility with your own envelope as the example. |
| Replication | In the lab: primary plus replica. Measure replication lag. Reproduce read-your-own-writes failing. Then kill the primary and promote. | Explain why your user saw stale data, and the three fixes ranked by cost. |
| Partitioning / Sharding | Partition the analytics project by key, then by range. Generate skewed traffic and watch one partition go hot. Fix it with consistent hashing and virtual nodes. | Explain what virtual nodes solve that plain consistent hashing does not. |
| Transactions | Run concurrent updates in Postgres at each isolation level and observe the anomalies. Reproduce a lost update, then a write skew. | Name the isolation level you need for a given anomaly, and its cost. |
| The Trouble with Distributed Systems | Use Toxiproxy to add 5s latency between your app and Postgres. Watch timeouts cascade. Then partition the network mid-write. | Explain why you cannot distinguish a slow node from a dead one, and what you do about it. |
| Consistency and Consensus | Run a three-node etcd. Kill the leader, watch the election, attempt a write during it. | Explain why exactly-once delivery does not exist and what people mean when they claim it. |
| Batch Processing | Write the nightly rollup for the analytics project. Make it idempotent, then run it twice and prove nothing doubled. | Explain why idempotency matters more than exactly-once. |
| Stream Processing | Same data as a stream through Kafka or Redpanda, with windowed aggregation. Compare results against the batch job. Then feed in late-arriving events. | Explain the batch and stream disagreement you observed, and windowing's role. |

That table is roughly 20 units, so about six months at your budget. It is the
core of the plan and everything else is support.

### 2.1 Caching, hands on (2 units)

Your evidence is client-side only (TanStack Query). The server side is missing,
and your vault's `Application Performance & Caching` folder is unconverted.

- In the lab, put Redis in front of a slow Postgres query. Measure the difference.
- Implement cache-aside, then write-through, and explain when each is right.
- Cause a stampede: expire a hot key and hit it with concurrent requests. Fix it
  with a lock or with stale-while-revalidate.
- Then the HTTP layer, which you already benefit from on a static site without
  having chosen it: `Cache-Control`, `ETag`, stale-while-revalidate, and the tiers
  (CDN, reverse proxy, application, database).
- Invalidation, which is the hard part. There is no clean answer to it and that
  is worth learning early.

**Defence:** name where you would cache in the GEEIQ stack, what goes stale
first, and how you would know.

### 2.2 Data engineering (5 units)

New territory, and the most directly useful to your day job: GEEIQ is a data and
analytics platform and you built its chart layer, which means you consume the
output of a pipeline you did not build.

- **Ingestion.** Batch versus streaming, and the honest answer that most things
  should start as batch.
- **ELT over ETL**, and why the industry moved. Land raw, transform in the
  warehouse.
- **Columnar storage and why analytics is different.** Parquet, and what a
  columnar layout does to a `SUM` over a billion rows. DuckDB locally is the
  fastest way to feel this: it is one dependency and it will change your
  intuitions in an afternoon.
- **Dimensional modelling.** Facts and dimensions, star schema, slowly changing
  dimensions. This is the vocabulary your data team already uses.
- **Transformation as code.** dbt, or the idea of it: models, tests, lineage. Even
  if you never adopt it, the model of "SQL under version control with tests" is
  the point.
- **Orchestration.** Dagster or Airflow, and what a DAG with retries and
  backfills buys you over cron. You have effectively built the cron version at
  GEEIQ.
- **Data quality.** Freshness, completeness, and schema drift as things you alert
  on rather than discover.

**Defence:** design the GEEIQ metrics pipeline end to end, from event to chart,
and say where you would put the warehouse boundary and why.

### 2.3 Capacity estimation (1 unit)

You already have `how-to-estimate-server-needs-for-an-application`. Candidates
skip this and interviewers notice.

Practise going from "one million daily active users" to storage per year, peak
requests per second, and bandwidth, in your head, with defensible round numbers.

**Defence:** size the GEEIQ metrics pipeline out loud in five minutes.

### 2.4 The canonical designs (6 units)

On paper, then diff against your vault note and the
[System Design Primer](https://github.com/donnemartin/system-design-primer)
version. Its Anki decks are worth using for the fundamentals.

Rate limiter, URL shortener, a feed with fan-out, a chat system, a metrics and
time-series pipeline, and a job queue. **Do the last two first:** you have
effectively built both at GEEIQ, so you will discover you know more than you
think, which is worth learning early.

**Defence:** any of the six, cold, in 40 minutes, and you volunteer the
bottleneck before being asked.

### Supporting material, only if you need it

You have the book, so treat everything else as lookup rather than curriculum.
[Ashish Pratap Singh's curated list](https://github.com/ashishps1/awesome-system-design-resources)
is the best-maintained index. Hussein Nasser is genuinely good on the database and
networking layer specifically, which is your weaker half. Gaurav Sen for concept
videos. Skip the paid courses entirely: they exist to substitute for the book you
already own.

### Phase 2 exit test

Two things. Given an unfamiliar prompt you have not prepared, you produce a
coherent design in 40 minutes, name your own bottleneck first, and concede where
your choice is wrong. And separately: you can stand up a replicated Postgres, a
cache and a stream processor from a compose file without looking anything up.

---

## Projects to build

You already have a vault note,
`System Design & Architecture/system-design-projects-to-improve-your-skills.md`,
suggesting three: a distributed load testing platform, a video processing
pipeline, and a distributed job queue. Those are good. Below they are ordered by
concepts-learned-per-hour, with the two that are specific to you first.

Rules that make these worth the time: **small scope, real infrastructure, write
the design before the code, and load-test it until it breaks.** A project that
never breaks taught you nothing. One project per phase is plenty.

Each one is tagged with the DDIA chapters it exercises, so a project doubles as
the practice for a chapter rather than competing with it for the same hours.

### P1. Analytics endpoint for this site (start here)

**Roughly 15 hours. Teaches: ingest, write-heavy storage, aggregation, privacy,
capacity. DDIA: Nonfunctional Requirements, Storage and Retrieval, Batch
Processing.**

The Gatsby build had Google Analytics; the Astro port dropped it and never
replaced it. So this is a real gap you would actually use, on a domain you own.

Build a tiny self-hosted analytics service: a collect endpoint, a store, and a
query API for page views over time. Then make it interesting: handle bot traffic,
decide what you refuse to store on privacy grounds, add a rollup so queries do not
scan raw events, and work out what it costs at your actual traffic.

Why first: small enough to finish, genuinely useful, and it exercises the
write-heavy path your day job does not.

**Stretch:** Cloudflare Workers plus D1 or Durable Objects, which also serves the
`TODO.md` item about migrating this site to Cloudflare.

### P2. Distributed job queue, done properly

**Roughly 25 hours. Teaches: queues, DLQ, retries, backoff, idempotency,
visibility timeouts, at-least-once delivery, worker autoscaling. DDIA: The Trouble
with Distributed Systems, Consistency and Consensus, Stream Processing.**

You have already built a job dispatcher in production: the switchbox creates
Kubernetes Jobs via ServiceAccount RBAC, with per-ticket dedup. Build the general
version and you will retrospectively understand your own system.

Producer, broker, worker pool, dead-letter queue. Then deliberately break it:
duplicate delivery, a worker dying mid-job, a poison message, a thundering herd on
restart. Fix each and write down why the fix works.

This is the single highest-value project on the list for you, because it converts
work you have already shipped into knowledge you can defend.

### P3. Metrics and time-series pipeline

**Roughly 25 hours. Teaches: batch versus stream, windowing, cardinality,
pre-aggregation, query patterns, columnar storage. DDIA: Batch Processing, Stream
Processing, Partitioning. This is also the practical half of the data engineering
units in 2.2.**

This is the GEEIQ domain. Ingest events, aggregate into time buckets, serve
queries over ranges. Then hit the real problems: high-cardinality dimensions,
late-arriving data, and what happens when someone asks for a year at minute
granularity.

Doing this makes you better at your actual job, which the interview practice on
its own will not.

### P4. Rate limiter as a service

**Roughly 10 hours. Teaches: token bucket, sliding window, distributed counters,
Redis, race conditions. DDIA: Transactions, The Trouble with Distributed
Systems.**

Small, high concept density, and the canonical interview question. Implement
several algorithms and compare them under load. Then make it distributed and watch
your counters race.

### P5. Feed with fan-out

**Roughly 20 hours. Teaches: fan-out on write versus read, the celebrity problem,
caching, denormalisation. DDIA: Data Models and Query Languages, Replication,
Partitioning.**

Your vault already has `design-a-scalable-instagram-like-feed-system`. Build it
and find out what the note left out.

### P6. Video processing pipeline

**Roughly 30 hours. Teaches: chunked upload, object storage, queues, long-running
work, progress reporting. DDIA: Encoding and Evolution, Batch Processing.**

From your own note. Biggest and least aligned with your day job, so last. Skip it
without guilt if the budget runs short.

---

# Phase 3: the fundamentals that compound

**Weeks 33-46. Roughly 45 hours.**

Some of this now overlaps Phase 2 and should get faster as a result.

### 3.1 Reading unfamiliar code unaided (ongoing, 30 minutes a week)

The skill agentic development erodes fastest. Pick a repo you use and did not
write; Astro and Playwright are both good candidates. Once a week, trace one
behaviour to source. No agent, no asking.

**Defence:** answer "how does Astro's `transition:persist` actually work?" from
having read it.

### 3.2 Concurrency and async, for real (3 units)

You know the JavaScript event loop. That is one model, and the friendliest. Your
vault has `difference-between-a-process-and-a-thread` and
`explain-multithreading-in-python` to convert.

- Where the event loop stops helping: CPU-bound work, worker threads, and why
  Node's single thread is a design choice with consequences.
- Real parallelism: race conditions, locks, deadlock. Write one deliberately, then
  fix it.
- Backpressure. You have felt this (CI sharding, job queues) without naming it.
- Optional and genuinely useful: enough Go to feel goroutines and channels. Two
  weeks of evenings, and it will change how you write Node.

**Defence:** explain what breaks when two Kubernetes Jobs process the same ticket,
and why your dedup fixed it.

### 3.3 Graphics and the GPU (3 units)

Your own stated gap, and now your own site depends on it. `docs/lattice.md` exists
specifically to make this approachable.

- Work through [The Book of Shaders](https://thebookofshaders.com/), sections 1-6.
- Read `src/shaders/lattice.frag` and modify it unaided: change a station, add a
  new one, adjust the fog.
- Understand SDFs and raymarching well enough to explain why that file contains no
  geometry.
- Understand why the `(1,1,1)` orthographic camera reproduces your logo's
  projection. That is the one original idea in the build, and it is geometry rather
  than graphics programming.

**Defence:** add a seventh station to the lattice alone, and explain the
step-clamp arithmetic you had to respect.

### 3.4 Data structures and algorithms (2 units, deliberately small)

Lower value than the internet implies for a senior role, but hash maps, trees,
graphs and complexity do come up. Twenty problems, then stop. Your vault has
`bloom-filters-explained` which is the genuinely interesting end of this.

**Defence:** state the complexity of your own solution without thinking hard.

### Phase 3 exit test

You debug something unfamiliar, in a domain you do not work in daily, without an
agent, narrating your reasoning as you go.

---

# Phase 4: agentic engineering as a specialism

**Weeks 47-58. Roughly 35 hours.**

**Why last, and argue with me.** You do this daily and get paid for it, so study
hours buy the least marginal skill. It also moves fastest, so learning it later
means learning less obsolete material. The counter-argument is that it is your
differentiator right now and the market is hot. If you think the window closes
before week 47, move it to Phase 1 and push full-stack defensibility back. That is
a legitimate call and only you can price it.

You are genuinely ahead of most engineers here: nudge-agent in production, the
switchbox, dual-trigger architecture, structured trace envelope, Kibana
observability, MCP credential management, worktrees for parallel agents. Your vault
has `AI Agent Development`, `AI Architectures & RAG` and
`Claude agent design pitfalls` already. This phase targets the parts usually
missing, including from your own work.

### 4.1 Evals, which is the actual gap (3 units)

Almost nobody has real evals, and it is the difference between an agent you hope
works and one you can improve. Your CV describes building, triggering and
observing nudge-agent. It does not describe measuring whether the output is good.

- Build an eval set for nudge-agent: tickets with known-good outcomes.
- Grader taxonomy: exact match, rubric, LLM-as-judge, and where each lies to you.
- Why an LLM judge needs its own validation, and how to do it.
- Wire evals into CI so a prompt change has a measurable effect.

**Defence:** state nudge-agent's success rate on a held-out set, and what you
changed to move it.

### 4.2 Context engineering (2 units)

- The context window as a budget: what earns a place, what is noise.
- Retrieval that is not naive RAG. When does chunk-and-embed beat grep, and be
  honest about how often it does not.
- Compaction and what breaks when you compact.
- Structured versus prose context, measured rather than assumed.

**Defence:** two versions of a nudge-agent prompt and the measured difference.

### 4.3 Tool and interface design for agents (2 units)

You have done the hard version: the switchbox is an interface for a
nondeterministic caller.

- What makes a tool description good, and why over-broad tools cause failures.
- Error messages as a control surface: an agent recovers from a good error and
  loops on a bad one.
- Permission and sandboxing models. You touched this with ServiceAccount RBAC.
- Idempotency for agent actions, which is Phase 1.2 again in a new setting.

**Defence:** review a tool schema and predict how an agent will misuse it.

### 4.4 Reliability and cost (2 units)

- Observability for nondeterministic systems. Your trace envelope and Kibana
  dashboard are the foundation; the gap is what you do with them.
- Failure taxonomy: refusal, hallucination, loop, silent wrong answer. The last is
  the dangerous one.
- Cost and latency modelling. What does a nudge-agent run cost, and what drives
  the variance?
- Model migration as an engineering task, with the eval suite as the safety net.

**Defence:** given a nudge-agent run that produced a bad PR, classify the failure
and name the control that would have caught it.

### Phase 4 exit test

You argue for a specific agentic architecture in front of a sceptical staff
engineer, with numbers, and concede where it is the wrong choice.

---

## Deliberately not in this plan

Saying no is most of what makes a three-hour-a-week plan survive.

- **Kubernetes depth.** You use it and have shipped Jobs, RBAC and CronJobs.
  Deeper is a platform engineering career, not yours.
- **Another frontend framework.** React, Svelte and Astro is enough. A fourth
  teaches nothing.
- **Rust.** Interesting, and it would consume this whole budget for a skill you
  have no current use for.
- **ML from first principles.** Building agentic systems does not require training
  models.
- **Certifications.** No senior hiring manager cares.
- **Leetcode grinding.** Twenty problems in Phase 3, then stop.
- **Anything from a tutorial without an artifact.** Watching is not learning.

## Review cadence

Every eight weeks, twenty minutes, three questions:

1. What can I now defend that I could not eight weeks ago?
2. What did I skip, and was skipping it right?
3. Has the phase order stopped making sense?

If the answer to (1) is nothing, the plan is wrong, not you. Cut a track rather
than carrying a plan you are not following.

## Related files in this repo

- `docs/critique.md` holds the codebase findings, several of which are learning
  material in their own right (the CSS Modules blocker, the contrast arithmetic).
- `docs/lattice.md` is the shader handover, and the starting point for Phase 3.3.
- `docs/cv-sources/` has your 2026 and 2022 CVs, copied from the vault as the
  provenance for `src/lib/cv.ts`. **Phone numbers are redacted in these copies.**
  The 2022 one is worth rereading before an interview: it has detail on OrgVue and
  iWeb that the 2026 compression dropped.

## Where the notes go

Defences into `ab/tech/`, one note per unit, matching the folder pattern already
there. Consider a `System Design Worked` folder to keep the from-memory designs
separate from the clipped tips, so you can see the collection turning into
understanding.

The rule from the top applies: if you cannot write the defence in your own words,
the unit is not finished, whatever else got built.
