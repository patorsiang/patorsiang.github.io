# Vercel Deployment

This document outlines the deployment setup for the Patorsiang Portfolio Platform on Vercel.

## Status

- **Development Deployment**: Active
- **Production Deployment**: Pending final cutover (current production remains on GitHub Pages via `legacy-v1`)

## Deployment URLs

- **Development URL**: `https://patorsiang-portfolio-web.vercel.app` (Placeholder)
- **Production URL**: Pending final cutover

## App Deployed

- **Project**: `portfolio-web`
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

### Staging / Preview (`deploy-staging.yml`)

- **Trigger**: Push to `feat/portfolio-platform-2026` or Pull Request to `main`.
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

| Variable                       | Scope      | Required    | Description                                                       |
| :----------------------------- | :--------- | :---------- | :---------------------------------------------------------------- |
| `NEXT_PUBLIC_APP_ENV`          | All        | Yes         | Set to `development`, `preview`, or `production`.                 |
| `NEXT_PUBLIC_SITE_URL`         | All        | Recommended | The canonical URL for SEO (e.g., `https://patorsiang.github.io`). |
| `NEW_RELIC_LICENSE_KEY`        | Production | Optional    | Private license key for New Relic.                                |
| `NEXT_PUBLIC_NEW_RELIC_APP_ID` | Production | Optional    | Public application ID for New Relic Browser.                      |

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

- [ ] Choose the final canonical domain.
- [ ] Configure production-specific environment variables in Vercel.
- [ ] Update `NEXT_PUBLIC_SITE_URL` to the final domain.
- [ ] Verify SEO and Open Graph metadata on the final domain.
- [ ] Finalize the `legacy-v1` fallback and archival plan.
