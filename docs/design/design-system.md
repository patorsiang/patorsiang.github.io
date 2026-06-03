# Portfolio Design System

## Purpose

This document defines a small visual system for the portfolio. It should guide future implementation of navigation, page layouts, CV sections, project cards, buttons, links, and content sections.

The system is intentionally restrained: native CSS, Tailwind utilities, and existing project conventions are preferred over a heavy component library.

## Current Styling Setup

The portfolio web app currently uses:

- Tailwind CSS v4 through `@import "tailwindcss"` in `apps/portfolio-web/src/app/globals.css`.
- CSS variables for `--background`, `--foreground`, `--font-sans`, and `--font-mono`.
- Geist Sans and Geist Mono loaded through `next/font`.
- Existing page styles using Tailwind utility classes, mostly `stone`, `zinc`, and `teal`.
- Automatic dark-mode variables through `prefers-color-scheme`, but the current page UI is primarily light-themed.

Future tokens should fit this setup and can be added through CSS variables and Tailwind v4 `@theme` values.

## Design Tokens

### Colour Tokens

| Token                   | Light value | Dark value | Tailwind reference       | Usage                                 |
| ----------------------- | ----------- | ---------- | ------------------------ | ------------------------------------- |
| `--color-page`          | `#fafaf9`   | `#0a0a0a`  | `stone-50` / near black  | Page background.                      |
| `--color-surface`       | `#ffffff`   | `#18181b`  | `white` / `zinc-900`     | Cards, panels, CV sections.           |
| `--color-surface-muted` | `#f5f5f4`   | `#27272a`  | `stone-100` / `zinc-800` | Tags, subtle grouped areas.           |
| `--color-text`          | `#09090b`   | `#ededed`  | `zinc-950` / near white  | Primary text.                         |
| `--color-text-muted`    | `#52525b`   | `#a1a1aa`  | `zinc-600` / `zinc-400`  | Secondary text, metadata.             |
| `--color-text-soft`     | `#71717a`   | `#d4d4d8`  | `zinc-500` / `zinc-300`  | Dates, helper text, labels.           |
| `--color-border`        | `#e4e4e7`   | `#3f3f46`  | `zinc-200` / `zinc-700`  | Borders and separators.               |
| `--color-border-strong` | `#d4d4d8`   | `#52525b`  | `zinc-300` / `zinc-600`  | Interactive borders.                  |
| `--color-accent`        | `#0f766e`   | `#2dd4bf`  | `teal-700` / `teal-400`  | Links, focus, small emphasis.         |
| `--color-accent-strong` | `#115e59`   | `#5eead4`  | `teal-800` / `teal-300`  | Hover states and strong accents.      |
| `--color-inverse`       | `#ffffff`   | `#09090b`  | `white` / `zinc-950`     | Text on strong dark or light buttons. |

Colour direction:

- Use neutral colours for most surfaces and text.
- Use teal as a functional accent, not a dominant brand wash.
- Avoid broad gradients, saturated backgrounds, and decorative colour blocks.
- Prefer border and spacing for structure before using strong colour.

### Typography Tokens

| Token             |              Size |      Line height | Usage                                                        |
| ----------------- | ----------------: | ---------------: | ------------------------------------------------------------ |
| `text-caption`    |  `0.75rem` / 12px |    `1rem` / 16px | Tags, compact metadata.                                      |
| `text-small`      | `0.875rem` / 14px | `1.25rem` / 20px | Buttons, nav, secondary metadata.                            |
| `text-body`       |     `1rem` / 16px | `1.75rem` / 28px | Default prose and card text.                                 |
| `text-body-large` | `1.125rem` / 18px |    `2rem` / 32px | Intro summaries and important body copy.                     |
| `text-heading-sm` |  `1.25rem` / 20px | `1.75rem` / 28px | Card titles and subsection headings.                         |
| `text-heading-md` |   `1.5rem` / 24px |    `2rem` / 32px | Section headings.                                            |
| `text-heading-lg` |  `2.25rem` / 36px | `2.75rem` / 44px | Page title on mobile and compact pages.                      |
| `text-heading-xl` |  `3.75rem` / 60px |           `1.05` | Homepage name or top-level hero title on large screens only. |

Typography rules:

- Use Geist Sans for interface and content.
- Use Geist Mono only for code-like labels, technical IDs, or export/debug contexts.
- Keep letter spacing at `0` for normal text.
- Uppercase labels may use modest tracking, but only for short metadata.
- Do not scale font size with viewport width.
- Use `font-semibold` for headings and `font-medium` for metadata or buttons.
- Keep paragraphs comfortable: 16-18px text with generous line height.

### Spacing Tokens

| Token      | Value | Usage                                    |
| ---------- | ----: | ---------------------------------------- |
| `space-1`  |   4px | Tight icon/text gaps.                    |
| `space-2`  |   8px | Tags, compact internal gaps.             |
| `space-3`  |  12px | Button gaps, small stack spacing.        |
| `space-4`  |  16px | Default element spacing.                 |
| `space-5`  |  20px | Card internal spacing on mobile.         |
| `space-6`  |  24px | Card internal spacing on desktop.        |
| `space-8`  |  32px | Section internal groups.                 |
| `space-10` |  40px | Header/footer padding.                   |
| `space-12` |  48px | Mobile section spacing.                  |
| `space-16` |  64px | Desktop section spacing.                 |
| `space-20` |  80px | Large page-level separation when needed. |

Spacing rules:

- Use spacing to clarify grouping before adding dividers or backgrounds.
- Keep section spacing predictable across pages.
- Use smaller gaps inside cards and larger gaps between content sections.
- Avoid large empty hero spacing that pushes useful content too far down.

### Radius Tokens

| Token       | Value | Usage                        |
| ----------- | ----: | ---------------------------- |
| `radius-sm` |   4px | Tags, small controls.        |
| `radius-md` |   6px | Buttons, inputs, compact UI. |
| `radius-lg` |   8px | Cards and section panels.    |

Radius rules:

- Use 8px or less for portfolio UI.
- Avoid pill-shaped cards or large rounded containers unless required for a specific control.
- Keep radius consistent across cards, buttons, tags, and panels.

### Shadow Tokens

| Token           | Value                         | Usage                                                    |
| --------------- | ----------------------------- | -------------------------------------------------------- |
| `shadow-none`   | none                          | Default for most layout surfaces.                        |
| `shadow-subtle` | `0 1px 2px rgb(0 0 0 / 0.04)` | Optional card lift where borders alone are insufficient. |

Shadow rules:

- Prefer borders over shadows.
- Use shadows sparingly on repeated cards if they improve separation.
- Avoid deep, floating, or glossy shadows.

### Layout Tokens

| Token                  |            Value | Usage                                       |
| ---------------------- | ---------------: | ------------------------------------------- |
| `container-page`       | `72rem` / 1152px | Main portfolio content width.               |
| `container-reading`    |  `42rem` / 672px | About text, CV summary, long prose.         |
| `container-narrow`     |  `56rem` / 896px | Focused lists and CV content.               |
| `container-wide`       | `80rem` / 1280px | Project grids or dense comparison sections. |
| `page-padding-mobile`  |             24px | Default horizontal page padding.            |
| `page-padding-tablet`  |             32px | Tablet page padding.                        |
| `page-padding-desktop` |             40px | Desktop page padding.                       |

Layout rules:

- Center page content in a max-width container.
- Use one column by default on mobile.
- Use two-column layouts only when comparison or sidebar context improves scanning.
- Keep CV content readable; do not stretch long text across wide screens.

## Colour Usage

Use the palette this way:

- Page background: warm neutral `stone-50` or `--color-page`.
- Primary text: `zinc-950` or `--color-text`.
- Secondary text: `zinc-600` or `--color-text-muted`.
- Borders: `zinc-200` for default, `zinc-300` for interactive edges.
- Accent: `teal-700` for links, labels, focus states, and selected controls.
- Strong actions: dark neutral background with white text, or teal when the action is directly related to navigation or CV.

Avoid:

- Large teal sections.
- Purple/blue gradients.
- Decorative colour blobs.
- Multiple competing accent colours.
- Low-contrast grey text on pale backgrounds.

## Component Styling Rules

### Navbar

- Minimal horizontal nav on desktop.
- Compact menu or wrapped links on mobile.
- Use text links or simple buttons with clear labels.
- Keep primary nav to Home, About, Experience, Projects, CV, and Contact.
- Active state may use accent text, underline, or subtle border.

### Page Sections

- Use full-width page flow with constrained inner content.
- Prefer simple section headings with optional short eyebrow labels.
- Separate major sections with spacing and occasional borders.
- Do not wrap entire page sections in floating cards.

### Cards

Default card style:

- Background: `--color-surface`.
- Border: `1px solid --color-border`.
- Radius: `radius-lg` / 8px.
- Padding: 20px mobile, 24px desktop.
- Shadow: none or `shadow-subtle`.

Cards should be used for repeated items such as projects, experience entries, skill groups, and CV export options. Avoid cards inside cards.

### Project Cards

Project cards should show:

- Category/status metadata.
- Title.
- Short summary.
- Tech stack tags.
- 2-3 highlights when space allows.
- Evidence links such as GitHub, demo, paper, or artifact.

Project cards should optimize for fast reading. Images are optional and should only be used when they clarify the project.

### CV Sections

CV sections should prioritize readability and export usefulness:

- Clear section heading.
- Compact metadata rows for dates, organizations, locations, and role labels.
- Bulleted highlights with enough spacing for scanning.
- Role-specific project and skill ordering.
- Export controls grouped near the CV header or toolbar.

### Buttons

Button types:

- Primary: dark neutral background, inverse text.
- Secondary: white or surface background, neutral border, primary text.
- Text link: accent colour with underline on hover/focus.

Button rules:

- Height: 40-44px for common controls.
- Radius: 6px.
- Padding: 12-16px horizontal.
- Use clear labels.
- Keep hover, focus, active, and disabled states visible.
- Do not use animated or oversized call-to-action styles.

### Tags And Badges

- Use muted neutral backgrounds.
- Keep labels short.
- Use small text with adequate contrast.
- Do not rely on tag colour alone to communicate meaning.

## Dark And Light Mode Approach

The project currently defines automatic dark-mode root variables with `prefers-color-scheme`. The first design system should remain light-first because the current portfolio pages use light surface classes directly.

Recommended approach:

- Keep light mode as the primary implementation target.
- Define dark tokens in CSS variables for future support.
- Do not add a manual theme switcher until dark surfaces are fully implemented and tested.
- If dark mode is enabled, update component classes to use semantic variables instead of hard-coded light-only utilities.

## Accessibility Notes

- Text contrast should meet WCAG AA at minimum.
- Focus states must be visible on all links, buttons, and controls.
- Interactive targets should be at least 40px tall, with 44px preferred for mobile.
- Use semantic headings in document order.
- Do not use colour alone for selected, active, warning, or status states.
- Respect `prefers-reduced-motion`.
- Keep text readable on mobile and avoid cramped multi-column layouts.
- Ensure all external links have clear labels and safe behavior.

## Acceptance Criteria

- The system uses native CSS, Tailwind utilities, and existing project styling conventions.
- Tokens are small enough to implement in `globals.css` or Tailwind v4 theme values without a heavy UI library.
- Typography supports recruiter scanning and comfortable long-form CV reading.
- Colours remain neutral, professional, and calm, with teal used only as a controlled accent.
- Spacing and layout rules support mobile-first pages and readable desktop widths.
- Card, button, link, navbar, project, and CV section styles are defined clearly enough for future implementation.
- Shadows are intentionally minimal and never decorative.
- Light mode is the first implementation target, with dark-mode support documented but not forced.
- Accessibility requirements are part of the visual system, not an afterthought.
