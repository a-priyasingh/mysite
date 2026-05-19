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

The project adopts **Document Authoring (DA)** as the content management interface, replacing traditional AEM Touch UI with a streamlined, document-based authoring experience.

- Authors create and manage content through a web-based editor at **da.live**, offering a simplified word-processor-like experience with no component dialogs, JCR nodes, or Touch UI interactions.
- Content is structured as text, headings, images, links, and block tables — where each table represents a component (block) with the header row identifying the block type and rows providing the content.
- Block variants are specified inline using parentheses in the block name (e.g., `Accordion (icon-left)`), replacing the AEM Style System dropdown.
- Complex or nested content that cannot be represented within a single table cell is handled via the **fragment reference pattern** — authors link to separately authored fragment pages whose content is rendered inline at delivery time.

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

- Migration of **thermofisher.com** from on-premise AEM (hosted on AWS) to **AEM Edge Delivery Services** with **Document Authoring (DA)**.
- DA authoring model design — block table structures, variant naming conventions, section patterns, and metadata standards.
- AEM Cloud onboarding including IMS / Identity configuration.
- User groups and permissions model for EDS and AEM Cloud authoring environments.
- Integrations with dependent systems — Header/Footer, Brightcove (video), Dynamic Merchandising Offers, Form Submissions, and Data Layer (Analytics/Target).
- Asset migration strategy and execution.
- Current content workflows — review, approval, and publishing.
- Third-party and extension integrations (e.g., Immersive Experience).
- Vanity / friendly URL migration and redirect strategy.
- MSM (Multi-Site Manager), translation, and rollout configuration for regional sites.

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

- Any changes required in **downstream systems** consuming data from AEM are out of scope for Adobe.
- Any changes required in **external APIs** providing data to or consuming data from EDS are out of scope for Adobe.

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

| # | Assumption |
|---|---|
| A1 | Since this represents a fundamental shift in authoring experience, all customizations built on the current AEM Author environment (Touch UI extensions, custom dialogs, workflow steps) will not carry forward to EDS and must be re-evaluated against DA capabilities. |
| A2 | For content migration to proceed, all pages must have a publicly accessible URL. Pages that are currently unpublished must be activated on a reachable URL prior to migration. |
| A3 | US/en will serve as the baseline site for MSM regional content copies. Regional pages with overridden (broken-inheritance) content must be identified and cataloged prior to migration to determine which require independent treatment. |
| A4 | Before the implementation phase begins, Thermo Fisher must finalize the decision on which **Edge Worker** (CDN edge compute) pattern will be used for the project. |

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
