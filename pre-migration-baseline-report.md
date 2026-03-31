# Pre-Migration Baseline Report: girlscoutshop.com

**Site:** https://www.girlscoutshop.com/
**Report Date:** 2026-03-30
**Purpose:** Establish measurable baselines across all key parameters before AEM Edge Delivery Services migration

---

## 1. PERFORMANCE METRICS

### 1.1 Page Load Timing (Homepage)

| Metric | Current Value | EDS Target | Notes |
|--------|--------------|------------|-------|
| DNS Lookup | 0 ms | 0 ms | Cached/preresolved |
| TCP Connect | 39 ms | < 20 ms | TLS handshake included |
| Time to First Byte (TTFB) | 30 ms | < 200 ms | Good baseline |
| DOM Interactive | 348 ms | < 200 ms | JS-heavy SPA affects this |
| DOM Content Loaded | 376 ms | < 300 ms | |
| Full Page Load | 452 ms | < 500 ms | |

### 1.2 Resource Weight

| Resource Type | Count | Transfer Size | EDS Target |
|---------------|-------|--------------|------------|
| JavaScript | 7 files | 94.7 KB | < 50 KB |
| Stylesheets | 2 files | (in "other") | < 20 KB |
| Images | 64 resources | 1.9 MB | < 500 KB (optimized + lazy) |
| Fonts | 4 files | 198.5 KB | < 100 KB |
| Other (APIs, etc.) | 52 requests | 363.1 KB | Minimize |
| **Total** | **127 requests** | **2.56 MB** | **< 1 MB** |

### 1.3 Core Web Vitals (To Be Measured via PageSpeed Insights)

| Metric | Target | How to Measure |
|--------|--------|----------------|
| Largest Contentful Paint (LCP) | < 2.5s | PageSpeed Insights / CrUX |
| First Input Delay (FID) | < 100ms | CrUX data |
| Cumulative Layout Shift (CLS) | < 0.1 | PageSpeed Insights |
| Interaction to Next Paint (INP) | < 200ms | CrUX data |
| First Contentful Paint (FCP) | < 1.8s | PageSpeed Insights |
| Time to Interactive (TTI) | < 3.8s | Lighthouse |

> **Action:** Run `https://developers.google.com/speed/pagespeed/insights/?url=https://www.girlscoutshop.com/` to capture lab + field CWV scores before migration.

### 1.4 DOM Complexity

| Metric | Current Value | EDS Target |
|--------|--------------|------------|
| Total DOM Elements | 1,828 | < 800 |
| Max DOM Depth | 20 levels | < 12 |
| Total Text Nodes | 2,290 | Proportional |

---

## 2. SEO PARAMETERS

### 2.1 Meta Tags

| Parameter | Current Value | Status | Migration Action |
|-----------|--------------|--------|-----------------|
| Title | "Girl Scout Shop \| Girl Scout Uniforms, Program, Outdoor Gear and More!" | Present | Preserve exactly |
| Meta Description | "Whether you're a troop leader looking for the newest Girl Scout badges..." (155 chars) | Present | Preserve |
| Meta Keywords | "Girl Scout Shop, Girl Scouts of the USA" | Present | Preserve (low SEO impact) |
| Canonical URL | `https://www.girlscoutshop.com/` | Present | Ensure correct canonical on all pages |
| Viewport | `width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no` | Present | Update: remove `user-scalable=no` (accessibility issue) |
| Language | `en-US` | Set on `<html>` | Preserve |
| Charset | `utf-8` | Present | Preserve |
| X-UA-Compatible | `IE=edge` | Present | Can drop (legacy IE) |

### 2.2 Open Graph / Social Meta

| Tag | Status | Migration Action |
|-----|--------|-----------------|
| og:title | **Missing** | Add |
| og:description | **Missing** | Add |
| og:image | **Missing** | Add (brand image) |
| og:url | **Missing** | Add |
| og:type | **Missing** | Add (`website`) |
| twitter:card | **Missing** | Add (`summary_large_image`) |
| twitter:site | **Missing** | Add (`@girlscouts`) |

### 2.3 Structured Data (Schema.org)

| Type | Status | Migration Action |
|------|--------|-----------------|
| JSON-LD | **None found** | Add Organization, WebSite, BreadcrumbList |
| Product schema | **Missing** | Add for product pages |
| SearchAction | **Missing** | Add for site search |

### 2.4 Robots & Sitemap

| Parameter | Current Value | Status |
|-----------|--------------|--------|
| robots.txt | Allow: / (all allowed) | Present |
| Sitemap | `sitemap_www.girlscoutshop.com_Index.xml` | Present |
| Sitemap accessible | Sub-sitemap returned 404 | **Broken** |
| Meta robots | Not set (default: index, follow) | OK |

### 2.5 URL Structure

| Parameter | Current Value | Notes |
|-----------|--------------|-------|
| HTTPS | Yes | Enforced |
| Canonical URLs | Present | Self-referencing on homepage |
| URL patterns | `/category-name`, `/product-name` | Flat structure |
| Trailing slashes | No trailing slash | Consistent |

### 2.6 Heading Hierarchy

| Tag | Count | Sample Content |
|-----|-------|---------------|
| H1 | **0** | **Missing!** Critical SEO issue |
| H2 | 7 | "Uniforms", "Shop By Grade Level", "Uniform Customization", "What's New", "Trefoil Fun Finds" |
| H3 | 0 | - |
| H4 | 7 | "Store Finder", "Quick Links", "Shop", "Need Help", "Official GS USA Links" |
| H5 | 1 | "Shop Your Council" |
| H6 | 0 | - |

> **Critical Finding:** No H1 tag on homepage. This is a significant SEO issue that should be fixed during migration.

---

## 3. ACCESSIBILITY BASELINE

### 3.1 ARIA Landmarks

| Landmark | Count | Status |
|----------|-------|--------|
| Navigation (`<nav>`) | 7 | Present (potentially too many) |
| Main content (`<main>`) | **0** | **Missing** |
| Banner (`<header>`) | 1 | Present |
| Content Info (`<footer>`) | 1 | Present |
| Search (`role="search"`) | **0** | **Missing** |
| Elements with `aria-label` | **0** | **Missing** |
| Elements with `aria-describedby` | **0** | **Missing** |
| Skip Links | **0** | **Missing** |

### 3.2 Image Accessibility

| Metric | Count | Percentage |
|--------|-------|------------|
| Total Images | 91 | 100% |
| With meaningful alt text | 18 | 19.8% |
| With empty alt (`alt=""`) | 58 | 63.7% |
| Missing alt attribute entirely | 15 | **16.5%** |

> **Critical Finding:** 80% of images lack meaningful alt text. This is a major accessibility gap.

### 3.3 Accessibility Issues Summary

| Issue | Severity | Current | EDS Target |
|-------|----------|---------|------------|
| Missing H1 | High | 0 H1 tags | 1 per page |
| No `<main>` landmark | High | Missing | Required |
| No skip navigation | Medium | Missing | Required |
| No `role="search"` on search | Medium | Missing | Required |
| No ARIA labels | High | 0 labels | All interactive elements |
| Images without alt | High | 15 images | 0 |
| `user-scalable=no` in viewport | High | Present | Remove |
| Color contrast | Unknown | Not tested | WCAG AA (4.5:1) |
| Keyboard navigation | Unknown | Not tested | Full keyboard support |
| Focus indicators | Unknown | Not tested | Visible on all interactive |

### 3.4 Recommended Pre-Migration A11y Audit

Run these tools to capture full baseline:
- **axe DevTools** or **WAVE** browser extension
- **Lighthouse Accessibility** audit score
- **Manual keyboard navigation** test
- **Screen reader** test (VoiceOver/NVDA)

---

## 4. CONTENT & ASSET INVENTORY

### 4.1 Link Inventory (Homepage)

| Type | Count |
|------|-------|
| Total Links | 507 |
| Internal Links | 436 |
| External Links | 71 |

### 4.2 Navigation Structure

**Utility Nav (Top Bar):**
- Shop Your Council | FAQ | Contact Us | Catalogs | Store Locator | Quick Order | Login | Sign Up

**Primary Navigation:**
| Category | Color |
|----------|-------|
| NEW | Orange |
| GIRLS | Pink |
| ADULTS & LEADERS | Magenta |
| BADGES & PROGRAM | Purple-Blue |
| TOYS & OUTDOORS | Blue |
| COUNCIL | Green |
| SALE | Yellow |

**Footer Sections:**
- Store Finder
- Quick Links (Account, Catalogs, Gift Cards, Cookie Dough, Quick Order)
- Shop (by grade: Daisy through Ambassador)
- Need Help (FAQs, Returns, Shipping, Uniform Info, Customization, Sustainability)
- Official GS USA Links

### 4.3 Content Sections (Homepage)

| Section | Type | Description |
|---------|------|-------------|
| Hero Banner | Full-width image | "NEW Spring Favorites" with SHOP NOW CTA |
| Promo Banner | Text bar | "Free Gift With Purchase of a Uniform - Use Code: FREEKITBAG" |
| Uniforms | Product carousel | Horizontal scroll of uniform items |
| Shop By Grade Level | Avatar cards | Grade level icons (Daisy, Brownie, etc.) |
| Badges & Awards | Full-width banner | Image with SHOP ALL CTA |
| Uniform Customization | CTA section | Call to action for customization service |
| Promotional Banner | Full-width | "Exploration never tasted so sweet" campaign |
| Official Apparel | Banner | Branded apparel promotion |
| What's New | Product carousel | New arrival products |
| Trefoil Fun Finds | Product carousel | Themed product picks |
| Shop By Category | Icon grid | Category icons (Bags, Gifts, Books, etc.) |
| Promotional Cards | Card grid | 3 promo cards at bottom |
| Email Signup | CTA bar | "Join Our Email List" |

### 4.4 Forms Inventory

| Form | Location | Purpose |
|------|----------|---------|
| Search form | Header | Product search |
| Login form | Header dropdown | User authentication |
| Store locator | Footer | Find local store |
| Email signup | Footer | Newsletter subscription |

---

## 5. DESIGN SYSTEM / VISUAL TOKENS

### 5.1 Typography

| Font Family | Usage | Weight/Style |
|-------------|-------|--------------|
| **Trefoil Sans** | Primary brand font | Multiple weights |
| **FontAwesome** | Icons | - |
| **girl_scouts_icons** | Custom icon font | - |
| monospace | Fallback | - |

### 5.2 Color Palette

**Brand / Background Colors:**

| Color | RGB | Hex | Usage |
|-------|-----|-----|-------|
| Girl Scout Green | rgb(0, 174, 88) | `#00AE58` | Primary brand, buttons, CTAs |
| Hot Pink | rgb(236, 0, 139) | `#EC008B` | Girls category, accents |
| Light Pink | rgb(245, 164, 199) | `#F5A4C7` | Soft accents |
| Softer Pink | rgb(252, 223, 235) | `#FCDFEB` | Backgrounds |
| Orange | rgb(243, 112, 33) | `#F37021` | NEW category |
| Light Orange | rgb(251, 205, 178) | `#FBCDB2` | Backgrounds |
| Purple | rgb(110, 41, 141) | `#6E298D` | Badges category |
| Light Purple | rgb(224, 213, 234) | `#E0D5EA` | Backgrounds |
| Navy Blue | rgb(0, 78, 154) | `#004E9A` | Program category |
| Light Navy | rgb(221, 225, 240) | `#DDE1F0` | Backgrounds |
| Sky Blue | rgb(0, 171, 230) | `#00ABE6` | Outdoors category |
| Lime Green | rgb(178, 210, 53) | `#B2D235` | Accents |
| Light Lime | rgb(237, 244, 213) | `#EDF4D5` | Backgrounds |

**Text Colors:**

| Color | RGB | Hex | Usage |
|-------|-----|-----|-------|
| Black | rgb(0, 0, 0) | `#000000` | Body text |
| Near Black | rgb(34, 34, 34) | `#222222` | Headings |
| Dark Gray | rgb(34, 36, 38) | `#222426` | Secondary text |
| Medium Gray | rgb(77, 82, 86) | `#4D5256` | Muted text |
| Light Gray | rgb(175, 175, 175) | `#AFAFAF` | Disabled/placeholder |
| White | rgb(255, 255, 255) | `#FFFFFF` | Text on dark bg |
| Green | rgb(0, 174, 88) | `#00AE58` | Links, CTAs |

### 5.3 Visual Metrics Summary

| Metric | Count |
|--------|-------|
| Unique background colors | 19 |
| Unique text colors | 7 |
| Font families | 4 |
| Lazy-loaded images | 18 of 91 (19.8%) |

---

## 6. ANALYTICS & TRACKING INVENTORY

### 6.1 Tracking Scripts Detected

| Service | Detected | Migration Action |
|---------|----------|-----------------|
| Google Analytics (gtag) | Yes | Migrate to `delayed.js` |
| Google Tag Manager | Yes | Migrate to `delayed.js` |
| Facebook Pixel | Yes | Migrate to `delayed.js` |
| Pinterest Tag | Yes | Migrate to `delayed.js` |
| Microsoft Clarity | Yes | Migrate to `delayed.js` |
| New Relic (NREUM) | Yes | Evaluate necessity for EDS |
| Siteimprove | Yes | Migrate to `delayed.js` |

### 6.2 Cookie Consent

| Mechanism | Status |
|-----------|--------|
| OneTrust | Not detected |
| CookieBot | Not detected |
| Custom banner | Not detected |

> **Finding:** No cookie consent mechanism detected. May need to add one depending on jurisdictional requirements.

### 6.3 Third-Party Integrations

| Integration | Purpose | Migration Consideration |
|-------------|---------|------------------------|
| NetSuite / SuiteCommerce | E-commerce platform | Major consideration - product/cart/checkout |
| New Relic | Performance monitoring | Evaluate - EDS has built-in RUM |
| Siteimprove | Accessibility monitoring | Can continue with EDS |
| Pinterest | Social commerce | Move to `delayed.js` |
| Facebook | Social/advertising pixel | Move to `delayed.js` |
| Google Ads (AW-769071483) | Advertising | Move to `delayed.js` |
| Microsoft Clarity | Heatmaps/recordings | Move to `delayed.js` |

---

## 7. TECHNICAL STACK ANALYSIS

### 7.1 Current Technology Stack

| Component | Technology | Migration Impact |
|-----------|-----------|-----------------|
| Platform | NetSuite SuiteCommerce Advanced (SCA) | **High** - Complete re-architecture |
| Frontend | jQuery + Backbone.js + RequireJS | **High** - Replace with vanilla JS |
| CSS | Custom + Bootstrap elements | **Medium** - Rewrite to CSS custom props |
| Templates | Handlebars (server-rendered) | **High** - Replace with EDS content model |
| Cart/Checkout | SCA Shopping module | **Critical** - Requires integration strategy |
| Search | SCA built-in search | **Medium** - Need replacement or integration |
| CDN | NetSuite hosting | **Replaced** - AEM Edge Delivery CDN |
| SSL | HTTPS enforced | **Maintained** - EDS provides SSL |

### 7.2 JavaScript Dependencies (External Scripts)

| Script Source | Count |
|---------------|-------|
| pinterest.com | 2 |
| clarity.ms | 1 |
| googletagmanager.com | 1 |
| siteimproveanalytics.com | 1 |
| girlscoutshop.com (SCA framework) | 20+ |

### 7.3 Service Worker

| Parameter | Status |
|-----------|--------|
| Service Worker registered | Yes |
| PWA Manifest | No |

---

## 8. SOCIAL MEDIA PRESENCE

| Platform | URL | Status |
|----------|-----|--------|
| Facebook | https://www.facebook.com/GirlScouts | Active |
| Twitter/X | https://twitter.com/girlscouts | Active |
| Pinterest | https://www.pinterest.com/gsusa/ | Active |
| Instagram | https://www.instagram.com/girlscouts/ | Active |

---

## 9. MIGRATION RISK MATRIX

### 9.1 High-Risk Items

| Risk | Impact | Mitigation |
|------|--------|------------|
| E-commerce functionality (cart, checkout, account) | Loss of purchasing capability | Plan headless commerce integration or keep SCA for transactional flows |
| Product catalog rendering | All product pages break | Define product page template with EDS blocks |
| Search functionality | Users can't find products | Implement search integration (Algolia, etc.) |
| Council-specific pricing/inventory | Council features break | Plan API integration layer |

### 9.2 Medium-Risk Items

| Risk | Impact | Mitigation |
|------|--------|------------|
| 7+ analytics scripts | Tracking data gaps | Validate all tracking fires correctly post-migration |
| No structured data currently | No regression but missed opportunity | Add during migration |
| Font loading (Trefoil Sans) | Brand consistency | Ensure font files migrate, optimize with `font-display: swap` |
| 500+ internal links | Broken links | Create comprehensive redirect map |

### 9.3 Low-Risk Items

| Risk | Impact | Mitigation |
|------|--------|------------|
| Missing OG/social tags | No regression (already missing) | Add during migration (improvement) |
| No cookie consent | No regression | Add if legally required |

---

## 10. BASELINE MEASUREMENT CHECKLIST

Use this checklist to capture quantitative baselines before migration begins:

### Performance (run PageSpeed Insights)
- [ ] PageSpeed Mobile score: ____
- [ ] PageSpeed Desktop score: ____
- [ ] LCP (lab): ____ seconds
- [ ] FID/INP (field): ____ ms
- [ ] CLS (lab): ____
- [ ] FCP: ____ seconds
- [ ] TTI: ____ seconds
- [ ] Total Blocking Time: ____ ms
- [ ] Speed Index: ____

### SEO (run Screaming Frog or similar)
- [ ] Total indexed pages (Google: `site:girlscoutshop.com`): ____
- [ ] Pages with title tags: ____
- [ ] Pages with meta descriptions: ____
- [ ] Pages with H1: ____
- [ ] Total backlinks (Ahrefs/Moz): ____
- [ ] Domain Authority: ____
- [ ] Organic traffic (GA): ____
- [ ] Top 10 organic keywords: ____

### Accessibility (run Lighthouse)
- [ ] Lighthouse Accessibility score: ____
- [ ] Total WCAG violations: ____
- [ ] Critical violations: ____
- [ ] Serious violations: ____

### Content
- [ ] Total sitemap URLs: ____
- [ ] Product pages: ____
- [ ] Category pages: ____
- [ ] Static/info pages: ____
- [ ] Total images: 91 (homepage)
- [ ] Total unique page templates: ____

### Analytics (from GA/GTM)
- [ ] Monthly page views: ____
- [ ] Monthly unique visitors: ____
- [ ] Bounce rate: ____
- [ ] Average session duration: ____
- [ ] Top 10 pages by traffic: ____
- [ ] Conversion rate: ____

---

## 11. POST-MIGRATION COMPARISON FRAMEWORK

After migration, re-run all measurements and compare:

| Category | Metric | Pre-Migration | Post-Migration | Delta | Pass/Fail |
|----------|--------|--------------|----------------|-------|-----------|
| Performance | PageSpeed Mobile | | | | >= pre |
| Performance | PageSpeed Desktop | | | | >= pre |
| Performance | LCP | | | | <= pre |
| Performance | CLS | | | | <= pre |
| Performance | Page Weight | 2.56 MB | | | < pre |
| Performance | HTTP Requests | 127 | | | < pre |
| SEO | Indexed Pages | | | | >= pre |
| SEO | Organic Traffic | | | | >= pre |
| SEO | H1 Present | No | | | Yes |
| SEO | Structured Data | None | | | Added |
| A11y | Lighthouse Score | | | | >= pre |
| A11y | ARIA Landmarks | Partial | | | Complete |
| A11y | Image Alt Text | 19.8% | | | > 95% |
| Content | Pages Migrated | | | | 100% |
| Analytics | Events Firing | | | | 100% match |
| Visual | Design Fidelity | | | | Stakeholder approved |

---

## 12. RECOMMENDED NEXT STEPS

1. **Run PageSpeed Insights** on homepage + top 5 traffic pages to capture lab CWV scores
2. **Run Lighthouse** full audit (Performance, Accessibility, SEO, Best Practices) and save reports
3. **Crawl site** with Screaming Frog to get full URL inventory and SEO baseline
4. **Export analytics** data for the past 12 months from Google Analytics
5. **Document redirect map** for all current URLs
6. **Define e-commerce integration strategy** (headless commerce API vs hybrid approach)
7. **Prioritize page templates** for migration (homepage, category, product, static)
8. **Begin migration** with `excat-site-migration` skill using prioritized URL list

---

*Report generated as part of AEM Edge Delivery Services migration planning.*
