export function normalizeTag(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

export function normalizeText(value: string): string {
  return normalizeTag(value);
}
