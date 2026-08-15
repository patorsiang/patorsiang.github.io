import { parsePost } from "./parse";
import { renderPostBody } from "./render";
import type { Post } from "../types/post";

const OWNER = "patorsiang";
const REPO = "thinking-in-public";
const BRANCH = "main";

const rawUrl = (path: string) =>
  `https://raw.githubusercontent.com/${OWNER}/${REPO}/${BRANCH}/${path}`;

/** Exported for testing: ordering is a pure decision, worth asserting directly. */
export function orderPosts(posts: readonly Post[]): Post[] {
  return [...posts].toSorted((a, b) => b.date.localeCompare(a.date));
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
 * Throws if the listing or any post fails to fetch or parse.
 */
export async function fetchRawPosts(): Promise<Post[]> {
  const paths = await listPostPaths();

  const posts = await Promise.all(
    paths.map(async (path) => {
      const response = await fetch(rawUrl(path));

      if (!response.ok) {
        throw new Error(`fetching ${path} failed: ${response.status}`);
      }

      const slug = path.replace(/^posts\//, "").replace(/\.md$/, "");
      return parsePost(slug, await response.text());
    }),
  );

  return orderPosts(posts);
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
