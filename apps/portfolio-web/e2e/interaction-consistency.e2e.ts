import { expect, test } from "@playwright/test";

/**
 * Covers two small motion-consistency gaps a sitewide sweep found against
 * docs/design/motion-guidelines.md's own "similar components should move
 * in similar ways" principle. See
 * docs/superpowers/specs/2026-08-16-hero-motion-design.md.
 */

test("text links get press feedback like buttons already do", async ({ page }) => {
  await page.goto("/");

  // "See all projects" is a plain TextLink, not a Button. Every TextLink on
  // the site shares the same sharedClassName, so one instance is
  // representative - this is a component-level guarantee, not a
  // per-page one.
  const link = page.getByRole("link", { name: "See all projects" });

  await expect(link).toHaveClass(/motion-safe:active:translate-y-px/);
});

test("under prefers-reduced-motion, text links don't shift when pressed", async ({ page }) => {
  // The class-presence test above only proves the utility is on the
  // element - `motion-safe:` wraps it in
  // @media (prefers-reduced-motion: no-preference), so it should not
  // apply at all under reduced motion, not just apply quickly. Checking
  // that means an actual press, not a computed-style read of a class name.
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const link = page.getByRole("link", { name: "See all projects" });
  const box = await link.boundingBox();
  if (!box) throw new Error("link has no layout box to press");

  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  const transform = await link.evaluate((el) => getComputedStyle(el).transform);
  await page.mouse.up();

  expect(transform).toBe("none");
});
