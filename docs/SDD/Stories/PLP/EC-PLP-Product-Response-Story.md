# ACCS Story — PLP Product Listing Response (Live Search GraphQL)

**Type:** Story
**Component:** ACCS — Live Search / Catalog Service
**Related design:** Figma node 40-13 — PLP Listing View (grid of Product Cards, "Load more…", result count, sort). Pairs with the PLP Filters story.

---

## User Story
**As an** EDS storefront developer,
**I want** a GraphQL product-listing response that returns the products for a category/search/filter context with all fields the Product Card needs (plus facets, sort, and pagination),
**so that** the PLP renders the grid, filters, sort, and paging from a single response without follow-up queries.

---

## Description
Expose the ACCS **Live Search `productSearch` GraphQL** (and/or Catalog Service `products`) to power the PLP. One query returns: the matching product list (paged), the facet buckets for the filter sidebar, the available sort options, and pagination metadata. The response must match the Product Card contract so cards render directly.

---

## API Contract (target)

**Input:**
- `phrase` (search term; empty for category browse)
- `categoryId` / `categoryPath`
- `filter` (array of facet selections: attribute + values/range)
- `sort` (e.g., RELEVANCE, PRICE_ASC, PRICE_DESC, NEWEST, BEST_SELLER, RATING)
- `pageSize` (default e.g. 24), `currentPage`
- visitor/shopper id (personalized ranking)

**Output:**
- `total_count`
- `items[]` — per product (Product Card fields):
  - `sku`, `name`, `urlKey`
  - `image { url, label }` (Adobe Assets)
  - `price { regular, sale/special, currency }`
  - `rating`, `reviewCount`
  - `inStock` / availability
  - `options` / swatches (color/size variants)
  - `badges` (New / Sale)
  - `productType` (simple/configurable)
- `facets[]` — per facet: `attribute`, `label`, `buckets[{ label, value, count }]` (for the filter sidebar)
- `sortFields[]` — available sort options + current
- `page_info { current_page, page_size, total_pages }`

Example shape:
```graphql
query PlpSearch($phrase: String, $filter: [SearchClauseInput!], $sort: [ProductSearchSortInput!], $pageSize: Int, $currentPage: Int) {
  productSearch(phrase: $phrase, filter: $filter, sort: $sort, page_size: $pageSize, current_page: $currentPage) {
    total_count
    items {
      productView {
        sku name urlKey inStock
        images { url label }
        price { regular { amount { value currency } } sale { amount { value } } }
        rating { average count }
        options { id label values { label value } }
        badges
      }
    }
    facets { attribute title buckets { title __typename ... on ScalarBucket { count } } }
    page_info { current_page page_size total_pages }
  }
}
```
(Field names align to the deployed Live Search/Catalog Service schema — confirm exact names.)

---

## Authoring Acceptance Criteria
- [ ] Merchandiser controls which attributes are returned as facets via ACCS Live Search config (ties to PLP Filters story).
- [ ] Sort options are configurable in ACCS without code changes.
- [ ] Default sort and page size are configurable per storefront/category.
- [ ] Category-to-PLP mapping resolves from the ACCS catalog category structure.

## User Acceptance Criteria
- [ ] A category browse (no phrase) returns the correct products for that category, paged.
- [ ] A search phrase returns relevant products ranked by Live Search.
- [ ] Applying filters narrows `items` and updates `facets` counts accordingly.
- [ ] Each item includes all Product Card fields (image+alt, name, regular+sale price, currency, rating, stock, swatches, badges, urlKey) — verified by rendering the grid with no follow-up queries.
- [ ] Sort changes reorder results correctly (price asc/desc, newest, best-seller, rating, relevance).
- [ ] Pagination / "Load more" works: `page_info` drives next-page fetch; no duplicates.
- [ ] Out-of-stock / unpublished products handled per business rule (excluded or flagged).
- [ ] Empty state: a query with 0 results returns cleanly with `total_count = 0` (drives "No results" UI).
- [ ] Prices/currency/sale prices accurate and consistent with PDP.
- [ ] Performance: p95 within agreed SLA; response cacheable per context; cache invalidates on catalog/price/index changes.

## Commerce Data Flow
- **Source:** ACCS Live Search (`productSearch`) for ranking/facets + Catalog Service for product attributes.
- **Product attributes** (image, price, rating, swatches, badges) resolve from the ACCS catalog — depends on **EC-243** attributes being indexed/searchable.
- **Images** from Adobe Assets via catalog asset references.
- **Facets** returned for the filter sidebar (PLP Filters story consumes them).
- **Consumer:** EDS PLP grid block + Filter block + Sort + Pagination render from this single response.

## Dependencies
- ACCS Live Search enabled, catalog indexed.
- **EC-243** — product attributes created, searchable, and (for facets) layered-navigation enabled.
- Product Card block (renders items).
- PLP Filters story (consumes `facets`).

## Open Items
- Confirm exact GraphQL schema field names against deployed Live Search / Catalog Service.
- Confirm sort options list for MVP.
- Confirm page size and "Load more" vs. numbered pagination (Figma shows "Load more…").
- Confirm caching/personalization strategy within the performance budget (Lighthouse 100 target).
