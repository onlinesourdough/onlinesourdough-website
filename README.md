# onlinesourdough

Source for [onlinesourdough.com](https://onlinesourdough.com), where Gustav
Anderson shares practical ways to make data and AI useful in everyday work. The site
is a React application built with Vite and published through GitHub Pages.

## Current product

- The October 24 local preview places the selected bread-and-helpers animation
  directly beneath the manifesto heading. The 236 matte tiles, squared eyes,
  stronger travelling wave and Codex/Claude assembly match the selected study.
  Only the upper-right shoulder is unfinished; both helpers collect from sources
  on both sides. A fresh seed varies each visit/replay. Assembly starts when the
  illustration enters view, pauses offscreen/hidden, and leaves the completed loaf
  gently moving. Theme changes and reduced motion are supported. The comparison
  canvas remains available through its explicit development query. This is local
  review work; nothing has been pushed or deployed.
- The October 23 refinement restores a compact homepage: a maximum 800px
  two-column menu, 352px book stages and readable 15px descriptions. The menu
  becomes one column at 700px. The manifesto's sourdough is built from warm
  tiles using Gustav Online's travelling crest, with a restrained mouse response
  and a keyboard/touch wake ripple. It stops offscreen and when the tab is hidden;
  reduced-motion preferences show a still version.
- The current local sourdough preview restores the original production figure
  from `1380149`: its silhouette, eye openings, shading and motion are retained;
  only the small glyphs are replaced with 236 larger tiles. A local comparison
  canvas at `/?bread=compare` shows 531, 236 and 59 tiles with the same silhouette.
  The comparison and size controls are dev-only. The owner rejected the rounded
  loaf in PR 23. This preview is not published. Further deployments require
  explicit owner approval of the concrete preview.
- The October 20 local review removes the experimental project directory and
  separates Geist Pixel brand names from Geist Sans ordinary text. See `DESIGN.md`.
  This revision is not published.
- The October 22 local revision widens the menu, animates the existing scenes,
  adds three hero-copy comparisons and carries the data/context perspective through
  the homepage, About, offer navigation and newsletter. It is ready for review,
  not published. See `DESIGN.md`.
- `/` introduces AI grounded in the customer's business context and the four-book
  menu. Resources and ongoing 1:1 collaboration are the two core paths;
  Content introduces the work and Complete Bake refers to Arc’IT.
- `/fermentary` is the public programme introduction. The video is not filmed yet; an honest still and a button to the
  native programme-details signup are shown. Set the approved YouTube ID in
  `src/config/site-data.ts` when it exists. Both programme CTAs open `/fermentary/details`, in the same site shell.

- `/about` contains Gustav's story, the sourdough analogy, The Onlinesourdough Method, offers, the
  method, Arc’IT AI's factory direction, key facts, and frequently asked questions.
- `/agent-work-review` is a compatibility redirect to the canonical Resources
  page.
- `/agent-work-review.md` is a small compatibility pointer to the canonical
  Resources runbook.
- A shared header provides offer switching, page navigation, and light/dark
  theme control.
- A shared ecosystem footer links to gustavonline and Arc'IT AI, with matching
  family mark/icon sizing and “Part of gustavonline” below the social profiles.
- GitHub Pages serves the static build at `https://onlinesourdough.com`.

The programme’s “More info, terms & pricing” buttons open the native
`/fermentary/details` page. It retains the site’s header, footer, typography,
colours and illustration. Kit is the submission and confirmation-mail provider,
not a hosted customer-facing page. The existing form10082012 receives a public
HTML-form request without an API key or additional backend. Only its explicit
`status: success` acknowledgement shows thanks and redirects to the fixed Notion
brochure after3.5seconds. HTTP failures, invalid responses, consent requirements
and anti-abuse challenges keep the visitor on the form with their email intact.

The existing Kit confirmation email confirms the newsletter subscription and
opens the same brochure. Its owner-authorised live test was verified on22October;
this release’s browser success/error tests use intercepted responses and create
no subscribers or emails. The original programme video remains pending.

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

## License

Original code and documentation are available under the [MIT License](LICENSE).
Third-party code, fonts, copied reference material, and other third-party assets
retain their own licenses and attribution. Brand names, logos, portraits, and
editorial media are not licensed for reuse by this software license.
