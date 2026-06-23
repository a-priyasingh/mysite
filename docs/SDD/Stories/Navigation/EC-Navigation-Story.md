# EDS + ACCS Story — Site Navigation (Primary & Secondary)

**Type:** Story
**Component:** EDS Storefront (DA) — Header / Navigation + ACCS Catalog
**Related design:** Figma node 40-13 — `Mega Menu` (7 variations), `Hamburger Menu` (mobile), header `Main_Naviagtion`.
**Mapping:** Primary navigation → **ACCS Category**. Secondary navigation → **ACCS "Secondary Navigation"**.

---

## User Story
**As a** girlscoutshop.com shopper,
**I want** a primary category navigation with a secondary mega-menu that reveals sub-links and featured promotions,
**so that** I can browse the catalog and discover featured content from any page.

**As a** content author / merchandiser,
**I want** primary nav to follow the ACCS category structure and secondary nav to be configurable (links and/or promotional images),
**so that** navigation stays in sync with the catalog while allowing merchandised promotions.

---

## Scope
- **Primary Navigation** — top-level category bar, mapped to ACCS Category.
- **Secondary Navigation** — the mega-menu panel opened from a primary item, mapped to ACCS "Secondary Navigation", with multiple layout variations (links-only and links + promotional images).
- Desktop mega-menu + mobile hamburger rendering of the same nav model.

### Out of scope
- Footer navigation (separate Header/Footer story).
- Account/My-Account navigation (separate).
- Search (separate).

---

## Primary Navigation

### Design Specs (from Figma)
- Top-level category items in the header `Main_Naviagtion` (1280×127 region). Logo left; category items horizontal; account/cart right.
- Hovering/focusing a primary item opens its secondary (mega-menu) panel.
- GS brand tokens; green `#005640` active/hover accent.

### Mapping & Data Flow
- **Primary nav items = ACCS Categories.** Top-level category tree drives the primary menu (label + URL key/path).
- Source: ACCS Catalog category structure (Catalog Service / commerce categories). Authored nav mirrors, or is generated from, the ACCS category tree.

### Hover / Touch
- Primary item: hover/focus opens its mega menu; active item shows green underline/indicator.
- Desktop: opens on hover and on keyboard focus; closes on outside click / Esc / blur.
- Mobile: tap expands within hamburger drawer (no hover).

---

## Secondary Navigation (Mega Menu)

### Variations (from Figma — 7 mega-menu instances)
| Variation | Layout | Has promo image? |
|-----------|--------|------------------|
| Links + Promo (e.g. Mega Menu 1, 2, 5) | Multi-column link lists + 1–2 promotional image banners + a large 1:1 image tile | Yes |
| Links + Single Promo (Mega Menu 4) | Link columns + promotional banner(s) | Yes (fewer) |
| Links-only (Mega Menu 3, 6) | Multi-column link lists, no imagery | No |
| Tall links (Mega Menu 1280×699) | Larger link set, no imagery | No |

### Design Specs (from Figma)
- Panel width 1280; height ~436–699 depending on content.
- **Link columns**: grouped vertical link lists (e.g., two columns per group: `Frame 88/95/96/97`, ~175px each), separated by vertical divider lines.
- **Promotional banner** (`Promotional_Banner_1/2`): ~173–176px wide, image (`Frame` with image fill) + caption text in **Trefoil Sans 600 18/23** (e.g., "Customise Your Uniform", "Free My Girl Scout Kit Bag").
- **Large feature tile**: 1:1 ratio image (~696×372) in image variants.

### Mapping & Data Flow
- **Secondary nav = ACCS "Secondary Navigation".** Each primary category maps to a secondary-nav definition that supplies the sub-link groups (and, where applicable, promotional images/links).
- Sub-links resolve to ACCS category/sub-category or content URLs.
- **Promotional image variants** are authored/merchandised content (image + caption + link), associated with the secondary nav for that category.

### Hover / Touch
- Sub-link: hover underline / green `#005640`; visible focus for keyboard.
- Promo banner: image subtle zoom + caption emphasis on hover; entire banner is a single link.
- Panel: opens aligned to its primary item; arrow-key navigation within; Esc closes and returns focus to the primary item.
- Mobile: secondary links appear as nested accordion sections inside the hamburger drawer; promo images may be hidden or shown per config.

---

## EDS DA Authoring Details
- Navigation is authored once in the **`/nav`** DA document and loaded site-wide (lazy phase) — not per page.
- **Primary nav**: authored as a top-level list whose items map to ACCS categories (label + category path). May be generated from the ACCS category tree to stay in sync.
- **Secondary nav (per primary item)**: authored as nested content under each primary list item:
  - Nested lists → sub-link columns (grouped by sub-headings).
  - **Promotional image variant**: an image + caption + link block placed within that category's secondary-nav content. Including it yields an "image" variation; omitting it yields a "links-only" variation.
- The variation (links-only vs. links+image) is determined by whether promo image blocks are authored — no separate template needed.

## Authoring Acceptance Criteria
- [ ] Author manages primary nav in `/nav`; items map to ACCS categories (label + path), and changes apply site-wide after publish.
- [ ] Primary nav can be kept in sync with the ACCS category structure (generated or validated against it).
- [ ] Author can define secondary-nav sub-link columns per primary category (grouped, ordered).
- [ ] Author can add a promotional image variant (image + caption + link) to a category's secondary nav; the mega menu renders the image layout.
- [ ] Omitting promo images yields the links-only variation automatically (no separate authoring path).
- [ ] Author can reorder primary items and secondary columns/links by reordering list content.
- [ ] Author can add up to the supported number of promo banners + the feature tile per the design.

## User Acceptance Criteria
- [ ] Primary category bar renders on every page and reflects the ACCS category structure.
- [ ] Hovering/focusing a primary item opens its secondary mega menu; only one panel open at a time.
- [ ] Secondary menu shows the correct sub-link columns for that category; links navigate correctly.
- [ ] Promotional image variant renders image + caption and links to the authored target; image has alt text.
- [ ] Links-only variant renders cleanly with no empty image gaps.
- [ ] Keyboard: primary items reachable via Tab; sub-links navigable via arrow keys; Esc closes the panel and returns focus to the primary item; no keyboard trap.
- [ ] Mobile: hamburger opens full-screen nav; primary items expand to nested secondary links (accordion); ≥44×44px tap targets; focus trapped while open; close dismisses.
- [ ] WCAG 2.1 AA: correct `nav` landmark, `aria-expanded`/`aria-haspopup` on primary items, accessible names, visible focus, sufficient contrast.
- [ ] No layout shift (CLS) on menu open; menu loads in lazy phase without blocking LCP.

## Commerce Data Flow
- **Primary nav ← ACCS Category**: top-level category tree (label, URL key/path) drives primary items.
- **Secondary nav ← ACCS "Secondary Navigation"**: per-category secondary definitions provide sub-link groups; links resolve to ACCS categories/sub-categories or content URLs.
- **Promotional images**: authored content (image from Adobe Assets / DA, caption, link) associated with the category's secondary nav — not catalog-driven.
- Category structure changes in ACCS propagate to nav (via generation/sync) so navigation stays consistent with the catalog.

## Dependencies
- ACCS Catalog categories defined (primary nav source).
- ACCS "Secondary Navigation" configured per category (secondary nav source).
- Header block / navigation instrumentation (desktop mega menu + mobile hamburger).
- Adobe Assets / DA images for promotional variants.

## Open Items / Assumptions
- Confirm whether primary nav is **generated** from the ACCS category tree or **authored** to mirror it (and the sync mechanism).
- Confirm the exact shape/source of ACCS "Secondary Navigation" (custom attribute, category nav config, or separate content model).
- Confirm max promo banners + feature tile per mega menu (Figma shows up to 2 banners + 1 large 1:1 tile).
- Confirm mobile behavior for promo images (hidden vs shown) in the hamburger drawer.
- Figma has 7 mega-menu variations; confirm which are in MVP scope vs. exploratory.
