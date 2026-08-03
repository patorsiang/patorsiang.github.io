export const siteName = "Patorsiang Portfolio";
export const ownerName = "Napatchol Thaipanich";
export const defaultTitle = "Napatchol Thaipanich | Full-Stack Developer";
export const defaultDescription =
  "Portfolio of Napatchol Thaipanich, a full-stack developer in Bangkok working on practical web systems, applied AI projects, and security-aware software.";
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://patorsiang.github.io";
export const siteMetadataBase = new URL(siteUrl);

/**
 * The playground is a separate Vercel project, so this is an absolute URL
 * rather than a route. Override with NEXT_PUBLIC_PLAYGROUND_URL per environment.
 */
export const playgroundUrl =
  process.env.NEXT_PUBLIC_PLAYGROUND_URL ?? "https://playground.patorsiang.dev";
