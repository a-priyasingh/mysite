# EDS + ACCS Story — PLP Top Promo Banner (Category-Targeted)

**Type:** Story
**Component:** EDS Storefront (DA) — PLP Banner + ACCS Catalog
**Related design:** Figma node 40-13 — `Banner_Innerpages`. Sizes: 1280×320 (desktop), 768×512 (tablet), 360×240 (mobile). Full-bleed background image with an optional overlaid Text + Button block (~480px wide).

---

## User Story
**As a** merchandiser,
**I want** to set a top promotional banner on the PLP that can be targeted at a specific category, sub-category, or child item,
**so that** I can show the most relevant promotion for whatever level of the catalog the shopper is browsing — without editing every page.

**As a** girlscoutshop.com shopper,
**I want** a relevant promotional banner at the top of the product list,
**so that** I see promotions and context tied to the category I'm browsing.

---

## Core Requirement — Category/Sub-category/Child-item Targeting
The banner must be configurable per catalog level, with **inheritance and override**:
- A banner can be assigned to a **category** (applies to that category's PLP and, by inheritance, its descendants unless overridden).
- A banner can be assigned to a **sub-category** (overrides the parent category banner for that sub-category and its descendants).
- A banner can be assigned to a **child item / leaf category** (overrides ancestors for that specific PLP).
- **Resolution rule (most-specific wins):** child item → sub-category → category → default/none.
- If no banner is configured for the current level or any ancestor, the banner area is hidden (no empty gap).

---

## Design Specs (from Figma)
- **Desktop**: 1280×320 full-width banner.
- **Tablet**: 768×512.
- **Mobile**: 360×240.
- Full-bleed **background image** with an optional **Text + Button overlay** (~480px wide on desktop): eyebrow/heading + body + CTA button.
- Overlay positioned (e.g., left-aligned per screenshot); scrim/contrast applied so text is legible over the image.
- GS brand tokens; green `#005640` for button/CTA.
- Image-only variant supported (no text/button) — as in the shared example.

## Hover / Touch
- CTA button: green darken / invert on hover; chevron nudge if present.
- If the whole banner is a link: subtle image zoom on hover (desktop); pressed-state on mobile.
- Respect `prefers-reduced-motion`.

---

## EDS DA Authoring Details
- The PLP Top Promo Banner is rendered by the PLP template; the **content/targeting is configured by merchandisers**, not authored into each PLP page.
- **Targeting model** (recommended): banners are authored as entries keyed by **catalog scope** (category path / sub-category path / child-item id). At render, the block resolves the banner for the current PLP's category context using the most-specific-wins rule.
- Per banner, author sets: background image (required), optional eyebrow/heading, optional body text, optional CTA (label + link), and the **target scope** (which category/sub-category/child it applies to).
- Authoring options: text overlay on/off (image-only), overlay alignment, mobile image/crop override.
- Implementation options to confirm (see Open Items): (a) banner content sourced from a **DA content index/sheet** keyed by category path, or (b) banner stored as an **ACCS category attribute/content** resolved via the catalog response.

## Authoring Acceptance Criteria
- [ ] Merchandiser can create a banner and assign it to a **category**, **sub-category**, or **child item**.
- [ ] A more specific assignment (child > sub-category > category) **overrides** the less specific one for the matching PLP.
- [ ] A category-level banner **inherits** to descendant PLPs unless overridden.
- [ ] Author can set background image, optional heading/body, optional CTA (label + link), and overlay on/off.
- [ ] Author can create an **image-only** banner (no text/button) and it renders cleanly.
- [ ] When no banner applies to the current PLP or its ancestors, the banner area is hidden (no empty space).
- [ ] Author can preview the banner for a given category context before publish.
- [ ] Author can schedule/replace banners without code changes.

## User Acceptance Criteria
- [ ] On a category PLP, the correct banner for that category (or nearest ancestor) renders at the top.
- [ ] On a sub-category PLP, the sub-category's banner overrides the parent category's banner.
- [ ] On a child-item PLP, the child's banner overrides all ancestors.
- [ ] Background image and (if present) heading/body/CTA render per design; image has alt text.
- [ ] CTA navigates to the authored target; whole-banner link (if used) navigates correctly.
- [ ] Responsive: renders at 1280×320 / 768×512 / 360×240 without text overflow or image distortion; text legible over image (scrim).
- [ ] WCAG 2.1 AA: image alt text, sufficient text contrast over image, CTA has accessible name, keyboard operable, visible focus.
- [ ] Performance: banner is the PLP's likely LCP element — image is optimized/eager-loaded with correct dimensions; no layout shift (reserved space).

## Commerce Data Flow
- **Current category context** comes from the PLP (the category/sub-category/child being viewed) — from the ACCS catalog / PLP product response (category id + path).
- The block uses that category path to **resolve the most-specific banner** from the targeting model.
- If banners are stored as ACCS category content/attribute: the catalog/category response supplies the banner reference for the current category and ancestors.
- If banners are stored in a DA content index keyed by category path: the block matches the current path against the index.
- Banner **image** resolves from Adobe Assets / DA; CTA link is authored (may point to a promo/category page).

## Dependencies
- ACCS Catalog category hierarchy (provides current category path + ancestry for inheritance).
- PLP Product Response (provides category context) — sibling story.
- Decision on banner storage/targeting mechanism (DA index vs. ACCS category content) — see Open Items.
- Adobe Assets / DA for banner imagery.

## Open Items / Assumptions
- CONFIRM the targeting storage mechanism: DA content index keyed by category path, vs. ACCS category-level content/attribute. This is the key architectural decision for this story.
- Confirm inheritance is desired (category banner cascades to descendants) vs. explicit assignment only.
- Confirm "child item" means a leaf category vs. an individual product (PLPs are category-based; product-level banners would be unusual on a PLP).
- Confirm max one banner per PLP (top slot) vs. a rotating set.
- Confirm scheduling requirements (start/end dates) for promotional banners.
