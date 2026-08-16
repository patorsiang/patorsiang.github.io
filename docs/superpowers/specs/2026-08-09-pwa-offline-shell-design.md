# PWA offline shell — design

Date: 2026-08-09
Status: awaiting review
Branch: `feat/portfolio-platform-2026`
Follows: `2026-08-09-brand-mark-and-portrait-design.md`, which produced the icon set this consumes.

## Problem

`apps/portfolio-web` has no manifest and no service worker. It cannot be installed, and it is unusable without a network connection.

The brand project already committed everything the icon half needs: `public/icons/icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, plus `src/app/apple-icon.png` and `src/app/icon.svg`. Nothing new has to be drawn.

One constraint is already settled and is not open for reconsideration here: portfolio-web cannot be statically exported. It has two route handlers that read query parameters (`/cv/export/json`, `/cv/export/markdown`), a `headers()` block carrying the CSP, and `redirect()` calls in the `/cv` routes. It deploys to Vercel. GitHub Pages hosts `legacy-v1` only.

Worth recording so nobody plans around it: **Lighthouse removed its PWA category in v12 (2024).** There is no PWA score or badge to target. This work has to justify itself on behaviour, not on a number. Verify against current tooling before relying on either reading.

## Decisions

Chosen by the repo owner during brainstorming on 2026-08-09.

| Decision         | Choice                                            | Reasoning                                                                                                                                                                                                                     |
| ---------------- | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Scope            | **Full offline shell**, not installability alone  | Chosen with the staleness risk stated explicitly. The design's job is to deliver it without the footgun, not to relitigate it.                                                                                                |
| Implementation   | **Hand-written service worker**, no dependency    | Matches the repo's demonstrated habit — the brand project hand-rolled an ICO encoder rather than install one. Roughly 120 lines, readable end to end, explainable in an interview. The cost is owning cache correctness.      |
| Offline UX       | **`/offline` page plus a banner on cached pages** | The honest answer to full-offline caching: tell the visitor they are reading a saved copy rather than pass it off as live.                                                                                                    |
| Worker lifecycle | **No `skipWaiting`**                              | A new worker waits for tabs to close. Documents are network-first, so content stays fresh regardless; only the caching logic lags a session. This avoids swapping content-hashed chunks under a page that is already running. |

### The staleness problem, and why this design does not have it

Precaching every route is the standard way to strand a returning visitor on an old build. On a site whose entire purpose is showing current work, that is a real cost, not a theoretical one.

It is avoided by choosing a strategy per resource type rather than one strategy for everything:

| Request                                                                       | Strategy                           | Why                                                                                                                        |
| ----------------------------------------------------------------------------- | ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Navigations (`request.mode === "navigate"`)                                   | Network-first → cache → `/offline` | An online visitor always gets fresh HTML. The cache is consulted only when the network genuinely fails.                    |
| `/_next/static/*`                                                             | Cache-first                        | Content-hashed by the build. A new deploy produces new URLs, so a cached entry can never be the wrong version of anything. |
| Images and icons (`/icons/*`, `icon.svg`, `avataaars.svg`, `opengraph-image`) | Stale-while-revalidate             | Change rarely, and a one-load-old image is not a correctness problem.                                                      |
| `/cv/export/*`                                                                | Never cached                       | Downloads generated per request from query parameters. Caching them would serve the wrong role or language.                |
| Everything else                                                               | Network-first                      | Safe default.                                                                                                              |

The only thing ever served stale is content the visitor is explicitly told is stale, because the network is gone.

## What gets precached

`install` fetches **`/sitemap.xml`** and precaches the URLs it lists.

The alternative — a hand-maintained route array in `sw.js` — silently omits every route added after it is written. The sitemap is already the single source of truth for canonical routes, is generated from the same `cvLanguages`/`cvRoleSlugs` constants the router uses, and `e2e/sitemap.e2e.ts` already asserts every URL in it returns 200. Reusing it means a new route joins the offline shell with no second list to remember.

If the sitemap fetch fails, install still resolves with `/offline` and the app shell cached; runtime caching fills in the rest as the visitor navigates. A failed precache degrades the offline experience; it must never block the worker from installing.

**Use the pathname, never the URL as listed.** The sitemap contains absolute URLs built from `siteUrl` — `https://patorsiang.github.io/about` and so on. On a Vercel preview deployment, or on `localhost` during an e2e run, precaching those literally would fetch **the production site** and cache another origin's HTML as this origin's offline shell. Every entry must be reduced to `new URL(loc).pathname` and fetched same-origin. This is the single sharpest edge in the design: it fails silently, it only misbehaves off production, and a cached page from the wrong origin looks entirely plausible.

`/offline` itself is excluded from the sitemap — it is a fallback, not content, and should not be advertised to crawlers.

## Scope

### In

1. **`src/app/manifest.ts`** — Next file convention, served at `/manifest.webmanifest`. Name and description from `@/lib/seo`; `theme_color` and `background_color` from `BRAND_COLORS`; icons from the committed set, with the maskable entry carrying `purpose: "maskable"`.
2. **`public/sw.js`** — the worker. Plain JavaScript, served from the origin root so its scope is `/`.
3. **`src/app/offline/page.tsx`** — fallback page in `PageShell`, listing what is available offline.
4. **`OfflineBanner`** — client component, `role="status"`, driven by `navigator.onLine` and the `online`/`offline` events. No dismiss control and no animation (see Constraints).
5. **Service worker registration** — a small client component mounted in the root layout, registering `/sw.js` in production only.
6. **`e2e/pwa.e2e.ts`** — manifest, registration, offline navigation, fallback, banner, and cache eviction.
7. **`playwright.config.ts`** — `serviceWorkers: "block"` in the shared `use` block (see Risks).

### Out

- Push notifications, background sync, periodic sync.
- A custom install prompt (`beforeinstallprompt`). The browser's own affordance is enough; a bespoke prompt is a conversion pattern, not a portfolio feature.
- App-store packaging (TWA, Bubblewrap).
- Caching `/cv/export/*`. Explicitly never.
- Any change to `legacy-v1`.

## Constraints this must satisfy

These are existing, enforced repo rules, not aspirations. Four e2e suites sweep every route, so the new `/offline` page and the banner are checked automatically the moment they exist:

- Interactive targets ≥40px (`tap-targets.e2e.ts`). This is why the banner has no dismiss button — a control would need 40px for no benefit.
- Text contrast ≥4.5:1 and focus rings ≥3:1 in both themes (`contrast.e2e.ts`).
- Every focus stop has a ≥2px ring (`focus-visible.e2e.ts`).
- Nothing animates under `prefers-reduced-motion`, and nothing loops forever (`reduced-motion.e2e.ts`). The banner must not animate in.
- Tailwind custom properties use the `bg-(--color-x)` shorthand.

**CSP.** `next.config.ts` sets `default-src 'self'` and `script-src 'self' 'unsafe-inline'`. `worker-src` falls back through `child-src` to `script-src`, and `manifest-src` falls back to `default-src` — both resolve to `'self'`, which permits a same-origin worker and manifest. This is reasoning from the fallback chain, not an observation: **verify empirically during implementation** and add the directives explicitly if the browser disagrees.

## Testing

Offline behaviour is genuinely testable — Playwright's `context.setOffline(true)` is a real network cut, not a mock.

1. `/manifest.webmanifest` returns 200 with a JSON content type, and carries `name`, `start_url`, `display`, and icons at both 192 and 512, one of which declares `purpose: "maskable"`.
2. Every icon URL the manifest references returns 200. A manifest pointing at a missing icon is valid JSON and a broken install.
3. The service worker registers and reaches `controlling` state on a production build.
4. Offline, a previously visited route renders from cache.
5. Offline, a route that was never cached lands on `/offline`.
6. The banner appears when offline and is absent when online.
7. Old cache buckets are evicted on activate. Seed a bogus cache from the page **before** registering the worker — `caches.open("portfolio-shell-v0")` — then register, wait for `controlling`, and assert `caches.keys()` no longer contains it. Seeding first is what makes this testable: `activate` only runs for a newly installing worker, so there is no way to force a re-activation of an unchanged one mid-test.
8. Precached entries are same-origin. After the worker installs, assert every key in `caches.keys()` → `cache.keys()` has an origin equal to the page's. This is the test that catches the absolute-URL trap above, and it fails loudly on `localhost` where the bug actually manifests.

Test 5 is the one that will be got wrong if written carelessly: it has to request a route genuinely outside the precache, which means not one of the sitemap's URLs and not `/offline`.

## Risks

**A service worker can make the other 178 tests pass for the wrong reason.** If a worker registers during an unrelated spec, it may serve a cached response and the assertion under test never touches the real app. This is the most serious risk here, and it is invisible — the suites go green either way.

Mitigation: `serviceWorkers: "block"` in the shared `use` block of `playwright.config.ts`, overridden to `"allow"` only in `pwa.e2e.ts`. Every existing suite then runs exactly as it does today.

**Development.** A service worker in `next dev` caches aggressively and produces "why isn't my change showing" confusion. Registration is gated to production builds. The e2e suite runs against a production build, so tests still exercise it.

**A hand-written worker means owning cache correctness.** The reason Workbox exists. Accepted deliberately; the mitigations are a single `CACHE_VERSION` constant, an `activate` handler that deletes everything not matching it, and test 7 proving eviction works.

**The sitemap precache couples two subsystems.** A malformed sitemap degrades the offline shell. Bounded by making a failed fetch non-fatal, and `sitemap.e2e.ts` already guards the sitemap's own correctness.

## Open questions

1. **`theme_color` in dark mode.** A manifest carries one `theme_color`. The accent differs by theme (`#0f766e` / `#5eead4`). The spec uses the light accent; a `<meta name="theme-color">` with a `media` attribute could vary it for the browser chrome, which the manifest cannot. Worth doing, and not required for a first version.
2. **Does the banner belong on the `/offline` page itself?** Arguably redundant — that page exists because you are offline. The spec says no banner there.

## Follow-on

Nothing depends on this. The remaining projects from the original four are posts from `thinking-in-public` and hero motion, both independent.
