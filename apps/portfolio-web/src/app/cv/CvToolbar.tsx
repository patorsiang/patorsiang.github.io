import type { CvLanguage, CvRoleId } from "@patorsiang/cv-engine";
import Link from "next/link";
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

const uiLabels = {
  en: {
    back: "Back to portfolio",
    json: "Download JSON",
    markdown: "Download Markdown",
  },
  th: {
    back: "กลับไปหน้า portfolio",
    json: "ดาวน์โหลด JSON",
    markdown: "ดาวน์โหลด Markdown",
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
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/"
          className="text-sm font-semibold text-(--color-accent) underline-offset-4 hover:underline"
        >
          {uiLabels[lang].back}
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          {Object.entries(roleLabels[lang]).map(([roleId, label]) => {
            const cvRole = roleId as CvRoleId;
            const active = cvRole === role;

            return (
              <Link
                key={roleId}
                href={buildCanonicalCvHref(cvRole, lang)}
                aria-current={active ? "page" : undefined}
                className={[
                  "inline-flex h-10 items-center justify-center rounded-md border px-3 text-sm font-medium transition",
                  active
                    ? "border-(--color-accent) bg-(--color-accent) text-(--color-on-accent)"
                    : "border-(--color-border) bg-(--color-surface) text-foreground hover:border-(--color-accent) hover:text-(--color-accent)",
                ].join(" ")}
              >
                {label}
              </Link>
            );
          })}
        </div>
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
