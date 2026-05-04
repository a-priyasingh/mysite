---
title: "Page Shell & Runtime Responsibilities — Migration Design"
subtitle: "AEM 6.4 to AEM as a Cloud Service (Edge Delivery Services) Migration"
date: "May 4, 2026"
author:
  - name: "Adobe Professional Services"
    affiliation: "Edge Delivery Services"
---

# Page Shell & Runtime Responsibilities — Target State Design

## 1. Executive Summary

This section defines the explicit responsibility mapping for the page shell migration from AEM 6.4 to Edge Delivery Services. The current page shell owns significantly more than header/footer rendering — it orchestrates the Adobe Data Layer, analytics pipeline, consent management, accessibility runtime, personalization hooks, chat integration, and eCommerce context. Each responsibility is inventoried, its target-state owner assigned, and parity validation defined.

---

## 2. Source State: Page Shell Responsibility Inventory

### 2.1 Runtime Components Identified

| # | Responsibility | Source Technology | Load Phase | Critical |
|---|---|---|---|---|
| 1 | **Adobe Data Layer (`digitalData`)** | Custom JS object on `window` | Synchronous (head) | Yes |
| 2 | **Adobe Launch (Tags)** | `_satellite` via `assets.adobedtm.com` | Async (head) | Yes |
| 3 | **Adobe Alloy (Web SDK)** | `alloy` namespace | Async (Launch rule) | Yes |
| 4 | **TrustArc/TrustE Consent Manager** | `consent.truste.com` script | Sync (head, blocking) | Yes |
| 5 | **UserWay Accessibility Widget** | `cdn.userway.org` widget | Async (head) | Yes |
| 6 | **Skip Links & ARIA Landmarks** | UserWay dynamic injection | Post-load | Yes |
| 7 | **Kampyle Feedback Widget** | `KAMPYLE_ONSITE_SDK` | Delayed | No |
| 8 | **Chat (TF Chat Launcher)** | `chat-api.thermofisher.com` | Delayed | No |
| 9 | **Cart Context / eCommerce** | `DM Preload` + REST API | Async (early) | Yes |
| 10 | **Merchandising Tracking (`cid`)** | `digitalData.merchandising` | Sync | Yes |
| 11 | **Search Bar (v2)** | Custom searchbar.js + Endeca | Async | No |
| 12 | **Promo/Offer Banner (Header Bar)** | Dynamic content injection | Async | No |

### 2.2 Adobe Data Layer Structure (`window.digitalData`)

The current `digitalData` object is the single source of truth for all analytics, personalization, and tracking. It is populated synchronously before Adobe Launch fires.

```javascript
window.digitalData = {
  page: {
    country: "us",                              // Geo context
    language: "en",                             // Language
    siteName: "thermo",                         // Site identifier
    type: "cq",                                 // Page type (cq = AEM-authored)
    cqtemplate: "/apps/lifetech/templates/...", // AEM template
    jcrTitle: "Polymerase Chain Reaction (PCR)", // Page title
    ltMetaDescription: "...",                   // Meta description
    businessUnit: "Molecular Biology",          // BU taxonomy
    searchDimensions: "SearchDimensions:PCR",   // Search facets
    productDivision: "BID"                      // Division
  },
  user: {
    gigyaId: "",                                // Gigya/SAP CDC ID
    loginStatus: "anonymous"                    // Auth state
  },
  merchandising: {
    cid: "..."                                  // Campaign ID tracking
  },
  cartItems: [],                                // Current cart state
  widgets: {
    chat: {...},                                // Chat config
    userway: {...}                              // Accessibility config
  },
  // Methods
  getQueryParam: fn,                            // URL param extraction
  getValOnce: fn,                               // Dedup tracking
  getCookie: fn, setCookie: fn,                 // Cookie utilities
  getMasterDomain: fn,                          // Domain resolution
  formSubmitEvent: fn,                          // Form analytics
  modalVideoEvent: fn,                          // Video tracking
  customClickEvent: fn                          // Custom event dispatch
}
```

### 2.3 Adobe Launch Configuration

| Property | Value |
|---|---|
| **Property Name** | `Thermofisher.com - Required Only` |
| **Property ID** | `PRd3086b6d2b224c24be2f80bb4d1bbed9` |
| **Turbine Version** | 29.0.0 |
| **Build Date** | 2026-03-10 |
| **Library URL** | `assets.adobedtm.com/7e08552ade3f/1a8047d2b483/launch-f46125d37e44.min.js` |
| **Alloy Namespace** | `alloy` (Adobe Experience Platform Web SDK) |
| **Extensions Loaded** | 4 rule components (RC*-source.min.js) |

### 2.4 Consent Management (TrustArc)

| Property | Value |
|---|---|
| **Provider** | TrustArc (TrustE) |
| **Script** | `consent.truste.com/notice?c=teconsent&...&domain=thermofisher.com` |
| **Consent Element** | `#teconsent` DOM element |
| **Behavior** | Blocks non-essential cookies until consent given |
| **Country-Aware** | Yes (`country=us&language=en` in script URL) |
| **Categories** | Required, Functional, Advertising (standard TrustArc) |

### 2.5 Accessibility Runtime (UserWay)

| Property | Value |
|---|---|
| **Provider** | UserWay |
| **Widget Script** | `cdn.userway.org/widgetapp/.../widget_app_*.js` |
| **Remediation** | `cdn.userway.org/widgetapp/.../remediation/remediation_*.js` |
| **Features** | Skip-to-content, screen reader mode, accessibility menu, navigation menu |
| **ARIA Injection** | Dynamic landmark roles, skip links |

### 2.6 Chat Integration

| Property | Value |
|---|---|
| **Endpoint** | `chat-api.thermofisher.com` |
| **Launcher** | `/search/chat-launcher/chat-launcher.js` |
| **App Bundle** | `/search/chat/tf/app.*.js` + `/search/chat/tf/css/app.*.css` |
| **Eligibility** | Runtime check via API call (not all pages/users get chat) |

---

## 3. Target State: EDS Responsibility Mapping

### 3.1 Architecture Overview

```
┌──────────────────────────────────────────────────────────────────────┐
│                    EDS Page Shell Architecture                        │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  head.html (Global, every page)                                      │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │ • TrustArc consent script (sync, blocking — MUST load first)  │  │
│  │ • Adobe Launch property script (async)                         │  │
│  │ • Preconnect hints (adobedtm, edge.adobedc, etc.)            │  │
│  │ • CSP meta tag                                                 │  │
│  │ • Viewport meta                                                │  │
│  └────────────────────────────────────────────────────────────────┘  │
│                                                                      │
│  scripts.js — Eager Phase (LCP-critical)                             │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │ • Initialize digitalData object (page context)                 │  │
│  │ • Set page.country, page.language from URL                     │  │
│  │ • Set page.type = "eds" (replaces "cq")                       │  │
│  │ • Set page.jcrTitle from document.title                        │  │
│  │ • Set user.loginStatus from auth state                         │  │
│  │ • Fire "digitalData:ready" event                               │  │
│  └────────────────────────────────────────────────────────────────┘  │
│                                                                      │
│  Header Block (Lazy Phase)                                           │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │ • Global navigation + mega menu                                │  │
│  │ • Promo/offer header bar                                       │  │
│  │ • Search bar integration                                       │  │
│  │ • Cart icon + count badge                                      │  │
│  │ • Sign-in state display                                        │  │
│  └────────────────────────────────────────────────────────────────┘  │
│                                                                      │
│  delayed.js — Delayed Phase (3s+ after load)                         │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │ • UserWay accessibility widget injection                       │  │
│  │ • Kampyle feedback widget                                      │  │
│  │ • Chat launcher (eligibility check + inject)                   │  │
│  │ • Merchandising CID tracking                                   │  │
│  │ • SEO: hreflang + JSON-LD injection                           │  │
│  └────────────────────────────────────────────────────────────────┘  │
│                                                                      │
│  Footer Block (Lazy Phase)                                           │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │ • Footer navigation links                                      │  │
│  │ • Legal links (T&C, Privacy, Cookie Preferences)               │  │
│  │ • TrustArc cookie preferences trigger                          │  │
│  │ • Country selector                                             │  │
│  │ • Copyright notice                                             │  │
│  └────────────────────────────────────────────────────────────────┘  │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### 3.2 Responsibility Transfer Matrix

| # | Responsibility | Source Owner | Target Owner (EDS) | Implementation | Risk if Missed |
|---|---|---|---|---|---|
| 1 | `digitalData` initialization | AEM page component (HTL) | `scripts.js` (eager) | Build from URL + metadata block | Analytics blackout |
| 2 | Adobe Launch loading | `<head>` include | `head.html` | Same async script tag | All tracking lost |
| 3 | Alloy/Web SDK | Launch extension | Launch extension (unchanged) | No code change — Launch handles | Data collection gap |
| 4 | TrustArc consent | `<head>` include | `head.html` | Same sync script tag (BEFORE Launch) | GDPR/CCPA violation |
| 5 | UserWay accessibility | `<head>` include | `delayed.js` | Load script dynamically | Accessibility lawsuit risk |
| 6 | Skip links / ARIA | UserWay auto-inject | UserWay (unchanged) + EDS semantic HTML | EDS provides native landmarks; UserWay adds overlay | WCAG failure |
| 7 | Kampyle feedback | Footer include | `delayed.js` | Load SDK on timer | No feedback collection |
| 8 | Chat launcher | Footer include | `delayed.js` | Eligibility API → inject bundle | Lost engagement channel |
| 9 | Cart preload | Page shell JS | Header block | REST API call on header load | Empty cart badge |
| 10 | Merchandising CID | `digitalData` init | `delayed.js` | Parse `cid` from URL params | Campaign attribution loss |
| 11 | Search bar | Header component | Header block | Searchbar v2 script integration | Broken search UX |
| 12 | Promo header bar | Dynamic component | Header block | Authored content or API-driven | Missing promotions |

### 3.3 Load Order Dependency Chain

```
1. TrustArc consent script         ← MUST be first (blocks non-essential)
2. Adobe Launch library             ← After consent, respects consent state
3. digitalData initialization       ← Launch rules depend on this
4. Alloy/Web SDK (via Launch)      ← Fires after digitalData ready
5. Page content renders (LCP)       ← No dependency on analytics
6. Header block (cart, search)     ← Lazy phase
7. UserWay, Kampyle, Chat          ← Delayed phase (3s+)
```

**Critical invariant:** TrustArc MUST load before Adobe Launch. If this order is violated, cookies may be set before consent is obtained → regulatory violation.

---

## 4. Adobe Data Layer — Target State Implementation

### 4.1 Data Layer Initialization Strategy

In EDS, `digitalData` is constructed from:
1. **URL parsing** — country, language
2. **Metadata block** — title, description, businessUnit, productDivision, template
3. **Auth state** — login status from session/cookie
4. **URL parameters** — merchandising CID, campaign tracking

### 4.2 Data Layer Field Mapping (Source → Target)

| Field | Source (AEM 6.4) | Target (EDS) | Generation Method |
|---|---|---|---|
| `page.country` | Server-side from content path | URL segment parsing (`/us/en/...` → `us`) | `scripts.js` |
| `page.language` | Server-side from content path | URL segment parsing → `en` | `scripts.js` |
| `page.siteName` | Hardcoded in HTL | Hardcoded `"thermo"` | `scripts.js` |
| `page.type` | `"cq"` (AEM template type) | `"eds"` | `scripts.js` |
| `page.cqtemplate` | JCR template path | Metadata block → Template name | `scripts.js` |
| `page.jcrTitle` | `jcr:title` property | `document.title` (before suffix) | `scripts.js` |
| `page.ltMetaDescription` | `jcr:description` | `meta[name="description"]` content | `scripts.js` |
| `page.businessUnit` | Page properties | Metadata block → `business-unit` | `scripts.js` |
| `page.searchDimensions` | Page properties | Metadata block → `search-dimensions` | `scripts.js` |
| `page.productDivision` | Page properties | Metadata block → `product-division` | `scripts.js` |
| `user.gigyaId` | Server-side session | Cookie/session read | `scripts.js` |
| `user.loginStatus` | Server-side session | Cookie presence check | `scripts.js` |
| `merchandising.cid` | URL param extraction | `URLSearchParams` → `cid` | `delayed.js` |
| `cartItems` | REST API preload | REST API call in header block | Header block |

### 4.3 Custom Event Parity

| Event Method | Purpose | EDS Implementation |
|---|---|---|
| `digitalData.formSubmitEvent(formName, formData)` | Track form submissions | Global function; dispatches `CustomEvent` + calls `_satellite.track` |
| `digitalData.modalVideoEvent(videoId, action)` | Track video play/pause/complete | Global function; same pattern |
| `digitalData.customClickEvent(category, action, label)` | Track CTA clicks, downloads | Global function; same pattern |

### 4.4 Adobe Launch Integration Point

Adobe Launch rules are configured to fire on:
- `digitalData:ready` custom event (page view)
- `digitalData.formSubmitEvent` invocations
- `digitalData.customClickEvent` invocations
- DOM events (link clicks with `[data-analytics]` attributes)

**No Launch property changes required** — the Launch library remains the same. Only the data layer initialization moves from AEM HTL to EDS `scripts.js`.

---

## 5. Consent Management — Target State Design

### 5.1 TrustArc Integration in EDS

```html
<!-- head.html: TrustArc MUST be the FIRST external script -->
<script src="https://consent.truste.com/notice?c=teconsent&pcookie=true&js=nj&gtm=true
  &noticeType=bb&text=true&domain=thermofisher.com&country={country}&language={lang}
  &privacypolicylink=https://www.thermofisher.com/{country}/{lang}/home/global/privacy-policy.html
  &cookieLink=https://www.thermofisher.com/{country}/{lang}/home/global/how-cookies-are-used.html">
</script>
```

### 5.2 Consent-Aware Script Loading

| Script | Consent Required | Load Behavior |
|---|---|---|
| TrustArc | None (required cookie) | Always loads |
| Adobe Launch | None (Launch itself handles consent internally) | Always loads |
| Alloy/Web SDK | Launch checks TrustArc state before firing beacons | Conditional via Launch |
| UserWay | None (accessibility = required) | Always loads |
| Kampyle | Functional cookies consent | Only if consent given |
| Chat | Functional cookies consent | Only if consent given |
| Merchandising tracking | Advertising cookies consent | Only if consent given |

### 5.3 Cookie Preferences UI

The "Cookie Preferences" link in the footer triggers TrustArc's modal:
```javascript
// Footer block must wire this on the cookie preferences link
truste.eu.clickListener();
```

---

## 6. Accessibility — Target State Design

### 6.1 Native EDS Accessibility (Built-in)

EDS provides strong accessibility by default:

| Feature | EDS Native | Additional Work |
|---|---|---|
| Semantic HTML5 (`<header>`, `<main>`, `<footer>`, `<nav>`) | Yes | None |
| Proper heading hierarchy | Yes (from authored content) | Content authoring guidelines |
| Skip-to-main-content link | No (UserWay provides) | UserWay integration |
| Keyboard navigation | Yes (native links/buttons) | Custom widget a11y |
| Focus management | Partial | Block-specific focus traps for modals |
| ARIA landmarks | Yes (semantic elements) | None |
| Screen reader optimization | UserWay remediation | UserWay integration |

### 6.2 UserWay Integration in EDS

```javascript
// delayed.js
function loadUserWay() {
  const script = document.createElement('script');
  script.src = 'https://cdn.userway.org/widget.js';
  script.dataset.account = 'THERMO_FISHER_ACCOUNT_ID';
  document.head.appendChild(script);
}
loadUserWay();
```

### 6.3 Accessibility Features Preserved

| Feature | Source Implementation | Target Implementation |
|---|---|---|
| Skip to main content | UserWay button overlay | UserWay (unchanged) |
| Enable screen reader mode | UserWay button | UserWay (unchanged) |
| Open accessibility menu | UserWay widget | UserWay (unchanged) |
| Open accessible navigation | UserWay button | UserWay (unchanged) |
| Focus visible indicators | CSS + UserWay | EDS CSS + UserWay |
| Reduced motion | UserWay toggle | UserWay (unchanged) |

---

## 7. Chat & Feedback — Target State Design

### 7.1 Chat Launcher

```javascript
// delayed.js
async function loadChat() {
  const resp = await fetch('/api/chat/eligibility');
  if (resp.ok) {
    const { eligible } = await resp.json();
    if (eligible) {
      const script = document.createElement('script');
      script.src = 'https://chat-api.thermofisher.com/search/chat-launcher/chat-launcher.js';
      document.body.appendChild(script);
    }
  }
}
loadChat();
```

### 7.2 Kampyle Feedback

```javascript
// delayed.js
function loadKampyle() {
  const script = document.createElement('script');
  script.src = 'https://nebula-cdn.kampyle.com/us/wu/638829/onsite/generic.js';
  document.body.appendChild(script);
}
window.setTimeout(loadKampyle, 5000);
```

---

## 8. eCommerce Context — Target State Design

### 8.1 Cart Preload

The header block must preload cart state for the badge count:

```javascript
// blocks/header/header.js
async function loadCartState() {
  try {
    const resp = await fetch('/api/store/cart/details');
    if (resp.ok) {
      const data = await resp.json();
      window.digitalData.cartItems = data.products || [];
      updateCartBadge(window.digitalData.cartItems.length);
    }
  } catch { /* silent fail — badge shows 0 */ }
}
```

### 8.2 Merchandising CID Tracking

```javascript
// delayed.js or scripts.js
function initMerchandising() {
  const params = new URLSearchParams(window.location.search);
  const cid = params.get('cid') || params.get('icid');
  if (cid) {
    window.digitalData.merchandising = { cid };
    document.cookie = `cid=${cid};path=/;max-age=1800;SameSite=Lax`;
  }
}
```

---

## 9. Security Considerations

### 9.1 Content Security Policy

```html
<!-- head.html -->
<meta http-equiv="Content-Security-Policy"
  content="script-src 'nonce-aem' 'strict-dynamic' 'unsafe-inline' http: https:;
           base-uri 'self'; object-src 'none';"
  move-to-http-header="true">
```

### 9.2 Third-Party Script Domains Allowlist

| Domain | Purpose | Required |
|---|---|---|
| `assets.adobedtm.com` | Adobe Launch | Yes |
| `edge.adobedc.net` | Adobe Alloy/Web SDK | Yes |
| `consent.truste.com` | TrustArc consent | Yes |
| `cdn.userway.org` | Accessibility widget | Yes |
| `nebula-cdn.kampyle.com` | Feedback widget | No |
| `chat-api.thermofisher.com` | Chat integration | No |
| `dm-images.thermofisher.com` | Dynamic media images | Yes |

### 9.3 Form Security (if applicable)

| Concern | Source (AEM) | Target (EDS) |
|---|---|---|
| CSRF tokens | AEM Forms framework | Not applicable (no server-side forms in EDS) |
| Form encryption | AEM Forms encryption service | Client-side validation + HTTPS only |
| reCAPTCHA | Component-level | Block-level integration |

---

## 10. Validation & Regression Checks

### 10.1 Analytics Parity Test Matrix

| # | Test | Expected Result | Pass Criteria | Tool |
|---|---|---|---|---|
| 1 | `digitalData` object present | `window.digitalData` defined before Launch fires | Object exists with all required keys | Browser console |
| 2 | `page.country` populated | Matches URL country segment | `"us"` for US pages | Automated check |
| 3 | `page.language` populated | Matches URL language segment | `"en"` for English | Automated check |
| 4 | `page.jcrTitle` populated | Matches visible H1/title | Non-empty string | Automated check |
| 5 | `page.businessUnit` populated | Matches metadata block value | Non-empty on authored pages | Automated check |
| 6 | `_satellite` loaded | Adobe Launch property active | `_satellite.property.name` matches | Browser console |
| 7 | Alloy sends page view | Network request to `edge.adobedc.net` | Beacon fired with correct data | Network tab |
| 8 | Consent blocks tracking | With no consent, Alloy must NOT fire | Zero beacons before consent | Network tab |
| 9 | Form tracking works | `digitalData.formSubmitEvent` dispatches correctly | Launch rule fires on form submit | Analytics debugger |
| 10 | Click tracking works | `digitalData.customClickEvent` dispatches correctly | Launch rule fires on CTA click | Analytics debugger |
| 11 | CID captured | URL `?cid=X` populates `merchandising.cid` | Cookie set, data layer populated | Browser check |
| 12 | Cart state loads | Cart badge shows correct count | API returns data, badge updates | Visual + API |

### 10.2 Accessibility Regression Tests

| # | Test | Expected Result | Pass Criteria | Tool |
|---|---|---|---|---|
| 1 | UserWay widget loads | Accessibility menu button visible | Widget rendered, interactive | Visual |
| 2 | Skip-to-content works | Focus moves to main content | `main` receives focus on activation | Keyboard test |
| 3 | Landmark roles present | `banner`, `main`, `navigation`, `contentinfo` | All 4 present | aXe/Lighthouse |
| 4 | Keyboard navigation | All interactive elements focusable | Tab order logical, no traps | Manual test |
| 5 | Screen reader mode | UserWay SR mode activates | Content linearizes correctly | Screen reader |
| 6 | Focus indicators | Visible focus ring on all interactive elements | WCAG 2.4.7 pass | Visual test |

### 10.3 Consent & Privacy Tests

| # | Test | Expected Result | Pass Criteria | Tool |
|---|---|---|---|---|
| 1 | TrustArc loads first | Consent script precedes all other scripts | Script order in DOM | Network waterfall |
| 2 | No tracking before consent | Zero analytics beacons until accept | Network requests clean | Network tab |
| 3 | Cookie preferences modal | "Cookie Preferences" link opens TrustArc UI | Modal renders correctly | Manual test |
| 4 | Consent persists | Returning visitor not prompted again | TrustArc cookie present | Cookie inspector |
| 5 | Opt-out works | Rejecting cookies stops all non-essential tracking | Zero non-essential cookies | Cookie inspector |

### 10.4 Performance Checks

| # | Test | Expected Result | Pass Criteria |
|---|---|---|---|
| 1 | LCP not blocked by analytics | Analytics loads async, doesn't block render | LCP ≤ 2.5s |
| 2 | TrustArc doesn't block LCP | Consent script is small, loads fast | FCP ≤ 1.8s |
| 3 | Delayed scripts load after 3s | UserWay, Chat, Kampyle don't impact TBT | TBT ≤ 200ms |
| 4 | Total JS payload reasonable | No jQuery dependency in EDS | JS total ≤ 150KB (first-party) |

---

## 11. Migration Risks & Mitigations

| Risk | Impact | Likelihood | Mitigation |
|---|---|---|---|
| `digitalData` not ready when Launch fires | All analytics events lost (page views, clicks) | High | Initialize `digitalData` synchronously in `scripts.js` eager phase; fire `digitalData:ready` custom event; Launch rules use event-based trigger |
| TrustArc loads after Launch | Cookies set before consent = GDPR violation, potential €20M fine | Medium | Enforce script order in `head.html`; CSP headers; automated CI test checking script order |
| UserWay breaks in EDS context | Accessibility overlay fails, skip links missing | Low | UserWay is domain-agnostic; test in EDS preview before go-live |
| Cart API CORS issues | Cart badge shows 0, broken add-to-cart | Medium | Verify CORS headers allow EDS origins (`*.aem.live`, `*.aem.page`); add to API gateway config |
| Chat eligibility API blocked | Chat never loads for eligible users | Low | Verify API endpoint accepts EDS referer; add EDS domains to allowlist |
| CID attribution lost | Campaign ROI unmeasurable, marketing team impact | Medium | Initialize CID parsing in eager phase; persist to cookie immediately |
| Launch rules reference AEM-specific selectors | Rules fire on missing DOM elements → silent failure | High | Audit all Launch rules for AEM-specific selectors (`.parsys`, `.cq-*`); update to EDS equivalents |

---

## 12. Implementation Checklist

| # | Task | Owner | Phase | Dependency |
|---|---|---|---|---|
| 1 | Add TrustArc script to `head.html` (first position) | Dev | Sprint 1 | None |
| 2 | Add Adobe Launch script to `head.html` (after TrustArc) | Dev | Sprint 1 | TrustArc deployed |
| 3 | Implement `digitalData` initialization in `scripts.js` | Dev | Sprint 1 | Metadata block schema finalized |
| 4 | Add `business-unit`, `product-division`, `search-dimensions` to metadata block schema | Content/Dev | Sprint 1 | Content model defined |
| 5 | Audit Adobe Launch rules for AEM-specific selectors | Analytics team | Sprint 1 | Access to Launch property |
| 6 | Update Launch rules to use EDS DOM selectors | Analytics team | Sprint 2 | Rule audit complete |
| 7 | Implement cart preload in header block | Dev | Sprint 2 | API CORS configured |
| 8 | Add UserWay to `delayed.js` | Dev | Sprint 2 | Account ID confirmed |
| 9 | Add Chat launcher to `delayed.js` | Dev | Sprint 2 | API endpoint CORS verified |
| 10 | Add Kampyle to `delayed.js` | Dev | Sprint 2 | None |
| 11 | Add CID/merchandising tracking | Dev | Sprint 1 | None |
| 12 | Wire Cookie Preferences link in footer block | Dev | Sprint 2 | TrustArc deployed |
| 13 | Run full analytics parity test suite | QA | Sprint 3 | All above complete |
| 14 | Run accessibility audit (aXe + manual) | QA | Sprint 3 | UserWay deployed |
| 15 | Run consent flow test (GDPR, CCPA scenarios) | QA/Legal | Sprint 3 | TrustArc + Launch deployed |

---

## 13. Key Design Decisions

| Decision | Rationale | Alternative Considered |
|---|---|---|
| **Keep Adobe Launch unchanged** | Launch rules, extensions, and property config are independent of page delivery. Moving to EDS doesn't require re-building the Launch property. | Migrate to Adobe Web SDK direct (rejected: too much re-work, Launch provides governance) |
| **Initialize `digitalData` in eager phase** | Launch rules expect the data layer before firing. Delayed initialization causes missed page views. | Initialize in `delayed.js` (rejected: creates race condition with Launch) |
| **TrustArc in `head.html` not `delayed.js`** | Legal requirement: consent must be obtained before any non-essential processing. | Load dynamically (rejected: too late, GDPR risk) |
| **UserWay in delayed phase** | Accessibility overlay is not LCP-critical; UserWay itself is ~200KB. Loading it delayed preserves performance. | Load eagerly (rejected: 500ms+ LCP regression) |
| **EDS header block owns cart + search** | These are tightly coupled to the header UI; co-locating reduces complexity. | Separate blocks (rejected: adds network waterfalls, breaks cart badge UX) |
| **`page.type` changes from `"cq"` to `"eds"`** | Allows analytics team to segment data by platform during migration. | Keep as `"cq"` (rejected: makes A/B analysis impossible) |
