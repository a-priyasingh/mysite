# EDS Authoring Story — Feature / Collection Tile (Content Model & Authoring)

**Type:** Story (EDS Authoring)
**Component:** EDS Storefront (DA) — Content Block (feature/collection tile)
**Related design:** Figma node 2886-55992 — `Aspect Ratio 3:5` feature tile (272×453).
**Companion story:** ACCS Site Visit — Feature / Collection Tile (frontend rendering & UX).
**Note:** This is the tall image tile used as the **leading feature tile** inside carousels (e.g., New Arrivals, Shop by Collection). Authored content — no commerce/catalog data.
**Stream:** EDS Authoring (content model, authoring rules, DA preview).

## INVEST
- **Independent:** authoring/config only; testable on its own.
- **Negotiable:** field set can be refined.
- **Valuable:** lets merchandisers add a promotional lead tile to carousels/sections without code.
- **Estimable:** small, bounded config surface.
- **Small:** one tile's authoring model.
- **Testable:** plain-language AC below.

---

## User Story
**As a** content author / merchandiser,
**I want** to author a feature tile with an image, a heading, and a CTA (label + link),
**so that** I can lead a carousel or section with a promotional tile without developer help.

## Content Model

| Displayed data | Content is sourced from | Required |
|----------------|-------------------------|----------|
| Tile image | EDS | Yes |
| Heading | EDS | Yes |
| CTA label | EDS | Yes |
| CTA link | EDS | Yes |
| Background color (behind image, if image is transparent) | EDS / Code default | No |

- Authored as a block table (e.g., **`Feature Tile`**) or as the lead entry within a parent carousel block.
- **Required fields:** image, heading, CTA label, and CTA link. A feature tile with no image or a CTA with no link is an invalid configuration and must not be publishable.

## Design Specs

**Prose summary:** Tall tile, 272×453 (aspect 3:5), rounded corners (4px), light grey base (#EAEAEC). Product/feature image fills the tile; an overlaid info block (vertical, 16px gap) holds a heading and a text CTA. Heading: Girl Scout Medium(500) 32/38, brown #763A16. CTA: "Shop All Collection", Trefoil Sans 500 16/19, green #005640, with a left+right arrow icon.

**Per-element properties (from Figma):**

| Element | Size (W×H) | Font (family wt size/lh) | Color (hex) | Spacing (pad/gap) | Border / Radius |
|---------|-----------|--------------------------|-------------|-------------------|-----------------|
| Tile (root) | 272×453 | — | bg #EAEAEC | gap 10, vertical | radius 4 |
| Image plate | 259×394 | — | #D5CA9F (placeholder) | — | — |
| Feature image | 272×272 | — | image | — | — |
| Info block | 240×129 | — | — | gap 16, vertical | — |
| Heading | 240×77 | Girl Scout 500 32/38 | #763A16 | — | — |
| CTA container | 153×36 | — | — | pad 8/0/8/0, gap 4, horizontal | — |
| CTA label | 133×20 | Trefoil Sans 500 16/19 | #005640 | — | — |
| CTA arrow icon | 16×16 | — | #005640 | — | — |

## Acceptance Criteria (plain language — verifiable without Figma)

1. An author can add a Feature Tile and enter an image, a heading, a CTA label, and a CTA link.
2. The image, heading, and CTA label the author enters all appear on the tile after publishing.
3. The CTA label links to the URL the author provides.
4. Image, heading, CTA label, and CTA link are all required — the author cannot publish the tile with any of these missing, and a clear validation message is shown when one is missing.
5. The author can preview the tile before publishing, and the preview matches what appears on the live site.

## Dependencies
- DA authoring environment / block registration.
- CTA destination page (e.g., a collection/PLP page) must exist.

## Open Items
- Confirm the block name/table label used in DA.
- Confirm whether the tile is standalone or only used as a carousel lead tile (or both).

## Implementation Notes (developers — not required for QA acceptance)
- Rendered by the EDS block; consider a shared partial with the carousel lead-tile slot.
- Heading color token brown #763A16; CTA green #005640 — map to GSUSA design tokens in styles.css.
