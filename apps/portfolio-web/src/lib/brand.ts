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
