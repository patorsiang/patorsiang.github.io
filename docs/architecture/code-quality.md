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

## Coding Conventions

### Naming Standards

- **Files & Folders**: Use `kebab-case` for all files and directories (e.g., `code-quality.md`, `portfolio-web/`).
- **React Components**: Use `PascalCase` for component files and function names (e.g., `CvPageContent.tsx`).
- **Types & Interfaces**: Use `PascalCase` for TypeScript types and interfaces.
- **Variables & Functions**: Use `camelCase` for general logic, variables, and utility functions.
- **Constants**: Use `UPPER_SNAKE_CASE` for global constants.

### Project Structure

- **Monorepo**: Powered by Bun Workspaces. Shared logic belongs in `packages/`.
- **Apps**: Next.js applications live in `apps/`. They follow the App Router structure.
- **Packages**:
  - `src/index.ts`: Public API entry point.
  - `src/schemas/`: Zod validation schemas.
  - `src/types/`: TypeScript definitions.
- **Documentation**: All architectural and requirement documents live in `docs/`.

### Development Workflow

The project follows a "Requirement-First" workflow to ensure technical integrity:

1.  **Requirement**: Update or create requirements in `docs/requirements/`.
2.  **Schema**: Define or adjust data models in `packages/content/src/schemas/`.
3.  **Tests**: Add unit tests for logic or data transformation in `packages/cv-engine/`.
4.  **Implementation**: Build the feature in the relevant app or package.
5.  **Validation**: Run the "Safety Check" before pushing:
    ```bash
    bun run lint && bun run typecheck && bun run build:portfolio
    ```
