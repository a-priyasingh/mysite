# GSUSA Analytics / Tagging Plans — Meeting Discussion Points

**Context:** GSUSA Digital Tracking provided a complete set of GA4/GTM tagging plans (16 docs + tracker), built from wireframes + Adobe block diagrams, for the GSM Adobe Commerce (ACCS) storefront delivered on EDS. The plans are detailed and well-structured. The discussion is **how they land on EDS specifically** (placement, timing, who-pushes-what, drop-in events) and **scope reconciliation** (pages without designs, EC-243 dependency).

**Known facts from the docs (not for debate):**
- Tool stack via GTM: GA4, Microsoft Clarity, SiteImprove, Google Ads, Meta, Pinterest, Truyo (consent).
- Two GTM containers — Non-Prod `GTM-MSX7R7F4`, Prod `GTM-NXWW7L3J`.
- Ownership: Digital Tracking owns *what gets tracked* (plan, GTM, snippets, validation); Adobe owns *what happened* (dataLayer pushes).
- dataLayer-first architecture; `page_init` bootstrap event; controlled vocabularies for page_type, environment, etc.
- `data-analytics-*` attribute convention for click tracking.

---

## Discussion Points

### 1. GTM placement vs. EDS performance (highest priority)
Plans say "paste GTM as high in `<head>` as possible." On EDS this harms LCP/Lighthouse (target 100). GTM loads GA4 + Clarity + SiteImprove + Ads + Meta + Pinterest + Truyo.
- **Question:** Can GTM load in the EDS **delayed phase** (`delayed.js`, after LCP) instead of `<head>`? What is the agreed performance budget with all tags firing? Where does the `<noscript>` iframe go on EDS?

### 2. `page_init` ordering on EDS
Plans require the `page_init` dataLayer push "above the GTM script in `<head>`." EDS has no per-page server template to inject this.
- **Question:** Where do we push `page_init` (head.html / scripts.js eager phase) and how do we guarantee it runs before the delayed GTM load?

### 3. Who emits events — per-block dataLayer pushes
Plans define *what* to push; each EDS **block's JS must do the pushing** (view_item_list, select_item, add_to_cart, etc.).
- **Question:** Standardize on a custom `dataLayer` (as written) or the Adobe Commerce **Storefront Events SDK / ACDL** the drop-ins already emit? Avoid double-tracking. This becomes AC in every block story.

### 4. `data-analytics-*` attributes in blocks
Click tracking relies on `data-analytics-type/location/item/destination` with controlled vocabularies.
- **Question:** Confirm EDS block JS adds these attributes; for nav/footer authored in DA, how are stable slugs derived? Who maintains the controlled vocabulary?

### 5. Ecommerce items ↔ EC-243 attributes
`view_item`, `add_to_cart`, `purchase` need GA4 item params (`item_id`, `item_name`, `item_category`, `item_category2`…), sourced from ACCS catalog attributes.
- **Question:** Confirm category/sub-category attributes (EC-243) map to GA4 item params; who owns the mapping?

### 6. Checkout events on drop-ins (no full page loads)
Checkout plan lists begin_checkout, add_shipping_info, add_payment_info, etc. ACCS drop-ins update steps without navigation.
- **Question:** Do these fire on virtual page views / component events? Who instruments the drop-in events (Adobe boilerplate vs. custom)?

### 7. Pages in plans without designs/blocks yet
Plans include B2B QuickOrders, Fulfilment Log, Store Locator, Council Landing Page, Contact Us, FAQ, Transaction & Invoice, MyAccount — several not in the Guest/Caregivers B2C Figma canvas or current block inventory.
- **Question:** Are all in MVP scope? Do we have designs/blocks for them, or are they phased?

### 8. Environment variable mapping
`environment` controlled values: production/staging/qa/dev. EDS environments are branch preview / main preview / live.
- **Question:** Reconfirm mapping and who sets the `environment` value on EDS (no server-side injection).

### 9. Consent (Truyo) ordering
- **Question:** Confirm Truyo consent resolves before GA4/Ads/Meta fire (Consent Mode v2), and how consent state reaches GTM in the delayed phase.

### 10. Versioning / change control
Plans are version-dated and built from wireframes; we now have final Figma + block stories.
- **Question:** Agree a process to reconcile plan deltas where the design evolved past the wireframes.

---

## Suggested asks / next steps
- Adobe to confirm the EDS GTM load strategy (delayed phase) and `page_init` bootstrap location.
- Joint decision: custom dataLayer vs. Storefront Events SDK/ACDL.
- Map the tagging-plan pages to the block inventory / stories; flag gaps (Section "Pages without designs").
- Confirm EC-243 attribute → GA4 item param mapping owner.
- Confirm MVP page scope and phasing.
