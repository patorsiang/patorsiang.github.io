/**
 * Regenerates public/portfolio-qr.svg from the site's own canonical URL.
 *
 * Run by hand whenever NEXT_PUBLIC_SITE_URL (or its fallback in src/lib/seo.ts)
 * changes - e.g. moving off the placeholder Vercel URL onto a custom domain:
 *   bun run --cwd apps/portfolio-web generate:qr
 *
 * Deliberately not wired into CI, same reasoning as generate-brand-assets.ts:
 * this is a committed artefact, not a build output.
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";

import QRCode from "qrcode";

import { siteUrl } from "../src/lib/seo";

const outPath = join(import.meta.dir, "../public/portfolio-qr.svg");

async function main() {
  const url = new URL("/", siteUrl).href;

  const svg = await QRCode.toString(url, {
    type: "svg",
    margin: 1,
    color: { dark: "#000000", light: "#ffffff" },
  });

  // QRCode's own output has no <title> - inject one so the asset stays
  // self-describing (matches every other generated icon in this repo, e.g.
  // apple-icon.png's alt text) and so a future "what does this encode?"
  // question doesn't require decoding the QR by hand.
  const withTitle = svg.replace("<svg ", `<svg role="img" aria-label="QR code for ${url}" `);

  writeFileSync(outPath, withTitle, "utf8");
  console.log(`wrote ${outPath} for ${url}`);
}

await main();
