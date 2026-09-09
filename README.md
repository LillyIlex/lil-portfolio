# Lil Lloyd-Jones — Portfolio

A single-page portfolio site built with React, TypeScript and Tailwind CSS, showcasing front-end projects, technical approach and experience.

**Live site:** [lillyilex.github.io/lil-portfolio](https://lillyilex.github.io/lil-portfolio/)

## Overview

The site is a fast, statically-deployed showcase covering:

- **Projects** — case studies with screenshots, including a healthcare/pharmacy prescription portal (CloudRx)
- **Approach** — a walkthrough of technical decision-making and architecture
- **Code snippets** — annotated examples of real implementation work
- **Experience & education**
- **About & contact** — including a downloadable CV

Below-the-fold sections are code-split and lazy-mounted as they scroll into view, keeping the initial load light.

## Tech stack

| | |
|---|---|
| **Framework** | React 19 + TypeScript |
| **Build tool** | Vite (Rolldown) |
| **Styling** | Tailwind CSS v4 |
| **UI primitives** | Radix UI, shadcn/ui-style components |
| **Animation** | Framer Motion |
| **Deployment** | GitHub Pages, via GitHub Actions |

## Getting started

\`\`\`bash
# Install dependencies
npm install

# Start the dev server
npm run dev

# Type-check and build for production
npm run build

# Preview the production build locally
npm run preview

# Lint
npm run lint
\`\`\`

Requires Node.js 22+.

## Project structure

\`\`\`
src/
├── components/
│   ├── base/         # Hand-authored building blocks (Button, Title, Paragraph, etc.)
│   ├── layout/        # Page chrome (nav bar, back-to-top)
│   ├── portfolio/      # Page sections (Hero, Projects, About, Contact, ...)
│   └── ui/             # shadcn/ui-generated primitives
├── data/               # Content and project data, kept separate from presentation
├── hooks/
├── lib/
└── App.tsx            # Page composition — assembles all sections
\`\`\`

Content (project copy, experience, skills) lives in `src/data/`, separate from the components that render it, so the site's text can be updated without touching component code.

## Deployment

The site deploys automatically to GitHub Pages on every push to `master` via the workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml): it installs dependencies, runs the production build, and publishes the output.

## License

Personal portfolio — content and copy are not licensed for reuse. 
