import { profile } from "@patorsiang/content";
import { sanitizeUrl } from "@patorsiang/utils";
import Link from "next/link";

import { buildCanonicalCvHref, defaultCvLanguage, defaultCvRole } from "@/lib/cv-routes";

/**
 * Utility links only, per docs/design/information-architecture.md: GitHub,
 * LinkedIn, Email, CV.
 *
 * Deliberately not a second navigation. About/Experience/Projects/Contact are
 * one scroll away in GlobalNav on every page, and the IA rules out repeating
 * them here - a footer that mirrors the nav doubles the maintenance and gives a
 * screen reader user two identical link lists to tell apart.
 *
 * The CV link points at the canonical `/[lang]/cv/[role]` rather than `/cv`,
 * which would redirect. GlobalNav uses `/cv` on purpose, because that is the
 * stable entry point the IA names for primary navigation; here there is nothing
 * to gain from the extra hop.
 */

const links = [
  { label: "GitHub", href: sanitizeUrl(profile.contact.github.url), external: true },
  { label: "LinkedIn", href: sanitizeUrl(profile.contact.linkedin.url), external: true },
  { label: "Email", href: sanitizeUrl(profile.contact.email.url), external: false },
  { label: "CV", href: buildCanonicalCvHref(defaultCvRole, defaultCvLanguage), external: false },
];

const linkClassName =
  "inline-flex h-10 items-center text-sm font-semibold text-(--color-accent) underline-offset-4 transition hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

export function SiteFooter() {
  return (
    <footer
      // The chrome is English on every route, including the Thai CV, matching
      // GlobalNav. Drop this once it localizes.
      lang="en"
      className="border-t border-(--color-border) bg-background print:hidden"
    >
      <nav
        aria-label="Utility links"
        className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-x-6 gap-y-1 px-6 py-6 sm:px-8 lg:px-10"
      >
        {links.map((link) =>
          link.external ? (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className={linkClassName}
            >
              {link.label}
            </a>
          ) : (
            <Link key={link.label} href={link.href} className={linkClassName}>
              {link.label}
            </Link>
          ),
        )}
      </nav>
    </footer>
  );
}
