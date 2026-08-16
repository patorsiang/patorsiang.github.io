# Section reveal-on-view — design

Date: 2026-08-16
Status: approved 2026-08-16
Branch: `feat/portfolio-platform-2026`

## Problem

The just-shipped hero-motion work (`docs/superpowers/specs/2026-08-16-hero-motion-design.md`) covered the homepage's above-the-fold identity moment — `SiteMark`'s self-draw — but left the rest of the homepage untouched. The four content sections below it (About, Experience, Projects, Skills, each rendered via `components/organisms/Section.tsx` in `src/app/page.tsx`) currently just appear on load with no transition, the same as every other page.

`docs/design/motion-guidelines.md` already has an allowed pattern for exactly this ("Page And Section Reveals": opacity 0→1, ≤8px offset, 180-240ms, no stagger) — nothing here needs a new named exception the way the hero mark's 500ms draw did. What was missing was a decision on where to use it and how to trigger it safely.

## Decisions

| Decision                 | Choice                                                                                | Reasoning                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ------------------------ | ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Scope                    | All four homepage sections (About, Experience, Projects, Skills)                      | User's explicit choice, after a narrower "just the header" option was on the table.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `Section` component      | Left untouched                                                                        | It's shared across six pages (home, about, experience, projects, posts, contact). Baking reveal behavior into it would silently reach every page that renders a `Section`, not just the homepage's four instances.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Trigger mechanism        | `IntersectionObserver`, one-shot per section                                          | A pure load-time trigger (the hero mark's `@starting-style` approach) would already have finished animating before a user scrolls down to below-the-fold content — functionally invisible for three of the four sections. `IntersectionObserver` fires on first visibility whether that's immediately at mount (if already in the viewport) or later on scroll, which is one mechanism covering both cases, not two.                                                                                                                                                                                                                                                                                                                                                                                       |
| Default visibility       | **Visible**, not hidden                                                               | The common way to build this (CSS defaults to `opacity-0`, JS adds a "revealed" class) fails open to _invisible_ if JS never runs. That's an acceptable risk for a 32px decorative logo (the hero mark); it's not acceptable for page content. This design fails open to _visible_ instead — see Approach.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Experience section scope | Included                                                                              | `motion-guidelines.md`'s "no scroll-triggered reveals for core CV content" is read here as scoped to the actual `/cv` and `/[lang]/cv/[role]` pages (dense, printable, read-and-exported), not this lighter homepage summary (2 highlights per role). Explicit, documented judgment call, not a silent assumption.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Duration/easing          | 200ms, matching the sitewide default easing curve                                     | Falls inside `motion-guidelines.md`'s existing 180-240ms allowance for section reveals. No guideline change needed, unlike the hero mark.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| Reduced motion           | Bespoke handling: check `prefers-reduced-motion` and skip the hide mechanism entirely | Correction made during planning. The hero mark and theme cross-fade are pure CSS, so relying on the sitewide `@media (prefers-reduced-motion: reduce)` override (which forces every transition to near-zero duration) was sufficient — an instant transition is indistinguishable from none. This component's hidden/visible state is JS-driven, and `motion-guidelines.md`'s Reduced-Motion Behavior section is explicit here: "Disable section reveals" — not "make them instant." So `RevealOnView` checks `window.matchMedia("(prefers-reduced-motion: reduce)").matches` and, if true, never creates the observer or sets the hidden state at all; content stays in its default visible state permanently, matching the guideline's literal instruction rather than a same-effect-by-coincidence one. |

## Scope

### In

1. **`RevealOnView`** (new, `components/atoms/`) — a small client component. Wraps its children in a `<div>`. On mount, checks visibility via `IntersectionObserver`; if not yet visible, applies the hidden state (`opacity-0 translate-y-2`) and reveals it (removes the state) the first time it enters the viewport. If already visible at mount, never applies the hidden state at all — no flash, no animation played.
2. **`page.tsx`** — each of the four `<Section>` calls (About, Experience, Projects, Skills) gets wrapped in `<RevealOnView>`.

### Out

- **`Section.tsx` itself.** Not modified. Stays a server component, used identically on every other page.
- **Any other page.** About, Experience, Projects, Posts, Contact keep rendering their `Section`s exactly as today.
- **Per-card stagger within a section.** Already rejected by the sitewide motion sweep earlier in this project (`motion-guidelines.md` forbids revealing long lists item-by-item) — not revisited here.
- **A new `motion-guidelines.md` exception.** The chosen values (200ms, ≤8px, opacity-only) already fit the guideline's existing allowance.
- **The `/offline` page's reveal candidate**, identified by the earlier sitewide sweep but explicitly left out of the hero-motion spec — still out of scope here too.

## Approach

`RevealOnView` is a client component (`"use client"`) — the only part of this feature that needs to be, since `IntersectionObserver` has no server equivalent. It renders a `<div>` wrapping `children`, defaulting to no special classes (fully visible, matching the server-rendered HTML exactly).

On mount, if `prefers-reduced-motion: reduce` is set, nothing else in this list happens — no observer is created, the element stays in its default (visible) state permanently. Otherwise, a layout effect (not a regular effect — see below) creates an `IntersectionObserver` watching the wrapper div, with `threshold: 0` (any pixel visible counts) and no `rootMargin` adjustment. Its callback fires once, synchronously, with the element's current intersection state:

- **Already intersecting:** do nothing. The element stays in its default (visible) state — this is the case for a section that happens to already be in the viewport at mount (e.g. a very tall screen, or a short page).
- **Not intersecting:** apply the hidden state (`opacity-0 translate-y-2`). Keep observing. The first time the observer reports the element has become intersecting, apply the visible state (`opacity-100 translate-y-0`), and disconnect the observer — one-shot, never re-hides on scroll back up.

The effect that does this hiding must run _before_ the browser's first paint, not after — a regular `useEffect` runs after paint, which would mean a below-the-fold section briefly paints visible, then fades to hidden a moment later, which is exactly the flash this design exists to avoid. A layout effect runs synchronously before paint, so for a section that starts off-screen, the very first thing painted is already the hidden state — nothing to see, nothing that flashes.

Because the _default_ server-rendered state is always visible, a user with JS disabled, a failed script load, or a slow connection sees the content immediately, exactly as today. The reveal is additive: it can only ever make something appear that would otherwise already be there, never hide something that would otherwise be visible.

The transition itself is CSS (`transition-[opacity,translate] duration-200`), not JS-animated — consistent with `motion-guidelines.md`'s "CSS/Tailwind first" stance and with how the hero mark and theme cross-fade were both built. Only `transform`/`translate` and `opacity` are animated, per the guideline's performance rule.

## Components

**`RevealOnView`** (new) — props: `children: ReactNode` only. No configuration surface (duration, offset, easing are fixed to the one allowed pattern from `motion-guidelines.md`) — this is deliberately not a general-purpose animation primitive, just the specific reveal this guideline permits, used in exactly one place.

**`page.tsx`** — four `<Section>` calls each gain a `<RevealOnView>` wrapper. No prop changes to `Section` itself.

## Testing

New, in `e2e/`:

1. On initial load with default viewport size (sections below the fold), each of the four sections' `RevealOnView` wrapper starts in the hidden state, and reaches the visible state after scrolling it into view.
2. A user with JavaScript disabled (or before hydration completes) sees all four sections' text content in the accessibility tree / DOM immediately — proving the fail-open default. Playwright can approximate this by disabling JS for the page load and asserting the content is present and has no `opacity: 0` computed style.
3. Reduced-motion: a bespoke assertion (not just the generic sweep, since the disable-the-mechanism behavior is component-specific logic the generic sweep can't target) that under `prefers-reduced-motion: reduce`, a below-the-fold section is visible without ever scrolling to it — proving the hide phase never engages at all, not just that it's fast. The existing sitewide sweep (`e2e/reduced-motion.e2e.ts`) still runs too, as a second, independent confirmation.
4. Scrolling back up after a section has revealed does not re-hide it (one-shot).

## Risks

**A wrapper `<div>` around each `Section` changes the DOM tree slightly.** `PageShell`'s content column uses `gap-16` between direct flex children; wrapping `Section` in a plain `<div>` keeps it as one direct child either way, so spacing is unaffected. No layout risk, but worth a visual check during implementation.

**`IntersectionObserver` has no SSR equivalent, so this feature has zero effect until JavaScript runs.** Accepted, and this is exactly why the default state is visible rather than hidden — the worst case if JS never loads is "no reveal animation plays," not "content is missing."

## Follow-on

None anticipated. This closes out the motion work identified by the sitewide sweep earlier in this project; the sweep's other rejected candidates (card stagger, nav-link hover, card lift, most non-homepage pages) remain rejected and are not revisited by this or any planned follow-up.
