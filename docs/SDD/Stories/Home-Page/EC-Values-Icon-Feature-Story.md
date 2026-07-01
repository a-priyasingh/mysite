# EDS Story — "Values" / Icon Feature Block

**Type:** Story
**Component:** EDS Storefront (DA) — Content Block
**Related design:** Figma node 2751-47320 — `Values` (COMPONENT_SET). Two layout options across Desktop/Tablet/Mobile:
- **Component 01**: single row of 4 icon cards, no section title (Desktop 1280×226, Tablet 768×380, Mobile 360×430).
- **Component 02**: section title + multiple rows of icon cards (Desktop 1280×512, Tablet 768×573, Mobile 360×775).

---

## User Story
**As a** girlscoutshop.com visitor,
**I want** a row of value/feature callouts (icon + short label + subtext),
**so that** I quickly understand key brand values or services (e.g., "Made in the USA", "Inclusive sizing", "In‑Store Services from Local Councils").

**As a** content author,
**I want** to author the optional section title and each icon card (icon, title, subtext) with everything optional,
**so that** I can show as many or as few callouts as needed without the block breaking.

---

## Description
Build a **Values / Icon Feature** block: an optional section title plus a responsive grid/row of icon cards. Each card = a circular icon + a title + a subtext line. Supports two layouts (Component 01 = titleless single row; Component 02 = titled, multi-row). This is authored content.

---

## Design Specs (from Figma)
- Block width 1280; content max ~1168.
- **Section title** (Component 02 only): Girl Scout Light(300) 36/43, black (e.g., "In‑Store Services from Local Councils").
- **Icon card** (274×130): circular icon badge (60×60, ~40×40 icon inside) + text block:
  - **Card title**: Trefoil Sans 500 18/25, black (e.g., "Made in the USA", "Build a Bear").
  - **Subtext**: Trefoil Sans 500 14/20, `#2D2E33` (e.g., "Subtext placeholder").
- **Layout**: Component 01 = 4 cards in one row; Component 02 = title + rows of 4 cards.
- GS brand tokens; green `#005640` accents.
- **Responsive variants** (verified): reflows to fewer columns on tablet/mobile (cards stack; Component 02 mobile is tallest at 360×775).

### Hover Details
- **Card** (if the card links out): subtle background/shadow lift on hover; title color shift toward green `#005640`; cursor pointer. If cards are non-interactive (informational), no hover.
- **Global**: respect `prefers-reduced-motion`; any hover has an equivalent keyboard-focus state; ≥44×44px tap target on mobile if interactive.

> Note: no explicit hover-state variants are defined in Figma — hover follows the GS brand green `#005640` and standard convention; confirm with design. Also confirm whether cards are informational or clickable.

---

## EDS DA Authoring Details

| Displayed data | Content is sourced from | Required |
|----------------|-------------------------|----------|
| Section title (Component 02) | EDS | N |
| Card icon | EDS (or Code icon set) | N |
| Card title | EDS | N |
| Card subtext | EDS | N |
| Card link (optional) | EDS | N |
| Layout option (Component 01 / 02) | EDS | N |
| Card order / count | EDS | N |

- Authored as a block table (e.g., **`Values`**) in the page document; each row = one card.
- Author sets the optional section title, chooses the layout option, and for each card sets icon, title, subtext, and optional link.
- **All fields are optional** (see Acceptance Criteria) — the block adapts to whatever is provided.

## Authoring Acceptance Criteria
- [ ] Author can add the block and choose the layout option (Component 01 titleless / Component 02 titled).
- [ ] Author can add/edit/remove/reorder cards.
- [ ] Author can set an optional section title, and per card: icon, title, subtext, and optional link.
- [ ] **No fields are mandatory.** The block renders with any combination of provided fields.
- [ ] **Graceful blanks:** if a field is left empty, the block must NOT break — only that part renders blank/omitted (e.g., empty subtext → no subtext line; no icon → no icon badge; no title → title omitted; no section title → title area collapses).
- [ ] Omitting a card, or providing fewer/more cards, reflows the row/grid without breaking layout.
- [ ] Preview reflects the block (including partially-filled cards) before publish.

## User Acceptance Criteria
- [ ] Block renders the (optional) title and the icon cards per design.
- [ ] Cards with missing fields display cleanly (blank/omitted part only) — no broken layout, no placeholder text leaking through.
- [ ] If a card has a link, clicking it navigates correctly; if not, the card is presented as informational.
- [ ] Icons/images have appropriate alt text (or are marked decorative when informational).
- [ ] Responsive: cards reflow to fewer columns / stack on tablet and mobile without overflow or distortion.
- [ ] Keyboard: any interactive cards/links are focusable with visible focus.
- [ ] WCAG 2.1 AA: heading structure (if title present), sufficient contrast, accessible names for interactive cards; decorative icons hidden from assistive tech.
- [ ] Performance: icons optimized; aspect-ratio boxes prevent layout shift.

## Commerce Data Flow
- **Authored content — no catalog data.** Title, icons, titles, subtext, and optional links are authored in DA.
- Optional card links may point to content/PLP pages (authored URLs).

## Dependencies
- Adobe Assets / DA (or a code icon set) for the card icons.
- Shared card + icon styles (GS design tokens).

## Open Items / Assumptions
- Confirm whether cards are informational or clickable (affects hover + a11y).
- Confirm icon source: author-selected images vs. a fixed code icon library.
- Confirm both layout options (Component 01 & 02) are in scope, and default column counts per breakpoint.
- Confirm exact hover behavior with design (none defined in Figma).
