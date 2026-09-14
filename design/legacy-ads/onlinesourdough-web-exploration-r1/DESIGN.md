---
version: alpha
name: onlinesourdough — combined websites r5
colors:
  primary: "#2B1B12"
  secondary: "#806C5C"
  tertiary: "#B86F36"
  background: "#F8F2E8"
  surface: "#FFFDF7"
  border: "#E5D7C6"
  positive: "#54765A"
typography:
  h1:
    fontFamily: Geist Pixel
    fontSize: 62px
    fontWeight: 400
    lineHeight: 1.01
  body:
    fontFamily: Geist Sans
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.62
  label:
    fontFamily: Geist Mono
    fontSize: 11px
    fontWeight: 400
    lineHeight: 1.4
spacing:
  xs: 8px
  sm: 16px
  md: 24px
  lg: 48px
  xl: 76px
rounded:
  sm: 4px
  md: 10px
---

# onlinesourdough — familiar websites with useful motion

## Overview

Preserve the actual visual identity of both websites and explore a small number of additions. The original code and public assets establish the baseline. The first reconstruction was rejected because it replaced the typography, illustrations, and layout with approximations. This revision explicitly corrects that failure.

The current revision adds three refined views above the ten retained comparison pages: Main Logo + Metode, Resources Metode, and Resources Video first. The receiving repositories remain read-only inputs. The older rows are historical comparison snapshots.

Inputs inspected on 2026-09-10:

- [onlinesourdough](https://onlinesourdough.com/), source revision `4fceeebee9decd524b6b940ad55129d4c0ef5d08`.
- [Resources](https://resources.onlinesourdough.com/), source revision `8bec6ce9aee7492841d6cc4f2a41718b14475949`.
- [Arc'IT AI scope](https://arcitai.com/#scope): Spec, Build, Review, Ship, with business intent, actual work, and handover as the context.
- [Agentic Engineer](https://agentic-engineer.ai/): inspiration for a glyph hero, a constricted particle tube, and an accelerating capability curve with activating fields. New code and owner-specific copy are authored for this exploration.

## Colors

Retain each source project's existing theme variables, warm paper grid, ink, muted brown, borders, and accents. The palette above records the common light direction; the existing source styles remain the exact per-component baseline. Use restrained green for flowing work and active capability fields. Review and Ship begin in a warmer tone and turn green as their bottlenecks open. The original dark theme remains available in the local preview.

## Typography

Use the actual bundled Geist Pixel, Geist Sans, and Geist Mono fonts. Keep the original pixel hero headlines, readable body text, and restrained mono labels. The source styles retain their original responsive sizes. The main method heading uses the existing manifesto heading treatment; Resources’ revised method heading uses the same pixel family at 38px desktop and 30px mobile. Body text is 15px on desktop and 14px on mobile; method stage labels become a 12px list on narrow screens.

OpenPencil comparison annotations use native text. The page images preserve the actual browser-rendered fonts and illustrations; they are not a replacement font specification.

## Layout

Main baseline: original hero, four illustrated offer cards, complete manifesto, footer. Character alternatives: add the selected character inside the original hero, retaining the existing page content. The method and character alternatives place Gustav’s portrait and name in the footer; the hero contains no personal link row. The baseline stays unchanged.

Main method alternative: keep the original hero and cards, then use the existing two-column manifesto composition. The original heading is “From business problem to working solution.” Retain the first two original paragraphs on the right with “About the method” immediately beneath them in that same column, then place the tube across the full width below. This is a merged section; it has no second heading or decorative metadata row. The rest of the method remains available on the original About page.

Resources baseline: original heading, Start Here action, video, folder collection, sidebar, and footer. In all four alternatives the actual sidebar starts closed and can be opened with its existing toggle. Closing it removes the sidebar; do not invent a narrow icon rail.

Resources method alternative: hero → video → folders → capability curve → footer. The curve is below all four folders. Its fields occupy the open upper-left area above the curve, then stack above it on mobile. Resources character alternatives add the selected character to the existing hero, with the sidebar initially closed.

The canvas preserves the historical rows at y=0 and y=3500. The three revised 1400px pages sit above them at x=0, 1560 and 3120, y=-3300, with their heading at y=-3540. Sixteen roots contain thirteen pages and three collection headings. Page heights follow browser content; no roots overlap.

The combined main page uses a 1080px content width, a 244px character area, 64px after the hero, 38px between the card rows, and an 82px gap before the manifesto. The manifesto has 64px top padding and a 40px row gap before the tube. On mobile these spaces reduce and the method stacks naturally.

Resources Metode aligns video, folders, and method to an 840px inner width. The curve’s fields sit above its shallow left side; all five stages remain visible. The additional video-first version removes the visible hero heading, paragraph, and CTA row. Its 920px video begins directly below the navigation and leads to the four folders and then the method. An accessible page heading remains. Both variants keep native video controls in the live preview; the supplied media is the existing six-second motion preview, not a newly produced sales video. The old decorative video window bar is removed in these refined versions.

## Elevation & Depth

Preserve the original illustrated cards and folders, paper layers, and subtle shadows. The refined Resources player uses one light border and an 8px corner radius. New diagrams sit directly on the existing page ground. Capability fields use fine rectangular borders and a light green selected fill.

## Shapes

The hero studies are original characters drawn with warm text glyphs and local canvas code. The living mark retains the outer ten-by-seven pixel boule silhouette but fills its internal block gutters and decorative crust gaps. The static website logo retains its original crust detail. The dough character softens that bread shape and has no score cuts. These continuous glyph bodies make the two eye openings immediately recognizable. The starter adds a glass outline, living dough, and rising bubbles. The eyes are openings formed by omitting glyphs from the existing field. No eye whites, outlines, or pupils are painted over the body. The openings have a 16px horizontal radius and 21px open vertical radius in canvas coordinates; they move with the gaze and narrow during a blink. Each character retains idle drift, spring response to the pointer, and a click/tap reaction. The rejected torus remains historical evidence only.

The method tube consists of two continuous walls. It narrows around Review and Ship and interpolates to parallel walls as those stages open. One persistent set of 96 square particles travels through it. Queues contain those same particles, with finite releases; no separate decorative pile is superimposed.

The Resources curve changes geometry and green fill as capability fields activate. Its square points and checkmarks echo the existing pixel identity. It is an illustrative progression, without a quantitative axis or claimed growth rate.

## Components

### Main method

Use the original two opening manifesto paragraphs verbatim. The visible diagram labels are Spec, Build, Review, and Ship, with small animated stage bars. No invented performance numbers or promises. Retain the existing About destination `/about`.

Hover over Review to open that bottleneck while Ship remains constrained. Move to Ship to open both. Keyboard focus opens the full flow; pressing or tapping pins/releases that comparison. The walls remain visible in every state. A short initial run makes the queues visible; further motion follows interaction. Offscreen and hidden-tab work stops. Reduced motion keeps a static, controllable diagram.

### Resources capability curve

Heading: “From one useful change to more business freedom.”

Body: “Use the method and resources to solve one real business problem. Build on what works, with more of the routine handled by systems you understand and own.”

Fields: ChatGPT; Skills; MCPs; Workflows; Agents; Background agents; Orchestration; AIOS. These are exploratory examples that change the illustration, not an inventory of purchased inclusions or a certification claim.

Progression: AI assistant → AI coding → Agent workflows → Orchestration → Business freedom. Business freedom is the intended business direction, not a guaranteed autonomous-company endpoint. AIOS is the final field because it gives the business context and ongoing work a home; it is not presented as just another coding tool. This is an illustrative sequence, not a mandatory tool dependency chain. The curve begins almost flat. Hover, focus, or tap a field to change its shape and activate the corresponding checkmarks. Hover waits 180ms before selecting; passing across fields does not immediately reset the curve. The last selected field persists when the pointer leaves. Hovering the graph itself for 180ms grows the complete curve with the same easing and activates all fields; it retains that state after leaving. Clicking, tapping, and keyboard focus select directly. Scrolling does not set progress. Changes settle after a brief easing transition; reduced motion switches directly.

### Hero

Keep the existing hero copy. The owner prefers the living mark; retain the little dough and starter as existing comparisons. The existing character alternatives keep their original sizes. The combined main uses a 244px area with a 420px maximum field width, reducing to 212px on mobile. The surface contains an accessible button for the click/tap response and separate small Pause and Sound controls. Sound begins off. The control reads “Enable sound” and immediately plays a confirmation note when enabled. Moving through the figure produces short, original triangle-wave notes whose pitch varies gently with horizontal position, with a 95ms minimum spacing. Click/tap produces a slightly stronger response. Sound remains independently controllable when animation is paused or reduced. Muting stops new notes. No reference audio files are used. Offscreen or hidden-tab motion stops; reduced motion produces a still figure and hides the unnecessary pause control.

In the main-site character alternatives, remove the small logo image from the header while retaining the “onlinesourdough” wordmark. The large living mark then has one clear place in the hero. The baseline and earlier method alternative keep the original header mark. The combined page uses the wordmark-only header, with the large living mark above the hero headline.

### Personal footer and contact cue

In the main footer for the method and character alternatives, show the actual personal GitHub portrait at 44×44px beside “Built by” and “Gustav Anderson ↗”. Photo and name form one link to `https://gustavonline.com`. Retain the existing Arc’IT AI and organization GitHub links beside this personal destination; remove the duplicate plain Gustav Online link. Use the footer’s light type, stack the group on mobile, and preserve a visible keyboard focus ring. The hero has no portrait or extra link row. The photo source is the personal `gustavonline` profile; the `onlinesourdough` account has a bread-mark avatar. The reference’s personal links support specific experience claims, so no unsupported equivalent credentials are introduced here.

The desktop header adds a small green dot and “Work with me ↗”, linked to the existing menu. This is a contact route appropriate to the multiple-offer site. It does not claim “2 slots open” or another unverified capacity number. Hide that extra cue on narrow screens to preserve the existing navigation. No scarcity or availability claim is inferred.

## Do's and Don'ts

- Preserve the original website typography, imagery, navigation, video, and offer/folder structures.
- Make motion explain the transition and keep every required label readable without motion.
- Use the existing business language and retain the user's requested simple composition.
- Keep no more than one method illustration on each website.
- Keep the Resources curve below the folders and independent of scroll progress.
- Keep source rights and revisions in the evidence; do not copy the competitor's code or commercial claims.
- Do not represent comparison-frame text as fully editable website text in OpenPencil.
- Do not treat this local exploration as a production change or accepted receiving snapshot.

## Portable direction and ownership

This `DESIGN.md` is the canonical visual direction for the selected exploration. The local previews and OpenPencil source are referenced companions.

- **Scope and non-goals:** three refined views plus ten retained historical comparison views, the method tube, capability curve, and three original character studies, source-faithful baseline renders, local interaction previews, and coherent component copy. No receiving-site implementation, offer changes, deployment, or cross-owner handoff.
- **Review, revision, and acceptance:** owner mode; Review owner Gustav Anderson. This r5 candidate combines the preferred living mark and method, improves spacing and the Resources curve, and adds a video-first Resources landing. The prior eye, sound, and footer decisions remain in force. Supporting technical verification is by Codex; final direction selection and owner PASS remain pending. Receiver acceptance is separate and not requested.
- **Known limitations:** page content in `.op` is raster inside editable frames; edit website text and behavior in the retained source. Motion runs in local HTML, not on the OpenPencil canvas. Capture mode presents deterministic keyframes, replaces the native video widget with its original poster image at the same dimensions, and disables sticky positioning for page assembly. Local previews have no backend or authenticated account workflow. Browser Web Audio events verify the immediate confirmation, hover notes, a running audio context, the connection to AudioDestination, and silence after muting. Actual hardware speaker output was not independently listened to by the agent. No actual capacity figure has been supplied. Capability stages are explanatory design copy, not measured outcomes or a claim that every tool is included in Resources.

## Current companion and reference study

Use `openpencil/onlinesourdough-design-map-r5-final.op`, `openpencil/exports-r5-final/`, and the three links at the top of `index.html`. The HTML/CSS extraction from the observed live Agentic Engineer page is retained under `runs/run-0005/reference/`, with its source URL and original bundle manifest in `reference-extract.json`. The study confirmed the narrow content column, generous section rhythm, restrained field controls, and shared space between fields and curve. Our components and curve code remain independently authored.

The OpenPencil web runtime is the already verified v0.8.4 extraction retained from r4. The installed AIOS helper resolved from 0.10.0 to 0.10.1 during this run; the native runtime release did not change. A fresh native file start reopened the saved candidate. The helper’s 2000ms export ceiling was too short for sixteen frames, so a bounded invocation of the same pinned native CLI produced and validated the sixteen PNGs.
