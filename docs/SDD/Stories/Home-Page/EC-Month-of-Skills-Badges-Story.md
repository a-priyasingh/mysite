# EDS + ACCS Story — "A Month of Skills, Fun & New Badges" Block (Home Page)

**Type:** Story
**Component:** EDS Storefront (DA) — Editorial / Merchandising Block
**Related design:** Figma node 2831-51217 — `A Month of Skills, Fun & New Badges` (COMPONENT_SET: Desktop 1280×687, Tablet 768×649, Mobile 360×693). Heading "A Month of Skills, Fun & New Badges" (Girl Scout 26). Editorial feature with copy + a product/badge card carousel over a full-bleed background.

---

## User Story
**As a** caregiver/troop leader on girlscoutshop.com,
**I want** a themed monthly feature that pairs editorial copy with the related products/badges in a carousel,
**so that** I understand the month's activities and can shop the relevant items.

**As a** content author / merchandiser,
**I want** to configure the heading, copy, background, CTA, and the product/badge cards,
**so that** I can refresh the monthly feature without code changes.

---

## Description
Build an **editorial feature block** with a full-bleed background image, a heading + intro/body copy, a "Know more" CTA, and a horizontal **carousel of product/badge cards** (4 visible on desktop) with arrows and dots. The block is responsive (Desktop / Tablet / Mobile).

---

## Design Specs (from Figma)
- Block width 1280; content frame ~1216.
- **Background**: full-bleed image behind the content (masked rectangle + decorative ellipse shape `Ellipse 46`).
- **Heading**: "A Month of Skills, Fun & New Badges" — Girl Scout 26.
- **Intro copy**: Trefoil Sans 16 ("From handy essentials to fun extras…").
- **Body paragraphs**: Girl Scout 18 and 16 ("Throughout September, the troop will engage…", "As they complete these experiences…").
- **Card carousel** (`Frame 2134284665`, 1216×332): 4 cards visible, each a **product/badge image card 256×332** (aspect ~3:4).
- **Slider Arrows**: 40×40 (Arrow Main 24×24 icon).
- **Dots indicator** (`Carsoul_Icon`): active dot larger/solid, inactive faded.
- **CTA**: "Know more" button — Trefoil Sans 500 16/21, green `#005640`.
- GS brand tokens; green `#005640` accents.
- **Responsive variants** (verified): Desktop 1280×687, Tablet 768×649, Mobile 360×693 (swipe-first; ~1.5–2 cards visible).

### Hover Details
- **Product/badge card**: image zoom (~1.03–1.05) + subtle shadow/scrim on hover; entire card is one link; cursor pointer. On touch → pressed-state (no hover).
- **"Know more" CTA**: green `#005640` darken / underline on hover; icon nudges; visible focus ring (≥3:1 contrast).
- **Slider arrows**: hover = green `#005640` fill with white icon (or darken from default); greyed/disabled at ends if not looping; ≥44×44px tap target on mobile.
- **Dots**: active solid/larger, inactive faded; hover scales slightly; each dot tappable to jump to a slide.
- **Global**: respect `prefers-reduced-motion` (disable zoom/transition); every hover has an equivalent keyboard-focus state; arrows are swipe-first on mobile.

> Note: no explicit hover-state variants are defined in Figma for this block — hover behaviors follow the GS brand green `#005640` and standard convention; confirm with design.

---

## EDS DA Authoring Details

| Displayed data | Content is sourced from | Required |
|----------------|-------------------------|----------|
| Section heading (A Month of Skills, Fun & New Badges) | EDS | Y |
| Background image | EDS | N |
| Intro copy | EDS | N |
| Body paragraph(s) | EDS | N |
| Primary CTA label ("Know more") | EDS | N |
| Primary CTA link | EDS | N |
| Product / badge card image | EDS | N |
| Product / badge card link | EDS | N |
| Card order / sequence | EDS | N |
| Carousel navigation controls (arrows, dots) | Code | N |

- Authored as a block table (e.g., **`Skills and Badges Feature`**) in the home page document.
- Author sets: heading, background image, intro/body copy, CTA (label + link), and the carousel cards (image + link each).
- Carousel controls and decorative background mask/ellipse are rendered by the block (code).

## Authoring Acceptance Criteria
- [ ] Author can add the block and set the heading, intro, and body copy.
- [ ] Author can set the background image and the "Know more" CTA (label + link).
- [ ] Author can add/edit/remove/reorder product/badge cards (image + link).
- [ ] Cards render in a responsive carousel automatically (Desktop ~4 visible; tablet/mobile swipe with dots).
- [ ] Omitting the CTA or a card does not break the layout.
- [ ] Preview reflects the block before publish.

## User Acceptance Criteria
- [ ] Block renders the background, heading, copy, CTA, and the card carousel per design.
- [ ] Each card links to its target (product/badge/collection); the "Know more" CTA navigates to the authored page.
- [ ] Carousel navigable via arrows (desktop), swipe (mobile), and dots.
- [ ] Hover: card zoom/scrim and CTA hover states per Design Specs.
- [ ] Background and card images have alt text; copy legible over the background (scrim/contrast).
- [ ] Responsive: copy and carousel adapt at tablet and mobile without overflow or distortion.
- [ ] Keyboard: cards, CTA, arrows, dots operable with visible focus; slide changes announced (aria-live); no keyboard trap.
- [ ] WCAG 2.1 AA: meaningful alt text, accessible link/button names, sufficient text contrast over background, heading structure; decorative background hidden from assistive tech.
- [ ] Performance: images optimized and lazy-loaded (below the fold); aspect-ratio boxes prevent layout shift; respects prefers-reduced-motion.

## Commerce Data Flow
- **Primarily authored content** — heading, copy, background, CTA, and cards (image + link) are authored in DA.
- **Card links** resolve to **ACCS product/collection PLPs** (the related badge/skill items). Links should align to the ACCS catalog.
- **Images** resolve from Adobe Assets / DA.
- (Optional future: bind the card set to an ACCS collection/category so the "month's" products update from the catalog — not in this story's scope.)

## Dependencies
- ACCS Catalog products/collections (card link targets).
- Adobe Assets / DA for background + card imagery.
- Shared carousel + button styles (GS design tokens).

## Open Items / Assumptions
- Confirm whether the cards are **authored links** or should bind to an ACCS collection/category (e.g., the month's badge products).
- Confirm the "Know more" CTA target.
- Confirm exact hover shades with design (none defined in Figma).
- Confirm tablet/mobile cards-per-view and whether copy reflows above/below the carousel.
- Confirm how often the feature changes (monthly) and whether scheduling is needed.
