# @patorsiang/cv-engine

Reusable CV generation engine for the portfolio site.

## Public API

- `buildCVOutput(role, lang)` builds the canonical structured CV object.
- `generateCV(role, lang)` remains as a compatibility wrapper over `buildCVOutput()`.
- `exportCVAsJSON(cv, options?)` serializes a structured CV object as JSON.
- `generateCVJSON(role, lang, options?)` builds and serializes JSON in one step.
- `exportCVAsMarkdown(cv, options?)` renders a readable Markdown CV document.
- `generateCVMarkdown(role, lang, options?)` builds and serializes Markdown in one step.

Supported roles:

- `fullstack_engineer`
- `ai_ml_engineer`
- `security_engineer`

Supported language:

- `en`

## Usage

```ts
import {
  buildCVOutput,
  generateCVJSON,
  generateCVMarkdown,
} from "@patorsiang/cv-engine";

const cv = buildCVOutput("fullstack_engineer", "en");
const json = generateCVJSON("fullstack_engineer", "en");
const markdown = generateCVMarkdown("fullstack_engineer", "en");
```

## Notes

- Selection, ranking, grouping, and sorting happen before output serialization.
- JSON export keeps the full structured CV object, including debug data.
- Markdown export is human-readable by default and hides debug data unless requested.
- `generateCV()` stays available for existing callers.
