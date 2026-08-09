import { test, expect } from "@playwright/test";

/**
 * The Vercel triangle from create-next-app shipped as this site's identity for
 * months, because a favicon is the one asset nobody looks at twice. These tests
 * are the thing that would have caught it.
 */

test("favicon.ico is a well-formed ICO carrying the accent-teal mark, not the Vercel triangle", async ({
  request,
  page,
}) => {
  const response = await request.get("/favicon.ico");

  expect(response.status()).toBe(200);

  const body = await response.body();

  // ICONDIR: reserved=0, type=1, count=1
  expect(body.subarray(0, 4)).toEqual(Buffer.from([0x00, 0x00, 0x01, 0x00]));
  // PNG payload magic at offset 22
  expect(body.subarray(22, 26)).toEqual(Buffer.from([0x89, 0x50, 0x4e, 0x47]));
  // not a header-only stub
  expect(body.byteLength).toBeGreaterThan(1_000);

  // A structurally valid ICO can still be a blank tile, an all-white tile, or
  // someone else's logo re-encoded to the right shape. Decode it in the
  // browser - Chromium's <img> understands .ico natively - and check that a
  // background pixel is the real accent teal. This is the check that would
  // have caught a structurally perfect but visually blank tile, which no
  // header inspection can see.
  await page.goto("/");
  const pixel = await page.evaluate(async () => {
    const img = new Image();
    img.src = "/favicon.ico";
    await img.decode();

    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0);

    const { data } = ctx.getImageData(4, 4, 1, 1);
    return [data[0], data[1], data[2]];
  });

  const hex = `#${pixel.map((channel) => channel.toString(16).padStart(2, "0")).join("")}`;
  expect(hex, "favicon.ico's background pixel is not the accent teal").toBe("#0f766e");
});

test("icon.svg is served as SVG", async ({ request }) => {
  const response = await request.get("/icon.svg");

  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("svg");
});

test("apple-icon.png is served as PNG", async ({ request }) => {
  const response = await request.get("/apple-icon.png");

  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("png");
});

for (const icon of ["icon-192.png", "icon-512.png", "icon-maskable-512.png"]) {
  test(`${icon} is served for the PWA project to consume`, async ({ request }) => {
    const response = await request.get(`/icons/${icon}`);

    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("png");
  });
}

test("the document declares an icon", async ({ page }) => {
  await page.goto("/");

  const iconHref = await page.locator('link[rel="icon"]').first().getAttribute("href");

  expect(iconHref, "Next emitted no icon link").toBeTruthy();
});

test("the OG image renders as a PNG", async ({ request }) => {
  const response = await request.get("/opengraph-image");

  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("png");

  // Satori fails softly on unsupported CSS, producing a near-empty image
  // rather than an error. A byte floor catches that.
  const body = await response.body();
  expect(body.byteLength, "OG image looks empty").toBeGreaterThan(5_000);
});

test("the OG meta tag points at the image", async ({ page }) => {
  await page.goto("/");

  const ogImage = await page.locator('meta[property="og:image"]').first().getAttribute("content");

  expect(ogImage).toContain("opengraph-image");
});

test("the OG image actually shows the page background and the accent mark", async ({ page }) => {
  // The byte-floor and meta-tag checks above are a smoke test: they stay
  // green even if the mark stroke is swapped to the page colour, or the
  // headline div is deleted outright. Decode the PNG in Chromium - same
  // approach as the favicon test above - and check pixels, not just bytes.
  await page.goto("/");

  const result = await page.evaluate(async () => {
    const img = new Image();
    img.src = "/opengraph-image";
    await img.decode();

    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0);

    const toHex = (r: number, g: number, b: number) =>
      `#${[r, g, b].map((channel) => channel.toString(16).padStart(2, "0")).join("")}`;

    // Top-right corner: clear of the 96px mark (top-left) and the text
    // block (bottom-left), so it should be pure page background.
    const sampleX = canvas.width - 40;
    const sampleY = 40;
    const { data: sampleData } = ctx.getImageData(sampleX, sampleY, 1, 1);
    const backgroundHex = toHex(sampleData[0], sampleData[1], sampleData[2]);

    // Count exact accent-teal pixels across the whole image, rather than
    // trusting one hand-picked coordinate inside the stroke - the mark's
    // geometry could shift and a coordinate-coupled test would fail for
    // the wrong reason. This is what catches "the mark vanished" or "the
    // accent/page keys got swapped".
    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let accentPixelCount = 0;
    for (let i = 0; i < data.length; i += 4) {
      if (toHex(data[i], data[i + 1], data[i + 2]) === "#0f766e") {
        accentPixelCount++;
      }
    }

    return { backgroundHex, accentPixelCount };
  });

  expect(result.backgroundHex, "top-right region is not the page background token").toBe("#fafaf9");

  // Observed count on the current render: 1895 pixels of exact #0f766e.
  // 300 leaves generous headroom for anti-aliasing/layout drift while still
  // failing hard if the mark is missing, recoloured, or shrunk to a sliver.
  expect(
    result.accentPixelCount,
    "accent teal is not present in the image - the mark may be missing or recoloured",
  ).toBeGreaterThan(300);
});
