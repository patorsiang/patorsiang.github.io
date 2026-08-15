import { describe, expect, test } from "bun:test";

import { renderPostBody } from "./render";

const noImages = new Map<string, string>();

describe("renderPostBody", () => {
  test("renders markdown to HTML", () => {
    const html = renderPostBody("## A heading\n\nSome **bold** text.", {
      vendoredImages: noImages,
    });

    expect(html).toContain("<h2");
    expect(html).toContain("<strong>bold</strong>");
  });

  // The whole reason a sanitiser is a dependency rather than a nicety. The
  // source lives in a second repo, and style-src already allows unsafe-inline.
  test("strips a script tag from the body", () => {
    const html = renderPostBody("Before\n\n<script>alert(1)</script>\n\nAfter", {
      vendoredImages: noImages,
    });

    expect(html).not.toContain("<script");
    expect(html).not.toContain("alert(1)");
    expect(html).toContain("Before");
  });

  test("strips an inline event handler", () => {
    const html = renderPostBody('<img src="/x.png" onerror="alert(1)">', {
      vendoredImages: noImages,
    });

    expect(html).not.toContain("onerror");
  });

  test("rewrites a vendored image to its local path", () => {
    const html = renderPostBody("![Hero](https://cdn.example.com/hero.webp)", {
      vendoredImages: new Map([["https://cdn.example.com/hero.webp", "/posts/x/hero.webp"]]),
    });

    expect(html).toContain('src="/posts/x/hero.webp"');
    expect(html).not.toContain("cdn.example.com");
  });

  // ISR revalidation runs on a read-only filesystem and cannot vendor. Between
  // deploys, a newly added image has no local file - a link is a working
  // affordance where a broken <img> is just a hole in the page.
  test("degrades an unvendored image to a link rather than a broken image", () => {
    const html = renderPostBody("![Hero](https://cdn.example.com/new.webp)", {
      vendoredImages: noImages,
    });

    expect(html).not.toContain("<img");
    expect(html).toContain('href="https://cdn.example.com/new.webp"');
    expect(html).toContain("Hero");
  });

  test("leaves an already-local image alone", () => {
    const html = renderPostBody("![Mark](/icons/icon-192.png)", { vendoredImages: noImages });

    expect(html).toContain('src="/icons/icon-192.png"');
  });
});
