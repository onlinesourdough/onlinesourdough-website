---
version: alpha
name: onlinesourdough — source-faithful motion r3
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

The required comparison is two website collections, each with five views: the original frontend, a method illustration, and three character alternatives for the hero. These remain alternatives for owner selection. The receiving repositories are not edited or deployed.

Inputs inspected on 2026-09-10:

- [onlinesourdough](https://onlinesourdough.com/), source revision `4fceeebee9decd524b6b940ad55129d4c0ef5d08`.
- [Resources](https://resources.onlinesourdough.com/), source revision `8bec6ce9aee7492841d6cc4f2a41718b14475949`.
- [Arc'IT AI scope](https://arcitai.com/#scope): Spec, Build, Review, Ship, with business intent, actual work, and handover as the context.
- [Agentic Engineer](https://agentic-engineer.ai/): inspiration for a glyph hero, a constricted particle tube, and an accelerating capability curve with activating fields. New code and owner-specific copy are authored for this exploration.

## Colors

Retain each source project's existing theme variables, warm paper grid, ink, muted brown, borders, and accents. The palette above records the common light direction; the existing source styles remain the exact per-component baseline. Use restrained green for flowing work and active capability fields. Review and Ship begin in a warmer tone and turn green as their bottlenecks open. The original dark theme remains available in the local preview.

## Typography

Use the actual bundled Geist Pixel, Geist Sans, and Geist Mono fonts. Keep the original pixel hero headlines, readable body text, and restrained mono labels. The source styles retain their original responsive sizes. The main method heading uses the existing manifesto heading treatment; Resources' added heading uses the same pixel family at 34px desktop and 29px mobile.

OpenPencil comparison annotations use native text. The page images preserve the actual browser-rendered fonts and illustrations; they are not a replacement font specification.

## Layout

Main baseline: original hero, four illustrated offer cards, complete manifesto, footer. Character alternatives: add the selected character inside the original hero, retaining the existing page content. The method and character alternatives add Gustav’s small portrait and contextual links under the hero copy; the baseline stays unchanged.

Main method alternative: keep the original hero and cards, then use the existing two-column manifesto composition. The original heading is “From business problem to working solution.” Retain the first two original paragraphs on the right, place the tube across the full width below, and retain the original “About the method” link underneath. This is a merged section; it has no second heading or decorative metadata row. The rest of the method remains available on the original About page.

Resources baseline: original heading, Start Here action, video, folder collection, sidebar, and footer. In all four alternatives the actual sidebar starts closed and can be opened with its existing toggle. Closing it removes the sidebar; do not invent a narrow icon rail.

Resources method alternative: hero → video → folders → capability curve → footer. The curve is below all four folders. Its fields occupy the open upper-left area above the curve, then stack above it on mobile. Resources character alternatives add the selected character to the existing hero, with the sidebar initially closed.

The OpenPencil canvas has two distinct rows at y=0 and y=3500. Each row contains 1400px pages at x=0, 1560, 3120, 4680, and 6240, preceded by a collection heading. Page heights follow actual browser content. No pages or collection labels overlap.

## Elevation & Depth

Preserve the original illustrated cards and folders, paper layers, subtle shadows, and window chrome. New diagrams sit directly on the existing page ground. Capability fields use fine rectangular borders and a light green selected fill.

## Shapes

The hero studies are original characters drawn with warm text glyphs and local canvas code. The living mark uses the actual ten-by-seven pixel boule silhouette and score cuts. The dough character softens that bread shape. The starter adds a glass outline, living dough, and rising bubbles. Each has small eyes, blink timing, idle drift, gaze, spring response to the pointer, and a click/tap reaction. The rejected torus remains historical evidence only.

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

Progression: AI assistant → AI coding → Agent workflows → Orchestration → Business freedom. Business freedom is the intended business direction, not a guaranteed autonomous-company endpoint. AIOS is the final field because it gives the business context and ongoing work a home; it is not presented as just another coding tool. This is an illustrative sequence, not a mandatory tool dependency chain. The curve begins almost flat. Hover, focus, or tap a field to change its shape and activate the corresponding checkmarks. Hover waits 220ms before selecting; passing across fields does not immediately reset the curve. The last selected field persists when the pointer leaves. Hovering the graph itself for 220ms grows the complete curve with the same easing and activates all fields; it retains that state after leaving. Clicking, tapping, and keyboard focus select directly. Scrolling does not set progress. Changes settle after a brief easing transition; reduced motion switches directly.

### Hero

Keep the existing hero copy. Compare three characters: the living mark, a little dough, and the starter. The main character area is at most 420×280px, Resources is 260px high, and mobile uses 240px or 235px respectively. The surface contains an accessible button for the click/tap response and separate small Pause and Sound controls. Sound begins off, requires explicit enabling, and uses original short synthesized notes with a cooldown. No reference audio files are used. Offscreen or hidden-tab motion stops; reduced motion produces a still figure and hides the unnecessary pause control.

In the main-site character alternatives, remove the small logo image from the header while retaining the “onlinesourdough” wordmark. The large living mark then has one clear place in the hero. The baseline and method alternative keep the original header mark.

### Personal line and contact cue

Under the main hero copy in the method and character alternatives, show the actual owner-requested GitHub avatar with “Gustav Anderson” and links labeled “Writing & experiments”, “Arc’IT AI”, and “GitHub”. Keep this compact and secondary to the existing promise. The photo source is the personal `gustavonline` profile; the `onlinesourdough` account has a bread-mark avatar.

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

- **Scope and non-goals:** ten comparison views, the method tube, capability curve, and three original character studies, source-faithful baseline renders, local interaction previews, and coherent component copy. No receiving-site implementation, offer changes, deployment, or cross-owner handoff.
- **Review, revision, and acceptance:** owner mode; Review owner Gustav Anderson. This r3 candidate recovers run-0002's rejected fidelity. Supporting technical verification is by Codex; final direction selection and owner PASS remain pending. Receiver acceptance is separate and not requested.
- **Known limitations:** page content in `.op` is raster inside editable frames; edit website text and behavior in the retained source. Motion runs in local HTML, not on the OpenPencil canvas. Capture mode presents deterministic keyframes, replaces the native video widget with its original poster image at the same dimensions, and disables sticky positioning for page assembly. Local previews have no backend or authenticated account workflow. Sound controls were exercised, but audio audibility was not independently listened to by the agent. No actual capacity figure has been supplied. Capability stages are explanatory design copy, not measured outcomes or a claim that every tool is included in Resources.
