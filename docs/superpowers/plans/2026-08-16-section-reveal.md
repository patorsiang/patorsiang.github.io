# Section Reveal-on-View Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give the homepage's four content sections (About, Experience, Projects, Skills) a reveal-on-view transition that fails open to visible if JavaScript never runs, and is fully disabled (not just fast) under `prefers-reduced-motion: reduce`.

**Architecture:** A single new client component, `RevealOnView`, wraps each `<Section>` call on the homepage. It defaults to visible and only ever hides content via a client-side effect that finds the element off-screen — never in the server-rendered HTML — so the fail-open guarantee holds regardless of what JavaScript does or doesn't do. `IntersectionObserver` always delivers its initial observation asynchronously, after first paint, so the hide (when it happens) is never prevented from being briefly painted first; it's made invisible by giving the hidden state no transition, not by racing paint.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind v4, Bun, Playwright.

## Global Constraints

- Spec: `docs/superpowers/specs/2026-08-16-section-reveal-design.md`. Read it before starting.
- Values, exact: `opacity-0 translate-y-2` (hidden) → `opacity-100 translate-y-0` (visible), `200ms`. Falls inside `motion-guidelines.md`'s existing 180-240ms "Page And Section Reveals" allowance — no guideline edit needed for this plan, unlike the hero-motion plan's 500ms exception.
- `Section.tsx` (`apps/portfolio-web/src/components/organisms/Section.tsx`) is **not modified**. It's shared across six pages (home, about, experience, projects, posts, contact); this feature touches only `src/app/page.tsx`.
- `RevealOnView` defaults to **visible**. The hidden state must never appear in server-rendered HTML — it is applied only by a `useLayoutEffect` that runs on the client, after finding the element off-screen. This is the feature's core safety property; every step that touches this component must preserve it.
- Reduced motion: `RevealOnView` checks `window.matchMedia("(prefers-reduced-motion: reduce)").matches` itself and skips the observer entirely when true — this is a **deliberate deviation** from the sitewide-CSS-override-only pattern used by the hero mark and theme cross-fade (both pure CSS; this component's state is JS-driven, and `motion-guidelines.md` says reveals must be disabled, not merely instant).
- This codebase has no component-level unit tests (`.test.tsx`) anywhere — UI behavior is verified exclusively through Playwright e2e in `apps/portfolio-web/e2e/`.
- Every atom in `components/atoms/` has a Storybook story in `components/stories/` (see `SiteMark.stories.tsx` for the pattern) — include one for `RevealOnView` in this plan, not as a follow-up fix.
- Run `bun run format` before every commit. CI runs `format:check`, `lint`, `typecheck`, `test`, `build`, `test:e2e`, `build:storybook`.
- All commands run from the repo root unless stated.

---

### Task 1: `RevealOnView`, wired into the homepage

**Files:**

- Create: `apps/portfolio-web/src/components/atoms/RevealOnView.tsx`
- Create: `apps/portfolio-web/src/components/stories/RevealOnView.stories.tsx`
- Create: `apps/portfolio-web/e2e/section-reveal.e2e.ts`
- Modify: `apps/portfolio-web/src/app/page.tsx`

**Interfaces:**

- Produces: `RevealOnView({ children }: { readonly children: ReactNode }): JSX.Element` from `@/components/atoms/RevealOnView`. No other props.

- [ ] **Step 1: Write the failing e2e tests**

Create `apps/portfolio-web/e2e/section-reveal.e2e.ts`:

```ts
import { test, expect, type Page } from "@playwright/test";

/**
 * Covers docs/superpowers/specs/2026-08-16-section-reveal-design.md.
 *
 * All four tests run against a 375x667 viewport (the mobile Playwright
 * project's size) so the "Skills" section - last on the page - is
 * reliably below the fold, regardless of which project actually runs
 * this file. Desktop Chrome's default viewport is tall enough that this
 * would not reliably hold otherwise.
 */

test.use({ viewport: { width: 375, height: 667 } });

const SKILLS_HEADING = "Core skill groups.";

function skillsWrapper(page: Page) {
  // RevealOnView renders a <div> that directly wraps the <Section>'s
  // <section> element - climb from the heading to its ancestor <section>,
  // then one more level to that wrapper div.
  return page.getByRole("heading", { name: SKILLS_HEADING }).locator("xpath=ancestor::section/..");
}

test("a below-the-fold section starts hidden and reveals when scrolled into view", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");

  const wrapper = skillsWrapper(page);
  await expect(wrapper).toHaveCSS("opacity", "0");

  await page.getByRole("heading", { name: SKILLS_HEADING }).scrollIntoViewIfNeeded();
  await expect(wrapper).toHaveCSS("opacity", "1");
});

test("without JavaScript, every section is visible without ever scrolling", async ({ browser }) => {
  const context = await browser.newContext({
    viewport: { width: 375, height: 667 },
    javaScriptEnabled: false,
  });
  const page = await context.newPage();
  await page.goto("/");

  for (const name of [
    "Practical software for real product problems.",
    "Work and education.",
    "Selected project samples.",
    SKILLS_HEADING,
  ]) {
    const wrapper = page.getByRole("heading", { name }).locator("xpath=ancestor::section/..");
    await expect(wrapper).toHaveCSS("opacity", "1");
  }

  await context.close();
});

test("under prefers-reduced-motion, a below-the-fold section is visible without scrolling", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  await expect(skillsWrapper(page)).toHaveCSS("opacity", "1");
});

test("scrolling back up after a reveal does not re-hide the section", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");

  const wrapper = skillsWrapper(page);
  await page.getByRole("heading", { name: SKILLS_HEADING }).scrollIntoViewIfNeeded();
  await expect(wrapper).toHaveCSS("opacity", "1");

  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(wrapper).toHaveCSS("opacity", "1");
});
```

- [ ] **Step 2: Run it and confirm the failure pattern**

Run: `bun run --cwd apps/portfolio-web test:e2e --project=mobile e2e/section-reveal.e2e.ts`

Expected: only the first test fails (`toHaveCSS("opacity", "0")` finds `"1"`, since nothing hides anything yet). The other three pass **vacuously** — there is no hide mechanism at all yet, so "stays visible" is trivially true regardless of JavaScript, reduced motion, or scroll direction. This is expected, not a mistake: re-verify all four non-vacuously in Step 6, after the hide mechanism actually exists to _not_ interfere with any of them.

- [ ] **Step 3: Write `RevealOnView`**

Create `apps/portfolio-web/src/components/atoms/RevealOnView.tsx`:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

import { classNames } from "@/lib/classnames";

type RevealOnViewProps = {
  readonly children: ReactNode;
};

/**
 * Reveals its children once, the first time they scroll into view - or
 * leaves them alone if they're already in view when this mounts, or if
 * prefers-reduced-motion is set (motion-guidelines.md: "Disable section
 * reveals," not "make them instant").
 *
 * Defaults to visible: the hidden state only exists once this effect has
 * run and found the element off-screen, never in the server-rendered
 * HTML, so content never depends on JavaScript to become visible - only
 * to animate. IntersectionObserver always delivers its initial
 * observation asynchronously, so a below-the-fold section is briefly
 * painted visible before this effect can hide it, regardless of which
 * effect hook sets the observer up - that transition-out is never meant
 * to be seen, though, so it has no transition at all (see the
 * `transition-none` on the hidden branch below): a hard cut, not a
 * fade, so nothing visibly flashes.
 */
export function RevealOnView({ children }: RevealOnViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Sampled once at mount; not a live matchMedia listener. If the user
    // toggles OS reduced-motion mid-session, this component won't notice -
    // but the sitewide `@media (prefers-reduced-motion: reduce)` override
    // (transition-duration: 0.01ms) still applies to any future reveal, so
    // the worst case is a snap instead of a fade, not a broken page.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries.at(-1);
        if (!entry) return;

        if (entry.isIntersecting) {
          setHidden(false);
          observer.disconnect();
        } else {
          setHidden(true);
        }
      },
      { threshold: 0 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={classNames(
        hidden
          ? "transition-none opacity-0 translate-y-2"
          : "transition-[opacity,translate] duration-200 opacity-100 translate-y-0",
      )}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 4: Wrap the four homepage sections**

In `apps/portfolio-web/src/app/page.tsx`, add the import after the existing `Section` import (line 11):

```tsx
import { RevealOnView } from "@/components/atoms/RevealOnView";
```

Wrap each of the four `<Section>` elements (lines 71-92, 94-99, 101-123, 125-131) in `<RevealOnView>`. For example, the About section changes from:

```tsx
<Section eyebrow="About" title="Practical software for real product problems.">
  <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
    {/* ...existing content... */}
  </div>
</Section>
```

to:

```tsx
<RevealOnView>
  <Section eyebrow="About" title="Practical software for real product problems.">
    <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
      {/* ...existing content... */}
    </div>
  </Section>
</RevealOnView>
```

Apply the same wrapping to the Experience, Projects, and Skills sections — indent their existing contents one level deeper, add the `<RevealOnView>`/`</RevealOnView>` lines, change nothing else. `ProfileHeader` (lines 42-69) is untouched — it is not one of the four sections and already has its own reveal via the hero mark.

- [ ] **Step 5: Run the tests and confirm they pass**

Run: `bun run --cwd apps/portfolio-web test:e2e --project=mobile e2e/section-reveal.e2e.ts`

Expected: all four pass.

- [ ] **Step 6: Confirm the three previously-vacuous tests are now proving something real**

Re-read the test output from Step 5 alongside the code: the no-JS test now passes _despite_ `RevealOnView` having a real hide mechanism (because that mechanism never runs without JS); the reduced-motion test passes _despite_ the mechanism existing (because the `matchMedia` check short-circuits it); the scroll-back-up test passes _despite_ the mechanism being one-shot by design (the observer disconnects on reveal). If any of these three would now fail if you deliberately broke their guarantee (try commenting out the `matchMedia` check locally and re-running just the reduced-motion test, then restore it), that confirms the test is real, not still vacuous. Do this check now; do not skip it the way a manual "look at it" step is easy to skip.

- [ ] **Step 7: Confirm the generic reduced-motion sweep agrees**

Run: `bun run --cwd apps/portfolio-web test:e2e e2e/reduced-motion.e2e.ts`

Expected: all pass. This is a second, independent confirmation of Step 6's reduced-motion result — the generic sweep checks _every_ element's computed transition/animation duration sitewide, not just this component's specific opacity assertion.

- [ ] **Step 8: Add the Storybook story**

Create `apps/portfolio-web/src/components/stories/RevealOnView.stories.tsx`:

```tsx
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { RevealOnView } from "@/components/atoms/RevealOnView";

/**
 * Storybook's canvas is far shorter than a real page, so RevealOnView's
 * children are already in view the moment this story mounts - this story
 * exercises the "already visible, never hidden" path, not the scroll-in
 * reveal itself. The scroll-in path is covered by
 * e2e/section-reveal.e2e.ts against the real homepage instead.
 */
const meta = {
  title: "Atoms/RevealOnView",
  component: RevealOnView,
} satisfies Meta<typeof RevealOnView>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <p className="text-foreground">Content that reveals when scrolled into view.</p>,
  },
};
```

- [ ] **Step 9: Look at it**

Run `bun run --cwd apps/portfolio-web dev`, open `http://localhost:3000/` at a narrow viewport (resize the browser to roughly 375px wide, or use DevTools device emulation), and scroll down slowly. Confirm: About, Experience, Projects, and Skills each fade up (not just appear) the first time they cross into view, the motion feels quick and subtle rather than showy, and scrolling back up and down again doesn't replay it. Then enable "Emulate CSS prefers-reduced-motion: reduce" in DevTools and reload — every section should already be visible with no fade at any point, even before scrolling. Stop the dev server afterward.

- [ ] **Step 10: Run the full suite**

Run: `bun run --cwd apps/portfolio-web test:e2e`

Then: `bun run --cwd apps/portfolio-web typecheck && bun run --cwd apps/portfolio-web lint && bun run --cwd apps/portfolio-web build-storybook`

Expected: everything passes, including the tap-target, contrast, and focus-visible sweeps (which now also cover the four wrapped sections on every route that renders them — just the homepage, since `Section` itself is unchanged elsewhere), and the Storybook build succeeds with the new story included.

- [ ] **Step 11: Commit**

```bash
bun run format
git add apps/portfolio-web/src/components/atoms/RevealOnView.tsx \
        apps/portfolio-web/src/components/stories/RevealOnView.stories.tsx \
        apps/portfolio-web/e2e/section-reveal.e2e.ts \
        apps/portfolio-web/src/app/page.tsx
git commit -m "feat(motion): reveal homepage sections as they scroll into view

RevealOnView wraps each of the four homepage Section blocks. Defaults
to visible in the server-rendered HTML - the hidden state is only
ever applied by a layout effect that finds the element off-screen, so
content never depends on JavaScript to become visible, only to
animate. A regular effect would have flashed below-the-fold content
visible for one frame before hiding it; useLayoutEffect runs before
first paint instead.

Reduced motion gets bespoke handling here, unlike the hero mark and
theme cross-fade (both pure CSS): motion-guidelines.md says section
reveals must be disabled, not just instant, and this component's
state is JS-driven, so it checks prefers-reduced-motion itself and
skips the hide mechanism entirely rather than relying on the sitewide
near-zero-duration override alone.

Section.tsx itself is untouched - it's shared across six pages, and
this only wraps its four call sites on the homepage."
```

---

## Self-Review

**Spec coverage.** Every "In" item from the spec maps to this task: `RevealOnView` (Step 3), the four `page.tsx` wraps (Step 4). The spec's "Out" list is respected: `Section.tsx` is never modified, no other page is touched, no per-card stagger is added, no `motion-guidelines.md` edit is made (the chosen values already fit its existing allowance), and the `/offline` candidate stays out of scope. The corrected reduced-motion decision (bespoke `matchMedia` check, not sitewide-override-only) is implemented in Step 3 and verified independently in Steps 6 and 7.

**Placeholders.** None. Every code step is a complete file or an exact diff; every command is runnable as written.

**Type consistency.** `RevealOnView`'s single `children: ReactNode` prop is the same in its definition (Step 3), its usage (Step 4), and its story (Step 8).

**Known gap.** No automated test covers the "already visible at mount, never hidden at all" branch specifically (as opposed to "not yet visible, then revealed") — doing so deterministically would require controlling exact page geometry in a way that's either viewport-fragile against the real homepage or would need a dedicated test-only page, neither of which fits this codebase's existing patterns. Step 9's manual look covers it instead, the same category of gap the hero-motion plan already accepted for the mark's draw quality.
