# Delivery

## Branching

- `main` is the GitHub default and production branch.
- Material work uses a short-lived feature or fix branch from the current
  `main`/integration commit.
- A pull request into `main` provides reviewable CI evidence before production
  deployment.
- A local `dev` branch may be used as a working pointer, but production does
  not depend on an unpushed branch.

## Required checks

Install from the committed lockfile and run:

```bash
npm ci
npm run typecheck
npm run test
npm run agent-work-review:check
npm run build
npm run security:check
```

`npm run agent-work-review:check` deterministically verifies the local
published bytes against the reviewed commit/path/hash pin. Run
`npm run agent-work-review:verify-source` when reviewing a deliberate runbook
sync; that opt-in command fetches the pinned upstream source and requires it to
match both the expected hash and local bytes. Normal builds do not fetch it.

Use focused unit tests for deterministic configuration and route/build rules.
Use the real browser for layout, navigation, hash scrolling, theme, keyboard,
responsive, console, network, and overflow evidence.

## CI and deployment

`.github/workflows/ci.yml` runs required checks for pull requests and relevant
branch pushes. `.github/workflows/deploy.yml` deploys reviewed `main` commits
to the `github-pages` environment using the committed lockfile and `dist/`
artifact.

Deployment succeeds only when the Pages job reports success. Then smoke-test:

- `https://onlinesourdough.com/`
- `https://onlinesourdough.com/about/`
- `https://onlinesourdough.com/agent-work-review/`
- `https://onlinesourdough.com/agent-work-review.md`
- the selected logo, font, and four menu-image responses
- Menu/About hashes and back navigation
- Offers open, outside-click, and Escape behavior
- Agent Work Review keyboard flow and copy instruction behavior
- exact production Markdown SHA-256 and no collection or submission behavior
- light/dark theme and mobile layout
- console, failed requests, and horizontal overflow

## Recovery

The release unit is one Git commit and one Pages artifact. If production
verification fails:

1. stop promotion and capture the failing run and public symptom;
2. revert the release commit on `main` without rewriting history;
3. let the Pages workflow deploy that revert;
4. repeat both route and asset smoke tests;
5. repair forward on a new branch.

Static content has no migration or persistent application state, so the
recovery point is the previous commit and recovery time is one successful
Pages workflow plus DNS/CDN propagation.
