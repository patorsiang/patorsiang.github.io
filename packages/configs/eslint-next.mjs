import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";

/**
 * Base flat config for every Next app in the repo. Apps spread this and append
 * their own rules, so a change to the shared baseline reaches all of them.
 */
export const nextBaseConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  globalIgnores([".next/**", "out/**", "build/**", "storybook-static/**", "next-env.d.ts"]),
]);

export default nextBaseConfig;
