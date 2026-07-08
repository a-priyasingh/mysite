# EDS Authoring Story — Council Products Carousel (Content Model & Authoring)

**Type:** Story (EDS Authoring)
**Component:** EDS Storefront (DA) — Commerce Block (council-scoped product carousel)
**Related design:** Figma node 2758-55140 — `Council Products-B2C/Leader` (Desktop 1280×758, Tablet 768×692, Mobile 360×701).
**Companion stories:** Commerce API — Council Products feed · ACCS Site Visit — Council Products rendering & UX.
**Stream:** EDS Authoring (content model, authoring rules, DA preview).

## INVEST
- **Independent:** authoring/config only; consumes the Commerce API contract, testable with sample data.
- **Negotiable:** field set, default council behavior, and CTA can be refined.
- **Valuable:** lets merchandisers surface council-specific products without manual lists.
- **Estimable:** bounded config surface.
- **Small:** one block's authoring model.
- **Testable:** pass/fail Given/When/Then below.

---

## User Story
**As a** content author / merchandiser,
**I want** to configure the Council Products block (heading, default council behavior, persona toggle, and a CTA),
**so that** council-affiliated shoppers see relevant council products without me maintaining product lists.

## Content Model

| Displayed data | Content is sourced from | Required |
|----------------|-------------------------|----------|
| Section heading (e.g., "<Council> Council Products") | EDS (template) + ACCS (council name) | N |
| Default council behavior (from user context vs. selector) | EDS (config) | N |
| Council selector (dropdown + search/zip) | Code + ACCS | N/A |
| Persona toggle (B2C / Leader) | EDS (config) / Code | N |
| Product source (council catalog) | ACCS (dynamic) | N/A |
| CTA (label + link, e.g., "View all") | EDS | N |
| Max products / autoplay / loop | EDS | N |
| Product card content (image, name, price, badges, swatches) | ACCS (dynamic) | N/A |
| Carousel controls (arrows, dots) | Code | N |

- Authored as a block table (e.g., **`Council Products`**) in the page document.
- Heading may template the selected/resolved council name; products come from the council catalog (not authored).

## Acceptance Criteria (Given / When / Then)

**Scenario A1 — Add the block**
- **Given** an author is editing a page document in DA
- **When** they insert the `Council Products` block
- **Then** the block appears and renders in preview with a council selector and sample/live products.

**Scenario A2 — Heading**
- **Given** the block is in the document
- **When** the author sets/keeps the heading (which may include the resolved council name)
- **Then** the heading renders; if left empty, no heading is output and the block still renders.

**Scenario A3 — Default council behavior**
- **Given** the block is in the document
- **When** the author sets whether the default council comes from the signed-in user's context or requires selection
- **Then** on render the configured default behavior is applied.

**Scenario A4 — Persona toggle**
- **Given** the block supports B2C / Leader
- **When** the author enables the toggle (or it derives from context)
- **Then** the appropriate persona view renders.

**Scenario A5 — CTA (optional)**
- **Given** the author provides a CTA label and link
- **When** the block renders
- **Then** the CTA shows and links correctly; if omitted, no CTA renders and layout stays intact.

**Scenario A6 — No mandatory fields / graceful blank**
- **Given** the author leaves any subset of authorable fields empty
- **When** the block saves and previews
- **Then** it saves and renders without error; only empty elements are omitted; no placeholder text.

**Scenario A7 — Preview parity**
- **Given** the author has configured the block
- **When** they view DA preview
- **Then** the preview matches what will render live.

## Dependencies
- Commerce API — Council Products feed.
- DA authoring environment / block registration.

## Open Items
- Confirm how the default council resolves (user context / geolocation / manual selection).
- Confirm B2C vs Leader toggle source (authored vs. user context).
- Confirm CTA target ("View all" → council PLP?).
