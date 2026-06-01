import { buildCVOutput } from "@patorsiang/cv-engine";
import { notFound } from "next/navigation";
import { CvPageContent } from "../CvPageContent";
import { cvRoleSlugToId, defaultCvLanguage } from "../cv-request";

type Params = { role: string } | Promise<{ role: string }>;

const roleSlugs = ["fullstack-engineer", "ai-ml-engineer", "security-engineer"] as const;

export const dynamicParams = false;

export function generateStaticParams() {
  return roleSlugs.map((role) => ({ role }));
}

export default async function CvRolePage({
  params,
}: Readonly<{
  params: Params;
}>) {
  const { role: roleSlug } = await Promise.resolve(params);
  const role = cvRoleSlugToId(roleSlug);

  if (!role) {
    notFound();
  }

  const cv = buildCVOutput(role, defaultCvLanguage);

  return (
    <CvPageContent
      cv={cv}
      selection={{
        role,
        exportLang: defaultCvLanguage,
      }}
    />
  );
}
