# Architecture

## Product shape

`onlinesourdough` is one static public Application built with TypeScript,
React, Vite, and TanStack Router. Existing ownership and a working system are
more valuable than replacing the stack.

The deployable unit is the `dist/` directory produced by `npm run build` and
uploaded by GitHub Actions to GitHub Pages. `public/CNAME` assigns
`onlinesourdough.com` as the production root.

## Responsibilities

```text
src/
├── components/layout/       shared shell and shell interactions
├── config/                  public copy, destinations, SEO, asset manifest
├── features/                landing and About compositions
├── hooks/                   cross-page browser behavior
├── routes/                  thin route and metadata wiring
├── router.tsx               route tree
└── styles.css               approved tokens and responsive presentation
public/
├── assets/                  selected runtime art, logo, and fonts
├── agent-work-review.md     compatibility pointer to Resources
├── CNAME                    custom-domain authority
├── robots.txt
└── sitemap.xml
scripts/
└── prepare-pages.mjs         direct routes, external redirect, and fallback preparation
```

`src/config/site-data.ts` is the one editable source for public copy, links,
SEO values, and runtime asset paths. Components own rendering and interaction;
route files own route metadata wiring only.

## Interfaces and trust boundaries

- The browser interface is public and contains no privileged state.
- Offer and ecosystem destinations are ordinary external links or `mailto:`.
- Static assets are same-origin files under `/assets/`.
- GitHub Actions has read access to repository contents and the Pages
  permissions required for deployment. No runtime credential crosses into the
  browser bundle.

External destinations own their content and availability. A failed external
destination must not prevent this site from rendering.

Resources owns the Agent Work Review public page and Markdown distribution.
This site keeps only compatibility paths: a static HTML meta refresh with a
client-side redirect fallback, and a small Markdown pointer. Neither path reads
session history or reports, submits data, or duplicates the review method.

## Deliberate non-goals

The application does not own auth, sessions, payments, a database, server
functions, webhooks, queues, analytics, customer data, or a separate
observability platform. GitHub's workflow and Pages status plus public browser
smoke tests are proportionate operational evidence for this static site.

## Routing and assets

TanStack Router owns `/`, `/about`, and the `/agent-work-review` compatibility
route. The build script copies the SPA shell to `dist/about/index.html`, writes
the Resources canonical metadata and meta refresh into
`dist/agent-work-review/index.html`, and copies the shell to `dist/404.html`
for unknown-path fallback. Vite copies the small
`public/agent-work-review.md` migration pointer directly to the production
root.

Root-relative public paths are required by the production custom-domain
context. Development and production preview checks must therefore confirm
`/assets/...` responses rather than depending on a local filesystem path.
