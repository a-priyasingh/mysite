# EDS Authoring Story — My Account: Order List / Order History (Content Model & Authoring)

**Type:** Story (EDS Authoring)
**Component:** EDS Storefront (DA) — My Account page (Order List)
**Related design:** Figma node 6720-230980 — `Orderlist_VariantA_Desktop` (1280×2320).
**Companion stories:** ACCS Site Visit — Order List rendering & UX · Commerce API — Order history data.
**Stream:** EDS Authoring (page shell, static labels, account navigation, help card).

## INVEST
- **Independent:** covers only the authorable/static parts of the page shell; testable with sample data.
- **Negotiable:** which labels/links are authored vs. fixed can be refined.
- **Valuable:** lets authors maintain the account page framing (title, help card, nav labels) without code.
- **Estimable:** small, bounded set of static content.
- **Small:** page-shell authoring only (order data is the Commerce API/Site Visit stories).
- **Testable:** plain-language AC below.

---

## User Story
**As a** content author,
**I want** to manage the static content of the My Account Order List page (page title/intro, account navigation labels/links, and the "Have Questions" help card),
**so that** the account area framing stays consistent and up to date without developer help.

## Content Model

| Displayed data | Content is sourced from | Required |
|----------------|-------------------------|----------|
| Page title ("My Account") | EDS | Yes |
| Page intro/subtext | EDS | No |
| Account navigation labels + links (Orders, Subscriptions, Addresses, Payments, etc.) | EDS | Yes |
| "Have Questions" help card (heading, text, CTA + link) | EDS | No |
| Order summary cards, order data, search/filter results | ACCS (dynamic) | N/A |

- The order list itself (order cards, statuses, totals) is **not authored** — it comes from ACCS (see the Commerce API and Site Visit stories).
- **Required:** the page title and the account navigation set (labels + links). The account nav must not be publishable with missing labels/links.

## Design Specs

**Prose summary:** Standard account page on a light grey background (#F7F7F7). Page title in Girl Scout Light 40/48 (#000000) with an intro line (Trefoil Sans 400 18/25, #2D2E33). Left account-navigation sidebar (296 wide, white) lists account sections, with an active-item indicator (green #005640 bar). Below the nav, a "Have Questions" help card on a tan background (#E2DBC1). Right content column (848 wide) holds the order list.

**Per-element properties (from Figma):**

| Element | Size (W×H) | Font (family wt size/lh) | Color (hex) | Notes |
|---------|-----------|--------------------------|-------------|-------|
| Page background | 1280×1444 | — | #F7F7F7 | main content area |
| Page title "My Account" | 1168×48 | Girl Scout 300 40/48 | #000000 | — |
| Intro subtext | 1168×51 | Trefoil Sans 400 18/25 | #2D2E33 | — |
| Account nav sidebar | 296×478 | — | #FFFFFF | list of account links |
| Active-item indicator | 3×26 | — | #005640 | left accent bar |
| "Have Questions" card | 296×155 | — | #E2DBC1 | help/contact card |

## Acceptance Criteria (plain language — verifiable without Figma)

1. An author can set the page title and optional intro text, and they appear on the Order List page after publishing.
2. An author can add, edit, reorder, and remove account-navigation items (each with a label and a link), and those items appear in the left sidebar.
3. The page title and at least one account-navigation item are required — the page cannot be published with the title empty or the account navigation empty, and a clear message is shown when they are missing.
4. An author can edit the "Have Questions" help card (heading, text, and its link); if the help card is left empty, it does not appear and the page still renders correctly.
5. An author can preview the page before publishing, and the preview matches the live page.

## Dependencies
- ACCS Site Visit — Order List (renders the order data).
- Commerce API — Order history data.
- Account navigation targets (other account pages) must exist.

## Open Items
- Confirm the final account-navigation item list (the Figma nav still shows placeholder items from another template — e.g., "Seats", "RTO", "CARS24 HUB" — these must be replaced with the real GSUSA account sections).
- Confirm which nav labels/links are authored vs. system-fixed.

## Implementation Notes (developers — not required for QA acceptance)
- Page-shell block; order data comes from the Commerce API story. Active-nav accent color #005640; help card bg #E2DBC1 — map to GSUSA design tokens.
