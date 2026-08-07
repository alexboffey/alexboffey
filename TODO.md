# TODO

## 1. Finish the move to Cloudflare (deploy is currently broken)

**The site is not deploying.** Making the repo private cut Netlify's read access:
it uses the legacy webhook integration, the repo has zero deploy keys, so
Cloudflare-fronted Netlify still serves the old Gatsby build. GitHub delivers the
push event and Netlify accepts it with `204 OK`, then cannot clone.

Everything below is scaffolded and inert until the secrets exist. Deploying from
CI rather than a Git connection means Cloudflare never needs read access to the
private repo, which is what broke Netlify.

- [ ] **Fix GitHub Actions first, or nothing runs.** The CI run for the rebuild
      sat queued 15 minutes and was cancelled with zero steps, which is what
      happens when a private repo has no Actions minutes available. Check
      Settings > Billing > Spending limit, and whether the plan includes minutes
      for private repos. Nothing else in this list works until a job can get a
      runner.
- [ ] **Create a Cloudflare API token.** My Profile > API Tokens > Create Token,
      using the _Edit Cloudflare Workers_ template. Scope it to the one account.
- [ ] **Find the account ID.** Any zone's overview page, right-hand column, or
      Workers & Pages > the URL contains it.
- [ ] **Add both as repo secrets.** Settings > Secrets and variables > Actions:
      `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`. The deploy job reads
      exactly these two names.
- [ ] **First deploy.** Push to `master`, or run the CI workflow manually
      (`workflow_dispatch` is enabled). It deploys only after lint, typecheck,
      build and the 28 smoke tests pass, and it deploys the exact artifact that
      was verified rather than rebuilding.
- [ ] **Check the workers.dev URL** before touching DNS:
      `alexboffey.<subdomain>.workers.dev`. Confirm the lattice renders, `/cv/`
      resolves, and the 404 page works.
- [ ] **Attach the custom domain.** Either uncomment the `routes` block in
      `wrangler.jsonc` and redeploy, or add it in the dashboard under the Worker's
      Settings > Domains & Routes. The zone is already on Cloudflare, so this is
      a domain attachment rather than a nameserver change.
- [ ] **Verify the headers actually apply.** `curl -sI https://alexboffey.co.uk/`
      should show the CSP, HSTS and `X-Frame-Options` from `public/_headers`. If
      they are missing, the file did not make it into `dist/`.
- [ ] **Then retire Netlify.** Delete `netlify.toml`, remove the site in Netlify,
      and delete the now-dead `api.netlify.com` webhook from the repo. Kept for
      now only as a fallback if the Cloudflare cutover stalls.
- [ ] **Delete the dead Travis CI webhook** while you are in there. Travis has not
      been used on this repo for years and the hook still fires on every push.

## 2. Repository

- [ ] Rename the primary branch `master` to `main`. Update the branch filters in
      `.github/workflows/ci.yml` (it already accepts both) and the deploy job's
      `if:` condition, which currently checks `refs/heads/master` only.
- [ ] Issue #5 (SEO meta description, opened 2018) is obsolete: it describes a
      fix to `gatsby-config` and `Layout.jsx`, neither of which exists. Astro sets
      a real per-page description. Close it.

## 3. Site follow-ups

Full detail in `docs/critique.md`, in priority order there.

- [ ] Ground tokens (`--ground-strong`, `--ground-soft`) so the five local
      backgrounds stop being five hand-measured alphas.
- [ ] Visual regression snapshots with the canvas masked. Three of the real
      defects in this build were only visible in a screenshot.
- [ ] Finish or revert the CSS Modules migration. Six components are converted,
      the pages are not.
- [ ] Subset the webfonts. 89.7 KB for two faces, and 40-50 KB of that is
      recoverable.
- [ ] Write the real GEEIQ prose if you want the work page to carry more than a
      pointer to the CV.
