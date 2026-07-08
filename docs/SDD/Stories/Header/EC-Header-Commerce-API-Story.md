# Commerce API Story — Header (Cart / Account / Search State)

**Type:** Story (Commerce API / ACCS)
**Component:** ACCS — Cart / Customer / Live Search
**Related design:** Figma node 2697-345643 — `Header` (cart icon w/ count, account, search).
**Companion stories:** EDS Authoring — Header content · ACCS Site Visit — Header rendering & UX.
**Stream:** Commerce API (data the header icons consume).

## INVEST
- **Independent:** the header data endpoints can be built/tested independent of header markup.
- **Negotiable:** payload fields and refresh strategy can be refined.
- **Valuable:** provides live cart count, account state, and search entry the header needs.
- **Estimable:** three bounded data concerns (cart, account, search-suggest).
- **Small:** header-consumed data only.
- **Testable:** pass/fail Given/When/Then below.

---

## User Story
**As an** EDS storefront developer,
**I want** the header to obtain live cart count, signed-in account state, and search suggestions from ACCS,
**so that** the header reflects the shopper's real session and search works.

## Data the header consumes
- **Cart count**: number of items in the ACCS cart (live).
- **Account/auth state**: signed-in vs. guest (to toggle account label/links); persona (Guest/Caregiver/Leader) where applicable.
- **Search suggestions**: type-ahead results (products/terms) — detailed in the Search Bar Commerce contract.
- **Mini-cart / Cart popup data**: line items + subtotal (per the Cart Popup story) if the cart icon opens the popup.

## Acceptance Criteria (Given / When / Then)

**Scenario C1 — Cart count**
- **Given** items exist in the ACCS cart
- **When** the header loads (or the cart changes)
- **Then** the cart icon badge reflects the current item count.

**Scenario C2 — Cart count updates**
- **Given** the shopper adds/removes an item elsewhere
- **When** the cart mutates
- **Then** the header cart count updates without a full page reload.

**Scenario C3 — Empty cart**
- **Given** the cart is empty
- **When** the header loads
- **Then** the cart badge shows zero/none per design (no error).

**Scenario C4 — Account state**
- **Given** a signed-in vs. guest user
- **When** the header loads
- **Then** the account control reflects the correct state (and persona where applicable).

**Scenario C5 — Search suggestions**
- **Given** the shopper types in header search
- **When** the query runs
- **Then** ACCS Live Search returns suggestions (per the Search Bar Commerce contract).

**Scenario C6 — Resilience**
- **Given** a cart/account/search service is unavailable
- **When** the header loads
- **Then** the header still renders (graceful fallback: no badge / guest state / search still submits) with no blocking error.

**Scenario C7 — Performance**
- **Given** header initialization
- **When** cart/account data is fetched
- **Then** it loads asynchronously and does not block LCP; responses are cached/deduped appropriately.

## Commerce Data Flow
- **Cart count / mini-cart** ← ACCS cart (GraphQL / cart drop-in).
- **Account/auth state** ← Commerce customer session / IMS-Okta.
- **Search suggestions** ← ACCS Live Search (see Search Bar story).
- Depends on **EC-243** for product data surfaced in search suggestions / mini-cart.

## Dependencies
- ACCS cart, customer session/auth, Live Search.
- Cart Popup story (if cart icon opens the popup), Search Bar story.

## Open Items
- Confirm cart-count refresh mechanism (event/subscription vs. poll).
- Confirm account/persona source (Okta/IMS) and what the header shows per state.
- Confirm cart-icon behavior (open Cart Popup vs. navigate to Cart) — reconcile with the Cart Popup open item.
