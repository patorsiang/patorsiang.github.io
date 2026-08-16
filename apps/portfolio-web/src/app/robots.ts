import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/seo";

export const dynamic = "force-static";

/**
 * `/cv/export/` is disallowed because those routes generate a JSON or Markdown
 * download per request from query parameters - crawlable in principle, endless
 * in practice, and worth nothing in an index.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/cv/export/",
    },
    sitemap: new URL("/sitemap.xml", siteUrl).href,
  };
}
