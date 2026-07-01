# EDS Story — "Save Time with Quick Order" Promo Block

**Type:** Story
**Component:** EDS Storefront (DA) — Content / CTA Block
**Related design:** Figma node 2749-49697 — `Save Time with Quick Order` (COMPONENT_SET: Desktop 1280×276, Tablet 768×238, Mobile 360×257).
**Audience note:** This is a **B2B / Leaders** entry point — links into the Quick Order flow (see B2B QuickOrders tagging plan / flow).

---

## User Story
**As a** troop leader / B2B buyer on girlscoutshop.com,
**I want** a prominent "Save Time with Quick Order" banner that lets me jump into adding products by SKU,
**so that** I can quickly build a large order without browsing.

**As a** content author,
**I want** to author the heading, subtext, and CTA of this promo banner,
**so that** I can maintain the Quick Order entry point without code changes.

---

## Description
Build a compact horizontal **promo/CTA banner** with decorative icons, a heading, a supporting line, and a primary CTA button that routes to the Quick Order flow. Responsive across Desktop / Tablet / Mobile. This is authored content; the CTA links to the Quick Order page.

---

## Design Specs (from Figma)
- Block width 1280; content max ~1168; compact height ~276 (desktop).
- **Decorative icons** (left): two icon/illustration groups (code/asset-provided).
- **Heading**: "Save Time with Quick Order" — Girl Scout Light(300) 36/43, black.
- **Subtext**: "Have your SKUs? Add them here to qui[ckly]…" — Trefoil Sans 400 20/24, `#2D2E33`.
- **Primary CTA**: "START QUICK ORDER" — button (~210×52), Trefoil Sans 500 16/21, white label on green fill, with icon.
- GS brand tokens; green `#005640` accent.
- **Responsive variants** (verified): Desktop 1280×276, Tablet 768×238, Mobile 360×257 (stacks/scales; icons may reduce or hide).

### Hover Details
- **"START QUICK ORDER" button**: green fill darkens (≈`#004a37`) or inverts to outline on hover; icon nudges; cursor pointer; visible focus ring (≥3:1 contrast).
- **Global**: respect `prefers-reduced-motion`; hover has an equivalent keyboard-focus state; ≥44×44px tap target on mobile.

> Note: no explicit hover-state variants are defined in Figma — hover follows the GS brand green `#005640` and standard convention; confirm with design.

---

## EDS DA Authoring Details

| Displayed data | Content is sourced from | Required |
|----------------|-------------------------|----------|
| Heading (Save Time with Quick Order) | EDS | Y |
| Subtext / supporting line | EDS | N |
| Primary CTA label ("START QUICK ORDER") | EDS | N |
| Primary CTA link (Quick Order page) | EDS | N |
| Decorative icons / illustrations | Code | N |

- Authored as a block table (e.g., **`Quick Order Promo`**) in the page document.
- Author sets heading, subtext, and the CTA (label + link).
- Decorative icons are code/asset-provided, not authored.

## Authoring Acceptance Criteria
- [ ] Author can add the block and set the heading and subtext.
- [ ] Author can set the CTA label and link (Quick Order page).
- [ ] Omitting the subtext renders the block cleanly.
- [ ] Preview reflects the block before publish.

## User Acceptance Criteria
- [ ] Block renders the icons, heading, subtext, and CTA per design.
- [ ] Clicking "START QUICK ORDER" navigates to the Quick Order flow/page.
- [ ] Responsive: layout adapts at tablet and mobile without overflow or distortion.
- [ ] Keyboard: CTA is focusable with visible focus; Enter activates.
- [ ] WCAG 2.1 AA: heading structure, accessible CTA name, sufficient contrast; decorative icons hidden from assistive tech.
- [ ] Performance: icons optimized; no layout shift.

## Commerce Data Flow
- **Authored content — no catalog data.** Heading, subtext, and CTA are authored in DA.
- The CTA links to the **Quick Order page** (a Commerce/B2B flow). The Quick Order page itself (SKU entry, add-to-cart) is a separate ticket/flow.

## Dependencies
- Quick Order page/flow (CTA target) — separate ticket (see B2B QuickOrders).
- Adobe Assets / DA (or code) for the decorative icons.
- Shared button styles (GS design tokens).

## Open Items / Assumptions
- Confirm the CTA target URL (Quick Order page path).
- Confirm audience/placement: B2B/Leaders home only, or shown to all users.
- Confirm whether the decorative icons are fixed (code) or author-selectable.
- Confirm exact hover shade with design (none defined in Figma).
