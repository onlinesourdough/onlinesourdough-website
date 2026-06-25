# Architecture

This app uses the SaaS template as an architecture menu, scaled down for a public landing page.

## Product Shape

`onlinesourdough` is a landing/content site. It currently needs:

- React UI
- routed pages for `/` and `/about`
- static site data
- one browser-read public stats contract for `public/stats.json`
- GitHub Pages deployment

It intentionally skips:

- auth and sessions
- Stripe, billing, subscriptions, and paid access
- databases, repositories, D1, migrations, and queues
- server functions, webhooks, and Worker deployment
- product analytics beyond whatever static hosting provides

## Boundaries

```txt
src/
|-- adapters/
|   `-- http/
|-- components/
|   `-- layout/
|-- config/
|-- features/
|   `-- landing/
|       |-- components/
|       `-- hooks/
|-- hooks/
|-- routes/
|-- services/
|-- router.tsx
`-- styles.css
shared/
`-- contracts/
tests/
docs/
```

Responsibilities:

- `src/routes/`: thin TanStack Router route entrypoints.
- `src/components/layout/`: reusable shell, header, and footer.
- `src/features/landing/`: landing-page and about-page UI.
- `src/config/`: static product copy, SEO defaults, links, and offer definitions.
- `src/hooks/`: cross-feature browser behavior such as theme and metadata updates.
- `src/services/`: pure product workflow logic.
- `src/adapters/`: browser or vendor-facing implementation details.
- `shared/contracts/`: framework-free data contracts that cross a boundary.
- `tests/`: focused unit tests for contracts and services.

## Current Dynamic Boundary

The only dynamic boundary is `public/stats.json`.

The browser path is:

```txt
LandingPage
-> useSubscriberBadges
-> fetchStatsContract
-> parseStatsContract
-> buildSubscriberBadges
```

The YouTube API key is only used by `scripts/update-stats.mjs` during build/deploy. It is not shipped to the browser.

## Adding Capabilities

Add a new layer only when the product owns that responsibility:

- Add `shared/contracts` or `shared/schemas` for forms, APIs, webhooks, imports, or vendor payloads.
- Add `src/services` for workflow logic, branching, or reusable product decisions.
- Add `src/adapters` for external services, provider APIs, analytics, or platform bindings.
- Add repositories and migrations only if the app starts owning persistent domain data.
- Add auth, Stripe, Resend, or analytics only when a real workflow requires them.
