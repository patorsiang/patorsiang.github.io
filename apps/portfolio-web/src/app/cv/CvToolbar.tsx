"use client";

import type { CvLanguage, CvRoleId } from "@patorsiang/cv-engine";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PrintButton } from "./PrintButton";
import {
  buildCanonicalCvHref,
  buildCvExportFilename,
  defaultCvRouteLanguage,
  type CvRouteLanguage,
} from "./cv-request";

const roleLabels = {
  fullstack_engineer: "Full-Stack Engineer",
  ai_ml_engineer: "AI / ML Engineer",
  security_engineer: "Security Engineer",
} as const satisfies Record<CvRoleId, string>;

const languageLabels = {
  en: "EN",
  th: "TH",
} as const satisfies Record<CvRouteLanguage, string>;

type CvToolbarProps = {
  readonly role: CvRoleId;
  readonly exportLang: CvLanguage;
};

export function CvToolbar({ role, exportLang }: CvToolbarProps) {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang");
  const routeLang: CvRouteLanguage = lang === "en" || lang === "th" ? lang : defaultCvRouteLanguage;

  return <CvToolbarShell role={role} routeLang={routeLang} exportLang={exportLang} />;
}

export function CvToolbarFallback({ role, exportLang }: CvToolbarProps) {
  return <CvToolbarShell role={role} routeLang={defaultCvRouteLanguage} exportLang={exportLang} />;
}

function CvToolbarShell({
  role,
  routeLang,
  exportLang,
}: CvToolbarProps & { readonly routeLang: CvRouteLanguage }) {
  const jsonHref = `/cv/export/json?role=${role}&lang=${exportLang}`;
  const markdownHref = `/cv/export/markdown?role=${role}&lang=${exportLang}`;

  return (
    <div className="mb-8 flex flex-col gap-4 border-b border-zinc-200 pb-6 print:hidden">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/"
          className="text-sm font-semibold text-teal-800 underline-offset-4 hover:underline"
        >
          Back to portfolio
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          {Object.entries(roleLabels).map(([roleId, label]) => {
            const cvRole = roleId as CvRoleId;
            const active = cvRole === role;

            return (
              <Link
                key={roleId}
                href={buildCanonicalCvHref(cvRole, routeLang)}
                aria-current={active ? "page" : undefined}
                className={[
                  "inline-flex h-10 items-center justify-center rounded-md border px-3 text-sm font-medium transition",
                  active
                    ? "border-teal-700 bg-teal-50 text-teal-900"
                    : "border-zinc-300 bg-white text-zinc-900 hover:border-teal-700 hover:text-teal-800",
                ].join(" ")}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {Object.entries(languageLabels).map(([lang, label]) => {
          const cvLang = lang as CvRouteLanguage;
          const active = cvLang === routeLang;

          return (
            <Link
              key={lang}
              href={buildCanonicalCvHref(role, cvLang)}
              aria-current={active ? "true" : undefined}
              className={[
                "inline-flex h-10 items-center justify-center rounded-md border px-3 text-sm font-semibold transition",
                active
                  ? "border-zinc-900 bg-zinc-900 text-white"
                  : "border-zinc-300 bg-white text-zinc-900 hover:border-teal-700 hover:text-teal-800",
              ].join(" ")}
            >
              {label}
            </Link>
          );
        })}
        {routeLang === "th" ? (
          <span className="text-sm font-medium text-zinc-600">Thai content coming soon</span>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <a
          href={jsonHref}
          className="inline-flex h-10 items-center justify-center rounded-md border border-zinc-300 bg-white px-3 text-sm font-medium text-zinc-900 transition hover:border-teal-700 hover:text-teal-800"
          download={buildCvExportFilename(role, exportLang, "json")}
        >
          Download JSON
        </a>
        <a
          href={markdownHref}
          className="inline-flex h-10 items-center justify-center rounded-md border border-zinc-300 bg-white px-3 text-sm font-medium text-zinc-900 transition hover:border-teal-700 hover:text-teal-800"
          download={buildCvExportFilename(role, exportLang, "md")}
        >
          Download Markdown
        </a>
        <PrintButton />
      </div>
    </div>
  );
}
