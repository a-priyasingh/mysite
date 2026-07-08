# Commerce API Story — New Arrivals Product Feed (ACCS GraphQL)

**Type:** Story (Commerce API / ACCS)
**Component:** ACCS — Catalog Service / Live Search
**Related design:** Figma node 6930-252999 — `New Arrivals`.
**Companion stories:** EDS Authoring — New Arrivals config · ACCS Site Visit — New Arrivals rendering & UX.
**Stream:** Commerce API (GraphQL endpoint + response contract that feeds the block).

## INVEST
- **Independent:** the API contract can be built/tested independently of the front-end block.
- **Negotiable:** field set and "new arrivals" definition can be refined.
- **Valuable:** provides the product data the carousel needs in one response.
- **Estimable:** bounded to one query + response shape.
- **Small:** a single feed/query.
- **Testable:** pass/fail Given/When/Then below.

---

## User Story
**As an** EDS storefront developer,
**I want** a GraphQL query that returns the New Arrivals products with all fields the Product Card needs,
**so that** the carousel renders from a single response with no follow-up queries.

## API Contract (target)
**Input:**
- `source` context: `categoryId`/`categoryPath`, OR `collectionId`, OR `skus[]`, OR a "new arrivals" rule (e.g., sort by newest / created date)
- `pageSize` (default e.g. 12)
- visitor/shopper id (optional, for personalization)

**Output — per product (Product Card fields):**
- `sku`, `name`, `urlKey`
- `image { url, label }` (+ hover/gallery images) — Adobe Assets
- `price { regular, sale, currency }`, discount %
- `rating`, `reviewCount` (if available)
- `inStock` / availability
- `options` / swatches (size, color)
- `badges` (New / Best Seller / % Off)

```graphql
query NewArrivals($phrase: String, $filter: [SearchClauseInput!], $sort: [ProductSearchSortInput!], $pageSize: Int) {
  productSearch(phrase: $phrase, filter: $filter, sort: $sort, page_size: $pageSize) {
    items { productView {
      sku name urlKey inStock
      images { url label }
      price { regular { amount { value currency } } sale { amount { value } } }
      rating { average count }
      options { id label values { label value } }
      badges
    } }
    total_count
  }
}
```
(Field names align to the deployed Catalog Service / Live Search schema — confirm exact names.)

## Acceptance Criteria (Given / When / Then)

**Scenario C1 — Category source**
- **Given** a category context is provided
- **When** the query executes
- **Then** it returns that category's products ordered as "new arrivals" (newest first), up to `pageSize`.

**Scenario C2 — Rule-based new arrivals**
- **Given** a "new arrivals" rule (sort by newest/created date) with no explicit list
- **When** the query executes
- **Then** it returns the most recently added products, up to `pageSize`.

**Scenario C3 — Complete card fields**
- **Given** any returned product
- **When** the response is inspected
- **Then** it includes all Product Card fields (image+alt, name, regular+sale price, currency, rating, stock, swatches, urlKey, badges) with no follow-up query required.

**Scenario C4 — Sale/pricing accuracy**
- **Given** a product on sale
- **When** the response is returned
- **Then** regular price, sale price, currency, and discount % are accurate and match the PDP.

**Scenario C5 — Stock handling**
- **Given** out-of-stock or unpublished products
- **When** the query executes
- **Then** they are excluded or flagged per business rule.

**Scenario C6 — Empty result**
- **Given** a source that yields no products
- **When** the query executes
- **Then** it returns `total_count = 0` cleanly (no error), enabling the block's empty state.

**Scenario C7 — Performance**
- **Given** normal load
- **When** the query executes
- **Then** it responds within the agreed SLA (e.g., p95 < 300ms) and is cacheable per context; cache invalidates on catalog/price/index changes.

## Commerce Data Flow
- **Source:** ACCS Live Search (`productSearch`) / Catalog Service.
- Product attributes (image via Adobe Assets, price, rating, swatches, badges, category) depend on **EC-243** attributes being indexed/searchable.
- **Consumer:** the New Arrivals front-end block (ACCS Site Visit story).

## Dependencies
- ACCS Live Search / Catalog Service enabled and indexed.
- **EC-243** — product attributes created, searchable, price/badge fields exposed.

## Open Items
- Confirm exact GraphQL field names against the deployed schema.
- Confirm the "new arrivals" definition (created-date attribute vs. curated collection).
- Confirm SLA and caching/personalization within the performance budget.
