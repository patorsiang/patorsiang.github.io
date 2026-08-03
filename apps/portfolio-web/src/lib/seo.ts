import type { Metadata } from "next";

export const siteName = "Patorsiang Portfolio";
export const ownerName = "Napatchol Thaipanich";
export const defaultTitle = "Napatchol Thaipanich | Full-Stack Developer";
export const defaultDescription =
  "Portfolio of Napatchol Thaipanich, a full-stack developer in Bangkok working on practical web systems, applied AI projects, and security-aware software.";
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://patorsiang.github.io";
export const siteMetadataBase = new URL(siteUrl);

type PageMetadataInput = {
  readonly title: string;
  readonly description: string;
  /** Route path, used as both canonical and OpenGraph url. */
  readonly path: string;
  /** "profile" for pages about the person, "website" for indexes. */
  readonly type?: "website" | "profile";
};

/**
 * Every static page needs the same canonical/OpenGraph/Twitter shape, differing
 * only in title, description, path and type. Kept here so a new page cannot
 * ship with a subtly different SEO shape, which is what four copy-pasted
 * blocks were heading towards.
 *
 * The CV route builds its own metadata: it adds hreflang alternates per
 * language, which nothing else needs.
 */
export function buildPageMetadata({
  title,
  description,
  path,
  type = "website",
}: PageMetadataInput): Metadata {
  const fullTitle = `${title} | ${ownerName}`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName,
      type,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
