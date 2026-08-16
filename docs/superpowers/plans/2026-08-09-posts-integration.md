# Posts Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Surface the three written posts from `github.com/patorsiang/thinking-in-public` at `/posts` and `/posts/[slug]`, so that editing a post there makes it live here within the hour with no redeploy.

**Architecture:** A pure parser in `packages/content` turns raw markdown into a validated `Post` — front matter via Zod, body sanitised to HTML. A separate fetch module retrieves the raw files, isolated so tests never touch the network. The app reads through one accessor that applies ISR (`revalidate: 3600`) and falls back to a committed snapshot when GitHub is unreachable. Images referenced by posts are vendored into `public/` at build time, because `img-src 'self'` would block them where they are.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind v4, TypeScript, Bun, Zod, Playwright. Two new build-time dependencies: `marked` and `isomorphic-dompurify`.

## Global Constraints

- Spec: `docs/superpowers/specs/2026-08-09-posts-integration-design.md`. Read it before starting.
- Source repo: `patorsiang/thinking-in-public`, branch `main`, posts in `posts/*.md`. Raw URL shape: `https://raw.githubusercontent.com/patorsiang/thinking-in-public/main/posts/<slug>.md`.
- **No CSP change.** Fetches run on the server; CSP is a browser policy. Do not add `raw.githubusercontent.com` to `connect-src` — it would grant the reader's browser a permission nothing uses. `img-src 'self' data: blob:` stays as it is, and is the reason images are vendored.
- Front matter is authoritative. The body's leading `# H1` is stripped so a post never renders two titles.
- Tailwind custom properties use the shorthand `bg-(--color-x)`, never `bg-[var(--color-x)]`.
- Colours come from existing tokens. Do not introduce new hex literals.
- `bun run format`, `lint`, `typecheck`, `test` run from the REPO ROOT. `test:e2e` runs with `--cwd apps/portfolio-web`.
- The e2e suite currently has 244 tests. None may break.
- Four accessibility sweeps read `e2e/support/routes.ts`. Adding a route there is what gets it covered.

---

### Task 1: Post schema and front-matter parsing

**Files:**

- Create: `packages/content/src/schemas/post.schema.ts`
- Create: `packages/content/src/posts/parse.ts`
- Create: `packages/content/src/posts/parse.test.ts`
- Modify: `packages/content/src/schemas/index.ts`

**Interfaces:**

- Produces: `postSchema` (Zod), `type Post`, and `parsePost(slug: string, raw: string): Post` — throws on invalid front matter.
- `Post` is exactly: `{ slug: string; title: string; date: string; summary: string; tags: readonly string[]; maturity: "raw-note" | "draft" | "published" | "evergreen"; lang: readonly ("en" | "th")[]; body: string }`. `body` is raw markdown at this stage — HTML conversion is Task 2.

- [ ] **Step 1: Write the failing test**

Create `packages/content/src/posts/parse.test.ts`:

```ts
import { describe, expect, test } from "bun:test";

import { parsePost } from "./parse";

const valid = `---
title: "Insights from BKK.js Summer 2026"
date: 2026-06-14
summary: "Web performance, WebAssembly, and AI-assisted engineering."
tags: [events, web-performance]
maturity: published
lang: [en, th]
---

# Insights from BKK.js Summer 2026

The tech scene in Bangkok is heating up.
`;

describe("parsePost", () => {
  test("reads every front-matter field", () => {
    const post = parsePost("bkkjs-summer-2026", valid);

    expect(post.slug).toBe("bkkjs-summer-2026");
    expect(post.title).toBe("Insights from BKK.js Summer 2026");
    expect(post.date).toBe("2026-06-14");
    expect(post.tags).toEqual(["events", "web-performance"]);
    expect(post.maturity).toBe("published");
    expect(post.lang).toEqual(["en", "th"]);
  });

  // Front matter is authoritative. Leaving the H1 in would render the title
  // twice - once from the page heading, once from the body.
  test("strips the leading H1 so the title is not rendered twice", () => {
    const post = parsePost("bkkjs-summer-2026", valid);

    expect(post.body).not.toContain("# Insights from BKK.js Summer 2026");
    expect(post.body).toContain("The tech scene in Bangkok is heating up.");
  });

  // A missing field must fail loudly at build. Defaulting it silently is how a
  // post ships with an empty summary and nobody notices.
  test("rejects a post with no date rather than defaulting it", () => {
    const missingDate = valid.replace("date: 2026-06-14\n", "");

    expect(() => parsePost("bkkjs-summer-2026", missingDate)).toThrow(/date/i);
  });

  test("rejects a file with no front matter at all", () => {
    expect(() => parsePost("x", "# Just a heading\n\nBody.")).toThrow(/front matter/i);
  });

  test("rejects an unknown maturity value", () => {
    const bad = valid.replace("maturity: published", "maturity: brilliant");

    expect(() => parsePost("x", bad)).toThrow(/maturity/i);
  });
});
```

- [ ] **Step 2: Run it and confirm it fails**

Run: `bun test packages/content/src/posts/parse.test.ts`
Expected: FAIL — `Cannot find module './parse'`.

- [ ] **Step 3: Write the schema**

Create `packages/content/src/schemas/post.schema.ts`:

```ts
import { z } from "zod";

/**
 * Mirrors the maturity levels the source repo's README already defines, so the
 * archive and the site cannot disagree about what a post's status means.
 */
export const postMaturitySchema = z.enum(["raw-note", "draft", "published", "evergreen"]);

export const postSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  // ISO date, not just a year: three posts sorted by year alone have no order.
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "date must be YYYY-MM-DD"),
  summary: z.string().min(1),
  tags: z.array(z.string()).default([]),
  maturity: postMaturitySchema,
  lang: z.array(z.enum(["en", "th"])).min(1),
  body: z.string(),
});

export type Post = z.infer<typeof postSchema>;
export type PostMaturity = z.infer<typeof postMaturitySchema>;
```

- [ ] **Step 4: Export it**

In `packages/content/src/schemas/index.ts`, add alongside the existing exports:

```ts
export * from "./post.schema";
```

- [ ] **Step 5: Write the parser**

Create `packages/content/src/posts/parse.ts`:

```ts
import { postSchema, type Post } from "../schemas/post.schema";

/**
 * Front matter is a small, fixed shape - six scalar-or-list keys - so it is
 * read directly rather than adding a YAML dependency for it. The parser is
 * deliberately strict: anything it does not recognise throws, because a post
 * that renders with a silently-empty summary is worse than a build that stops.
 */
const FRONT_MATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

function parseScalar(value: string): string {
  const trimmed = value.trim();

  // Quoted values may legitimately contain a colon, which is why they exist.
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }

  return trimmed;
}

function parseList(value: string): string[] {
  const inner = value.trim().replace(/^\[/, "").replace(/\]$/, "");

  if (!inner.trim()) return [];

  return inner.split(",").map((entry) => parseScalar(entry));
}

export function parsePost(slug: string, raw: string): Post {
  const match = FRONT_MATTER.exec(raw);

  if (!match) {
    throw new Error(`${slug}: no front matter found — expected a --- block at the top of the file`);
  }

  const fields: Record<string, string> = {};

  for (const line of match[1].split(/\r?\n/)) {
    if (!line.trim() || line.trimStart().startsWith("#")) continue;

    const separator = line.indexOf(":");
    if (separator === -1) continue;

    fields[line.slice(0, separator).trim()] = line.slice(separator + 1);
  }

  const body = raw
    .slice(match[0].length)
    // The H1 duplicates the front-matter title, which the page renders itself.
    .replace(/^\s*#\s+.*(\r?\n)+/, "")
    .trim();

  const parsed = postSchema.safeParse({
    slug,
    title: fields.title === undefined ? undefined : parseScalar(fields.title),
    date: fields.date === undefined ? undefined : parseScalar(fields.date),
    summary: fields.summary === undefined ? undefined : parseScalar(fields.summary),
    tags: fields.tags === undefined ? [] : parseList(fields.tags),
    maturity: fields.maturity === undefined ? undefined : parseScalar(fields.maturity),
    lang: fields.lang === undefined ? undefined : parseList(fields.lang),
    body,
  });

  if (!parsed.success) {
    const detail = parsed.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join("; ");

    throw new Error(`${slug}: invalid front matter — ${detail}`);
  }

  return parsed.data;
}
```

- [ ] **Step 6: Run the tests and confirm they pass**

Run: `bun test packages/content/src/posts/parse.test.ts`
Expected: 5 pass, 0 fail.

- [ ] **Step 7: Commit**

```bash
bun run format && bun run typecheck
git add packages/content/src/schemas/post.schema.ts packages/content/src/schemas/index.ts \
        packages/content/src/posts/parse.ts packages/content/src/posts/parse.test.ts
git commit -m "feat(content): add the post schema and front-matter parser

Strict on purpose: a missing date or an unknown maturity throws rather
than defaulting, because a post that renders with a silently empty summary
is worse than a build that stops and says why.

The leading H1 is stripped from the body - front matter is authoritative,
and leaving it would render the title twice.

No YAML dependency for six scalar-or-list keys; the shape is fixed and
lives in one function that tests cover directly."
```

---

### Task 2: Markdown to sanitised HTML

**Files:**

- Modify: `packages/content/package.json` (add `marked`, `isomorphic-dompurify`)
- Create: `packages/content/src/posts/render.ts`
- Create: `packages/content/src/posts/render.test.ts`

**Interfaces:**

- Consumes: nothing from Task 1 — this is a pure string transform, kept separate so the parser stays dependency-free.
- Produces: `renderPostBody(markdown: string, options: { vendoredImages: ReadonlyMap<string, string> }): string` — returns sanitised HTML. `vendoredImages` maps an original image URL to its vendored path; an image absent from the map degrades to a link.

- [ ] **Step 1: Add the dependencies**

```bash
bun add --cwd packages/content marked isomorphic-dompurify
```

Both are used at build time only; neither ships to the browser.

- [ ] **Step 2: Write the failing test**

Create `packages/content/src/posts/render.test.ts`:

```ts
import { describe, expect, test } from "bun:test";

import { renderPostBody } from "./render";

const noImages = new Map<string, string>();

describe("renderPostBody", () => {
  test("renders markdown to HTML", () => {
    const html = renderPostBody("## A heading\n\nSome **bold** text.", {
      vendoredImages: noImages,
    });

    expect(html).toContain("<h2");
    expect(html).toContain("<strong>bold</strong>");
  });

  // The whole reason a sanitiser is a dependency rather than a nicety. The
  // source lives in a second repo, and style-src already allows unsafe-inline.
  test("strips a script tag from the body", () => {
    const html = renderPostBody("Before\n\n<script>alert(1)</script>\n\nAfter", {
      vendoredImages: noImages,
    });

    expect(html).not.toContain("<script");
    expect(html).not.toContain("alert(1)");
    expect(html).toContain("Before");
  });

  test("strips an inline event handler", () => {
    const html = renderPostBody('<img src="/x.png" onerror="alert(1)">', {
      vendoredImages: noImages,
    });

    expect(html).not.toContain("onerror");
  });

  test("rewrites a vendored image to its local path", () => {
    const html = renderPostBody("![Hero](https://cdn.example.com/hero.webp)", {
      vendoredImages: new Map([["https://cdn.example.com/hero.webp", "/posts/x/hero.webp"]]),
    });

    expect(html).toContain('src="/posts/x/hero.webp"');
    expect(html).not.toContain("cdn.example.com");
  });

  // ISR revalidation runs on a read-only filesystem and cannot vendor. Between
  // deploys, a newly added image has no local file - a link is a working
  // affordance where a broken <img> is just a hole in the page.
  test("degrades an unvendored image to a link rather than a broken image", () => {
    const html = renderPostBody("![Hero](https://cdn.example.com/new.webp)", {
      vendoredImages: noImages,
    });

    expect(html).not.toContain("<img");
    expect(html).toContain('href="https://cdn.example.com/new.webp"');
    expect(html).toContain("Hero");
  });

  test("leaves an already-local image alone", () => {
    const html = renderPostBody("![Mark](/icons/icon-192.png)", { vendoredImages: noImages });

    expect(html).toContain('src="/icons/icon-192.png"');
  });
});
```

- [ ] **Step 3: Run it and confirm it fails**

Run: `bun test packages/content/src/posts/render.test.ts`
Expected: FAIL — `Cannot find module './render'`.

- [ ] **Step 4: Write the renderer**

Create `packages/content/src/posts/render.ts`:

```ts
import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";

type RenderOptions = {
  /** Original image URL to vendored local path. */
  readonly vendoredImages: ReadonlyMap<string, string>;
};

const isLocal = (url: string) => url.startsWith("/");

/**
 * Turns a post body into HTML that is safe to inject.
 *
 * Sanitising is not optional even though the author wrote the content. This is
 * the first HTML on the site not authored in TSX, `style-src` already allows
 * 'unsafe-inline', and the source lives in a second repo - if that repo is ever
 * compromised, or a post embeds a raw HTML block, this is the only thing
 * between it and the reader.
 */
export function renderPostBody(markdown: string, { vendoredImages }: RenderOptions): string {
  const renderer = new marked.Renderer();

  renderer.image = ({ href, text }) => {
    if (isLocal(href)) {
      return `<img src="${href}" alt="${text}" loading="lazy" />`;
    }

    const vendored = vendoredImages.get(href);

    if (vendored) {
      return `<img src="${vendored}" alt="${text}" loading="lazy" />`;
    }

    // Not vendored yet: ISR cannot write to public/, so between deploys a new
    // image has no local file. A link works; a broken image does not.
    return `<a href="${href}" rel="noreferrer" target="_blank">${text}</a>`;
  };

  const html = marked.parse(markdown, { renderer, async: false });

  return DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });
}
```

- [ ] **Step 5: Run the tests and confirm they pass**

Run: `bun test packages/content/src/posts/render.test.ts`
Expected: 6 pass, 0 fail.

- [ ] **Step 6: Prove the sanitiser is load-bearing**

Temporarily replace the `DOMPurify.sanitize(...)` return with `return html;`, re-run, and confirm the two XSS tests FAIL while the rest pass. Restore it. A sanitiser nobody has watched fail is an assumption, not a defence. Report the failure output.

- [ ] **Step 7: Commit**

```bash
bun run format && bun run typecheck && bun test
git add packages/content/package.json packages/content/src/posts/render.ts \
        packages/content/src/posts/render.test.ts bun.lock
git commit -m "feat(content): render post markdown to sanitised HTML

First runtime dependencies in a repo that hand-rolled an ICO encoder and a
service worker rather than install anything. That restraint does not
extend to CommonMark: it is a large specification over prose that will
grow, and a hand-rolled parser would be a correctness and security
liability rather than a display of discipline.

Sanitising is not optional even though we wrote the content. This is the
first HTML here not authored in TSX, style-src already allows
unsafe-inline, and the source lives in a second repo. Verified by removing
the sanitiser and watching the XSS tests fail.

An image with no vendored file degrades to a link, because ISR runs on a
read-only filesystem and cannot vendor between deploys."
```

---

### Task 3: Fetching, vendoring, and the fallback

**Files:**

- Create: `packages/content/src/posts/fetch.ts`
- Create: `packages/content/src/posts/fallback.ts`
- Create: `packages/content/src/posts/index.ts`
- Create: `packages/content/src/posts/fetch.test.ts`
- Modify: `packages/content/src/index.ts`

**Interfaces:**

- Consumes: `parsePost` from Task 1, `renderPostBody` from Task 2.
- Produces: `fetchPosts(): Promise<Post[]>` — newest first, HTML in `body`. `POST_FALLBACK: readonly PostSummary[]` where `PostSummary = Omit<Post, "body">`.

- [ ] **Step 1: Write the failing test**

Create `packages/content/src/posts/fetch.test.ts`:

```ts
import { describe, expect, test } from "bun:test";

import { orderPosts, selectImageUrls } from "./fetch";
import type { Post } from "../schemas/post.schema";

const post = (slug: string, date: string): Post => ({
  slug,
  title: slug,
  date,
  summary: "s",
  tags: [],
  maturity: "published",
  lang: ["en"],
  body: "",
});

describe("orderPosts", () => {
  test("puts the newest first", () => {
    const ordered = orderPosts([
      post("old", "2026-03-22"),
      post("new", "2026-07-01"),
      post("mid", "2026-06-14"),
    ]);

    expect(ordered.map((entry) => entry.slug)).toEqual(["new", "mid", "old"]);
  });
});

describe("selectImageUrls", () => {
  test("finds remote images and ignores local ones", () => {
    const urls = selectImageUrls(
      "![a](https://cdn.example.com/a.webp)\n![b](/already/local.png)\n![c](http://x.test/c.jpg)",
    );

    expect(urls).toEqual(["https://cdn.example.com/a.webp", "http://x.test/c.jpg"]);
  });

  test("returns each url once even when a post repeats it", () => {
    const urls = selectImageUrls("![a](https://x.test/a.webp) ![again](https://x.test/a.webp)");

    expect(urls).toEqual(["https://x.test/a.webp"]);
  });
});
```

- [ ] **Step 2: Run it and confirm it fails**

Run: `bun test packages/content/src/posts/fetch.test.ts`
Expected: FAIL — `Cannot find module './fetch'`.

- [ ] **Step 3: Write the fallback**

Create `packages/content/src/posts/fallback.ts`:

```ts
import type { Post } from "../schemas/post.schema";

export type PostSummary = Omit<Post, "body">;

/**
 * Enough to render the index when GitHub is unreachable.
 *
 * Committed rather than fetched on purpose: without it, a GitHub outage during
 * a deploy produces an empty /posts, and a build that depends on a third party
 * being up is not reproducible. Bodies are not included - a stale body is worse
 * than a link to the source.
 *
 * Update when a post is added. The e2e suite asserts every slug here still
 * resolves, so a deleted or renamed post fails loudly rather than 404ing for
 * readers.
 */
export const POST_FALLBACK: readonly PostSummary[] = [
  {
    slug: "four-months-without-ai-2026",
    title: "What I Learned from 4 Months Without AI Coding Tools (and 2 Months with Them)",
    date: "2026-07-01",
    summary:
      "Probation without any agentic AI, then Claude and Antigravity — and what actually changed.",
    tags: ["ai", "career", "learning"],
    maturity: "published",
    lang: ["en", "th"],
  },
  {
    slug: "bkkjs-summer-2026",
    title: "Insights from BKK.js Summer 2026",
    date: "2026-06-14",
    summary:
      "Web performance, WebAssembly, WebMCP, AI-assisted engineering, and event reflections.",
    tags: ["events", "web-performance", "ai"],
    maturity: "published",
    lang: ["en", "th"],
  },
  {
    slug: "gdg-buildwithai-2026",
    title: "Vibe Coding & Agentic AI: Key Takeaways from ChaiyoGCP & Build with AI Bangkok 2026",
    date: "2026-03-22",
    summary: "AI-assisted development, agentic systems, GenUI, and event reflections.",
    tags: ["events", "ai", "genui"],
    maturity: "published",
    lang: ["en", "th"],
  },
];
```

The `date` values here must match the front matter added in Task 5. If Task 5 establishes different dates, come back and correct these.

- [ ] **Step 4: Write the fetcher**

Create `packages/content/src/posts/fetch.ts`:

```ts
import { parsePost } from "./parse";
import { renderPostBody } from "./render";
import type { Post } from "../schemas/post.schema";

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
  const found = [...markdown.matchAll(/!\[[^\]]*\]\((https?:\/\/[^)\s]+)\)/g)].map(
    (match) => match[1],
  );

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
```

- [ ] **Step 5: Add the barrel and export from the package**

Create `packages/content/src/posts/index.ts`:

```ts
export { fetchPosts, orderPosts, selectImageUrls } from "./fetch";
export { POST_FALLBACK, type PostSummary } from "./fallback";
export { parsePost } from "./parse";
export { renderPostBody } from "./render";
```

In `packages/content/src/index.ts`, add after the existing exports:

```ts
export * from "./posts";
export type { Post, PostMaturity } from "./schemas/post.schema";
```

- [ ] **Step 6: Run the tests and confirm they pass**

Run: `bun test packages/content/src/posts/`
Expected: all pass — 5 from Task 1, 6 from Task 2, 3 here.

- [ ] **Step 7: Commit**

```bash
bun run format && bun run typecheck && bun test
git add packages/content/src/posts packages/content/src/index.ts
git commit -m "feat(content): fetch posts, with a committed fallback

fetchPosts throws when the listing fails rather than returning an empty
array. The decision to degrade belongs to the caller, so this stays honest
about what it could not do; the app-side accessor is what catches it.

The fallback is committed rather than fetched, because without it a GitHub
outage during a deploy produces an empty /posts, and a build that depends
on a third party being up is not reproducible. Summaries only - a stale
body is worse than a link to the source.

orderPosts and selectImageUrls are exported for testing: ordering and
image discovery are pure decisions worth asserting directly rather than
through a network round trip."
```

---

### Task 4: Routes, rendering, and the typography layer

**Files:**

- Create: `apps/portfolio-web/src/lib/posts.ts`
- Create: `apps/portfolio-web/src/app/posts/page.tsx`
- Create: `apps/portfolio-web/src/app/posts/[slug]/page.tsx`
- Create: `apps/portfolio-web/src/components/molecules/PostCard.tsx`
- Modify: `apps/portfolio-web/src/app/globals.css` (add the `post-body` layer)
- Modify: `apps/portfolio-web/src/app/sitemap.ts`
- Modify: `apps/portfolio-web/e2e/support/routes.ts`
- Create: `apps/portfolio-web/e2e/posts.e2e.ts`

**Interfaces:**

- Consumes: `fetchPosts`, `POST_FALLBACK`, `type Post`, `type PostSummary` from `@patorsiang/content`; `buildPageMetadata` from `@/lib/seo`; `Card`, `Tag`, `PageShell`, `Section`.
- Produces: `getPosts(): Promise<PostSummary[]>` and `getPost(slug: string): Promise<Post | null>` from `@/lib/posts`.

- [ ] **Step 1: Write the failing tests**

Create `apps/portfolio-web/e2e/posts.e2e.ts`:

```ts
import { test, expect } from "@playwright/test";

test("the index lists every post, newest first", async ({ page }) => {
  await page.goto("/posts");

  const headings = await page.locator("article h2").allTextContents();

  expect(headings.length).toBeGreaterThanOrEqual(3);

  const dates = await page
    .locator("article time")
    .evaluateAll((nodes) => nodes.map((node) => node.getAttribute("datetime") ?? ""));
  const sorted = [...dates].toSorted((a, b) => b.localeCompare(a));

  expect(dates, "posts are not in newest-first order").toEqual(sorted);
});

test("a post renders its body", async ({ page }) => {
  await page.goto("/posts/bkkjs-summer-2026");

  await expect(page.getByRole("heading", { level: 1 })).toContainText(/BKK\.js/i);
  await expect(page.locator(".post-body")).toContainText(/Bangkok/i);
});

test("the title is not rendered twice", async ({ page }) => {
  await page.goto("/posts/bkkjs-summer-2026");

  // Front matter supplies the h1; the body's own h1 is stripped.
  await expect(page.locator("h1")).toHaveCount(1);
});

test("an unknown slug 404s", async ({ page }) => {
  const response = await page.goto("/posts/not-a-real-post");

  expect(response?.status()).toBe(404);
});

// img-src is 'self' data: blob:, so a missed vendoring renders as a blocked
// image that nobody notices until someone opens the console.
test("every image in a post body is same-origin", async ({ page }) => {
  await page.goto("/posts/bkkjs-summer-2026");

  const foreign = await page
    .locator(".post-body img")
    .evaluateAll((images) =>
      images
        .map((image) => (image as HTMLImageElement).src)
        .filter((src) => new URL(src).origin !== location.origin),
    );

  expect(foreign, `post images from another origin: ${foreign.join(", ")}`).toEqual([]);
});

test("Thai paragraphs are marked up as Thai", async ({ page }) => {
  await page.goto("/posts/bkkjs-summer-2026");

  const thai = page.locator('.post-body [lang="th"]');

  await expect(thai.first(), "no Thai passage carries lang=th").toBeVisible();
});

test("posts appear in the sitemap", async ({ request }) => {
  const body = await (await request.get("/sitemap.xml")).text();

  expect(body).toContain("/posts");
  expect(body).toContain("/posts/bkkjs-summer-2026");
});
```

- [ ] **Step 2: Run them and confirm they fail**

Run: `bun run --cwd apps/portfolio-web test:e2e --project=mobile e2e/posts.e2e.ts`
Expected: all FAIL — `/posts` 404s.

- [ ] **Step 3: Write the accessor**

Create `apps/portfolio-web/src/lib/posts.ts`:

```ts
import { fetchPosts, POST_FALLBACK, type Post, type PostSummary } from "@patorsiang/content";

/**
 * Every route reads posts through here.
 *
 * The fallback exists so a GitHub outage degrades the index to titles and
 * links rather than an empty page. It carries no bodies, so `getPost` returns
 * null on failure and the route 404s - showing a title with no article would
 * be worse than admitting the post cannot be loaded right now.
 */
export async function getPosts(): Promise<PostSummary[]> {
  try {
    return await fetchPosts();
  } catch (error) {
    console.error("Falling back to committed post summaries", error);
    return [...POST_FALLBACK];
  }
}

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const posts = await fetchPosts();
    return posts.find((post) => post.slug === slug) ?? null;
  } catch (error) {
    console.error(`Could not load post ${slug}`, error);
    return null;
  }
}
```

- [ ] **Step 4: Write the card**

Create `apps/portfolio-web/src/components/molecules/PostCard.tsx`:

```tsx
import type { PostSummary } from "@patorsiang/content";
import Link from "next/link";

import { Card } from "@/components/atoms/Card";
import { Tag } from "@/components/atoms/Tag";

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function PostCard({ post }: { readonly post: PostSummary }) {
  return (
    <Card className="p-6">
      <article>
        <div className="flex flex-wrap items-baseline gap-x-3 text-xs font-medium uppercase tracking-[0.12em] text-(--color-accent)">
          <time dateTime={post.date}>{dateFormat.format(new Date(post.date))}</time>
          {/* Only surfaced when it is not a finished post - the reader should
              know they are reading a draft, and "published" is the default. */}
          {post.maturity === "published" ? null : <span>{post.maturity.replace("-", " ")}</span>}
        </div>

        <h2 className="mt-3 text-xl font-semibold text-foreground">
          <Link
            href={`/posts/${post.slug}`}
            className="underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-focus)"
          >
            {post.title}
          </Link>
        </h2>

        <p className="mt-3 text-sm leading-7 text-(--color-text-muted)">{post.summary}</p>

        {post.tags.length > 0 ? (
          <div className="mt-5 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        ) : null}
      </article>
    </Card>
  );
}
```

- [ ] **Step 5: Write the index route**

Create `apps/portfolio-web/src/app/posts/page.tsx`:

```tsx
import type { Metadata } from "next";

import { PostCard } from "@/components/molecules/PostCard";
import { Section } from "@/components/organisms/Section";
import { PageShell } from "@/components/templates/PageShell";
import { getPosts } from "@/lib/posts";
import { buildPageMetadata } from "@/lib/seo";

const title = "Posts";
const description =
  "Writing by Napatchol Thaipanich on software engineering, AI-assisted development, and learning in public.";

export const metadata: Metadata = buildPageMetadata({ title, description, path: "/posts" });

/** An edited post goes live within the hour without a redeploy. */
export const revalidate = 3600;

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <PageShell>
      <Section eyebrow="Posts" title="Learning in public.">
        <p className="mt-6 max-w-2xl text-base leading-8 text-(--color-text-muted)">
          Notes and reflections from events, projects, and the day job. Written first in the{" "}
          <a
            href="https://github.com/patorsiang/thinking-in-public"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-(--color-accent) underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-focus)"
          >
            thinking-in-public
          </a>{" "}
          archive, and mirrored here.
        </p>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </Section>
    </PageShell>
  );
}
```

- [ ] **Step 6: Write the post route**

Create `apps/portfolio-web/src/app/posts/[slug]/page.tsx`:

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageShell } from "@/components/templates/PageShell";
import { getPost, getPosts } from "@/lib/posts";
import { buildPageMetadata } from "@/lib/seo";

export const revalidate = 3600;

/** Prerendered at build; a post added later is served by ISR on first request. */
export async function generateStaticParams() {
  const posts = await getPosts();

  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) return {};

  return buildPageMetadata({
    title: post.title,
    description: post.summary,
    path: `/posts/${slug}`,
  });
}

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <PageShell>
      <article className="mx-auto w-full max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-[0.16em] text-(--color-accent)">
          <time dateTime={post.date}>{dateFormat.format(new Date(post.date))}</time>
        </p>
        <h1 className="mt-4 text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-4 text-lg leading-8 text-(--color-text-muted)">{post.summary}</p>

        {/* Sanitised in packages/content/src/posts/render.ts. */}
        <div className="post-body mt-10" dangerouslySetInnerHTML={{ __html: post.body }} />

        <p className="mt-12 border-t border-(--color-border) pt-6 text-sm text-(--color-text-muted)">
          Originally written in{" "}
          <a
            href={`https://github.com/patorsiang/thinking-in-public/blob/main/posts/${post.slug}.md`}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-(--color-accent) underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-focus)"
          >
            thinking-in-public
          </a>
          .
        </p>
      </article>
    </PageShell>
  );
}
```

- [ ] **Step 7: Add the typography layer**

In `apps/portfolio-web/src/app/globals.css`, add after the `tap-reach` utility:

```css
/*
 * Typography for rendered post markdown.
 *
 * Not Tailwind's `prose` plugin: that ships its own type scale and colour
 * ramp, which would sit beside the design system's and drift from it. These
 * rules use the same tokens every other page uses, so a token change moves
 * post bodies too.
 */
.post-body {
  color: var(--color-text-muted);
  font-size: 1rem;
  line-height: 1.75;
}

.post-body > * + * {
  margin-top: 1.25rem;
}

.post-body h2 {
  color: var(--color-text);
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.3;
  margin-top: 2.5rem;
}

.post-body h3 {
  color: var(--color-text);
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.4;
  margin-top: 2rem;
}

.post-body a {
  color: var(--color-accent);
  font-weight: 600;
  text-underline-offset: 4px;
}

.post-body a:hover {
  text-decoration: underline;
}

.post-body a:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}

.post-body ul,
.post-body ol {
  padding-left: 1.5rem;
}

.post-body ul {
  list-style: disc;
}

.post-body ol {
  list-style: decimal;
}

.post-body li + li {
  margin-top: 0.5rem;
}

.post-body blockquote {
  border-left: 2px solid var(--color-accent);
  color: var(--color-text);
  padding-left: 1rem;
}

.post-body code {
  background: var(--color-surface-muted);
  border-radius: 4px;
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.875em;
  padding: 0.15em 0.35em;
}

.post-body pre {
  background: var(--color-surface-muted);
  border-radius: 6px;
  overflow-x: auto;
  padding: 1rem;
}

.post-body pre code {
  background: none;
  padding: 0;
}

.post-body img {
  border-radius: 6px;
  height: auto;
  max-width: 100%;
}

.post-body hr {
  border-color: var(--color-border);
  margin-block: 2.5rem;
}
```

- [ ] **Step 8: Add the routes to the sitemap and the sweep list**

In `apps/portfolio-web/src/app/sitemap.ts`, add `/posts` to the `pages` array with priority `0.7`, and append the post routes:

```ts
    ...POST_FALLBACK.map((post) => ({ path: `/posts/${post.slug}`, priority: 0.6 })),
```

importing `POST_FALLBACK` from `@patorsiang/content`. The fallback is used rather than a live fetch because `sitemap.ts` is `force-static` — a new post's sitemap entry waits for the next deploy, which the spec accepts.

In `apps/portfolio-web/e2e/support/routes.ts`, add `"/posts"` and `"/posts/bkkjs-summer-2026"` to the list.

- [ ] **Step 9: Run the post tests**

Run: `bun run --cwd apps/portfolio-web test:e2e --project=mobile e2e/posts.e2e.ts`
Expected: all pass. The Thai and image tests depend on Task 5's front matter; if they fail because the front matter is not there yet, note it and continue — Task 5 closes them.

- [ ] **Step 10: Run the full suite — this is the real check**

Run: `bun run --cwd apps/portfolio-web test:e2e`

The four accessibility sweeps now cover `/posts` and a post route. **Expect failures.** Post bodies are the first HTML here not authored in TSX against the design system — heading hierarchy, link contrast and tap targets inside rendered markdown are where it will bite. Fix the typography layer, never the suites. Report what failed and what you changed.

- [ ] **Step 11: Look at it**

Run `bun run --cwd apps/portfolio-web dev`, open `/posts` and a post at 375px and 1280px in both themes. Confirm the body is readable, code blocks scroll rather than overflow, and images are constrained. Stop the dev server and describe what you saw.

- [ ] **Step 12: Commit**

```bash
bun run format && bun run lint && bun run typecheck
git add apps/portfolio-web/src/lib/posts.ts apps/portfolio-web/src/app/posts \
        apps/portfolio-web/src/components/molecules/PostCard.tsx \
        apps/portfolio-web/src/app/globals.css apps/portfolio-web/src/app/sitemap.ts \
        apps/portfolio-web/e2e/support/routes.ts apps/portfolio-web/e2e/posts.e2e.ts
git commit -m "feat: add /posts and /posts/[slug]

Every route reads through src/lib/posts.ts, which catches a failed fetch
and degrades the index to committed summaries. getPost returns null rather
than a title with no article - admitting the post cannot be loaded beats
showing an empty page.

revalidate: 3600 means an edited post is live within the hour with no
redeploy, which was the whole point of the hybrid: build time prerenders
and fills the sitemap, runtime keeps it fresh.

The typography layer uses design tokens rather than Tailwind's prose
plugin, which would ship a second type scale beside the design system's
and drift from it.

Both routes are in e2e/support/routes.ts, so the four accessibility sweeps
cover them - this is the first HTML here not authored in TSX, so that
coverage matters more than usual."
```

---

### Task 5: Front matter in the source repo, and image vendoring

**Files:**

- Modify (in `thinking-in-public`): `posts/bkkjs-summer-2026.md`, `posts/four-months-without-ai-2026.md`, `posts/gdg-buildwithai-2026.md`
- Create: `apps/portfolio-web/scripts/vendor-post-images.ts`
- Modify: `apps/portfolio-web/package.json` (add `vendor:post-images`)
- Create: `apps/portfolio-web/public/posts/<slug>/*` (written by the script, committed)

**Interfaces:**

- Consumes: `fetchPosts`, `selectImageUrls` from `@patorsiang/content`.
- Produces: vendored image files plus `apps/portfolio-web/src/lib/vendored-images.ts` exporting `VENDORED_IMAGES: ReadonlyMap<string, string>`.

- [ ] **Step 1: Add front matter to the three posts**

This is a change to a **different repository**. Clone it beside the portfolio if it is not already:

```bash
git clone git@github.com:patorsiang/thinking-in-public.git /tmp/thinking-in-public
```

Add to the top of each post, above the existing `# H1`, keeping the H1 in place — the parser strips it, and the file should still read correctly on GitHub:

`posts/bkkjs-summer-2026.md`:

```yaml
---
title: "Insights from BKK.js Summer 2026"
date: 2026-06-14
summary: "Web performance, WebAssembly, WebMCP, AI-assisted engineering, and event reflections."
tags: [events, web-performance, ai]
maturity: published
lang: [en, th]
---
```

`posts/gdg-buildwithai-2026.md`:

```yaml
---
title: "Vibe Coding & Agentic AI: Key Takeaways from ChaiyoGCP & Build with AI Bangkok 2026"
date: 2026-03-22
summary: "AI-assisted development, agentic systems, GenUI, and event reflections."
tags: [events, ai, genui]
maturity: published
lang: [en, th]
---
```

`posts/four-months-without-ai-2026.md`:

```yaml
---
title: "What I Learned from 4 Months Without AI Coding Tools (and 2 Months with Them)"
date: 2026-07-01
summary: "Probation without any agentic AI, then Claude and Antigravity — and what actually changed."
tags: [ai, career, learning]
maturity: published
lang: [en, th]
---
```

**The `2026-07-01` date is a placeholder and the repo owner has flagged it as unknown.** The BKK.js and Build with AI dates come from the posts themselves (the events are dated in the text); this one is not stated anywhere. Ask before pushing, and correct `POST_FALLBACK` in `packages/content/src/posts/fallback.ts` to match whatever is chosen.

Commit and push in that repo:

```bash
git -C /tmp/thinking-in-public add posts
git -C /tmp/thinking-in-public commit -m "docs: add front matter to posts

Machine-readable title, date, summary, tags, maturity and language, which
the README's future plan already called for. The portfolio reads these to
build its index; without them it would have to guess from the H1 and the
filename."
git -C /tmp/thinking-in-public push
```

- [ ] **Step 2: Mark up the Thai passages**

The posts interleave English and Thai by paragraph. Wrap each Thai paragraph so assistive technology switches voice — in markdown, a raw `<span>` is preserved:

```markdown
<span lang="th">การเข้าร่วมงาน Tech 2 งานใหญ่ในวันเดียว...</span>
```

Do this for every Thai paragraph in all three posts. It is mechanical but must be done by reading each paragraph — do not regex it, because several paragraphs mix a Thai sentence with an English product name.

Commit and push.

- [ ] **Step 3: Verify the portfolio now parses them**

Back in the portfolio:

```bash
bun run --cwd apps/portfolio-web test:e2e --project=mobile e2e/posts.e2e.ts
```

Expected: the Thai test now passes. If a post fails to parse, the error names the field — fix the front matter in the source repo rather than loosening the schema.

- [ ] **Step 4: Write the vendoring script**

Create `apps/portfolio-web/scripts/vendor-post-images.ts`:

```ts
/**
 * Downloads every remote image referenced by a post into public/posts/<slug>/
 * and writes the URL-to-path map the renderer uses.
 *
 * Run by hand when a post gains an image:
 *   bun run --cwd apps/portfolio-web vendor:post-images
 *
 * Not in CI, and not at request time: ISR runs on a read-only filesystem and
 * cannot write to public/. Between deploys an unvendored image renders as a
 * link, which is why the renderer degrades rather than emitting a broken img.
 *
 * These images are event photography by other people. Each keeps its source
 * URL in sources.json so attribution stays recoverable.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

import { fetchPosts, selectImageUrls } from "@patorsiang/content";

const publicDir = join(import.meta.dir, "../public/posts");
const mapPath = join(import.meta.dir, "../src/lib/vendored-images.ts");

const extensionOf = (url: string) => {
  const path = new URL(url).pathname;
  const match = /\.(png|jpe?g|webp|gif|svg)$/i.exec(path);

  // Cloudinary and similar serve extensionless transform URLs; webp is the
  // safe default and the browser sniffs the real type anyway.
  return match ? match[1].toLowerCase() : "webp";
};

async function main() {
  // Raw markdown, not rendered HTML: selectImageUrls reads markdown syntax.
  const posts = await fetchPosts();
  const entries: [string, string][] = [];

  for (const post of posts) {
    const urls = selectImageUrls(post.body);
    if (urls.length === 0) continue;

    const dir = join(publicDir, post.slug);
    mkdirSync(dir, { recursive: true });

    const sources: Record<string, string> = {};

    for (const [index, url] of urls.entries()) {
      const name = `image-${index + 1}.${extensionOf(url)}`;
      const response = await fetch(url);

      if (!response.ok) {
        console.warn(`skipped ${url}: ${response.status}`);
        continue;
      }

      writeFileSync(join(dir, name), Buffer.from(await response.arrayBuffer()));
      sources[name] = url;
      entries.push([url, `/posts/${post.slug}/${name}`]);
      console.log(`vendored ${url} -> /posts/${post.slug}/${name}`);
    }

    writeFileSync(join(dir, "sources.json"), `${JSON.stringify(sources, null, 2)}\n`, "utf8");
  }

  const literal = entries
    .map(([url, path]) => `  [${JSON.stringify(url)}, ${JSON.stringify(path)}],`)
    .join("\n");

  writeFileSync(
    mapPath,
    `/* Generated by scripts/vendor-post-images.ts. Do not edit by hand. */\n` +
      `export const VENDORED_IMAGES: ReadonlyMap<string, string> = new Map([\n${literal}\n]);\n`,
    "utf8",
  );

  console.log(`wrote ${mapPath}`);
}

await main();
```

**Note:** `selectImageUrls(post.body)` will not work as written, because `fetchPosts` returns `body` already rendered to HTML. Fix this by having the script fetch raw markdown itself, or by exporting a raw-fetch variant from `@patorsiang/content`. Choose one, implement it, and say which in your report — this is a genuine gap in the plan, not a trick.

- [ ] **Step 5: Add the script entry**

In `apps/portfolio-web/package.json`, after `generate:brand`:

```json
"vendor:post-images": "bun run scripts/vendor-post-images.ts",
```

- [ ] **Step 6: Wire the map into the accessor**

In `apps/portfolio-web/src/lib/posts.ts`, import `VENDORED_IMAGES` and pass it to `fetchPosts`:

```ts
import { VENDORED_IMAGES } from "@/lib/vendored-images";
```

and change both call sites to `await fetchPosts(VENDORED_IMAGES)`.

- [ ] **Step 7: Vendor and verify**

```bash
bun run --cwd apps/portfolio-web vendor:post-images
bun run --cwd apps/portfolio-web test:e2e --project=mobile e2e/posts.e2e.ts
```

Expected: the same-origin image test now passes with real images present. Open a post in a browser and confirm the images render — a vendored file that 404s or downloads an HTML error page would still satisfy a same-origin check.

- [ ] **Step 8: Run the full suite and commit**

```bash
bun run --cwd apps/portfolio-web test:e2e
bun run format && bun run lint && bun run typecheck && bun test
git add apps/portfolio-web/scripts/vendor-post-images.ts apps/portfolio-web/package.json \
        apps/portfolio-web/public/posts apps/portfolio-web/src/lib/vendored-images.ts \
        apps/portfolio-web/src/lib/posts.ts
git commit -m "feat(posts): vendor post images into the portfolio

img-src is 'self' data: blob:, so the Cloudinary and creatorsgarten images
these posts hot-link would be blocked outright - two of three posts would
render with visible holes. Vendoring keeps the CSP closed and removes
third-party requests from the reader's browser.

Run by hand rather than in CI: ISR cannot write to public/, so between
deploys a new image renders as a link, and a CI step regenerating these
would churn the diff on every run.

Each directory keeps a sources.json mapping the vendored filename back to
its original URL. These are other people's event photographs; rehosting
them is a different act from hot-linking, and attribution should stay
recoverable."
```

---

## Self-Review

**Spec coverage.** Front matter (Task 5), content package with schema and validation (Tasks 1–3), image vendoring (Task 5), `/posts` (Task 4), `/posts/[slug]` with ISR (Task 4), markdown rendering and sanitising (Task 2), sitemap and sweep-list registration (Task 4), committed fallback (Task 3). The spec's seven test requirements map to Task 1 (front-matter parsing, rejection), Task 2 (sanitising), and Task 4 (index order, body render, 404, same-origin images, Thai markup, sitemap).

**Placeholders.** One deliberate, flagged in place: Task 5 Step 4 names a real defect in its own script — `selectImageUrls` expects markdown but `fetchPosts` returns HTML. The implementer must choose a fix and report it. Naming it beats shipping a script that silently vendors nothing.

**Type consistency.** `Post` is defined once in Task 1 and consumed unchanged in 2, 3 and 4. `PostSummary = Omit<Post, "body">` appears in Task 3 and is used in Task 4's `PostCard` and `getPosts`. `fetchPosts(vendoredImages?)` gains its argument in Task 3 and is called with it in Task 5 Step 6. `VENDORED_IMAGES` is produced in Task 5 Step 4 and consumed in Step 6.

**Ordering risk, stated.** Tasks 1–4 run before the source repo has front matter, so Task 4's Thai and image tests will fail until Task 5 lands. This is called out in Task 4 Step 9. The alternative — front matter first — would leave the parser untested against real files for four tasks. Fixtures cover the parser; the e2e tests are the integration check and belong last.

**Known gap.** Nothing tests the fallback path. `getPosts` catching a fetch failure and returning `POST_FALLBACK` is asserted nowhere, which is the same shape as an absence assertion that always passes. It needs a test that forces the fetch to fail — route interception in Playwright, or a unit test with an injected fetch. Worth adding during Task 4 if the implementer sees a clean way; otherwise it goes to the final review as a known hole.
