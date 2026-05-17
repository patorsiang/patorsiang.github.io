# Code Quality

## ESLint

ESLint is used for correctness, React, TypeScript, and Next.js rules.

Run:

```bash
bun run lint
```

## Prettier

Prettier is used for formatting. Linting and formatting are intentionally separate.

Run:

```bash
bun run format
bun run format:check
```

`legacy-v1` is ignored by Prettier to avoid formatting churn in the preserved production app.

## SonarQube / SonarCloud

`sonar-project.properties` provides the foundation for future SonarQube or SonarCloud analysis.

The intended checks are:

- Code smell tracking
- Maintainability review
- Duplication tracking
- Security hotspot review

No real `SONAR_TOKEN` is committed. Add scan tokens through GitHub Actions secrets or Sonar project settings.
