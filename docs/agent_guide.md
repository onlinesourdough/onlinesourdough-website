# Working Guide

The root `AGENTS.md` defines the project lifecycle and required evidence.

## Working order

1. Read `AGENTS.md` and `README.md`.
2. Read `docs/architecture.md` and `docs/delivery.md`.
3. Treat `src/config/site-data.ts` as the editable public content and asset
   source.
4. Keep routes thin and keep shared shell behavior in
   `src/components/layout/`.
5. Preserve GitHub Pages, `public/CNAME`, direct `/about` output, and
   root-relative public assets.
6. Use Spec, Build, Review, and Ship checkpoints for material work.
7. Run all required checks and browser evidence before finishing.

## Review focus

- The approved landing and About compositions remain intact.
- Header, Offers switcher, theme, and footer stay shared across routes.
- Menu options preserve direct, keyboard-accessible destinations.
- Mobile keeps natural scrolling and has no horizontal overflow.
- Reduced-motion users are not forced through movement.
- Runtime code loads only selected assets from `public/assets/`.
- No external workspace path or local machine dependency is required at
  runtime or in CI.
- Deployment remains reproducible from the committed lockfile and workflow.
