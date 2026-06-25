# Agent Guide

Use `/Users/gustavanderson/Downloads/saas-template` as the source template, then apply only the capabilities this landing page needs.

## Working Order

1. Read `README.md`.
2. Read `docs/architecture.md`.
3. Read `docs/delivery.md`.
4. Keep routes thin and put UI in `src/features/landing/components`.
5. Keep external/browser data boundaries behind `shared/contracts`, `src/adapters`, and `src/services`.
6. Do not add auth, billing, databases, migrations, queues, dashboards, or paid-access logic unless the product explicitly needs them.
7. Run typecheck, tests, and build before finishing.

## Current Checks

```bash
npm run typecheck
npm run test
npm run build
```

## Review Checklist

- Route files only wire metadata/layout to feature components.
- Components do not import provider SDKs or Node-only code.
- `shared/` has no React, Vite, browser, or vendor imports.
- External JSON is parsed at the contract boundary.
- Services are pure enough to unit test.
- Deployment remains GitHub Pages unless infrastructure changes deliberately.
