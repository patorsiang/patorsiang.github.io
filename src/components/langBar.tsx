"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";

import { sendGTMEvent } from "@next/third-parties/google";

import { locales } from "#/i18n";

import { useSplitPathname } from "@/utils/hooks/useSplitPathname";

export default function LanguageBar({ lang }: { lang: string }) {
  const router = useRouter();
  const { currentPath, currentLang } = useSplitPathname();

  const [show, setShow] = useState(false);

  function switchLocale(locale: string) {
    // e.g. '/en/about' or '/fr/contact'
    if (locale !== currentLang) {
      const newPath = `/${locale}${currentPath ? "/" + currentPath : ""}`;
      router.push(newPath, { scroll: false });
    }
  }

  return (
    <div className="lang-dropdown">
      <button
        className="lang-dropdown-btn"
        onClick={() => setShow((prev) => !prev)}
      >
        <span className="lang-dropdown-btn-text">{lang}</span>
        <span className="lang-dropdown-btn-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-chevron-down"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </span>
      </button>

      {show && (
        <div className="lang-dropdown-content">
          {locales.map((lang) => (
            <button
              key={lang}
              onClick={() => {
                sendGTMEvent({ event: "changed_language", value: lang });
                switchLocale(lang);
              }}
              className={clsx({ isActive: lang === currentLang })}
            >
              {lang}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
