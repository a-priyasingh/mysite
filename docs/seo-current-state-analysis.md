---
title: "SEO Current State Analysis — thermofisher.com"
subtitle: "Pre-Migration Audit of Homepage and Category Pages"
date: "May 4, 2026"
author:
  - name: "Adobe Professional Services"
    affiliation: "Edge Delivery Services"
---

# SEO Current State Analysis — thermofisher.com

## 1. Executive Summary

This analysis audits the current SEO health of thermofisher.com across 4 key pages (homepage + 3 L1 category pages) to establish a baseline before migration to AEM Edge Delivery Services. It identifies systemic issues that should be fixed during migration and highlights what already works well.

**Pages Analyzed:**

- Homepage: `/us/en/home.html`
- Antibodies: `/us/en/home/life-science/antibodies.html`
- Lab Chemicals: `/us/en/home/chemicals.html`
- Bioprocessing: `/us/en/home/bioprocessing.html`

---

## 2. Comparative Overview

| Metric | Homepage | Antibodies | Chemicals | Bioprocessing |
|---|---|---|---|---|
| **H1 Present** | No | Yes | Yes | Yes |
| **H1 Text** | NONE | "Invitrogen Antibodies" | "Lab Chemicals" | "Bioprocessing Solutions" |
| **Meta Description** | Good | Good | Good | Good |
| **Canonical** | Correct | Correct | Correct | Correct |
| **OG Image** | Broken (URL only) | Custom image | Custom image | Custom image |
| **Hreflang Tags** | 39 | 39 | 39 | 39 |
| **JSON-LD Schema** | 3 types | None | None | None |
| **Total Resources** | 111 | 82 | 72 | 69 |
| **Images (total)** | 55 | 30 | 37 | 40 |
| **Images without alt** | 0 | 12 (40%) | 5 (14%) | 0 (0%) |
| **Lazy-loaded images** | 5/55 (9%) | 19/30 (63%) | 24/37 (65%) | 28/40 (70%) |
| **Total links** | 192 | 140 | 149 | 165 |
| **javascript: links** | 2 | 2 | 2 | 2 |
| **Links without text** | 17 | 4 | 7 | 7 |
| **Empty headings** | 0 | 7 | 4 | 0 |
| **Mixed content warnings** | No | No | Yes | Yes |

---

## 3. Critical Issues (Site-Wide)

### 3.1 No H1 on Homepage

**Severity:** Critical
**Impact:** Google uses H1 as a primary relevance signal. The homepage has zero H1 headings — only H2s ("Featured Education", "Promotions", etc.).

**Recommendation:** Add a clear H1 (can be visually styled to fit design): "Thermo Fisher Scientific — Enabling Healthier, Cleaner, Safer Outcomes"

### 3.2 user-scalable=0 Blocks Pinch-to-Zoom

**Severity:** Critical
**Impact:** All pages use `maximum-scale=1.0, user-scalable=0` — fails WCAG 2.1 criterion 1.4.4 (Resize Text), penalized by Lighthouse (affects mobile ranking).

**Current:**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
```

**Should be:**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

### 3.3 Zero Structured Data on Category Pages

**Severity:** Critical
**Impact:** Only the homepage has JSON-LD (WebSite, Organization, ItemList). All category pages have zero structured data — no BreadcrumbList schema despite having visual breadcrumbs, no ItemList for product categories.

**Missed opportunity:** BreadcrumbList schema generates rich snippets in Google SERPs showing navigation path. For a site with 39 locales and thousands of category pages, this is massive lost SERP real estate.

### 3.4 Excessive Resource Loading

**Severity:** High
**Impact:** Pages load 69–111 network requests including 31 JavaScript files and 12 CSS files. This heavily impacts Core Web Vitals (LCP, TBT, INP) which Google uses as ranking signals since 2021.

| Page | Resources | JS Files | Impact |
|---|---|---|---|
| Homepage | 111 | 31 | Severe LCP/TBT penalty |
| Antibodies | 82 | ~25 | Major LCP/TBT penalty |
| Chemicals | 72 | ~22 | Significant penalty |
| Bioprocessing | 69 | ~20 | Significant penalty |

**EDS target:** 10–15 resources at LCP, 2 first-party JS files.

### 3.5 javascript:void(0) Links (All Pages)

**Severity:** High
**Impact:** Every page has 2 `javascript:void(0)` links (cart icon, "Report a Site Issue"). These are not crawlable, waste link equity, and fail accessibility standards.

---

## 4. Heading Hierarchy Issues

### 4.1 Homepage — Missing H1

```
[NO H1]
├── H2: Featured Education
├── H2: Accelerating Science
├── H2: Promotions
└── H2: New products
```

**Problem:** Flat structure with no primary heading.

### 4.2 Antibodies — Hidden "Access Denied" H1 + Empty H2s

```
H1: Access Denied          ← HIDDEN, from failed API call
H1: Invitrogen Antibodies  ← Actual page heading (2 H1s = bad)
├── H2: (empty)
├── H4: Advanced verification    ← Skips H3
├── H2: (empty)
├── H4: Publication-backed performance
├── H2: (empty)
├── H4: Antibody performance guarantee
├── H2: Antibody applications
├── H2: Research areas
├── H2: Related categories
├── H2: Educational content
├── H2: (empty)  ×4 more
└── H2: Related pages
```

**Problems:**
- 2 H1 tags (one hidden "Access Denied")
- 7 completely empty H2 tags
- H4 used under H2 (skips H3)
- Total of 23 headings, 7 empty

### 4.3 Chemicals — Inverted H2/H3 Hierarchy

```
H1: Lab Chemicals
├── H2: (empty) ×4
├── H3: Bulk and Custom Chemical Services
├── H3: Applications                        ← Parent section
│   ├── H2: Building blocks for organic synthesis  ← Child is HIGHER than parent
│   ├── H2: Chemicals for clean energy research
│   ├── H2: Small-molecule drug discovery
│   ├── H2: Small-molecule target validation
│   ├── H2: Protecting from PFAS
│   ├── H2: Oligonucleotide synthesis
│   └── H2: Peptide synthesis
├── H3: Resources                           ← Another parent section
│   ├── H2: Named reactions in organic chemistry
│   ├── H2: Connecting you with brightest minds
│   └── H2: Chemistry resource library
```

**Problem:** H3 sections contain H2 children — completely inverted. Google interprets H2 as more important than H3, but semantically these are subsections.

### 4.4 Bioprocessing — H2 Overload (24 H2s)

```
H1: Bioprocessing Solutions
├── H2: Supporting diverse modalities       ← Section heading
├── H2: Antibody-Drug Conjugates           ← Card title (should be H3)
├── H2: Cell Therapy                        ← Card title
├── H2: Gene Therapy                        ← Card title
├── H2: Monoclonal antibodies              ← Card title
├── H2: Messenger RNA (mRNA)               ← Card title
├── H2: Vaccines                            ← Card title
├── H2: Bioprocessing solutions designed... ← Section heading
├── H2: Bioreactors                         ← Card title
├── H2: Cell Culture Products              ← Card title
├── H2: Cell Therapy Products              ← Card title
├── H2: cGMP Chemicals                     ← Card title
├── H2: Chromatography and Purification    ← Card title
├── H2: Fluid Management                   ← Card title
├── H2: Filtration and Separation          ← Card title
├── H2: Pharmaceutical Analytics           ← Card title
├── H2: Single-Use Bioprocessing           ← Card title
├── H2: Technical services                  ← Redundant with next
├── H2: Strengthen your workflow...         ← Same topic as above
├── H2: Customers we serve                  ← Redundant with next
├── H2: Supporting biopharma, biotech...    ← Same topic as above
├── H2: Why choose us?                      ← Redundant with next
├── H2: Built on scale, supply...           ← Same topic as above
├── H2: Resources                           ← Section heading
│   ├── H3: Bioprocessing Blogs
│   ├── H3: Events and webinars
│   ├── H3: Bioprocessing resources
│   └── H3: Contact us
```

**Problems:**
- 24 H2s flattens the entire page — Google can't distinguish sections from items
- Card titles (ADCs, Cell Therapy, etc.) should be H3 under their parent section H2
- Duplicate semantic pairs: "Technical services" / "Strengthen your workflow" say the same thing

---

## 5. Image SEO Issues

### 5.1 Antibodies Page — 40% Missing Alt Text

| Stat | Count |
|---|---|
| Total images | 30 |
| Missing alt attribute | 12 |
| With alt text | 18 |
| Lazy loaded | 19 |

Missing alts include category thumbnails, decorative icons, and application images that should have descriptive text for both accessibility and image search.

### 5.2 Chemicals Page — 14% Missing Alt Text

| Stat | Count |
|---|---|
| Total images | 37 |
| Missing alt attribute | 5 |
| With alt text | 32 |
| Lazy loaded | 24 |

### 5.3 Homepage — Poor Lazy Loading

| Stat | Count |
|---|---|
| Total images | 55 |
| Missing alt attribute | 0 |
| Lazy loaded | 5 (9%) |

91% of homepage images load eagerly — including below-fold content. Severe unnecessary bandwidth and LCP impact.

### 5.4 Bioprocessing — Exemplary

| Stat | Count |
|---|---|
| Total images | 40 |
| Missing alt attribute | 0 |
| With descriptive alt | 40 |
| Lazy loaded | 28 (70%) |

This page demonstrates best practices — 100% alt text coverage with descriptive values and good lazy loading adoption.

---

## 6. Link Issues

### 6.1 Links Without Accessible Text

Links that have no visible text AND no img with alt inside them:

| Page | Count | Example |
|---|---|---|
| Homepage | 17 | Promo banner links wrapping only images |
| Antibodies | 4 | Icon-only links |
| Chemicals | 7 | Category card wrapper links |
| Bioprocessing | 7 | Application card wrapper links |

**Impact:** Screen readers announce "link" with no description. Google can't determine link purpose.

### 6.2 Non-Crawlable Links

Every page has exactly 2 `javascript:void(0)` links:
1. Cart icon in header
2. "Report a Site Issue" in footer

**Impact:** These are invisible to Googlebot. The cart should use a proper URL; the feedback link should use a button element.

---

## 7. Technical Issues

### 7.1 Mixed Content (HTTP on HTTPS)

**Pages affected:** Chemicals, Bioprocessing

Browser console shows mixed content warnings — HTTP resources being loaded on HTTPS pages. Modern browsers may block these resources, and Google may flag the page as partially insecure.

### 7.2 JavaScript Errors

All pages show console errors:
- `Cannot read properties of undefined (reading 'quotaExceeded')` — storage quota check failing
- `Identifier 'domain_list' has already been declared` — duplicate variable declaration

These indicate broken runtime that may prevent proper structured data injection or analytics firing.

### 7.3 Hidden "Access Denied" H1 (Antibodies)

A hidden `<h1>Access Denied</h1>` exists in the DOM on the antibodies page — likely from a failed dynamic content fetch. Googlebot renders pages and may see this as the primary heading, potentially impacting relevance signals.

### 7.4 Content Typo

Chemicals page: "Organometalics and Solvents Organometalloids" — should be "Organometallics and Organometalloids" (missing 'l' + incorrect "Solvents" insertion).

---

## 8. What's Working Well

| Aspect | Assessment |
|---|---|
| **Title tags** | Unique, keyword-rich, consistent `{Topic} \| Thermo Fisher Scientific - US` format |
| **Meta descriptions** | Well-crafted, appropriate length (150–200 chars), keyword-inclusive |
| **Canonical URLs** | Self-referencing, correctly set on all pages |
| **Hreflang implementation** | Complete 39-locale coverage on every page — rare to see this done correctly |
| **OG images** | Custom per-page images (except homepage which is broken) |
| **Category page H1s** | Present, descriptive, keyword-targeted |
| **Homepage structured data** | WebSite + SearchAction, Organization, ItemList/BlogPosting |
| **Bioprocessing alt text** | 100% coverage with descriptive values — model for other pages |
| **Lazy loading adoption** | 60–70% on category pages (good, could be higher) |

---

## 9. Priority Recommendations

### P0 — Fix During Migration (Blocking)

| # | Fix | Impact | Effort |
|---|---|---|---|
| 1 | Add H1 to homepage | Primary ranking signal restored | Trivial |
| 2 | Remove `user-scalable=0` globally | Accessibility compliance + mobile ranking | Trivial |
| 3 | Add BreadcrumbList JSON-LD to all category pages | Rich snippets in SERP | Low (auto-generate from breadcrumb block) |
| 4 | Fix heading hierarchy (H2 card titles → H3) | Proper document outline for crawlers | Medium (template-level) |
| 5 | Remove empty heading tags | Clean document outline | Medium |

### P1 — Fix During Migration (Important)

| # | Fix | Impact | Effort |
|---|---|---|---|
| 6 | Add alt text to all images (Antibodies: 12, Chemicals: 5) | Accessibility + image search | Low |
| 7 | Fix OG image on homepage (currently just domain URL) | Social sharing previews | Trivial |
| 8 | Remove hidden "Access Denied" H1 | Prevent mis-indexing | Low |
| 9 | Fix mixed content (HTTP → HTTPS) | Security indicators, resource loading | Low |
| 10 | Increase lazy loading on homepage (currently 9%) | LCP improvement | Low (EDS handles automatically) |

### P2 — Fix During Migration (Nice to Have)

| # | Fix | Impact | Effort |
|---|---|---|---|
| 11 | Replace `javascript:void(0)` with proper elements | Crawlability + accessibility | Low |
| 12 | Add accessible text to image-only links | Screen reader UX + link equity | Low |
| 13 | Fix content typo ("Organometalics") | Professionalism | Trivial |
| 14 | Remove duplicate/redundant heading pairs (Bioprocessing) | Cleaner outline | Low |
| 15 | Add ItemList schema for product categories | Enhanced SERP display | Medium |

---

## 10. EDS Migration Auto-Fixes

The following issues are automatically resolved by migrating to Edge Delivery Services:

| Current Problem | EDS Solution |
|---|---|
| 111 resource requests | EDS: 5–10 resources at LCP |
| 31 JavaScript files (jQuery, jQuery Migrate) | EDS: 2 first-party JS files, zero dependencies |
| Poor lazy loading (9% homepage) | EDS auto-lazy-loads all below-fold images |
| `user-scalable=0` in viewport | EDS default viewport doesn't restrict zoom |
| Render-blocking CSS (12 files) | EDS: 1 critical CSS file + lazy-styles.css |
| Mixed content warnings | EDS serves everything over HTTPS by default |
| Empty heading tags from AEM components | EDS blocks render clean semantic HTML |
| Flat H2 hierarchy from parsys | EDS section/block model enforces proper nesting |

---

## 11. Baseline Metrics for Post-Migration Comparison

| Metric | Homepage | Antibodies | Chemicals | Bioprocessing |
|---|---|---|---|---|
| Title | Thermo Fisher Scientific - US | Antibodies \| TFS - US | Lab Chemicals \| TFS - US | Bioprocessing Solutions \| TFS - US |
| Description length | 159 chars | 161 chars | 199 chars | 191 chars |
| H1 count | 0 | 2 (1 hidden) | 1 | 1 |
| H2 count | 4 | 16 (7 empty) | 18 (4 empty) | 24 |
| H3 count | 0 | 0 | 3 | 4 |
| JSON-LD count | 3 | 0 | 0 | 0 |
| Hreflang count | 39 | 39 | 39 | 39 |
| Total images | 55 | 30 | 37 | 40 |
| Images without alt | 0 | 12 | 5 | 0 |
| Total links | 192 | 140 | 149 | 165 |
| Network requests | 111 | 82 | 72 | 69 |

These baselines should be compared against post-migration crawl data to verify zero regression.
