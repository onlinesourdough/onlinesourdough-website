# onlinesourdough

Sourdough-inspired landing page for IT and software architecture, built with Vite, React, and TanStack Router.

This app follows the architecture rules from `/Users/gustavanderson/Downloads/saas-template`, scaled down for a static landing page. It keeps routes, feature UI, shared contracts, services, and adapters separate without adding SaaS-only capabilities such as auth, billing, databases, dashboards, queues, or paid access.

## Editing Site Data

- `src/config/site-data.ts` exports one `siteData` object with editable site copy, SEO metadata, links, footer text, and offer card/modal content.
- `src/routes/` contains thin route entrypoints for `/` and `/about`.
- `src/features/landing/` owns landing-page and about-page UI.
- `index.html` contains static fallback metadata. Runtime metadata is applied from route components.

## Subscriber Counter

- The YouTube subscriber badge is rendered from `public/stats.json`.
- Browser reads go through `src/adapters/http/stats-api.ts`.
- Stats parsing is kept in `shared/contracts/stats.ts`.
- Badge formatting/mapping is kept in `src/services/subscriber-badges.ts`.
- `npm run build` runs `scripts/update-stats.mjs` before building.
- Set `YOUTUBE_API_KEY` in GitHub Actions secrets to update the count during deployment.
- GitHub Actions runs on pushes, manual dispatches, and once per day to keep the count fresh.
- The API key is not exposed to the browser. If the secret is missing, the badge is simply hidden.

## Development

```bash
npm install
npm run dev
```

## Checks

```bash
npm run typecheck
npm run test
npm run build
```

## Build

```bash
npm run build
```

The build also prepares GitHub Pages direct routes by writing `dist/about/index.html`, `dist/404.html`, and `.nojekyll`.

## Deployment

GitHub Pages deployment is configured in `.github/workflows/deploy.yml`. CI for `dev` and `main` is configured in `.github/workflows/ci.yml`. The repo includes `public/CNAME` for `onlinesourdough.com`.
