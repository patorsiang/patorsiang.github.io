import { describe, expect, mock, test } from "bun:test";
import { POST_FALLBACK } from "@patorsiang/content";

import { postCardHref } from "@/components/molecules/PostCard";

/**
 * `getPosts`/`getPost` degrade to `POST_FALLBACK` when the live fetch
 * throws (a GitHub outage, or - post I3 - the listing call itself failing).
 * Nothing previously exercised that path: an absence assertion ("the posts
 * page doesn't crash") would pass whether or not the fallback actually
 * fires. `fetchPosts` calls the real `fetch` global and Playwright can't
 * intercept it (this runs server-side), so the only way to force the
 * failure is to mock `@patorsiang/content` itself.
 *
 * `mock.module` swaps the module for every import that happens after this
 * call, including the dynamic `import("./posts")` below - which is why
 * `getPosts`/`getPost` are imported dynamically inside each test rather
 * than statically at the top of the file. The static import of
 * `POST_FALLBACK` above runs first (module evaluation, before any test
 * body), so it captures the real fallback data to assert against.
 */
mock.module("@patorsiang/content", () => ({
  fetchPosts: () => Promise.reject(new Error("network down")),
  POST_FALLBACK,
}));

describe("getPosts", () => {
  // I4: fallback cards must not link to the internal /posts/<slug> route,
  // which 404s for fallback data (getPost has no fallback of its own). This
  // is the same forced-failure setup as the bundled-minor test above -
  // proving the mode AND the resulting href in one place.
  test("falls back to POST_FALLBACK, reports isFallback: true, and the card href points at the source repo", async () => {
    const { getPosts } = await import("./posts");

    const result = await getPosts();

    expect(result.isFallback).toBe(true);
    expect(result.posts).toEqual(POST_FALLBACK);

    for (const post of result.posts) {
      const { href, internal } = postCardHref(post.slug, result.isFallback);

      expect(internal).toBe(false);
      expect(href).toBe(
        `https://github.com/patorsiang/thinking-in-public/blob/main/posts/${post.slug}.md`,
      );
    }
  });
});

describe("postCardHref", () => {
  test("links to the internal route when not in fallback mode", () => {
    expect(postCardHref("my-post", false)).toEqual({ href: "/posts/my-post", internal: true });
  });

  test("links to the GitHub source when in fallback mode", () => {
    expect(postCardHref("my-post", true)).toEqual({
      href: "https://github.com/patorsiang/thinking-in-public/blob/main/posts/my-post.md",
      internal: false,
    });
  });
});

describe("getPost", () => {
  test("returns null when the fetch fails, rather than a stale body", async () => {
    const { getPost } = await import("./posts");

    const post = await getPost(POST_FALLBACK[0].slug);

    expect(post).toBeNull();
  });
});
