# Solution Design Document — Introduction

## 1. Project Introduction

### 1.1 Overview

Thermo Fisher Scientific is undertaking a strategic migration of its web experience platform from **AEM 6.4 (on-premise)** to **AEM Edge Delivery Services (EDS)** with **Document Authoring (DA)** as the primary content authoring interface.

This Solution Design Document (SDD) defines the technical architecture, block library design, integration patterns, and migration strategy for delivering the Thermo Fisher US site (`thermofisher.com/us/en/`) on EDS with DA authoring at `da.live`.

### 1.2 Business Context

- **Current State:** The existing site runs on AEM 6.4 with traditional Touch UI authoring, JCR-based content repository, component dialogs, and Style System variants.
- **Target State:** AEM Edge Delivery Services with Document Authoring (DA) — a performance-first, document-based content platform that serves pages from a global edge CDN with sub-second load times.
- **Business Drivers:**
  - Achieve Lighthouse 100 performance scores (LCP, CLS, INP)
  - Simplify content authoring experience — from complex component dialogs to intuitive document editing
  - Reduce time-to-publish and accelerate content velocity
  - Improve SEO rankings through Web Vitals optimization
  - Modernize the technology stack with cloud-native, low-maintenance infrastructure

### 1.3 Authoring Model

The project adopts **Document Authoring (DA)** as the authoring interface:

- Authors work in a web-based document editor at **da.live** (similar to a simplified word processor)
- Content is structured as text, tables, images, and links
- Blocks (components) are authored as **tables** — the table header names the block, rows contain the content
- Variants are specified in the block name using parentheses, e.g., `Accordion (icon-left)`
- Complex nested content is handled via the **fragment reference pattern** — linking to separate fragment pages
- No component dialogs, no JCR, no Touch UI

### 1.4 Key Technology Stack

| Layer | Technology |
|---|---|
| Authoring | Adobe Document Authoring (DA) at da.live |
| Delivery | AEM Edge Delivery Services (EDS) — global edge CDN |
| Code | Vanilla JavaScript (ES6+), CSS3, no build step, no frameworks |
| Content Storage | DA-managed documents (HTML-based structure) |
| Repository | GitHub (code sync with EDS) |
| Preview | `.aem.page` URLs / localhost dev server |
| Production | `.aem.live` URLs |
| Forms | EDS Forms (rule editor, validations, reCAPTCHA) |
| Analytics | Data Layer integration (Adobe Analytics / Target) |
| Video | Brightcove integration |
| Assets | AEM Assets / DA-managed media |

---

## 2. In Scope

### 2.1 Sites & Content

| Item | Description |
|---|---|
| Region | CUSA (US English site — `thermofisher.com/us/en/`) |
| Page Types | Explore/Landing Pages, Product Detail Pages (PDP), Category Pages, Resource/Education Pages |
| Content Migration | Phased migration of existing AEM 6.4 pages to EDS/DA format |
| Templates | Page patterns defined via metadata, section structure, and implementation rules |
| Navigation | Header, Footer, Sub-navigation, Breadcrumb — auto-generated from site hierarchy |

### 2.2 Block Library (Components)

The following blocks are in scope for design and implementation:

| Block | Complexity | Notes |
|---|---|---|
| Accordion | Medium | 4 variants; supports fragment reference for complex content |
| Tabs | Medium | Tab container with repeatable panels |
| Hero | Medium | 6 variants; foreground image, gradient overlay, image focal center |
| Text and Image (Cards) | Medium | Multiple card layouts |
| CTA | Low | Call-to-action buttons and links |
| Breadcrumb | Low | Auto-generated from navigation hierarchy |
| Anchor List | Low | In-page jump links |
| Columns | Low | Multi-column layouts (2-col, 3-col, etc.) |
| Custom Table | Medium | Styled data tables |
| Sub Navigation | Medium | Section-level navigation |
| Basic Table | Low | Simple HTML tables |
| Testimonial | Medium | Customer quotes/testimonials |
| Embed | Low | Third-party embeds (iframes, scripts) |
| Immersive | High | Full-page interactive experiences |
| PDP Document Display | High | Product specification documents |
| Carousel | Medium | Image/content carousels |
| Product Selection Guide | High | Interactive product selection tool |
| Featured Collection | Medium | Curated product collections |
| Media Formulation | High | Scientific media formulation tool |
| Product List | High | Dynamic product listing |
| Video / Video Playlist | Medium | Brightcove video integration |
| Dynamic Merchandising Offer | High | Personalized promotional content |
| Header & Footer | Medium | Global navigation shell |

### 2.3 Forms

| Item | Description |
|---|---|
| Form Authoring in DA/EDS | EDS-native form blocks with spreadsheet-based field definitions |
| Rule Editor & Validations | Conditional logic, field validations, show/hide rules |
| Request a Quote Form | Complex multi-step form with dynamic fields |
| Dynamic Dropdown / Cascading Options | API-driven dependent dropdowns |
| reCAPTCHA | Bot protection integration |
| Form Rendering & Submission | Client-side rendering, server-side submission, document upload |

### 2.4 Integrations

| Integration | Description |
|---|---|
| Content Syndication — PDP | Product data integration with Product Detail Pages |
| Brightcove | Video hosting and streaming integration |
| Data Layer & Analytics | Adobe Analytics / Adobe Target integration |
| Forms Backend | Form submission endpoints and processing |

### 2.5 Non-Functional Requirements

| Area | Description |
|---|---|
| SEO | Web Vitals optimization, structured data, redirect management |
| Performance | Lighthouse 100 target; LCP < 2.5s, CLS < 0.1, INP < 200ms |
| Accessibility | WCAG 2.1 AA compliance |
| Browsers | Latest Chrome, Edge, Safari, Firefox (no IE support) |
| Devices | Mobile, Tablet, Desktop |
| Viewports | Mobile (<768px), Tablet (768px–1199px), Desktop (≥1200px) |
| Backup & Recovery | DA content versioning and rollback capabilities |

### 2.6 Migration

| Item | Description |
|---|---|
| Migration Strategy | Phased migration of content pages from AEM 6.4 to DA/EDS |
| Forms Migration | Conversion of AEM Forms to EDS Form blocks |
| Redirect Management | URL redirect strategy for migrated pages |
| Content Mapping | AEM 6.4 component → EDS block mapping |

---

## 3. Out of Scope

| Item | Rationale |
|---|---|
| **MSM / Multi-Site Manager** | Not addressed in this phase; translation and multi-region management to be handled separately |
| **Translations / i18n** | Language variants and localized content outside CUSA region are not in scope |
| **Experience Fragments migration** | Replaced by DA fragment reference pattern; legacy XF migration is out of scope |
| **AEM Assets migration** | Enterprise DAM strategy and bulk asset migration handled separately |
| **Workflows** | Content approval workflows are acknowledged but design deferred to a later phase |
| **User Groups & Permissions** | Permission model design acknowledged but not fully detailed in this SDD |
| **Internet Explorer support** | IE is end-of-life and not supported |
| **Non-US regions** | CCI, CBR, LATAM, EMEA — to be addressed in subsequent phases |
| **AEM as a Cloud Service migration** | This project targets EDS/DA, not AEMaaCS Author environment |
| **Custom search implementation** | Search functionality relies on existing infrastructure or third-party tools |
| **E-commerce / cart integration** | Store and transactional features outside scope of this SDD |
| **Cutover & coexistence strategy** | Phased parallel run, go-live sequencing, and rollback plan to be defined in a separate cutover plan |

---

## 4. Open Decisions

| # | Decision | Options | Impact | Owner | Target Date |
|---|---|---|---|---|---|
| 1 | **Configuration mapping in DA** | (a) Spreadsheet-based config (b) JSON config files in repo (c) Metadata block pattern | Affects how global settings, feature flags, and shared config are managed | Architecture | TBD |
| 2 | **Governance & Preflight checks** | (a) Cloud Manager Experience Audit only (b) Custom EDS preflight + Lighthouse (c) Automated PR checks | Determines quality gates before publish | DevOps / QA | TBD |
| 3 | **Analytics & Target integration pattern** | (a) EDS data layer + Launch (b) Direct alloy.js integration (c) Custom martech loading in delayed.js | Impacts performance and tag management | Analytics Team | TBD |
| 4 | **Templates & Page Properties in DA** | (a) Metadata block only (b) Metadata + spreadsheet-driven templates (c) Implementation-enforced structure | Affects author guardrails and page consistency | Content Architecture | TBD |
| 5 | **Asset management model** | (a) DA-managed media only (b) AEM Assets as DAM + DA authoring (c) Hybrid with CDN origin | Determines enterprise asset governance | Digital Asset Team | TBD |
| 6 | **Multi-site / Translation approach** | (a) Separate DA folders per locale (b) MSM-equivalent via code (c) External TMS integration | Impacts future internationalization | Globalization | TBD |
| 7 | **Form submission backend** | (a) Adobe-managed submission endpoint (b) Custom API middleware (c) Direct third-party integration | Affects data routing and processing | Integration Team | TBD |
| 8 | **Cutover & rollback strategy** | (a) Big-bang cutover (b) Phased parallel run by section (c) Traffic-based progressive rollout | Risk profile and rollback capabilities | Program Management | TBD |
| 9 | **CI quality gates & test strategy** | (a) Lighthouse + lint only (b) Full Playwright E2E + visual regression (c) Lighthouse + unit tests + accessibility audit | Test coverage vs. velocity tradeoff | QA / DevOps | TBD |

---

## 5. Assumptions

### 5.1 Platform & Infrastructure

| # | Assumption |
|---|---|
| A1 | AEM Edge Delivery Services (EDS) is the approved delivery platform for the US site. |
| A2 | Document Authoring (DA) at da.live is the primary authoring interface — Universal Editor (UE/xwalk) is not in scope. |
| A3 | The EDS CDN (Adobe-managed) will be used for content delivery; a BYO CDN pattern may be applied if required. |
| A4 | GitHub is the code repository with automatic code sync to EDS on push. |
| A5 | The existing AEM 6.4 instance will continue to serve pages not yet migrated (coexistence period). |

### 5.2 Content & Authoring

| # | Assumption |
|---|---|
| A6 | Authors will be trained on DA/EDS authoring model (table-based block authoring, variants in header rows, fragment references). |
| A7 | Content migration will be phased — not all pages migrate at once. Priority pages will be identified by business stakeholders. |
| A8 | The H1 heading on pages is authored as default content above block tables, not inside blocks. |
| A9 | Breadcrumbs are auto-generated from site navigation hierarchy and not manually authored per page. |
| A10 | Fragment pages (for complex nested content in accordions, tabs, etc.) are authored as separate DA documents in a `/fragments/` path convention. |

### 5.3 Performance & Quality

| # | Assumption |
|---|---|
| A11 | The target is Lighthouse 100 on all Core Web Vitals (LCP < 2.5s, CLS < 0.1, INP < 200ms). |
| A12 | EDS best practices ("keeping it 100") will be followed for all block implementations — no heavy frameworks, no build steps, minimal JS. |
| A13 | Third-party scripts (analytics, martech, chat) will be loaded in `delayed.js` to avoid impacting LCP. |
| A14 | Images uploaded by authors are automatically optimized by EDS; assets committed to git must be optimized manually. |

### 5.4 Integrations

| # | Assumption |
|---|---|
| A15 | Brightcove is the approved video platform; video embed integration patterns will be standardized. |
| A16 | Product data for PDPs is syndicated from an existing product API / content source — the API contract will be provided by the PDP team. |
| A17 | Form submission endpoints and business logic are provided by the backend/integration team. |
| A18 | Adobe Analytics / Target integration will use a data layer approach compatible with EDS performance requirements. |

### 5.5 Migration

| # | Assumption |
|---|---|
| A19 | A content mapping from AEM 6.4 components to EDS blocks is agreed upon before migration begins. |
| A20 | URL structure and redirect strategy are defined collaboratively with SEO and engineering teams. |
| A21 | Historical content that is no longer active/relevant will be identified for archival rather than migration. |
| A22 | KPI baselines will be captured before migration using Page Insights / Lighthouse to enable before/after comparison. |

### 5.6 Team & Process

| # | Assumption |
|---|---|
| A23 | The development team has access to the GitHub repository with appropriate branch protection and review processes. |
| A24 | Code changes follow the EDS publishing process: feature branch → PR with preview URL → review → merge to main. |
| A25 | Content authors, developers, and QA have access to the DA environment (da.live) and EDS preview/live URLs. |
| A26 | Deepti and team members using AEM Coder are producing block specifications following the agreed DA spec template format. |

---

## 6. Risks & Dependencies

| # | Risk / Dependency | Mitigation |
|---|---|---|
| R1 | Complex AEM 6.4 components may not map cleanly to EDS blocks | Fragment reference pattern and custom block implementations to handle complex cases |
| R2 | Author adoption — DA authoring is a significant shift from Touch UI | Training program, sample pages, and clear authoring guides per block |
| R3 | Third-party script performance impact | Strict delayed loading policy; martech loaded in `delayed.js` only |
| R4 | Product data API availability for PDPs | Early engagement with PDP team; stub data for development |
| R5 | Migration volume — 326-page SDD indicates significant scope | Phased approach with priority-based migration waves |
| R6 | Open decisions (Section 4) blocking development | Timebox decisions; proceed with recommended defaults and adjust |
