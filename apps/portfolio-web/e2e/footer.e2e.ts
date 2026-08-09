import { test, expect } from "@playwright/test";

/**
 * "Footer navigation should provide utility access without duplicating every
 * page interaction: GitHub, LinkedIn, Email, CV. [...] Avoid large footer
 * sections, marketing copy, or repeated content blocks."
 * (docs/design/information-architecture.md, Secondary And Footer Navigation)
 *
 * Two properties, and the second is the one a footer tends to lose over time.
 * Reaching the four utility links from anywhere is easy to add; keeping the
 * footer from slowly growing a second copy of the primary nav is the part that
 * needs guarding, because each individual addition looks harmless.
 *
 * The a11y suites already sweep every route, so the footer's tap targets,
 * contrast, focus rings and motion are covered without anything extra here.
 */

/*
 * Deliberately NOT e2e/support/routes.ts, which drives the accessibility
 * sweeps. That list includes /offline and /this-route-does-not-exist, and
 * neither renders PageShell - so neither has a footer, and importing it here
 * would fail on both. Different question, different list.
 */
const routes = [
  "/",
  "/about",
  "/experience",
  "/projects",
  "/contact",
  "/en/cv/fullstack-engineer",
  "/th/cv/fullstack-engineer",
];

/** Primary nav destinations. A footer link to any of these duplicates the nav. */
const primaryNavPaths = ["/about", "/experience", "/projects", "/contact"];

for (const route of routes) {
  test(`${route} has a footer reaching GitHub, LinkedIn, Email and CV`, async ({ page }) => {
    await page.goto(route);

    const footer = page.locator("footer");
    await expect(footer, `${route} renders no footer`).toHaveCount(1);

    const hrefs = await footer
      .locator("a[href]")
      .evaluateAll((links) => links.map((link) => link.getAttribute("href") ?? ""));

    expect(
      hrefs.some((h) => /github\.com/i.test(h)),
      `${route} footer has no GitHub link`,
    ).toBe(true);
    expect(
      hrefs.some((h) => /linkedin\.com/i.test(h)),
      `${route} footer has no LinkedIn link`,
    ).toBe(true);
    expect(
      hrefs.some((h) => /^mailto:/i.test(h)),
      `${route} footer has no email link`,
    ).toBe(true);
    expect(
      hrefs.some((h) => /\/cv/i.test(h)),
      `${route} footer has no CV link`,
    ).toBe(true);
  });
}

test("the footer does not duplicate the primary navigation", async ({ page }) => {
  await page.goto("/");

  const hrefs = await page
    .locator("footer")
    .locator("a[href]")
    .evaluateAll((links) => links.map((link) => link.getAttribute("href") ?? ""));

  const duplicated = hrefs.filter((href) => primaryNavPaths.includes(href));

  expect(
    duplicated,
    `The footer links to primary nav destinations, which the IA rules out: ${duplicated.join(", ")}`,
  ).toEqual([]);
});

test("the footer stays small", async ({ page }) => {
  await page.goto("/");

  const count = await page.locator("footer").locator("a[href]").count();

  // Four utility links, plus room for the IA's "optional source repository or
  // project links when useful". Past that it is a footer section, which the IA
  // explicitly rules out.
  expect(count, "footer has grown beyond utility links").toBeLessThanOrEqual(6);
  expect(count).toBeGreaterThanOrEqual(4);
});

test("the footer is not printed on the CV", async ({ page }) => {
  await page.goto("/en/cv/fullstack-engineer");
  await page.emulateMedia({ media: "print" });

  // The CV sheet is laid out for paper; a set of tappable utility links is
  // noise there, and GlobalNav already hides itself the same way.
  await expect(page.locator("footer")).toBeHidden();
});
