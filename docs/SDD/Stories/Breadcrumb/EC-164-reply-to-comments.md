# EC-164 — Reply to Kelly's review comments

_(Paste-ready responses. Story updated accordingly on 2026-07-01.)_

---

**1) Why is this an EDS ticket rather than a Commerce storefront component?**

On our EDS + ACCS architecture the storefront *is* EDS — the commerce components (PLP, PDP, cart, breadcrumb) are built and shipped as **EDS blocks** that consume Adobe Commerce data via GraphQL (Catalog Service). So the breadcrumb is Commerce-*driven* but EDS-*implemented*: the DOM/markup, styling, accessibility, SEO JSON-LD, and page-lifecycle integration are all EDS block work, and there is no separate storefront rendering layer running alongside EDS. "No authoring" is normal for a dynamic EDS block — the EDS label reflects where/how it's built, and the Commerce taxonomy is captured as a **data dependency**, not a separate ticket. I've added a "Classification" note to the ticket making this explicit.

**2) Is scope limited to PLP/PDP/Cart/Checkout? What about My Account?**

You're right — and the ticket was internally inconsistent: the Design Specs line said PLP/PDP/Cart/Checkout, but the Context Behavior table already listed My Account and Order Detail. My Account/Order Detail (and Search) **are** in scope. I've aligned the Design Specs line with the table so all page types are listed. It stays one ticket because it's the same breadcrumb block — commerce pages get the ACCS taxonomy trail, account pages get a static/contextual trail (Home > My Account > …). Note: the account pages themselves aren't in the current B2C Figma canvas/block inventory, so their design/build is a separate dependency; only the breadcrumb behavior is covered here.

**3) Mobile inconsistency — collapsed format vs. parent staying clickable**

Agreed, and your usability preference is the correct resolution. The two lines were describing the same pattern imprecisely. Intended behavior is now **`Home > … > Parent > Current`** — collapse the *middle* crumbs only and keep the **immediate parent clickable** so users can go back one level. Rules added: show the full trail at ≤3 levels; collapse the middle only at 4+ levels; current page stays visible and non-clickable. I've updated both the Design Specs and the Acceptance Criteria so they match. Open follow-up: confirm whether the `…` should be an expandable control or a non-interactive indicator.
