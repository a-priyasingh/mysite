# EDS Story — Static Informational Block

**Type:** Story
**Component:** EDS Storefront (DA) — Static Content Block (informational)
**Related design:** Figma node 3289-105402 — informational block (COMPONENT_SET: Desktop 1280×606, Tablet 768×566, Mobile 360×775).

---

## Functional Use Case
This is a **static block configured in EDS, for information purposes.** It presents a set of informational rows (icon + title + description) with an optional CTA. Content is authored; there is no commerce/catalog data and no dynamic behavior beyond the CTA link.

---

## User Story
**As a** girlscoutshop.com visitor,
**I want** a clear informational block explaining a topic (e.g., "Who Are Girl Scout Daisies?", how products are designed, what they support),
**so that** I understand the context behind the products before I shop.

**As a** content author,
**I want** to author the informational rows (icon, title, description) and an optional CTA, with everything optional,
**so that** I can maintain the informational content without the block breaking if a field is empty.

---

## Description
Build a **static informational block**: a stacked list of informational rows, each with an icon, a title, and a description, plus an optional CTA button and a decorative illustration. Authored content, responsive across Desktop / Tablet / Mobile.

---

## Design Specs (from Figma)
- Block width 1280; content max ~1040.
- **Informational row** (repeated; 3 shown in design): icon (48×48) + text block:
  - **Row title**: Trefoil Sans 500 24/29, black (e.g., "Who Are Girl Scout Daisies?", "How Daisy Products Are Designed", "What These Products Support").
  - **Row description**: Trefoil Sans 400 16/22, `#2D2E33`.
- **CTA**: "Know More About Girl Scouts" — button (~294×52), Trefoil Sans 600 16/21, white label on green fill, with icon.
- **Decorative illustration** strip (bottom, code/asset-provided).
- GS brand tokens; green `#005640` accent.
- **Responsive variants** (verified): Desktop 1280×606, Tablet 768×566, Mobile 360×775 (rows stack).

### Hover Details
- **CTA button**: green fill darkens (≈`#004a37`) or inverts to outline on hover; icon nudges; cursor pointer; visible focus ring (≥3:1 contrast).
- **Global**: respect `prefers-reduced-motion`; hover has an equivalent keyboard-focus state; ≥44×44px tap target on mobile. (Informational rows are static/non-interactive — no hover.)

> Note: no explicit hover-state variants are defined in Figma — hover follows the GS brand green `#005640` and standard convention; confirm with design.

---

## EDS DA Authoring Details

| Displayed data | Content is sourced from | Required |
|----------------|-------------------------|----------|
| Row icon | Code / EDS | N |
| Row title | EDS | N |
| Row description | EDS | N |
| Row count / order | EDS | N |
| CTA label ("Know More About Girl Scouts") | EDS | N |
| CTA link | EDS | N |
| Decorative illustration | Code | N |

- Authored as a block table (e.g., **`Info Block`**) in the page document; each row = one informational item.
- Author sets each row's icon, title, and description, plus an optional CTA (label + link).
- **All fields are optional** (see Acceptance Criteria). Decorative illustration is code-provided.

## Authoring Acceptance Criteria
- [ ] Author can add the block and add/edit/remove/reorder informational rows.
- [ ] Per row, author can set icon, title, and description.
- [ ] Author can set an optional CTA (label + link).
- [ ] **No fields are mandatory.** The block renders with any combination of provided fields.
- [ ] **Graceful blanks:** if a field is left empty, the block must NOT break — only that part renders blank/omitted (empty description → no description line; no icon → no icon; no title → title omitted; no CTA → no button; fewer/more rows reflow cleanly).
- [ ] Preview reflects the block (including partially-filled) before publish.

## User Acceptance Criteria
- [ ] Block renders the informational rows (icon + title + description) and optional CTA per design.
- [ ] Missing fields display cleanly (blank/omitted part only) — no broken layout, no placeholder text leaking through.
- [ ] Clicking the CTA navigates to the authored target.
- [ ] Icons have appropriate alt text (or are marked decorative); description text legible.
- [ ] Responsive: rows stack cleanly on tablet and mobile without overflow or distortion.
- [ ] Keyboard: CTA focusable with visible focus; Enter activates.
- [ ] WCAG 2.1 AA: heading/row-title structure, accessible CTA name, sufficient contrast; decorative icons/illustration hidden from assistive tech.
- [ ] Performance: static block; icons/illustration optimized; no layout shift.

## Commerce Data Flow
- **None — static, authored informational content.** Rows, icons, text, and CTA are authored in DA; no commerce/catalog data.
- The CTA is an authored link (e.g., to an "About/Info" content page).

## Dependencies
- Adobe Assets / DA (or a code icon set) for the row icons and decorative illustration.
- Shared button styles (GS design tokens).

## Open Items / Assumptions
- Confirm number of informational rows is author-controlled (design shows 3).
- Confirm icon source: author-selected vs. a fixed code icon library.
- Confirm placement (e.g., grade/category info pages such as the Daisy page).
- Confirm the CTA target URL.
- Confirm exact hover shade with design (none defined in Figma).
