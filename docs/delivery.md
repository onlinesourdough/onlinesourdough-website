# Delivery

This repo follows the branch and check model from the SaaS template, adapted for GitHub Pages.

## Branching

- `main`: production branch and GitHub Pages deployment source.
- `dev`: integration branch.
- `feature/<short-name>`: new work branching from `dev`.
- `fix/<short-name>`: bug fixes branching from `dev` unless it is a production hotfix.

Open feature and fix pull requests back into `dev`. Release by opening a pull request from `dev` to `main`.

## Required Checks

Run these before merge:

```bash
npm run typecheck
npm run test
npm run build
```

TDD is required for services, contracts, adapters, bug fixes, and any behavior around external data. It is optional for pure copy and visual layout changes.

## CI

`.github/workflows/ci.yml` runs typecheck, tests, and build for pushes and pull requests targeting `dev` or `main`.

## Deployment

`.github/workflows/deploy.yml` deploys `main` to GitHub Pages and runs on a daily schedule so the public subscriber badge can refresh when `YOUTUBE_API_KEY` is configured.

This app does not use Cloudflare Workers, D1 migrations, Stripe, Auth.js, Resend, or queues, so the template's Cloudflare deploy workflow is intentionally not copied.
