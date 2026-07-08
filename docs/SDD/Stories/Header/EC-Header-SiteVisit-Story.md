# ACCS Site Visit Story — Header (Offer Bar + Main Navigation) — Frontend Rendering & UX

**Type:** Story (ACCS Site Visit / Frontend)
**Component:** EDS Storefront (DA) — Global Header
**Related design:** Figma node 2697-345643 — `Header` (Guest/Caregivers; 1280×179): Offer bar (1280×52) + Main Navigation (1280×127).
**Companion stories:** EDS Authoring — Header content · Commerce API — Header state.
**Related:** Navigation story (mega menu / mobile hamburger), Search Bar story.
**Stream:** ACCS Site Visit (frontend rendering + user experience).

## INVEST
- **Independent:** renders from authored content + Commerce API state; testable with sample data.
- **Negotiable:** sticky behavior and interaction details can be refined.
- **Valuable:** gives shoppers consistent, working global navigation and utilities.
- **Estimable:** header container rendering + behavior (nav detail in Navigation story).
- **Small:** scoped to the header shell + offer bar.
- **Testable:** pass/fail Given/When/Then below.

---

## User Story
**As a** girlscoutshop.com shopper,
**I want** a consistent header with an offer bar, logo, navigation, search, account, and cart on every page,
**so that** I can navigate, search, and reach my account/cart from anywhere.

## Design Specs (from Figma)
- **Offer/promo bar** (1280×52): message + optional promo code + CTA + dismiss (close) control.
- **Main Navigation** (1280×127): top row = left utility links, centered logo, right icons (search, account, cart w/ count); bottom row = primary nav + secondary nav.
- GS brand tokens; green `#005640` accents.
- **Responsive**: collapses to a hamburger + condensed utilities on tablet/mobile (see Navigation story).

### Hover / Touch
- Nav links/icons: hover green `#005640`; visible keyboard focus; ≥44×44px tap targets on mobile.
- Offer bar close: hover highlight; respects `prefers-reduced-motion`.

## Acceptance Criteria (Given / When / Then)

### Rendering under different content conditions
**Scenario R1 — Full header** — **Given** offer bar + nav content are authored **When** a page loads **Then** the offer bar and full navigation render per design on every page.
**Scenario R2 — Offer bar omitted** — **Given** no offer-bar message is authored **When** the header renders **Then** the offer bar is absent with no empty strip and nav sits at the top.
**Scenario R3 — Logo only fallback** — **Given** minimal header content **When** rendered **Then** the logo + core icons still render without a broken layout.

### Interaction behavior
**Scenario I1 — Logo** — **Given** the header **When** the shopper clicks the logo **Then** they navigate to the homepage.
**Scenario I2 — Offer bar dismiss** — **Given** the offer bar is shown **When** the shopper clicks close **Then** the offer bar hides and stays dismissed for the session.
**Scenario I3 — Offer CTA** — **Given** the offer bar has a CTA **When** activated **Then** it navigates to the authored target.
**Scenario I4 — Cart icon** — **Given** the cart icon with a count **When** the shopper activates it **Then** it performs the defined cart action (open Cart Popup or navigate to Cart — per that open item) and the count reflects the ACCS cart.
**Scenario I5 — Account** — **Given** the account control **When** activated **Then** it routes to sign-in (guest) or account (signed-in) per state.
**Scenario I6 — Search** — **Given** the header search **When** the shopper types/submits **Then** suggestions show and submit routes to search results (per Search Bar story).
**Scenario I7 — Primary/secondary nav** — **Given** a nav item **When** hovered/focused (desktop) or tapped (mobile) **Then** the mega menu / hamburger behaves per the Navigation story.

### Responsive behavior
**Scenario P1 — Desktop** — **Given** ≥1200px **When** rendered **Then** the two-row nav + offer bar render per the Desktop design.
**Scenario P2 — Mobile** — **Given** 360px **When** rendered **Then** nav collapses to a hamburger, utilities condense, no horizontal scroll, ≥44×44px targets.

### Accessibility (WCAG 2.1 AA)
**Scenario X1 — Landmarks** — **Given** assistive tech **When** on any page **Then** the header exposes `header`/`nav` landmarks with accessible names.
**Scenario X2 — Keyboard** — **Given** a keyboard user **When** tabbing **Then** offer bar, logo, nav, search, account, and cart are reachable/operable with visible focus; no keyboard trap.
**Scenario X3 — Menu semantics** — **Given** menu triggers **When** navigated **Then** `aria-expanded`/`aria-haspopup` and Esc-to-close behave correctly (per Navigation story).
**Scenario X4 — Contrast** — **Given** the rendered header **When** checked **Then** text/icons meet contrast (normal text ≥4.5:1; UI ≥3:1).

### Performance
**Scenario F1 — Non-blocking** — **Given** page load **When** the header initializes **Then** it loads in the lazy phase without blocking LCP; no layout shift.

## Commerce Data Flow
- Consumes the **Commerce API — Header** story (cart count, account state, search suggestions).
- Offer bar and nav content are authored (EDS). Icons/actions route to Cart/Account/Search.
- Emits analytics per the global-items tagging plan (nav clicks with `data-analytics-*`, search).

## Dependencies
- EDS Authoring — Header content.
- Commerce API — Header state.
- Navigation story (mega menu / hamburger), Search Bar story, Cart / Cart Popup.

## Open Items
- Confirm sticky-header behavior on scroll.
- Confirm cart-icon behavior (Cart Popup vs. navigate to Cart).
- Confirm persona-specific header differences (Guest/Caregiver vs Leader).
