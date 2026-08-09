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
