import { test, expect } from "@playwright/test";

/**
 * Enforces the design system's tap target floor:
 * "Interactive targets should be at least 40px tall, with 44px preferred for
 * mobile." (docs/design/design-system.md)
 *
 * This replaces scripts/check-tap-targets.sh, which grepped class strings for a
 * sub-40px `h-*` next to a `focus-visible:`. That could only ever see a height
 * that was written down and too small - it was blind to the far more common
 * case of an element with no height class at all, sized by its line-height.
 *
 * Each control is checked two ways:
 *
 * 1. Height, measured from the border box or from a `.tap-reach` ::after
 *    overlay, whichever is taller. The test does not care which technique a
 *    component uses to reach 40px.
 * 2. Reachability, by hit-testing 15px above and below the centre. This is what
 *    catches a control buried under something, or a `.tap-reach` band that
 *    renders but sits over the wrong element.
 *
 * Why 15px and not 20px: Chromium rounds the coordinate passed to
 * elementFromPoint, so a probe at exactly half a pixel from a box edge snaps
 * onto the neighbour. Two 40px controls stacked edge to edge would fail on that
 * artifact alone. 15px sits 5px clear of both boundaries; the height assertion,
 * not the probe, is what proves the 40px.
 */
const MIN_TAP_TARGET_PX = 40;
const PROBE_OFFSET_PX = 15;

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([type=hidden]):not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "summary",
  '[role="button"]',
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

const routes = [
  "/",
  "/about",
  "/experience",
  "/projects",
  "/contact",
  "/en/cv/fullstack-engineer",
  "/en/cv/ai-ml-engineer",
  "/en/cv/security-engineer",
  "/th/cv/fullstack-engineer",
  // Rendered by not-found.tsx, which has its own set of controls.
  "/this-route-does-not-exist",
];

type Failure = {
  readonly label: string;
  readonly reason: string;
};

for (const route of routes) {
  test(`every interactive element on ${route} is at least ${MIN_TAP_TARGET_PX}px tall`, async ({
    page,
  }) => {
    const response = await page.goto(route);

    // A 5xx would render an error page with almost no controls, and the sweep
    // below would pass on it vacuously.
    expect(response?.status(), `${route} did not render`).toBeLessThan(500);

    const failures = await page.evaluate(
      ({ selector, minHeight, probeOffset }) => {
        const results: Failure[] = [];

        const describe = (node: Element | null) =>
          node === null
            ? "nothing"
            : `<${node.tagName.toLowerCase()}> ${(node.textContent || "").trim().replace(/\s+/g, " ").slice(0, 24)}`;

        for (const element of document.querySelectorAll<HTMLElement>(selector)) {
          const initial = element.getBoundingClientRect();

          // Zero-area elements are not rendered (print-only blocks, collapsed
          // branches). There is nothing for a finger to hit.
          if (initial.width === 0 && initial.height === 0) continue;

          // Hit-testing near the viewport edge returns null regardless of the
          // element's size, so bring it to the middle first. The rect has to be
          // re-read afterwards because scrolling moved it.
          element.scrollIntoView({ block: "center", behavior: "instant" });

          const rect = element.getBoundingClientRect();
          const label = `<${element.tagName.toLowerCase()}> ${
            (element.getAttribute("aria-label") || element.textContent || "")
              .trim()
              .replace(/\s+/g, " ")
              .slice(0, 40) || "(no accessible name)"
          }`;

          const after = getComputedStyle(element, "::after");
          const overlayHeight =
            after.content === "none" || after.position !== "absolute"
              ? 0
              : Number.parseFloat(after.height) || 0;
          const effectiveHeight = Math.max(rect.height, overlayHeight);

          if (effectiveHeight + 0.5 < minHeight) {
            results.push({
              label,
              reason:
                `hit area is ${Math.round(effectiveHeight * 10) / 10}px tall, needs ${minHeight}px` +
                (overlayHeight > 0
                  ? ` (box ${Math.round(rect.height * 10) / 10}px + overlay)`
                  : ""),
            });
            continue;
          }

          const centreX = rect.left + rect.width / 2;
          const centreY = rect.top + rect.height / 2;

          // elementFromPoint resolves a pseudo-element hit to its originating
          // element, so a .tap-reach overlay counts as the control being hit.
          for (const [direction, y] of [
            ["above", centreY - probeOffset],
            ["below", centreY + probeOffset],
          ] as const) {
            const hit = document.elementFromPoint(centreX, y);

            if (hit === null || (hit !== element && !element.contains(hit))) {
              results.push({
                label,
                reason: `tall enough, but a tap ${probeOffset}px ${direction} its centre lands on ${describe(hit)}`,
              });
            }
          }
        }

        return results;
      },
      {
        selector: FOCUSABLE_SELECTOR,
        minHeight: MIN_TAP_TARGET_PX,
        probeOffset: PROBE_OFFSET_PX,
      },
    );

    expect(
      failures,
      `Tap target failures on ${route}:\n` +
        failures.map((item) => `  ${item.label} - ${item.reason}`).join("\n"),
    ).toEqual([]);
  });
}
