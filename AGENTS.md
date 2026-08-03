# Agent Guide

Build the smallest complete change that improves the public onlinesourdough
site. Preserve the existing React, Vite, TanStack Router, GitHub Pages, CNAME,
and repository history unless current evidence requires a deliberate change.

## Canonical context

- `README.md` is the current technical and operational truth.
- `docs/architecture.md` owns application boundaries.
- `docs/delivery.md` owns checks, deployment, verification, and rollback.
- The approved visual source is the latest `onlinesourdough-menu-freedom-lofi`
  artifact set from design task `019f23fd-0fd4-79a1-8cc5-f3f9f2e21abe`.
  Treat that external workbench as read-only.

When historical summaries and the current artifact set disagree, the current
`DESIGN.md`, `README.md`, `index.html`, `about.html`, and selected assets win.

## Lifecycle

1. **Spec:** confirm outcome, owner, boundaries, smallest complete result, and
   verification evidence before a material change.
2. **Build:** implement complete user-visible results in the existing app and
   prove them through focused tests or the real browser interface.
3. **Review:** inspect the diff for intent, correctness, accessibility,
   simplicity, ownership, security, asset hygiene, and recovery.
4. **Ship:** deploy only reviewed work, read the actual GitHub Pages result,
   smoke-test the custom domain, and preserve a rollback commit.

If Review finds an in-scope Critical or Required issue, fix it and rerun the
affected evidence before Ship.

## Engineering boundaries

- Keep `/` and `/about` as thin route entrypoints.
- Keep editable public copy, destinations, and approved asset paths in
  `src/config/site-data.ts`.
- Keep shared shell behavior in `src/components/layout/`.
- Do not add auth, a database, billing, queues, server functions, analytics,
  containers, or another hosting platform without a demonstrated owner.
- Keep secrets and build credentials out of browser code and committed files.
- Use root-relative public paths because the production site owns the custom
  domain root.
- Migrate only approved runtime assets. Do not load archived design studies or
  temporary workbench output.

## Required evidence

Run the repository commands from the lockfile-installed dependency tree:

```bash
npm ci
npm run typecheck
npm run test
npm run build
npm run security:check
```

For a visual or interaction change, also verify the Vite dev server and the
production preview at desktop and mobile widths. Check navigation, hashes,
theme behavior, keyboard behavior, console and network errors, asset loading,
and horizontal overflow.
