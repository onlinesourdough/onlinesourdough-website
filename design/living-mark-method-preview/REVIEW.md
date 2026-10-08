# Production approval and final checks — 24 September 2026

Gustav explicitly approved deploying both sites after removing the offer label
and equalizing divider spacing. His final hero-copy request is included: the
same approach is offered through Resources/AIOS, The Fermentary and Complete Bake.
The label is absent and rendered gaps on both sides of both dividers measure
64px at 1400px and 44px at 320px, with no horizontal overflow. The brown palette
is changed; original glyph spacing, weight and opacity remain intact.

Build/typecheck, 17 tests, security threshold, diff check and PR CI passed.
Reviewed commit: 4514634d345cc028fd34dbc8f7d4c10ada1931f5.
PR: https://github.com/gustavonline/onlinesourdough/pull/9.
Merged production commit: 43238db5d2b9232d92f462cd9131931a6732518f.
Its tree matches the reviewed commit. Previous production commit for recovery:
4abfbc5aff4275186a6b8eefeb61aa8a0d2ded17; use a normal revert if necessary.
Public payload contains only website source and approved runtime assets; local
review/provenance, raw media, browser outputs and proxy config are excluded.
Publish safety passed for the explicitly authorized GitHub/production scope.
Production deployment and live browser readback passed on 24 September 2026.
GitHub Pages run 36040626117 and main CI run 36040626378 both succeeded at the
merged production commit. The deployed root, About, portrait and Agent Work
Review pointer respond correctly; the pointer redirects to the Resources review.
Browser checks confirm the approved hero copy including Complete Bake, removed
label, living mark on the left, intact manifesto, Offers keyboard dismissal,
light/dark, reduced motion and no settled horizontal overflow at 1400px or 320px.
The portrait loads at its expected 460px source width. No page errors observed.
Visually inspected production evidence: output/playwright/main-production-desktop.png
and main-production-mobile.png. Both production assets and reviewed tree match.
An early measurement before fonts/image loading reported transient overflow and
an unloaded portrait; settled live checks were 320/320 and fully loaded.
No rollback was needed. The approved production delivery is complete.

## Earlier reviews

# Mirrored hero — 24 September 2026

At Gustav's request, the living mark is now on the left and hero text on the
right. On mobile the mark is beside the heading; the paragraph retains its
full-width row below. Typecheck/build, all 17 tests and diff check pass.
Browser checks in dev and production preview at 1400px and 320px confirm that
the mark is left of the heading, remains animated and causes no overflow.
Current evidence: output/playwright/main-bread-left-1400.png and
main-bread-left-320.png. No production deployment.

## Earlier evidence (superseded placement)

# Updated local review — 24 September 2026

Latest revision: the living mark sits to the right of the heading/copy on desktop,
and beside the heading above full-width copy on mobile. Audio and the two
controls are fully removed. Browser verification on dev and production preview
confirms continued animation, actual cut-out eyes, no controls, preserved copy,
reduced-motion stillness, themes and no 320px horizontal overflow. Build,
typecheck, all 17 tests, security threshold and diff check pass. Current proof:
`output/playwright/main-side-logo-desktop.png`, `main-side-logo-mobile.png`,
`main-side-logo-mobile-hero.png` and `main-side-logo-dark.png`.

Review by the implementing agent; ready for Gustav’s local review, with no
publication performed. SHA-256 over DESIGN and changed implementation paths:
`726220336989aa32b2772ea3349c84560ad4de88eb600111e042def699b6c14e`.

## Earlier review (superseded for the interactions above)

# Local review — 24 September 2026

Result: ready for Gustav's local review at http://127.0.0.1:4177/.
No deployment or publication was performed.

The final Main contains the living glyph mark, current four offers, all four
current manifesto paragraphs, the requested new manifesto title, About link
under the copy and portrait in the existing footer link. The bottom particle
animation was removed following Gustav's final correction. Its component,
stylesheet and screenshot were sent to the named Arcit AI task; the receiving
task's integration is outside this preview.

Validation completed from the installed lockfile tree: typecheck, 17 tests,
production build and 17 Pages artifact checks. Security check passes its high
severity threshold; two pre-existing moderate development-tool advisories
remain. No dependencies changed. Diff whitespace check passes.

Browser checks covered dev (5177) and production preview (4177), desktop and
320/390px mobile, light/dark, navigation, Offers menu, About route and assets.
Pause/resume changes the animation state. Eye holes omit actual glyphs. Sound
opt-in starts a running AudioContext and emits oscillator notes; muting stops
subsequent pointer notes. Reduced motion holds the canvas still. Theme and
resize redraw were checked; captures taken before redraw settled were replaced
with captures after UI state and canvas dimensions settled. The 320px footer
overflow found during review was fixed and rechecked at scrollWidth 320.

Final DOM readback confirms no bottom animation, the living mark still present,
four manifesto paragraphs, the exact new title and no horizontal overflow.
No browser page errors were observed. A Canvas2D diagnostic came only from
repeated pixel readbacks used in the test, not from normal application use.

Current evidence under `output/playwright/`: `main-final-desktop.png`,
`main-mobile-320.png`, `main-dark-mobile-320.png`, `main-dark-desktop.png`.
Older images in the same ignored output directory may show the superseded flow.
