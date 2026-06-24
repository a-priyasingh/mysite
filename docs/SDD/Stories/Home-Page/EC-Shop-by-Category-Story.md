# EDS + ACCS Story — "Shop by Category" Block (Home Page)

**Type:** Story
**Component:** EDS Storefront (DA) — Content/Navigation Block
**Related design:** Figma node 2727-362699 — `Shop by Category` (Default, Desktop 1280×1714). Heading "Shop by Category" (Girl Scout Light 36/43). Mixed-tile grid: a "Banner Grid" of 2 large feature cards + "Section" rows of 4 standard cards.

---

## User Story
**As a** girlscoutshop.com shopper,
**I want** a visual "Shop by Category" grid on the home page,
**so that** I can browse to the product category I want directly from imagery.

**As a** merchandiser / content author,
**I want** to configure the category tiles (image, label, link) and the grid layout (feature vs. standard cards),
**so that** I can promote categories without code changes and keep links aligned to the catalog.

---

## Description
Build a **Shop by Category** block: a heading plus a responsive grid of category tiles. The grid mixes two card types:
- **Feature cards** (large, 4:5 image) — 2-up "Banner Grid" row for hero categories.
- **Standard cards** (1:1 image) — rows of 4 for the remaining categories.

Each tile = image + category label, linking to that category's PLP. This is primarily **authored content** (image + label + link), with links resolving to ACCS categories.

---

## Design Specs (from Figma — Desktop)
- Block width 1280; content max ~1168.
- **Heading**: "Shop by Category" — Girl Scout Light(300) 36/43, black.
- **Banner Grid** (1168×715): **2 feature cards**, each 572×715 — image **aspect 4:5** + content block (heading, ~508px wide).
- **Section** rows (1168×312 each): **4 standard cards** per row, each 274×312 — image **aspect 1:1** (274×274) + heading (274×30).
- Multiple Section rows stack to fill the grid (Figma shows feature row + several 4-up rows).
- GS brand tokens; green `#005640` accents.
- **Tablet/Mobile**: grid reflows to fewer columns (feature cards stack; standard cards ~2-up mobile). Confirm responsive frames.

## Hover / Touch
- Card: image zoom (~1.03–1.05) + subtle overlay/shadow on hover; category label underline or color shift to green `#005640`. Entire card is one link.
- Mobile: pressed-state (no hover); ≥44×44px effective tap area (full card).
- Respect `prefers-reduced-motion`.

---

## EDS DA Authoring Details
- Authored as a block table (e.g., **`Shop by Category`**) in the home page document.
- Author-configurable:
  - **Heading** text.
  - **Tiles**: each tile = image (required), category label, link (category PLP URL), and **card type** (Feature 4:5 / Standard 1:1).
  - **Order** of tiles/rows (reorder by reordering rows).
  - Optional per-tile eyebrow/short copy on feature cards (Content block).
- Layout: feature cards render 2-up; standard cards render in 4-up rows automatically based on card type — author does not hand-place grid coordinates.

## Authoring Acceptance Criteria
- [ ] Author can add the block and set the heading.
- [ ] Author can add/edit/remove/reorder category tiles.
- [ ] Author can set each tile's image, label, link, and card type (Feature 4:5 vs Standard 1:1).
- [ ] Feature cards render 2-up; standard cards render 4-up per row automatically.
- [ ] Omitting optional copy on a feature card renders cleanly (image + label only).
- [ ] Links resolve to category PLPs; author can paste a category URL/path.
- [ ] Preview reflects the grid before publish.

## User Acceptance Criteria
- [ ] Block renders the heading and the category grid (feature + standard cards) per design.
- [ ] Each tile shows its image and label; clicking anywhere on the tile navigates to the category PLP.
- [ ] Images have alt text; labels are legible (contrast over image where overlaid).
- [ ] Responsive: feature cards stack and standard cards reflow (e.g., 2-up) on mobile without distortion or overflow.
- [ ] Keyboard: each tile is a focusable link with visible focus; logical tab order.
- [ ] WCAG 2.1 AA: meaningful alt text, sufficient contrast, accessible link names (label, not "image"), heading structure.
- [ ] Performance: images optimized and lazy-loaded (below-the-fold); correct aspect-ratio boxes prevent layout shift.

## Commerce Data Flow
- **Primarily authored content** — tiles (image, label, link) are authored, not catalog-generated.
- **Links** resolve to **ACCS category PLPs** (category URL key/path). Category structure should mirror the ACCS catalog so links stay valid.
- **Images** resolve from Adobe Assets / DA.
- (Optional future: auto-generate tiles from top ACCS categories — not in this story's scope.)

## Dependencies
- ACCS Catalog categories (link targets).
- Adobe Assets / DA for tile imagery.
- Shared card/grid styles (GS design tokens).

## Open Items / Assumptions
- Confirm the final category set and which categories are "feature" (4:5) vs "standard" (1:1).
- Confirm tiles are authored vs. auto-generated from the ACCS category tree.
- Confirm responsive column counts (tablet/mobile) for feature and standard cards.
- Confirm whether feature cards include body copy/CTA or image+label only.
- Confirm number of Section rows / total tiles for MVP.
