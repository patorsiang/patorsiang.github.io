import type { CvLanguage, CvRoleId, GeneratedCV } from "./config";
import { buildCVOutput } from "./output-builder";

export type JsonExportOptions = {
  readonly pretty?: boolean;
};

export function exportCVAsJSON(cv: GeneratedCV, options: JsonExportOptions = {}): string {
  const pretty = options.pretty ?? true;

  return pretty ? JSON.stringify(cv, null, 2) : JSON.stringify(cv);
}

export function generateCVJSON(
  role: CvRoleId,
  lang: CvLanguage,
  options: JsonExportOptions = {},
): string {
  return exportCVAsJSON(buildCVOutput(role, lang), options);
}
