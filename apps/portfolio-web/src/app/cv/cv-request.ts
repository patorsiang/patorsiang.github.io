import { isCvLanguage, isCvRoleId, type CvLanguage, type CvRoleId } from "@patorsiang/cv-engine";

export const defaultCvRole: CvRoleId = "fullstack_engineer";
export const defaultCvLanguage: CvLanguage = "en";

export type CvSelection = {
  readonly role: CvRoleId;
  readonly lang: CvLanguage;
};

type SearchParamSource = Record<string, string | string[] | undefined> | URLSearchParams;

export function resolveCvSelection(source: SearchParamSource): CvSelection {
  return parseCvSelection(source) ?? {
    role: defaultCvRole,
    lang: defaultCvLanguage,
  };
}

export function parseCvSelection(source: SearchParamSource): CvSelection | null {
  const role = getFirstValue(source, "role");
  const lang = getFirstValue(source, "lang");

  if (!role || !lang) {
    return null;
  }

  if (!isCvRoleId(role) || !isCvLanguage(lang)) {
    return null;
  }

  return { role, lang };
}

export function buildCvExportFilename(role: CvRoleId, lang: CvLanguage, extension: "json" | "md") {
  return `napatchol-thaipanich-${role}-${lang}.cv.${extension}`;
}

function getFirstValue(source: SearchParamSource, key: string): string | undefined {
  if (source instanceof URLSearchParams) {
    return source.get(key) ?? undefined;
  }

  const value = source[key];
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}
