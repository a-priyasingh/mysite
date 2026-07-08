# Commerce API Story — Shop by Troop Year Plans (Leader) Feed (ACCS GraphQL)

**Type:** Story (Commerce API / ACCS)
**Component:** ACCS — Catalog Service / Live Search
**Related design:** Figma node 2767-30801 — `Shop by Troop Year Plans-Leader`.
**Companion stories:** EDS Authoring — Troop Year Plans (Leader) config · ACCS Site Visit — Troop Year Plans (Leader) rendering & UX.
**Stream:** Commerce API (GraphQL endpoint + response contract).

## INVEST
- **Independent:** API contract buildable/testable independent of the front-end.
- **Negotiable:** the level+year scoping mechanism and field set can be refined.
- **Valuable:** returns the correct materials per level + troop year.
- **Estimable:** one query keyed by level + year.
- **Small:** a single feed.
- **Testable:** pass/fail Given/When/Then below.

---

## User Story
**As an** EDS storefront developer,
**I want** a GraphQL query that returns products for a given grade level and troop year with all Product Card fields,
**so that** the Leader Troop Year Plans carousel renders from a single response.

## API Contract (target)
**Input:**
- `programLevel` (Daisy…Ambassador) — required
- `troopYear` (e.g., Year 1 / Year 2) — required
- `source` context: category / collection / SKU list / rule mapped to level+year
- `persona = Leader`
- `pageSize` (default e.g. 12)

**Output — per product (Product Card fields):** `sku`, `name`, `urlKey`, image (+hover/gallery, Adobe Assets), `price { regular, sale, currency }`, discount %, `rating`, `reviewCount`, `inStock`, `options` (size/color), `badges`.

```graphql
query TroopYearPlans($filter: [SearchClauseInput!], $pageSize: Int) {
  productSearch(filter: $filter, page_size: $pageSize) {
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
(Level+year scoping via `gs:programLevel` + a troop-year attribute/collection filter — confirm exact schema.)

## Acceptance Criteria (Given / When / Then)

**Scenario C1 — Level + year feed**
- **Given** a `programLevel` and `troopYear`
- **When** the query executes
- **Then** it returns that level+year's product set, up to `pageSize`.

**Scenario C2 — Level list / year options**
- **Given** the block needs selectable levels/years
- **When** options are requested
- **Then** the available levels and troop-year tabs are returned (or provided by config).

**Scenario C3 — Complete card fields**
- **Given** any returned product
- **When** the response is inspected
- **Then** it includes all Product Card fields (image+alt, name, regular+sale price, currency, rating, stock, swatches, urlKey, badges) with no follow-up query.

**Scenario C4 — Persona (Leader)**
- **Given** `persona = Leader`
- **When** the query executes
- **Then** pricing/availability reflect the Leader persona where applicable.

**Scenario C5 — Empty result**
- **Given** a level+year with no products
- **When** the query executes
- **Then** it returns `total_count = 0` cleanly (no error), enabling the block's empty state.

**Scenario C6 — Sale/pricing accuracy**
- **Given** a product on sale
- **When** returned
- **Then** regular price, sale price, currency, and discount % are accurate and match the PDP.

**Scenario C7 — Performance**
- **Given** normal load
- **When** the query executes
- **Then** it responds within the agreed SLA and is cacheable per level+year; cache invalidates on catalog/price/index changes.

## Commerce Data Flow
- **Source:** ACCS Live Search / Catalog Service, filtered by `gs:programLevel` + troop-year attribute/collection.
- Product attributes depend on **EC-243** (incl. `gs:programLevel`) exposed/indexed.
- **Consumer:** the Leader Troop Year Plans front-end block (ACCS Site Visit story).

## Dependencies
- ACCS Live Search / Catalog Service enabled and indexed.
- **EC-243** — program-level + troop-year attributes and product fields exposed.

## Open Items
- Confirm the troop-year scoping mechanism (attribute vs. curated collection per level+year).
- Confirm level list and troop-year values.
- Confirm Leader persona impact on pricing/availability.
- Confirm exact GraphQL field names against the deployed schema.
