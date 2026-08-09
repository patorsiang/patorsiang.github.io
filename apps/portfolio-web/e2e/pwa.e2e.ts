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

test("the offline page renders and is not advertised to crawlers", async ({ page, request }) => {
  const response = await page.goto("/offline");

  expect(response?.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(/offline/i);

  // A fallback page is not content. Listing it would send crawlers to a page
  // that only makes sense when the network is gone.
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).not.toContain("/offline");
});

test("the offline banner is absent while online", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("status")).toHaveCount(0);
});

test("the offline banner appears when the browser goes offline", async ({ page, context }) => {
  await page.goto("/");
  await context.setOffline(true);

  await expect(page.getByRole("status")).toContainText(/offline/i);

  await context.setOffline(false);
  await expect(page.getByRole("status")).toHaveCount(0);
});

test.describe("service worker", () => {
  test.use({ serviceWorkers: "allow" });

  test("registers and takes control", async ({ page }) => {
    await page.goto("/");

    const controlled = await page.evaluate(async () => {
      const registration = await navigator.serviceWorker.ready;

      // `ready` resolves the moment the worker becomes the registration's
      // active worker — a step that happens before the `activate` event (and
      // therefore before our `clients.claim()`) has run. On a page's first
      // ever registration this is not a rare race: `controller` is
      // deterministically null at this exact point every time, so wait for
      // `controllerchange` rather than read `controller` synchronously.
      if (!navigator.serviceWorker.controller) {
        await new Promise<void>((resolve) => {
          navigator.serviceWorker.addEventListener("controllerchange", () => resolve(), {
            once: true,
          });
        });
      }

      return Boolean(registration.active) && Boolean(navigator.serviceWorker.controller);
    });

    expect(controlled, "no service worker took control of the page").toBe(true);
  });

  test("precaches only same-origin entries", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => navigator.serviceWorker.ready);

    const foreign = await page.evaluate(async () => {
      const names = await caches.keys();
      const urls: string[] = [];

      for (const name of names) {
        const cache = await caches.open(name);
        for (const request of await cache.keys()) {
          if (new URL(request.url).origin !== location.origin) urls.push(request.url);
        }
      }

      return urls;
    });

    // The sitemap lists absolute production URLs. Precaching them literally
    // would cache the live site as this origin's offline shell — silently, and
    // only off production.
    expect(foreign, `cached entries from another origin: ${foreign.join(", ")}`).toEqual([]);
  });

  test("evicts caches from an older version on activate", async ({ page }) => {
    // Seeded before the worker exists, because activate only runs for a newly
    // installing worker — there is no way to force a re-activation later.
    await page.goto("/offline");
    await page.evaluate(() => caches.open("portfolio-shell-v0"));

    await page.goto("/");
    await page.evaluate(() => navigator.serviceWorker.ready);

    const names = await page.evaluate(() => caches.keys());

    expect(names, "a cache from an older version survived activate").not.toContain(
      "portfolio-shell-v0",
    );
  });
});
