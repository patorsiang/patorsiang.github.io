# PWA Offline Shell Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `apps/portfolio-web` installable and fully usable offline, without ever serving a returning visitor stale content while pretending it is live.

**Architecture:** A Next `manifest.ts` file route plus a hand-written `public/sw.js`. The worker precaches the URLs listed in `/sitemap.xml` (reduced to same-origin pathnames), then serves each request type with a different strategy: network-first for documents, cache-first only for content-hashed static assets, stale-while-revalidate for images, never for the CV export routes. A client component registers the worker in production only; another shows a banner whenever the browser reports offline.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind v4, TypeScript, Bun, Playwright. No new dependencies.

## Global Constraints

- Spec: `docs/superpowers/specs/2026-08-09-pwa-offline-shell-design.md`. Read it before starting.
- **Precache pathnames, never the sitemap's absolute URLs.** The sitemap contains `https://patorsiang.github.io/...` built from `siteUrl`. Fetching those literally from a preview deploy or `localhost` caches the production site as this origin's offline shell. Always `new URL(loc).pathname`.
- Colours come from `BRAND_COLORS` in `@/lib/brand`, which currently exports exactly: `accentLight`, `accentDark`, `pageLight`, `onAccentLight`, `textStrongLight`, `textMutedLight`. Do not add keys unless a task says to.
- Tailwind custom properties use the shorthand `bg-(--color-x)`, never `bg-[var(--color-x)]`.
- Never cache `/cv/export/*` — those are per-request downloads driven by query parameters.
- No new dependencies. No `skipWaiting`.
- Four accessibility suites sweep every route: tap targets ≥40px, contrast ≥4.5:1 text and ≥3:1 rings in both themes, focus rings ≥2px, and nothing animating under `prefers-reduced-motion` or looping forever. New UI is checked automatically the moment it exists. If one fails, fix the UI — never the suite.
- `bun run format`, `lint`, `typecheck`, `test` run from the repo root. `test:e2e` runs with `--cwd apps/portfolio-web`.
- The e2e suite currently has 178 tests. None may break.

---

### Task 1: Web app manifest

**Files:**

- Create: `apps/portfolio-web/src/app/manifest.ts`
- Create: `apps/portfolio-web/e2e/pwa.e2e.ts`

**Interfaces:**

- Consumes: `BRAND_COLORS` from `@/lib/brand`; `siteName`, `defaultDescription` from `@/lib/seo`; the committed icons at `public/icons/icon-192.png`, `icon-512.png`, `icon-maskable-512.png`.
- Produces: `/manifest.webmanifest`, and the `<link rel="manifest">` Next emits from it.

- [ ] **Step 1: Write the failing tests**

Create `apps/portfolio-web/e2e/pwa.e2e.ts`:

```ts
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
```

- [ ] **Step 2: Run them and confirm they fail**

Run: `bun run --cwd apps/portfolio-web test:e2e --project=mobile e2e/pwa.e2e.ts`
Expected: all three FAIL — `/manifest.webmanifest` 404s.

- [ ] **Step 3: Write the manifest**

Create `apps/portfolio-web/src/app/manifest.ts`:

```ts
import type { MetadataRoute } from "next";

import { BRAND_COLORS } from "@/lib/brand";
import { defaultDescription, siteName } from "@/lib/seo";

export const dynamic = "force-static";

/**
 * A manifest carries one theme_color, but the accent differs by theme
 * (#0f766e light, #5eead4 dark). The light accent is used because the install
 * surface and splash screen are light-first. Varying the browser chrome by
 * theme needs a <meta name="theme-color" media="..."> pair, which a manifest
 * cannot express — noted in the spec as a follow-up.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteName,
    short_name: "Patorsiang",
    description: defaultDescription,
    start_url: "/",
    display: "standalone",
    background_color: BRAND_COLORS.pageLight,
    theme_color: BRAND_COLORS.accentLight,
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
```

- [ ] **Step 4: Run the tests and confirm they pass**

Run: `bun run --cwd apps/portfolio-web test:e2e e2e/pwa.e2e.ts`
Expected: all pass on both projects.

- [ ] **Step 5: Prove the icon test can fail**

Temporarily change `icon-192.png` to `icon-192-nope.png` in the manifest, re-run, and confirm the icon test FAILS naming that path while the other two still pass. Restore it. A manifest test that only reads JSON would have missed this.

- [ ] **Step 6: Run the full suite and commit**

```bash
bun run --cwd apps/portfolio-web test:e2e
bun run format && bun run lint && bun run typecheck
git add apps/portfolio-web/src/app/manifest.ts apps/portfolio-web/e2e/pwa.e2e.ts
git commit -m "feat(pwa): add the web app manifest

Consumes the icon set the brand project already committed, so nothing new
is drawn. Colours come from BRAND_COLORS rather than fresh literals.

The icon test fetches every src rather than reading the JSON: a manifest
pointing at a missing file is valid JSON and a broken install, which no
schema check catches. Verified by pointing it at a wrong filename and
watching only that test fail."
```

---

### Task 2: Offline page and the offline banner

**Files:**

- Create: `apps/portfolio-web/src/app/offline/page.tsx`
- Create: `apps/portfolio-web/src/components/molecules/OfflineBanner.tsx`
- Modify: `apps/portfolio-web/src/app/layout.tsx` (mount the banner)
- Modify: `apps/portfolio-web/e2e/pwa.e2e.ts` (append)

**Interfaces:**

- Produces: the route `/offline`, and `OfflineBanner`, a client component taking no props.
- The banner is mounted once in the root layout so it covers every route, including `/offline` consumers that do not use `PageShell`.

- [ ] **Step 1: Write the failing tests**

Append to `apps/portfolio-web/e2e/pwa.e2e.ts`:

```ts
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
```

- [ ] **Step 2: Run them and confirm they fail**

Run: `bun run --cwd apps/portfolio-web test:e2e --project=mobile e2e/pwa.e2e.ts`
Expected: the offline-page test FAILS with a 404; both banner tests FAIL because no `role="status"` element exists.

- [ ] **Step 3: Write the banner**

Create `apps/portfolio-web/src/components/molecules/OfflineBanner.tsx`:

```tsx
"use client";

import { useEffect, useState } from "react";

/**
 * Tells the visitor that what they are reading came from cache.
 *
 * This is the honest half of a full offline shell: the service worker will
 * happily serve a page saved days ago, and without this there is no way to
 * tell that from a live one.
 *
 * No dismiss control on purpose — a button would need a 40px tap target to
 * satisfy the design system, for no benefit. No transition either: the
 * reduced-motion suite forbids motion a user did not ask for, and a banner
 * that slides in while you are trying to read is exactly that.
 */
export function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const sync = () => setIsOffline(!navigator.onLine);

    // Read once on mount: the browser may already be offline before any event
    // fires, and rendering nothing in that case is the bug this exists to fix.
    sync();

    window.addEventListener("online", sync);
    window.addEventListener("offline", sync);

    return () => {
      window.removeEventListener("online", sync);
      window.removeEventListener("offline", sync);
    };
  }, []);

  if (!isOffline) {
    return null;
  }

  return (
    <div
      role="status"
      className="border-b border-(--color-border) bg-(--color-surface-muted) px-6 py-2 text-center text-sm text-(--color-text-muted) print:hidden sm:px-8 lg:px-10"
    >
      You&rsquo;re offline &mdash; showing a saved copy, which may be out of date.
    </div>
  );
}
```

- [ ] **Step 4: Write the offline page**

Create `apps/portfolio-web/src/app/offline/page.tsx`:

```tsx
import type { Metadata } from "next";

import { ButtonLink } from "@/components/atoms/ButtonLink";

export const metadata: Metadata = {
  title: "Offline",
  robots: { index: false, follow: false },
};

export default function Offline() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-(--color-accent)">Offline</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
          You&rsquo;re offline
        </h1>
        <p className="mt-6 max-w-prose text-base leading-7 text-(--color-text-muted)">
          This page was not saved for offline reading. Pages you have already visited are still
          available, and everything comes back when the connection does.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <ButtonLink href="/" variant="primary">
            Go to the homepage
          </ButtonLink>
          <ButtonLink href="/en/cv/fullstack-engineer">Open the CV</ButtonLink>
        </div>
      </div>
    </main>
  );
}
```

It deliberately does not use `PageShell`: `GlobalNav` and `SiteFooter` link to routes that may not be cached, and offering links that fail is worse than offering two that are precached.

- [ ] **Step 5: Mount the banner in the root layout**

In `apps/portfolio-web/src/app/layout.tsx`, add the import beside the existing ones:

```tsx
import { OfflineBanner } from "@/components/molecules/OfflineBanner";
```

and render it as the first element inside `<body>`, immediately before `{children}` and after the theme bootstrap `<script>`:

```tsx
<OfflineBanner />
```

- [ ] **Step 6: Run the tests and confirm they pass**

Run: `bun run --cwd apps/portfolio-web test:e2e e2e/pwa.e2e.ts`
Expected: all pass.

- [ ] **Step 7: Run the full suite — this is the real check**

Run: `bun run --cwd apps/portfolio-web test:e2e`

The four accessibility suites now sweep `/offline` and the banner automatically. If contrast, a tap target, a focus ring or reduced motion fails, fix the UI — do not touch the suites. Report anything that failed and what you changed.

- [ ] **Step 8: Look at it**

Run `bun run --cwd apps/portfolio-web dev`, open `/offline` at 375px and 1280px in both themes, and confirm the banner renders legibly when you toggle offline in devtools. Stop the dev server. Describe what you saw.

- [ ] **Step 9: Commit**

```bash
bun run format && bun run lint && bun run typecheck
git add apps/portfolio-web/src/app/offline apps/portfolio-web/src/components/molecules/OfflineBanner.tsx \
        apps/portfolio-web/src/app/layout.tsx apps/portfolio-web/e2e/pwa.e2e.ts
git commit -m "feat(pwa): add the offline page and the offline banner

The banner is the honest half of a full offline shell. The worker will
serve a page saved days ago; without this there is no way to tell that
from a live one.

No dismiss control - it would need a 40px tap target for no benefit - and
no transition, because the reduced-motion suite forbids motion nobody
asked for and a banner sliding in while you read is exactly that.

The offline page does not use PageShell: the nav and footer link to routes
that may not be cached, and offering links that fail is worse than
offering two that are precached. It is also excluded from the sitemap and
marked noindex, because a fallback is not content."
```

---

### Task 3: The service worker, registration, and test isolation

**Files:**

- Create: `apps/portfolio-web/public/sw.js`
- Create: `apps/portfolio-web/src/components/molecules/ServiceWorkerRegistration.tsx`
- Modify: `apps/portfolio-web/src/app/layout.tsx` (mount the registration)
- Modify: `apps/portfolio-web/playwright.config.ts` (block service workers by default)
- Modify: `apps/portfolio-web/e2e/pwa.e2e.ts` (append)

**Interfaces:**

- Produces: `/sw.js` at origin scope; `ServiceWorkerRegistration`, a client component taking no props that renders `null`.
- Cache names are `portfolio-shell-v1`, `portfolio-pages-v1`, `portfolio-assets-v1`. The `portfolio-` prefix and `-v<N>` suffix are the contract `activate` uses to decide what to delete.

- [ ] **Step 1: Isolate the rest of the suite first**

In `apps/portfolio-web/playwright.config.ts`, change the shared `use` block to:

```ts
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    // A service worker can serve a cached response inside an unrelated spec,
    // so an assertion passes without ever touching the app. That failure is
    // invisible — the suite goes green either way. Every spec runs with
    // workers blocked; pwa.e2e.ts opts back in.
    serviceWorkers: "block",
  },
```

Do this before writing the worker, so no existing spec is ever run with a worker active.

- [ ] **Step 2: Write the failing tests**

Append to `apps/portfolio-web/e2e/pwa.e2e.ts`:

```ts
test.describe("service worker", () => {
  test.use({ serviceWorkers: "allow" });

  test("registers and takes control", async ({ page }) => {
    await page.goto("/");

    const controlled = await page.evaluate(async () => {
      const registration = await navigator.serviceWorker.ready;
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
```

If `test.use({ serviceWorkers: "allow" })` fails to typecheck, do not weaken the test: add a dedicated Playwright project with `serviceWorkers: "allow"` and a `testMatch` for `pwa.e2e.ts`, and `testIgnore` it from the other two projects. Report which route you took.

- [ ] **Step 3: Run them and confirm they fail**

Run: `bun run --cwd apps/portfolio-web test:e2e --project=mobile e2e/pwa.e2e.ts`
Expected: the three new tests FAIL — `navigator.serviceWorker.ready` never resolves because `/sw.js` does not exist. Give the run a short timeout so a hanging promise does not stall the suite.

- [ ] **Step 4: Write the worker**

Create `apps/portfolio-web/public/sw.js`:

```js
/*
 * Hand-written service worker. No dependency, no build step.
 *
 * Bump CACHE_VERSION when the caching logic changes. `activate` deletes every
 * cache whose name does not carry the current version, so a bump is the whole
 * eviction mechanism.
 *
 * Deliberately no skipWaiting: a new worker waits for tabs to close. Documents
 * are network-first, so content stays fresh regardless, and waiting avoids
 * swapping content-hashed chunks under a page that is already running.
 */
const CACHE_VERSION = "v1";
const SHELL_CACHE = `portfolio-shell-${CACHE_VERSION}`;
const OFFLINE_URL = "/offline";

/**
 * The routes to precache come from the sitemap, which is already the single
 * source of truth for canonical routes and already has a test asserting every
 * URL in it returns 200. A hand-maintained list here would silently omit every
 * route added after it was written.
 *
 * Only the pathname is used. The sitemap holds absolute production URLs, so
 * fetching them literally from a preview deploy or localhost would cache the
 * live site as this origin's offline shell.
 */
async function precacheRoutes() {
  const cache = await caches.open(SHELL_CACHE);

  await cache.addAll([OFFLINE_URL, "/"]);

  try {
    const response = await fetch("/sitemap.xml");
    if (!response.ok) return;

    const xml = await response.text();
    const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
      .map((match) => {
        try {
          return new URL(match[1].trim()).pathname;
        } catch {
          return null;
        }
      })
      .filter((path) => path !== null);

    // Individually, so one 404 cannot fail the whole install.
    await Promise.all(paths.map((path) => cache.add(path).catch(() => {})));
  } catch {
    // A failed precache degrades the offline experience. It must never stop
    // the worker installing — runtime caching will fill in as the user browses.
  }
}

self.addEventListener("install", (event) => {
  event.waitUntil(precacheRoutes());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const names = await caches.keys();

      await Promise.all(
        names
          .filter((name) => name.startsWith("portfolio-") && !name.endsWith(CACHE_VERSION))
          .map((name) => caches.delete(name)),
      );

      await self.clients.claim();
    })(),
  );
});
```

- [ ] **Step 5: Write the registration component**

Create `apps/portfolio-web/src/components/molecules/ServiceWorkerRegistration.tsx`:

```tsx
"use client";

import { useEffect } from "react";

/**
 * Registers the worker in production only. A service worker under `next dev`
 * caches aggressively and produces "why is my change not showing" confusion;
 * the e2e suite runs against a production build, so it is still exercised.
 */
export function ServiceWorkerRegistration() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;

    navigator.serviceWorker.register("/sw.js").catch((error: unknown) => {
      // Never swallow this silently — a failed registration is the difference
      // between an offline-capable site and one that only looks like it.
      console.error("Service worker registration failed", error);
    });
  }, []);

  return null;
}
```

- [ ] **Step 6: Mount it**

In `apps/portfolio-web/src/app/layout.tsx`, import it beside `OfflineBanner` and render it immediately after `<OfflineBanner />`.

- [ ] **Step 7: Run the tests and confirm they pass**

Run: `bun run --cwd apps/portfolio-web test:e2e e2e/pwa.e2e.ts`
Expected: all pass. If "registers and takes control" times out, check the CSP first — `worker-src` falls back through `child-src` to `script-src`, which is `'self'`, so it should be permitted; if the browser disagrees, add an explicit `worker-src 'self'` to `next.config.ts` and say so in your report.

- [ ] **Step 8: Prove the same-origin test can fail**

Temporarily change the worker to precache `match[1].trim()` instead of `new URL(...).pathname`, re-run, and confirm the same-origin test FAILS listing production URLs. Restore it. This is the sharpest bug in the design and the only test that catches it.

- [ ] **Step 9: Run the full suite and commit**

```bash
bun run --cwd apps/portfolio-web test:e2e
bun run format && bun run lint && bun run typecheck
git add apps/portfolio-web/public/sw.js apps/portfolio-web/playwright.config.ts \
        apps/portfolio-web/src/components/molecules/ServiceWorkerRegistration.tsx \
        apps/portfolio-web/src/app/layout.tsx apps/portfolio-web/e2e/pwa.e2e.ts
git commit -m "feat(pwa): add the service worker, registration and test isolation

Precache comes from the sitemap, already the single source of truth for
canonical routes and already covered by a test asserting every URL in it
returns 200 - so a new route joins the offline shell with no second list
to forget. Only pathnames are used: the sitemap holds absolute production
URLs, and caching those from a preview or localhost would store the live
site as this origin's offline shell. Verified by making it cache the raw
URLs and watching the same-origin test fail.

serviceWorkers: block goes into the shared Playwright config first. A
worker serving a cached response inside an unrelated spec makes the
assertion pass without touching the app, and the suite goes green either
way - the most dangerous failure mode this project could introduce."
```

---

### Task 4: Fetch strategies and offline behaviour

**Files:**

- Modify: `apps/portfolio-web/public/sw.js` (add the `fetch` handler)
- Modify: `apps/portfolio-web/e2e/pwa.e2e.ts` (append)

**Interfaces:**

- Consumes: `SHELL_CACHE`, `OFFLINE_URL`, `CACHE_VERSION` from Task 3.
- Adds `PAGE_CACHE = \`portfolio-pages-${CACHE_VERSION}\`` and `ASSET_CACHE = \`portfolio-assets-${CACHE_VERSION}\``, both matching the `portfolio-\*-v<N>`naming the existing`activate` handler already prunes.

- [ ] **Step 1: Write the failing tests**

Append to the `service worker` describe block in `apps/portfolio-web/e2e/pwa.e2e.ts`:

```ts
test("serves a precached route while offline", async ({ page, context }) => {
  await page.goto("/");
  await page.evaluate(() => navigator.serviceWorker.ready);

  await context.setOffline(true);
  const response = await page.goto("/projects");

  expect(response?.status(), "/projects did not come from cache").toBe(200);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("falls back to the offline page for a route that was never cached", async ({
  page,
  context,
}) => {
  await page.goto("/");
  await page.evaluate(() => navigator.serviceWorker.ready);

  await context.setOffline(true);
  // Deliberately not in the sitemap, so it cannot have been precached.
  await page.goto("/definitely-not-precached");

  await expect(page.getByRole("heading", { level: 1 })).toContainText(/offline/i);
});

test("never caches the CV export downloads", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => navigator.serviceWorker.ready);
  await page.request.get("/cv/export/json?role=fullstack_engineer&lang=en");

  const cachedExports = await page.evaluate(async () => {
    const names = await caches.keys();
    const found: string[] = [];

    for (const name of names) {
      const cache = await caches.open(name);
      for (const request of await cache.keys()) {
        if (new URL(request.url).pathname.startsWith("/cv/export/")) found.push(request.url);
      }
    }

    return found;
  });

  // These are generated per request from query parameters. A cached copy
  // serves the wrong role or language to the next visitor.
  expect(cachedExports, `export routes were cached: ${cachedExports.join(", ")}`).toEqual([]);
});
```

- [ ] **Step 2: Run them and confirm they fail**

Run: `bun run --cwd apps/portfolio-web test:e2e --project=mobile e2e/pwa.e2e.ts`
Expected: the offline navigation tests FAIL — with no `fetch` handler the worker passes everything through to a dead network. The export test may pass vacuously at this point, since nothing is cached yet; note that and continue.

- [ ] **Step 3: Add the fetch handler**

Append to `apps/portfolio-web/public/sw.js`:

```js
const PAGE_CACHE = `portfolio-pages-${CACHE_VERSION}`;
const ASSET_CACHE = `portfolio-assets-${CACHE_VERSION}`;

/** Content-hashed by the build, so a cached entry can never be the wrong version. */
const isImmutableAsset = (url) => url.pathname.startsWith("/_next/static/");

/** Generated per request from query parameters — a cached copy is the wrong answer. */
const isNeverCacheable = (url) => url.pathname.startsWith("/cv/export/");

const isImage = (request, url) =>
  request.destination === "image" || /\.(png|svg|jpg|jpeg|webp|ico)$/.test(url.pathname);

async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);

  try {
    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch {
    const cached = await cache.match(request);
    if (cached) return cached;

    // Only navigations get the offline page; a failed asset should stay failed
    // rather than resolve to an HTML document.
    if (request.mode === "navigate") {
      const shell = await caches.open(SHELL_CACHE);
      const offline = await shell.match(OFFLINE_URL);
      if (offline) return offline;
    }

    throw new Error("offline and not cached");
  }
}

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;

  const response = await fetch(request);
  if (response.ok) cache.put(request, response.clone());
  return response;
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  const network = fetch(request)
    .then((response) => {
      if (response.ok) cache.put(request, response.clone());
      return response;
    })
    .catch(() => cached);

  return cached ?? network;
}

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") return;

  const url = new URL(request.url);

  if (url.origin !== location.origin) return;
  if (isNeverCacheable(url)) return;

  if (isImmutableAsset(url)) {
    event.respondWith(cacheFirst(request, ASSET_CACHE));
    return;
  }

  if (isImage(request, url)) {
    event.respondWith(staleWhileRevalidate(request, ASSET_CACHE));
    return;
  }

  // Documents and everything else: the network is the source of truth, and the
  // cache exists only for when it is genuinely unreachable.
  event.respondWith(networkFirst(request, request.mode === "navigate" ? PAGE_CACHE : SHELL_CACHE));
});
```

- [ ] **Step 4: Run the tests and confirm they pass**

Run: `bun run --cwd apps/portfolio-web test:e2e e2e/pwa.e2e.ts`
Expected: all pass.

- [ ] **Step 5: Prove the offline test is real**

Comment out the `event.respondWith(networkFirst(...))` line, re-run, and confirm "serves a precached route while offline" FAILS. Restore it. An offline test that passes with no handler is testing the browser's HTTP cache, not your worker.

- [ ] **Step 6: Confirm freshness — the whole point of the design**

With the app running, load `/`, then check in devtools that a reload while online issues a real network request for the document rather than serving from `PAGE_CACHE`. Network-first for navigations is the property that stops a returning visitor being stranded on an old build; if it is not actually happening, the design's central claim is false. Describe what you observed.

- [ ] **Step 7: Run the full suite and commit**

```bash
bun run --cwd apps/portfolio-web test:e2e
bun run format && bun run lint && bun run typecheck
git add apps/portfolio-web/public/sw.js apps/portfolio-web/e2e/pwa.e2e.ts
git commit -m "feat(pwa): serve each request type with the right strategy

Full offline without the staleness footgun. Documents are network-first,
so an online visitor always gets fresh HTML and the cache is consulted
only when the network genuinely fails. Cache-first applies solely to
/_next/static, where the build content-hashes filenames and a cached entry
therefore cannot be the wrong version of anything. Images are
stale-while-revalidate. The CV exports are never cached at all - they are
generated per request from query parameters, so a cached copy serves the
wrong role or language to whoever asks next.

Only navigations fall back to the offline page; a failed asset stays
failed rather than resolving to an HTML document, which would otherwise
surface as a bizarre parse error rather than a missing file.

Verified by removing the handler and watching the offline test fail - an
offline test that passes without a fetch handler is testing the browser's
HTTP cache, not the worker."
```

---

## Self-Review

**Spec coverage.** Every "In" item maps to a task: manifest (1), offline page and banner (2), worker and registration (3), Playwright isolation (3), fetch strategies (4), the e2e suite spread across all four. Both spec risks are addressed — `serviceWorkers: "block"` lands in Task 3 Step 1 _before_ the worker exists, and production-only registration is in Task 3 Step 5.

**Placeholders.** None. Every code step is a complete file or an exact insertion; every command runs as written.

**Type consistency.** `CACHE_VERSION`, `SHELL_CACHE`, `OFFLINE_URL` are defined in Task 3 and consumed in Task 4. `PAGE_CACHE` and `ASSET_CACHE` follow the `portfolio-*-v<N>` shape that Task 3's `activate` prunes, so Task 4's caches are evicted by Task 3's logic without further change. `OfflineBanner` and `ServiceWorkerRegistration` both take no props and are mounted in the same place.

**Known risk, flagged not hidden.** `test.use({ serviceWorkers: "allow" })` may not typecheck — the same option-typing problem already hit `reducedMotion` on this branch. Task 3 Step 2 names the fallback (a dedicated Playwright project) rather than leaving the implementer to improvise or, worse, weaken the test.

**Deliberate gap.** Nothing asserts the _banner_ appears on a cached page while offline — only that it appears when offline. Testing the combination needs a cached navigation and an offline context in one test, which is worth doing but belongs with the follow-up that revisits these tests, not here.
