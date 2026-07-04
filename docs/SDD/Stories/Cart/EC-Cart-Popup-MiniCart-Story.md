# EDS + ACCS Story — Cart Popup (Mini-Cart / "Items in your Cart" Flyout)

**Type:** Story
**Component:** EDS Storefront (DA) — Commerce Block (mini-cart flyout)
**Related design:** Figma node 3114-19046 — `Cart Popup` (COMPONENT_SET: B2C + B2B, Desktop 500×846 / 500×782, Tablet 768×900, Mobile 360×780 / 360×726).
**Note:** This is the mini-cart flyout referenced in the client's **MiniCart tagging plan** (`mini_cart_view`, `mini_cart_cta_click`, `outside_click`). In Figma it is named "Cart Popup".

---

## User Story
**As a** girlscoutshop.com shopper,
**I want** a cart popup/flyout that shows my cart items and totals with quick actions,
**so that** I can review what I've added and proceed to checkout or keep shopping without leaving the page.

**As a** developer,
**I want** the popup to render live cart data from ACCS and wire its actions,
**so that** the mini-cart stays in sync with the cart and drop-in checkout.

---

## Description
Build the **Cart Popup (mini-cart flyout)**: a panel showing cart line items, a subtotal/summary, and actions (View Cart, Keep Shopping, Checkout, express pay). It appears when the shopper adds an item and/or opens the cart from the header, and is dismissible. Commerce-driven via ACCS cart. Supports B2C and B2B variants.

> Trigger note: confirm the exact open trigger with the team — the popup shows cart contents ("Items in your Cart"). The header cart-icon behavior (open this popup vs. navigate to full Cart page) is an open question raised separately; this story covers the popup itself.

---

## Design Specs (from Figma)
- Panel width ~500 (desktop); slides in / overlays.
- **Header**: "Items in your Cart" (Girl Scout 400 18/22, `#2D2E33`) + close (X) icon (24×24).
- **Line items** (scrollable list): each = product image (80×80) + details (product name, variant, price, quantity).
- **Summary**: item count (e.g., "2 Items"), "Sub Total: $46.00", "Taxes calculated at checkout." (Trefoil Sans 500 14/20 / 400 14/18).
- **Footer actions**:
  - **Subtotal** (Trefoil Sans 500 18/25) + **"View Cart"** link (green `#005640`).
  - **"Keep Shopping"** button (green outline/text) + **"Checkout"** button (white on green fill).
  - **Express pay**: PayPal, Apple Pay.
- GS brand tokens; greens `#005640` / `#023729`.
- **Variants** (verified): B2C and B2B; Desktop 500×846 / 500×782, Tablet 768×900, Mobile 360×780 / 360×726.

### Hover / Touch
- **Close (X)**: hover highlight; cursor pointer.
- **View Cart link**: underline / green emphasis on hover.
- **Keep Shopping / Checkout buttons**: fill/outline darken on hover; visible focus ring (≥3:1 contrast).
- **Line-item remove/qty controls** (if present): hover state; ≥44×44px tap target on mobile.
- **Global**: respect `prefers-reduced-motion`; every hover has a keyboard-focus equivalent; dismiss on outside click / Esc.

> Note: hover states beyond the base design follow the GS brand green `#005640` and standard convention; confirm with design.

---

## EDS DA Authoring Details

| Displayed data | Content is sourced from | Required |
|----------------|-------------------------|----------|
| Panel title ("Items in your Cart") | EDS (config) | N |
| Empty-cart message | EDS (config) | N |
| Line items (image, name, variant, price, qty) | ACCS (cart) | N/A (dynamic) |
| Item count / Subtotal / tax note | ACCS (cart) | N/A (dynamic) |
| View Cart / Keep Shopping / Checkout actions | Code | N/A |
| Express pay (PayPal, Apple Pay) | ACCS / payment integration | N/A |

- The Cart Popup is a code + commerce driven block (part of the global cart experience), not authored per page.
- Static labels (title, empty message) may be configurable; cart contents and totals are dynamic from ACCS.

## Authoring Acceptance Criteria
- [ ] Static labels (panel title, empty-cart message) are configurable; sensible defaults used if unset.
- [ ] The popup renders as part of the global cart experience without per-page authoring.
- [ ] No line-item/total content is manually authored — it comes from the ACCS cart.

## User Acceptance Criteria
- [ ] Popup displays current cart line items (image, name, variant, price, qty), item count, subtotal, and the tax note.
- [ ] "Checkout" navigates to checkout; "View Cart" navigates to the full Cart page; "Keep Shopping" dismisses the popup.
- [ ] Express pay (PayPal / Apple Pay) initiates the respective express checkout.
- [ ] Popup is dismissible via the close (X), outside click, and Esc; focus returns to the trigger.
- [ ] Updates reflect the live cart (adding/removing items updates the popup and totals).
- [ ] Empty state: if the cart is empty, an empty-cart message shows (no broken layout).
- [ ] B2C and B2B variants render the appropriate layout/actions.
- [ ] Responsive at Desktop/Tablet/Mobile; ≥44×44px tap targets on mobile.
- [ ] Keyboard: focus trapped within the open popup; all actions operable; no keyboard trap on close.
- [ ] WCAG 2.1 AA: dialog semantics (role=dialog, aria-modal, labelled by title), accessible action names, sufficient contrast, visible focus; cart updates announced (aria-live).
- [ ] Performance: loads asynchronously; does not block LCP.

## Commerce Data Flow
- **Cart contents & totals ← ACCS cart** (GraphQL / cart drop-in): line items (image from Adobe Assets, name, variant, price, qty), item count, subtotal, tax note.
- **Checkout** → ACCS checkout flow; **View Cart** → full Cart page; **express pay** → PayPal / Apple Pay integrations.
- Product/line-item data depends on **EC-243** attributes exposed via Catalog Service.
- Emits analytics per the **MiniCart tagging plan** (`mini_cart_view`, `mini_cart_cta_click`, `remove_from_cart`, `view_cart`, `outside_click`).

## Dependencies
- ACCS cart (drop-in / GraphQL) — cart state.
- Full Cart page and Checkout flow (action targets) — related stories.
- Payment integrations (PayPal, Apple Pay).
- **EC-243** — product attributes exposed.
- Header cart icon (likely trigger) — see open item.

## Open Items / Assumptions
- Confirm the open trigger: header cart-icon click opens this popup vs. navigates to full Cart (currently the Figma cart icon navigates to the full Cart page — reconcile with this popup).
- Confirm whether line items are editable in the popup (qty change / remove) or view-only.
- Confirm B2C vs. B2B differences (actions, express pay availability).
- Confirm express-pay methods in scope (PayPal, Apple Pay, others).
