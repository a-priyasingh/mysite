# EDS + ACCS Story — Breadcrumb Navigation

**Type:** Story
**Component:** EDS Storefront (DA) — Breadcrumb + ACCS Catalog
**Related design:** Figma node 40-13 — `Breadcrumb` component (used 119× across PLP, PDP, Cart, Checkout). Sizes: 1280×38 (desktop), 768×40 (tablet), 360×40 (mobile).
**Note:** a `breadcrumb` block already exists in the repo (`blocks/breadcrumb`) — this story covers reusing/extending it and binding it to ACCS catalog context.

---

## User Story
**As a** girlscoutshop.com shopper,
**I want** a breadcrumb trail showing my location in the catalog hierarchy,
**so that** I understand where I am and can quickly navigate back to parent categories or home.

**As a** developer,
**I want** the breadcrumb to derive its trail from the ACCS category path (PLP) and product context (PDP),
**so that** it stays accurate without manual authoring per page.

---

## Design Specs (from Figma)
- Breadcrumb bar: full-width, ~38–40px tall, placed below the header and above the page content (appears on PLP, PDP, Cart, Checkout).
- **First item = Home icon** (24×24 icon), followed by category/page crumbs.
- **Separators**: thin vertical line / chevron between items (`Line`, ~8×14).
- Crumb text: ~17px line height; current (last) item is non-link, de-emphasized; preceding crumbs are links.
- GS brand tokens; green `#005640` for link hover/active.

## Hover / Touch
- Crumb link: hover underline / color shift to green `#005640`; visible focus for keyboard.
- Current (last) crumb: not clickable, no hover (visually distinct, e.g., muted/bold).
- Home icon: hover/focus state; links to `/`.
- Mobile: may truncate to `Home > … > Current` (collapse middle crumbs) to fit 360px; tap targets ≥44×44px height-permitting (use adequate hit area).

---

## Context Behavior
| Page | Breadcrumb trail source |
|------|-------------------------|
| PLP (category) | Home > [Category path from ACCS] (e.g., Home > Apparel > Dresses) |
| PDP (product) | Home > [Product's primary category path] > Product Name |
| Search results | Home > Search results for "<query>" |
| Cart / Checkout | Home > Cart (and step labels where applicable) |

- On PDP, the last crumb is the product name (non-link).
- On PLP, the last crumb is the current category (non-link).

---

## EDS DA Authoring Details
- Breadcrumb is rendered automatically by the block from page/catalog context — **not authored per page** in the typical case.
- Auto-blocking: the breadcrumb block is added to PLP/PDP templates and builds the trail from the category/product context.
- **Authorable options** (template/block level): show/hide home icon, separator style, whether to show on a given template, mobile truncation behavior.
- Optional manual override: for non-catalog pages, an author can supply an explicit breadcrumb list in the page document if needed.

## Authoring Acceptance Criteria
- [ ] Breadcrumb renders automatically on PLP/PDP from catalog context with no per-page authoring.
- [ ] Template author can enable/disable the breadcrumb per template.
- [ ] Author can configure display options (home icon on/off, separator style, mobile truncation).
- [ ] For non-catalog/content pages, an author can optionally author an explicit breadcrumb trail.
- [ ] Changes apply consistently across all pages using the template.

## User Acceptance Criteria
- [ ] Breadcrumb appears on PLP, PDP, Cart, and Checkout below the header.
- [ ] Trail accurately reflects the current location: Home > category path > (product name on PDP).
- [ ] All crumbs except the last are links and navigate to the correct category/home; the last crumb is current (non-link).
- [ ] Home icon links to the homepage.
- [ ] On mobile (360px), the trail fits — middle crumbs collapse (Home > … > Current) without breaking layout.
- [ ] Keyboard: crumbs are focusable in order with visible focus; Enter activates links.
- [ ] WCAG 2.1 AA: `<nav aria-label="Breadcrumb">` landmark, ordered list markup, `aria-current="page"` on the last item, sufficient contrast, accessible separators (decorative, hidden from AT).
- [ ] Structured data: emits BreadcrumbList schema.org JSON-LD for SEO.
- [ ] No layout shift; loads without blocking LCP.

## Commerce Data Flow
- **PLP**: category path comes from the ACCS Catalog category hierarchy (current category + ancestors → labels + URL keys).
- **PDP**: trail built from the product's primary category path (ACCS) + the product name; product/category data via Catalog Service / Live Search response (reuses PLP/PDP product context — no extra query where the path is already in the product response).
- **Search/Cart/Checkout**: trail is contextual/static (query term or page label), not catalog-driven.
- Category labels/URL keys stay in sync with ACCS so breadcrumb links match the catalog.

## Dependencies
- Existing `blocks/breadcrumb` (reuse/extend).
- ACCS Catalog category hierarchy (category path source).
- PLP Product Response / PDP product context (provides category path + product name).
- Header block (breadcrumb sits directly below it).

## Open Items / Assumptions
- Confirm whether the product's "primary category path" is available in the product/Catalog response or needs a dedicated category-path query.
- Confirm mobile truncation rule (collapse middle vs. horizontal scroll).
- Confirm breadcrumb presence on Cart/Checkout (Figma shows it; verify it's desired there).
- Confirm separator style (chevron vs. line vs. slash) for final design.
