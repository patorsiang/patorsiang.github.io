# Portfolio UX Principles

## Purpose

This document defines the UX direction for the portfolio system. It should guide future information architecture, design system, motion, responsive layout, accessibility, and component work.

The portfolio should present Napatchol Thaipanich as a focused software developer for global technology opportunities. It should make technical capability, project evidence, experience, and CV fit easy to understand without relying on decorative or flashy interface patterns.

## Target Audience

- Recruiters screening software engineering candidates quickly.
- Hiring managers looking for practical engineering evidence.
- Technical interviewers reviewing projects, role fit, and code-adjacent detail.
- Global tech teams evaluating communication clarity, professionalism, and readiness for distributed work.

## Design Personality

The portfolio should feel:

- Professional, modern, and restrained.
- Clear, calm, and content-led.
- Engineering-focused rather than marketing-heavy.
- Confident through structure and evidence, not visual noise.
- Lightweight and fast, with no unnecessary interaction cost.

The interface should support the content like a well-edited technical profile. It should not compete with the work, CV, or project evidence.

## UX Principles

### 1. Minimal Interface

Use the smallest amount of interface needed to make content discoverable and legible.

- Prefer simple navigation, direct links, and predictable page structure.
- Avoid decorative surfaces that do not add orientation, hierarchy, or meaning.
- Use whitespace to improve comprehension, not to create an oversized landing-page feel.
- Keep UI chrome quiet so project, experience, and CV content remain the primary signal.

### 2. Content-First Layout

Design pages around the content model: profile, skills, experience, projects, education, and CV roles.

- Lead with useful information, not abstract slogans.
- Prioritize evidence: role titles, organizations, dates, technologies, outcomes, and links.
- Keep summaries concise and scannable.
- Let content structure drive layout decisions instead of fitting content into decorative templates.

### 3. Fast Scanning For Recruiters

Recruiters should understand role fit within seconds.

- Make current role direction, location, availability-relevant profile details, and primary links easy to find.
- Use clear headings, short summaries, dates, tags, and lists.
- Support quick comparison across experience and projects.
- Avoid hidden content, complex reveal patterns, or interactions required to understand the candidate.

### 4. Calm Visual Hierarchy

Hierarchy should guide attention without overwhelming the reader.

- Use restrained typography, spacing, and contrast.
- Prefer a limited set of heading sizes and text styles.
- Reserve emphasis for meaningful signals such as role fit, project impact, and external proof.
- Avoid loud gradients, oversized hero treatment, dense decoration, and competing accent colors.

### 5. Controlled Motion

Motion should clarify state, orientation, or continuity.

- Use short, subtle transitions for hover, focus, navigation, and content changes.
- Avoid motion that delays reading or draws attention away from content.
- Respect reduced-motion preferences.
- Do not use animation as a substitute for clear hierarchy or page structure.

### 6. Accessibility

Accessibility is a baseline requirement, not a polish step.

- Maintain semantic HTML structure and meaningful heading order.
- Ensure keyboard access for all interactive elements.
- Provide visible focus states.
- Use sufficient color contrast for text, icons, borders, and states.
- Avoid conveying meaning through color alone.
- Keep copy readable for international audiences and non-native English readers.

### 7. Mobile-First Responsiveness

Mobile layouts should be first-class, not compressed desktop layouts.

- Prioritize readable text, direct navigation, and comfortable tap targets.
- Keep key profile, project, and CV actions reachable without visual clutter.
- Use responsive layout changes that preserve content order and meaning.
- Avoid horizontal scrolling, cramped cards, or dense multi-column layouts on small screens.

### 8. CV-Driven Content Structure

The portfolio should align with the dynamic CV system and reuse the same content priorities.

- Treat CV role variants as a core information architecture input.
- Keep role-specific pages and summaries consistent with generated CV content.
- Make projects and experience easy to filter, rank, or present by role fit.
- Preserve content metadata such as status, locale, tags, visibility, and source structure.
- Avoid one-off page copy that diverges from the CV content model without a clear reason.

## Do / Don't Examples

| Do                                                                            | Don't                                                                                  |
| ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Show a concise profile summary with direct links to GitHub, LinkedIn, and CV. | Start with a large decorative hero that pushes useful content below the fold.          |
| Use clear section headings like Experience, Projects, Skills, and Education.  | Invent branded or ambiguous section names that slow scanning.                          |
| Present projects with role, tech stack, short outcome, and source link.       | Use image-heavy project cards that hide the actual engineering evidence.               |
| Use subtle hover and focus states.                                            | Add large entrance animations, parallax, or scroll effects that distract from reading. |
| Keep role-specific CV content aligned with the CV engine.                     | Maintain separate portfolio copy that contradicts generated CV output.                 |
| Design mobile pages around a single readable column.                          | Shrink desktop grids until text and links become cramped.                              |
| Use color to support hierarchy and state.                                     | Depend on color alone to communicate status or meaning.                                |

## Acceptance Criteria

Future portfolio UX, IA, design system, motion, and component work should satisfy these criteria:

- The interface is minimal and does not compete with the portfolio content.
- Recruiters can identify target role fit, key skills, experience, projects, and CV links quickly.
- Content hierarchy is calm, consistent, and easy to scan on desktop and mobile.
- Motion is subtle, purposeful, and respects reduced-motion preferences.
- Accessibility requirements are considered from the start of each design and implementation decision.
- Mobile layouts preserve content clarity, reading order, and interaction quality.
- Portfolio pages remain aligned with the dynamic CV content structure and role-specific presentation model.
- Decorative UI choices are justified by clarity, orientation, or comprehension, not visual novelty.
