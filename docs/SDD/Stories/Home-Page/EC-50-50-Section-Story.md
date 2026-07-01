# EDS Story — "50-50 Section" Block (Image + Text Split)

**Type:** Story
**Component:** EDS Storefront (DA) — Content Block
**Related design:** Figma node 2734-46116 — `50-50_Section` (COMPONENT_SET: Desktop 1280×676, Tablet 768×1047, Mobile 360×803).

---

## User Story
**As a** girlscoutshop.com visitor,
**I want** a balanced section pairing an editorial message with supporting imagery,
**so that** I can engage with storytelling content alongside relevant visuals.

**As a** content author,
**I want** to author the text side (icon, heading, body, optional CTA) and the image side, with everything optional,
**so that** I can present the section flexibly without the block breaking if a field is empty.

---

## Description
Build a **50/50 split section**: one half is a text/content block (decorative icon + heading + body copy + optional CTA), the other half is an image collage. On smaller viewports the two halves stack. Authored content.

---

## Design Specs (from Figma)
- Block width 1280; content max ~1168; height ~676 (desktop).
- **Text half** (~476 wide): a decorative icon/illustration (~72×84) + a text block (heading + body copy — Trefoil Sans 400 16/19, e.g., "Every Girl Scout has their own curiosity, drive…"), with an optional CTA.
- **Image half** (~572 wide): an image collage — two **4:3 images** (274×206) + one **2:1 image** (572×286).
- Layout: text and image halves sit side-by-side on desktop; the image side left/right placement per design.
- GS brand tokens; green `#005640` accents.
- **Responsive variants** (verified): Desktop 1280×676, Tablet 768×1047, Mobile 360×803 (halves **stack vertically**; images reflow).

### Hover Details
- **CTA** (if present): green `#005640` darken / underline on hover; icon nudges; visible focus ring (≥3:1 contrast).
- **Images** (if clickable): subtle zoom/shadow on hover; otherwise informational (no hover).
- **Global**: respect `prefers-reduced-motion`; hover has an equivalent keyboard-focus state; ≥44×44px tap target on mobile if interactive.

> Note: no explicit hover-state variants are defined in Figma — hover follows the GS brand green `#005640` and standard convention; confirm with design.

---

## EDS DA Authoring Details

| Displayed data | Content is sourced from | Required |
|----------------|-------------------------|----------|
| Decorative icon / illustration | Code / EDS | N |
| Heading | EDS | N |
| Body copy | EDS | N |
| CTA label | EDS | N |
| CTA link | EDS | N |
| Image(s) — collage (4:3 x2, 2:1 x1) | EDS | N |
| Image / text side placement | EDS | N |

- Authored as a block table (e.g., **`50-50 Section`**) in the page document.
- Author sets the text side (icon, heading, body, optional CTA) and the image side (collage images), and may choose which side the image is on.
- **All fields are optional** (see Acceptance Criteria).

## Authoring Acceptance Criteria
- [ ] Author can add the block and set heading, body copy, optional CTA (label + link), and image(s).
- [ ] Author can choose image-side placement (left/right).
- [ ] **No fields are mandatory.** The block renders with any combination of provided fields.
- [ ] **Graceful blanks:** if a field is left empty, the block must NOT break — only that part renders blank/omitted (empty body → no body copy; no CTA → no button; no heading → heading omitted; missing image → that image slot collapses; text-only or image-only renders cleanly).
- [ ] Preview reflects the block (including partially-filled) before publish.

## User Acceptance Criteria
- [ ] Block renders the text half and image half per design.
- [ ] Missing fields display cleanly (blank/omitted part only) — no broken layout, no placeholder text leaking through.
- [ ] If a CTA is present, clicking it navigates to the authored target.
- [ ] Images have alt text (or are marked decorative); body copy legible.
- [ ] Responsive: the two halves **stack vertically** on tablet and mobile; the image collage reflows without distortion or overflow.
- [ ] Keyboard: any CTA/interactive image is focusable with visible focus.
- [ ] WCAG 2.1 AA: heading structure (if present), accessible CTA name, sufficient contrast; decorative icon/images hidden from assistive tech.
- [ ] Performance: images optimized and lazy-loaded (below the fold); aspect-ratio boxes prevent layout shift.

## Commerce Data Flow
- **Authored content — no catalog data.** Icon, heading, body, CTA, and images are authored in DA.
- Optional CTA/image links point to authored content/PLP pages.

## Dependencies
- Adobe Assets / DA for collage imagery; code/asset for the decorative icon.
- Shared button styles (GS design tokens).

## Open Items / Assumptions
- Confirm the image collage pattern (fixed 3-image layout: two 4:3 + one 2:1) vs. flexible.
- Confirm whether a CTA is part of the text side.
- Confirm image-side placement is author-configurable (left/right) or fixed.
- Confirm exact hover behavior with design (none defined in Figma).
