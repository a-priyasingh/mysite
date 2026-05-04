---
title: "SEO & Schema Parity — Target State Design"
subtitle: "AEM 6.4 to AEM as a Cloud Service (Edge Delivery Services) Migration"
date: "May 4, 2026"
author:
  - name: "Adobe Professional Services"
    affiliation: "Edge Delivery Services"
---

# SEO & Schema Parity — Target State Design

## 1. Executive Summary

This section defines the SEO parity strategy for migrating thermofisher.com from AEM 6.4 to AEM as a Cloud Service with Edge Delivery Services (Universal Editor). It ensures zero regression in search visibility, structured data richness, and metadata completeness during and after migration.

---

## 2. Schema.org Structured Data Inventory (Source State)

### 2.1 Schema Types Identified on Current Site

| Schema Type | Page Type | Implementation | Example Page |
|---|---|---|---|
| `WebSite` + `SearchAction` | Homepage | JSON-LD | `/us/en/home.html` |
| `Organization` | Homepage | JSON-LD | `/us/en/home.html` |
| `ItemList` > `BlogPosting` | Homepage (blog feed) | JSON-LD | `/us/en/home.html` |
| `BreadcrumbList` | Category/L2+ pages | HTML markup (visible breadcrumb) | `/us/en/home/life-science/pcr.html` |
| `Product` | Product detail pages | JSON-LD (expected) | `/order/catalog/product/*` |
| `FAQPage` | Support/FAQ pages | JSON-LD (expected) | FAQ/support pages |

### 2.2 Detailed Schema Definitions

#### WebSite (Homepage)
```json
{
  "@context": "http://schema.org",
  "@type": "WebSite",
  "url": "https://www.thermofisher.com/",
  "name": "Thermo Fisher Scientific",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.thermofisher.com/search/results?query={search_term_string}&resultPage=1&resultsPerPage=15&autocomplete=",
    "query-input": "required name=search_term_string"
  }
}
```

#### Organization (Homepage)
```json
{
  "@context": "http://schema.org",
  "@type": "Organization",
  "name": "Thermo Fisher Scientific",
  "url": "https://www.thermofisher.com/",
  "sameAs": [
    "https://twitter.com/thermofisher",
    "https://www.facebook.com/thermofisher",
    "https://plus.google.com/+thermofisher",
    "https://www.linkedin.com/company/thermo-fisher-scientific",
    "https://www.youtube.com/channel/UCfUs2fCDhx07fkszsJ0jOcA"
  ],
  "description": "Thermo Fisher Scientific is an American multinational, biotechnology product development company...",
  "logo": "https://www.thermofisher.com/logo.jpg",
  "telephone": "+1-800-711-2088",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "5823 Newton Drive",
    "addressLocality": "Carlsbad",
    "addressRegion": "CA",
    "postalCode": "92008"
  }
}
```

#### ItemList > BlogPosting (Homepage)
```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "BlogPosting",
        "headline": "...",
        "url": "https://www.thermofisher.com/blog/...",
        "datePublished": "2026-05-04T00:00:00+00:00",
        "image": { "@type": "ImageObject", "url": "..." },
        "author": { "@type": "Person", "name": "..." }
      }
    }
  ]
}
```

---

## 3. Metadata Inventory (Source State)

### 3.1 Standard Meta Tags

| Meta Tag | Present On | Example Value | Required in Target |
|---|---|---|---|
| `<title>` | All pages | `Polymerase Chain Reaction (PCR) \| Thermo Fisher Scientific - US` | Yes |
| `meta[name="description"]` | All pages | Page-specific description (150–200 chars) | Yes |
| `meta[name="robots"]` | All pages | `index,follow` | Yes |
| `meta[name="viewport"]` | All pages | `width=device-width, initial-scale=1.0...` | Yes (EDS default) |
| `meta[name="DC.title"]` | All pages | Dublin Core title | Yes (legacy parity) |

### 3.2 Open Graph Protocol

| Property | Present On | Example | Required in Target |
|---|---|---|---|
| `og:title` | All pages | Matches `<title>` | Yes |
| `og:type` | All pages | `website` | Yes |
| `og:url` | All pages | Canonical URL | Yes |
| `og:description` | All pages | Matches meta description | Yes |
| `og:locale` | All pages | `en_US` | Yes |
| `og:image` | All pages | Brand image or page-specific | Yes |

### 3.3 Search Engine Verification Tags

| Tag | Purpose | Value |
|---|---|---|
| `baidu-site-verification` | Baidu Webmaster Tools | `codeva-AlvwygfY0A` |
| `sogou_site_verification` | Sogou Search | `wdyDZ0DQ8G` |

### 3.4 Link Elements

| Element | Purpose | Count/Scope |
|---|---|---|
| `<link rel="canonical">` | Canonical URL declaration | All pages |
| `<link rel="alternate" hreflang="...">` | International targeting | 39 locales per page |
| `<link rel="dns-prefetch">` | Performance hint | `downloads.thermofisher.com`, `assets.adobedtm.com`, etc. |
| `<link rel="preconnect">` | Performance hint | `assets.adobedtm.com`, `edge.adobedc.net`, `dm-images.thermofisher.com` |

---

## 4. Hreflang Coverage (39 Locales)

| Locale | Country/Language | URL Pattern |
|---|---|---|
| `en-us` | United States / English | `thermofisher.com/us/en/` |
| `es-es` | Spain / Spanish | `thermofisher.com/es/es/` |
| `fr-fr` | France / French | `thermofisher.com/fr/fr/` |
| `de-de` | Germany / German | `thermofisher.com/de/de/` |
| `ja-jp` | Japan / Japanese | `thermofisher.com/jp/ja/` |
| `ko-kr` | Korea / Korean | `thermofisher.com/kr/ko/` |
| `zh-cn` | China / Chinese | `thermofisher.cn/cn/zh/` |
| `zh-tw` | Taiwan / Chinese | `thermofisher.com/tw/zt/` |
| `pt-br` | Brazil / Portuguese | `thermofisher.com/br/pt/` |
| `ru-ru` | Russia / Russian | `thermofisher.com/ru/ru/` |
| ... | (29 additional locales) | Same pattern |

---

## 5. Target State Generation Strategy (EDS / Universal Editor)

### 5.1 Metadata Generation Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Content Authoring                     │
│           (Universal Editor / Document)                  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Metadata Block (authored per page)                     │
│  ┌─────────────────────────────────────────────────┐   │
│  │ Title          │ {Page Title} | TFS - {Country} │   │
│  │ Description    │ {150-200 char description}      │   │
│  │ Image          │ {OG image URL}                  │   │
│  │ Robots         │ index,follow                    │   │
│  │ Template       │ {page-template-name}            │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                  head.html (Global)                      │
│  • Verification meta tags (Baidu, Sogou)                │
│  • Preconnect / dns-prefetch hints                      │
│  • Viewport meta                                        │
├─────────────────────────────────────────────────────────┤
│               scripts.js (Runtime)                       │
│  • Canonical URL generation (auto from path)            │
│  • Hreflang tag injection (from locale config)          │
│  • OG tag enrichment (from metadata block)              │
│  • JSON-LD injection (from page type + metadata)        │
├─────────────────────────────────────────────────────────┤
│              Edge Delivery Services                      │
│  • Automatic <title> from metadata block                │
│  • Automatic meta description from metadata block       │
│  • Automatic og:* from metadata block                   │
│  • head.html merged into every page <head>              │
└─────────────────────────────────────────────────────────┘
```

### 5.2 Structured Data Generation Strategy

| Schema Type | Generation Method | Trigger |
|---|---|---|
| **WebSite + SearchAction** | Static JSON-LD in `head.html` (homepage only) or conditional injection in `scripts.js` | Homepage template |
| **Organization** | Static JSON-LD in `head.html` (homepage only) or global footer script | Homepage template |
| **BreadcrumbList** | Auto-generated by breadcrumb block from URL path + page titles | Breadcrumb block present on page |
| **ItemList > BlogPosting** | Dynamic JSON-LD generated from blog feed data | Homepage blog section |
| **Product** | JSON-LD generated from product data API/metadata | Product detail template |
| **FAQPage** | Auto-generated from FAQ/accordion block content | FAQ block present on page |

### 5.3 Canonical URL Strategy

| Scenario | Rule |
|---|---|
| Standard pages | Auto-generate from `window.location` path (strip query params, trailing slash normalization) |
| Paginated content | Add `?page=N` to canonical |
| Locale variants | Canonical points to self; hreflang handles alternates |
| Duplicate content | Author specifies canonical override in metadata block |

### 5.4 Hreflang Generation Strategy

**Approach:** Configuration-driven injection at runtime via a locale mapping spreadsheet.

```
/locale-config.json (authored in spreadsheet)
┌──────────┬──────────────┬──────────────────────────────────┐
│ hreflang │ country-code │ base-url                         │
├──────────┼──────────────┼──────────────────────────────────┤
│ en-us    │ us           │ https://www.thermofisher.com/us/en│
│ fr-fr    │ fr           │ https://www.thermofisher.com/fr/fr│
│ zh-cn    │ cn           │ https://www.thermofisher.cn/cn/zh │
│ ...      │ ...          │ ...                              │
└──────────┴──────────────┴──────────────────────────────────┘
```

**Runtime logic (`scripts.js` or `delayed.js`):**
1. Fetch locale config on page load
2. For each locale, construct the alternate URL by replacing country/language segments
3. Inject `<link rel="alternate" hreflang="...">` tags into `<head>`
4. Include `x-default` pointing to the US English variant

### 5.5 Metadata Block Mapping (Source → Target)

| Source (AEM 6.4 JCR) | Target (EDS Metadata Block) | Notes |
|---|---|---|
| `jcr:title` / `pageTitle` | Metadata → Title | Auto-appended with ` \| Thermo Fisher Scientific - {Country}` |
| `jcr:description` | Metadata → Description | 150–200 chars, keyword-rich |
| `cq:tags` | Metadata → Tags | Taxonomy mapping required |
| `navTitle` | Used for breadcrumb trail | Fetched via page title resolution |
| `hideInNav` | Metadata → Hide in Nav | Boolean |
| `noIndex` | Metadata → Robots | Outputs `noindex,follow` |
| `og:image` (custom property) | Metadata → Image | Default fallback to brand OG image |
| `canonicalUrl` (if override) | Metadata → Canonical | Only when different from self |

---

## 6. Validation & Regression Checks

### 6.1 Automated Pre-Migration Baseline

| Check | Tool | Frequency | Output |
|---|---|---|---|
| Crawl full site metadata | Screaming Frog / Sitebulb | Once (before migration) | Baseline CSV of all titles, descriptions, canonicals, robots |
| Schema.org validation | Google Rich Results Test API | Once per template type | Baseline structured data per page type |
| Hreflang audit | Screaming Frog hreflang report | Once (before migration) | Full locale mapping verification |
| Core Web Vitals baseline | PageSpeed Insights / CrUX | Once (before migration) | LCP, CLS, INP baselines |

### 6.2 Post-Migration Regression Test Suite

| # | Test | Expected Result | Pass Criteria | Tool |
|---|---|---|---|---|
| 1 | **Title tag parity** | Every migrated page has matching `<title>` | 100% match or approved deviation | Crawl comparison |
| 2 | **Meta description parity** | Every migrated page has description present | 100% present, >95% match | Crawl comparison |
| 3 | **Canonical URL correctness** | Self-referencing canonical on all pages | 0 broken/missing canonicals | Crawl audit |
| 4 | **Robots directives** | `index,follow` or author-specified `noindex` | 0 unintended noindex | Crawl comparison |
| 5 | **OG tag completeness** | og:title, og:description, og:url, og:image on all pages | 100% presence | Crawl audit |
| 6 | **Hreflang count** | 39 hreflang tags per page (matching source) | Count match ±0 | Crawl audit |
| 7 | **Hreflang reciprocity** | All hreflang links are reciprocal | 0 orphaned hreflangs | Screaming Frog |
| 8 | **JSON-LD WebSite schema** | Present on homepage with SearchAction | Valid per Rich Results Test | Google Rich Results Test |
| 9 | **JSON-LD Organization schema** | Present on homepage with sameAs, logo, address | Valid per Rich Results Test | Google Rich Results Test |
| 10 | **JSON-LD BreadcrumbList** | Present on L2+ category pages | Valid hierarchical structure | Google Rich Results Test |
| 11 | **JSON-LD BlogPosting** | Present on homepage (or blog pages) | Valid per Rich Results Test | Google Rich Results Test |
| 12 | **Breadcrumb path accuracy** | Breadcrumb matches URL hierarchy | Path segments resolve to correct titles | Visual + crawl check |
| 13 | **Sitemap.xml generation** | Sitemap generated from EDS page index | All published pages included, valid XML | XML validator + compare |
| 14 | **robots.txt correctness** | Correct disallow/allow rules | Matches source robots.txt directives | Manual review |
| 15 | **HTTP status codes** | Migrated URLs return 200; old URLs 301 to new | 0 unexpected 404s | Crawl audit |
| 16 | **301 redirect mapping** | All old URLs redirect to correct new URLs | 100% coverage for indexed pages | Redirect test script |
| 17 | **Page load performance** | CWV scores ≥90 (PageSpeed) | No regression from baseline | PageSpeed Insights |
| 18 | **Search Console indexing** | No indexing errors post-migration | 0 new errors within 30 days | Google Search Console |

### 6.3 Continuous Monitoring (Post-Go-Live)

| Metric | Monitoring Tool | Alert Threshold |
|---|---|---|
| Indexed pages count | Google Search Console | Drop >5% week-over-week |
| Rich results count | Google Search Console | Any decrease |
| Crawl errors | Google Search Console | New errors >0 |
| Core Web Vitals | CrUX Dashboard | Any metric failing threshold |
| Organic traffic | Adobe Analytics / GA4 | Drop >10% vs. pre-migration baseline |
| Ranking positions | SEMrush / Ahrefs | Average position increase >3 |

### 6.4 Migration Testing Phases

```
Phase 1: Template Validation (Pre-Migration)
├── Validate metadata block rendering for each template type
├── Validate JSON-LD output per schema type
├── Validate hreflang injection logic
└── Run Google Rich Results Test on preview URLs

Phase 2: Batch Migration QA (During Migration)
├── Compare crawl of migrated batch vs. source baseline
├── Flag any missing titles, descriptions, canonicals
├── Validate redirect mapping for batch
└── Spot-check structured data on sample pages per template

Phase 3: Full-Site Regression (Post-Migration, Pre-Go-Live)
├── Full crawl comparison (source vs. target)
├── Hreflang reciprocity audit
├── Redirect chain validation (no chains >1 hop)
├── Performance regression test (LCP, CLS, INP)
└── Stakeholder sign-off on SEO dashboard

Phase 4: Post-Go-Live Monitoring (30/60/90 days)
├── Daily: Crawl errors, indexing status
├── Weekly: Organic traffic, ranking positions
├── Monthly: Rich results, Core Web Vitals
└── Quarterly: Full SEO health audit
```

---

## 7. Risk Mitigations

| Risk | Mitigation |
|---|---|
| Hreflang tags missing on EDS pages | Runtime injection validated via automated tests; fallback to `head.html` static tags |
| JSON-LD schema breaks on content changes | Schema templates tied to page templates; content changes don't affect schema structure |
| Redirect loops or chains | Redirect map validated pre-go-live; monitoring for chains >1 hop |
| Loss of indexed pages | Phased migration with overlap period; Search Console monitoring; rapid rollback plan |
| Duplicate content (old + new coexisting) | Canonical tags always point to target; robots.txt blocks old paths after cutover |
| Metadata author errors | Validation rules in Universal Editor; required fields enforced; preview shows rendered SEO |

---

## 8. Deliverables Checklist

| # | Deliverable | Owner | Status |
|---|---|---|---|
| 1 | Pre-migration crawl baseline (titles, descriptions, canonicals, schemas) | SEO Lead | Pending |
| 2 | Hreflang locale configuration spreadsheet | SEO Lead + i18n | Pending |
| 3 | Redirect mapping (old URLs → new URLs) | SEO Lead + Dev | Pending |
| 4 | JSON-LD schema templates (per page type) | Dev | Pending |
| 5 | head.html with global SEO elements | Dev | Pending |
| 6 | Metadata block authoring guide for content authors | Content Lead | Pending |
| 7 | Automated regression test scripts | QA/Dev | Pending |
| 8 | Post-go-live monitoring dashboard | SEO Lead | Pending |
| 9 | Rollback playbook (if SEO regression detected) | DevOps | Pending |
