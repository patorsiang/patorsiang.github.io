import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { buildIconSvg, MARK_PATH } from "./brand";

const iconPath = join(import.meta.dir, "../app/icon.svg");

describe("committed brand assets", () => {
  // Icons are the one asset nobody looks at twice - create-next-app's Vercel
  // triangle shipped for months unnoticed. This fails if MARK_PATH is edited
  // without rerunning scripts/generate-brand-assets.ts.
  test("icon.svg still contains the current mark path", () => {
    const committed = readFileSync(iconPath, "utf8");

    expect(committed).toContain(MARK_PATH);
  });

  test("icon.svg is byte-identical to what the generator would write", () => {
    const committed = readFileSync(iconPath, "utf8");

    expect(committed).toBe(buildIconSvg());
  });

  test("icon.svg carries both theme colours, since a favicon cannot inherit currentColor", () => {
    const committed = readFileSync(iconPath, "utf8");

    expect(committed).toContain("#0f766e");
    expect(committed).toContain("#5eead4");
    expect(committed).not.toContain("currentColor");
  });
});
