# EDS Story — "Promotional Banner" Tile

**Type:** Story
**Component:** EDS Storefront (DA) — Content Block (reusable promo tile)
**Related design:** Figma node 4000-40496 — `Promotional_Banner` (COMPONENT_SET: Desktop 296×413, Tablet 768×678, Mobile 320×381).
**Note:** This is the compact, reusable promo tile — the same `Promotional_Banner` used inside the Mega Menu and other slots (sidebars/grids), so it can appear in multiple placements.

---

## User Story
**As a** girlscoutshop.com visitor,
**I want** a compact promotional tile with an image, a short offer message, and a CTA,
**so that** I can see and act on a promotion wherever it appears (e.g., mega menu, home, sidebars).

**As a** content author / merchandiser,
**I want** to author the tile's image(s), heading, subtext, and CTA, with everything optional,
**so that** I can place promotions flexibly without the tile breaking if a field is empty.

---

## Description
Build a compact **promotional banner tile**: a top image, a content area (heading + subtext) over its own background, and a "Shop now" CTA. Reusable across placements (mega menu promo slots, home sections, sidebars). Authored content.

---

## Design Specs (from Figma)
- Compact tile; desktop width ~296.
- **Top image** (`CTA_Component_3:2`, 296×197): aspect **3:2**.
- **Content area** (over its own background image):
  - **Heading**: Girl Scout 400 28/34, `#2D2E33` (e.g., "Get 20% Off on orders of $50 or more*").
  - **Subtext / eyebrow**: Trefoil Sans 400 16/22, `#2D2E33` (e.g., "Shop Early and Save").
  - **CTA**: "Shop now" — button (~102×36), Trefoil Sans 500 14/18, white label on green fill, with icon.
- GS brand tokens; green `#005640` accent.
- **Responsive variants** (verified): Desktop 296×413, Tablet 768×678, Mobile 320×381.

### Hover Details
- **CTA button**: green fill darkens (≈`#004a37`) or inverts to outline on hover; icon nudges; cursor pointer; visible focus ring (≥3:1 contrast).
- **Tile / image** (if the whole tile links): subtle image zoom (~1.03–1.05) + shadow on hover; pressed-state on mobile.
- **Global**: respect `prefers-reduced-motion`; hover has an equivalent keyboard-focus state; ≥44×44px tap target on mobile.

> Note: no explicit hover-state variants are defined in Figma — hover follows the GS brand green `#005640` and standard convention; confirm with design.

---

## EDS DA Authoring Details

| Displayed data | Content is sourced from | Required |
|----------------|-------------------------|----------|
| Top image | EDS | N |
| Content-area background image | EDS | N |
| Heading | EDS | N |
| Subtext / eyebrow | EDS | N |
| CTA label ("Shop now") | EDS | N |
| CTA link | EDS | N |

- Authored as a block table (e.g., **`Promotional Banner`**) in the page document (or placed within a parent block's promo slot).
- Author sets the top image, content background image, heading, subtext, and CTA (label + link).
- **All fields are optional** (see Acceptance Criteria).

## Authoring Acceptance Criteria
- [ ] Author can add the tile and set the top image, background image, heading, subtext, and CTA (label + link).
- [ ] **No fields are mandatory.** The tile renders with any combination of provided fields.
- [ ] **Graceful blanks:** if a field is left empty, the tile must NOT break — only that part renders blank/omitted (empty subtext → no subtext; no CTA → no button; no heading → heading omitted; no top image → image slot collapses; image-only or text-only renders cleanly).
- [ ] The tile works both standalone and when placed inside a parent block's promo slot.
- [ ] Preview reflects the tile (including partially-filled) before publish.

## User Acceptance Criteria
- [ ] Tile renders the top image, heading, subtext, and CTA per design.
- [ ] Missing fields display cleanly (blank/omitted part only) — no broken layout, no placeholder text leaking through.
- [ ] Clicking the CTA (or the tile, if linked) navigates to the authored target.
- [ ] Images have alt text; text legible over the background (scrim/contrast).
- [ ] Responsive: renders cleanly at Desktop 296, Tablet 768, and Mobile 320 without overflow or distortion.
- [ ] Keyboard: CTA/tile focusable with visible focus; Enter activates.
- [ ] WCAG 2.1 AA: heading structure (if present), accessible CTA name, sufficient text contrast over image; decorative imagery hidden from assistive tech.
- [ ] Performance: images optimized and lazy-loaded; aspect-ratio boxes prevent layout shift.

## Commerce Data Flow
- **Authored content — no catalog data.** Images, heading, subtext, and CTA are authored in DA.
- The CTA is an authored link (may deep-link to a PLP/category or promo page).

## Dependencies
- Adobe Assets / DA for tile imagery.
- Shared button styles (GS design tokens).
- Parent blocks that host it (e.g., Mega Menu promo slots) — this tile is reused there.

## Open Items / Assumptions
- Confirm placements (mega menu promo slot, home sections, sidebars) and whether the whole tile is clickable vs. only the CTA.
- Confirm the CTA target URL.
- Confirm whether the top image and content-area background are two separate images or one.
- Confirm exact hover shade with design (none defined in Figma).
