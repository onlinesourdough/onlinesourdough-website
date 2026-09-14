# onlinesourdough website exploration

Open [the comparison guide](index.html) for the two collections and ten local previews and the live character study. [DESIGN.md](DESIGN.md) is canonical; [BRIEF.md](BRIEF.md) records the accepted scope and revisions.

The r4 comparison uses actual browser renders from the two source frontends. The main method section merges the original manifesto and a working particle tube. The Resources curve sits under the folders and responds to fields. Three character alternatives add a living pixel logo, a dough character, or a bubbling starter. The main alternatives include Gustav’s GitHub portrait and a discreet contact cue.

Start the persistent local previews from this directory with:

```sh
node prototype/serve.mjs
```

- Main: `http://localhost:53671/?variant=flow`
- Resources: `http://localhost:53672/?variant=flow`
- Replace `flow` with `baseline` for the original.
- Character studies: `http://localhost:53671/?variant=hero-lab`.
- Website characters: `?variant=hero&character=mark`, `dough`, or `starter`.
- Choose “Enable sound” once; the confirmation note and subsequent hover/click notes are now audible by design. Sound starts off on a new page.

The original repositories are read-only inputs. `prototype/source/` contains the changed frontend components, while `prototype/main/` and `prototype/resources/` are local browser bundles with the original public assets. These previews do not provide backend/account functionality.

The OpenPencil candidate is [onlinesourdough-design-map-r4c-final.op](openpencil/onlinesourdough-design-map-r4c-final.op). Native frames and annotations are editable; page texts remain part of browser-rendered images. Use the frontend source to edit text and motion. Reopening uses the verified ADS OpenPencil workbench; see `state/workbench.json` for its local URL and source binding.

The earlier torus and r1–r3 sources are superseded; use the r4 source and `exports-r4c-final/`. Owner direction selection remains pending. No HANDOFF or production delivery is selected.

The Living Mark is the owner’s preferred character. In r4, its eyes are openings in the glyphs, without added pupils. The same correction is applied to the retained comparisons. The design overview can be restarted from this directory with `python3 -m http.server 53567 --bind 127.0.0.1`.
