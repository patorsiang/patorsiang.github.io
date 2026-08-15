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
  const paths = await listPostPaths();

  const posts = await Promise.all(
    paths.map(async (path) => {
      const response = await fetch(rawUrl(path));

      if (!response.ok) {
        throw new Error(`fetching ${path} failed: ${response.status}`);
      }

      const slug = path.replace(/^posts\//, "").replace(/\.md$/, "");
      const parsed = parsePost(slug, await response.text());

      return { ...parsed, body: renderPostBody(parsed.body, { vendoredImages }) };
    }),
  );

  return orderPosts(posts);
}
