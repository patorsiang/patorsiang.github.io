# Patorsiang Portfolio Platform 2026

The **2026 Portfolio Platform** is a modern, monorepo-based system for Napatchol Thaipanich (`patorsiang`). It serves as a unified hub for professional identity, role-targeted CV generation, and experimental projects.

## Architecture Overview

The platform is built as a high-performance monorepo using **Bun** and **Next.js**. It separates content from presentation and logic, enabling role-specific views and automated exports.

### Repository Structure

```text
.
├── apps/
│   ├── portfolio-web/    # Main Next.js portfolio application (2026 version)
│   ├── playground/       # Experiments, visual demos, and game ideas
│   └── admin/            # (Planned) CMS/Admin interface
├── packages/
│   ├── content/          # Structured profile, project, and CV data (Zod/JSON)
│   ├── cv-engine/        # Role-targeted CV logic (filtering, ranking, formatting)
│   ├── ui/               # Shared design system components
│   ├── configs/          # Shared configuration presets (ESLint, Prettier, TS)
│   └── utils/            # Shared utility helpers
├── docs/                 # Architecture, requirements, and design decisions
├── infra/                # Infrastructure and deployment configurations
└── legacy-v1/            # Previous production portfolio (current fallback)
```

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (latest version)

### Installation

```bash
bun install
```

### Development Commands

| Command                 | Description                                      |
| :---------------------- | :----------------------------------------------- |
| `bun run dev`           | Start the main portfolio app in development mode |
| `bun run dev:portfolio` | Alias for `bun run dev`                          |
| `bun run dev:legacy`    | Start the legacy-v1 portfolio app                |

### Build & Quality

| Command                   | Description                                     |
| :------------------------ | :---------------------------------------------- |
| `bun run build`           | Build both the new portfolio and the legacy app |
| `bun run build:portfolio` | Build the main Next.js portfolio                |
| `bun run lint`            | Run ESLint across the workspace                 |
| `bun run typecheck`       | Run TypeScript compiler checks                  |
| `bun run format:check`    | Check file formatting with Prettier             |

## Core Packages

### `@patorsiang/content`

Contains the "source of truth" for the portfolio. Data is stored as JSON and validated via Zod schemas to ensure consistency across different applications and CV versions.

### `@patorsiang/cv-engine`

A specialized engine that generates role-targeted CVs. It handles:

- **Filtering**: Selecting relevant experiences and projects based on a targeted role.
- **Ranking**: Prioritizing skills and highlights.
- **Exporting**: Providing normalized data for Web, JSON, and Markdown formats.

## Legacy Portfolio Policy

`legacy-v1` contains the previous/current production version of the portfolio.

- **Do NOT delete** this directory.
- It serves as the **current production fallback** until the 2026 platform is fully live.
- Post-launch, it will be kept for migration reference and eventually archived.

## Environment & Secrets

- **Do not commit** real `.env` files.
- Use `.env.example` as a template for local development.
- Browser-safe variables must be prefixed with `NEXT_PUBLIC_`.
- Private secrets belong in **Vercel Project Settings** or **GitHub Actions Secrets**.

## Deployment

The platform is configured for continuous deployment to **Vercel** via GitHub Actions.

- Pushing to `main` triggers a production deployment of `portfolio-web`.
- `legacy-v1` deployment is managed separately (see `infra/github-pages` or its own workflow).

## Deployment Status

The new `apps/portfolio-web` app has a development deployment on Vercel.

- **Development**: Active — `https://patorsiang-portfolio-web.vercel.app` (Placeholder)
- **Production**: Pending final cutover

`legacy-v1` remains the current production fallback until the new portfolio app is stable.

See [Vercel Deployment Details](docs/deployment/vercel.md) for project settings and environment configuration.

## Workflow Notes

- Always run `bun run typecheck` before pushing changes.
- Ensure `bun run lint` passes to maintain codebase standards.
- Documentation for specific features can be found in the `docs/` directory.
