# Posts from thinking-in-public — design

Date: 2026-08-09
Status: awaiting review
Branch: `feat/portfolio-platform-2026`

## Problem

`github.com/patorsiang/thinking-in-public` holds three written posts (8–22KB each) plus raw notes and assets. None of it is visible from the portfolio. The IA has no writing surface at all, and writing is the one kind of evidence a portfolio cannot fake.

The archive is not currently machine-readable:

- **No front matter.** Not one post has YAML. The title lives in the `# H1`, the date is implied by a year in the filename, tags sit as a bare list near the bottom, and `four-months-without-ai-2026.md` has no tags at all. The repo's own README lists "Add front matter or metadata for topics, dates, maturity, and source links" as a future plan.
- **Bilingual by paragraph.** English and Thai are interleaved within each document, not separated into variants. This does not match how the CV handles language (`/en/`, `/th/` routes).
- **Images are hot-linked** to `res.cloudinary.com` and `usercontent.creatorsgarten.org`. The portfolio's CSP is `img-src 'self' data: blob:`, so as authored those images would be **blocked**, breaking two of the three posts visibly.

## Decisions

Chosen by the repo owner during brainstorming on 2026-08-09.

| Decision  | Choice                                               | Reasoning                                                                                                                                                                                                                  |
| --------- | ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Metadata  | **Add YAML front matter to the source repo**         | The alternative is a parsing heuristic that becomes an undocumented contract, or a hand-kept metadata file in the portfolio that drifts. Front matter improves the archive on its own terms and is already on its roadmap. |
| Images    | **Vendor into the portfolio**                        | Keeps `img-src 'self'` intact, removes third-party requests from the reader's browser, and survives link rot.                                                                                                              |
| Sync      | **Fetch at build time, revalidate at runtime (ISR)** | See below — this was revised mid-design and the reasoning matters.                                                                                                                                                         |
| Bilingual | **Render as authored, one page**                     | Splitting into language variants is a content-authoring change to the archive. Three posts do not justify it. Thai paragraphs get `lang="th"` so assistive tech switches voice.                                            |

### Why the sync approach was revised

The owner asked a question the first design answered badly: _if I edit a post in thinking-in-public, does the portfolio update?_

Under a build-time-only sync with a committed generated file: **no**. Publishing became four steps — edit and push in one repo, run a sync script in the other, commit its output, redeploy — three of them in the wrong repo, and skipping the sync left the portfolio silently serving stale text. The proposed mitigation, a CI check comparing committed output against a fresh sync, would have failed on unrelated PRs and taught people to ignore it.

Pure runtime fetching fixes publishing but costs more than it first appears: posts vanish from the sitemap (`sitemap.ts` is `force-static`), `generateStaticParams` cannot enumerate them, images cannot be vendored because there is no build step to vendor them in, and a GitHub outage on a cache miss renders an empty `/posts`.

**The hybrid keeps both properties.** Build time fetches, vendors images, and prerenders every post, so the sitemap, static params and CSP all work. `revalidate: 3600` means an edited post goes live within the hour with no redeploy. Publishing is back to one step.

The residual cost, stated plainly: **a brand-new post appears via ISR but its sitemap entry waits for the next deploy.** Edits to existing posts are fully covered. This is acceptable — a post is discoverable by link and on `/posts` immediately; only crawler discovery lags.

## Scope

### In

1. **Front matter in `thinking-in-public`** — a separate commit in that repo, adding to each of the three posts:
   ```yaml
   ---
   title: string
   date: YYYY-MM-DD
   summary: string
   tags: [string]
   maturity: raw-note | draft | published | evergreen
   lang: [en] | [en, th]
   ---
   ```
   `maturity` mirrors the levels the README already defines. `date` must be a real date, not just the filename's year — three posts sorted by year alone are unordered.
2. **`packages/content/src/posts/`** — fetch, front-matter parse, and a Zod schema matching the existing `packages/content/src/schemas/` pattern. A post failing validation is skipped with a build-time warning, never rendered half-formed.
3. **Image vendoring** — build step downloads referenced images to `public/posts/<slug>/` and rewrites `src` attributes. Runs during the same build-time fetch.

   **ISR cannot vendor.** Revalidation runs in a serverless function with a read-only filesystem; it cannot write to `public/`. So an edited post that _adds a new image_ will, between deploys, reference a file that does not exist. The parser therefore rewrites any image whose vendored file is absent into a link to the original URL with the alt text as its label — a visible, working link rather than a broken image. The next deploy vendors it properly. Editing text in an existing post, the common case, is unaffected.

4. **`/posts`** — index, newest first: title, date, summary, tags, maturity when not `published`.
5. **`/posts/[slug]`** — the post. `generateStaticParams` from the build-time fetch; `export const revalidate = 3600`.
6. **Markdown rendering** — sanitised HTML, styled with a scoped typography layer built from existing tokens.
7. **Sitemap and route sweeps** — posts added to `sitemap.ts`; `/posts` and one post route added to `e2e/support/routes.ts`.
8. **A committed fallback** — a minimal snapshot (slug, title, date, summary) so a failed fetch degrades to a listing rather than an empty page.

### Out

- `notes/`. Raw by definition; the README says to treat them as snapshots. Posts only.
- Tag pages, pagination, search, RSS. Three posts. Add when volume justifies it.
- Comments, reactions, view counts.
- Any change to how the CV handles language.
- Promoting notes to posts, or editing post prose.

## The dependency question

This is the first runtime dependency this project would add. The brand work hand-rolled an ICO encoder rather than install one; the service worker is hand-written. That habit is deliberate and worth respecting.

It does not extend to a markdown parser. CommonMark is a large specification, the input is prose that will grow, and a hand-rolled parser is a correctness and security liability rather than a display of restraint.

**`marked` for parsing, `isomorphic-dompurify` for sanitising.** Both run at build time only, so neither ships to the browser.

Sanitising is not optional even though the owner wrote the content: it is the first HTML on this site not authored in TSX, `style-src` already allows `'unsafe-inline'`, and the source lives in a second repo. If that repo is ever compromised, or a future post embeds a raw HTML block, sanitising is the only thing between that and the reader.

## Components

**`packages/content/src/posts/fetch.ts`** — retrieves raw markdown from `raw.githubusercontent.com` for a pinned list of slugs, or by listing the directory via the GitHub API. Returns raw strings; no parsing. Isolated so a test can substitute fixtures without a network.

**`packages/content/src/posts/parse.ts`** — front matter to a validated `Post`, body to sanitised HTML. Pure: string in, object out, no I/O. The unit-testable core.

**`apps/portfolio-web/src/lib/posts.ts`** — the app-side accessor. Calls fetch and parse, applies `revalidate`, and falls back to the committed snapshot on failure. Everything the routes touch goes through here.

**`PostCard`** (molecule) — index entry. Reuses `Card` and `Tag`, matching `ProjectCard`.

**`PostBody`** — renders sanitised HTML with a scoped typography class. Not Tailwind's `prose` plugin: that would introduce a second type scale beside the design system's, and the two would drift.

## Testing

The four accessibility sweeps cover `/posts` and a post route automatically once both are in `e2e/support/routes.ts`. **Expect failures.** This is the first HTML on the site not written by hand against the design system — heading hierarchy, link contrast and tap targets inside rendered markdown are exactly where it will bite. Fix the typography layer, never the suites.

New tests:

1. Front-matter parsing: valid input produces the expected `Post`; a missing required field is rejected rather than silently defaulted.
2. Sanitising: a post body containing `<script>` renders without it. Written as a failing test first — this is the assertion that justifies the dependency.
3. `/posts` lists every post, newest first.
4. `/posts/[slug]` renders body content; an unknown slug 404s.
5. Every image `src` in rendered output is same-origin. Catches a vendoring miss, which would otherwise surface as a CSP-blocked image nobody notices.
6. Posts appear in `sitemap.xml`, and every listed URL returns 200 — the existing `sitemap.e2e.ts` covers the second half already.
7. Thai paragraphs carry `lang="th"`.

## Risks

**Build now depends on GitHub.** A fetch failure during deploy falls back to the committed snapshot, so the build succeeds with a reduced index rather than failing. The fallback must be exercised by a test, not assumed — an untested fallback is the same class of defect as an absence assertion that always passes.

**Sitemap lag for new posts.** Stated above and accepted.

**Front matter can drift from the body.** A `title` in front matter and a different `# H1` would disagree. The parser takes front matter as authoritative and the H1 is stripped from the rendered body to avoid two titles.

**No CSP change is required, contrary to what was said during brainstorming.** Both the build-time fetch and the ISR revalidation run on the server, inside a Server Component or a build script. CSP is a browser policy delivered to the reader's browser; it does not govern server-side `fetch`. `connect-src` stays as it is, and adding `raw.githubusercontent.com` to it would be a needless widening that grants the reader's browser a permission nothing uses. The `img-src` constraint is real and is why images are vendored — those requests _are_ made by the reader's browser.

**Vendored images are someone else's work.** The Cloudinary and creatorsgarten images are event photography. Rehosting them on the portfolio is a different act from hot-linking. Each vendored image keeps a source URL in a sidecar so attribution is recoverable; if any turn out to be non-redistributable, that post links to the original rather than embedding it.

## Open questions

1. **Which date for `four-months-without-ai-2026.md`?** The filename gives a year. The post references finishing an MSc and a probation period; only the author knows the real publication date.
2. **Should `/posts` appear in `GlobalNav`?** The IA names six primary items and warns against a busy nav. A seventh needs a decision, and the nav already wraps at 375px. The spec leaves it out; the footer and homepage can link to it instead.
3. **Do the notes ever surface?** Out of scope here, but the answer shapes whether `/posts` should have been `/writing`.

## Follow-on

Hero motion is the last of the four original requests, and is already constrained by the "keep restrained" decision recorded in the brand spec.
