import { test, expect } from "@playwright/test";

test("the index lists every post, newest first", async ({ page }) => {
  await page.goto("/posts");

  const headings = await page.locator("article h2").allTextContents();

  expect(headings.length).toBeGreaterThanOrEqual(3);

  const dates = await page
    .locator("article time")
    .evaluateAll((nodes) => nodes.map((node) => node.getAttribute("datetime") ?? ""));
  const sorted = [...dates].toSorted((a, b) => b.localeCompare(a));

  expect(dates, "posts are not in newest-first order").toEqual(sorted);
});

test("a post renders its body", async ({ page }) => {
  await page.goto("/posts/bkkjs-summer-2026");

  await expect(page.getByRole("heading", { level: 1 })).toContainText(/BKK\.js/i);
  await expect(page.locator(".post-body")).toContainText(/Bangkok/i);
});

test("the title is not rendered twice", async ({ page }) => {
  await page.goto("/posts/bkkjs-summer-2026");

  // Front matter supplies the h1; the body's own h1 is stripped.
  await expect(page.locator("h1")).toHaveCount(1);
});

test("an unknown slug 404s", async ({ page }) => {
  const response = await page.goto("/posts/not-a-real-post");

  expect(response?.status()).toBe(404);
});

// img-src is 'self' data: blob:, so a missed vendoring renders as a blocked
// image that nobody notices until someone opens the console.
test("every image in a post body is same-origin", async ({ page }) => {
  await page.goto("/posts/bkkjs-summer-2026");

  const foreign = await page
    .locator(".post-body img")
    .evaluateAll((images) =>
      images
        .map((image) => (image as HTMLImageElement).src)
        .filter((src) => new URL(src).origin !== location.origin),
    );

  expect(foreign, `post images from another origin: ${foreign.join(", ")}`).toEqual([]);
});

test("Thai paragraphs are marked up as Thai", async ({ page }) => {
  await page.goto("/posts/bkkjs-summer-2026");

  const thai = page.locator('.post-body [lang="th"]');

  await expect(thai.first(), "no Thai passage carries lang=th").toBeVisible();
});

test("posts appear in the sitemap", async ({ request }) => {
  const body = await (await request.get("/sitemap.xml")).text();

  expect(body).toContain("/posts");
  expect(body).toContain("/posts/bkkjs-summer-2026");
});
