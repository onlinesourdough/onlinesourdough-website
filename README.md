# onlinesourdough

Public landing page for the point where business development, software, and
responsible AI-first work meet. The site presents four delivery paths and the
method behind them through a compact low-fi book menu.

## Current product

- `/` contains the promise, four-offer menu, and a short introduction to the
  AI-native way of working and AIOS as a starter.
- `/about` contains Gustav's story, the sourdough analogy, AIOS, offers, the
  method, Arc’IT AI's factory direction, key facts, and frequently asked questions.
- `/agent-work-review` is a compatibility redirect to the canonical Resources
  page.
- `/agent-work-review.md` is a small compatibility pointer to the canonical
  Resources runbook.
- A shared header provides offer switching, page navigation, and light/dark
  theme control.
- A shared ecosystem footer links to gustavonline and Arc'IT AI, with matching
  family mark/icon sizing and “Part of Gustav Online” below the social profiles.
- GitHub Pages serves the static build at `https://onlinesourdough.com`.

The approved design source is the latest
`onlinesourdough-menu-freedom-lofi` artifact set from design task
`019f23fd-0fd4-79a1-8cc5-f3f9f2e21abe`. The external workbench is read-only;
the product repository owns the production implementation. Current design
artifacts override older task summaries when they disagree, including the use
of natural scrolling instead of scroll locking or snap positions.

## Ownership and boundaries

This repository owns one static browser application, its public content and
assets, build checks, Pages workflow, custom-domain configuration, and
rollback instructions. It consumes external YouTube, Resources, email, Arc'IT
AI, and gustavonline destinations through ordinary links.

It does not own authentication, billing, a database, server APIs, background
jobs, customer data, or those external destinations. Add none of those layers
until a real product responsibility requires them.

## Architecture

- `src/routes/` contains thin TanStack Router entrypoints.
- `src/features/landing/` owns the landing and About compositions.
- `src/components/layout/` owns the shared header, offer switcher, and footer.
- `src/config/site-data.ts` is the editable source for copy, links, SEO, and
  approved runtime asset paths.
- `src/styles.css` maps the approved design tokens and responsive behavior.
- `public/assets/` contains only the selected menu art, logo, fonts, and font
  license migrated from the approved design set.
- `scripts/prepare-pages.mjs` creates direct Pages routes, the Agent Work Review
  compatibility redirect, and fallback output.

See [architecture](docs/architecture.md) for boundaries and
[delivery](docs/delivery.md) for CI, deployment, verification, and rollback.

## Development

Node.js 22 is the CI runtime. Install exactly from the lockfile:

```bash
npm ci
npm run dev
```

Vite serves the local site at `http://127.0.0.1:5173` by default.

## Checks

```bash
npm run typecheck
npm run test
npm run build
npm run security:check
```

`npm run build` typechecks, builds the production bundle, and prepares
`dist/about/index.html`, the compatibility redirect at
`dist/agent-work-review/index.html`, `dist/404.html`, and `dist/.nojekyll` for
GitHub Pages. Vite copies the small Markdown compatibility pointer to
`dist/agent-work-review.md`. Root-relative `/assets/...` paths are intentional:
the CNAME makes the custom domain the production root.

## Agent Work Review migration

Agent Work Review is owned by its
[canonical repository](https://github.com/onlinesourdough/Agent-Work-Review),
while Resources owns its public
[entry point](https://resources.onlinesourdough.com/agent-work-review) and
[Markdown runbook](https://resources.onlinesourdough.com/agent-work-review.md).
The main site no longer owns or duplicates that content.

The old main-site URLs remain only as migration aids: the HTML route uses a
static meta refresh plus a client-side fallback, and the old Markdown route
contains a short pointer. GitHub Pages cannot emit an origin-level HTTP 301
from this repository, so both compatibility artifacts must stay small and must
name the Resources destinations explicitly.

## Deployment and recovery

`.github/workflows/ci.yml` runs the quality gates for pull requests and pushes.
`.github/workflows/deploy.yml` builds and deploys `main` to GitHub Pages. The
runtime configuration is public and contains no application secrets.

After deployment, verify the landing and About routes, both Agent Work Review
migration paths, navigation and theme behavior, asset responses, console
errors, and horizontal overflow on the custom domain. The practical rollback
is to revert the release commit on `main`; the resulting workflow rebuilds and
redeploys the previous repository state.
