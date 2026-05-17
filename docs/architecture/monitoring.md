# Monitoring

This monorepo is prepared for future monitoring but does not include real credentials.

## Planned Tools

- New Relic for application monitoring and production health signals.
- Vercel Analytics or Web Vitals for frontend performance metrics.
- GitHub Actions checks for build, lint, typecheck, and formatting health.

## Environment Placeholders

Use `.env.example` files for names only:

```env
NEW_RELIC_LICENSE_KEY=
NEXT_PUBLIC_NEW_RELIC_APP_ID=
NEXT_PUBLIC_APP_ENV=local
```

Real values belong in GitHub Actions secrets, Vercel environment variables, or New Relic account settings.
