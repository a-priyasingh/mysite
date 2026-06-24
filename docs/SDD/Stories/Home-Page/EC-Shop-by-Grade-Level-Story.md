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
Build a **Shop by Grade Level** block: a heading plus a single row of grade tiles. Each tile is an image + a button/label that links to the products for that Girl Scout level. The block is responsive across Desktop / Tablet / Mobile (per the Figma component set).

Verified grades (from Figma): **Daisy, Brownie, Junior, Cadette, Senior, Ambassador, Adult** (7 tiles).

---

## Design Specs (from Figma)
- **Heading**: "Shop by Grade Level" — Girl Scout Light(300) 36/43, black.
- **Tile row** (Desktop, 1168×192): 7 tiles, each **146×192** = image (146×146, **aspect 1:1**) + a button (`Button_Styling`, 146×36) with the grade label.
- Tiles evenly spaced in a single row on desktop.
- GS brand tokens; green `#005640` for button/active state.
- **Responsive variants** (verified in component set):
  - Desktop 1280×428 — 7 tiles in a row.
  - Tablet 768×418 — fewer per row / wrap or scroll.
  - Mobile 360×386 — horizontal scroll or 2–3 per row (confirm exact behavior).

## Hover / Touch
- Tile image: subtle zoom (~1.03–1.05) + shadow lift on hover.
- Button/label: green `#005640` fill or border emphasis on hover; visible focus for keyboard.
- Entire tile is one link/target.
- Mobile: pressed-state (no hover); horizontal swipe if scrollable; ≥44×44px tap area.
- Respect `prefers-reduced-motion`.

---

## EDS DA Authoring Details
- Authored as a block table (e.g., **`Shop by Grade`**) in the home page document.
- Author-configurable:
  - **Heading** text.
  - **Grade tiles**: each tile = image (required), grade label (button text), and link (target PLP/category URL).
  - **Order** of tiles (reorder by reordering rows).
- Recommended fixed set of 7 (Daisy…Adult) but author can add/remove/rename.
- Tiles render in a single responsive row automatically — author does not place grid coordinates.

## Authoring Acceptance Criteria
- [ ] Author can add the block and set the heading.
- [ ] Author can add/edit/remove/reorder grade tiles (image, label, link).
- [ ] Tiles render in a responsive row (Desktop 7-up; tablet/mobile reflow/scroll).
- [ ] Each tile links to the configured target; author can paste a category/PLP URL.
- [ ] Omitting a tile does not break the row layout.
- [ ] Preview reflects the row before publish.

## User Acceptance Criteria
- [ ] Block renders the heading and a row of grade tiles per design.
- [ ] Each tile shows its image and grade label; clicking the tile/button navigates to that grade's products.
- [ ] Images have alt text; labels legible.
- [ ] Responsive: tiles reflow/scroll cleanly on tablet and mobile without overflow or distortion.
- [ ] Keyboard: each tile is a focusable link with visible focus; logical tab order.
- [ ] WCAG 2.1 AA: meaningful alt text (grade name), accessible link names, sufficient contrast, heading structure.
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
- Confirm tablet/mobile layout (wrap vs. horizontal scroll; tiles-per-row).
- Confirm whether this overlaps/duplicates the "Shop by Troop Year Plans" block (that one uses a dropdown; this one uses tiles) — keep both or consolidate.
