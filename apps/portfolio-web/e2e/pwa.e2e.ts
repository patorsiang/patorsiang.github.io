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

test("every icon the manifest references resolves", async ({ request, page }) => {
  const manifest = await (await request.get("/manifest.webmanifest")).json();

  for (const icon of manifest.icons as { src: string; sizes: string }[]) {
    const response = await request.get(icon.src);

    expect(response.status(), `${icon.src} is referenced by the manifest but 404s`).toBe(200);

    // Parse expected dimensions from the sizes string (e.g., "192x192" -> [192, 192]).
    // Stops at the first space or end of string to handle "192x192 any" or "512x512 maskable".
    const sizeMatch = icon.sizes.match(/(\d+)x(\d+)/);
    if (!sizeMatch) {
      throw new Error(`Cannot parse dimensions from sizes="${icon.sizes}" on ${icon.src}`);
    }
    const [, widthStr, heightStr] = sizeMatch;
    const expectedWidth = parseInt(widthStr, 10);
    const expectedHeight = parseInt(heightStr, 10);

    // Decode the image in Chromium and verify its actual dimensions match
    // the manifest declaration. A manifest pointing at the wrong pixel size
    // is broken even if the file exists and is 200 OK.
    await page.goto("/");
    const actualDimensions = await page.evaluate(async (src: string) => {
      const img = new Image();
      img.src = src;
      await img.decode();

      return { width: img.naturalWidth, height: img.naturalHeight };
    }, icon.src);

    expect(
      actualDimensions.width,
      `${icon.src} has naturalWidth ${actualDimensions.width} but manifest declares sizes="${icon.sizes}"`,
    ).toBe(expectedWidth);

    expect(
      actualDimensions.height,
      `${icon.src} has naturalHeight ${actualDimensions.height} but manifest declares sizes="${icon.sizes}"`,
    ).toBe(expectedHeight);
  }
});

test("the document links the manifest", async ({ page }) => {
  await page.goto("/");

  const href = await page.locator('link[rel="manifest"]').first().getAttribute("href");

  expect(href, "Next emitted no manifest link").toBeTruthy();
});
