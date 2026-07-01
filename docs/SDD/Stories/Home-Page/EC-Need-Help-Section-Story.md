# EDS Story — "Need Help" Section

**Type:** Story
**Component:** EDS Storefront (DA) — Content / CTA Block
**Related design:** Figma node 2751-47483 — `Need Help_Section` (COMPONENT_SET: Desktop 1280×85, Tablet 768×120, Mobile 360×139).

---

## User Story
**As a** girlscoutshop.com visitor,
**I want** a compact "Need Help?" strip with a link to help/FAQs,
**so that** I can quickly get support or answers to my questions.

**As a** content author,
**I want** to author the help message and the CTA (label + link), with everything optional,
**so that** I can maintain the support prompt without the block breaking if a field is empty.

---

## Description
Build a compact **support CTA strip**: a short "Need Help?" message with a supporting line and a "View help & FAQs" link. Authored content, responsive across Desktop / Tablet / Mobile.

---

## Design Specs (from Figma)
- Compact strip; content max ~1168; height ~85 (desktop).
- **Message (heading)**: Girl Scout 400 18/22, black (e.g., "Need Help? We have answers to all your…").
- **Supporting line**: Trefoil Sans 400 20/21, black.
- **CTA**: "View help & faqs" — link/button (~151×37), Trefoil Sans 500 16/21, green `#005640`, with arrow icon.
- GS brand tokens; green `#005640` accent.
- **Responsive variants** (verified): Desktop 1280×85, Tablet 768×120, Mobile 360×139 (content stacks; CTA wraps below on mobile).

### Hover Details
- **CTA ("View help & faqs")**: underline + green `#005640` emphasis on hover; arrow nudges right ~4px; cursor pointer; visible focus ring (≥3:1 contrast).
- **Global**: respect `prefers-reduced-motion`; hover has an equivalent keyboard-focus state; ≥44×44px tap target on mobile.

> Note: no explicit hover-state variants are defined in Figma — hover follows the GS brand green `#005640` and standard convention; confirm with design.

---

## EDS DA Authoring Details

| Displayed data | Content is sourced from | Required |
|----------------|-------------------------|----------|
| Message / heading (Need Help?) | EDS | N |
| Supporting line | EDS | N |
| CTA label ("View help & faqs") | EDS | N |
| CTA link (Help/FAQ page) | EDS | N |

- Authored as a block table (e.g., **`Need Help`**) in the page document.
- Author sets the message, supporting line, and CTA (label + link).
- **All fields are optional** (see Acceptance Criteria).

## Authoring Acceptance Criteria
- [ ] Author can add the block and set the message, supporting line, and CTA (label + link).
- [ ] **No fields are mandatory.** The block renders with any combination of provided fields.
- [ ] **Graceful blanks:** if a field is left empty, the block must NOT break — only that part renders blank/omitted (empty supporting line → no supporting line; no CTA → no link; no message → message omitted).
- [ ] Preview reflects the block (including partially-filled) before publish.

## User Acceptance Criteria
- [ ] Block renders the message, supporting line, and CTA per design.
- [ ] Missing fields display cleanly (blank/omitted part only) — no broken layout, no placeholder text leaking through.
- [ ] Clicking "View help & faqs" navigates to the authored Help/FAQ page.
- [ ] Text legible; sufficient contrast.
- [ ] Responsive: content stacks/wraps cleanly on tablet and mobile without overflow.
- [ ] Keyboard: CTA focusable with visible focus; Enter activates.
- [ ] WCAG 2.1 AA: heading structure (if present), accessible CTA name, sufficient contrast.
- [ ] Performance: lightweight; no layout shift.

## Commerce Data Flow
- **Authored content — no catalog data.** Message, supporting line, and CTA are authored in DA.
- The CTA is an authored link to the Help/FAQ page.

## Dependencies
- Help / FAQ page (CTA target).
- Shared link/button styles (GS design tokens).

## Open Items / Assumptions
- Confirm the CTA target URL (Help/FAQ page path).
- Confirm placement (home footer-area strip, and/or other pages).
- Confirm exact hover behavior with design (none defined in Figma).
