# Hero motion & interaction consistency — design

Date: 2026-08-16
Status: approved 2026-08-16
Branch: `feat/portfolio-platform-2026`

## Problem

`docs/superpowers/specs/2026-08-09-brand-mark-and-portrait-design.md` deferred "hero motion" as a separate project, noting only that `SiteMark` stays a stroked path "rather than a filled shape" so it _could_ later self-draw. Nothing acted on that follow-on: `SiteMark` renders nowhere on any page today, only in the favicon, the OG image, and Storybook.

Separately, a sitewide read-only motion sweep (method: `emilkowalski/skills`' `find-animation-opportunities` gate — frequency, purpose, duration, function) surfaced two smaller consistency gaps against `docs/design/motion-guidelines.md`'s own "similar components should move in similar ways" principle:

- `TextLink` has no `:active` press state, while `Button` and nav controls already carry `motion-safe:active:translate-y-px` from an earlier motion-polish pass (`docs/backlog/portfolio-ux-refactor-2026.md`).
- The theme toggle in `GlobalNav` flips `document.documentElement.dataset.theme` synchronously. Only elements carrying Tailwind's `transition` class (buttons, controls) ease; most page surfaces (`body`, `Card`, `Section` backgrounds and text) snap instantly between light and dark.

The sweep also rejected three candidates outright, cited here so the rejections aren't re-litigated: card list stagger on the homepage (`motion-guidelines.md` forbids revealing long lists item-by-item), nav-link hover/scale treatment (nav is hit tens of times/session; the current transition+underline is already correct), and card hover/lift (`Card` isn't itself interactive, and lift is explicitly forbidden as a default).

## Decisions

| Decision            | Choice                                                                                                                                                   | Reasoning                                                                                                                                                                                             |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Scope               | All three findings, planned together                                                                                                                     | User chose to plan all three rather than defer #2/#3 to an unplanned follow-up — they're small, but still get a plan and a grill pass, not a silent commit.                                           |
| Hero mark duration  | ~500ms, `ease-out` — a **named exception** to `motion-guidelines.md`'s 250ms cap                                                                         | A self-drawing stroke at 250ms reads as a glitch, not a draw. Scoped narrowly to "one-shot brand mark reveals" in the guideline text itself, so it can't be cited to justify slower motion elsewhere. |
| Hero mark trigger   | Every homepage load, no visit tracking                                                                                                                   | Simplest option with no client-side storage state to manage or test. A ~500ms one-shot draw is subtle enough not to become annoying on repeat views — it is not a splash screen.                      |
| Hero mark placement | 32px, left of the `handle` eyebrow text, top of `ProfileHeader`                                                                                          | The one place on the page that reads as "identity" rather than "content."                                                                                                                             |
| TextLink fix        | Reuse `motion-safe:active:translate-y-px` verbatim                                                                                                       | Zero new tokens or values — closes the consistency gap with the existing `buttonClassName` pattern exactly.                                                                                           |
| Theme-swap fix      | Extend the existing `--default-transition-duration` (120ms) / `--default-transition-timing-function` pair to `color`/`background-color` on `html`/`body` | Reuses tokens already defined in `packages/ui/tokens.css`; no new values introduced.                                                                                                                  |

## Scope

### In

1. **`docs/design/motion-guidelines.md`** — add a narrowly-scoped exception: one-shot brand-mark reveals may exceed the 250ms UI cap, with the hero mark as the example and 500ms as the ceiling for that category.
2. **`HeroMark`** (new, `components/atoms/HeroMark.tsx` — same layer as `SiteMark`, which it wraps) — client component animating `stroke-dashoffset` from the path's full length to `0` over 500ms `ease-out` on mount. Renders fully drawn, no transition, under `prefers-reduced-motion: reduce`.
3. **`ProfileHeader.tsx`** — renders `HeroMark` at 32px, left of `handle`. Homepage only, since `ProfileHeader`'s only current consumer is `/`.
4. **`TextLink.tsx`** — `sharedClassName` gains `motion-safe:active:translate-y-px`.
5. **`globals.css`** — `html`/`body` gain a `color`/`background-color` transition using the existing default duration/timing tokens, so theme swaps cross-fade instead of snapping.

### Out

- **Any other page.** `ProfileHeader` is only ever rendered on `/` today; if that changes, the hero mark question gets revisited then, not pre-emptively.
- **A `HeroMark` reuse elsewhere** (loading states, transitions) — mentioned as a possibility in the original follow-on note, but no current surface needs it. Add when one does.
- **Nav-link, card-hover, and list-stagger motion** — explicitly rejected by the sweep (see Problem); not revisited here.
- **A motion library.** All three items are plain CSS, consistent with `motion-guidelines.md`'s existing "CSS/Tailwind first" stance.

## Approach

`HeroMark` measures the path's length once (`SVGPathElement.getTotalLength()`, since `MARK_PATH` is a fixed curve+line, not something that changes at runtime) and sets `stroke-dasharray`/`stroke-dashoffset` inline, so no hardcoded magic number needs to track the path if it's ever redrawn. The draw itself is a CSS transition on `stroke-dashoffset`, triggered by flipping a class (or `data-` attribute) after mount — the same `useEffect`-after-mount / `data-mounted` pattern already used elsewhere for entrance animation, since `@starting-style` support is inconsistent enough that this codebase's existing patterns lean on the mount-effect fallback.

Under `prefers-reduced-motion: reduce`, the dashoffset is set to `0` with no transition at all — not a faster animation, an absent one, matching `motion-guidelines.md`'s existing reduced-motion baseline.

The `TextLink` and theme-swap changes are additive one-line edits to existing files; no new approach needed beyond what's stated in Scope.

## Components

**`HeroMark`** (new) — props: none beyond what it hardcodes (size 32, the accent-colored stroke it inherits from `SiteMark`). Internally renders `SiteMark` plus the mount-triggered dashoffset transition. Decorative, so `SiteMark`'s `title` prop stays omitted — `ProfileHeader` already has an `<h1>` with the name immediately after it, so nothing here needs a second accessible name.

**`ProfileHeader`** — one new line rendering `HeroMark` before the existing `handle` paragraph. No prop changes; the addition is unconditional, not another optional slot like `portrait`, since (unlike the portrait) this doesn't depend on data that might be absent.

**`TextLink`, `globals.css`** — no new components, single-class and single-rule additions respectively.

## Testing

New, in `e2e/`:

1. Homepage renders `HeroMark`'s `<svg>` inside `ProfileHeader` (reuses `SiteMark`'s existing accessibility posture: `aria-hidden`, no duplicate accessible name).
2. Under `prefers-reduced-motion: reduce` (the existing per-route sweep already exercises this), the mark's `stroke-dashoffset` is `0` with no `transition` property set — asserts the animation is absent, not merely fast.

Covered by existing suites, no new test needed:

- `TextLink`'s new `:active` class — the sitewide tap-target/motion sweeps already exercise every route; the new class rides along.
- The theme cross-fade — visual only, nothing to assert beyond "theme still switches," which existing theme-toggle coverage (if any) or manual verification confirms.

## Risks

**The 250ms exception could get cited to justify unrelated slow motion later.** Mitigated by writing it into `motion-guidelines.md` scoped explicitly to one-shot brand-mark reveals, not left as a one-off code comment nobody would find.

**`getTotalLength()` runs on every mount, including client-side navigations back to `/`.** Cheap for a single small path (this is not a scroll-linked or per-frame measurement), so not treated as a performance risk.

## Resolved by default

None — every open question from the design conversation was answered explicitly (duration, trigger, placement) rather than left implicit.

## Follow-on

If `ProfileHeader` ever gains a second consumer (e.g. `/about`, per the brand-mark spec's "Resolved by default" #2), decide then whether `HeroMark` follows it or stays homepage-only — not pre-decided here.
