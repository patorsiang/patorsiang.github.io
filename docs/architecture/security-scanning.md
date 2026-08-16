# Security Scanning

This repository includes security scanning foundations but no real tokens.

## Snyk

Snyk can be used later for dependency vulnerability scanning and remediation tracking.

Do not commit `SNYK_TOKEN`. Store real tokens in GitHub Actions secrets or Snyk organization settings.

## Dependabot

`.github/dependabot.yml` is configured for:

- GitHub Actions updates
- npm/Bun workspace dependency updates

## Dependency Audit

Future CI can add Bun or npm audit checks once the expected policy is defined.

## Secrets Scanning

Real secrets must not be committed. Use `.env.example` files for names only and configure real values in:

- GitHub Actions secrets
- Vercel project environment variables
- New Relic account settings
- SonarCloud/SonarQube project settings
- Snyk organization settings
