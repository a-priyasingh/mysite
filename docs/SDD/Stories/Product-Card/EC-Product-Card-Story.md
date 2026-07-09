# EDS + ACCS Story — Product Card (Shared Commerce Item)

**Type:** Story
**Component:** EDS Storefront (DA) — Commerce Block (shared item)
**Related design:** Figma node 2697-351418 — `Card` (COMPONENT_SET, extensive variant matrix by Persona × Version × State × Viewport).
**Reuse:** This is the **core reusable product card** rendered by the PLP grid, product carousels (New Arrivals, New Finds & Deals, Recommended Products, Shop by Troop Year Plans), and search results. Build once, reuse everywhere.

---

## User Story
**As a** girlscoutshop.com shopper,
**I want** a product card showing image, name, price, badges, ratings, and quick actions,
**so that** I can evaluate a product and add it to cart / wishlist or open its PDP directly.

**As a** developer,
**I want** a single reusable product card that renders ACCS product data across all listing contexts and personas,
**so that** product presentation stays consistent site-wide.

---

## Variants (from Figma)
- **Persona**: B2C - Caregiver, Council, B2B-Council, Caregiver_Checkout Card, Council_CheckOut_Card.
- **Badge/offer personas**: Caregiver **Limited**, Caregiver **Clearance** (plus NEW / Best Seller / % Off badges).
- **State**: Default, **Hover** (explicit hover variants defined in Figma).
- **View**: grid (274×430) and list/checkout (e.g., 328×198/269).
- **Viewport**: Desktop, Tablet-768, Mobile.

---

## Design Specs (from Figma — B2C Caregiver, grid, Desktop 274×430)
- **Product image** (274×274, aspect 1:1) with a **secondary hover image** (`Product_Image_Hover`, swaps/zooms to ~302 on hover) + an **image carousel** (arrows + dots) for multiple images.
- **Wishlist heart** (32×32, top-right of image).
- **Badges/tags** (top-left / over image): "NEW", "Best Seller", and offer badge "30% Off" (magenta `#AF0061`); persona badges "Limited" / "Clearance".
- **Product name**: Trefoil Sans 500 16/22, black (link to PDP).
- **Price**: current price (Trefoil Sans 500 16/22, green `#005640`) + optional strikethrough original price (Trefoil Sans 400 14/18, grey `#626262`) + optional discount label ("30% Off", `#AF0061`).
- **Size swatches**: XXS, XS, SM, MD, LG, Plus SM/MD/LG (Trefoil Sans 400 12/17).
- **Color swatches**.
- **"Add to Cart" button** (Trefoil Sans 500 14/18, green `#005640`) — present, emphasized on hover.
- GS brand tokens; greens `#005640`; offer magenta `#AF0061`.

### Hover Details (explicit in Figma — State=Hover variants)
- **Image swaps to the secondary hover image** and scales up slightly (274→~302); image carousel arrows/dots become available for multi-image products.
- **"Add to Cart"** CTA becomes prominent/visible on hover (grid view).
- **Wishlist heart**: hover fills/greens; toggles saved state on click.
- **Card**: subtle shadow lift; product name → hover emphasis.
- **On touch (mobile)**: no hover — Add to Cart and key actions are always visible; image swap via swipe.
- **Global**: respect `prefers-reduced-motion`; every hover has an equivalent keyboard-focus state; ≥44×44px tap targets.

---

## Per-Layer Figma Properties (Caregiver / Default / Desktop, 274×430)
Extracted from Figma node 2697-351418. Hex values are the resolved colors; the **Token** column lists the bound Figma variable ID where the value is tokenized (variable *names* require design-system/Enterprise access to resolve — IDs given so the design team can map them). Fonts: **Trefoil Sans** throughout.

| Layer | Size (W×H) | Font (family wt size/lh) | Color (hex) | Border / Radius | Padding / Gap | Token (Figma variable id) |
|-------|-----------|--------------------------|-------------|-----------------|---------------|---------------------------|
| Card (root) | 274×430 | — | — | stroke #D5CA9F | gap 8 | strokes bound |
| Image frame | 274×274 | — | — | stroke #D5CA9F, radius 4 | — | strokes bound |
| Product image | 274×274 | — | image fill | — | — | — |
| Hover image (overlay) | 274×274 | — | #FFFFFF, opacity 0 | — | — | — |
| Wishlist heart | 32×32 | — | #FFFFFF | — | — | — |
| Badge "NEW" tag | 49×25 | — | fill #00B451 | radius 6 | pad 12/4, gap 10 | VariableID:4:1285 |
| Badge "NEW" label | 25×15 | 500 12/14 | #000000 | — | — | VariableID:4:1270 |
| Badge "Almost Gone" tag | 103×25 | — | fill #F7BE00 | radius 6 | pad 12/4 | VariableID:696:36474 |
| Badge "Almost Gone" label | 79×15 | 500 12/14 | #2D2E33 | — | — | VariableID:4:1271 |
| Add to Cart (primary) | 137×36 | — | fill #D9F3E3 | stroke #98DEB3, radius 8 | pad 16/8, gap 4 | VariableID:3702:114502 |
| Add to Cart label | 85×19 | 500 14/18 | #005640 | — | — | VariableID:225:5670 |
| Add to Cart icon | 13×12 | — | #005640 | — | — | VariableID:4:1322 |
| Add to Cart (alt/compact) | 48×36 | — | fill #F0FAF4 | stroke #00AE43, radius 6 | pad 16/8 | VariableID:700:26263 |
| Best Seller banner | 274×25 | — | fill #5C1F8B | — | pad 0/4 | VariableID:45:67 |
| Best Seller label | 154×17 | 500 12/17 | #FFFFFF | — | — | — |
| Size swatch (selected) | 36×24 | 400 12/17 | fill #D5CA9F, text #2D2E33 | — | pad 8/4 | VariableID:2725:24281 / text 4:1271 |
| Size swatch (default) | ~30×24 | 400 12/17 | text #2D2E33 | stroke #D5CA9F | pad 8/4 | text VariableID:4:1271 |
| Product name | 274×45 | 500 16/22 | #000000 | — | — | VariableID:…531:95 |
| Price (current) | 49×23 | 500 16/22 | #005640 | — | gap 8 | VariableID:…531:121 |
| Price (strikethrough) | 41×19 | 400 14/18 | #626262 | — | — | VariableID:2751:46499 |
| Discount label "30% Off" | 44×17 | 500 12/17 | #AF0061 | — | — | VariableID:…531:113 |
| Discount pill bg | 55×21 | — | #FCE8A6 | radius 2 | pad 5/2 | VariableID:4889:51655 |
| Text container | 274×148 | — | — | — | gap 12 | — |

**Color inventory (resolved hex):** GS green `#005640` (price, primary CTA text/icon); bright green `#00B451` / `#00AE43` (NEW tag / alt CTA border); light greens `#D9F3E3` / `#F0FAF4` / `#98DEB3` (CTA fills/strokes); tan `#D5CA9F` (card + swatch borders); purple `#5C1F8B` (Best Seller); amber `#F7BE00` / `#FCE8A6` (Almost Gone / discount pill bg); magenta/pink `#AF0061` (discount text); reds `#9C0000` (sale bg); neutrals `#000000`, `#2D2E33`, `#626262`, `#4E4E4E`, `#FFFFFF`.

> Note: Every colored element is bound to a Figma **variable** (design token) — IDs captured above. The token **names** (e.g., `gs/color/green/600`) could not be pulled because the Figma variables REST endpoint requires an Enterprise plan (403 on this file). Ask the design team to export the variable name→value map, or map these values to the GSUSA design tokens in `styles.css` during build.

---

## EDS DA Authoring Details

| Displayed data | Content is sourced from | Required |
|----------------|-------------------------|----------|
| Product image(s) (primary + hover/gallery) | ACCS (Catalog, Adobe Assets) | N/A (dynamic) |
| Product name | ACCS (Catalog) | N/A (dynamic) |
| Price (current) | ACCS (Catalog) | N/A (dynamic) |
| Original price / discount % | ACCS (Catalog) | N/A (dynamic) |
| Badges (NEW, Best Seller, Limited, Clearance, % Off) | ACCS (Catalog attributes / rules) | N/A (dynamic) |
| Size / color swatches (variants) | ACCS (Catalog) | N/A (dynamic) |
| Rating / review count (if shown) | ACCS / reviews provider | N/A (dynamic) |
| PDP link (urlKey) | ACCS (Catalog) | N/A (dynamic) |
| Add to Cart / Add to Wishlist actions | Code + ACCS | N/A |
| Persona / view configuration | Code / parent block | N/A |

- The Product Card is **not authored directly** — it is rendered by parent blocks (PLP grid, carousels, search) from ACCS product data.
- Persona/view (B2C, Council, B2B, checkout; grid/list) is set by the context/parent block, not per-card authoring.

## Authoring Acceptance Criteria
- [ ] No product content is manually authored — all card data comes from ACCS.
- [ ] Parent blocks (PLP grid, carousels, search) can render the card by passing a product/product-list context.
- [ ] The correct persona/view variant is applied based on the context (B2C vs Council vs B2B; grid vs list/checkout).
- [ ] Optional elements (badges, swatches, discount, rating) render only when the product has that data; absence does not break the card.

## User Acceptance Criteria
- [ ] Card renders product image, name, and price; clicking the image/name opens the PDP.
- [ ] On sale: shows current price, strikethrough original, and discount label.
- [ ] Badges (NEW / Best Seller / Limited / Clearance / % Off) render per the product's data/rules.
- [ ] Size and color swatches render for products with variants; selecting a swatch updates the card (image/price) as designed.
- [ ] Hover (desktop): image swaps to the secondary image + zoom; Add-to-Cart becomes prominent; multi-image carousel navigable.
- [ ] Add to Cart adds the product (or opens variant selection if required) → updates the ACCS cart / cart popup.
- [ ] Wishlist heart toggles saved state (→ ACCS wishlist) and reflects saved/unsaved.
- [ ] Out-of-stock / unavailable state handled (e.g., disabled Add to Cart, status label).
- [ ] Mobile: actions always visible (no hover); image swap via swipe; ≥44×44px tap targets.
- [ ] Keyboard: image link, swatches, Add-to-Cart, and wishlist are focusable/operable with visible focus.
- [ ] WCAG 2.1 AA: image alt text (product name), accessible names for actions and swatches, sufficient contrast (incl. the magenta discount and green price), decorative elements hidden from AT.
- [ ] Performance: card images lazy-loaded with correct dimensions; no layout shift; hover image preloaded appropriately.

## Commerce Data Flow
- **All card data ← ACCS** (Catalog Service / Live Search): `sku`, `name`, `urlKey`, images (primary + gallery/hover, from Adobe Assets), `price` (regular + sale), currency, discount %, `badges` (NEW/Best Seller/Limited/Clearance), variant options (size/color swatches), stock/availability, rating/reviewCount.
- **Add to Cart** → ACCS cart (may open variant picker / Add-to-cart popup / mini-cart).
- **Add to Wishlist** → ACCS wishlist.
- Depends on **EC-243** attributes exposed via Catalog Service (category, badges, variants, price fields).
- Emits analytics per tagging plans (`view_item_list` / `select_item` / `add_to_cart` / `add_to_wishlist`).

## Dependencies
- ACCS Catalog Service / Live Search (product data).
- **EC-243** — product attributes (badges, variants, price, category) exposed/searchable.
- Adobe Assets (images incl. hover/gallery).
- Cart + Cart Popup, Wishlist, PDP (action targets).
- Parent blocks that render it: PLP grid, product carousels, search results.

## Open Items / Assumptions
- Confirm Add-to-Cart behavior when variants (size/color) are required: inline swatch selection vs. opening a variant/quick-add popup.
- Confirm badge logic source (catalog attribute vs. price/inventory rules) for NEW / Best Seller / Limited / Clearance.
- Confirm rating/reviews are shown on the card and their data source.
- Confirm persona differences (B2C vs Council vs B2B) — pricing, actions, availability on the card.
- Confirm list/checkout card variants are covered here or split into their own story.
