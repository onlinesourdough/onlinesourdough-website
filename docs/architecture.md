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
├── features/                landing, About, and Agent Work Review compositions
├── hooks/                   cross-page browser behavior
├── routes/                  thin route and metadata wiring
├── router.tsx               route tree
└── styles.css               approved tokens and responsive presentation
public/
├── assets/                  selected runtime art, logo, and fonts
├── agent-work-review.md     exact pinned canonical runbook bytes
├── CNAME                    custom-domain authority
├── robots.txt
└── sitemap.xml
scripts/
├── agent-work-review-pin*.mjs source pin, local check, and explicit sync
└── prepare-pages.mjs         direct route and fallback preparation
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

The Agent Work Review page is discovery and instruction only. Its copy action
writes one public instruction to the visitor's local clipboard. The site never
reads session history or reports and has no form, submission destination,
analytics, upload, storage, or server function. The review flow has no runtime
dependency on the canonical repository or a submission service.
The canonical Agent Work Review repository owns the runbook; this site owns
only the pinned publication entry points.

## Deliberate non-goals

The application does not own auth, sessions, payments, a database, server
functions, webhooks, queues, analytics, customer data, or a separate
observability platform. GitHub's workflow and Pages status plus public browser
smoke tests are proportionate operational evidence for this static site.

## Routing and assets

TanStack Router owns `/`, `/about`, and `/agent-work-review`. The build script
copies the SPA shell to `dist/about/index.html` and
`dist/agent-work-review/index.html` so direct requests work on Pages, and to
`dist/404.html` for unknown-path fallback. Canonical metadata is replaced for
each direct HTML document. Vite copies `public/agent-work-review.md` directly
to the production root; its local SHA-256 check has no network dependency.

Root-relative public paths are required by the production custom-domain
context. Development and production preview checks must therefore confirm
`/assets/...` responses rather than depending on a local filesystem path.
