# ACCS Story — GraphQL API for Recommended Products

**Type:** Story
**Component:** ACCS — Catalog / Product Recommendations
**Related design:** Figma node 40-13 — "Recommended for You" (PDP), plus sibling units "Complete The Look" and "Frequently Bought Together". Heading style: Girl Scout Light(300) 26/31. Renders as a horizontal carousel of Product Cards.

---

## User Story
**As a** girlscoutshop.com shopper,
**I want** to see a "Recommended for You" set of products on the PDP (and other pages),
**so that** I can discover relevant items and continue shopping.

**As an** EDS storefront developer,
**I want** a GraphQL API that returns recommended products with all fields the Product Card needs,
**so that** the Recommended Products block can render without extra round-trips or client-side data stitching.

---

## Description
Expose a **GraphQL API in ACCS that returns recommended products** for a given context (current product / category / cart / shopper), to power the "Recommended for You" carousel on the PDP and reusable recommendation units ("Complete The Look", "Frequently Bought Together").

Adobe Commerce provides **Product Recommendations** (Adobe Sensei–powered) consumed via the recommendations GraphQL/Catalog service. This story covers configuring the recommendation unit(s), exposing the GraphQL query, and returning a payload that matches the Product Card contract so the EDS block can render directly.

> Implementation note: prefer the managed **Product Recommendations** service / Catalog Service GraphQL over a hand-built resolver, unless a custom recommendation rule is required. Confirm which recommendation engine/types are licensed for GSUSA.

---

## Scope
- One GraphQL query (or recommendations unit) that returns a ranked list of recommended products for an input context.
- Recommendation **types** to support (configurable per placement): `recommended-for-you`, `more-like-this`/`related` (Complete The Look), `bought-together` (Frequently Bought Together). Confirm final set with merchandising.
- Returned fields sufficient to render the Product Card with **no follow-up queries**.

### Out of scope
- The EDS block/UI rendering (separate front-end story).
- Add-to-cart mutation (existing cart story).
- Training/tuning the recommendation model.

---

## API Contract (target)

**Input (context):**
- `sku` (current product, for PDP recommendations) — optional
- `categoryId` / `categoryPath` — optional
- `cartId` — optional (for cart-based recs)
- `recommendationType` (enum: RECOMMENDED_FOR_YOU, COMPLETE_THE_LOOK, BOUGHT_TOGETHER, MORE_LIKE_THIS)
- `pageSize` (default e.g. 12), `pageType` (PDP/PLP/CART/HOME)
- shopper/visitor id (anonymous or authenticated) for personalization

**Output — per recommended product (fields required by Product Card):**
- `sku`, `name`, `urlKey` (PDP link)
- `image` (Adobe Assets URL) + `imageAltText`
- `price` (regular) and `salePrice`/`specialPrice` (+ currency)
- `rating` / `reviewCount` (if available)
- `inStock` / availability status
- `swatches` / configurable options (color/size) — if applicable
- promo `badges` (New / Sale)
- `recommendationUnitId` / ranking position (for analytics)

Example shape:
```graphql
query Recommendations($type: RecommendationType!, $sku: String, $pageSize: Int) {
  recommendations(type: $type, sku: $sku, pageSize: $pageSize) {
    unitId
    items {
      sku
      name
      urlKey
      image { url label }
      price { regular { amount { value currency } } sale { amount { value } } }
      rating { average count }
      inStock
      options { label values }   # swatches/variants
      badges
    }
  }
}
```
(Field names align to the chosen ACCS service schema — confirm exact names in implementation.)

---

## Authoring Acceptance Criteria
- [ ] A recommendation unit can be configured per placement (PDP "Recommended for You", "Complete The Look", "Frequently Bought Together") via the ACCS admin / recommendations console.
- [ ] Author/merchandiser can select the **recommendation type** and `pageSize` for each placement without code changes.
- [ ] The EDS block author can point a Recommended Products block at a placement/unit (by type) and a heading, with no need to manage product lists manually.
- [ ] Fallback behavior is configurable when no recommendations are returned (hide section, or show a default collection).

## User Acceptance Criteria
- [ ] On a PDP, the GraphQL query returns a ranked list of recommended products relevant to the current SKU.
- [ ] Each returned product includes all fields the Product Card needs (image+alt, name, price, sale price, rating, stock, swatches, url key, badges) — verified by rendering the carousel with no follow-up queries.
- [ ] Out-of-stock / unpublished products are excluded (or flagged) per business rule.
- [ ] Prices, currency, and sale prices are accurate and match the PDP.
- [ ] Personalization: signed-in vs anonymous shoppers receive appropriate recommendations (no PII leakage in the payload).
- [ ] Empty state handled: when the unit returns 0 items, the API responds cleanly and the block hides without error.
- [ ] Performance: query responds within the agreed SLA (e.g., p95 < 300ms) and supports the home/PLP/PDP placements without blocking LCP (lazy-loaded).
- [ ] Caching: response is cacheable per context where appropriate; cache invalidates on catalog/price changes.

## Commerce Data Flow
- **Source:** ACCS Product Recommendations service (Adobe Sensei) + Catalog Service for product attributes.
- **Product attributes** (image, price, rating, swatches, stock, badges) resolve from the ACCS catalog — depends on the attributes configured in **EC-243** (custom product attributes) being searchable/exposed.
- **Images** resolve from Adobe Assets (DAM) via the catalog asset reference.
- **Personalization signals** (browsing/cart/visitor id) feed the recommendation engine.
- **Consumer:** EDS "Recommended Products" block calls this GraphQL endpoint and renders Product Cards.

---

## Dependencies
- **EC-243** — custom product attributes must exist and be exposed via Catalog Service (image, price, rating, swatches, badges).
- Adobe Assets enablement (image URLs resolvable).
- Product Recommendations service licensed/enabled for GSUSA (confirm).
- Product Card block (front-end) — consumer of this API.

## Open Items / Assumptions
- Confirm GSUSA has **Adobe Commerce Product Recommendations** licensed, or whether a custom rule-based recommendation is required.
- Confirm which recommendation **types** are in scope for MVP (Recommended for You vs. Complete The Look vs. Frequently Bought Together).
- Confirm exact GraphQL schema field names against the deployed ACCS services (Catalog Service / Live Search / Recommendations).
- Confirm personalization requirements and any privacy constraints for anonymous vs. authenticated shoppers.
- Confirm SLA and caching strategy with the front-end performance budget (Lighthouse 100 target).
