# ACCS Site Visit Story — My Account: Order List / Order History (Frontend Rendering & UX)

**Type:** Story (ACCS Site Visit / Frontend)
**Component:** EDS Storefront (DA) — My Account page (Order List)
**Related design:** Figma node 6720-230980 — `Orderlist_VariantA_Desktop` (1280×2320).
**Companion stories:** EDS Authoring — Order List page shell · Commerce API — Order history data.
**Personas:** Signed-in customers (Caregiver, Leader). Not available to guests.
**Platforms/Pages:** My Account → Orders; Desktop, Tablet, Mobile.
**Stream:** ACCS Site Visit (frontend rendering + user experience).

## INVEST
- **Independent:** renders from the Commerce API contract; testable with sample data.
- **Negotiable:** card layout and filter UX can be refined.
- **Valuable:** lets shoppers review their order history and act on orders.
- **Estimable:** one page's rendering + list/search behavior.
- **Small:** order-list view (order detail is separate).
- **Testable:** plain-language AC below.

---

## User Story
**As a** signed-in girlscoutshop.com customer,
**I want** to see a list of my past orders with their key details and to search my orders,
**so that** I can review, track, or reorder items easily.

## Design Specs

**Prose summary:** Account page on a light grey background. Page title "My Account" (Girl Scout Light 40/48). A left account-navigation sidebar (296 wide) with the current section highlighted (green accent). The main column (848 wide) shows a toolbar (tabs/filter + a "Search Product" field) above a stacked list of order summary cards (each ~848 wide), plus a "Have Questions" help card in the sidebar.

**Per-element properties (from Figma):**

| Element | Size (W×H) | Font (family wt size/lh) | Color (hex) | Notes |
|---------|-----------|--------------------------|-------------|-------|
| Page background | 1280×1444 | — | #F7F7F7 | — |
| Page title | 1168×48 | Girl Scout 300 40/48 | #000000 | "My Account" |
| Account nav sidebar | 296×478 | — | #FFFFFF | account sections |
| Active-item accent | 3×26 | — | #005640 | current section |
| Order summary card | 848×243 | — | #FFFFFF | one per order |
| Search field | 328×40 | — | #FFFFFF | "Search Product" |
| Help card | 296×155 | — | #E2DBC1 | "Have Questions" |

### Hover / Touch
- Account nav items and order-card actions show a hover state; the active section is visually indicated.
- Order cards and buttons show a pressed state on touch; tap targets are at least 44×44px.
- Motion is reduced when the visitor has reduced-motion enabled.

## Acceptance Criteria (plain language — verifiable without Figma)

1. A signed-in customer sees the "My Account" page with the account navigation and their list of past orders, most recent first.
2. Each order in the list shows its order number, order date, status, total, and number of items.
3. Selecting an order (or its "View order" action) opens that order's detail page.
4. The customer can search their orders by product/order, and the list updates to show only matching orders.
5. When the customer has no orders, a clear "no orders yet" message is shown instead of an empty or broken layout.
6. A guest (not signed in) who reaches this page is prompted to sign in and does not see any orders.
7. Selecting a section in the account navigation goes to that account section, and the current section is clearly highlighted.
8. The page works on desktop, tablet, and mobile — the sidebar and order cards stack appropriately with no overlapping content or horizontal scrolling.
9. A keyboard user can move through the navigation, search field, and order actions with a visible focus indicator, and activate them with the keyboard.
10. Order totals and statuses shown match the amounts on each order's detail page.
11. The order list loads without shifting the page layout and without delaying the main page from appearing.

## Commerce Data Flow
- Consumes the **Commerce API — Order history** (authenticated customer orders, search, paging); renders order summary cards.
- Card actions (View / Reorder / Track) route to Order Detail / cart as applicable.
- Emits analytics per the MyAccount tagging plan (`account_overview`, `account_view_all_orders`, order actions).

## Dependencies
- Commerce API — Order history data.
- EDS Authoring — Order List page shell (title, nav, help card).
- Order Detail page (destination for "View order").
- Sign-in / authentication (Okta/IMS).

## Open Items
- Confirm the order-card fields and actions (View / Reorder / Track).
- Confirm search scope and whether status filters/tabs are included.
- Confirm tablet/mobile layout for the sidebar (collapses to a menu?) and order cards.

## Implementation Notes (developers — not required for QA acceptance)
- Authenticated page; render order data from the Commerce API. Reserve card dimensions to avoid layout shift; lazy-load below-the-fold cards. Active-nav accent #005640; help card bg #E2DBC1 — map to GSUSA design tokens.
