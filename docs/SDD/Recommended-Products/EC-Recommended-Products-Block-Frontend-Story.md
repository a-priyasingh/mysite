# EDS Front-End Story — Recommended Products Block

**Type:** Story
**Component:** EDS Storefront (DA) — Commerce Block
**Related design:** Figma node 40-13 — "Recommended for You" (PDP), reusable for "Complete The Look" and "Frequently Bought Together". Heading: Girl Scout Light(300) 26/31. Layout: horizontal carousel of Product Cards with Slider Arrow (40×40, Arrow Main icon 24×24).
**Backend dependency:** EC — "GraphQL API for Recommended Products" (ACCS Product Recommendations).

---

## User Story
**As a** girlscoutshop.com shopper,
**I want** a "Recommended for You" carousel of relevant products on the PDP (and other placements),
**so that** I can discover and navigate to products I'm likely to want.

**As a** content author,
**I want** to place a Recommended Products block and choose which recommendation type and heading it shows,
**so that** I can add personalized merchandising to a page without managing product lists.

---

## Description
Build an EDS **Recommended Products** block that calls the ACCS recommendations GraphQL API and renders the returned products as a horizontal carousel of Product Cards. The block is reused across placements ("Recommended for You", "Complete The Look", "Frequently Bought Together") by selecting a recommendation type. It consumes the API defined in the backend story — no client-side data stitching or follow-up queries.

This is a **commerce block**: it renders dynamic product data fetched at runtime, not authored product content.

---

## Design Specs (verified from Figma)
- **Section heading**: Girl Scout Light(300) 26/31, black. Optional subheading row.
- **Layout**: horizontal carousel; ~4 Product Cards visible on desktop, ~1.5–2 (peek) on mobile.
- **Slider arrows**: circular 40×40 (Arrow Main icon 24×24), GS green `#005640`.
- **Product Card**: reuses the shared Product Card block (image, name, price, sale price, rating, swatches, badges, add-to-cart/list).
- **Mobile**: swipe-first; arrows smaller/hidden; add-to-cart always visible (no hover reveal).

## Hover/Touch
- Slider arrows: green fill + white icon on hover; disabled/greyed at ends if not looping; ≥44×44px tap target on mobile.
- Product Card hover/touch behavior per the Product Card block (image zoom, quick-add reveal on desktop / always-visible on mobile).
- Respect `prefers-reduced-motion` (no autoplay/transition).

---

## EDS DA Authoring Details
- Authored as a block table (e.g., **`Recommended Products`**) placed in the page document (or auto-blocked into the PDP template).
- Author-configurable cells:
  - **Recommendation Type** (dropdown: Recommended for You / Complete The Look / Frequently Bought Together / More Like This)
  - **Heading** (text, e.g., "Recommended for You")
  - **Max products** (number, default ~12)
  - **Context** (auto on PDP = current SKU; optional category/collection override)
  - **Fallback** (hide section, or show a default collection) when 0 results
- On PDP, the block auto-derives the current product SKU as context — author does not enter SKUs.

## Authoring Acceptance Criteria
- [ ] Author can add the Recommended Products block to a page/template via DA.
- [ ] Author can select the recommendation type and set the heading per placement.
- [ ] Author can set max products and the empty-state fallback.
- [ ] On a PDP, the block automatically uses the current product as context with no manual SKU entry.
- [ ] Author does NOT manage individual product lists (products come from the recommendation service).
- [ ] Preview reflects the configured block before publish (with live or sample recommendations).

## User Acceptance Criteria
- [ ] Block renders a carousel of recommended Product Cards fetched from the ACCS GraphQL API.
- [ ] Each card shows image+alt, name, price (and sale price), rating, badges, and stock state; clicking a card opens its PDP.
- [ ] Add-to-cart / add-to-list works directly from cards where enabled.
- [ ] Carousel navigable via arrows (desktop) and swipe (mobile); keyboard operable with visible focus; slide changes announced (aria-live).
- [ ] Empty state: when the API returns 0 items, the section hides (or shows configured fallback) with no error or empty gap.
- [ ] Loading state: a skeleton/placeholder shows while fetching; no layout shift (reserve space).
- [ ] Performance: block loads in the lazy/delayed phase, does NOT block LCP, and lazy-loads card images; meets Lighthouse budget (target 100).
- [ ] WCAG 2.1 AA: carousel region labeled, controls have accessible names, contrast and focus correct.
- [ ] Errors handled gracefully: API failure hides the section (or shows fallback) without breaking the page.

## Commerce Data Flow
- **Block → ACCS GraphQL** (recommendations query) with context (SKU/category/cart, type, pageSize, visitor id).
- **API → Block**: ranked product list with all Product Card fields (image from Adobe Assets, name, regular+sale price, rating, swatches, stock, urlKey, badges, ranking position).
- **Add-to-cart** posts to the ACCS cart; **add-to-list** posts to wishlist.
- **Analytics**: impression + click events include recommendation unit id and position (for measurement).
- Product attributes depend on **EC-243** attributes being exposed via Catalog Service.

---

## Dependencies
- **Backend story** — ACCS GraphQL API for Recommended Products (must be available; ACCS Product Recommendations license CONFIRMED).
- **Product Card block** — shared item renderer (build first / in parallel).
- **EC-243** — product attributes exposed (image, price, rating, swatches, badges).
- Adobe Assets enablement (image URLs resolvable).

## Open Items / Assumptions
- Confirm placements for MVP (PDP only, or also cart/home/PLP).
- Confirm whether the three recommendation types ship together or phased.
- Confirm analytics event spec (impression/click) with the measurement team.
- Confirm loading-phase placement (lazy vs delayed) against the performance budget.
