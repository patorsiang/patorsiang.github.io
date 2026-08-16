# Brand Mark and Portrait Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give `apps/portfolio-web` its own identity — replace Vercel's default favicon with a geometric `P` mark, rebuild the off-brand OG image, and put a portrait of the owner on the homepage.

**Architecture:** One `src/lib/brand.ts` module holds the mark geometry and the two token colours as constants. A hand-run Node script (`scripts/generate-brand-assets.ts`) reads those constants and writes every raster and file-format artefact — `icon.svg`, `favicon.ico`, `apple-icon.png`, and the PWA PNG set — using Playwright, which is already a devDependency, to rasterise. A `SiteMark` React atom renders the same geometry in-page for the OG image. A unit test asserts the committed `icon.svg` still matches `MARK_PATH`, so editing the constant without regenerating fails the build.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind v4, TypeScript, Bun (runtime + test runner), Playwright (e2e + rasterising), `next/og` `ImageResponse`.

## Global Constraints

- Spec: `docs/superpowers/specs/2026-08-09-brand-mark-and-portrait-design.md`. Read it before starting.
- Mark geometry, exact: viewBox `0 0 100 100`, path `M34 82 V24 H54 a17 17 0 1 1 0 34 H34`, `fill="none"`, `stroke-width="15"`, `stroke-linecap="round"`, `stroke-linejoin="round"`.
- Token colours, exact: light accent `#0f766e`, dark accent `#5eead4`, light page `#fafaf9`, dark page `#111110`, on-accent `#ffffff`. Source of truth is `packages/ui/tokens.css`; anything outside the CSS pipeline duplicates them via `src/lib/brand.ts` only.
- `currentColor` for in-page rendering only. Favicon files embed literal colours and switch on `prefers-color-scheme`.
- Tailwind custom properties use the shorthand `bg-(--color-x)`, never `bg-[var(--color-x)]`.
- Do not touch `GlobalNav`. No mark in the navigation (spec, "Resolved by default").
- Do not add a PWA manifest or service worker. This plan produces icons only.
- Run `bun run format` before every commit. CI runs `format:check`, `lint`, `typecheck`, `test`, `build`, `test:e2e`, `build:storybook`.
- All commands run from the repo root unless stated.

---

### Task 1: Mark constants, `icon.svg`, and the drift guard

**Files:**

- Create: `apps/portfolio-web/src/lib/brand.ts`
- Create: `apps/portfolio-web/src/lib/brand.test.ts`
- Create: `apps/portfolio-web/scripts/generate-brand-assets.ts`
- Create: `apps/portfolio-web/src/app/icon.svg` (written by the script, committed)

**Interfaces:**

- Produces: `MARK_VIEW_BOX: string`, `MARK_PATH: string`, `MARK_STROKE_WIDTH: number`, `BRAND_COLORS: { accentLight: string; accentDark: string; pageLight: string; pageDark: string; onAccent: string }`, and `buildIconSvg(): string` — all from `@/lib/brand`.

- [ ] **Step 1: Write the failing test**

Create `apps/portfolio-web/src/lib/brand.test.ts`:

```ts
import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { buildIconSvg, MARK_PATH } from "./brand";

const iconPath = join(import.meta.dir, "../app/icon.svg");

describe("committed brand assets", () => {
  // Icons are the one asset nobody looks at twice - create-next-app's Vercel
  // triangle shipped for months unnoticed. This fails if MARK_PATH is edited
  // without rerunning scripts/generate-brand-assets.ts.
  test("icon.svg still contains the current mark path", () => {
    const committed = readFileSync(iconPath, "utf8");

    expect(committed).toContain(MARK_PATH);
  });

  test("icon.svg is byte-identical to what the generator would write", () => {
    const committed = readFileSync(iconPath, "utf8");

    expect(committed).toBe(buildIconSvg());
  });

  test("icon.svg carries both theme colours, since a favicon cannot inherit currentColor", () => {
    const committed = readFileSync(iconPath, "utf8");

    expect(committed).toContain("#0f766e");
    expect(committed).toContain("#5eead4");
    expect(committed).not.toContain("currentColor");
  });
});
```

- [ ] **Step 2: Run the test and confirm it fails**

Run: `bun test apps/portfolio-web/src/lib/brand.test.ts`
Expected: FAIL — `Cannot find module './brand'`.

- [ ] **Step 3: Write `src/lib/brand.ts`**

```ts
/**
 * Geometry and colour for the site mark.
 *
 * Everything that draws the mark reads from here: the SiteMark component, the
 * OG image, and scripts/generate-brand-assets.ts.
 *
 * The colours are duplicated from packages/ui/tokens.css on purpose. icon.svg
 * and the OG image both render outside the CSS pipeline and cannot resolve
 * custom properties, so the literals have to live somewhere - this file is that
 * somewhere, rather than each renderer inventing its own copy. If a token
 * changes in tokens.css, change it here too.
 */
export const MARK_VIEW_BOX = "0 0 100 100";
export const MARK_PATH = "M34 82 V24 H54 a17 17 0 1 1 0 34 H34";
export const MARK_STROKE_WIDTH = 15;

export const BRAND_COLORS = {
  accentLight: "#0f766e",
  accentDark: "#5eead4",
  pageLight: "#fafaf9",
  pageDark: "#111110",
  onAccent: "#ffffff",
} as const;

/**
 * The favicon, as a string.
 *
 * A favicon is a separate document: it inherits nothing from the page, so
 * `currentColor` would resolve to black rather than the accent token. The two
 * values are embedded and switched on prefers-color-scheme, which is the only
 * theme signal a favicon can see.
 */
export function buildIconSvg(): string {
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${MARK_VIEW_BOX}">`,
    `<style>`,
    `path{stroke:${BRAND_COLORS.accentLight}}`,
    `@media (prefers-color-scheme:dark){path{stroke:${BRAND_COLORS.accentDark}}}`,
    `</style>`,
    `<path d="${MARK_PATH}" fill="none" stroke-width="${MARK_STROKE_WIDTH}"`,
    ` stroke-linecap="round" stroke-linejoin="round"/>`,
    `</svg>`,
  ].join("");
}
```

- [ ] **Step 4: Write the generator, `icon.svg` half only**

Create `apps/portfolio-web/scripts/generate-brand-assets.ts`:

```ts
/**
 * Writes every brand artefact that cannot be produced by the CSS pipeline.
 *
 * Run by hand after changing anything in src/lib/brand.ts:
 *   bun run --cwd apps/portfolio-web generate:brand
 *
 * Deliberately not wired into CI. These are committed artefacts; regenerating
 * them on every run would produce diff noise and, worse, make the drift test in
 * src/lib/brand.test.ts self-fulfilling.
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";

import { buildIconSvg } from "../src/lib/brand";

const appDir = join(import.meta.dir, "../src/app");

function writeIconSvg() {
  const target = join(appDir, "icon.svg");
  writeFileSync(target, buildIconSvg(), "utf8");
  console.log(`wrote ${target}`);
}

writeIconSvg();
```

- [ ] **Step 5: Add the script entry**

In `apps/portfolio-web/package.json`, add to `"scripts"`, after `"test:e2e"`:

```json
"generate:brand": "bun run scripts/generate-brand-assets.ts",
```

- [ ] **Step 6: Generate the icon**

Run: `bun run --cwd apps/portfolio-web generate:brand`
Expected: prints `wrote .../src/app/icon.svg`, and the file exists.

- [ ] **Step 7: Run the test and confirm it passes**

Run: `bun test apps/portfolio-web/src/lib/brand.test.ts`
Expected: 3 pass, 0 fail.

- [ ] **Step 8: Prove the drift guard actually guards**

Temporarily change `MARK_STROKE_WIDTH` to `14` in `src/lib/brand.ts`, then run:
`bun test apps/portfolio-web/src/lib/brand.test.ts`
Expected: the byte-identical test FAILS. Restore `15` and confirm it passes again.

A test that has never failed proves nothing. Do not skip this step.

- [ ] **Step 9: Commit**

```bash
bun run format
git add apps/portfolio-web/src/lib/brand.ts apps/portfolio-web/src/lib/brand.test.ts \
        apps/portfolio-web/scripts/generate-brand-assets.ts \
        apps/portfolio-web/src/app/icon.svg apps/portfolio-web/package.json
git commit -m "feat(brand): add the site mark and generate icon.svg

Geometry and the two theme colours live in src/lib/brand.ts so every
renderer outside the CSS pipeline reads one source. icon.svg embeds the
colours and switches on prefers-color-scheme, because a favicon is a
separate document and cannot inherit currentColor.

A unit test asserts the committed icon.svg is byte-identical to what the
generator would write, so editing the constants without regenerating
fails. Verified by changing the stroke width and watching it fail."
```

---

### Task 2: Raster icons and the end of the Vercel triangle

**Files:**

- Modify: `apps/portfolio-web/scripts/generate-brand-assets.ts`
- Create: `apps/portfolio-web/src/app/apple-icon.png` (180×180)
- Create: `apps/portfolio-web/public/icons/icon-192.png`
- Create: `apps/portfolio-web/public/icons/icon-512.png`
- Create: `apps/portfolio-web/public/icons/icon-maskable-512.png`
- Modify: `apps/portfolio-web/src/app/favicon.ico` (replaced)
- Create: `apps/portfolio-web/e2e/brand.e2e.ts`

**Interfaces:**

- Consumes: `MARK_PATH`, `MARK_VIEW_BOX`, `MARK_STROKE_WIDTH`, `BRAND_COLORS` from `../src/lib/brand`.
- Produces: PNG icon files at the paths above, consumed later by the PWA project's manifest.

- [ ] **Step 1: Write the failing e2e test**

Create `apps/portfolio-web/e2e/brand.e2e.ts`:

```ts
import { test, expect } from "@playwright/test";

/**
 * The Vercel triangle from create-next-app shipped as this site's identity for
 * months, because a favicon is the one asset nobody looks at twice. These tests
 * are the thing that would have caught it.
 */

/** Byte length of create-next-app's default favicon.ico. */
const VERCEL_DEFAULT_FAVICON_BYTES = 25_931;

test("favicon.ico is served and is not the create-next-app default", async ({ request }) => {
  const response = await request.get("/favicon.ico");

  expect(response.status()).toBe(200);

  const body = await response.body();
  expect(body.byteLength, "favicon.ico is still byte-for-byte the Vercel triangle").not.toBe(
    VERCEL_DEFAULT_FAVICON_BYTES,
  );
});

test("icon.svg is served as SVG", async ({ request }) => {
  const response = await request.get("/icon.svg");

  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("svg");
});

test("apple-icon.png is served as PNG", async ({ request }) => {
  const response = await request.get("/apple-icon.png");

  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("png");
});

for (const icon of ["icon-192.png", "icon-512.png", "icon-maskable-512.png"]) {
  test(`${icon} is served for the PWA project to consume`, async ({ request }) => {
    const response = await request.get(`/icons/${icon}`);

    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("png");
  });
}

test("the document declares an icon", async ({ page }) => {
  await page.goto("/");

  const iconHref = await page.locator('link[rel="icon"]').first().getAttribute("href");

  expect(iconHref, "Next emitted no icon link").toBeTruthy();
});
```

- [ ] **Step 2: Run it and confirm it fails**

Run: `bun run --cwd apps/portfolio-web test:e2e --project=mobile e2e/brand.e2e.ts`
Expected: the three `/icons/*.png` tests fail with 404, and `favicon.ico` fails because the body is still 25,931 bytes.

- [ ] **Step 3: Extend the generator to rasterise**

Replace the whole of `apps/portfolio-web/scripts/generate-brand-assets.ts` with:

```ts
/**
 * Writes every brand artefact that cannot be produced by the CSS pipeline.
 *
 * Run by hand after changing anything in src/lib/brand.ts:
 *   bun run --cwd apps/portfolio-web generate:brand
 *
 * Deliberately not wired into CI. These are committed artefacts; regenerating
 * them on every run would produce diff noise and, worse, make the drift test in
 * src/lib/brand.test.ts self-fulfilling.
 *
 * Rasterising uses Playwright rather than an image library: it is already a
 * devDependency for the e2e suite, so this adds nothing to install, and the
 * engine that renders the site renders its icons.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

import { chromium } from "@playwright/test";

import {
  buildIconSvg,
  BRAND_COLORS,
  MARK_PATH,
  MARK_STROKE_WIDTH,
  MARK_VIEW_BOX,
} from "../src/lib/brand";

const appDir = join(import.meta.dir, "../src/app");
const iconsDir = join(import.meta.dir, "../public/icons");

type TileOptions = {
  /** Fraction of the canvas the glyph may occupy. */
  readonly scale: number;
  readonly background: string;
  readonly stroke: string;
};

/**
 * A full-bleed tile with the glyph inset.
 *
 * Android crops maskable icons to a circle and guarantees only the inner 80%,
 * so a maskable tile passes scale 0.6 to keep the glyph well inside that. A
 * bare glyph on transparency is never correct for an icon slot: the launcher
 * either clips it or floats it on white.
 */
function buildTileHtml(size: number, { scale, background, stroke }: TileOptions): string {
  const inset = ((1 - scale) / 2) * 100;

  return `<!doctype html><html><body style="margin:0">
<div style="width:${size}px;height:${size}px;background:${background};display:flex;align-items:center;justify-content:center">
  <svg viewBox="${MARK_VIEW_BOX}" width="${size * scale}" height="${size * scale}"
       style="margin:${inset}px" fill="none" stroke="${stroke}"
       stroke-width="${MARK_STROKE_WIDTH}" stroke-linecap="round" stroke-linejoin="round">
    <path d="${MARK_PATH}"/>
  </svg>
</div></body></html>`;
}

/**
 * An ICO is a 6-byte header, one 16-byte directory entry per image, then the
 * payloads. Embedding a PNG payload has been legal since Vista, so a single
 * 256x256 PNG wrapped in that header is a valid .ico - which avoids adding an
 * image-encoding dependency for one file.
 */
function pngToIco(png: Buffer): Buffer {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type 1 = icon
  header.writeUInt16LE(1, 4); // one image

  const entry = Buffer.alloc(16);
  entry.writeUInt8(0, 0); // width 0 means 256
  entry.writeUInt8(0, 1); // height 0 means 256
  entry.writeUInt8(0, 2); // palette size, 0 for truecolour
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(1, 4); // colour planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(png.byteLength, 8);
  entry.writeUInt32LE(header.byteLength + entry.byteLength, 12);

  return Buffer.concat([header, entry, png]);
}

async function main() {
  writeFileSync(join(appDir, "icon.svg"), buildIconSvg(), "utf8");
  console.log("wrote icon.svg");

  mkdirSync(iconsDir, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage();

  const shoot = async (size: number, options: TileOptions): Promise<Buffer> => {
    await page.setViewportSize({ width: size, height: size });
    await page.setContent(buildTileHtml(size, options));
    return page.screenshot({ omitBackground: false });
  };

  const tile: TileOptions = {
    scale: 0.68,
    background: BRAND_COLORS.accentLight,
    stroke: BRAND_COLORS.onAccent,
  };
  const maskable: TileOptions = { ...tile, scale: 0.6 };

  const targets: { path: string; size: number; options: TileOptions }[] = [
    { path: join(appDir, "apple-icon.png"), size: 180, options: tile },
    { path: join(iconsDir, "icon-192.png"), size: 192, options: tile },
    { path: join(iconsDir, "icon-512.png"), size: 512, options: tile },
    { path: join(iconsDir, "icon-maskable-512.png"), size: 512, options: maskable },
  ];

  for (const target of targets) {
    writeFileSync(target.path, await shoot(target.size, target.options));
    console.log(`wrote ${target.path}`);
  }

  const ico = await shoot(256, tile);
  writeFileSync(join(appDir, "favicon.ico"), pngToIco(ico));
  console.log("wrote favicon.ico");

  await browser.close();
}

await main();
```

- [ ] **Step 4: Generate the rasters**

Run: `bun run --cwd apps/portfolio-web generate:brand`
Expected: six `wrote …` lines. Confirm `src/app/favicon.ico` is no longer 25,931 bytes:
`wc -c apps/portfolio-web/src/app/favicon.ico`

- [ ] **Step 5: Look at what was generated**

Open `apps/portfolio-web/src/app/apple-icon.png` and `public/icons/icon-maskable-512.png` and confirm: teal tile, white glyph, centred, glyph well inside the circle for the maskable one. An icon that generates without error but looks wrong is the failure mode here — the test cannot see this, so you must.

- [ ] **Step 6: Run the e2e tests and confirm they pass**

Run: `bun run --cwd apps/portfolio-web test:e2e e2e/brand.e2e.ts`
Expected: all pass on both projects.

- [ ] **Step 7: Run the whole suite**

Run: `bun run --cwd apps/portfolio-web test:e2e`
Expected: every previously passing test still passes.

- [ ] **Step 8: Commit**

```bash
bun run format
git add apps/portfolio-web/scripts/generate-brand-assets.ts \
        apps/portfolio-web/src/app/favicon.ico apps/portfolio-web/src/app/apple-icon.png \
        apps/portfolio-web/public/icons apps/portfolio-web/e2e/brand.e2e.ts
git commit -m "feat(brand): replace the Vercel favicon and add the icon set

favicon.ico was create-next-app's default triangle, so every tab and
bookmark showed Vercel's mark as this site's identity. Now generated from
MARK_PATH, along with apple-icon and the 192/512/maskable PNGs the PWA
project will consume.

Rasterising uses Playwright, already a devDependency, rather than adding
an image library. The .ico is assembled by hand - an ICO is a 6-byte
header plus a directory entry around a PNG payload - for the same reason.

The maskable variant insets the glyph to 60% because Android crops to a
circle and guarantees only the inner 80%."
```

---

### Task 3: `SiteMark` atom and the rebuilt OG image

**Files:**

- Create: `apps/portfolio-web/src/components/atoms/SiteMark.tsx`
- Create: `apps/portfolio-web/src/components/stories/SiteMark.stories.tsx`
- Modify: `apps/portfolio-web/src/app/opengraph-image.tsx` (replace entirely)
- Modify: `apps/portfolio-web/e2e/brand.e2e.ts` (append)

**Interfaces:**

- Consumes: `MARK_PATH`, `MARK_VIEW_BOX`, `MARK_STROKE_WIDTH`, `BRAND_COLORS` from `@/lib/brand`; `ownerName` from `@/lib/seo`; `profile` from `@patorsiang/content`.
- Produces: `SiteMark({ size, className, title }: { size?: number; className?: string; title?: string })` — default export absent, named export only.

- [ ] **Step 1: Write the failing test**

Append to `apps/portfolio-web/e2e/brand.e2e.ts`:

```ts
test("the OG image renders as a PNG", async ({ request }) => {
  const response = await request.get("/opengraph-image");

  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("png");

  // Satori fails softly on unsupported CSS, producing a near-empty image
  // rather than an error. A byte floor catches that.
  const body = await response.body();
  expect(body.byteLength, "OG image looks empty").toBeGreaterThan(5_000);
});

test("the OG meta tag points at the image", async ({ page }) => {
  await page.goto("/");

  const ogImage = await page.locator('meta[property="og:image"]').first().getAttribute("content");

  expect(ogImage).toContain("opengraph-image");
});
```

- [ ] **Step 2: Run it and confirm the byte-floor test passes but for the wrong reason**

Run: `bun run --cwd apps/portfolio-web test:e2e --project=mobile e2e/brand.e2e.ts`
Expected: both new tests PASS — the old OG image already renders. That is fine: these two guard the rewrite in step 4 against regressing, they are not the point of the task. Note it and continue.

- [ ] **Step 3: Write `SiteMark`**

Create `apps/portfolio-web/src/components/atoms/SiteMark.tsx`:

```tsx
import { MARK_PATH, MARK_STROKE_WIDTH, MARK_VIEW_BOX } from "@/lib/brand";

type SiteMarkProps = {
  readonly size?: number;
  readonly className?: string;
  /**
   * Accessible name. Omit when the mark sits next to the site name, which is
   * the usual case - naming it there would make a screen reader announce the
   * brand twice.
   */
  readonly title?: string;
};

/**
 * The site mark, in-page. Inherits `currentColor`, so it follows
 * `--color-accent` in both themes with no second asset.
 *
 * The favicon cannot do this and embeds its colours instead - see
 * buildIconSvg in @/lib/brand.
 */
export function SiteMark({ size = 24, className, title }: SiteMarkProps) {
  return (
    <svg
      viewBox={MARK_VIEW_BOX}
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={MARK_STROKE_WIDTH}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      <path d={MARK_PATH} />
    </svg>
  );
}
```

- [ ] **Step 4: Replace the OG image**

Replace the whole of `apps/portfolio-web/src/app/opengraph-image.tsx`:

```tsx
import { profile } from "@patorsiang/content";
import { ImageResponse } from "next/og";

import { BRAND_COLORS, MARK_PATH, MARK_STROKE_WIDTH, MARK_VIEW_BOX } from "@/lib/brand";
import { ownerName } from "@/lib/seo";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

/**
 * Rendered by Satori, outside the CSS pipeline: no custom properties, no
 * Tailwind, and no access to the Geist webfont without shipping the file. The
 * colours come from @/lib/brand so they are at least duplicated once rather
 * than reinvented here.
 *
 * SiteMark is not reused for the same reason - Satori takes a restricted
 * subset of SVG and it is safer to inline the path than to rely on a component
 * rendering identically under a different engine.
 */
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 86px",
        background: BRAND_COLORS.pageLight,
        fontFamily: "sans-serif",
      }}
    >
      <svg
        viewBox={MARK_VIEW_BOX}
        width={96}
        height={96}
        fill="none"
        stroke={BRAND_COLORS.accentLight}
        strokeWidth={MARK_STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={MARK_PATH} />
      </svg>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ fontSize: 72, fontWeight: 700, color: "#18181b", lineHeight: 1.05 }}>
          {ownerName}
        </div>
        <div style={{ fontSize: 34, color: "#3f3f46", lineHeight: 1.35, maxWidth: 900 }}>
          {profile.headline.en}
        </div>
      </div>
    </div>,
    size,
  );
}
```

- [ ] **Step 5: Add a Storybook story**

Create `apps/portfolio-web/src/components/stories/SiteMark.stories.tsx`:

```tsx
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SiteMark } from "@/components/atoms/SiteMark";

const meta = {
  title: "Atoms/SiteMark",
  component: SiteMark,
} satisfies Meta<typeof SiteMark>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { size: 96 },
};

/** The size that decides whether a mark works. */
export const Favicon: Story = {
  args: { size: 16 },
};

export const Named: Story = {
  args: { size: 96, title: "Patorsiang" },
};
```

- [ ] **Step 6: Look at the OG image**

Run `bun run --cwd apps/portfolio-web dev`, open `http://localhost:3000/opengraph-image`, and confirm: warm off-white background, teal mark top-left, name and the current headline. It must read at thumbnail size — shrink the browser window to check. Stop the dev server afterwards.

- [ ] **Step 7: Run tests**

Run: `bun run --cwd apps/portfolio-web test:e2e e2e/brand.e2e.ts`
Then: `bun run typecheck && bun run lint && bun run build:storybook`
Expected: all pass.

- [ ] **Step 8: Commit**

```bash
bun run format
git add apps/portfolio-web/src/components/atoms/SiteMark.tsx \
        apps/portfolio-web/src/components/stories/SiteMark.stories.tsx \
        apps/portfolio-web/src/app/opengraph-image.tsx apps/portfolio-web/e2e/brand.e2e.ts
git commit -m "feat(brand): rebuild the OG image on the design tokens

The old one was sky-blue Arial on a palette that is not the design system,
carrying a strapline the copy refresh in 0df1e9c already replaced - and it
is the image every LinkedIn and Slack share renders.

Now the mark, the owner name, and the live headline from the content
model, on the page token. Colours come from src/lib/brand rather than new
literals.

SiteMark exists for in-page use and takes currentColor. The OG image
inlines the path instead: Satori accepts a restricted subset of SVG, and
relying on a component to render identically under a different engine is
not worth the reuse."
```

---

### Task 4: Portrait on the homepage, and clearing out the template files

**Files:**

- Modify: `apps/portfolio-web/src/components/organisms/ProfileHeader.tsx`
- Modify: `apps/portfolio-web/src/app/page.tsx:42-62`
- Create: `apps/portfolio-web/public/avataaars.svg` (copied from `legacy-v1/public/imgs/avataaars.svg`)
- Delete: `apps/portfolio-web/public/file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`
- Modify: `apps/portfolio-web/e2e/brand.e2e.ts` (append)

**Interfaces:**

- Consumes: `ProfileHeader` props as they exist today — `handle`, `name`, `role`, `headline`, `links`.
- Produces: `ProfileHeader` gains `portrait?: { readonly src: string; readonly alt: string }`. Optional, so `/about` and every other consumer is unaffected.

- [ ] **Step 1: Write the failing test**

Append to `apps/portfolio-web/e2e/brand.e2e.ts`:

```ts
test("the homepage shows a portrait with a real alt text", async ({ page }) => {
  await page.goto("/");

  const portrait = page.locator('header img[alt*="Napatchol"]');

  await expect(portrait).toHaveCount(1);
  await expect(portrait).toBeVisible();
});

for (const dead of ["file.svg", "globe.svg", "next.svg", "vercel.svg", "window.svg"]) {
  test(`the unused template file ${dead} is gone`, async ({ request }) => {
    const response = await request.get(`/${dead}`);

    expect(response.status()).toBe(404);
  });
}
```

- [ ] **Step 2: Run it and confirm it fails**

Run: `bun run --cwd apps/portfolio-web test:e2e --project=mobile e2e/brand.e2e.ts`
Expected: the portrait test fails with 0 elements; the five template tests fail with 200.

- [ ] **Step 3: Move the avataaar and delete the dead files**

```bash
cp legacy-v1/public/imgs/avataaars.svg apps/portfolio-web/public/avataaars.svg
git rm apps/portfolio-web/public/file.svg apps/portfolio-web/public/globe.svg \
       apps/portfolio-web/public/next.svg apps/portfolio-web/public/vercel.svg \
       apps/portfolio-web/public/window.svg
```

`legacy-v1` is scheduled for deletion, so the asset cannot stay there. Leave the legacy copy in place — this plan does not touch `legacy-v1`.

- [ ] **Step 4: Add the `portrait` prop to `ProfileHeader`**

Replace the whole of `apps/portfolio-web/src/components/organisms/ProfileHeader.tsx`:

```tsx
import Image from "next/image";

import { ContactLinks, type ContactLink } from "@/components/molecules/ContactLinks";

type ProfileHeaderProps = {
  readonly handle: string;
  readonly name: string;
  readonly role: string;
  readonly headline: string;
  readonly links: readonly ContactLink[];
  /**
   * Optional so every other consumer keeps rendering exactly as before.
   * The alt text describes the person, not the file.
   */
  readonly portrait?: {
    readonly src: string;
    readonly alt: string;
  };
};

export function ProfileHeader({
  handle,
  name,
  role,
  headline,
  links,
  portrait,
}: ProfileHeaderProps) {
  return (
    <header className="flex flex-col gap-8 border-b border-(--color-border) pb-10 lg:flex-row lg:items-end lg:justify-between">
      <div className="flex max-w-3xl flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
        {portrait ? (
          <Image
            src={portrait.src}
            alt={portrait.alt}
            width={112}
            height={112}
            // The source is an SVG illustration, so Next's optimiser is both
            // unnecessary and disabled for SVG by default. Matches how the CV
            // QR code is rendered.
            unoptimized
            className="h-24 w-24 shrink-0 sm:h-28 sm:w-28"
          />
        ) : null}
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-(--color-accent)">
            {handle}
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-foreground sm:text-6xl">
            {name}
          </h1>
          <p className="mt-4 text-xl font-medium text-(--color-text-muted)">{role}</p>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-(--color-text-muted)">{headline}</p>
        </div>
      </div>
      <ContactLinks links={links} />
    </header>
  );
}
```

- [ ] **Step 5: Pass the portrait on the homepage only**

In `apps/portfolio-web/src/app/page.tsx`, add one prop to the existing `<ProfileHeader>` call, immediately after `headline={profile.headline.en}`:

```tsx
        portrait={{
          src: "/avataaars.svg",
          alt: `Illustrated portrait of ${profile.name.en}`,
        }}
```

Leave `/about` alone — it does not render `ProfileHeader`, and the spec puts the portrait on the homepage only.

- [ ] **Step 6: Run the tests**

Run: `bun run --cwd apps/portfolio-web test:e2e e2e/brand.e2e.ts`
Expected: all pass.

- [ ] **Step 7: Run the full suite, and mean it**

Run: `bun run --cwd apps/portfolio-web test:e2e`
Expected: everything passes. The tap-target, contrast, focus-visible and reduced-motion suites sweep every route, so they check the new portrait and header layout automatically — if the header change broke contrast or spacing, that is where it shows up.

- [ ] **Step 8: Look at the homepage**

Run `bun run --cwd apps/portfolio-web dev` and check `http://localhost:3000/` at 375px and 1280px: the portrait stacks above the name block on mobile and sits beside it from `sm` up. Stop the dev server.

- [ ] **Step 9: Commit**

```bash
bun run format
git add apps/portfolio-web/src/components/organisms/ProfileHeader.tsx \
        apps/portfolio-web/src/app/page.tsx apps/portfolio-web/public \
        apps/portfolio-web/e2e/brand.e2e.ts
git commit -m "feat: put a portrait on the homepage, drop the template files

The site had no image of a person anywhere, which is part of why it read
colder than the legacy one. The avataaar comes across from legacy-v1,
which is scheduled for deletion.

It is a portrait, not a mark: it collapses at 16px and cannot render in
one colour, which is why the icon slots got a drawn mark instead. The
prop is optional, so /about and any future consumer are unaffected.

Also deletes the five unreferenced create-next-app SVGs that were still
being served from public/."
```

---

## Self-Review

**Spec coverage.** Every numbered item in the spec's "In" list maps to a task: `icon.svg` (1), `favicon.ico` (2), `apple-icon.png` (2), PWA icon set (2), OG image (3), `ProfileHeader` portrait (4), avataaar relocation (4), cleanup (4). The three "Resolved by default" decisions are honoured — `GlobalNav` is untouched, the portrait is homepage-only, and the avataaar is copied unchanged. The drift test the spec calls for is Task 1 Step 1.

**Placeholders.** None. Every code step contains the full file or the exact insertion, and every command is runnable as written.

**Type consistency.** `MARK_PATH`, `MARK_VIEW_BOX`, `MARK_STROKE_WIDTH`, `BRAND_COLORS` and `buildIconSvg` keep the same names and shapes in Tasks 1, 2 and 3. `SiteMark`'s props match its story. `ProfileHeader`'s new `portrait` shape matches the call site in Task 4 Step 5.

**Deviation from the spec, deliberate.** The spec says the OG image uses `SiteMark`. Task 3 inlines the path instead, because `ImageResponse` renders through Satori, which supports a restricted subset of SVG — relying on a React component to render identically under a different engine is a poor trade for that much reuse. Both still read the geometry from `@/lib/brand`, so the single-source property the spec wanted is preserved. Flagging rather than silently diverging.

**Known gap.** No test asserts the icons _look_ right — only that they exist, serve, and are not the Vercel bytes. Rendered-image assertions mean snapshot diffing, which is brittle across platforms. Task 2 Step 5 and Task 3 Step 6 are manual looks, deliberately placed before the commits.
