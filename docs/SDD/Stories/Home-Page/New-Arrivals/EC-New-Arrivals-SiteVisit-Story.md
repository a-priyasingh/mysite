# ACCS Site Visit Story — New Arrivals Carousel (Frontend Rendering & UX)

**Type:** Story (ACCS Site Visit / Frontend)
**Component:** EDS Storefront (DA) — Commerce Block (product carousel)
**Related design:** Figma node 6930-252999 — `New Arrivals` (Options 1/2 × Desktop/Tablet/Mobile).
**Companion stories:** EDS Authoring — New Arrivals config · Commerce API — New Arrivals product feed.
**Stream:** ACCS Site Visit (frontend rendering + user experience).

## INVEST
- **Independent:** renders from the Commerce API contract; testable with sample/live data.
- **Negotiable:** interaction/animation details can be refined.
- **Valuable:** lets shoppers discover and shop new products.
- **Estimable:** one block's rendering + behavior.
- **Small:** scoped to the carousel UX.
- **Testable:** pass/fail Given/When/Then below.

---

## User Story
**As a** girlscoutshop.com shopper,
**I want** a "New Arrivals" carousel of the latest products,
**so that** I can discover and shop new items directly from the page.

## Design Specs (from Figma)
- Block width 1280; content max ~1168.
- **Heading**: "New Arrivals" — Girl Scout Light(300) 36/43 (desktop; ~26 smaller viewports).
- **Feature tile** (leading, aspect 3:5, 272×453): image + label + CTA overlay.
- **Product row**: horizontal scroller of Product Cards (reuses the shared Product Card block).
- **Slider Arrow** 40×40; **position counter** "1/5"; decorative bottom illustration.
- **Options**: Opton-1 / Opton-2. **Responsive**: Desktop 1280×710, Tablet 768×826/862, Mobile 360×820/856 (swipe-first; ~1.5–2 cards visible).

### Hover / Touch
- Product Card & feature-tile CTA per the Product Card story (image swap/zoom + Add to Cart; always-visible on mobile).
- Slider arrows: green `#005640` fill / white icon on hover; ≥44×44px tap target on mobile.
- Respect `prefers-reduced-motion`.

## Acceptance Criteria (Given / When / Then)

### Rendering under different content conditions
**Scenario R1 — Products available**
- **Given** the Commerce API returns products
- **When** the page loads
- **Then** the carousel renders the heading (if set), optional feature tile, and product cards.

**Scenario R2 — Feature tile omitted**
- **Given** no feature tile is configured
- **When** the block renders
- **Then** the carousel shows product cards only, with no empty feature-tile slot.

**Scenario R3 — Heading omitted**
- **Given** no heading is configured
- **When** the block renders
- **Then** the carousel renders without a heading and no empty gap.

**Scenario R4 — Empty result**
- **Given** the Commerce API returns zero products
- **When** the page loads
- **Then** the carousel hides (or shows the configured fallback) with no error or empty shell.

**Scenario R5 — Loading state**
- **Given** products are still being fetched
- **When** the block renders
- **Then** a skeleton/placeholder shows and reserved space prevents layout shift.

### Interaction behavior
**Scenario I1 — Arrow navigation (desktop)**
- **Given** more products than visible
- **When** the shopper clicks the next/prev arrow
- **Then** the carousel scrolls to the next/previous set and the "1/5" counter updates.

**Scenario I2 — Swipe (mobile)**
- **Given** a touch device
- **When** the shopper swipes the row
- **Then** the cards scroll horizontally.

**Scenario I3 — Card navigation**
- **Given** a product card is shown
- **When** the shopper clicks/taps it
- **Then** the browser navigates to that product's PDP.

**Scenario I4 — Add to Cart**
- **Given** a product card with Add to Cart
- **When** the shopper activates it
- **Then** the product is added to the ACCS cart (or variant selection opens if required).

**Scenario I5 — Feature-tile CTA**
- **Given** the feature tile has a CTA
- **When** the shopper activates it
- **Then** it navigates to the authored target.

### Responsive behavior
**Scenario P1 — Desktop** — **Given** ≥1200px **When** rendered **Then** ~4 cards visible with arrows/counter per the Desktop design.
**Scenario P2 — Tablet** — **Given** 768px **When** rendered **Then** layout adapts without overflow.
**Scenario P3 — Mobile** — **Given** 360px **When** rendered **Then** ~1.5–2 cards visible, swipe-first, no horizontal page scroll, ≥44×44px controls.

### Accessibility (WCAG 2.1 AA)
**Scenario X1 — Region & controls** — **Given** assistive tech **When** reaching the carousel **Then** it is a labelled region and arrows/cards have accessible names.
**Scenario X2 — Keyboard** — **Given** a keyboard user **When** tabbing **Then** arrows and cards are focusable/operable with visible focus; no keyboard trap.
**Scenario X3 — Slide announce** — **Given** a screen reader **When** slides change **Then** the change is announced (aria-live) without flooding.
**Scenario X4 — Reduced motion** — **Given** `prefers-reduced-motion` **When** interacting **Then** autoplay/transitions are disabled.

### Performance
**Scenario F1 — Non-blocking** — **Given** the page loads **When** the carousel initializes **Then** it loads lazy/delayed, does not block LCP, and card images are lazy-loaded.
**Scenario F2 — No layout shift** — **Given** images load **When** rendered **Then** reserved dimensions prevent CLS.

## Commerce Data Flow
- Consumes the **Commerce API — New Arrivals product feed** response; renders Product Cards.
- **Add to Cart** → ACCS cart; card data (image via Adobe Assets, price, badges, swatches) per the API.
- Emits analytics per tagging plan (`view_item_list`, `select_item`, `add_to_cart`).

## Dependencies
- Commerce API — New Arrivals product feed.
- Product Card block (shared item renderer).
- Cart / Cart Popup (Add to Cart target).
- **EC-243** — attributes exposed for card fields.

## Open Items
- Confirm which layout option (Opton-1 / Opton-2) is MVP.
- Confirm tablet/mobile cards-per-view and whether the counter is retained on mobile.
- Confirm exact hover shades with design.
