# Hero Motion and Interaction Consistency Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give the homepage a self-drawing brand-mark moment, and close two small motion-consistency gaps a sitewide sweep found: `TextLink` has no press feedback where `Button` already does, and theme changes snap instead of cross-fading.

**Architecture:** A new `HeroMark` atom draws `MARK_PATH` (from `@/lib/brand`, the same geometry `SiteMark`, the favicon and the OG image already share) via a CSS `stroke-dashoffset` transition, gated by `@starting-style` so the draw plays on first paint with no client component or mount-effect. `TextLink` and the global `body` rule each get one additive CSS change, reusing tokens and utility classes that already exist elsewhere in the codebase — no new values anywhere in this plan.

**Tech Stack:** Next.js 16 App Router, React 19 (server components throughout — nothing in this plan needs `"use client"`), Tailwind v4 (Lightning CSS, which supports native nesting and `@starting-style`), Bun (test runner), Playwright (e2e).

## Global Constraints

- Spec: `docs/superpowers/specs/2026-08-16-hero-motion-design.md`. Read it before starting.
- Hero mark geometry: read from `MARK_PATH`, `MARK_VIEW_BOX`, `MARK_STROKE_WIDTH` in `apps/portfolio-web/src/lib/brand.ts`. Do not hardcode the path string anywhere else.
- Hero mark duration/easing, exact: `500ms`, `cubic-bezier(0, 0, 0.2, 1)` — the same curve as `--default-transition-timing-function` in `packages/ui/tokens.css`, just held for longer. This is a **named exception** to `docs/design/motion-guidelines.md`'s 250ms cap, scoped to one-shot brand-mark reveals only — Task 1 adds that exception to the guideline itself before using it.
- Hero mark size and placement: 32px, to the left of the `handle` eyebrow text at the top of `ProfileHeader`. Homepage only — `ProfileHeader` has no other consumer today.
- `TextLink` fix: reuse the literal class `motion-safe:active:translate-y-px` — the same string already on `buttonClassName` (`apps/portfolio-web/src/components/atoms/button-styles.ts:12`). Do not invent a new value.
- Theme-swap fix: reuse `--default-transition-duration` (120ms) and `--default-transition-timing-function` (`cubic-bezier(0, 0, 0.2, 1)`), both already defined in `packages/ui/tokens.css`. Do not add new duration/easing tokens.
- This codebase has no component-level unit tests (`.test.tsx`) — checked, none exist anywhere under `apps/portfolio-web/src/components`. UI behavior is verified exclusively through Playwright e2e in `apps/portfolio-web/e2e/`. `bun:test` is reserved for pure logic modules (`brand.ts`, `posts.ts`). Follow this split; do not introduce a new unit-test pattern for components.
- The sitewide `@media (prefers-reduced-motion: reduce)` block already in `apps/portfolio-web/src/app/globals.css:198-207` forces every element's `transition-duration`/`animation-duration` to `0.01ms !important`. Every task in this plan relies on that existing block rather than writing its own reduced-motion handling — do not add a second, component-local reduced-motion media query anywhere in this plan.
- Run `bun run format` before every commit. CI runs `format:check`, `lint`, `typecheck`, `test`, `build`, `test:e2e`, `build:storybook`.
- All commands run from the repo root unless stated.

---

### Task 1: `HeroMark` — the self-drawing hero mark

**Files:**

- Modify: `apps/portfolio-web/src/lib/brand.ts` (add `MARK_DASH_LENGTH`)
- Modify: `apps/portfolio-web/src/lib/brand.test.ts` (append)
- Modify: `docs/design/motion-guidelines.md` (add the named exception)
- Create: `apps/portfolio-web/src/components/atoms/HeroMark.tsx`
- Modify: `apps/portfolio-web/src/app/globals.css` (add `.hero-mark-draw`)
- Modify: `apps/portfolio-web/src/components/organisms/ProfileHeader.tsx`
- Modify: `apps/portfolio-web/e2e/brand.e2e.ts` (append)

**Interfaces:**

- Consumes: `MARK_PATH`, `MARK_VIEW_BOX`, `MARK_STROKE_WIDTH` from `@/lib/brand` (all exist today).
- Produces: `MARK_DASH_LENGTH: number` from `@/lib/brand`. `HeroMark(): JSX.Element` from `@/components/atoms/HeroMark`, no props.

- [ ] **Step 1: Write the failing unit test for the dash-length guard**

Append to `apps/portfolio-web/src/lib/brand.test.ts`:

```ts
import { buildIconSvg, MARK_DASH_LENGTH, MARK_PATH } from "./brand";
```

(add `MARK_DASH_LENGTH` to the existing import on line 5, replacing it)

```ts
describe("MARK_DASH_LENGTH", () => {
  // Independent of SVGPathElement.getTotalLength() - there is no DOM here.
  // Recomputes the path's segments by hand from MARK_PATH's own numbers, so
  // this fails if MARK_PATH changes shape without MARK_DASH_LENGTH being
  // rechecked: stem is two straight runs (V then H), the bowl is a
  // semicircle (its chord equals its diameter, so both possible arc lengths
  // are identical), the base is a third straight run.
  test("covers the mark's actual stroke length, with room to spare", () => {
    const stem = 82 - 24 + (54 - 34); // V24 then H54, from M34 82
    const bowl = Math.PI * 17; // a17 17 0 1 1 0 34: radius 17, chord 34 = 2r
    const base = 54 - 34; // H34

    const actualLength = stem + bowl + base;

    expect(MARK_DASH_LENGTH).toBeGreaterThan(actualLength);
  });
});
```

- [ ] **Step 2: Run the test and confirm it fails**

Run: `bun test apps/portfolio-web/src/lib/brand.test.ts`
Expected: FAIL — `MARK_DASH_LENGTH` is not exported.

- [ ] **Step 3: Add `MARK_DASH_LENGTH` to `brand.ts`**

In `apps/portfolio-web/src/lib/brand.ts`, immediately after `export const MARK_STROKE_WIDTH = 15;` (line 23), add:

```ts
/**
 * Length, in MARK_PATH's own user-space units (the viewBox is 0 0 100 100,
 * so this is independent of any rendered size), that HeroMark's
 * stroke-dasharray uses to draw the mark on mount.
 *
 * Computed by hand rather than measured at runtime with
 * SVGPathElement.getTotalLength(): that needs a mounted DOM node, which
 * would force HeroMark into a client component and risk a
 * visible-then-hidden-then-drawn flash on hydration. The stem is two
 * straight runs of 58 and 20 units, the bowl is a semicircle of radius 17
 * (its chord equals its diameter, so both possible arc-length choices are
 * identical), and the base is a third straight run of 20 units:
 * 58 + 20 + (Math.PI * 17) + 20 ≈ 151.41. Rounded up to 160 so the dash
 * always fully covers the path - a dasharray longer than the path draws
 * with no visible gap once stroke-dashoffset reaches 0.
 */
export const MARK_DASH_LENGTH = 160;
```

- [ ] **Step 4: Run the test and confirm it passes**

Run: `bun test apps/portfolio-web/src/lib/brand.test.ts`
Expected: 4 pass, 0 fail (the 3 existing tests plus the new one).

- [ ] **Step 5: Add the named exception to `docs/design/motion-guidelines.md`**

In the `### Duration` table (starting line 50), add a row after `| Toast or temporary status entry | 150-220ms |`:

```markdown
| One-shot brand-mark reveal (named exception) | 500ms |
```

Immediately after the `Rules:` list under that table (after `- Never delay content appearance just to play an animation.`, line 64), add:

```markdown
- Exception: a one-shot brand-mark stroke-draw (e.g. the homepage hero mark) may run up to 500ms, since a self-drawing stroke at 250ms reads as a glitch rather than a draw. Scoped narrowly to that one moment - every other transition on this page keeps the 250ms cap above.
```

- [ ] **Step 6: Write the failing e2e test**

At the top of `apps/portfolio-web/e2e/brand.e2e.ts`, change line 1 from:

```ts
import { test, expect } from "@playwright/test";
```

to:

```ts
import { test, expect } from "@playwright/test";

import { MARK_DASH_LENGTH, MARK_PATH } from "../src/lib/brand";
```

Append to the end of the file:

```ts
test("the homepage renders the self-drawing hero mark, sourced from MARK_PATH", async ({
  page,
}) => {
  await page.goto("/");

  const mark = page.locator("header svg path.hero-mark-draw");

  await expect(mark).toHaveCount(1);
  await expect(mark).toHaveAttribute("d", MARK_PATH);

  // Past the 500ms draw, the mark must have settled fully drawn - not stuck
  // mid-stroke because @starting-style went unsupported, and not silently
  // clipped by an under-sized dasharray.
  await expect.poll(() => mark.evaluate((el) => getComputedStyle(el).strokeDashoffset)).toBe("0px");
});

test("MARK_DASH_LENGTH covers the mark's real rendered length, not just the hand computation", async ({
  page,
}) => {
  await page.goto("/");

  // Independent of the hand-derived arithmetic in brand.ts's comment and
  // brand.test.ts's drift guard - both of those could share the same
  // arithmetic mistake and still agree with each other. This measures the
  // path in a real browser's own geometry engine instead.
  const actualLength = await page
    .locator("header svg path.hero-mark-draw")
    .evaluate((el: SVGPathElement) => el.getTotalLength());

  expect(MARK_DASH_LENGTH).toBeGreaterThanOrEqual(actualLength);
});

test("under prefers-reduced-motion, the hero mark renders fully drawn with no transition", async ({
  page,
}) => {
  // Explicit, on top of the generic sitewide sweep in reduced-motion.e2e.ts
  // (Step 12 below runs that too) - this one names HeroMark specifically,
  // so a future refactor that breaks reduced-motion just for this
  // component (while the generic sweep still passes for some other
  // reason) fails here by name instead of as an unexplained page-wide
  // regression.
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const mark = page.locator("header svg path.hero-mark-draw");

  const { dashoffset, durationSeconds } = await mark.evaluate((el) => {
    const style = getComputedStyle(el);
    return {
      dashoffset: style.strokeDashoffset,
      durationSeconds: Number.parseFloat(style.transitionDuration),
    };
  });

  expect(dashoffset).toBe("0px");
  // The sitewide reduced-motion block forces this to 0.01ms (1e-5s).
  expect(durationSeconds).toBeLessThan(0.0001);
});
```

- [ ] **Step 7: Run it and confirm it fails**

Run: `bun run --cwd apps/portfolio-web test:e2e --project=mobile e2e/brand.e2e.ts`
Expected: all three new tests fail — `header svg path.hero-mark-draw` matches 0 elements, since `HeroMark` does not exist yet.

- [ ] **Step 8: Write `HeroMark`**

Create `apps/portfolio-web/src/components/atoms/HeroMark.tsx`:

```tsx
import { MARK_DASH_LENGTH, MARK_PATH, MARK_STROKE_WIDTH, MARK_VIEW_BOX } from "@/lib/brand";

/**
 * The site mark, self-drawing once on the homepage hero. A one-shot brand
 * moment, not a general-purpose mark - see SiteMark for that.
 *
 * Its own small SVG rather than a wrapper around SiteMark: the draw effect
 * needs a class on the <path> itself, and SiteMark exposes no such seam.
 * Both still read the same geometry from @/lib/brand, so there is one
 * source of truth for the shape.
 *
 * The draw is pure CSS (see .hero-mark-draw in globals.css) via
 * @starting-style, so this stays a server component - no client-side
 * mount effect, no hydration-visible flash.
 */
export function HeroMark() {
  return (
    <svg
      viewBox={MARK_VIEW_BOX}
      width={32}
      height={32}
      fill="none"
      stroke="currentColor"
      strokeWidth={MARK_STROKE_WIDTH}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-(--color-accent)"
      aria-hidden="true"
    >
      <path
        d={MARK_PATH}
        className="hero-mark-draw"
        style={{ "--hero-mark-dash-length": MARK_DASH_LENGTH } as React.CSSProperties}
      />
    </svg>
  );
}
```

`MARK_DASH_LENGTH` is piped into the CSS rule (Step 9) as a custom property instead of being duplicated as a literal there — React can pass a value into an inline style where a static file (`icon.svg`) genuinely could not, so unlike the colour literals in `src/lib/brand.ts`, this constant has exactly one source. The `as React.CSSProperties` cast is needed because custom properties aren't part of that type.

- [ ] **Step 9: Add the `.hero-mark-draw` CSS**

In `apps/portfolio-web/src/app/globals.css`, immediately after the `@utility tap-reach { ... }` block closes (after line 54, before the `/* Typography for rendered post markdown. */` comment), insert:

```css
/*
 * One-shot stroke-draw for HeroMark (components/atoms/HeroMark.tsx).
 * --hero-mark-dash-length is set inline by HeroMark from MARK_DASH_LENGTH
 * in src/lib/brand.ts - not duplicated as a literal here, since React can
 * pipe the constant into an inline style.
 *
 * @starting-style defines the pre-draw state for the very first paint, so
 * no client component or mount-effect is needed. Browsers without
 * @starting-style support just skip straight to the end state (fully
 * drawn) - a fine fallback, and also this component's prefers-reduced-motion
 * behaviour, handled for free by the sitewide reduced-motion block below:
 * no bespoke media query needed here.
 *
 * This degrades, it cannot crash: an unrecognised at-rule is dropped per
 * the CSS Syntax spec's error-recovery rules, not treated as a parse
 * error, and that has been true since CSS2.1 - not a recent leniency.
 * The only real support gap is browsers that understand CSS nesting but
 * not @starting-style itself (roughly Safari 16.4-17.3); there, the
 * nested block is discarded and .hero-mark-draw keeps only its end-state
 * declarations, so the mark simply never animates. globals.css already
 * ships color-mix() with no fallback (the ::selection rule), so this is
 * not a new risk category for this app. See "One-shot brand-mark reveals" in
 * docs/design/motion-guidelines.md for why 500ms exceeds the usual 250ms cap.
 */
.hero-mark-draw {
  stroke-dasharray: var(--hero-mark-dash-length);
  stroke-dashoffset: 0;
  transition: stroke-dashoffset 500ms cubic-bezier(0, 0, 0.2, 1);

  @starting-style {
    stroke-dashoffset: var(--hero-mark-dash-length);
  }
}
```

- [ ] **Step 10: Wire `HeroMark` into `ProfileHeader`**

In `apps/portfolio-web/src/components/organisms/ProfileHeader.tsx`, add the import after `import Image from "next/image";` (line 1):

```tsx
import { HeroMark } from "@/components/atoms/HeroMark";
```

Replace the existing handle paragraph:

```tsx
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-(--color-accent)">
            {handle}
          </p>
```

with:

```tsx
        <div>
          <div className="flex items-center gap-2">
            <HeroMark />
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-(--color-accent)">
              {handle}
            </p>
          </div>
```

- [ ] **Step 11: Run the e2e tests and confirm they pass**

Run: `bun run --cwd apps/portfolio-web test:e2e e2e/brand.e2e.ts`
Expected: all pass, including the three new tests, on every project.

- [ ] **Step 12: Confirm the generic reduced-motion sweep agrees**

Run: `bun run --cwd apps/portfolio-web test:e2e e2e/reduced-motion.e2e.ts`
Expected: all pass. Step 6's named reduced-motion test already proves `HeroMark` behaves correctly; this proves the sitewide `@media (prefers-reduced-motion: reduce)` block is still the reason why, across every route, not just this one.

- [ ] **Step 13: Look at it**

Run `bun run --cwd apps/portfolio-web dev`, open `http://localhost:3000/` in a real browser (not just Playwright), and confirm: the mark draws itself in next to the eyebrow text on load, teal in light mode, mint in dark mode, and reloading plays it again. Then in DevTools, enable "Emulate CSS prefers-reduced-motion: reduce" and reload — the mark should appear instantly, fully drawn, no animation. Stop the dev server afterwards.

- [ ] **Step 14: Run the full suite**

Run: `bun run --cwd apps/portfolio-web test:e2e`
Expected: everything passes, including the tap-target, contrast, and focus-visible sweeps, which now also cover `HeroMark` on every route that renders `ProfileHeader`.

- [ ] **Step 15: Commit**

```bash
bun run format
git add apps/portfolio-web/src/lib/brand.ts apps/portfolio-web/src/lib/brand.test.ts \
        docs/design/motion-guidelines.md \
        apps/portfolio-web/src/components/atoms/HeroMark.tsx \
        apps/portfolio-web/src/app/globals.css \
        apps/portfolio-web/src/components/organisms/ProfileHeader.tsx \
        apps/portfolio-web/e2e/brand.e2e.ts
git commit -m "feat(motion): self-draw the hero mark on the homepage

SiteMark stayed a stroked path rather than a filled shape specifically
so it could do this someday - see the brand-mark spec's follow-on note.
HeroMark draws it once on mount via a CSS stroke-dashoffset transition
gated by @starting-style, so it needs no client component.

500ms exceeds motion-guidelines.md's normal 250ms cap; a self-drawing
stroke at 250ms reads as a glitch, not a draw. Added as a named,
narrowly-scoped exception in the guideline itself rather than a silent
overrun, so it can't be cited to justify slower motion elsewhere.

No bespoke reduced-motion handling: the sitewide
prefers-reduced-motion block in globals.css already forces every
transition to near-zero, verified by running that suite with HeroMark
in place."
```

---

### Task 2: `TextLink` press feedback

**Files:**

- Modify: `apps/portfolio-web/src/components/atoms/TextLink.tsx`
- Create: `apps/portfolio-web/e2e/interaction-consistency.e2e.ts`

**Interfaces:**

- No new interfaces. `TextLink`'s props and exports are unchanged.

- [ ] **Step 1: Write the failing e2e test**

Create `apps/portfolio-web/e2e/interaction-consistency.e2e.ts`:

```ts
import { expect, test } from "@playwright/test";

/**
 * Covers two small motion-consistency gaps a sitewide sweep found against
 * docs/design/motion-guidelines.md's own "similar components should move
 * in similar ways" principle. See
 * docs/superpowers/specs/2026-08-16-hero-motion-design.md.
 */

test("text links get press feedback like buttons already do", async ({ page }) => {
  await page.goto("/");

  // "See all projects" is a plain TextLink, not a Button. Every TextLink on
  // the site shares the same sharedClassName, so one instance is
  // representative - this is a component-level guarantee, not a
  // per-page one.
  const link = page.getByRole("link", { name: "See all projects" });

  await expect(link).toHaveClass(/motion-safe:active:translate-y-px/);
});

test("under prefers-reduced-motion, text links don't shift when pressed", async ({ page }) => {
  // The class-presence test above only proves the utility is on the
  // element - `motion-safe:` wraps it in
  // @media (prefers-reduced-motion: no-preference), so it should not
  // apply at all under reduced motion, not just apply quickly. Checking
  // that means an actual press, not a computed-style read of a class name.
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const link = page.getByRole("link", { name: "See all projects" });
  const box = await link.boundingBox();
  if (!box) throw new Error("link has no layout box to press");

  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  const transform = await link.evaluate((el) => getComputedStyle(el).transform);
  await page.mouse.up();

  expect(transform).toBe("none");
});
```

- [ ] **Step 2: Run it and confirm it fails**

Run: `bun run --cwd apps/portfolio-web test:e2e --project=mobile e2e/interaction-consistency.e2e.ts`
Expected: the first test fails — the link's class list does not contain `motion-safe:active:translate-y-px`. The second test passes vacuously (there's no `:active` rule yet at all, reduced motion or not) - re-check it after Step 3, not before.

- [ ] **Step 3: Add the class to `TextLink`**

In `apps/portfolio-web/src/components/atoms/TextLink.tsx`, the `sharedClassName` is built on line 18. Change:

```ts
const sharedClassName = classNames(
  "font-semibold text-(--color-accent) underline-offset-4 transition hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-focus) print:text-zinc-800",
  className,
);
```

to:

```ts
const sharedClassName = classNames(
  "font-semibold text-(--color-accent) underline-offset-4 transition hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-focus) motion-safe:active:translate-y-px print:text-zinc-800",
  className,
);
```

(inserted `motion-safe:active:translate-y-px` before `print:text-zinc-800`, matching where `buttonClassName` places the same class relative to its own `print:`-adjacent utilities)

- [ ] **Step 4: Run the tests and confirm both pass, for real reasons now**

Run: `bun run --cwd apps/portfolio-web test:e2e e2e/interaction-consistency.e2e.ts`
Expected: both PASS — the second one non-vacuously this time, since there is now a real `:active` rule under test.

- [ ] **Step 5: Run the full suite**

Run: `bun run --cwd apps/portfolio-web test:e2e`
Expected: everything passes — this class already exists on `Button` and nav controls today with no regressions, so adding it to `TextLink` is not expected to change tap-target or focus behaviour.

- [ ] **Step 6: Commit**

```bash
bun run format
git add apps/portfolio-web/src/components/atoms/TextLink.tsx \
        apps/portfolio-web/e2e/interaction-consistency.e2e.ts
git commit -m "feat(motion): give TextLink press feedback like Button already has

Button and every nav control already carry
motion-safe:active:translate-y-px from an earlier motion-polish pass;
TextLink was the one interactive atom missing it, found by a sitewide
motion-consistency sweep. Same class, same value - no new tokens."
```

---

### Task 3: Theme-swap cross-fade

**Files:**

- Modify: `apps/portfolio-web/src/app/globals.css`
- Modify: `apps/portfolio-web/e2e/interaction-consistency.e2e.ts` (append)

**Interfaces:**

- No new interfaces. Pure CSS change.

- [ ] **Step 1: Write the failing e2e test**

Append to `apps/portfolio-web/e2e/interaction-consistency.e2e.ts`:

```ts
test("theme changes cross-fade instead of snapping", async ({ page }) => {
  // Explicit, not the reduced-motion helper in ./support/theme: that
  // collapses every duration to near-zero on purpose, which would hide
  // exactly the thing this test checks.
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");

  const { property, durationSeconds } = await page.evaluate(() => {
    const style = getComputedStyle(document.body);
    return {
      property: style.transitionProperty,
      durationSeconds: Number.parseFloat(style.transitionDuration),
    };
  });

  expect(property).toContain("color");
  expect(property).toContain("background-color");
  // --default-transition-duration is 120ms; computed style always reports
  // in seconds, hence 0.12.
  expect(durationSeconds).toBeCloseTo(0.12, 2);
});

test("under prefers-reduced-motion, theme changes don't ease either", async ({ page }) => {
  // Explicit, on top of the generic sitewide sweep in reduced-motion.e2e.ts
  // (Task 3 Step 5 below runs that too) - names body's new rule
  // specifically, the same reasoning as HeroMark's equivalent test.
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const durationSeconds = await page.evaluate(() =>
    Number.parseFloat(getComputedStyle(document.body).transitionDuration),
  );

  // The sitewide reduced-motion block forces this to 0.01ms (1e-5s).
  expect(durationSeconds).toBeLessThan(0.0001);
});
```

- [ ] **Step 2: Run it and confirm it fails**

Run: `bun run --cwd apps/portfolio-web test:e2e --project=mobile e2e/interaction-consistency.e2e.ts`
Expected: the first new test fails — `document.body`'s `transitionProperty` is `"none"`. The second passes vacuously (no transition-duration set at all yet, reduced motion or not) - re-check it after Step 3, same caveat as Task 2 Step 2.

- [ ] **Step 3: Extend the `body` rule**

In `apps/portfolio-web/src/app/globals.css`, change the `body` rule (lines 10-14) from:

```css
body {
  background: var(--color-page);
  color: var(--color-text);
  font-family: var(--font-geist-sans), Arial, Helvetica, sans-serif;
}
```

to:

```css
body {
  background: var(--color-page);
  color: var(--color-text);
  font-family: var(--font-geist-sans), Arial, Helvetica, sans-serif;
  /*
   * Only body, not every element: GlobalNav flips
   * document.documentElement.dataset.theme, which cascades new
   * --color-* values everywhere, but only elements that also carry a
   * transition ease into the new values. Buttons and nav controls
   * already do (their own `transition` class); most page surfaces
   * (this element, Card, Section) did not, so themes snapped instead of
   * cross-fading on everything but the smallest controls. Reuses the
   * same tokens Button and nav controls already transition with - no
   * new duration or easing anywhere in this rule.
   */
  transition-property: color, background-color;
  transition-duration: var(--default-transition-duration);
  transition-timing-function: var(--default-transition-timing-function);
}
```

- [ ] **Step 4: Run the tests and confirm all four in the file pass**

Run: `bun run --cwd apps/portfolio-web test:e2e e2e/interaction-consistency.e2e.ts`
Expected: all four pass (two from Task 2, two from this task) — the reduced-motion ones non-vacuously now.

- [ ] **Step 5: Confirm the generic reduced-motion sweep agrees**

Run: `bun run --cwd apps/portfolio-web test:e2e e2e/reduced-motion.e2e.ts`
Expected: all pass — same relationship as Task 1 Step 12: Step 1's named test already proves the new transition respects reduced motion, this proves the sitewide block is still the reason why, across every route.

- [ ] **Step 6: Look at it**

Run `bun run --cwd apps/portfolio-web dev`, open `http://localhost:3000/`, and toggle the theme control in the nav a few times. The whole page should ease between light and dark rather than flash-cutting. Stop the dev server afterwards.

- [ ] **Step 7: Run the full suite, and mean it**

Run: `bun run --cwd apps/portfolio-web test:e2e`
Expected: everything passes, across every route — this is a global CSS change, so the contrast and focus-visible sweeps (which run per-route) are the ones most likely to catch an unintended side effect.

- [ ] **Step 8: Commit**

```bash
bun run format
git add apps/portfolio-web/src/app/globals.css \
        apps/portfolio-web/e2e/interaction-consistency.e2e.ts
git commit -m "feat(motion): cross-fade theme changes instead of snapping

Only elements carrying their own transition class (buttons, nav
controls) eased between light and dark; body and everything that
inherits its colour from it snapped instantly. Extends body with the
same --default-transition-duration/-timing-function tokens those
controls already use - no new values."
```

---

## Self-Review

**Spec coverage.** All three "In" items from the spec map to a task: the guideline exception, `HeroMark`, and `ProfileHeader` wiring are Task 1; `TextLink` is Task 2; the `body` transition is Task 3. The spec's "Out" list is respected: no other page gets `HeroMark`, no motion library is added, and the rejected candidates (card stagger, nav-link hover, card lift) are untouched.

**Placeholders.** None. Every code step is a complete file or an exact diff; every command is runnable as written.

**Type consistency.** `MARK_DASH_LENGTH`, `MARK_PATH`, `MARK_VIEW_BOX`, `MARK_STROKE_WIDTH` keep the same names across Task 1's brand.ts, brand.test.ts, HeroMark.tsx, and globals.css comment. `HeroMark` takes no props anywhere it's referenced (Step 8 and Step 10 agree).

**Deviations from the spec, deliberate:**

1. **`HeroMark` does not wrap `SiteMark`.** The spec's Components section said it would; `SiteMark` exposes no way to add a class to its inner `<path>`, and adding one just for this single caller would widen a stable, already-shipped atom's API for a need nothing else has. `HeroMark` reads the same `@/lib/brand` constants directly instead — the spec's actual goal (one geometry source) is preserved, just not through composition. This mirrors the precedent already in this codebase: the OG image also inlines the path rather than reusing `SiteMark`, for its own separate reason (Satori's restricted SVG support).
2. **No client component or mount-effect.** The spec's Approach section described a `useEffect`-after-mount / `data-mounted` pattern, reasoning that `@starting-style` support is "inconsistent enough that this codebase's existing patterns lean on the mount-effect fallback." Checked: no such pattern actually exists anywhere in this codebase today — there was no precedent to lean on. `@starting-style` has shipped in every evergreen browser for over a year as of this plan's date and degrades safely (skipped transition, mark renders fully drawn) where unsupported, so Task 1 uses it directly. This is simpler, avoids a hydration-visible flash entirely, and needs no bespoke `prefers-reduced-motion` handling in the component.
3. **No bespoke `prefers-reduced-motion` check anywhere in this plan.** The spec's Approach section described explicitly setting `stroke-dashoffset: 0` with no transition under reduced motion. The sitewide `@media (prefers-reduced-motion: reduce)` block already in `globals.css` forces every element's transition duration to near-zero, which produces the same effect for free. Task 1 Step 12 and Task 3 Step 5 both run the existing reduced-motion suite to prove this rather than assert it.
4. **New test coverage the spec called "already covered."** The spec's Testing section said `TextLink`'s new class and the theme cross-fade needed no new tests, on the assumption that existing sweeps already exercise them. Checked: no existing test anywhere asserts a Tailwind utility class's presence or a `transitionProperty`/`transitionDuration` value — the tap-target, contrast, and focus-visible sweeps check different things entirely. Tasks 2 and 3 each add one small, targeted e2e test instead of relying on coverage that doesn't exist.

**Known gap.** No test asserts the hero mark's draw looks smooth, or that its easing curve visually reads as intended — that is a "look at it" step (Task 1 Step 13), same category of gap the brand-mark plan already accepted for the OG image and icon rasters.
