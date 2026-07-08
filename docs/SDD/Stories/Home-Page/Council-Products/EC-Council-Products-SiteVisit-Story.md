# ACCS Site Visit Story — Council Products Carousel (Frontend Rendering & UX)

**Type:** Story (ACCS Site Visit / Frontend)
**Component:** EDS Storefront (DA) — Commerce Block (council-scoped product carousel)
**Related design:** Figma node 2758-55140 — `Council Products-B2C/Leader` (Desktop 1280×758, Tablet 768×692, Mobile 360×701).
**Companion stories:** EDS Authoring — Council Products config · Commerce API — Council Products feed.
**Stream:** ACCS Site Visit (frontend rendering + user experience).

## INVEST
- **Independent:** renders from the Commerce API contract; testable with sample/live data.
- **Negotiable:** selector UX and animation details can be refined.
- **Valuable:** helps council-affiliated shoppers find and shop council products.
- **Estimable:** one block's rendering + selector behavior.
- **Small:** scoped to this carousel + council selector.
- **Testable:** pass/fail Given/When/Then below.

---

## User Story
**As a** council-affiliated shopper (or Leader) on girlscoutshop.com,
**I want** to see products for my council (auto-detected or selected) in a carousel,
**so that** I can quickly find and shop council-specific items.

## Design Specs (from Figma)
- Block width 1280; content max ~1168.
- **Heading**: e.g., "West Central Florida Council Products" — Girl Scout Light(300) 36/43.
- **Council selector**: a dropdown (select a council) **OR** a search/zip input with a button; plus a **B2C / Leader toggle**.
- **Product carousel**: row of Product Cards (274×394, shared Product Card with hover image) + Slider Arrows (40×40).
- **CTA** below (e.g., "View all", ~254×52).
- GS brand tokens; green `#005640` accents.
- **Responsive**: Desktop 1280×758, Tablet 768×692, Mobile 360×701 (selector stacks; carousel swipe-first).

### Hover / Touch
- Product Card per the Product Card story (image swap/zoom + Add to Cart; always-visible on mobile).
- Slider arrows / selector controls: hover states; ≥44×44px tap targets on mobile.
- Respect `prefers-reduced-motion`.

## Acceptance Criteria (Given / When / Then)

### Rendering under different content conditions
**Scenario R1 — Council resolved with products**
- **Given** a council is resolved (from context or selection) and has products
- **When** the page loads
- **Then** the heading (with council name), selector, product carousel, and CTA render.

**Scenario R2 — No council resolved**
- **Given** no council is auto-resolved
- **When** the block renders
- **Then** it prompts the shopper to select a council (selector shown), without a broken/empty carousel.

**Scenario R3 — Council has no products**
- **Given** a selected council returns zero products
- **When** the block renders
- **Then** an empty/"no products" state shows (or the carousel hides) with no error.

**Scenario R4 — Heading/CTA omitted**
- **Given** heading or CTA is not configured
- **When** the block renders
- **Then** those elements are omitted with no empty gap; the rest renders.

**Scenario R5 — Loading**
- **Given** products are being fetched
- **When** the block renders
- **Then** a skeleton/placeholder shows; reserved space prevents layout shift.

### Interaction behavior
**Scenario I1 — Select council via dropdown**
- **Given** the council dropdown
- **When** the shopper selects a council
- **Then** the heading and carousel update to that council's products.

**Scenario I2 — Search/zip council**
- **Given** the search/zip input
- **When** the shopper enters a value and activates the button
- **Then** the block resolves and loads that council's products (or shows "no match").

**Scenario I3 — B2C/Leader toggle**
- **Given** the persona toggle
- **When** the shopper switches it
- **Then** the appropriate persona view (pricing/availability) is applied.

**Scenario I4 — Carousel navigation**
- **Given** more products than visible
- **When** the shopper uses arrows (desktop) or swipes (mobile)
- **Then** the cards scroll accordingly.

**Scenario I5 — Card navigation & Add to Cart**
- **Given** a product card
- **When** the shopper clicks the card / Add to Cart
- **Then** it opens the PDP / adds to the ACCS cart (variant selection if required).

**Scenario I6 — CTA**
- **Given** a CTA is present
- **When** the shopper activates it
- **Then** it navigates to the authored target (e.g., council PLP).

### Responsive behavior
**Scenario P1 — Desktop** — **Given** ≥1200px **When** rendered **Then** selector inline + ~4 cards with arrows per the Desktop design.
**Scenario P2 — Tablet** — **Given** 768px **When** rendered **Then** layout adapts without overflow.
**Scenario P3 — Mobile** — **Given** 360px **When** rendered **Then** selector stacks, carousel swipe-first, no horizontal page scroll, ≥44×44px controls.

### Accessibility (WCAG 2.1 AA)
**Scenario X1 — Selector a11y** — **Given** assistive tech **When** using the council dropdown/search **Then** controls have labels/accessible names and are keyboard operable.
**Scenario X2 — Carousel a11y** — **Given** a keyboard user **When** tabbing **Then** arrows and cards are focusable/operable with visible focus; no keyboard trap.
**Scenario X3 — Announce updates** — **Given** a screen reader **When** the council/products change **Then** the update is announced (aria-live).
**Scenario X4 — Reduced motion** — **Given** `prefers-reduced-motion` **When** interacting **Then** transitions/autoplay are disabled.
**Scenario X5 — Contrast** — **Given** the rendered block **When** checked **Then** text/controls meet contrast (normal text ≥4.5:1).

### Performance
**Scenario F1 — Non-blocking** — **Given** the page loads **When** the block initializes **Then** it loads lazy/delayed, does not block LCP, card images lazy-loaded.
**Scenario F2 — No layout shift** — **Given** content loads **When** rendered **Then** reserved dimensions prevent CLS.

## Commerce Data Flow
- Consumes the **Commerce API — Council Products feed** (council list, council resolution, council-scoped products); renders Product Cards.
- **Add to Cart** → ACCS cart; product data per the API.
- Emits analytics per tagging plan (`view_item_list`, `select_item`, `add_to_cart`, council-selection event).

## Dependencies
- Commerce API — Council Products feed.
- Product Card block (shared item renderer).
- Cart / Cart Popup (Add to Cart target).
- **EC-243** — council + product attributes exposed.

## Open Items
- Confirm council selection precedence (auto from context vs. manual) and the search input type (zip vs. name).
- Confirm B2C/Leader toggle visibility and effect.
- Confirm CTA target and tablet/mobile cards-per-view.
