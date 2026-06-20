# onlinesourdough

Sourdough-inspired landing page for IT and software architecture, built with Vite and React.

## Editing Site Data

- `src/site-data.ts` exports one `siteData` object with editable site copy, SEO metadata, links, footer text, and offer card/modal content.
- `src/main.tsx` renders the page from that data and should only need changes for layout or behavior.
- `index.html` contains static fallback metadata. Runtime metadata is applied from `src/site-data.ts`.

## Subscriber Counter

- The YouTube subscriber badge is rendered from `public/stats.json`.
- `npm run build` runs `scripts/update-stats.mjs` before building.
- Set `YOUTUBE_API_KEY` in GitHub Actions secrets to update the count during deployment.
- GitHub Actions runs on pushes, manual dispatches, and once per day to keep the count fresh.
- The API key is not exposed to the browser. If the secret is missing, the badge is simply hidden.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The build also prepares GitHub Pages direct routes by writing `dist/about/index.html`, `dist/404.html`, and `.nojekyll`.

## Deployment

GitHub Pages deployment is configured in `.github/workflows/deploy.yml`. The repo includes `public/CNAME` for `onlinesourdough.com`.
