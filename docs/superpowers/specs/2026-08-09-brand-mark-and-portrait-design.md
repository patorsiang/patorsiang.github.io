# Brand mark and portrait — design

Date: 2026-08-09
Status: approved 2026-08-09
Branch: `feat/portfolio-platform-2026`

## Problem

`apps/portfolio-web` has no identity of its own.

- `src/app/favicon.ico` is the `create-next-app` default — **Vercel's triangle**, 256×256, 25,931 bytes. Every browser tab, bookmark and history entry currently shows Vercel's mark as this site's identity.
- `src/app/opengraph-image.tsx` uses `#101828` with sky-blue `#7dd3fc` on Arial. None of those are design tokens (`--color-accent` is `#0f766e` light / `#5eead4` dark; the typeface is Geist). Its strapline, "AI-enabled systems · Secure platforms · Practical web products", no longer matches the headline rewritten in `0df1e9c`. This is the image every LinkedIn and Slack share renders.
- `public/` ships five unreferenced `create-next-app` files: `file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`.
- The site contains no image of a person anywhere, which is part of why it reads colder than `legacy-v1`.

The PWA work that follows this needs an icon set. Producing icons from a placeholder would mean redoing them, so identity comes first.

## Decisions

Chosen by the repo owner during brainstorming on 2026-08-09, except nav placement — see Resolved by default.

| Decision         | Choice                                                     | Reasoning                                                                                                                                                                                           |
| ---------------- | ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Site personality | Stays restrained and evidence-first                        | Rules out a character-led redesign. Also settles the hero-motion question: item 4 stays inside `motion-guidelines.md` as written.                                                                   |
| Mark form        | Geometric `P`, stroked path (candidate D)                  | Font-independent, and the only candidate that can later animate by drawing its own stroke.                                                                                                          |
| Construction     | **D2** — stroke 15, tighter bowl, shorter stem             | Closest in weight to Geist SemiBold, which the site sets headings in. Holds legibility at 16px, where D1 fills in. D4 was stronger at 16px but is filled, which forfeits the self-drawing property. |
| Avataaar         | Keep, as a portrait                                        | Good at humanising, poor as a mark: it collapses at 16px, cannot render in one colour, and comes from a public library thousands of sites use. Different job, not a competitor.                     |
| Nav placement    | **No mark in the nav** (default — see Resolved by default) | The nav's job is wayfinding and the mark adds none. Avoids two adjacent controls both linking to `/`, and avoids a seventh item in a bar that already wraps at 375px.                               |

### The mark

```
viewBox    0 0 100 100
path       M34 82 V24 H54 a17 17 0 1 1 0 34 H34
fill       none
stroke     currentColor
width      15
linecap    round
linejoin   round
```

**In-page** (`SiteMark`), `stroke` is `currentColor`, so the mark inherits `--color-accent` — teal on light, mint on dark, no second asset.

**As a favicon it cannot be.** An SVG behind `<link rel="icon">` is a separate document: it inherits nothing from the page, and `currentColor` there resolves to the SVG's own default of black. `icon.svg` therefore embeds the two token values directly and switches on `prefers-color-scheme`, which is the browser signal a favicon can actually see. Correcting this after the spec was approved, because it would otherwise have shipped a black mark on a dark tab.

That means the token hexes are duplicated outside `tokens.css` in two places — `icon.svg` and the OG image, both of which render outside the CSS pipeline. Both read from constants in `src/lib/brand.ts`, so the duplication is confined to one file with one comment pointing back at `packages/ui/tokens.css`.

## Scope

### In

1. **`src/app/icon.svg`** — the D2 mark, via Next's file convention. Served at `/icon.svg`, referenced automatically.
2. **`src/app/favicon.ico`** — replaced. The Vercel triangle is deleted. Written by the generator, which wraps a 256×256 PNG in an ICO container by hand — an ICO is a 6-byte header plus one 16-byte directory entry per image, and embedding PNG payloads is legal since Vista. That is a few lines of `Buffer` work and avoids adding an image-encoding dependency for one file that changes when the mark does.
3. **`src/app/apple-icon.png`** — 180×180, teal tile with the mark in white. iOS applies its own rounding, so the tile is drawn square and the glyph inset.
4. **PWA icon set** — 192×192 and 512×512 PNGs, plus a maskable variant. Produced here, consumed by the PWA project. Android crops to a circle, so the maskable variant is a filled teal tile with the glyph inside the safe zone — the spec defines that zone as the inner 80% of the canvas, so the glyph is drawn no wider than that and never as a bare glyph on transparency.
5. **`src/app/opengraph-image.tsx`** — rewritten to design tokens, Geist, the current headline, and the mark.
6. **`ProfileHeader`** — gains an optional `portrait` prop. Rendered on the homepage only.
7. **Avataaar relocation** — `legacy-v1/public/imgs/avataaars.svg` copied to `apps/portfolio-web/public/`. `legacy-v1` is scheduled for deletion, so the asset cannot stay there.
8. **Cleanup** — delete the five unreferenced `public/*.svg` template files.

### Out

- **PWA manifest and service worker.** Separate project. This one only produces the icons that project consumes.
- **Posts from `thinking-in-public`.** Separate project.
- **Hero motion.** Separate project, and already constrained by the personality decision above.
- **A wordmark lockup.** No current surface needs one. Add when something does.
- **Nav mark.** Excluded by the placement decision. Revisit only if a sticky header is introduced.

## Approach

Next.js file conventions rather than hand-managed `<link>` tags in `public/`.

`app/icon.svg`, `app/apple-icon.png` and `app/opengraph-image.tsx` are discovered by the framework, which emits the correct `<link>` and `<meta>` tags, content hashes for cache-busting, and correct `sizes`/`type` attributes. The alternative — static files plus manual tags — means maintaining that markup by hand for no benefit. The `metadataBase` needed for absolute OG URLs already exists in `src/lib/seo.ts`.

PNG icons are generated once and committed, not built on the fly. A build-time rasteriser would add a dependency to serve four static images that change only when the mark changes.

Rasterising uses Playwright, already a devDependency for the e2e suite: a throwaway page renders the mark at an exact viewport size and screenshots it. No new dependency, and the same engine that renders the site renders its icons. The generator lives at `scripts/generate-brand-assets.ts` and is run by hand, not in CI — these are committed artefacts, and a CI step that regenerates them would produce diff noise on every run.

## Components

**`MARK_PATH`** (`src/lib/brand.ts`) — the path `d` string and stroke settings as exported constants. Everything that draws the mark reads from here.

**`SiteMark`** (`components/atoms/SiteMark.tsx`) — renders `MARK_PATH` at a given size, inheriting `currentColor`. Props: `size`, `className`, `title` (omitted when decorative).

`app/icon.svg` is a static file and cannot import either, so the geometry genuinely is duplicated there — a component cannot be the single source of truth for a file the framework reads off disk. Two things make that safe rather than hopeful: the generator writes `icon.svg` from `MARK_PATH`, and a unit test asserts the committed `icon.svg` contains the current `MARK_PATH` string. Editing the constant without regenerating fails `bun test`, which is the failure mode worth catching — the icons are the one asset nobody looks at again.

**`ProfileHeader`** — new optional `portrait: { src, alt }`. Absent, the header renders exactly as now, so `/about` and any other consumer is unaffected. Present, the portrait sits beside the name block and stacks above it below `sm`. The alt text describes the person, not the file.

**`opengraph-image.tsx`** — name, role, headline, and the mark, on `--color-page` with `--color-accent`. Token values are inlined as literals because `ImageResponse` renders outside the CSS pipeline and cannot read custom properties. That duplication is a real cost and gets a comment saying so, pointing at `packages/ui/tokens.css` as the source.

## Testing

The existing suites cover most of this for free — they sweep every route, so the portrait and any header change are checked for tap targets, contrast in both themes, focus rings and reduced motion the moment they exist.

New unit test (`bun test`, no browser): the committed `src/app/icon.svg` contains the current `MARK_PATH`, so changing the constant without rerunning the generator fails.

New, in `e2e/brand.e2e.ts`:

1. `/icon.svg` returns 200 with an SVG content type.
2. `/favicon.ico` returns 200 and is **not** the Vercel default — assert on byte length differing from 25,931, with a comment explaining the number.
3. `/opengraph-image` returns 200 and `image/png`.
4. The homepage renders a portrait image with non-empty alt text.
5. The five deleted template files return 404.

Test 2 is the one that matters. It is the only assertion that would have caught the original bug, which shipped for months precisely because nobody looked at the tab.

## Risks

**The OG image cannot be visually diffed in CI.** `ImageResponse` output is a PNG produced by a layout engine; asserting anything beyond status and content type means image snapshots, which are brittle across platforms. Accepted: the test proves it renders, a human confirms it looks right once.

**Token duplication in the OG image.** Values are literals there and variables everywhere else, so a palette change can silently skip it. Mitigated by a comment, not by tooling. A future test could compare the literals against `tokens.css`.

**The avataaar's palette is fixed.** It will not follow the theme. Acceptable for a portrait; it is the reason it was rejected for the icon slots.

## Resolved by default

These three were raised at spec review and left unanswered — the reviewer said "continue". They are recorded as decisions so the implementation plan has no holes in it, but none was actively chosen and each is cheap to reverse.

1. **No mark in the nav.** `GlobalNav` is untouched. Reversing means adding the mark as a seventh item or replacing the "Home" link, and rechecking the 375px wrap.
2. **Portrait on the homepage only.** `ProfileHeader`'s `portrait` prop is optional, so adding it to `/about` later is a one-line change at the call site with no component work.
3. **Avataaar reused as-is.** Copied unchanged from `legacy-v1/public/imgs/avataaars.svg`. The generator options are preserved in a comment in `legacy-v1/src/components/page/main.tsx`; that comment moves across with the asset so regenerating later stays possible after `legacy-v1` is deleted.

## Follow-on

The PWA project consumes the icon set produced here. The hero-motion project can use `SiteMark` if a self-drawing stroke turns out to be the right idea, which is why the mark stays a stroked path rather than a filled shape.
