# ACCS Site Visit Story — Feature / Collection Tile (Frontend Rendering & UX)

**Type:** Story (ACCS Site Visit / Frontend)
**Component:** EDS Storefront (DA) — Content Block (feature/collection tile)
**Related design:** Figma node 2886-55992 — `Aspect Ratio 3:5` feature tile (272×453).
**Companion story:** EDS Authoring — Feature / Collection Tile (content model & authoring).
**Personas:** All visitors (Guest, Caregiver, Leader) — no persona-specific behavior.
**Platforms/Pages:** Any page where the tile is placed (e.g., home carousels); Desktop, Tablet, Mobile.
**Stream:** ACCS Site Visit (frontend rendering + user experience).

## INVEST
- **Independent:** renders from authored content; testable with sample data.
- **Negotiable:** hover/animation details can be refined.
- **Valuable:** gives shoppers a clear promotional entry point into a collection.
- **Estimable:** one tile's rendering + interaction.
- **Small:** scoped to this tile.
- **Testable:** plain-language AC below.

---

## User Story
**As a** girlscoutshop.com visitor,
**I want** a visual feature tile with a heading and a link,
**so that** I can tap into a highlighted collection directly.

## Design Specs

**Prose summary:** Tall image tile, 272×453 (3:5), rounded corners. A feature image fills the tile with an overlaid info block: heading (Girl Scout Medium 32/38, brown #763A16) and a text CTA "Shop All Collection" (Trefoil Sans 500 16/19, green #005640) with an arrow. The whole tile (or the CTA) is a link.

**Per-element properties (from Figma):**

| Element | Size (W×H) | Font (family wt size/lh) | Color (hex) | Spacing (pad/gap) | Border / Radius |
|---------|-----------|--------------------------|-------------|-------------------|-----------------|
| Tile (root) | 272×453 | — | bg #EAEAEC | gap 10, vertical | radius 4 |
| Feature image | 272×272 | — | image | — | — |
| Info block | 240×129 | — | — | gap 16, vertical | — |
| Heading | 240×77 | Girl Scout 500 32/38 | #763A16 | — | — |
| CTA label | 133×20 | Trefoil Sans 500 16/19 | #005640 | pad 8/0/8/0, gap 4 | — |
| CTA arrow | 16×16 | — | #005640 | — | — |

### Hover / Touch
- CTA: on hover the link is emphasized (underline/color) and the arrow nudges toward the reading direction.
- If the whole tile is clickable, the image lifts/zooms slightly on hover.
- On touch devices the tile/CTA shows a pressed state (no hover); tap area is at least 44×44px.
- Motion is disabled when the visitor has reduced-motion turned on.

## Acceptance Criteria (plain language — verifiable without Figma)

1. When authored content exists, the tile shows the feature image, the heading, and the "Shop All Collection" CTA.
2. Clicking or tapping the CTA takes the visitor to the linked collection page.
3. If the whole tile is set to be clickable, clicking anywhere on the tile goes to the same linked page.
4. The tile looks and works correctly on desktop, tablet, and mobile — no overlapping text, cut-off content, or horizontal scrolling.
5. The heading and CTA text remain readable over the image (adequate contrast).
6. A keyboard user can move focus to the CTA, see a clear focus indicator, and open the link by pressing Enter.
7. The tile image has descriptive alternative text for screen-reader users.
8. The tile does not shift page layout as it loads and does not delay the main page content from appearing.

## Commerce Data Flow
- None — authored content only. The CTA is an authored link to a collection/PLP page. No ACCS catalog data.

## Dependencies
- EDS Authoring — Feature / Collection Tile (provides the content model).
- CTA destination collection/PLP page.

## Open Items
- Confirm whether the entire tile is clickable or only the CTA.
- Confirm placement (standalone vs. carousel lead tile) and tablet/mobile sizing within a carousel.

## Implementation Notes (developers — not required for QA acceptance)
- Below-the-fold usage should lazy-load the image; reserve the tile dimensions to avoid layout shift.
- Colors: heading brown #763A16, CTA green #005640 — map to GSUSA design tokens.
