# EDS + ACCS Story — Product Listing Page (PLP)

**Type:** Story (Page-level / assembly)
**Component:** EDS Storefront (DA) — Commerce Page
**Related design:** Figma node 5168-280240 — `PLP_VariationB_Desktop` (1280×4985), plus responsive tablet/mobile PLP frames.
**Scope note:** This is the **page-level assembly** story. It composes several blocks that have their own stories: Header, Breadcrumb, Inner-Page Banner, PLP Filters, Product Listing Response, Product Card, Pagination, a recommendations carousel, and Footer. This story covers the PLP layout, composition, and page-level behavior; block internals live in their own stories.

---

## User Story
**As a** girlscoutshop.com shopper,
**I want** a category product listing page with a banner, filters, sort, a product grid, and pagination,
**so that** I can browse, refine, and navigate a category's products and open any product's PDP.

**As a** merchandiser,
**I want** the PLP to assemble from ACCS category data with a category-targeted banner and configurable facets,
**so that** each category page is relevant and consistent without bespoke page building.

---

## Page Composition (from Figma, top → bottom)
1. **Header** (1280×180) — global nav/search/cart. *(see Header/Search/Navigation stories)*
2. **Breadcrumb** (1280×40) — Home > category path. *(see Breadcrumb story)*
3. **Inner-Page Banner** (1280×320) — category-targeted top promo banner. *(see PLP Top Promo Banner story)*
4. **Category header**: title (e.g., "Daisy (Grades K-1)", Girl Scout 40) + description (Trefoil Sans 18).
5. **Main listing** (`Cards`, 1168 wide):
   - **Left filter sidebar** (~296) — faceted navigation. *(see PLP Filters story)*
   - **Right column** (~848): **sort/results toolbar** (result count + Sort By) → **product grid** (Product Cards) → **Pagination** (848×40). *(see Product Listing Response, Product Card, Pagination)*
6. **Recommendations carousel** — "New Finds & Deals" (1280×776). *(see Product Carousel / Recommended Products)*
7. **Footer** (1280×675). *(see Header/Footer story)*

---

## Design Specs (from Figma)
- Desktop page width 1280; content max ~1168.
- **Category title**: Girl Scout ~40; **description**: Trefoil Sans ~18.
- **Layout**: left filter sidebar (~296) + right content (~848) on desktop; grid of Product Cards; pagination below.
- **Variation B** shown (confirm which PLP variation is MVP; e.g., grid vs list view toggle).
- GS brand tokens; green `#005640` accents.
- **Responsive**: filters collapse to a drawer on tablet/mobile; grid reflows to fewer columns; sort/results toolbar adapts. (See PLP Filters story for the drawer.)

### Hover / Touch
- Delegated to the composed blocks (Product Card hover = image swap + Add to Cart; filter/sort/pagination hover states per their stories).
- **Global**: respect `prefers-reduced-motion`; keyboard-operable throughout; ≥44×44px tap targets on mobile.

---

## EDS DA Authoring Details

| Displayed data | Content is sourced from | Required |
|----------------|-------------------------|----------|
| Category title | ACCS (Catalog category) | N/A (dynamic) |
| Category description | ACCS (Catalog) / EDS (optional override) | N |
| Inner-page banner (image, heading, CTA) | EDS (category-targeted) | N |
| Filters / facets | ACCS Live Search (config) | N/A |
| Sort options | ACCS (config) | N/A |
| Product grid (cards) | ACCS (Catalog / Live Search) | N/A (dynamic) |
| Pagination | Code + ACCS | N/A |
| Recommendations carousel source | EDS (config) → ACCS | N |
| Header / Footer | EDS (`/nav`, `/footer`) | N/A |

- The PLP is a **template-assembled commerce page**; products, facets, sort, and category data come from ACCS at runtime.
- Authorable pieces: the **category-targeted banner** (per the PLP Top Promo Banner story), optional category description override, and the recommendations carousel source.
- Facets/sort are configured in ACCS Live Search (merchandiser), not per page.

## Authoring Acceptance Criteria
- [ ] The PLP renders for any ACCS category via the template (no bespoke page build per category).
- [ ] Merchandiser can set a category/sub-category/child-targeted top banner (per the PLP Top Promo Banner story), with inheritance/override.
- [ ] Author can optionally override the category description.
- [ ] Facets, sort options, and page size are configured via ACCS Live Search (not per-page authoring).
- [ ] Recommendations carousel source is configurable.
- [ ] Header, breadcrumb, and footer render from their global sources without per-page authoring.

## User Acceptance Criteria
- [ ] Page renders header, breadcrumb, banner, category title/description, filters, sort toolbar, product grid, pagination, recommendations, and footer per design.
- [ ] Grid shows the category's products (Product Cards) from ACCS; clicking a card opens its PDP.
- [ ] Filters refine the grid; sort reorders it; pagination navigates pages — all without full page reload (results update in place).
- [ ] Result count reflects the active filter/category context.
- [ ] Breadcrumb reflects the category path; banner reflects the category (targeted).
- [ ] Empty state: a category/filter combination with no products shows a "no results" state (no broken layout).
- [ ] Responsive: filters become a drawer; grid reflows; toolbar adapts at tablet/mobile.
- [ ] Deep-linkable: filter/sort/page state encoded in the URL (shareable, back/forward works).
- [ ] Keyboard + screen reader operable across all regions; visible focus; result-count changes announced (aria-live).
- [ ] WCAG 2.1 AA across the page; landmarks (header, nav, main, footer); sufficient contrast.
- [ ] Performance: banner image is likely LCP (optimized/eager); grid images lazy-loaded; recommendations + below-fold content lazy/delayed; Lighthouse target respected.

## Commerce Data Flow
- **Category context** (id/path, title, description) ← ACCS Catalog.
- **Product grid + facets + sort + pagination** ← ACCS Live Search `productSearch` (see Product Listing Response story) — one response drives grid, facets, sort, and page info.
- **Product Card** data per item ← ACCS (image from Adobe Assets, name, price, badges, swatches, stock, urlKey).
- **Banner** targeting resolves from the current category (see PLP Top Promo Banner story).
- **Recommendations** ← ACCS recommendations/Live Search.
- Depends on **EC-243** attributes (category, facets, price, badges, variants) exposed via Catalog Service.
- Emits analytics per the PLP tagging plan (`view_item_list`, `select_item`, filter/sort events, `add_to_cart`).

## Dependencies (composed blocks — see their stories)
- Header, Search Bar, Navigation, Breadcrumb, Footer.
- PLP Filters (faceted navigation).
- Product Listing Response (Live Search GraphQL).
- Product Card (grid items).
- Pagination / Sort toolbar.
- PLP Top Promo Banner (category-targeted).
- Product Carousel / Recommended Products ("New Finds & Deals").
- **EC-243** — product attributes exposed/searchable.

## Open Items / Assumptions
- Confirm which PLP variation is MVP (Variation B shown; is there a grid/list view toggle?).
- Confirm the sort options list and default sort per category.
- Confirm page size and "Load more" vs. numbered pagination (this frame shows a Pagination component).
- Confirm the recommendations carousel placement/source on PLP.
- Confirm B2C vs Council vs B2B PLP differences (pricing, actions) — persona handling.
