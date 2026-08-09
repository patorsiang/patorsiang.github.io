import { test, expect, type Page } from "@playwright/test";

/**
 * Enforces the design system's contrast rules against what the browser actually
 * paints, in both themes:
 *
 *   "Text contrast should meet WCAG AA at minimum."
 *   "Focus states must be visible on all links, buttons, and controls."
 *   (docs/design/design-system.md)
 *
 * Computing ratios from the token table is easy, and covers only the pairs
 * somebody thought to list. This walks the rendered DOM instead, so a component
 * that puts accent text on a surface nobody has combined before gets measured
 * too - that gap is the whole reason this exists.
 *
 * Thresholds are WCAG 2.1 AA: 4.5:1 for body text and 3:1 for large text
 * (>=24px, or >=18.66px at weight 700+) per 1.4.3, and 3:1 for a focus ring
 * against what sits behind it per 1.4.11.
 *
 * Known limits, so a green run is not over-read: it compares flat colours, so
 * text over a gradient or an image is not meaningfully checked; and it sees
 * only what a route renders at this viewport, not a state behind an
 * interaction.
 *
 * The contrast helpers are duplicated into each page.evaluate on purpose -
 * Playwright serialises the callback, so it cannot close over anything defined
 * out here.
 */

const MIN_BODY = 4.5;
const MIN_LARGE = 3;
const MIN_NON_TEXT = 3;

const themes = ["light", "dark"] as const;

const routes = [
  "/",
  "/about",
  "/experience",
  "/projects",
  "/contact",
  "/en/cv/fullstack-engineer",
  "/th/cv/fullstack-engineer",
  "/this-route-does-not-exist",
];

/** Routes carrying the widest variety of controls, for the slower focus sweep. */
const focusRoutes = ["/", "/en/cv/fullstack-engineer"];

async function loadWithTheme(page: Page, route: string, theme: string) {
  // colour and background-color are in Tailwind's transition-property list, and
  // GlobalNav marks the current theme's button active a tick after mount - so a
  // measurement taken mid-fade sees a blend of two tokens that exists in no
  // palette (rgb(162,202,199), partway between #ffffff and #0f766e) and reports
  // a failure that is not real. Reduced motion collapses every duration through
  // the app's own globals.css rule, leaving only settled states to measure.
  await page.emulateMedia({ reducedMotion: "reduce" });

  await page.addInitScript((value) => {
    localStorage.setItem("portfolio-theme", value);
  }, theme);

  const response = await page.goto(route);

  // Guards against measuring a page still painting its light-theme defaults,
  // which would report passes that mean nothing.
  await expect.poll(() => page.evaluate(() => document.documentElement.dataset.theme)).toBe(theme);

  // One frame past the collapsed transition, so the paint is final.
  await page.evaluate(
    () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))),
  );

  return response;
}

for (const theme of themes) {
  test.describe(`${theme} theme`, () => {
    for (const route of routes) {
      test(`text on ${route} meets WCAG AA contrast`, async ({ page }) => {
        const response = await loadWithTheme(page, route, theme);
        expect(response?.status(), `${route} did not render`).toBeLessThan(500);

        const failures = await page.evaluate(
          ({ minBody, minLarge }) => {
            const parse = (colour: string) => (colour.match(/[\d.]+/g) || []).map(Number);
            const channel = (value: number) => {
              const s = value / 255;
              return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
            };
            const luminance = (rgb: number[]) =>
              0.2126 * channel(rgb[0]) + 0.7152 * channel(rgb[1]) + 0.0722 * channel(rgb[2]);
            const contrast = (a: number[], b: number[]) => {
              const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
              return (hi + 0.05) / (lo + 0.05);
            };
            const isOpaque = (colour: string) => {
              const p = parse(colour);
              return p.length > 0 && (p[3] === undefined || p[3] === 1);
            };
            // Nearest painted backdrop. Starts at the element itself, so text
            // on its own fill compares against that fill rather than the page.
            const backdrop = (el: Element | null) => {
              for (let node = el; node; node = node.parentElement) {
                const colour = getComputedStyle(node).backgroundColor;
                if (colour !== "rgba(0, 0, 0, 0)" && isOpaque(colour)) {
                  return parse(colour).slice(0, 3);
                }
              }
              return parse(getComputedStyle(document.body).backgroundColor).slice(0, 3);
            };

            const results: string[] = [];

            for (const el of document.querySelectorAll<HTMLElement>("*")) {
              // Only elements holding their own text, or a wrapper would be
              // reported once per descendant.
              const ownsText = [...el.childNodes].some(
                (node) => node.nodeType === Node.TEXT_NODE && node.textContent?.trim(),
              );
              if (!ownsText) continue;

              const style = getComputedStyle(el);
              if (style.visibility === "hidden" || style.display === "none") continue;
              if (Number.parseFloat(style.opacity) === 0) continue;

              const rect = el.getBoundingClientRect();
              if (rect.width === 0 || rect.height === 0) continue;

              const foreground = parse(style.color).slice(0, 3);
              const background = backdrop(el);
              const size = Number.parseFloat(style.fontSize);
              const weight = Number.parseInt(style.fontWeight, 10) || 400;
              const isLarge = size >= 24 || (size >= 18.66 && weight >= 700);
              const required = isLarge ? minLarge : minBody;
              const ratio = contrast(foreground, background);

              // Tolerance absorbs float noise at the threshold; nothing in the
              // app sits inside it.
              if (ratio + 0.005 < required) {
                const label = `<${el.tagName.toLowerCase()}> ${(el.textContent || "")
                  .trim()
                  .replace(/\s+/g, " ")
                  .slice(0, 32)}`;
                results.push(
                  `${label} - ${Math.round(ratio * 100) / 100}:1, needs ${required}:1 ` +
                    `(rgb(${foreground}) on rgb(${background}), ${size}px/${weight})`,
                );
              }
            }
            return results;
          },
          { minBody: MIN_BODY, minLarge: MIN_LARGE },
        );

        expect(
          failures,
          `Text below WCAG AA on ${route} in ${theme}:\n` +
            failures.map((line) => `  ${line}`).join("\n"),
        ).toEqual([]);
      });
    }

    for (const route of focusRoutes) {
      test(`focus rings on ${route} meet ${MIN_NON_TEXT}:1`, async ({ page }) => {
        // loadWithTheme collapses transitions; outline-color is in the same
        // transition-property list, so without that a ring reads as
        // currentColor rather than the focus token.
        await loadWithTheme(page, route, theme);

        const failures: string[] = [];

        for (let index = 0; index < 16; index += 1) {
          await page.keyboard.press("Tab");

          const result = await page.evaluate(async (minRatio) => {
            // Even at the 0.01ms reduced-motion duration, the transition needs a
            // frame to land - reading in the same tick as the keypress returns
            // the value the ring is animating *from*, which is currentColor.
            await new Promise((resolve) =>
              requestAnimationFrame(() => requestAnimationFrame(resolve)),
            );

            const parse = (colour: string) => (colour.match(/[\d.]+/g) || []).map(Number);
            const channel = (value: number) => {
              const s = value / 255;
              return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
            };
            const luminance = (rgb: number[]) =>
              0.2126 * channel(rgb[0]) + 0.7152 * channel(rgb[1]) + 0.0722 * channel(rgb[2]);
            const contrast = (a: number[], b: number[]) => {
              const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
              return (hi + 0.05) / (lo + 0.05);
            };
            const isOpaque = (colour: string) => {
              const p = parse(colour);
              return p.length > 0 && (p[3] === undefined || p[3] === 1);
            };
            const backdrop = (el: Element | null) => {
              for (let node = el; node; node = node.parentElement) {
                const colour = getComputedStyle(node).backgroundColor;
                if (colour !== "rgba(0, 0, 0, 0)" && isOpaque(colour)) {
                  return parse(colour).slice(0, 3);
                }
              }
              return parse(getComputedStyle(document.body).backgroundColor).slice(0, 3);
            };

            const el = document.activeElement as HTMLElement | null;
            if (!el || el === document.body) return null;

            const label = `<${el.tagName.toLowerCase()}> ${(el.textContent || "")
              .trim()
              .replace(/\s+/g, " ")
              .slice(0, 32)}`;

            const style = getComputedStyle(el);
            if (style.outlineStyle === "none" || Number.parseFloat(style.outlineWidth) === 0) {
              return `${label} - focused with no outline at all`;
            }

            // The ring is drawn outside the control (outline-offset), so it is
            // judged against what surrounds it, not the control's own fill.
            const behind = backdrop(el.parentElement);
            const ring = parse(style.outlineColor).slice(0, 3);
            const ratio = Math.round(contrast(ring, behind) * 100) / 100;

            return ratio < minRatio
              ? `${label} - ring ${ratio}:1, needs ${minRatio}:1 ` +
                  `(rgb(${ring}) on rgb(${behind}))`
              : null;
          }, MIN_NON_TEXT);

          if (result) failures.push(result);
        }

        expect(
          failures,
          `Focus ring problems on ${route} in ${theme}:\n` +
            failures.map((line) => `  ${line}`).join("\n"),
        ).toEqual([]);
      });
    }
  });
}
