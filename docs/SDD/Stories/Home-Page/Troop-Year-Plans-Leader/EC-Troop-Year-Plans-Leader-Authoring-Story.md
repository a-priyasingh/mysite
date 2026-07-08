# EDS Authoring Story — Shop by Troop Year Plans (Leader) — Content Model & Authoring

**Type:** Story (EDS Authoring)
**Component:** EDS Storefront (DA) — Commerce Block (leader troop-year product carousel)
**Related design:** Figma node 2767-30801 — `Shop by Troop Year Plans-Leader` (Options 1/2 × Desktop/Tablet/Mobile).
**Companion stories:** Commerce API — Troop Year Plans (Leader) feed · ACCS Site Visit — Troop Year Plans (Leader) rendering & UX.
**Related:** Caregiver/Guest variant — `EC-Shop-by-Troop-Year-Plans-Story` (node 2905). This is the **Leader persona** variant (adds Year 1 / Year 2 troop-year tabs).
**Stream:** EDS Authoring (content model, authoring rules, DA preview).

## INVEST
- **Independent:** authoring/config only; consumes the Commerce API contract, testable with sample data.
- **Negotiable:** field set, year/level options, and CTA can be refined.
- **Valuable:** lets leaders shop the recommended troop materials per level and troop year.
- **Estimable:** bounded config surface.
- **Small:** one block's authoring model.
- **Testable:** pass/fail Given/When/Then below.

---

## User Story
**As a** content author / merchandiser,
**I want** to configure the Leader "Shop by Troop Year Plans" block (heading, subtext, level + troop-year tabs, layout option, product source per level/year, and CTA),
**so that** troop leaders see the right materials for a selected grade level and troop year without me maintaining product lists.

## Content Model

| Displayed data | Content is sourced from | Required |
|----------------|-------------------------|----------|
| Section heading ("Shop by Troop Year Plans") | EDS | N |
| Subtext | EDS | N |
| Level selector (Daisy…Ambassador) | EDS (config) → ACCS | N |
| Troop-year tabs (Year 1 / Year 2 …) | EDS (config) | N |
| Layout option (Option-01 / Option-02) | EDS | N |
| Product source per level + year | EDS (config) → ACCS | N |
| CTA ("Shop TROOP YEAR MATERIALS") label + link | EDS | N |
| Max products / autoplay / loop | EDS | N |
| Product card content (image, name, price, badges, swatches) | ACCS (dynamic) | N/A |
| Carousel / tab / selector controls | Code | N |

- Authored as a block table (e.g., **`Troop Year Plans`**) in the page document.
- Author configures the **product source per level + troop year**, not individual products.

## Acceptance Criteria (Given / When / Then)

**Scenario A1 — Add the block**
- **Given** an author is editing a page document in DA
- **When** they insert the `Troop Year Plans` (Leader) block
- **Then** the block appears and renders in preview with level selector, year tabs, and sample/live products.

**Scenario A2 — Heading & subtext**
- **Given** the block is in the document
- **When** the author sets heading and subtext
- **Then** they render; if empty, they are omitted and the block still renders.

**Scenario A3 — Levels & troop-year tabs**
- **Given** the block is in the document
- **When** the author configures the grade levels and troop-year tabs (e.g., Year 1 / Year 2)
- **Then** the selector shows those levels and the tabs show those years.

**Scenario A4 — Product source per level + year**
- **Given** the block is in the document
- **When** the author maps a product source for each level + year combination and sets max products
- **Then** selecting a level + year populates the carousel from that source via the Commerce API (up to max) — author does not enter individual products.

**Scenario A5 — Layout option**
- **Given** the block is in the document
- **When** the author selects Option-01 or Option-02
- **Then** the corresponding layout is applied in preview.

**Scenario A6 — CTA (optional)**
- **Given** the author provides a CTA label + link
- **When** the block renders
- **Then** the CTA shows and links correctly; if omitted, no CTA renders and layout stays intact.

**Scenario A7 — No mandatory fields / graceful blank**
- **Given** the author leaves any subset of authorable fields empty
- **When** the block saves and previews
- **Then** it saves and renders without error; only empty elements are omitted; no placeholder text.

**Scenario A8 — Preview parity**
- **Given** the author has configured the block
- **When** they view DA preview
- **Then** the preview matches what will render live.

## Dependencies
- Commerce API — Troop Year Plans (Leader) feed.
- DA authoring environment / block registration.

## Open Items
- Confirm level list and the number of troop-year tabs (Year 1 / Year 2 / more).
- Confirm product-source mapping granularity (per level, or per level + year).
- Confirm CTA target ("Shop TROOP YEAR MATERIALS" → PLP?).
- Confirm which layout option (Option-01 / Option-02) is MVP.
