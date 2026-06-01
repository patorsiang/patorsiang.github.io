import { buildCVOutput, isCvLanguage, type CvLanguage } from "@patorsiang/cv-engine";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ownerName, siteName } from "@/lib/seo";
import { CvPageContent } from "../../../cv/CvPageContent";
import {
  buildCanonicalCvHref,
  cvLanguages,
  cvRoleSlugToId,
  cvRoleSlugs,
} from "../../../cv/cv-request";

type Params = { lang: string; role: string } | Promise<{ lang: string; role: string }>;

const seoRoleLabels = {
  fullstack_engineer: "Full-Stack Engineer",
  ai_ml_engineer: "AI / ML Engineer",
  security_engineer: "Security Engineer",
} as const;

const roleDescriptions = {
  en: {
    fullstack_engineer:
      "Full-stack engineering CV for Napatchol Thaipanich, focused on practical web systems, product delivery, and secure platform foundations.",
    ai_ml_engineer:
      "AI and ML engineering CV for Napatchol Thaipanich, focused on AI-enabled products, applied automation, and production web systems.",
    security_engineer:
      "Security engineering CV for Napatchol Thaipanich, focused on secure platforms, risk-aware delivery, and practical web system hardening.",
  },
  th: {
    fullstack_engineer:
      "CV สาย Full-Stack Engineer ของ Napatchol Thaipanich เน้นระบบเว็บที่ใช้งานจริง การส่งมอบผลิตภัณฑ์ และพื้นฐานแพลตฟอร์มที่ปลอดภัย",
    ai_ml_engineer:
      "CV สาย AI / ML Engineer ของ Napatchol Thaipanich เน้นผลิตภัณฑ์ที่ใช้ AI ระบบอัตโนมัติเชิงประยุกต์ และเว็บระบบโปรดักชัน",
    security_engineer:
      "CV สาย Security Engineer ของ Napatchol Thaipanich เน้นแพลตฟอร์มที่ปลอดภัย การส่งมอบงานที่คำนึงถึงความเสี่ยง และการ harden ระบบเว็บ",
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
  const title = `CV - ${seoRoleLabels[selection.role]} | ${ownerName}`;
  const description = roleDescriptions[selection.lang][selection.role];
  const canonical = buildCanonicalCvHref(selection.role, selection.lang);

  return {
    title: {
      absolute: title,
    },
    description,
    alternates: {
      canonical,
      languages: {
        en: buildCanonicalCvHref(selection.role, "en"),
        th: buildCanonicalCvHref(selection.role, "th"),
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName,
      locale: selection.lang === "en" ? "en_US" : "th_TH",
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
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
