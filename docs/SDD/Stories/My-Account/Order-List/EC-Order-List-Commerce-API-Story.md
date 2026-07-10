# Commerce API Story — My Account: Order History Data (ACCS GraphQL)

**Type:** Story (Commerce API / ACCS)
**Component:** ACCS — Customer / Order APIs
**Related design:** Figma node 6720-230980 — `Orderlist_VariantA_Desktop`.
**Companion stories:** EDS Authoring — Order List page shell · ACCS Site Visit — Order List rendering & UX.
**Stream:** Commerce API (data the Order List consumes).

## INVEST
- **Independent:** the order-history endpoint can be built/tested independent of the page UI.
- **Negotiable:** payload fields, paging, and filters can be refined.
- **Valuable:** provides the signed-in shopper's real order history to the page.
- **Estimable:** one authenticated query with paging/search.
- **Small:** order-list data only (order detail is a separate page/story).
- **Testable:** plain-language AC below.

---

## User Story
**As an** EDS storefront developer,
**I want** an authenticated API that returns the signed-in customer's orders with the fields shown on each order card, plus search and paging,
**so that** the Order List page can display order history without extra calls.

## Data the page consumes (per order summary)
- Order number / ID
- Order date (placed date)
- Order status (e.g., Processing, Shipped, Delivered, Cancelled)
- Order total (amount + currency)
- Item count and item thumbnails/names (as shown on the card)
- Actions available (View order / Reorder / Track) as applicable
- Paging metadata; search/filter by product or order

## Acceptance Criteria (plain language — verifiable without Figma)

1. When a signed-in customer opens the Order List, the API returns that customer's orders, most recent first.
2. Each order returned includes at least: order number, order date, status, total (with currency), and item count.
3. A guest (not signed in) is not shown another customer's orders — the API requires authentication and returns no orders (or an auth error the page can handle) when not signed in.
4. When the customer searches by product or order, the API returns only matching orders.
5. When the customer has many orders, results are paged and the next page can be requested without duplicates.
6. When the customer has no orders, the API returns an empty result cleanly (no error) so the page can show an empty state.
7. Order totals and statuses returned match what the customer sees on the order and on the order-detail page.
8. The order data loads without blocking the rest of the page from appearing.

## Commerce Data Flow
- **Source:** ACCS customer/order APIs (GraphQL), scoped to the authenticated customer (Okta/IMS session).
- Product thumbnails/names on cards resolve from the catalog (images via Adobe Assets).
- Depends on **EC-243** for any product attributes surfaced on the cards.
- **Consumer:** Order List page (ACCS Site Visit story); links to Order Detail (separate story).

## Dependencies
- ACCS customer authentication (Okta/IMS) and order service.
- Order Detail page/story (destination for "View order").

## Open Items
- Confirm the exact order-card fields and available actions (View / Reorder / Track).
- Confirm search scope (by product, order number, date range) and paging size.
- Confirm status vocabulary and how returns/partial shipments appear.

## Implementation Notes (developers — not required for QA acceptance)
- Authenticated GraphQL query; cache per-customer with care (no cross-customer leakage). Confirm exact schema field names against the deployed ACCS customer/order APIs.
