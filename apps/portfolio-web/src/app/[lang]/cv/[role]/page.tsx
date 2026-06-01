import { buildCVOutput, isCvLanguage, type CvLanguage } from "@patorsiang/cv-engine";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CvPageContent } from "../../../cv/CvPageContent";
import {
  buildCanonicalCvHref,
  cvLanguages,
  cvRoleSlugToId,
  cvRoleSlugs,
} from "../../../cv/cv-request";

type Params = { lang: string; role: string } | Promise<{ lang: string; role: string }>;

const roleLabels = {
  en: {
    fullstack_engineer: "Full-Stack Engineer",
    ai_ml_engineer: "AI / ML Engineer",
    security_engineer: "Security Engineer",
  },
  th: {
    fullstack_engineer: "นักพัฒนา Full-Stack",
    ai_ml_engineer: "วิศวกร AI / ML",
    security_engineer: "วิศวกร Security",
  },
} as const;

export const dynamicParams = false;

export function generateStaticParams() {
  return cvLanguages.flatMap((lang) => cvRoleSlugs.map((role) => ({ lang, role })));
}

export async function generateMetadata({
  params,
}: Readonly<{
  params: Params;
}>): Promise<Metadata> {
  const selection = await resolveParams(params);
  const cv = buildCVOutput(selection.role, selection.lang);
  const title = `${cv.header.name} - ${roleLabels[selection.lang][selection.role]} CV`;
  const description = cv.summary.text;

  return {
    title,
    description,
    alternates: {
      canonical: buildCanonicalCvHref(selection.role, selection.lang),
      languages: {
        en: buildCanonicalCvHref(selection.role, "en"),
        th: buildCanonicalCvHref(selection.role, "th"),
      },
    },
  };
}

export default async function CvRoleLanguagePage({
  params,
}: Readonly<{
  params: Params;
}>) {
  const selection = await resolveParams(params);
  const cv = buildCVOutput(selection.role, selection.lang);

  return (
    <CvPageContent
      cv={cv}
      selection={{
        role: selection.role,
        lang: selection.lang,
      }}
    />
  );
}

async function resolveParams(params: Params) {
  const { lang, role: roleSlug } = await Promise.resolve(params);

  if (!isCvLanguage(lang)) {
    notFound();
  }

  const role = cvRoleSlugToId(roleSlug);

  if (!role) {
    notFound();
  }

  return { lang: lang as CvLanguage, role };
}
