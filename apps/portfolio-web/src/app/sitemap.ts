import type { MetadataRoute } from "next";

import { POST_FALLBACK } from "@patorsiang/content";
import { cvLanguages, cvRoleSlugs } from "@/lib/cv-routes";
import { siteUrl } from "@/lib/seo";

export const dynamic = "force-static";

/**
 * Only canonical URLs belong here.
 *
 * `/cv` and `/cv/[role]` are deliberately absent: both redirect to
 * `/[lang]/cv/[role]`, and listing a redirect asks a crawler to spend budget
 * discovering a URL that immediately points somewhere else. The CV entries are
 * generated from the same cvLanguages/cvRoleSlugs the router uses, so adding a
 * role or a language cannot leave this file behind.
 *
 * `/cv/export/*` is also absent - those are download endpoints, not pages.
 *
 * Post entries come from POST_FALLBACK, not a live fetch, because this file is
 * `force-static` - a live-fetched sitemap would make the whole route dynamic.
 * A brand-new post's sitemap entry therefore waits for the next deploy; the
 * spec accepts this as the one place the hybrid sync approach still lags.
 *
 * No `lastModified`: nothing here tracks per-page modification dates, and
 * stamping every entry with the build time (as the legacy site does) tells
 * crawlers the whole site changed on every deploy, which is worse than saying
 * nothing.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/about", priority: 0.8 },
    { path: "/experience", priority: 0.8 },
    { path: "/projects", priority: 0.8 },
    { path: "/contact", priority: 0.6 },
    { path: "/posts", priority: 0.7 },
    ...cvLanguages.flatMap((lang) =>
      cvRoleSlugs.map((role) => ({ path: `/${lang}/cv/${role}`, priority: 0.7 })),
    ),
    ...POST_FALLBACK.map((post) => ({ path: `/posts/${post.slug}`, priority: 0.6 })),
  ];

  return pages.map(({ path, priority }) => ({
    url: new URL(path, siteUrl).href,
    changeFrequency: "monthly",
    priority,
  }));
}
