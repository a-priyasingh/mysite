# EDS + ACCS Story — "Shop by Grade Level" Block (Home Page)

**Type:** Story
**Component:** EDS Storefront (DA) — Content/Navigation Block
**Related design:** Figma node 2887-24652 — `Shop by Grade New Section` (COMPONENT_SET with Desktop / Tablet / Mobile variants). Desktop 1280×428, Tablet 768×418, Mobile 360×386.

---

## User Story
**As a** caregiver/troop leader shopping girlscoutshop.com,
**I want** a "Shop by Grade Level" row that lets me jump to products for a specific Girl Scout level,
**so that** I can quickly find what's relevant for my Girl Scout's grade.

**As a** content author / merchandiser,
**I want** to configure the grade tiles (image, label, link) for each level,
**so that** the grade navigation stays aligned with the catalog without code changes.

---

## Description
Build a **Shop by Grade Level** block: a heading plus a single row of grade tiles. Each tile is a **top image** (the grade photo) + a decorative **background + icon** treatment + a button/label that links to the products for that Girl Scout level. The block is responsive across Desktop / Tablet / Mobile (per the Figma component set); on smaller viewports it becomes a swipeable carousel with dots.

Verified grades (from Figma): **Daisy, Brownie, Junior, Cadette, Senior, Ambassador, Adult** (7 tiles).

### Authoring Model (IMPORTANT)
- **Only the top image is authorable** per tile (plus the label and link).
- The **decorative background + icon combinations are code-defined** — the pairing of a given background shape with its icon (e.g., blue cloud + flower, beige trapezoid + butterfly, lavender circle + star, pink diamond + mushroom, peach square + rocket, green + butterfly, blue blob + bird) is fixed in code and NOT individually editable by the author.
- The author can **choose which background (and its bundled icon) appears at any position** in the row — i.e., assign a code-provided background option to a tile/position. The author does not design or recombine background+icon; they only pick from the code-provided set and place it.
- Net effect: authors control the **photo, label, link, and which background-style sits where**; the visual styling of each background+icon stays consistent and on-brand because it lives in code.

---

## Design Specs (from Figma)
- **Heading**: "Shop by Grade Level" — Girl Scout Light(300) 36/43, black.
- **Tile row** (Desktop, 1168×192): 7 tiles, each **146×192** = top image (146×146, **aspect 1:1**) layered over a code-defined **decorative background + icon**, plus a button (`Button_Styling`, 146×36) with the grade label.
- **Background + icon set (code-defined)** — observed pairings: blue cloud + flower, beige/tan trapezoid + butterfly, lavender circle + star, white/pink diamond + mushroom, peach square + rocket, green shape + butterfly, blue blob + bird. Each background is a distinct shape with a fixed accent icon; the full set is provided by code.
- Tiles evenly spaced in a single row on desktop.
- GS brand tokens; green `#005640` for button/active/link state.
- **Responsive variants** (verified in component set):
  - Desktop 1280×428 — 7 tiles in a row.
  - Tablet 768×418 — carousel showing ~4 tiles with dots indicator (labels shown as green text links).
  - Mobile 360×386 — carousel showing ~2 tiles with dots indicator; swipe to advance.

## Hover / Touch
- Tile image: subtle zoom (~1.03–1.05) + shadow lift on hover.
- Button/label: green `#005640` fill or border emphasis on hover; visible focus for keyboard.
- Entire tile is one link/target.
- Mobile: pressed-state (no hover); horizontal swipe if scrollable; ≥44×44px tap area.
- Respect `prefers-reduced-motion`.

---

## EDS DA Authoring Details
- Authored as a block table (e.g., **`Shop by Grade`**) in the home page document.
- Author-configurable per tile:
  - **Top image** (required) — the grade photo.
  - **Grade label** (button/link text).
  - **Link** (target PLP/category URL).
  - **Background option** — author selects one of the **code-provided background+icon styles** to apply at this position (e.g., a named option like `style-1`…`style-7`). The author chooses WHICH background goes WHERE; they cannot edit the background shape or its icon.
- **NOT authorable**: the background shapes, the icons, and the background↔icon pairing — these are defined in code. The author only picks from the provided set and places it at a position.
- **Order** of tiles (reorder by reordering rows).
- Recommended fixed set of 7 (Daisy…Adult) but author can add/remove/rename.
- Tiles render in a single responsive row automatically — author does not place grid coordinates.

## Authoring Acceptance Criteria
- [ ] Author can add the block and set the heading.
- [ ] Author can add/edit/remove/reorder grade tiles.
- [ ] Per tile, author can set the **top image**, **label**, and **link**.
- [ ] Per tile/position, author can **select a background option from the code-provided set**; the chosen background+icon renders at that position.
- [ ] Author can place any available background option at any position (background choice is independent of which grade is in the tile).
- [ ] Author **cannot** edit the background shapes, icons, or the background↔icon pairing (these are code-controlled).
- [ ] If no background option is selected for a tile, a sensible default (or no decorative background) is applied without breaking layout.
- [ ] Tiles render in a responsive row (Desktop 7-up; tablet/mobile carousel with dots).
- [ ] Each tile links to the configured target; author can paste a category/PLP URL.
- [ ] Omitting a tile does not break the row/carousel layout.
- [ ] Preview reflects the row (including selected backgrounds) before publish.

## User Acceptance Criteria
- [ ] Block renders the heading and a row of grade tiles per design.
- [ ] Each tile shows its top image over the author-selected code-defined background+icon, plus the grade label.
- [ ] The background+icon styling matches the design exactly (code-controlled), regardless of which grade photo is placed in the tile.
- [ ] Clicking the tile/button/label navigates to that grade's products.
- [ ] Decorative backgrounds/icons are treated as presentation only (do not interfere with the image or link).
- [ ] Images have alt text; labels legible.
- [ ] Responsive: Desktop shows 7 in a row; tablet/mobile show a swipeable carousel with a dots indicator; no overflow or distortion.
- [ ] Keyboard: each tile is a focusable link with visible focus; logical tab order; carousel controls operable.
- [ ] WCAG 2.1 AA: meaningful alt text (grade name), accessible link names, sufficient contrast, heading structure; decorative background/icon hidden from assistive tech.
- [ ] Performance: images optimized and lazy-loaded (below the fold); aspect-ratio boxes prevent layout shift.

## Commerce Data Flow
- **Primarily authored content** — tiles (image, label, link) are authored.
- **Links** resolve to grade-filtered **PLPs**: typically a category or a PLP filtered on the `gs:programLevel` attribute (Daisy…Ambassador, plus Adult).
- **Images** resolve from Adobe Assets / DA.
- Grade values align to the `gs:programLevel` taxonomy so filters/links stay consistent with the catalog.
- (Optional future: auto-generate tiles from the program-level taxonomy — not in this story's scope.)

## Dependencies
- ACCS Catalog categories / `gs:programLevel` attribute (link targets / filtering).
- **EC-243** — `gs:programLevel` attribute exposed/searchable (if links use level filtering).
- Adobe Assets / DA for tile imagery.

## Open Items / Assumptions
- CONFIRM grade set: Figma shows Daisy, Brownie, Junior, Cadette, Senior, Ambassador, **Adult** (7 tiles) — confirm "Adult" is included and final.
- Confirm each tile's link target: a category PLP vs. a `gs:programLevel`-filtered PLP.
- Confirm the **number of code-provided background+icon styles** and their naming (so authors can reference them, e.g. `style-1`…`style-N`).
- Confirm how the background option is exposed to authors in DA (e.g., a value/keyword cell per tile that maps to the code style).
- Confirm default background behavior when none is selected.
- Confirm tablet/mobile tiles-per-view (observed ~4 tablet / ~2 mobile, carousel with dots).
- Confirm whether this overlaps/duplicates the "Shop by Troop Year Plans" block (that one uses a dropdown; this one uses tiles) — keep both or consolidate.
