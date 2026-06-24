# EDS + ACCS Story — "Shop by Troop Year Plans" Block

**Type:** Story
**Component:** EDS Storefront (DA) — Commerce Block
**Related design:** Figma node 2905-58399 — `Shop by Troop Year Plans` (Option-02, Desktop 1280×806). Heading "Shop by Troop Year Plans" (Girl Scout Light 36/43); subheading (Trefoil Sans 400 20/24); a "Select Level" dropdown; a product carousel with Slider Arrows.

---

## User Story
**As a** caregiver/troop leader shopping girlscoutshop.com,
**I want** to choose a Girl Scout level and see the recommended product set ("year plan") for that level in a carousel,
**so that** I can quickly find the essentials for my Girl Scout's grade/level.

**As a** merchandiser,
**I want** to curate the product set shown per level (and choose the layout option),
**so that** each level shows the right "year plan" products without code changes.

---

## Description
Build a **filterable product carousel** block. A "Select Level" dropdown lets the shopper pick a Girl Scout program/grade level (Daisy, Brownie, Junior, Cadette, Senior, Ambassador). Selecting a level updates the carousel below to show the curated product set ("Troop Year Plan") for that level. The block has layout options (Figma shows "Option-02"); this story covers the verified Option-02 layout and notes the variant system.

This is a **commerce block** — products are fetched from ACCS by level, not authored as static product lists.

---

## Design Specs (from Figma — Option-02, Desktop)
- Block width 1280; content max ~1168.
- **Heading**: "Shop by Troop Year Plans" — Girl Scout Light(300) 36/43, black.
- **Subheading**: "Explore the Daisy Essentials Guide and find…" — Trefoil Sans 400 20/24, `#2D2E33`.
- **"Select Level" dropdown** (≈238×44) — top-right; opens an options panel (≈238×194) listing levels.
- **Product carousel** (≈1168×470): row of Product Cards + a tab/row strip at top (≈1168×52) and **Slider Arrows** (40×40) for horizontal navigation.
- GS brand tokens; green `#005640` accents.
- **Variations**: component is "Option-02" — other layout options exist; confirm which are in scope.
- Tablet/Mobile: confirm responsive frames (dropdown full-width; carousel swipe-first; ~1.5–2 cards visible at 360px).

## Hover / Touch
- Dropdown: hover/focus highlight; chevron rotate on open; option hover = light green; selected = green check/fill.
- Slider arrows: green fill + white icon on hover; disabled/greyed at ends if not looping; ≥44×44px on mobile.
- Product Card hover/touch per the shared Product Card block (image zoom + quick-add desktop; always-visible add on mobile).
- Respect `prefers-reduced-motion`.

---

## EDS DA Authoring Details
- Authored as a block table (e.g., **`Shop by Troop Year Plans`**) placed in the page document (home/landing).
- Author-configurable cells:
  - **Heading** and **Subheading** text.
  - **Layout option** (Option-01/02/… per Figma variants).
  - **Level → product source mapping**: for each level (Daisy…Ambassador), the product set source — a category, collection, curated SKU list, or a level-tagged query (`gs:programLevel`).
  - **Default level** selected on load.
  - **Max products** per level; autoplay/loop toggle.
- The dropdown options (levels) and the products per level come from the configured mapping, not hand-listed per render.

## Authoring Acceptance Criteria
- [ ] Author can add the block and set heading/subheading and layout option.
- [ ] Author can define, per level, the product source (category/collection/SKU list/level tag) — the "year plan" for that level.
- [ ] Author can set the default selected level and max products.
- [ ] Adding/removing a level updates the dropdown options.
- [ ] Author does NOT manually maintain product cards (products come from ACCS).
- [ ] Empty/insufficient products for a level handled gracefully (hide carousel or show message).
- [ ] Preview reflects the configured block before publish.

## User Acceptance Criteria
- [ ] Block renders heading, subheading, the "Select Level" dropdown, and a product carousel.
- [ ] Selecting a level updates the carousel to that level's curated product set without a full page reload.
- [ ] Each card shows image+alt, name, price (and sale price), rating, badges, stock; clicking opens its PDP.
- [ ] Add-to-cart / add-to-list works from cards where enabled.
- [ ] Carousel navigable via arrows (desktop) and swipe (mobile); keyboard operable; slide changes announced (aria-live).
- [ ] Dropdown is keyboard accessible (open/close, arrow-key option navigation, Esc), with visible focus and `aria-expanded`.
- [ ] Default level loads with products on first render; loading state shown while fetching; no layout shift.
- [ ] Responsive at desktop/tablet/mobile; dropdown and carousel adapt; ≥44×44px tap targets on mobile.
- [ ] WCAG 2.1 AA: labeled controls, region/heading structure, contrast, focus, accessible names.
- [ ] Performance: loads in lazy/delayed phase, does not block LCP; card images lazy-loaded; meets Lighthouse budget.

## Commerce Data Flow
- **Levels**: the dropdown options correspond to Girl Scout program levels (Daisy…Ambassador) — sourced from the `gs:programLevel` taxonomy / configured mapping.
- **Products per level**: on level select, the block queries ACCS (Catalog Service / Live Search) for that level's product set — by category/collection/SKU list, or filtered on the `gs:programLevel` attribute.
- **Per product** (Product Card fields): image (Adobe Assets), name, regular+sale price, currency, rating, swatches, stock, urlKey, badges.
- **Add-to-cart** → ACCS cart; **add-to-list** → wishlist.
- Depends on **EC-243** attributes (incl. `gs:programLevel`) being exposed via Catalog Service.

## Dependencies
- Product Card block (shared item renderer).
- ACCS Catalog Service / Live Search (product fetch by level).
- **EC-243** — `gs:programLevel` and other product attributes exposed/searchable.
- Adobe Assets enablement (image URLs).

## Open Items / Assumptions
- Confirm the dropdown filters by **program/grade level** (Daisy…Ambassador) — strongly implied by "Select Level" + "Daisy Essentials" copy; verify the exact level list.
- Confirm the product source per level: curated SKU list vs. category/collection vs. `gs:programLevel`-tagged query.
- Confirm which layout **options** (Option-01/02/…) are in MVP scope.
- Confirm responsive frames (tablet/mobile) for this block.
- Confirm placement(s): home page only, or also category landing pages.
