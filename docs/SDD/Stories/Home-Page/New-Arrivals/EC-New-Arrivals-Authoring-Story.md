# EDS Authoring Story — New Arrivals Carousel (Content Model & Authoring)

**Type:** Story (EDS Authoring)
**Component:** EDS Storefront (DA) — Commerce Block (product carousel)
**Related design:** Figma node 6930-252999 — `New Arrivals` (Options 1/2 × Desktop/Tablet/Mobile).
**Companion stories:** Commerce API — New Arrivals product feed · ACCS Site Visit — New Arrivals rendering & UX.
**Stream:** EDS Authoring (content model, authoring rules, DA preview).

## INVEST
- **Independent:** authoring/config concerns only; consumes the Commerce API story's contract but is testable with sample data.
- **Negotiable:** field set and source options can be refined.
- **Valuable:** lets merchandisers surface new arrivals without code or manual product lists.
- **Estimable:** small, well-bounded config surface.
- **Small:** single block's authoring model.
- **Testable:** pass/fail Given/When/Then below.

---

## User Story
**As a** content author / merchandiser,
**I want** to configure the New Arrivals block (heading, layout option, feature tile, and product source),
**so that** I can present new products without maintaining product lists by hand.

## Content Model

| Displayed data | Content is sourced from | Required |
|----------------|-------------------------|----------|
| Section heading ("New Arrivals") | EDS | N |
| Layout option (Opton-1 / Opton-2) | EDS | N |
| Feature-tile image | EDS | N |
| Feature-tile label | EDS | N |
| Feature-tile CTA (label + link) | EDS | N |
| Product source (category / collection / SKU list / new-arrivals rule) | EDS (config) → ACCS | N |
| Max products / autoplay / loop | EDS | N |
| Product card content (image, name, price, badges, swatches) | ACCS (dynamic) | N/A |
| Carousel controls (arrows, counter, dots) | Code | N |

- Authored as a block table (e.g., **`New Arrivals`**) in the page document.
- Author configures the **product source**, not individual products.

## Acceptance Criteria (Given / When / Then)

**Scenario A1 — Add the block**
- **Given** an author is editing a page document in DA
- **When** they insert the `New Arrivals` block
- **Then** the block appears and renders in preview with sample/live products.

**Scenario A2 — Heading**
- **Given** the block is in the document
- **When** the author sets the heading text
- **Then** the entered heading renders above the carousel; if left empty, no heading is output and the block still renders.

**Scenario A3 — Layout option**
- **Given** the block is in the document
- **When** the author selects Opton-1 or Opton-2
- **Then** the corresponding layout is applied in preview.

**Scenario A4 — Product source config**
- **Given** the block is in the document
- **When** the author sets the product source (category / collection / SKU list / new-arrivals rule) and max products
- **Then** the carousel populates from that source via the Commerce API (up to the max) — the author does not enter individual products.

**Scenario A5 — Feature tile (optional)**
- **Given** the author provides a feature-tile image, label, and CTA
- **When** the block renders
- **Then** the feature tile shows with its CTA; if the feature tile is omitted, the carousel renders without it and no empty slot remains.

**Scenario A6 — No mandatory fields / graceful blank**
- **Given** the author leaves any subset of authorable fields empty
- **When** the block saves and previews
- **Then** it saves and renders without error; only empty elements are omitted; no placeholder text.

**Scenario A7 — Preview parity**
- **Given** the author has configured the block
- **When** they view DA preview
- **Then** the preview matches what will render on the published site.

## Dependencies
- Commerce API — New Arrivals product feed (provides products).
- DA authoring environment / block registration.

## Open Items
- Confirm the block table label used in DA.
- Confirm which layout option (Opton-1 / Opton-2) is default/MVP.
- Confirm product-source options exposed to authors (category vs. collection vs. SKU list vs. rule).
