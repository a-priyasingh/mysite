# ACCS Site Visit Story — Shop by Troop Year Plans (Leader) — Frontend Rendering & UX

**Type:** Story (ACCS Site Visit / Frontend)
**Component:** EDS Storefront (DA) — Commerce Block (leader troop-year product carousel)
**Related design:** Figma node 2767-30801 — `Shop by Troop Year Plans-Leader` (Options 1/2 × Desktop 1280×806 / Tablet 768×772 / Mobile 360×803).
**Companion stories:** EDS Authoring — Troop Year Plans (Leader) config · Commerce API — Troop Year Plans (Leader) feed.
**Stream:** ACCS Site Visit (frontend rendering + user experience).

## INVEST
- **Independent:** renders from the Commerce API contract; testable with sample/live data.
- **Negotiable:** tab/selector UX and animation details can be refined.
- **Valuable:** helps leaders shop the right materials per level + troop year.
- **Estimable:** one block's rendering + selector/tab behavior.
- **Small:** scoped to this carousel.
- **Testable:** pass/fail Given/When/Then below.

---

## User Story
**As a** troop leader on girlscoutshop.com,
**I want** to pick a grade level and troop year and see the recommended materials in a carousel,
**so that** I can quickly shop the right products for my troop's year plan.

## Design Specs (from Figma)
- Block width 1280; content max ~1168.
- **Heading**: "Shop by Troop Year Plans" — Girl Scout Light(300) 36/43; **subtext** Trefoil Sans 400 20/24.
- **Controls**: a **level selector dropdown** (~238×44) + a **row of troop-year tabs** (e.g., "Year 1", "Year 2", Trefoil Sans 14).
- **Product carousel** (~1168×394): row of Product Cards (shared Product Card, hover image) + slider arrows.
- **CTA**: "Shop TROOP YEAR MATERIALS" (Trefoil Sans 16).
- **Options**: Option-01 / Option-02. **Responsive**: Desktop 1280×806, Tablet 768×772/724, Mobile 360×803 (controls stack; carousel swipe-first).

### Hover / Touch
- Product Card per the Product Card story; slider arrows hover green `#005640`; tabs/selector hover + selected states; ≥44×44px tap targets; respect `prefers-reduced-motion`.

## Acceptance Criteria (Given / When / Then)

### Rendering under different content conditions
**Scenario R1 — Level + year selected with products** — **Given** a level and troop year are selected and have products **When** the page loads **Then** the heading, subtext, selector, year tabs, product carousel, and CTA render.
**Scenario R2 — Default selection** — **Given** no explicit selection **When** the block renders **Then** a default level + year is preselected and its products load.
**Scenario R3 — Empty result** — **Given** a level+year with zero products **When** rendered **Then** an empty/"no products" state shows (or the carousel hides) with no error.
**Scenario R4 — Heading/subtext/CTA omitted** — **Given** any of these are not configured **When** rendered **Then** they are omitted with no empty gap; the rest renders.
**Scenario R5 — Loading** — **Given** products are being fetched **When** rendered **Then** a skeleton shows; reserved space prevents layout shift.

### Interaction behavior
**Scenario I1 — Change level** — **Given** the level selector **When** the leader selects a different level **Then** the carousel updates to that level (current year tab) without full page reload.
**Scenario I2 — Switch troop year** — **Given** the year tabs **When** the leader selects "Year 1"/"Year 2" **Then** the carousel updates to that year's products for the selected level.
**Scenario I3 — Carousel navigation** — **Given** more products than visible **When** using arrows (desktop) or swipe (mobile) **Then** cards scroll accordingly.
**Scenario I4 — Card navigation & Add to Cart** — **Given** a product card **When** clicked / Add to Cart activated **Then** it opens the PDP / adds to the ACCS cart (variant selection if required).
**Scenario I5 — CTA** — **Given** a CTA is present **When** activated **Then** it navigates to the authored target.

### Responsive behavior
**Scenario P1 — Desktop** — **Given** ≥1200px **When** rendered **Then** selector + year tabs inline, ~4 cards with arrows per the Desktop design.
**Scenario P2 — Tablet** — **Given** 768px **When** rendered **Then** layout adapts without overflow.
**Scenario P3 — Mobile** — **Given** 360px **When** rendered **Then** controls stack, carousel swipe-first, no horizontal page scroll, ≥44×44px controls.

### Accessibility (WCAG 2.1 AA)
**Scenario X1 — Tabs/selector a11y** — **Given** assistive tech **When** using the year tabs/level selector **Then** they use proper tab/listbox semantics, have accessible names, and are keyboard operable.
**Scenario X2 — Carousel a11y** — **Given** a keyboard user **When** tabbing **Then** arrows/cards are focusable/operable with visible focus; no keyboard trap.
**Scenario X3 — Announce updates** — **Given** a screen reader **When** level/year/products change **Then** the update is announced (aria-live).
**Scenario X4 — Reduced motion** — **Given** `prefers-reduced-motion` **When** interacting **Then** transitions/autoplay are disabled.
**Scenario X5 — Contrast** — **Given** the rendered block **When** checked **Then** text/controls meet contrast (normal text ≥4.5:1).

### Performance
**Scenario F1 — Non-blocking** — **Given** the page loads **When** the block initializes **Then** it loads lazy/delayed, does not block LCP, card images lazy-loaded.
**Scenario F2 — No layout shift** — **Given** content loads **When** rendered **Then** reserved dimensions prevent CLS.

## Commerce Data Flow
- Consumes the **Commerce API — Troop Year Plans (Leader) feed** (products by level + troop year); renders Product Cards.
- **Add to Cart** → ACCS cart; product data per the API.
- Emits analytics per tagging plan (`view_item_list`, `select_item`, `add_to_cart`, level/year selection events).

## Dependencies
- Commerce API — Troop Year Plans (Leader) feed.
- Product Card block (shared item renderer).
- Cart / Cart Popup (Add to Cart target).
- **EC-243** — program-level + product attributes exposed.

## Open Items
- Confirm default level + year selection.
- Confirm number of troop-year tabs and tablet/mobile control layout.
- Confirm which layout option (Option-01 / Option-02) is MVP.
- Confirm CTA target.
