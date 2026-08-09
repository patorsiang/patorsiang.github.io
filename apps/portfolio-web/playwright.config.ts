import { defineConfig, devices } from "@playwright/test";

const port = 3100;

/**
 * Runs against a production build, not `next dev`: dev-only overlays inject
 * their own focusable controls, which the tap-target sweep would then measure
 * and report as app violations.
 */
export default defineConfig({
  testDir: "./e2e",
  // Not *.spec.ts: `bun test` at the repo root globs that pattern and would try
  // to run these under its own runner, which fails on Playwright's fixtures.
  testMatch: "**/*.e2e.ts",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: `http://127.0.0.1:${port}`,
  },
  projects: [
    // 375px is the narrowest width the design system targets, and the width at
    // which the nav wraps - so it is where tap targets are tightest. Pinned to
    // Chromium rather than devices["iPhone SE"] (which is WebKit) so CI only
    // downloads one browser; this measures layout, not engine differences.
    {
      name: "mobile",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 375, height: 667 },
        isMobile: true,
        hasTouch: true,
      },
    },
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
  ],
  webServer: {
    command: `bun run build && bun run start --port ${port}`,
    url: `http://127.0.0.1:${port}`,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
