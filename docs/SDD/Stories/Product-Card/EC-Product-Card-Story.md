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
