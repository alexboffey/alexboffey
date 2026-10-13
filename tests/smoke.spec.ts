import { expect, test } from "@playwright/test"

/**
 * These cover the things that actually broke during the build, rather than
 * restating that pages return 200:
 *  - the CV must be fully readable with JS disabled (it was not; 15 of 22
 *    bullets were hidden behind a click handler)
 *  - the lattice canvas must survive a client-side navigation, since the whole
 *    transition idea depends on the scene never being torn down
 *  - no claim may appear on a page that PRODUCT.md forbids
 */

const ROUTES = ["/", "/about/", "/cover-letter/"]

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

test("the direction contract survives the production build", async ({
  page,
}) => {
  await page.goto("/")
  const html = await page.content()
  expect(html).toContain("3cf70a0a")
})

test("every route reaches contact without leaving the site", async ({
  page,
}) => {
  for (const route of ROUTES) {
    await page.goto(route)
    const mailto = page.locator('a[href^="mailto:"]').first()
    await expect(mailto).toHaveAttribute("href", /alex@alexboffey\.co\.uk/)
  }
})

test("the CV is fully readable with JavaScript disabled", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false })
  const page = await context.newPage()
  await page.goto("/")

  const bullets = page.locator(".role__bullet")
  const total = await bullets.count()
  expect(total).toBeGreaterThan(20)
  for (let i = 0; i < total; i++) {
    await expect(bullets.nth(i)).toBeVisible()
  }
  await context.close()
})

test("the lattice canvas survives a client-side navigation", async ({
  page,
}) => {
  await page.goto("/")
  await page.evaluate(() => {
    const c = document.querySelector("[data-lattice]") as HTMLElement & {
      __marker?: string
    }
    if (c) c.__marker = "persisted"
  })

  await page.getByRole("link", { name: "About", exact: true }).click()
  await expect(page).toHaveURL(/\/about\//)

  const persisted = await page.evaluate(
    () =>
      (
        document.querySelector("[data-lattice]") as HTMLElement & {
          __marker?: string
        }
      )?.__marker,
  )
  expect(persisted).toBe("persisted")
})

test("each route declares its own lattice station", async ({ page }) => {
  const expected: Record<string, string> = {
    "/": "about",
    "/about/": "about",
    "/404/": "lost",
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
