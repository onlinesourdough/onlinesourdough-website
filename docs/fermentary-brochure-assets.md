# Fermentary brochure assets

These stable public assets are consumed by the owner's existing Notion brochure:
https://app.notion.com/p/3be6d2e17f5680d9958bcf322dcef181

- `public/assets/fermentary-mark-v2.svg` is a small editable F monogram in the
  existing pixel typography family. Its medium cocoa colour is intended to
  remain visible on both pale and dark Notion backgrounds. No theme-specific
  asset switching is required.
- `public/assets/fermentary-cover-v3.png` is the selected 3:1 cover. Its background
  was generated with the built-in imagegen tool on 27 October 2026. It uses the existing
  `inner-circle-lofi-v3-transparent.png` illustration as a visual reference:
  a shared table, brown coffee cups, sourdough, a tile-based bread print and a
  tile motif on the laptop. The background edit prompt is retained in
  `fermentary-cover-prompt.txt`.
  The owner requested the existing character graphics, not generated lookalikes:
  the unchanged 192 × 208 idle frame at row 0, column 0 of
  `public/assets/agents/codex-spritesheet-v4.webp` and the same Lobe Icons Claude
  silhouette used by the website were composited onto that background. The
  source and licence notes in `public/assets/agents/SOURCES.md` also apply.

The rejected starter-jar icon is not shipped. The site's own header mark and
illustrations keep their existing assets. Add a new versioned filename for
future brochure changes so the chosen Notion page can be updated explicitly.
