# EDS + ACCS Story — PLP Filters (Faceted Navigation)

**Type:** Story
**Component:** EDS Storefront (DA) + ACCS Live Search
**Related design:** Figma node 40-13 — PLP "Listing View" pages (desktop/tablet/mobile) and `PLP_Filter popup1/2_Mobile`. Filter UI = collapsible facet groups with dividers, header bar, Apply / Clear actions.
**Backend dependency:** ACCS Live Search (facets) + EC-243 product attributes (must be set "Use in Layered Navigation").

> IMPORTANT FINDING: the `PLP_Filter popup` frames in Figma still contain placeholder content from a car-marketplace template ("Seats", "RTO", "CARS24 HUB"). The filter UI **pattern** is valid, but the actual GSUSA facet list below is derived from the verified GSUSA catalog attributes (metadata schema / EC-243), NOT from the Figma labels. Confirm the final facet set with merchandising.

---

## User Story
**As a** girlscoutshop.com shopper,
**I want** to filter and refine the product list by attributes like grade level, category, size, color, and price,
**so that** I can quickly narrow results to the products I want.

**As a** merchandiser,
**I want** to configure which attributes appear as filters and in what order,
**so that** the PLP filters match the catalog without code changes.

---

## Design Specs (UI pattern from Figma)
- **Desktop**: left filter sidebar alongside the product grid; facet groups are collapsible sections separated by horizontal dividers.
- **Mobile/Tablet**: filters open in a full-screen popup/drawer (`PLP_Filter popup`, 360 wide) with a header bar (title + close), scrollable facet list, and a sticky **Apply** / **Clear All** footer.
- Facet group = group title (collapsible) + list of options (checkbox / swatch / range).
- Applied filters shown as removable chips above the grid; result count updates live.
- GS brand tokens (green `#005640` accents). Tap targets ≥44×44px on mobile.

## Proposed GSUSA Facets (from catalog attributes — CONFIRM with merchandising)
| Facet | Source attribute | Type |
|-------|------------------|------|
| Grade / Program Level | gs:programLevel | Multi-select (Daisy…Ambassador) |
| Category | gs:productCategory | Multi-select (hierarchical) |
| Collection | gs:collection | Multi-select |
| Size | size (variant) | Multi-select / swatch |
| Color | color (variant) | Color swatch |
| Price | price | Range slider / buckets |
| Gender | gs:genderAudience | Multi-select |
| Badge Type | gs:badgeType | Multi-select |
| Availability | inStock | Toggle (In stock only) |
| Rating | rating | Min-rating selector |

## Hover / Touch
- Facet group header: chevron rotate on expand/collapse; hover highlight.
- Checkbox/swatch: hover border highlight; selected = green fill/check.
- Apply button: green darken on press; Clear All: underline/hover.
- Mobile: drawer slides in; focus trapped; ≥44×44px targets; no hover (touch states).

---

## EDS DA Authoring Details
- The filter block is part of the PLP template (auto-blocked), not authored per-page.
- **Facet selection & order** are configured via ACCS Live Search facet settings (which attributes are "Use in Layered Navigation"), not in DA — merchandiser-managed.
- Author/dev may set block-level options in the PLP template doc: show/hide filter sidebar, default-collapsed groups, mobile drawer behavior.

## Authoring Acceptance Criteria
- [ ] Merchandiser can choose which attributes appear as facets and their order via ACCS Live Search config (no code deploy).
- [ ] Facet display type (checkbox / swatch / range / toggle) is configurable per attribute.
- [ ] Adding/removing a searchable attribute in ACCS updates the available facets on the PLP.
- [ ] Template author can toggle sidebar (desktop) vs. drawer (mobile) and default collapsed/expanded groups.
- [ ] Facets with zero matching products are hidden or disabled per config.

## User Acceptance Criteria
- [ ] Shopper can apply one or more filters; the product grid updates to matching results.
- [ ] Multiple facets combine correctly (AND across facets, OR within a facet) and result count updates.
- [ ] Applied filters appear as removable chips; removing a chip updates results; "Clear All" resets.
- [ ] Filter state is reflected in the URL (shareable/bookmarkable) and survives back/forward navigation.
- [ ] Price range and rating filters work; swatches (color/size) select correctly.
- [ ] Mobile: filters open in a drawer; selections apply on "Apply"; drawer is accessible (focus trap, Esc to close).
- [ ] No full page reload — results update in place (client fetch); loading state shown; no layout shift.
- [ ] WCAG 2.1 AA: facet groups have proper labels/`aria-expanded`, checkboxes/swatches are keyboard operable with visible focus, result-count change announced (aria-live).
- [ ] Performance: filter changes meet the agreed SLA; lazy-loaded; does not block LCP.

## Commerce Data Flow
- **Block → ACCS Live Search** `productSearch` query with `filter` inputs + requested `facets`.
- **ACCS → Block**: matching products (see Product Response story) + facet buckets with option labels and counts.
- Facets are driven by attributes flagged searchable/layered-navigation in ACCS (depends on **EC-243**).
- Filter state encoded in the URL; applied to the next query.

## Dependencies
- ACCS Live Search enabled and indexed.
- **EC-243** attributes created and set "Use in Layered Navigation" / searchable.
- Product Listing / Product Response API (sibling story).
- Product Card block (renders results).

## Open Items
- CONFIRM the final GSUSA facet list and order with merchandising (Figma shows placeholder facets).
- Confirm facet display types (swatch vs checkbox) per attribute.
- Confirm price bucketing strategy (range slider vs. predefined buckets).
- Confirm whether filtering is server-driven (Live Search) for all facets or any client-side refinement.
