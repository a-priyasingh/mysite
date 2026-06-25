# EDS Story — "Customer Stories" Block (Home Page)

**Type:** Story
**Component:** EDS Storefront (DA) — Content Block (editorial)
**Related design:** Figma node 2751-46705 — `Customer_Stories` (COMPONENT_SET: Default / Tablet / Mobile). Default 1280×801, Tablet 768×712, Mobile 360×592.

---

## User Story
**As a** girlscoutshop.com visitor,
**I want** an inspiring "Customer Stories" section with imagery and a short message,
**so that** I connect with the Girl Scouts community and feel encouraged to engage.

**As a** content author,
**I want** to manage the story images, caption text, and CTA,
**so that** I can refresh the storytelling content without code changes.

---

## Description
Build a **Customer Stories** block: a heading, a carousel/gallery of story images, a caption (headline + supporting line), a slide-position indicator, navigation arrows, and a "Know More" CTA. This is **authored editorial content** — no commerce/catalog data.

---

## Design Specs (from Figma — Default/Desktop)
- **Heading**: "Customer Stories" — Girl Scout Light(300) 36/43, black.
- **Image group** (1168×393): a row/carousel of **3 images** at **aspect 3:2** — two at 461×307 and one larger feature at 590×393 (mixed-size collage that advances as a carousel).
- **Caption** (below images):
  - Headline line — Trefoil Sans 500 20/24, black (e.g., "Girl Scouts have been taking the lead…").
  - Supporting line — Trefoil Sans 400 20/24, black (e.g., "Join us and help make an impact!").
- **Slide indicator**: dots (`Carsoul_Icon`).
- **CTA**: "KNOW MORE" button — Trefoil Sans 500 16/21, green `#005640`.
- **Slider Arrows**: 40×40 (Arrow Main 24×24 icon).
- GS brand tokens; green `#005640` accents.
- **Responsive variants** (verified): Default 1280×801, Tablet 768×712, Mobile 360×592.

## Hover / Touch
- Slider arrows: green fill + white icon on hover; ≥44×44px on mobile.
- Dots: active = solid, inactive = faded; hover scale; tappable.
- CTA: green darken / underline on hover; chevron/icon nudge.
- Images: subtle zoom on hover if clickable.
- Mobile: swipe between stories; pressed states (no hover). Respect `prefers-reduced-motion`.

---

## EDS DA Authoring Details
Authored as a block table (e.g., **`Customer Stories`**) in the home page document. The mixed-size image collage is a layout treatment of the block — the author supplies images; the block arranges them per the design.

| Displayed data | Content is sourced from | Required |
|----------------|-------------------------|----------|
| Section heading (Customer Stories) | EDS | Y |
| Story image | EDS | N |
| Story title / headline | EDS | N |
| Story description / body copy | EDS | N |
| Primary CTA label | EDS | N |
| Primary CTA link | EDS | N |
| Carousel / slide navigation controls | EDS | N |

## Authoring Acceptance Criteria
- [ ] Author can add the block and set the heading.
- [ ] Author can add/edit/remove/reorder story slides (images + headline + supporting text).
- [ ] Author can set the CTA label and link; omitting the CTA hides it cleanly.
- [ ] Author can toggle autoplay/loop.
- [ ] Single-slide content renders without carousel controls; multi-slide shows arrows + dots.
- [ ] Preview reflects the block before publish.

## User Acceptance Criteria
- [ ] Block renders heading, story imagery, caption, dots, arrows, and CTA per design.
- [ ] Visitor can navigate stories via arrows (desktop) and swipe (mobile); dots reflect position and are clickable.
- [ ] Autoplay (if enabled) pauses on hover/focus.
- [ ] CTA navigates to the authored target.
- [ ] Images have alt text; caption text legible.
- [ ] Responsive: collage/caption adapt at tablet and mobile without overflow or distortion.
- [ ] Keyboard: arrows/dots/CTA operable with visible focus; slide changes announced (aria-live).
- [ ] WCAG 2.1 AA: region labeled, controls have accessible names, contrast and focus correct.
- [ ] Performance: images optimized and lazy-loaded (below the fold); aspect-ratio boxes prevent layout shift.

## Commerce Data Flow
- **None — fully authored editorial content.** Images and text are authored in DA; the CTA is an authored link (may point to a campaign/landing/sign-up page).
- (No ACCS catalog data involved.)

## Dependencies
- Adobe Assets / DA for story imagery.
- Shared carousel + button styles (GS design tokens).

## Open Items / Assumptions
- Confirm the image collage pattern per slide (fixed 3-image layout vs. single image per slide advancing).
- Confirm CTA target ("Know More" → which page).
- Confirm tablet/mobile layout (how the 3-image collage reflows).
- Confirm whether stories are static authored content or sourced from a feed (assumed authored).
