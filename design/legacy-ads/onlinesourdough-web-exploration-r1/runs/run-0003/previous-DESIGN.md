---
version: alpha
name: onlinesourdough — web exploration r1
colors:
  primary: "#29251F"
  secondary: "#686259"
  tertiary: "#8C492B"
  background: "#F6F2E9"
  surface: "#FFFCF5"
  border: "#D8D0C2"
  positive: "#526B49"
typography:
  h1:
    fontFamily: Inter
    fontSize: 56px
    fontWeight: 600
    lineHeight: 1.08
  body:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: IBM Plex Mono
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.4
spacing:
  xs: 8px
  sm: 16px
  md: 24px
  lg: 48px
  xl: 96px
rounded:
  sm: 4px
  md: 10px
---

# onlinesourdough — three ways forward

## Overview

This document is the canonical specification for a bounded exploration, not an approved production direction. Gustav chooses among three paired concepts after inspecting the editable OpenPencil board. The existing warm, practical identity outranks the supplied Agentic Engineer reference. Preserve the business-problem-first promise and the existing public/DIY/DWY/DFY relationships.

The current main site is a menu of ways to work with Gustav; Resources is a method/library entry point. The main opportunity is a stronger opening visual, a more legible progression through the offer paths, and diagrams that demonstrate what the work changes. Do not make the library homepage a duplicate consulting funnel.

Reference locators, inspected 2026-09-10:

- https://onlinesourdough.com/ — owner site, current brand and four offer paths, high confidence from live text and screenshot.
- https://resources.onlinesourdough.com/ — owner site, current promise, expanded navigation, video preview, and four library groupings, high confidence from live text and screenshot.
- https://agentic-engineer.ai/ — third-party inspiration: quiet monochrome ground, fine rules, small mono labels, animated ASCII focal object, sequential capability diagrams, open offer columns. Inspiration only; no license or permission to copy its creative assets is asserted. No third-party assets or implementation are adopted.

The adaptive route is `explore`: three bounded options distinguish preserving the menu, clarifying services, and explaining the system. No direction is accepted yet. Current-state panels are simplified original wireframe reconstructions, not screenshots or exact imports.

## Colors

Warm paper `background`, charcoal `primary`, muted warm `secondary`, terracotta `tertiary`, and moss `positive`. Use terracotta for the primary action and occasional process nodes. Moss indicates a completed process state, always with a label. Fine borders use `border`; never rely on a low-contrast line to convey text or state.

A is paper-led, B uses large ink headlines on a lighter surface, C adds a contained charcoal diagram field while keeping readable warm surfaces. These are intentional alternatives. No purple gradients, neon AI glow, copied competitor color coding, or arbitrary status badges.

## Typography

Use readable sans-serif text and restrained monospace metadata. Existing pixel typography may remain in the brand mark and short illustrative words; long body copy and all navigation must remain easy to read. OpenPencil uses Inter and IBM Plex Mono. Exact production brand-font integration is a later receiving-project decision.

Desktop hero 48–56px, body 18px, offer title 25–30px, labels 12px. Mobile hero 34–38px and body at least 16px. Headlines describe a business outcome. Draft extra labels are clearly marked as exploration in the surrounding board, not represented as approved offers.

## Layout

The OpenPencil document contains five named boards: design map/current state, A, B, C, and motion/mobile. Each variation places main site and Resources beside each other at the same visual scale. Native text, rectangles, ellipses, and paths remain editable. Board-level Danish annotations explain tradeoffs; website draft copy is English like the live sites.

A — Levende menukort: preserve the current hero promise, introduce an original dotted dough/workflow motif on the right, replace the four tall illustrated cards with compact open rows. Resources uses a restrained split hero and a four-step method path above a compact library index. Smallest structural change; may still make visitors interpret the service options themselves.

B — Tydeligere tilbud: main site gives service choices more space, keeps DIY distinct, and presents consultation/workshop/delivery as tentative ways into the existing DWY/DFY structure. No price, guaranteed outcome, workshop duration, or new purchase link. Resources remains learning-first, with a separate invitation to get help below the method/library. Recommended starting point for the owner's stated interest in offers; requires deciding actual service packaging before implementation.

C — Visuelt system: main site explains the whole process with a prominent map from problem to understood/owned solution. Four existing offer paths remain visible. Resources becomes a visual method map with concrete resources attached to each step. Most expressive connection to agents/orchestration; diagrams must stay understandable to a nontechnical business owner.

Desktop target: content up to 1200px, generous section spacing, fine horizontal rules. Resources starts with a 56px collapsed rail, explicit “Open library”/“Menu” control and visible search. At below 768px, replace the rail with a top-bar Menu button; do not consume scarce width with an icon rail. Stack copy before illustration, then primary action and method. No mandatory scroll snapping or pinned sections.

## Elevation & Depth

Use separation by whitespace and thin borders. No default heavy shadows. A small inset-paper diagram surface may sit within the hero. C's charcoal diagram field is a deliberate alternate composition, not a global dark mode.

## Shapes

Mostly square geometry, 4px corners for controls, 10px for a diagram plate. Small pixel clusters and dotted paths reference the owner identity. The new hero motif is a rising cluster of pixels that resolves into a simple workflow; it is not the competitor's ASCII orb. Include meaningful labels outside the animated region.

## Components

Main-site primary action: “Explore the ways to work” / “Find the right starting point” as on-page navigation. Resources primary action: “Start Here”, existing path `/collection/explore/start-here`. Main menu keeps public Content, DIY Resources, DWY The Fermentary, DFY Complete Bake. Real destinations remain those inspected on the owner site. Proposed offer-detail labels have no implied working endpoint in this design artifact.

Resources rail: initial collapsed width 56px on desktop. Menu expands existing library navigation to roughly 248px; use an accessible expanded state and labelled controls. Escape closes temporary mobile navigation and restores focus. Inside a reading session, retain the reader's deliberate sidebar preference; the landing-page default must not continually override it.

Motion storyboard: rest → pointer response → organised workflow. Rest is a calm original pixel cluster; pointer/touch movement displaces nearby dots by at most 8px, with return around 450ms. No drag is required for navigation. Coarse pointers can show a single short transformation on tap; vertical touch movement must retain native page scrolling. On scroll, process connectors reveal in sequence over 500–800ms total, once per section; labels and all content are present from the start. Loops are capped to a quiet 8-second decorative cycle and pause offscreen or when the tab is hidden.

Reduced motion: static final diagram, no pointer displacement, pulse, autoplay, scroll interpolation, or parallax. All meaning survives. A visible pause control is required for continuous animation longer than five seconds. Prefer a single short entrance by default; runtime behavior remains unimplemented in this exploration.

Interaction states for later implementation: hover lightly darkens controls; visible keyboard focus uses a 2px terracotta outline with 3px offset; pressed state is immediate. Native links retain useful names. Search loading uses a textual status; empty results suggest clearing the query; errors offer retry while keeping the input. The landing remains readable when an illustration fails. No account/permission claim is introduced by these mockups.

## Do's and Don'ts

- Do preserve the existing business purpose and ownership promise.
- Do let motion explain a business process, with readable static labels.
- Do keep DIY/library access independent of buying services.
- Do treat consultation/workshop packaging and all additional copy as owner-review proposals.
- Do use a semantic heading hierarchy, landmarks, skip navigation, readable contrast, and touch targets of at least 44px when implemented.
- Do inspect the saved native document and exported boards before handback.
- Don't copy the reference's wording, portraits, testimonials, prices, guarantees, orb, or implementation.
- Don't infer product commitments from a design comparison.
- Don't claim motion, mobile navigation, links, or accessibility have been runtime-tested: these are native mockups and storyboard instructions.
- Don't implement or publish either website in this task. Final selection is pending Gustav's review.

## Portable direction and ownership

This `DESIGN.md` is the canonical specification of the exploratory comparison. It does not designate any alternative as an approved production direction.

- **Scope and non-goals:** two current-state wireframes, three paired website directions, motion storyboard, mobile navigation states, native editable source, and static artifact index. No website implementation, live animation, offer launch, or publication.
- **Review, revision, and acceptance:** owner mode; Gustav Anderson reviews and chooses the direction. Technical/visual verification by Codex is supporting evidence, not an owner PASS. Receiver acceptance is separate and not requested.
- **Known limitations:** native mockups show intended states, not interactive website behavior. Font rendering depends on the upstream native renderer. Current-state panels are simplified original reconstructions. Consultation/workshop packaging remains tentative. The artifact index presents PNG previews and links to the original editable source; it is not a prototype.
