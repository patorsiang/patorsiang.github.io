import { profile } from "@patorsiang/content";
import { sanitizeUrl } from "@patorsiang/utils";

import { siteUrl } from "./seo";

/**
 * Person structured data (schema.org), read by search engines for rich
 * results (knowledge panel, sitelinks). Built entirely from our own profile
 * data, not user input, so this is safe to serialize - unlike the
 * markdown-rendered post body elsewhere in the app, nothing here crosses a
 * trust boundary. `<` is still escaped before embedding, so a value that
 * happened to contain "</script>" could never end the tag early.
 *
 * A plain exported string, not computed inline in layout.tsx: next.config.ts
 * hashes this exact string for the CSP script-src allowlist (see
 * buildContentSecurityPolicy), so the hash and the rendered content can never
 * drift apart the way a nonce-based approach would need per-request
 * plumbing to guarantee.
 */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name.en,
  alternateName: profile.handle,
  jobTitle: profile.role.en,
  description: profile.headline.en,
  url: siteUrl,
  email: profile.contact.email.url.replace(/^mailto:/, ""),
  address: {
    "@type": "PostalAddress",
    addressLocality: profile.location.en,
  },
  sameAs: profile.links
    .filter((link) => link.label.en !== "Portfolio")
    .map((link) => sanitizeUrl(link.url)),
};

export const personJsonLdScript = JSON.stringify(personJsonLd).replaceAll("<", "\\u003c");
