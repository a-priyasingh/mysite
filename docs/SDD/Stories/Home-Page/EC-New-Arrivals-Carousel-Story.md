# EDS + ACCS Story — "New Arrivals" Product Carousel

**Type:** Story
**Component:** EDS Storefront (DA) — Commerce Block
**Related design:** Figma node 6930-252999 — `New Arrivals` (COMPONENT_SET: two options Opton-1 / Opton-2 across Desktop 1280×710, Tablet 768×826/862, Mobile 360×820/856).

---

## User Story
**As a** girlscoutshop.com shopper,
**I want** a "New Arrivals" carousel of the latest products,
**so that** I can discover and shop new items directly from the page.

**As a** merchandiser / content author,
**I want** to configure the heading, the product source, the layout option, and the feature tile,
**so that** I can surface new arrivals without manually maintaining product lists.

---

## Description
Build a **New Arrivals product carousel**: a heading, an optional leading feature tile (label + CTA), and a horizontal scroller of Product Cards, with arrows and a position counter. Two layout options (Opton-1 / Opton-2). This is a **commerce block** — products are fetched from ACCS, not authored as static lists.

---

## Design Specs (from Figma)
- Block width 1280; content max ~1168.
- **Heading**: "New Arrivals" — Girl Scout Light(300) 36/43 (desktop; ~26 on smaller viewports).
- **Feature tile** (leading, `Aspect Ratio 3:5`, 272×453): image with an "info" overlay = label (Girl Scout font) + a CTA button (~153×36).
- **Product row** (`Frame 25162`, ~870×430): horizontal scroller of Product Cards (reuses the shared Product Card block).
- **Slider Arrow**: 40×40 (Arrow Main 24×24 icon); **position counter** "1/5" (Trefoil Sans 400 16).
- **Decorative illustration** strip (bottom).
- GS brand tokens; green `#005640` accents.
- **Layout options** (verified): Opton-1 and Opton-2 (subtle layout differences — confirm which is MVP).
- **Responsive variants** (verified): Desktop 1280×710, Tablet 768×826/862, Mobile 360×820/856 (swipe-first; ~1.5–2 cards visible).

### Hover Details
- **Feature-tile CTA & Product Card**: per the shared Product Card block — image zoom (~1.03–1.05) + quick-add reveal on desktop; always-visible add on mobile.
- **Slider arrows**: hover = green `#005640` fill / white icon (or darken from default); greyed/disabled at ends if not looping; ≥44×44px tap target on mobile.
- **Counter (1/5)**: Left/Right hover highlight; cursor pointer.
- **Global**: respect `prefers-reduced-motion`; every hover has an equivalent keyboard-focus state; swipe-first on mobile.

> Note: no explicit hover-state variants are defined in Figma — hover follows the GS brand green `#005640` and standard convention; confirm with design.

---

## EDS DA Authoring Details

| Displayed data | Content is sourced from | Required |
|----------------|-------------------------|----------|
| Section heading (New Arrivals) | EDS | N |
| Layout option (Opton-1 / Opton-2) | EDS | N |
| Feature-tile image | EDS | N |
| Feature-tile label | EDS | N |
| Feature-tile CTA (label + link) | EDS | N |
| Product source (category / collection / SKU list / new-arrivals rule) | EDS (config) → ACCS | N |
| Max products / autoplay / loop | EDS | N |
| Product card content (image, name, price, rating, badges, swatches) | ACCS (Catalog/Live Search) | N/A (dynamic) |
| Carousel navigation controls (arrows, counter) | Code | N |

- Authored as a block table (e.g., **`New Arrivals`**) in the page document.
- Author sets heading, layout option, feature tile (image + label + CTA), and the **product source** (category/collection/SKU list or a "new arrivals" rule) — not individual product cards.
- Product card content comes from ACCS at runtime.

## Authoring Acceptance Criteria
- [ ] Author can add the block and set the heading and layout option (Opton-1 / Opton-2).
- [ ] Author can configure the product source (category / collection / SKU list / new-arrivals rule) and max product count.
- [ ] Author can set the optional feature tile (image, label, CTA label + link).
- [ ] Author does NOT manually maintain product cards (products come from ACCS).
- [ ] **Graceful blanks:** omitting the heading, feature tile, or CTA does not break the block; an empty/insufficient product result hides the carousel or shows a configured fallback.
- [ ] Preview reflects the block before publish (with live or sample products).

## User Acceptance Criteria
- [ ] Block renders the heading, optional feature tile, and a carousel of product cards fetched from ACCS.
- [ ] Each product card shows image+alt, name, price (and sale price), rating, badges, stock; clicking opens its PDP.
- [ ] Add-to-cart / add-to-list works from cards where enabled.
- [ ] Carousel navigable via arrows (desktop), swipe (mobile), and the "1/5" counter updates.
- [ ] Feature-tile CTA navigates to the authored target.
- [ ] Empty state: 0 products hides the carousel (or shows configured fallback) with no error/gap.
- [ ] Loading state: skeleton/placeholder while fetching; no layout shift.
- [ ] Responsive at Desktop/Tablet/Mobile; keyboard operable with visible focus; slide changes announced (aria-live).
- [ ] WCAG 2.1 AA: region labeled, controls have accessible names, contrast/focus correct; decorative illustration hidden from AT.
- [ ] Performance: loads in lazy/delayed phase, does not block LCP; card images lazy-loaded; meets Lighthouse budget.

## Commerce Data Flow
- **Product list** fetched from ACCS (Catalog Service / Live Search GraphQL) by the configured source (category/collection/SKU list or a new-arrivals rule, e.g., sort by newest / `dam:assetCreated`/created date).
- **Per product** (Product Card fields): image (Adobe Assets), name, regular+sale price, currency, rating, swatches, stock, urlKey, badges.
- **Add-to-cart** → ACCS cart; **add-to-list** → wishlist.
- Feature tile + heading are authored (EDS); depends on **EC-243** attributes exposed via Catalog Service.

## Dependencies
- Product Card block (shared item renderer).
- ACCS Catalog Service / Live Search (product fetch, "newest" ordering).
- **EC-243** — product attributes exposed/searchable.
- Adobe Assets enablement (image URLs).

## Open Items / Assumptions
- Confirm which layout option (Opton-1 / Opton-2) is in MVP scope.
- Confirm the "new arrivals" definition/source (rule vs. curated collection/SKU list).
- Confirm the feature tile's purpose/target (promo vs. "shop all new arrivals").
- Confirm tablet/mobile cards-per-view and whether the counter is retained on mobile.
- Confirm exact hover shades with design (none defined in Figma).
