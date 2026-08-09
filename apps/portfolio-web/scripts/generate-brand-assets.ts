/**
 * Writes every brand artefact that cannot be produced by the CSS pipeline.
 *
 * Run by hand after changing anything in src/lib/brand.ts:
 *   bun run --cwd apps/portfolio-web generate:brand
 *
 * Deliberately not wired into CI. These are committed artefacts; regenerating
 * them on every run would produce diff noise and, worse, make the drift test in
 * src/lib/brand.test.ts self-fulfilling.
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";

import { buildIconSvg } from "../src/lib/brand";

const appDir = join(import.meta.dir, "../src/app");

function writeIconSvg() {
  const target = join(appDir, "icon.svg");
  writeFileSync(target, buildIconSvg(), "utf8");
  console.log(`wrote ${target}`);
}

writeIconSvg();
