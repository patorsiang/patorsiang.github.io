# Portfolio UX/UI Refactor — 2026

Branch: `feat/portfolio-platform-2026`

## Context

`docs/design/ux-principles.md`, `information-architecture.md`, and `design-system.md` already define the target direction. This backlog closes the gap between those docs and the current implementation.

Confirmed gaps as of 2026-07-31:

- Only `/`, `/cv`, `/cv/[role]`, and `/[lang]/cv/[role]` exist. `/about`, `/experience`, `/projects`, and `/contact` are documented as "Planned" in the IA but have no routes yet.
- `GlobalNav.tsx` only renders the Home logo, language switch, and theme switch — no links to About/Experience/Projects/Contact, because those pages don't exist.
- Dark mode is already implemented (`GlobalNav.tsx` theme toggle + `data-theme` attribute), which is ahead of `design-system.md`'s stated position ("light-first... do not add a manual theme switcher until dark surfaces are fully implemented and tested"). The doc is now out of date with the code — needs reconciling either by finishing dark-surface coverage or by updating the doc.
- `packages/content/src/data/experiences.ts` (558 lines) is the experience source of truth; content freshness wasn't checked in this pass.

Buckets are effort-based: **Reminders** = quick/small, ship same-day. **Work** = larger deliberate design/build work, needs its own PR(s). **Side Project** = experimental/nice-to-have, no deadline pressure.

---

## Work (larger, deliberate)

- [ ] Build `/about` page per `docs/design/information-architecture.md` §About — bio, engineering focus, interests, location/global context, professional links.
- [ ] Build `/experience` page — timeline from `packages/content/src/data/experiences.ts`, scannable by date/role, matching card rules in `design-system.md`.
- [ ] Build `/projects` page — project index/cards per the Project Cards spec in `design-system.md` (category/status, title, summary, tech tags, 2-3 highlights, evidence links).
- [ ] Build `/contact` page — email, GitHub, LinkedIn, location, no form unless spam handling is solved.
- [ ] Update `GlobalNav.tsx` to include Home/About/Experience/Projects/CV/Contact once those routes exist, matching the "Primary Navigation" model in the IA doc.
- [ ] Review and refresh `packages/content/src/data/experiences.ts` content for the current role/story (the actual "update my experience" content pass).
- [ ] Reconcile dark mode: either finish auditing every page/component against the dark token set in `design-system.md`, or scope down the toggle until that's done — pick one and update the doc to match reality. Audit done 2026-07-31, confirmed breaks:
  - [x] `app/error.tsx`, `app/global-error.tsx`, `app/not-found.tsx` — fully hard-coded light classes (`bg-stone-50`, `text-zinc-950`, `bg-zinc-950`), ignore `data-theme` entirely. Fixed 2026-08-01: moved to token classes, added `--color-on-accent`/`--color-on-accent-strong`/`--color-danger` tokens, new `Button` atom, and an `applyStoredTheme()` client-side fallback (error-boundary rendering can bypass the root layout's inline theme bootstrap script).
  - [x] `app/cv/PrintButton.tsx:10` — hard-coded `bg-zinc-950` is nearly invisible against dark mode's `--color-page` (`#111110`); also `hover:bg-teal-800` bypasses tokens. Fixed 2026-08-01: replaced hand-rolled classes with the `Button` atom (`variant="primary"`), which already carries the correct tokens; added an optional `title` prop to `Button` to preserve the print-tooltip text.
  - [x] `components/organisms/GlobalNav.tsx:144`, `app/cv/CvToolbar.tsx:64`, `components/atoms/ButtonLink.tsx:27` — `text-white` on `--color-accent` fails contrast in dark mode (`--color-accent` is bright mint `#5eead4` in dark, ~1.5:1 contrast with white, needs 4.5:1). Fixed 2026-08-01: replaced with `--color-on-accent`/`--color-on-accent-strong` tokens (light: white; dark: near-black), verified ≥4.5:1 in both themes.
- [ ] Pass over `components/{atoms,molecules,organisms,templates}` for consistency now that new pages are being added — check nothing violates the atomic boundaries before the component count grows.

## Reminders (quick, small — good for a Reminders-app dump)

- Verify all interactive elements meet 40px/44px min tap target (design-system.md accessibility notes)
- Check color contrast (WCAG AA) on teal accent against both light and dark surfaces
- Confirm `prefers-reduced-motion` is respected wherever transitions exist
- Add visible focus-visible outline check across nav, buttons, links
- Quick copy pass: homepage profile summary and role-direction statement, is it still accurate
- Double check `/cv` and `/cv/[role]` redirect behavior still matches IA doc after navbar changes
- Confirm footer (if any) only has GitHub/LinkedIn/Email/CV per IA — no duplicate nav

## Side Project (experimental / nice-to-have)

- Compact role selector UI for `/cv` (IA doc marks this "future minimal version")
- Motion polish pass using `docs/design/motion-guidelines.md` once core pages exist
- Project detail pages, only if `/projects` content outgrows cards
- Localized (`th`) versions of non-CV pages once About/Experience/Projects/Contact are stable in English
- Playground app (`apps/playground`) visual polish
- Automated PDF export for `/cv` (currently just `window.print()` via `PrintButton.tsx`) — if built, render with A4 page size, `printBackground: true`, and `displayHeaderFooter: false`
