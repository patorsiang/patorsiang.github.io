# Patorsiang Portfolio Platform 2026

This repository is the Bun-based 2026 portfolio platform monorepo for `patorsiang.github.io`.

`legacy-v1` contains the old/current production portfolio. The new main app will live in `apps/portfolio-web`. Phase 1 is foundation setup only; old production functionality is intentionally preserved.

## Structure

```text
.
├── apps/
│   ├── portfolio-web/   New main portfolio app
│   ├── playground/      Experiments, visual demos, and game ideas
│   └── admin/           Optional future CMS/admin app
├── packages/
│   ├── ui/              Shared design system
│   ├── content/         Structured profile, project, and blog data
│   ├── cv-engine/       CV generation logic
│   ├── configs/         Shared configuration presets
│   └── utils/           Shared helpers
├── docs/                Requirements, architecture, decisions, and backlog
├── infra/               Deployment and operational setup
└── legacy-v1/           Current production portfolio
```

## Commands

Install dependencies:

```bash
bun install
```

Run the new portfolio app:

```bash
bun run dev
bun run dev:portfolio
```

Run the legacy portfolio app:

```bash
bun run dev:legacy
```

Build everything:

```bash
bun run build
```

Lint and format:

```bash
bun run lint
bun run format
bun run format:check
```

## Secrets

Do not commit real production deployment, New Relic, SonarCloud/SonarQube, Snyk, or Vercel secrets.

Use `.env.example` files for placeholder names only. Real values belong in GitHub Actions secrets, Vercel environment variables, New Relic account settings, SonarCloud/SonarQube settings, or Snyk settings.

## Deployment Status

Deployment workflows are placeholders until staging and production hosting are finalized. `legacy-v1` may continue to serve the current production portfolio while `apps/portfolio-web` is developed.
