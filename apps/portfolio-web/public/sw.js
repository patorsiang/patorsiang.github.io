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
