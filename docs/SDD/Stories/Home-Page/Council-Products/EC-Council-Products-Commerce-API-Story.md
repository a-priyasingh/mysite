# Commerce API Story — Council Products Feed (ACCS GraphQL)

**Type:** Story (Commerce API / ACCS)
**Component:** ACCS — Catalog Service / Live Search (council-scoped)
**Related design:** Figma node 2758-55140 — `Council Products-B2C/Leader`.
**Companion stories:** EDS Authoring — Council Products config · ACCS Site Visit — Council Products rendering & UX.
**Stream:** Commerce API (GraphQL endpoint + response contract + council resolution).

## INVEST
- **Independent:** API contract buildable/testable independent of the front-end.
- **Negotiable:** council-scoping mechanism and field set can be refined.
- **Valuable:** returns the council-specific products the block needs.
- **Estimable:** one query + council-resolution concern.
- **Small:** a single feed.
- **Testable:** pass/fail Given/When/Then below.

---

## User Story
**As an** EDS storefront developer,
**I want** a GraphQL query that returns products for a given council, plus a way to resolve council options,
**so that** the Council Products carousel renders council-scoped products from a single response.

## API Contract (target)
**Council resolution (input options):**
- `councilId` / `councilCode` (from user context or explicit selection)
- OR zip/geolocation → resolve to a council
- List of councils (for the selector dropdown): id, name, code

**Product query input:**
- `councilId` (required for the product feed)
- `persona` (B2C / Leader) — may affect pricing/availability
- `pageSize` (default e.g. 12)

**Output — per product (Product Card fields):**
- `sku`, `name`, `urlKey`, image (+ hover/gallery, Adobe Assets)
- `price { regular, sale, currency }`, discount %
- `rating`, `reviewCount` (if available)
- `inStock`, `options` (size/color swatches), `badges`

```graphql
query CouncilProducts($councilFilter: [SearchClauseInput!], $pageSize: Int) {
  productSearch(filter: $councilFilter, page_size: $pageSize) {
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
(Council scoping via a `gs:council` / council-catalog attribute filter — confirm exact schema.)

## Acceptance Criteria (Given / When / Then)

**Scenario C1 — Council list for selector**
- **Given** the block needs council options
- **When** the councils query executes
- **Then** it returns available councils (id, name, code) for the dropdown.

**Scenario C2 — Resolve council from context/zip**
- **Given** a signed-in user's council context or a zip/geolocation
- **When** resolution runs
- **Then** it returns the matching councilId (or a clear "no match" so the UI can prompt selection).

**Scenario C3 — Council product feed**
- **Given** a councilId
- **When** the product query executes
- **Then** it returns that council's products, up to `pageSize`, scoped to the council catalog/attribute.

**Scenario C4 — Complete card fields**
- **Given** any returned product
- **When** the response is inspected
- **Then** it includes all Product Card fields (image+alt, name, regular+sale price, currency, rating, stock, swatches, urlKey, badges) with no follow-up query.

**Scenario C5 — Persona effect**
- **Given** a persona (B2C / Leader)
- **When** the query executes
- **Then** pricing/availability reflect that persona where applicable.

**Scenario C6 — Empty / invalid council**
- **Given** a council with no products or an unresolved council
- **When** the query executes
- **Then** it returns `total_count = 0` cleanly (no error), enabling the block's empty/prompt state.

**Scenario C7 — Performance**
- **Given** normal load
- **When** the query executes
- **Then** it responds within the agreed SLA and is cacheable per council; cache invalidates on catalog/price/index changes.

## Commerce Data Flow
- **Source:** ACCS Live Search / Catalog Service, filtered by council (`gs:council` / council catalog).
- Council resolution from user context, selection, or zip/geolocation.
- Product attributes depend on **EC-243** (incl. `gs:council`, `gs:councilIds`) exposed/indexed.
- **Consumer:** Council Products front-end block (ACCS Site Visit story).

## Dependencies
- ACCS Live Search / Catalog Service; council catalog/attribute configured.
- **EC-243** — council attributes + product fields exposed.
- Council data source (list, and context/zip resolution).

## Open Items
- Confirm the council-scoping mechanism (dedicated council catalogs vs. `gs:council` attribute filter).
- Confirm council resolution inputs (user context, zip, geolocation) and precedence.
- Confirm persona (B2C/Leader) impact on pricing/availability.
- Confirm exact GraphQL field names against the deployed schema.
