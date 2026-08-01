"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import type { CvLanguage } from "@patorsiang/cv-engine";
import {
  buildCanonicalCvHref,
  cvLanguages,
  cvRoleSlugToId,
  defaultCvRole,
} from "@/app/cv/cv-request";
import { classNames } from "@/lib/classnames";
import { getStoredTheme, type Theme, themeStorageKey, themes } from "@/lib/theme";

const languageLabels = {
  en: "EN",
  th: "TH",
} as const satisfies Record<CvLanguage, string>;

export function GlobalNav() {
  const pathname = usePathname();
  const [activeTheme, setActiveTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const mediaQuery = globalThis.matchMedia("(prefers-color-scheme: dark)");
    const applyPreferredTheme = () => {
      const nextTheme = getStoredTheme() ?? getSystemTheme();

      setActiveTheme(nextTheme);
    };
    const handleChange = () => {
      if (!getStoredTheme()) {
        applyPreferredTheme();
      }
    };
    const timeoutId = globalThis.setTimeout(applyPreferredTheme, 0);

    mediaQuery.addEventListener("change", handleChange);
    return () => {
      globalThis.clearTimeout(timeoutId);
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    if (activeTheme) {
      document.documentElement.dataset.theme = activeTheme;
    }
  }, [activeTheme]);

  function selectTheme(nextTheme: Theme) {
    globalThis.localStorage.setItem(themeStorageKey, nextTheme);
    setActiveTheme(nextTheme);
  }

  const languageLinks = useMemo(() => buildLanguageLinks(pathname), [pathname]);

  return (
    <nav
      aria-label="Global navigation"
      className="flex flex-col gap-3 border-b border-(--color-border) pb-4 print:hidden sm:flex-row sm:items-center sm:justify-between"
    >
      <Link
        href="/"
        className="text-sm font-semibold text-(--color-accent) underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-offset-4"
      >
        Portfolio
      </Link>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1" aria-label="Language">
          {cvLanguages.map((language) => (
            <Link
              key={language}
              href={languageLinks[language]}
              aria-current={languageLinks.active === language ? "true" : undefined}
              aria-label={`Switch language to ${language === "en" ? "English" : "Thai"}`}
              className={controlClassName(languageLinks.active === language)}
            >
              {languageLabels[language]}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-1" aria-label="Theme">
          {themes.map((themeOption) => (
            <button
              key={themeOption}
              type="button"
              aria-pressed={activeTheme === themeOption}
              aria-label={`Use ${themeOption} theme`}
              className={controlClassName(activeTheme === themeOption)}
              onClick={() => selectTheme(themeOption)}
            >
              {themeOption === "light" ? "Light" : "Dark"}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

function getSystemTheme(): Theme {
  if (globalThis.window === undefined) {
    return "light";
  }

  return globalThis.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function buildLanguageLinks(pathname: string) {
  const [, maybeLang, maybeCv, maybeRole] = pathname.split("/");
  const currentLanguage = maybeLang === "th" ? "th" : "en";
  const currentRole = maybeCv === "cv" && maybeRole ? cvRoleSlugToId(maybeRole) : null;
  const role = currentRole ?? defaultCvRole;

  return {
    active: currentLanguage,
    en: buildCanonicalCvHref(role, "en"),
    th: buildCanonicalCvHref(role, "th"),
  };
}

function controlClassName(active: boolean) {
  return classNames(
    "inline-flex h-9 min-w-12 items-center justify-center rounded-md border px-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
    active
      ? "border-(--color-accent) bg-(--color-accent) text-(--color-on-accent)"
      : "border-(--color-border) bg-(--color-surface) text-foreground hover:border-(--color-accent)",
  );
}
