# EDS Story — Hero / Banner Carousel (Home Page)

**Type:** Story
**Component:** EDS Storefront (DA) — Content Block
**Related design:** Figma node 2723-359761 — `Banner` (COMPONENT_SET: Desktop Banner 16:9 1280×720, Tablet Banner 16:9 768×432, Mobile 3:4 360×480).
**Note:** Same block as the earlier Jira-CSV set `Figma-Hero-Carousel-User-Stories.csv` (node 5168-208528). This is the consolidated standard-format story for the master component set.

---

## User Story
**As a** girlscoutshop.com visitor,
**I want** a rotating hero banner with promotional messaging and calls to action at the top of the home page,
**so that** I see current promotions and can act on them.

**As a** content author / merchandiser,
**I want** to author each slide (image, eyebrow, heading, CTAs, terms link) and control the carousel behavior,
**so that** I can run promotions without code changes.

---

## Description
Build a multi-slide **hero/banner carousel** at the top of the home page. Each slide has a full-bleed background image with an overlaid text block (eyebrow + heading), a primary and secondary CTA, and an optional Terms & Conditions link. Navigation via arrows, a position counter ("1/5"), and dots. Responsive across Desktop / Tablet / Mobile.

---

## Design Specs (from Figma)
- **Layout**: vertical flex, justify space-between, padding 60px 120px (desktop). Full-bleed background image; a scrim ensures text contrast.
- **Eyebrow**: "Shop Early and Save" — Girl Scout Bold(700) 20/24, white.
- **Heading**: "Get 20% Off on orders of $50 or more*" — Girl Scout Bold(700) 48/58, white.
- **Primary CTA**: "Shop PRODUCTS" — button, Trefoil Sans 500 16/21, uppercase label, white.
- **Secondary CTA**: "Explore More" — text link + right arrow icon, Trefoil Sans 500 16/21, white.
- **Terms link**: "Terms & Conditions*" — Trefoil Sans 500 12/17, white (bottom).
- **Navigation**: green circular Slider Arrows (40×40, Arrow Main 24×24); position counter "1/5" (Trefoil Sans 400 16/19) with Left/Right (36×36); white dots indicator (active larger/solid, inactive faded).
- GS brand tokens; green `#005640` accents.
- **Responsive variants** (verified): Desktop 1280×720 (16:9), Tablet 768×432 (16:9), Mobile 360×480 (3:4 portrait crop — content and heading scale down; arrows smaller/hidden, swipe-first).

### Hover Details
- **Primary CTA (button)**: invert to solid white bg / green `#005640` text (or fill-darken) on hover; cursor pointer; visible focus ring (≥3:1 contrast).
- **Secondary CTA (text link)**: underline + arrow nudges right ~4px on hover.
- **Slider arrows**: default white bg / green icon; hover = green `#005640` fill / white icon; ≥44×44px tap target on mobile.
- **Dots**: active solid/larger, inactive faded; hover scales ~1.1; each dot tappable to jump to a slide.
- **Counter (1/5)** Left/Right: hover highlight; cursor pointer.
- **Global**: autoplay pauses on hover/focus; respect `prefers-reduced-motion` (disable autoplay/transitions); every hover has an equivalent keyboard-focus state; on mobile, swipe-first with pressed-states (no hover).

> Note: no explicit hover-state variants are defined in Figma for this block — hover behaviors follow the GS brand green `#005640` and standard convention; confirm with design.

---

## EDS DA Authoring Details

| Displayed data | Content is sourced from | Required |
|----------------|-------------------------|----------|
| Slide background image | EDS | Y |
| Eyebrow text | EDS | N |
| Heading | EDS | Y |
| Primary CTA label | EDS | N |
| Primary CTA link | EDS | N |
| Secondary CTA label | EDS | N |
| Secondary CTA link | EDS | N |
| Terms & Conditions label | EDS | N |
| Terms & Conditions link | EDS | N |
| Slide order / sequence | EDS | N |
| Autoplay / interval / loop settings | EDS | N |
| Carousel navigation controls (arrows, counter, dots) | Code | N |

- Authored as a block table (e.g., **`Carousel`** / `Hero Carousel`) in the home page document; each row = one slide.
- Author sets per slide: background image (required), heading (required), eyebrow, primary/secondary CTA (label + link), Terms link.
- Author can toggle autoplay, interval, and loop. Carousel controls are rendered by the block (code).

## Authoring Acceptance Criteria
- [ ] Author can add the block and add/edit/remove/reorder slides (each row = a slide).
- [ ] Per slide, author can set background image, eyebrow, heading, primary CTA (label+link), secondary CTA (label+link), and Terms link.
- [ ] Author can toggle autoplay, set interval, and loop.
- [ ] Omitting optional fields (eyebrow, secondary CTA, Terms) hides those elements without layout break.
- [ ] Single-slide content renders without carousel controls; multi-slide shows arrows, counter, and dots.
- [ ] Preview reflects the carousel before publish.

## User Acceptance Criteria
- [ ] First slide renders on load; visitor can navigate via arrows, dots, and the "1/5" counter.
- [ ] Autoplay (if enabled) advances slides and pauses on hover/focus.
- [ ] CTAs navigate to the authored URLs; Terms link opens the authored target.
- [ ] Background images have alt text; heading/eyebrow legible over the image (scrim/contrast).
- [ ] Responsive: renders at 1280×720 (16:9), 768×432, and 360×480 (3:4) without text overflow or image distortion; mobile is swipe-first.
- [ ] Keyboard: arrows, dots, counter, and CTAs operable with visible focus; slide changes announced (aria-live); no keyboard trap.
- [ ] WCAG 2.1 AA: region labeled (aria-roledescription=carousel), controls have accessible names, text contrast over image ≥4.5:1 (scrim as needed), focus visible.
- [ ] Performance: hero image is the likely LCP element — optimized/eager-loaded with correct dimensions; no layout shift; respects prefers-reduced-motion.

## Commerce Data Flow
- **Fully authored content — no commerce/catalog data.** Images, text, and links are authored in DA.
- CTAs are authored links that may deep-link to a PLP/category or promo landing page.

## Dependencies
- Adobe Assets / DA for slide imagery.
- Shared carousel + button styles (GS design tokens).

## Open Items / Assumptions
- Confirm max slides and default autoplay interval.
- Confirm exact hover shades with design (none defined in Figma).
- Confirm whether both the "1/5" counter AND the dots indicator are retained, or one is dropped per breakpoint.
- Confirm mobile crop/focal-point handling (3:4) vs. desktop (16:9) — whether a separate mobile image is authored.
