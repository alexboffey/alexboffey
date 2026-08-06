import { expect, test } from "@playwright/test"

/**
 * These cover the things that actually broke during the build, rather than
 * restating that pages return 200:
 *  - the CV must be fully readable with JS disabled (it was not; 15 of 22
 *    bullets were hidden behind a click handler)
 *  - controls must not be double-bound (astro:page-load fires on first load,
 *    which silently cancelled every toggle)
 *  - the lattice canvas must survive a client-side navigation, since the whole
 *    transition idea depends on the scene never being torn down
 *  - no claim may appear on a page that PRODUCT.md forbids
 */

const ROUTES = ["/", "/cv/", "/work/", "/writing/", "/about/"]

for (const route of ROUTES) {
  test(`${route} renders its heading and has no console errors`, async ({
    page,
  }) => {
    const errors: string[] = []
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()))
    page.on("pageerror", (e) => errors.push(e.message))

    await page.goto(route)
    await expect(page.locator("h1")).toBeVisible()
    expect(errors).toEqual([])
  })
}

test("the direction contract survives the production build", async ({ page }) => {
  await page.goto("/")
  const html = await page.content()
  expect(html).toContain("3cf70a0a")
})

test("every route reaches contact without leaving the site", async ({ page }) => {
  for (const route of ROUTES) {
    await page.goto(route)
    const mailto = page.locator('a[href^="mailto:"]').first()
    await expect(mailto).toHaveAttribute("href", /alex@alexboffey\.co\.uk/)
  }
})

test.describe("CV", () => {
  test("is fully readable with JavaScript disabled", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false })
    const page = await context.newPage()
    await page.goto("/cv/")

    // Fail-open: all bullets served visible, script collapses rather than reveals.
    const bullets = page.locator("[data-text]")
    const total = await bullets.count()
    expect(total).toBeGreaterThan(20)
    for (let i = 0; i < total; i++) {
      await expect(bullets.nth(i)).toBeVisible()
    }
    await context.close()
  })

  test("density toggle is bound exactly once", async ({ page }) => {
    await page.goto("/cv/")
    const button = page.getByRole("button", { name: /headlines|full detail/i })
    const visible = () => page.locator("[data-text]:visible").count()

    const before = await visible()
    await button.click()
    const after = await visible()
    // A double-bound handler toggles twice and lands back where it started.
    expect(after).not.toBe(before)

    await button.click()
    expect(await visible()).toBe(before)
  })

  test("the highlight filter finds real content and reports misses", async ({
    page,
  }) => {
    await page.goto("/cv/")
    const filter = page.getByLabel(/highlight a technology/i)
    const status = page.locator("[data-filter-status]")

    await filter.fill("playwright")
    await expect(status).toContainText(/mention/i)

    await filter.fill("cobol")
    await expect(status).toContainText(/no mention/i)
  })
})

test("the lattice canvas survives a client-side navigation", async ({ page }) => {
  await page.goto("/")
  await page.evaluate(() => {
    const c = document.querySelector("[data-lattice]") as HTMLElement & {
      __marker?: string
    }
    if (c) c.__marker = "persisted"
  })

  await page.getByRole("link", { name: "Writing", exact: true }).click()
  await expect(page).toHaveURL(/\/writing\//)

  const persisted = await page.evaluate(
    () =>
      (document.querySelector("[data-lattice]") as HTMLElement & {
        __marker?: string
      })?.__marker,
  )
  expect(persisted).toBe("persisted")
})

test("each route declares its own lattice station", async ({ page }) => {
  const expected: Record<string, string> = {
    "/": "portal",
    "/work/": "work",
    "/writing/": "writing",
    "/about/": "about",
  }
  for (const [route, scene] of Object.entries(expected)) {
    await page.goto(route)
    await expect(page.locator("body")).toHaveAttribute("data-scene", scene)
  }
})

test("no page makes a claim PRODUCT.md forbids", async ({ page }) => {
  const forbidden = [/under NDA/i, /a dozen product teams/i, /token pipeline/i]
  for (const route of ROUTES) {
    await page.goto(route)
    const text = await page.locator("body").innerText()
    for (const pattern of forbidden) {
      expect(text).not.toMatch(pattern)
    }
  }
})

test("reduced motion holds the scene still", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "reduce" })
  const page = await context.newPage()
  await page.goto("/")
  await expect(page.locator("h1")).toBeVisible()
  // The trailing cursor must not exist at all under reduced motion.
  await expect(page.locator("[data-trail]")).toBeHidden()
  await context.close()
})
