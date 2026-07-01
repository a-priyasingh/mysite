# EDS Story — Mission / Support CTA Banner

**Type:** Story
**Component:** EDS Storefront (DA) — Content / CTA Block
**Related design:** Figma node 2749-47687 — `CTA_Component` (COMPONENT_SET). Two layout options across Desktop/Tablet/Mobile:
- **Option 01**: heading + subtext + CTA over a full-bleed background image (Desktop 1280×257, Tablet 768×286, Mobile 360×410).
- **Option 02**: heading + subtext + CTA with a decorative illustration/logo graphic (Desktop 1280×345, Tablet 768×288, Mobile 360×504).

---

## User Story
**As a** girlscoutshop.com visitor,
**I want** a mission/support message with a clear call to action,
**so that** I understand how my purchase supports Girl Scouts and can learn more.

**As a** content author,
**I want** to author the heading, subtext, CTA, and background/illustration, with everything optional,
**so that** I can run the mission callout without the block breaking if a field is empty.

---

## Description
Build a **mission/support CTA banner**: a heading, a supporting line, and a primary CTA ("Know More About Girl Scouts"), presented either over a full-bleed background image (Option 01) or alongside a decorative illustration (Option 02). Authored content.

---

## Design Specs (from Figma)
- Block width 1280; content max ~1168.
- **Heading**: Girl Scout Light(300) 36/43 (e.g., "When you support Girl Scouts, you empower…" / "Your purchase supports our mission to build…").
- **Subtext**: Trefoil Sans 400 16/21, `#2D2E33` (e.g., "Councils and partners play a key role in…").
- **Primary CTA**: "Know More About Girl Scouts" — button (~291–294×52), Trefoil Sans 500/600 16/21, white label on green fill, with icon.
- **Option 01**: content over a full-bleed background image (1280×257).
- **Option 02**: content + a decorative illustration/logo graphic (1280×345).
- GS brand tokens; green `#005640` accent.
- **Responsive variants** (verified): Option 01 — 1280×257 / 768×286 / 360×410; Option 02 — 1280×345 / 768×288 / 360×504 (content stacks; illustration scales/repositions).

### Hover Details
- **CTA button**: green fill darkens (≈`#004a37`) or inverts to outline on hover; icon nudges; cursor pointer; visible focus ring (≥3:1 contrast).
- **Global**: respect `prefers-reduced-motion`; hover has an equivalent keyboard-focus state; ≥44×44px tap target on mobile.

> Note: no explicit hover-state variants are defined in Figma — hover follows the GS brand green `#005640` and standard convention; confirm with design.

---

## EDS DA Authoring Details

| Displayed data | Content is sourced from | Required |
|----------------|-------------------------|----------|
| Heading | EDS | N |
| Subtext / supporting line | EDS | N |
| Primary CTA label | EDS | N |
| Primary CTA link | EDS | N |
| Background image (Option 01) | EDS | N |
| Decorative illustration/graphic (Option 02) | Code / EDS | N |
| Layout option (Option 01 / 02) | EDS | N |

- Authored as a block table (e.g., **`Mission CTA`**) in the page document.
- Author chooses the layout option and sets heading, subtext, CTA (label + link), and background image (Option 01).
- **All fields are optional** (see Acceptance Criteria).

## Authoring Acceptance Criteria
- [ ] Author can add the block and choose the layout option (Option 01 image-background / Option 02 illustration).
- [ ] Author can set heading, subtext, CTA (label + link), and background image.
- [ ] **No fields are mandatory.** The block renders with any combination of provided fields.
- [ ] **Graceful blanks:** if a field is left empty, the block must NOT break — only that part renders blank/omitted (empty subtext → no subtext line; no CTA → no button; no heading → heading omitted; no background image → default/plain background).
- [ ] Preview reflects the block (including partially-filled) before publish.

## User Acceptance Criteria
- [ ] Block renders the heading, subtext, CTA, and background/illustration per the chosen option.
- [ ] Missing fields display cleanly (blank/omitted part only) — no broken layout, no placeholder text leaking through.
- [ ] Clicking the CTA navigates to the authored target (e.g., "About Girl Scouts" page).
- [ ] Background/illustration images have alt text (or are marked decorative); text legible over the background (scrim/contrast).
- [ ] Responsive: content stacks/scales at tablet and mobile without overflow or distortion.
- [ ] Keyboard: CTA focusable with visible focus; Enter activates.
- [ ] WCAG 2.1 AA: heading structure (if present), accessible CTA name, sufficient text contrast over background; decorative graphics hidden from assistive tech.
- [ ] Performance: image/illustration optimized and appropriately loaded; aspect-ratio boxes prevent layout shift.

## Commerce Data Flow
- **Authored content — no catalog data.** Heading, subtext, CTA, and imagery are authored in DA.
- The CTA links to an authored page (e.g., an "About/Mission" content page).

## Dependencies
- Adobe Assets / DA for background image; code/asset for the Option 02 illustration.
- Shared button styles (GS design tokens).

## Open Items / Assumptions
- Confirm both layout options (Option 01 & 02) are in scope and the default.
- Confirm the CTA target URL ("Know More About Girl Scouts").
- Confirm whether the Option 02 illustration is fixed (code) or author-supplied.
- Confirm exact hover shade with design (none defined in Figma).
