# Vercel Deployment

This document outlines the deployment setup for the Patorsiang Portfolio Platform on Vercel.

## Status

- **Development Deployment**: Active
- **Production Deployment**: Cutover in progress. `legacy-v1`'s GitHub Pages workflow (`nextjs.yml`) has been removed - `apps/portfolio-web` is now the only app built and deployed. `legacy-v1`'s source stays in the repo (`bun run build:legacy` etc. still work locally); only the automated deploy stopped.
- Taking the already-live `patorsiang.github.io` GitHub Pages site down, or repointing its DNS to the new Vercel deployment, is a separate manual step (repo Settings / DNS), not done as part of this change.

## Deployment URLs

- **Production URL**: `https://patorsiang-github-io.vercel.app` (no custom domain configured yet)
- **Preview URL**: generated per-deploy by `deploy-preview`

## App Deployed

- **Project**: `patorsiang-github-io` (Vercel slugifies the linked repo name, `patorsiang.github.io`)
- **Location**: `apps/portfolio-web`

## Package Manager

- **Bun**: The project uses Bun for installations and builds.

## Vercel Project Settings

| Setting                | Value                          |
| :--------------------- | :----------------------------- |
| **Framework Preset**   | Next.js                        |
| **Root Directory**     | `apps/portfolio-web`           |
| **Build Command**      | `bun run build:portfolio`      |
| **Install Command**    | `bun install`                  |
| **Output Directory**   | Next.js default (`.next`)      |
| **Production Branch**  | `main`                         |
| **Development Branch** | `feat/portfolio-platform-2026` |

## GitHub Actions Workflows

The repository uses automated workflows for deployment:

### Production (`deploy-production.yml`)

- **Trigger**: Push to `main`.
- **Environment**: Pulls settings from the **Production** environment.
- **Build**: Runs `bun run build:portfolio` locally.
- **Result**: Updates the live site (`--prod`).

### Staging / Preview (`ci.yml`, `deploy-preview` job)

- **Trigger**: Push to `feat/portfolio-platform-2026`, Pull Request to `main`, or manual dispatch. Runs after the `checks` job passes.
- **Environment**: Pulls settings from the **Preview** environment.
- **Build**: Runs `bun run build:portfolio` locally.
- **Result**: Generates a temporary Preview URL.

## Monorepo Configuration

The Vercel project is configured as a monorepo. It automatically resolves the following workspace packages:

- `@patorsiang/content`
- `@patorsiang/cv-engine`

These packages are transpiled by Next.js as configured in `apps/portfolio-web/next.config.ts`.

## Environment Variables

The following environment variables should be configured in the Vercel Dashboard:

| Variable                       | Scope      | Required    | Description                                            |
| :----------------------------- | :--------- | :---------- | :----------------------------------------------------- |
| `NEXT_PUBLIC_APP_ENV`          | Production | Yes         | Set to `production`. Configured.                       |
| `NEXT_PUBLIC_SITE_URL`         | Production | Recommended | `https://patorsiang-github-io.vercel.app`. Configured. |
| `NEW_RELIC_LICENSE_KEY`        | Production | Optional    | Private license key for New Relic.                     |
| `NEXT_PUBLIC_NEW_RELIC_APP_ID` | Production | Optional    | Public application ID for New Relic Browser.           |

Only the Production environment is configured so far - Preview builds still fall back to the defaults in `src/lib/seo.ts`, which is correct: a preview deploy's real URL is different on every run, so a fixed `NEXT_PUBLIC_SITE_URL` would be wrong there.

## Secrets Policy

- **Do NOT commit** `.env` files or `.vercel/` directory to the repository.
- **Do NOT commit** Vercel tokens or deployment secrets.
- Real values must be managed via the **Vercel Dashboard** or **GitHub Actions Secrets**.
- Use `.env.example` files for documenting required variable names with placeholders.

## Deployment Verification

- **Last Checked**: 2026-06-01
- **Result**: Development deployment is active and reachable.
- **Notes**: SEO metadata is currently using the fallback canonical URL.

## Production Cutover TODO

Before the final production cutover:

- [ ] Choose a custom domain, if any - currently shipping on the Vercel-assigned `patorsiang-github-io.vercel.app`.
- [x] Configure production-specific environment variables in Vercel: `NEXT_PUBLIC_APP_ENV`, `NEXT_PUBLIC_SITE_URL`.
- [x] Update `NEXT_PUBLIC_SITE_URL` to the current production domain.
- [ ] Verify SEO and Open Graph metadata on the live deployment (checked locally with the env var overridden; not yet checked against the real deploy).
- [x] Finalize the `legacy-v1` fallback and archival plan: its GitHub Pages workflow is removed, source stays in the repo unbuilt by default.
- [ ] Decide what happens to the already-live GitHub Pages site at `patorsiang.github.io` (leave it, disable Pages in repo Settings, or repoint DNS to the new Vercel deployment) - manual, outside this repo's code.
