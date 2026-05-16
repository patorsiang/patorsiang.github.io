# Napatchol Thaipanich Portfolio

Professional portfolio website for Napatchol "Pat" Thaipanich, a software developer focused on practical, product-minded engineering across front-end development, fintech/govtech systems, AI projects, cybersecurity learning, and interactive web experiences.

The site presents work experience, education, selected projects, contact links, downloadable CV variants, and showcase pages in a multilingual portfolio format.

## Overview

This repository contains the source code for `patorsiang.github.io`, my personal portfolio website. It is built as a static-export Next.js application with localized content, responsive UI, PWA support, and portfolio data stored in structured TypeScript and JSON files.

The website is intended to be more than a digital resume. It acts as a living professional profile that connects my software engineering background with selected academic, product, AI, cybersecurity, and creative coding work.

## Purpose

The portfolio is designed to:

- Present my professional identity clearly to recruiters, engineering teams, collaborators, and clients.
- Highlight real-world front-end and product engineering experience.
- Connect selected projects to broader interests in fintech, govtech, cybersecurity, AI, and interactive systems.
- Provide a maintained place for contact links, project links, CV downloads, and future portfolio content.
- Support multilingual communication for audiences across Thailand, the UK, Korea, and international teams.

## Tech Stack

- **Framework:** Next.js 14 with the App Router
- **Language:** TypeScript
- **UI:** React 18
- **Styling:** Tailwind CSS and global CSS
- **Internationalization:** next-intl
- **Static output:** Next.js static export
- **PWA:** next-pwa with generated service worker files
- **PDF generation:** pdfjs for CV generation
- **Game/showcase support:** kaboom
- **Icons:** react-icons

## Project Structure

```text
src/
  app/                     Next.js app routes, layouts, metadata, sitemap, robots, and API route code
  components/              Shared UI components and page-level portfolio sections
  components/page/         Home, about, maintenance, and showcase page components
  data/profile/            Structured profile content used by the portfolio and CV generation
  data/types/              TypeScript types for profile data
  utils/                   Dictionary, routing, game, and helper utilities
  constants/               Shared UI constants

messages/                  Localized UI messages
public/
  assets/                  Portfolio documents, certificates, transcripts, and showcase assets
  screenshots/             Device screenshots for portfolio presentation
  imgs/                    Avatar, QR code, and general images
  fonts/                   Local font files used by the site and generated documents
```

Key routes include:

- `/` - root entry point
- `/[locale]` - localized home page
- `/[locale]/about` - professional background, education, awards, activities, and skills
- `/[locale]/showcases` - selected portfolio showcases
- `/[locale]/showcases/2d-game-portfolio` - interactive 2D portfolio showcase
- `/api/cv/[type]` - generated CV variants

## Local Development

Install dependencies:

```bash
yarn install
```

Start the development server:

```bash
yarn dev
```

Open the local site:

```text
http://localhost:3000
```

Useful commands:

```bash
yarn dev      # Start local development
yarn build    # Build the static export
yarn start    # Start the production server where applicable
yarn lint     # Run Next.js linting
```

## Deployment

The app is configured for static export through `next.config.js`:

```js
output: "export"
```

This makes the site suitable for static hosting targets such as GitHub Pages or Vercel static deployments. The production build should be generated with:

```bash
yarn build
```

Deployment notes:

- Keep public portfolio assets in `public/`.
- Keep profile content updates in `src/data/profile/` and `messages/`.
- Verify localized routes after content changes.
- Check generated CV routes when profile data or font assets change.
- Confirm PWA assets and service worker output after production builds.

## Portfolio Content Strategy

The portfolio should prioritize clarity over quantity. The strongest content should help visitors quickly understand what I can build, how I think, and where I can contribute.

Current content priorities:

- **Professional positioning:** Front-end and product-focused software developer with real-world systems experience.
- **Work experience:** Government financial systems, privacy platforms, dashboards, internal tools, and freelance client work.
- **Academic projects:** MSc Advanced Computer Science work, including AI, IoT, cybersecurity, and blockchain-related projects.
- **Showcase projects:** Portfolio projects that can demonstrate product thinking, engineering quality, and visual/interactive craft.
- **Multilingual presentation:** English-first content with support for Thai and Korean audiences.
- **CV variants:** Role-specific CV outputs for software engineering, cybersecurity, and machine learning opportunities.

Recommended portfolio emphasis:

1. Lead with software engineering and product delivery.
2. Use selected projects to support focus areas: AI, cybersecurity, fintech, govtech, and interactive web.
3. Keep project descriptions concise, outcome-oriented, and connected to skills.
4. Add screenshots or demos where they help reviewers understand the work quickly.
5. Keep older coursework or practice work secondary unless it supports a current career direction.

## Future Improvements

- Add project case studies for the strongest portfolio projects.
- Improve screenshots and visual summaries for selected work.
- Add clearer links from showcase pages to source repositories and live demos.
- Add a dedicated writing or notes section connected to public learning content.
- Expand accessibility checks across localized pages.
- Add automated checks for build, linting, and broken internal links.
- Review generated CV output for layout consistency across role variants.
- Add metadata improvements for social sharing and search snippets.
