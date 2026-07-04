# EDS + ACCS Story — Search Bar (Header Search with Type-Ahead)

**Type:** Story
**Component:** EDS Storefront (DA) — Commerce Search Block
**Related design:** Figma node 3201-52286 — `Search_bar 2` (COMPONENT_SET, 3 states: Default, Variant2 = focused/active, Variant3 = query entered + suggestions dropdown). Bar 211×48; suggestion panel ~370px.

---

## User Story
**As a** girlscoutshop.com shopper,
**I want** a search bar with type-ahead suggestions,
**so that** I can quickly find products by typing a query and jumping to relevant results or products.

**As a** developer,
**I want** the search bar to query ACCS Live Search and render suggestions,
**so that** search is fast, relevant, and consistent with the catalog.

---

## Description
Build the header **Search** component: an input with a placeholder and search icon, a focused/active state, and a **type-ahead suggestions dropdown** that appears as the user types (product previews / suggested terms). Submitting routes to the search results page. This is a **commerce block** powered by ACCS Live Search.

---

## Design Specs (from Figma)
- **Search bar** (211×48; expands to header width): placeholder "Search Products" (Trefoil Sans 400 16/22, `#4E4E4E`) + search icon (24×24) + bottom underline (`Line 469`).
- **States**:
  - **Default**: placeholder + icon + underline.
  - **Focused/active (Variant2)**: input focused with blinking cursor, empty.
  - **Query + suggestions (Variant3)**: typed query (e.g., "Uniforms") + a **type-ahead dropdown** of suggestion "mini cards" (~370px wide) — product previews (image + details, ~330px content) and/or suggested terms.
- GS brand tokens; green `#005640` for focus/active accents.
- Responsive: search may collapse to an icon that expands on tap (mobile) — confirm mobile pattern.

### Hover / Focus
- **Search icon**: hover color shift to green `#005640`; cursor pointer.
- **Input**: on focus, underline turns green `#005640`; clear focus ring.
- **Suggestion rows / mini cards**: hover = light green background; keyboard-highlight (arrow keys) mirrors hover; clicking navigates.
- **Global**: respect `prefers-reduced-motion`; ≥44×44px tap targets on mobile.

> Note: no explicit hover-state variants are defined in Figma beyond the 3 states above — hover follows the GS brand green `#005640` and standard convention; confirm with design.

---

## EDS DA Authoring Details

| Displayed data | Content is sourced from | Required |
|----------------|-------------------------|----------|
| Placeholder text ("Search Products") | EDS (config) | N |
| Search icon | Code | N |
| Query input & submit behavior | Code | N/A |
| Type-ahead suggestions (products / terms) | ACCS (Live Search) | N/A (dynamic) |
| Suggestion mini-card content (image, name, price) | ACCS (Catalog/Live Search) | N/A (dynamic) |

- The search bar is part of the header (authored once in `/nav`, loaded site-wide) — not authored per page.
- Placeholder text may be configurable; the search behavior and suggestions are code + ACCS driven, not authored.

## Authoring Acceptance Criteria
- [ ] Placeholder text is configurable (default "Search Products"); if unset, a sensible default is used.
- [ ] The search bar renders as part of the global header without per-page authoring.
- [ ] No product/suggestion content is manually authored — it comes from ACCS Live Search.

## User Acceptance Criteria
- [ ] Shopper can focus the input (focused state) and type a query.
- [ ] As the shopper types, a type-ahead dropdown shows relevant suggestions (products and/or terms) from ACCS Live Search.
- [ ] Suggestion mini-cards show product image + name (+ price where shown); clicking a product goes to its PDP; clicking a term/submitting goes to the search results page.
- [ ] Submitting (Enter or search icon) routes to the search results page with the query.
- [ ] Empty/no-results: dropdown shows a "no results" state without error.
- [ ] Debounced input (no query on every keystroke); loading state shown while fetching.
- [ ] Keyboard: input focusable; arrow keys navigate suggestions; Enter selects; Esc closes the dropdown; focus returns to input; no keyboard trap.
- [ ] Mobile: search icon expands the input (if collapsed); ≥44×44px tap targets.
- [ ] WCAG 2.1 AA: input has an accessible label; combobox/listbox ARIA for suggestions; `aria-expanded`/`aria-activedescendant`; results-count announced (aria-live); visible focus; sufficient contrast.
- [ ] Performance: suggestions load asynchronously; does not block LCP.

## Commerce Data Flow
- **Search + suggestions ← ACCS Live Search** (`productSearch` / suggestions GraphQL): the query returns suggested products (image, name, price, urlKey) and/or suggested terms.
- **Submit** routes to the search results page (PLP-style Live Search results).
- Suggestion product data (image from Adobe Assets, name, price) depends on **EC-243** attributes exposed via Catalog Service.

## Dependencies
- ACCS Live Search enabled and indexed (query + suggestions).
- Search results page (submit target) — related PLP/Live Search results story.
- **EC-243** — product attributes exposed/searchable.
- Header block (hosts the search bar).

## Open Items / Assumptions
- Confirm suggestion content: product previews, suggested terms, categories, or a mix.
- Confirm mobile pattern (persistent bar vs. icon that expands).
- Confirm max suggestions shown and debounce timing.
- Confirm the search results page route/behavior.
- Confirm exact focus/hover shades with design.
