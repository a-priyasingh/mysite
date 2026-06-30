# EDS + ACCS Story — "Shop by Collection" Block (Home Page)

**Type:** Story
**Component:** EDS Storefront (DA) — Commerce/Content Block
**Related design:** Figma node 2764-59039 — `Shop by Collection` (COMPONENT_SET: Desktop 1280×790, Tablet 768×477, Mobile 360×452). Heading "Shop by Collection" (Girl Scout Light 36/43). Carousel of collection cards with Slider Arrows, a "1/5" counter, and a dots indicator.

---

## User Story
**As a** girlscoutshop.com shopper,
**I want** to browse curated product collections (e.g., Cookie Gear, STEM Innovation, Outdoor Adventure, Art & Creativity) in a carousel,
**so that** I can discover themed product groupings and jump into the collection I want.

**As a** merchandiser / content author,
**I want** to configure the collection cards (image, collection name, link) shown in the carousel,
**so that** I can promote collections without code changes.

---

## Description
Build a **Shop by Collection** block: a heading plus a horizontal carousel of collection cards. Each card = a 4:5 image, a collection name, and a "Collection" CTA button; clicking navigates to that collection's PLP. The block is responsive (Desktop / Tablet / Mobile) with arrows, a position counter, and dots.

---

## Design Specs (from Figma)
- Block width 1280; content max ~1168.
- **Heading**: "Shop by Collection" — Girl Scout Light(300) 36/43, black.
- **Collection card** (374×554): image **aspect 4:5** (374×468) + content block (374×70): collection name (Girl Scout 400 18/22, black) + a **"Collection" button** (91×36; bright green fill `#00B451`, label text `#005640`, with arrow icon).
- ~4 cards visible on desktop; carousel advances horizontally.
- **Slider Arrows**: 40×40 (and a 56×56 variant) — Arrow Main 24×24 icon.
- **Position counter**: "1/5" (Trefoil Sans 400 16/22) with Left/Right controls (36×36).
- **Dots indicator** (`Carsoul_Icon`): active dot larger/solid, inactive faded.
- GS brand tokens; greens `#00B451` (button fill) and `#005640` (text/accent).
- **Responsive variants** (verified): Desktop 1280×790, Tablet 768×477, Mobile 360×452 (swipe-first; ~1.5–2 cards visible).

### Hover Details
- **Card image**: an overlay layer (`Image Default Hover`, 374×434) is defined in Figma at resting opacity 0 and **fades in on hover** (subtle scrim/darken); pair with image zoom (~1.03–1.05). Entire card is one link; cursor pointer.
- **"Collection" button**: hover darkens the green fill (≈`#009A45`) or inverts to outline; arrow icon nudges right ~4px; visible focus ring (≥3:1 contrast).
- **Collection name**: on card hover, color shifts toward green `#005640` / underline.
- **Slider arrows**: hover = green `#005640` fill with white icon (or darken from default); greyed/disabled at ends if not looping; ≥44×44px tap target on mobile.
- **Counter + dots**: counter arrows highlight on hover; dots — active solid/larger, inactive faded, hover scales slightly, each dot tappable to jump to a slide.
- **Global**: respect `prefers-reduced-motion` (disable zoom/scrim transitions); every hover has an equivalent keyboard-focus state; on touch, overlay/zoom become pressed-states and arrows are swipe-first.

> Note: the card image hover overlay is **explicitly defined in Figma** (`Image Default Hover`). Button/arrow/dot hover shades follow the GS brand greens visible in the component (`#00B451` / `#005640`) and standard convention — confirm exact hover shades with design.

---

## EDS DA Authoring Details

| Displayed data | Content is sourced from | Required |
|----------------|-------------------------|----------|
| Section heading (Shop by Collection) | EDS | Y |
| Collection card image | EDS | N |
| Collection name | EDS | N |
| Collection CTA label ("Collection") | EDS | N |
| Collection CTA link (collection PLP) | EDS | N |
| Card order / sequence | EDS | N |
| Carousel navigation controls (arrows, counter, dots) | Code | N |
| Card image hover overlay treatment | Code | N |

- Authored as a block table (e.g., **`Shop by Collection`**) in the home page document; each row = one collection card.
- Author sets per card: image, collection name, and link (collection PLP URL).
- Carousel controls and the hover overlay are rendered by the block (code), not authored.

## Authoring Acceptance Criteria
- [ ] Author can add the block and set the heading.
- [ ] Author can add/edit/remove/reorder collection cards (image, name, link).
- [ ] Each card links to the configured collection PLP; author can paste a URL.
- [ ] Cards render in a responsive carousel automatically (Desktop ~4 visible; tablet/mobile swipe with dots).
- [ ] Omitting a card does not break the carousel.
- [ ] Preview reflects the carousel before publish.

## User Acceptance Criteria
- [ ] Block renders the heading and a carousel of collection cards per design.
- [ ] Each card shows image, collection name, and the "Collection" button; clicking the card/button navigates to the collection PLP.
- [ ] Hover: image overlay fades in + zoom; button and name show their hover states (per Design Specs).
- [ ] Carousel navigable via arrows (desktop), swipe (mobile), and dots; the "1/5" counter updates to current/total.
- [ ] Images have alt text; collection names legible.
- [ ] Responsive: cards reflow/scroll cleanly at tablet and mobile without overflow or distortion.
- [ ] Keyboard: cards, button, arrows, and dots operable with visible focus; slide changes announced (aria-live); no keyboard trap.
- [ ] WCAG 2.1 AA: meaningful alt text, accessible link/button names, sufficient contrast, heading structure; decorative overlay hidden from assistive tech.
- [ ] Performance: images optimized and lazy-loaded (below the fold); aspect-ratio boxes prevent layout shift; respects prefers-reduced-motion.

## Commerce Data Flow
- **Primarily authored content** — cards (image, name, link) are authored in DA.
- **Links** resolve to **ACCS collection PLPs** (a category/collection URL key/path). Collections should align to ACCS catalog collections/categories so links stay valid.
- **Images** resolve from Adobe Assets / DA.
- (Optional future: auto-generate cards from ACCS collections — not in this story's scope.)

## Dependencies
- ACCS Catalog collections/categories (link targets).
- Adobe Assets / DA for card imagery.
- Shared carousel + button styles (GS design tokens).

## Open Items / Assumptions
- Confirm collections set (Figma shows Cookie Gear, STEM Innovation, Outdoor Adventure, Art & Creativity — placeholders).
- Confirm each card's link target (ACCS collection vs. category PLP).
- Confirm exact hover shades for button/arrow/dot with design.
- Confirm tablet/mobile cards-per-view and whether the counter ("1/5") is retained on mobile.
- Confirm overlap with "Shop by Category" (that one is a static grid; this is a collection carousel) — keep both or consolidate.
