# Design review — source-faithful motion r4

Review mode: owner
Review owner: Gustav Anderson
Result: waiting-owner

The local comparison is ready. Gustav prefers The Living Mark and requested the refinements below. That preference does not constitute approval of this complete candidate. No receiver acceptance or production delivery is selected.

## Supporting author verification

Reviewer: Codex (author verification; not the declared owner decision)
Result: PASS for local comparison usability
Reviewed DESIGN.md SHA-256: `8071cd18ebad4ac3782e02083dbe6174e9dd5ad15114ba03c7148c82df894c95`

- Native source: `openpencil/onlinesourdough-design-map-r4c-final.op` — SHA-256 `b53d376c8784258b43fc2200a51d29e4f489d01de213303c45cc14603175b55c`.
- Comparison guide: `index.html` — SHA-256 `02552618c42975f94bb35f24761b239c32c18368757f1c11fc515e3435b13009`.
- Twelve native PNG exports, dimensions and hashes: `runs/run-0004/native-exports.json`.
- Final selected source manifest: `runs/run-0004/proof.json`.

The verified OpenPencil 0.8.4 workbench reopens the 142-node source as twelve roots: two collection headers and ten complete pages. The pages are separate and do not overlap. Native PNG exports were visually inspected, and the guide loads all ten page images. Baselines retain their original code, typography, assets and composition.

## Current refinements and evidence

The living mark retains the pixel outline but fills decorative crust holes and internal block gutters. The little dough also has a continuous glyph body. Both have clearly visible negative eye openings; no eye whites or pupils are painted on top. The static site logo retains its crust. Desktop and 390px mobile inspection confirm the distinction. The gaze and blink logic is retained.

Sound starts off. Enabling it immediately creates a confirmation note; pointer movement creates short triangle-wave notes connected to the running AudioDestination. Muting prevents new notes. `audio-proof.json` records the browser audio graph. `motion-proof.json` records pause stability and reduced motion before the later body-shape refinement; those controls and animation logic were not changed by that refinement. Hardware speaker output was not independently listened to.

The personal avatar and linked name are in the main footer, with “Built by”, leading to Gustav Online. Arc’IT AI and the original organization GitHub link remain alongside it. The hero personal row is removed. The method link follows the two paragraphs in the text column before the tube. `final-layout-proof.json`, `footer-desktop.jpg`, `footer-mobile.jpg` and `mobile-living-mark-final.jpg` show the final placement and no horizontal mobile overflow.

The original method tube and eight-field Resources curve remain as verified in run-0003. Their interaction code was not changed. The latest captures replace all seven affected alternatives; the two baselines and Resources method retain their previous unaffected captures. `reopened-canvas.jpg`, `canvas-layout.json`, `native-exports.json`, and `guide-proof.json` establish the final comparison.

## Visual, voice and principles check

Author evaluation: PASS for this local exploration. The original site identity and promise remain recognizable. Eye cutouts read clearly against the continuous glyph body. The footer gives the personal links a clear role without inventing credentials. Copy introduces no commercial metrics or scarcity. Text, brand, legibility, requested composition and output dimensions were checked at the intended handback sizes.

## Checks and limits

Selected formatting, pinned Design.md lint, native source/export binding, and repository contract results are recorded in `runs/run-0004/checks.json`. The root contract has an unrelated unfinished `pixelroute-r1` collection; findings are separated from this design. Source websites are read-only inputs and were not edited or deployed. No engine code changed.

Website content inside OpenPencil is raster within editable frames and notes. Retained frontend components own text and animation edits. Static capture mode freezes motion, disables sticky positioning and shows the original Resources video poster at identical dimensions. Normal previews retain video and interaction. Local previews have no backend or authenticated account functionality.

Earlier r1–r3 and preliminary r4 candidates remain historical evidence. The current immutable candidate is r4c-final within run-0004. Final owner PASS and receiving acceptance remain separate.
