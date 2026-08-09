import { test, expect } from "@playwright/test";

/**
 * A manifest that is valid JSON but points at a missing icon is a broken
 * install that no schema check would catch, so the icons are fetched rather
 * than merely read.
 */

test("the manifest is served and complete", async ({ request }) => {
  const response = await request.get("/manifest.webmanifest");

  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("manifest");

  const manifest = await response.json();

  expect(manifest.name).toBeTruthy();
  expect(manifest.short_name).toBeTruthy();
  expect(manifest.start_url).toBe("/");
  expect(manifest.display).toBe("standalone");

  const sizes = manifest.icons.map((icon: { sizes: string }) => icon.sizes);
  expect(sizes).toContain("192x192");
  expect(sizes).toContain("512x512");
  expect(
    manifest.icons.some((icon: { purpose?: string }) => icon.purpose === "maskable"),
    "no maskable icon — Android will letterbox the icon on a white tile",
  ).toBe(true);
});

test("every icon the manifest references resolves", async ({ request }) => {
  const manifest = await (await request.get("/manifest.webmanifest")).json();

  for (const icon of manifest.icons as { src: string }[]) {
    const response = await request.get(icon.src);

    expect(response.status(), `${icon.src} is referenced by the manifest but 404s`).toBe(200);
  }
});

test("the document links the manifest", async ({ page }) => {
  await page.goto("/");

  const href = await page.locator('link[rel="manifest"]').first().getAttribute("href");

  expect(href, "Next emitted no manifest link").toBeTruthy();
});
