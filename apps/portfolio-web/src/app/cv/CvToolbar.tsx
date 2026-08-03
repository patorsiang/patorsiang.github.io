import type { CvLanguage, CvRoleId } from "@patorsiang/cv-engine";
import Link from "next/link";

import { SegmentedLinks } from "@/components/molecules/SegmentedLinks";

import { PrintButton } from "./PrintButton";
import { buildCanonicalCvHref, buildCvExportFilename } from "./cv-request";

const roleLabels = {
  en: {
    fullstack_engineer: "Full-Stack Engineer",
    ai_ml_engineer: "AI / ML Engineer",
    security_engineer: "Security Engineer",
  },
  th: {
    fullstack_engineer: "Full-Stack Developer",
    ai_ml_engineer: "วิศวกร AI / ML",
    security_engineer: "วิศวกร Security",
  },
} as const satisfies Record<CvLanguage, Record<CvRoleId, string>>;

/** Abbreviations shown inside the segmented control; full names stay in roleLabels. */
const shortRoleLabels = {
  fullstack_engineer: "Full-Stack",
  ai_ml_engineer: "AI / ML",
  security_engineer: "Security",
} as const satisfies Record<CvRoleId, string>;

const roleIds = Object.keys(shortRoleLabels) as readonly CvRoleId[];

/** Each language names itself, so the switcher reads the same whichever page you are on. */
const languageOptions = [
  { id: "en", label: "EN", fullLabel: "English" },
  { id: "th", label: "TH", fullLabel: "ภาษาไทย" },
] as const satisfies readonly { id: CvLanguage; label: string; fullLabel: string }[];

const uiLabels = {
  en: {
    back: "Back to portfolio",
    json: "Download JSON",
    markdown: "Download Markdown",
    roleSelector: "CV variant",
    language: "Language",
  },
  th: {
    back: "กลับไปหน้า portfolio",
    json: "ดาวน์โหลด JSON",
    markdown: "ดาวน์โหลด Markdown",
    roleSelector: "รูปแบบ CV",
    language: "ภาษา",
  },
} as const satisfies Record<CvLanguage, Record<string, string>>;

type CvToolbarProps = {
  readonly role: CvRoleId;
  readonly lang: CvLanguage;
};

export function CvToolbar({ role, lang }: CvToolbarProps) {
  const jsonHref = `/cv/export/json?role=${role}&lang=${lang}`;
  const markdownHref = `/cv/export/markdown?role=${role}&lang=${lang}`;

  return (
    <div className="mb-8 flex flex-col gap-4 border-b border-(--color-border) pb-6 print:hidden">
      {/*
        Mobile wraps to two lines: back link + language, then the role control full width.
        On sm+ everything sits on one line with the two controls pushed right.
      */}
      <div className="flex flex-wrap items-center gap-2">
        <Link
          href="/"
          className="text-sm font-semibold text-(--color-accent) underline-offset-4 hover:underline"
        >
          {uiLabels[lang].back}
        </Link>

        <SegmentedLinks
          label={uiLabels[lang].language}
          className="order-1 ml-auto sm:order-2 sm:ml-0"
          items={languageOptions.map((option) => ({
            id: option.id,
            href: buildCanonicalCvHref(role, option.id),
            label: option.label,
            fullLabel: option.fullLabel,
            lang: option.id,
            hrefLang: option.id,
            active: option.id === lang,
          }))}
        />

        <SegmentedLinks
          label={uiLabels[lang].roleSelector}
          className="order-2 w-full sm:order-1 sm:ml-auto sm:w-auto"
          items={roleIds.map((roleId) => ({
            id: roleId,
            href: buildCanonicalCvHref(roleId, lang),
            label: shortRoleLabels[roleId],
            fullLabel: roleLabels[lang][roleId],
            active: roleId === role,
          }))}
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <a
          href={jsonHref}
          className="inline-flex h-10 items-center justify-center rounded-md border border-(--color-border) bg-(--color-surface) px-3 text-sm font-medium text-foreground transition hover:border-(--color-accent) hover:text-(--color-accent)"
          download={buildCvExportFilename(role, lang, "json")}
        >
          {uiLabels[lang].json}
        </a>
        <a
          href={markdownHref}
          className="inline-flex h-10 items-center justify-center rounded-md border border-(--color-border) bg-(--color-surface) px-3 text-sm font-medium text-foreground transition hover:border-(--color-accent) hover:text-(--color-accent)"
          download={buildCvExportFilename(role, lang, "md")}
        >
          {uiLabels[lang].markdown}
        </a>
        <PrintButton />
      </div>
    </div>
  );
}
