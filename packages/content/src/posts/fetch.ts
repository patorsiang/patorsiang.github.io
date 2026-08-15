import { parsePost } from "./parse";
import { renderPostBody } from "./render";
import type { Post, RawPost } from "../types/post";

const OWNER = "patorsiang";
const REPO = "thinking-in-public";
const BRANCH = "main";

const rawUrl = (path: string) =>
  `https://raw.githubusercontent.com/${OWNER}/${REPO}/${BRANCH}/${path}`;

/**
 * Exported for testing: ordering is a pure decision, worth asserting directly.
 * Generic so it works for both `fetchPosts`'s `Post[]` and `fetchRawPosts`'s
 * `RawPost[]` without losing the raw/sanitised distinction on the way out.
 */
export function orderPosts<T extends Pick<Post, "date">>(posts: readonly T[]): T[] {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date));
}

/** Exported for testing. Remote images only - local paths need no vendoring. */
export function selectImageUrls(markdown: string): string[] {
  const found = [...markdown.matchAll(/!\[[^\]]*\]\(([^)]*)\)/g)]
    .map((match) => match[1].trim().split(/\s+/)[0])
    .filter((url): url is string => /^https?:\/\//.test(url));

  return [...new Set(found)];
}

async function listPostPaths(): Promise<string[]> {
  const response = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/contents/posts?ref=${BRANCH}`,
    { headers: { Accept: "application/vnd.github+json" } },
  );

  if (!response.ok) {
    throw new Error(`listing posts failed: ${response.status}`);
  }

  const entries = (await response.json()) as { name: string; type: string; path: string }[];

  return entries
    .filter((entry) => entry.type === "file" && entry.name.endsWith(".md"))
    .map((entry) => entry.path);
}

/**
 * Every post, newest first, with `body` still raw markdown - not rendered to
 * HTML.
 *
 * Exported separately from `fetchPosts` because the vendoring script needs
 * markdown link syntax (`![alt](url)`) to find image URLs with
 * `selectImageUrls`, and `renderPostBody` has already turned that into `<img>`
 * tags by the time `fetchPosts` returns. This is the single place that lists
 * and parses posts, so `fetchPosts` is defined in terms of it below rather
 * than duplicating the fetch-and-parse loop.
 *
 * Throws only if the listing itself fails, or if every path it names fails
 * to fetch or parse. A single post that fails (missing/malformed front
 * matter, a schema violation) is skipped and logged rather than failing the
 * whole batch - `thinking-in-public` is a personal archive committed to
 * independently of this codebase, and one malformed post should not take
 * down every other post in the listing. But if literally every post failed,
 * that is functionally a total outage from the caller's point of view - an
 * index with zero posts is exactly the "empty page" `lib/posts.ts`'s
 * fallback exists to prevent, even though the failure mode here is parse
 * errors rather than the listing call itself being unreachable.
 *
 * Returns `RawPost[]`, not `Post[]`: the brand stops a future caller from
 * silently feeding raw markdown to something that expects sanitised HTML
 * (or vice versa - `fetchPosts`'s output into `selectImageUrls`, which needs
 * markdown link syntax). The cast below is the one place that brand is
 * applied; it exists only for the compiler; see `RawPost`'s docstring.
 */
export async function fetchRawPosts(): Promise<RawPost[]> {
  const paths = await listPostPaths();

  const results = await Promise.allSettled(
    paths.map(async (path) => {
      const response = await fetch(rawUrl(path));

      if (!response.ok) {
        throw new Error(`fetching ${path} failed: ${response.status}`);
      }

      const slug = path.replace(/^posts\//, "").replace(/\.md$/, "");
      return parsePost(slug, await response.text());
    }),
  );

  const posts = settleFetchedPosts(paths, results);

  if (paths.length > 0 && posts.length === 0) {
    throw new Error(`every post (${paths.length}) failed to fetch or parse`);
  }

  return orderPosts(posts as RawPost[]);
}

/**
 * Exported for testing: the isolable piece of I3's per-post failure
 * handling. Keeps posts whose fetch+parse settled fulfilled, skips (and
 * logs) the ones that rejected.
 */
export function settleFetchedPosts(
  paths: readonly string[],
  results: readonly PromiseSettledResult<Post>[],
): Post[] {
  const posts: Post[] = [];

  for (const [index, result] of results.entries()) {
    if (result.status === "fulfilled") {
      posts.push(result.value);
    } else {
      console.error(`skipping ${paths[index]}:`, result.reason);
    }
  }

  return posts;
}

/**
 * Every post, newest first, with `body` already sanitised HTML.
 *
 * Throws if the listing fails. The app-side accessor catches that and falls
 * back to the committed summaries — the decision to degrade belongs there,
 * not here, so this stays honest about what it could not do.
 *
 * `vendoredImages` is supplied by the caller because vendoring writes to
 * public/ and only the build can do that; ISR passes an empty map, which makes
 * a not-yet-vendored image render as a link.
 */
export async function fetchPosts(
  vendoredImages: ReadonlyMap<string, string> = new Map(),
): Promise<Post[]> {
  const posts = await fetchRawPosts();

  return posts.map((post) => ({
    ...post,
    body: renderPostBody(post.body, { vendoredImages }),
  }));
}
