# Girl Scouts E-Commerce — Edge Delivery Services Backlog

**Project:** Girl Scouts E-Commerce Site
**Platform:** Adobe Edge Delivery Services (AEM Sites)
**Date:** February 25, 2026
**Total Stories:** ~50 across 7 Epics

---

## Table of Contents

1. [Epic 0: Project Setup & Infrastructure](#epic-0-project-setup--infrastructure)
2. [Epic 1: Design System & Tokens](#epic-1-design-system--tokens)
3. [Epic 2: Global Blocks (Header & Footer)](#epic-2-global-blocks-header--footer)
4. [Epic 3: Static EDS Blocks](#epic-3-static-eds-blocks)
5. [Epic 4: Dynamic / Hybrid Blocks (Commerce Integration)](#epic-4-dynamic--hybrid-blocks-commerce-integration)
6. [Epic 5: Content Migration](#epic-5-content-migration)
7. [Epic 6: QA, Performance & Accessibility](#epic-6-qa-performance--accessibility)
8. [Sprint Prioritization](#recommended-sprint-prioritization)
9. [Block Reference Table](#block-reference-table)

---

## Block Reference Table

| # | Block Name | Type | Integration | Epic |
|---|-----------|------|-------------|------|
| 1 | Header Block | Dynamic | Hybrid (Commerce + EDS) | Epic 2 |
| 2 | Hero Banner / Carousel | Static | EDS | Epic 3 |
| 3 | Looking For Strip | Static | EDS | Epic 3 |
| 4 | Quick Order Banner | Static | EDS | Epic 3 |
| 5 | Shop By Grade | Static | EDS | Epic 3 |
| 6 | Products Spotlight | Dynamic | Hybrid (EDS + Commerce) | Epic 4 |
| 7 | Shop By Category | Static | EDS | Epic 3 |
| 8 | In-Page Banner | Static | EDS | Epic 3 |
| 9 | Shop By Collection | Static | EDS | Epic 3 |
| 10 | Customer Stories Carousel | Static | EDS | Epic 3 |
| 11 | Council Product List Carousel | Dynamic | Commerce | Epic 4 |
| 12 | Teaser Banner (Info Callout) | Static | EDS | Epic 3 |
| 13 | Campaign Highlights Carousel | Static | EDS | Epic 3 |
| 14 | Small Info Callout Teaser | Static | EDS | Epic 3 |
| 15 | Shop by Troop Plan | Dynamic | Commerce | Epic 4 |
| 16 | Recent Products Orders | Dynamic | Commerce (User-specific) | Epic 4 |
| 17 | Recommended Products | Dynamic | Commerce | Epic 4 |
| 18 | Value Proposition Block | Static | EDS | Epic 3 |
| 19 | Global Footer Block | Static | EDS | Epic 2 |

---

## Epic 0: Project Setup & Infrastructure

**Goal:** Establish the foundational infrastructure needed before any block development or content migration begins.

### Story 0.1 — Connect Content Source

| Field | Detail |
|-------|--------|
| **Title** | Connect content source (SharePoint / Google Drive) |
| **Description** | As a developer, I need to configure `fstab.yaml` to connect the project to the authoring content source so that authored content resolves in the Edge Delivery Services pipeline. |
| **Priority** | P0 |
| **Acceptance Criteria** | - `fstab.yaml` created with correct mountpoint URL |
| | - Content resolves at `localhost:3000` when dev server is running |
| | - Preview environment (`aem.page`) serves content |

### Story 0.2 — Set Up Environment URLs

| Field | Detail |
|-------|--------|
| **Title** | Establish preview and live environment URLs |
| **Description** | As a developer, I need to verify that code sync is active and preview/live environments are accessible so that the team can validate changes before production. |
| **Priority** | P0 |
| **Acceptance Criteria** | - Code sync webhook is active on the GitHub repository |
| | - Pages render on `https://main--{repo}--{owner}.aem.page/` |
| | - Feature branch previews work at `https://{branch}--{repo}--{owner}.aem.page/` |
| | - `gh repo view` returns correct owner/repo |

### Story 0.3 — Create Index / Home Page Content

| Field | Detail |
|-------|--------|
| **Title** | Author the homepage content document |
| **Description** | As a content author, I need the homepage content document created with placeholder content for all 19 blocks so that developers can begin block development with real content structures. |
| **Priority** | P0 |
| **Acceptance Criteria** | - Homepage loads at `/` on preview |
| | - All sections visible with placeholder content |
| | - Section metadata applied where needed |
| | - Document follows Edge Delivery Services authoring conventions |

### Story 0.4 — Set Up Navigation Content

| Field | Detail |
|-------|--------|
| **Title** | Author the navigation (`nav`) content document |
| **Description** | As a content author, I need the `nav` content document created with logo, primary navigation links, and utility links so that the header block can load and render navigation. |
| **Priority** | P0 |
| **Acceptance Criteria** | - Header block loads nav content successfully |
| | - Navigation links render correctly |
| | - Logo displays and links to homepage |
| | - Mobile hamburger menu triggers on small viewports |

### Story 0.5 — Set Up Footer Content

| Field | Detail |
|-------|--------|
| **Title** | Author the footer content document |
| **Description** | As a content author, I need the `footer` content document created with link columns, social icons, and legal/informational content so that the footer block renders correctly. |
| **Priority** | P0 |
| **Acceptance Criteria** | - Footer block loads footer content successfully |
| | - Link columns render in responsive layout |
| | - Social media links present |
| | - Copyright/legal text displays |

### Story 0.6 — Configure `.hlxignore`

| Field | Detail |
|-------|--------|
| **Title** | Update `.hlxignore` for production exclusions |
| **Description** | As a developer, I need to ensure drafts, test files, documentation, and non-production assets are excluded from Edge Delivery Services delivery. |
| **Priority** | P1 |
| **Acceptance Criteria** | - `.hlxignore` updated with project-specific exclusions |
| | - Non-production files do not appear on `aem.page` or `aem.live` |

### Story 0.7 — Set Up Icons Library

| Field | Detail |
|-------|--------|
| **Title** | Add all required SVG icons to the icons library |
| **Description** | As a developer, I need all SVG icons (search, cart, wishlist, hamburger, close, chevron, arrow, social media icons, etc.) added to `/icons/` so that blocks can reference them via the standard `<span class="icon icon-{name}">` pattern. |
| **Priority** | P0 |
| **Acceptance Criteria** | - All required icons added as optimized SVGs in `/icons/` |
| | - Icons load correctly via Edge Delivery Services icon pattern |
| | - All blocks referencing icons render without missing images |
| | - Icons are accessible (decorative icons hidden, functional icons labeled) |

### Story 0.8 — Configure `delayed.js` Integrations

| Field | Detail |
|-------|--------|
| **Title** | Wire up analytics and martech in `delayed.js` |
| **Description** | As a developer, I need to configure analytics (Google Analytics / Adobe Analytics), cookie consent, and any third-party martech integrations in `delayed.js` so they load without impacting LCP. |
| **Priority** | P2 |
| **Acceptance Criteria** | - Analytics fires on page load in delayed phase |
| | - Cookie consent banner appears for first-time visitors |
| | - No measurable impact on LCP or Lighthouse performance score |
| | - Integrations work on both preview and live environments |

---

## Epic 1: Design System & Tokens

**Goal:** Extract and define the Girl Scouts brand design system as CSS custom properties for consistent styling across all blocks.

### Story 1.1 — Extract Brand Color Palette

| Field | Detail |
|-------|--------|
| **Title** | Define brand color palette as CSS custom properties |
| **Description** | As a developer, I need to extract the Girl Scouts brand colors from the source site and define them as CSS custom properties in `styles.css` so that all blocks use a consistent, maintainable color system. |
| **Priority** | P0 |
| **Acceptance Criteria** | - Primary, secondary, accent, and neutral color tokens defined in `:root` |
| | - Semantic color tokens defined (success, warning, error, info) |
| | - Tokens follow naming convention (e.g., `--color-brand-primary`) |
| | - Existing boilerplate color tokens replaced with brand values |

### Story 1.2 — Set Up Typography System

| Field | Detail |
|-------|--------|
| **Title** | Import brand fonts and define type scale tokens |
| **Description** | As a developer, I need to import the Girl Scouts brand fonts and define a complete type scale (sizes, weights, line-heights) as CSS custom properties so that typography is consistent across the site. |
| **Priority** | P0 |
| **Acceptance Criteria** | - Brand fonts loaded via `fonts.css` in woff2 format |
| | - Fallback fonts configured with `size-adjust` to minimize CLS |
| | - Heading and body size tokens updated to match brand guidelines |
| | - Font weight tokens defined (regular, medium, bold) |
| | - Line-height tokens defined for body and heading text |

### Story 1.3 — Define Spacing Scale

| Field | Detail |
|-------|--------|
| **Title** | Create consistent spacing tokens |
| **Description** | As a developer, I need a spacing scale defined as CSS custom properties so that margins, padding, and gaps are consistent and maintainable across all blocks. |
| **Priority** | P1 |
| **Acceptance Criteria** | - Spacing tokens defined (`--spacing-xs` through `--spacing-xxl`) |
| | - Applied consistently in global styles (sections, containers) |
| | - Documented scale (e.g., 4px, 8px, 16px, 24px, 32px, 48px, 64px) |

### Story 1.4 — Define Button Styles

| Field | Detail |
|-------|--------|
| **Title** | Update button styles to match brand design |
| **Description** | As a developer, I need to update primary, secondary, and accent button styles in `styles.css` to match the Girl Scouts brand design including colors, border-radius, padding, hover, focus, and disabled states. |
| **Priority** | P0 |
| **Acceptance Criteria** | - Primary, secondary, and accent button variants styled to brand |
| | - Hover, focus, active, and disabled states defined |
| | - Focus indicators meet WCAG 2.1 AA contrast requirements |
| | - Button tokens used consistently across all blocks |

### Story 1.5 — Define Layout Tokens

| Field | Detail |
|-------|--------|
| **Title** | Set max-widths, grid gaps, and breakpoints |
| **Description** | As a developer, I need layout tokens defined for max-widths, grid gaps, and breakpoints so that page structure is consistent and responsive behavior is predictable. |
| **Priority** | P1 |
| **Acceptance Criteria** | - Layout tokens defined in `:root` (max-width, grid gap, section padding) |
| | - Responsive breakpoints documented (600px, 900px, 1200px) |
| | - Nav height token updated if different from boilerplate default |

### Story 1.6 — Set Up `lazy-styles.css`

| Field | Detail |
|-------|--------|
| **Title** | Add below-the-fold global styles |
| **Description** | As a developer, I need to add global styles for below-the-fold elements (form elements, utility classes, animation/transition tokens) in `lazy-styles.css` so they load after LCP without causing layout shifts. |
| **Priority** | P2 |
| **Acceptance Criteria** | - Styles load in the lazy phase after LCP |
| | - No layout shift observed on page load |
| | - Form, animation, and utility styles available for below-fold blocks |

---

## Epic 2: Global Blocks (Header & Footer)

**Goal:** Implement the global header and footer blocks that appear on every page of the site.

### Story 2.1 — Header: Promo Banner Strip

| Field | Detail |
|-------|--------|
| **Title** | Add configurable promotional banner to header |
| **Description** | As a content author, I want a promotional banner strip above the main header so I can communicate sales, announcements, or time-sensitive messaging site-wide. |
| **Priority** | P1 |
| **Acceptance Criteria** | - Promo text and optional CTA render above main navigation |
| | - Dismissible with close button (persists dismissal in session) |
| | - Content configurable via authored nav document |
| | - Responsive — stacks appropriately on mobile |

### Story 2.2 — Header: Logo and Brand Area

| Field | Detail |
|-------|--------|
| **Title** | Display Girl Scouts logo in header |
| **Description** | As a user, I want to see the Girl Scouts logo in the header that links to the homepage for consistent branding and easy navigation home. |
| **Priority** | P0 |
| **Acceptance Criteria** | - Logo renders as optimized picture element |
| | - Links to `/` (homepage) |
| | - Correct sizing on mobile and desktop viewports |
| | - Alt text provided for accessibility |

### Story 2.3 — Header: Primary Navigation with Flyouts

| Field | Detail |
|-------|--------|
| **Title** | Implement mega-menu flyout navigation |
| **Description** | As a user, I want a multi-level navigation menu with flyout panels so I can browse product categories and site sections efficiently. |
| **Priority** | P0 |
| **Acceptance Criteria** | - Flyout panels open on hover (desktop) and tap (mobile) |
| | - Multi-level category links render from authored content |
| | - Keyboard accessible: arrow keys navigate, Escape closes flyout |
| | - ARIA `expanded`/`collapsed` states set correctly |
| | - Mobile: hamburger icon toggles full-screen menu overlay |
| | - Navigation data sourced from Commerce API for product categories |

### Story 2.4 — Header: Search Integration

| Field | Detail |
|-------|--------|
| **Title** | Add search functionality to header |
| **Description** | As a user, I want a search feature in the header so I can quickly find products and content across the site. |
| **Priority** | P1 |
| **Acceptance Criteria** | - Search icon in utility area toggles search input |
| | - Search form submits to search results page |
| | - Accessible label and focus management on toggle |
| | - Mobile: search expands to full-width input |

### Story 2.5 — Header: Wishlist Icon

| Field | Detail |
|-------|--------|
| **Title** | Add wishlist icon with count badge |
| **Description** | As a logged-in user, I want to see a wishlist icon with a count badge in the header so I can quickly access my saved items. |
| **Priority** | P2 |
| **Acceptance Criteria** | - Wishlist icon renders in header utility area |
| | - Badge count updates dynamically from Commerce API |
| | - Icon links to wishlist page |
| | - Hidden or inactive for anonymous users |

### Story 2.6 — Header: Cart Icon with Count

| Field | Detail |
|-------|--------|
| **Title** | Add cart icon with item count badge |
| **Description** | As a user, I want to see a cart icon with the number of items in my cart so I can track my shopping without leaving the current page. |
| **Priority** | P1 |
| **Acceptance Criteria** | - Cart icon renders in header utility area |
| | - Badge shows current item count from Commerce API |
| | - Icon links to cart page |
| | - Count updates on add-to-cart events without page reload |

### Story 2.7 — Header: List/Grid Toggle View

| Field | Detail |
|-------|--------|
| **Title** | Add list/grid product view toggle |
| **Description** | As a user, I want to toggle between list and grid views for product listings so I can browse products in my preferred layout. |
| **Priority** | P2 |
| **Acceptance Criteria** | - Toggle control renders in header utility area |
| | - State persists across page navigation (sessionStorage) |
| | - Emits custom event for PLP blocks to consume |
| | - Accessible toggle with clear active state |

### Story 2.8 — Footer: Global Footer Block

| Field | Detail |
|-------|--------|
| **Title** | Implement global footer block |
| **Description** | As a user, I want a comprehensive footer with link columns, social icons, and legal information so I can find important links and company information at the bottom of every page. |
| **Priority** | P1 |
| **Acceptance Criteria** | - Footer content loads from `/footer` document |
| | - Responsive multi-column link layout |
| | - Social media icons with correct links |
| | - Copyright and legal text renders |
| | - Accessible landmark (`<footer>` with `role="contentinfo"`) |

---

## Epic 3: Static EDS Blocks

**Goal:** Implement all static, content-authored blocks that are managed entirely through Edge Delivery Services without Commerce API dependencies.

### Story 3.1 — Hero Banner / Carousel (Block #2)

| Field | Detail |
|-------|--------|
| **Title** | Implement hero banner with carousel variant |
| **Description** | As a content author, I want a hero banner block that supports a single banner or multi-slide carousel with images/video, titles, and CTAs so I can create impactful homepage hero sections. |
| **Priority** | P0 |
| **Block Name** | `hero` |
| **Acceptance Criteria** | - Full-bleed background image or video |
| | - Overlay text (heading, subheading) and CTA button(s) |
| | - Carousel variant: auto-advances, navigation dots and/or arrows |
| | - Carousel pauses on hover/focus |
| | - Accessible: `aria-live="polite"`, `role="region"`, `aria-roledescription="carousel"` |
| | - Images use `createOptimizedPicture` for responsive delivery |
| | - Responsive: text and CTA scale/reposition on mobile |

### Story 3.2 — Looking For Strip (Block #3)

| Field | Detail |
|-------|--------|
| **Title** | Implement guided navigation dropdown strip |
| **Description** | As a user, I want a guided navigation strip where I can select criteria from dropdowns and be redirected to the relevant page so I can quickly find what I'm looking for. |
| **Priority** | P1 |
| **Block Name** | `looking-for` |
| **Acceptance Criteria** | - Dropdown(s) render with authored options |
| | - Selection redirects to configured URL |
| | - Mobile-friendly select elements |
| | - Accessible labels associated with select elements |
| | - Styled consistently with brand design system |

### Story 3.3 — Quick Order Banner (Block #4)

| Field | Detail |
|-------|--------|
| **Title** | Implement Quick Order promotional banner |
| **Description** | As a user, I want to see a promotional banner directing me to the Quick Order flow so I can quickly reorder products I already know. |
| **Priority** | P1 |
| **Block Name** | `quick-order-banner` |
| **Acceptance Criteria** | - Banner with image, heading, description text, and CTA |
| | - CTA links to Quick Order page |
| | - Responsive layout: stacked on mobile, side-by-side on desktop |
| | - Image uses `createOptimizedPicture` |

### Story 3.4 — Shop By Grade (Block #5)

| Field | Detail |
|-------|--------|
| **Title** | Implement grade-based visual navigation |
| **Description** | As a user, I want to browse products by grade level through visual navigation cards so I can find age-appropriate items quickly. |
| **Priority** | P0 |
| **Block Name** | `shop-by-grade` |
| **Acceptance Criteria** | - Grid of grade cards, each with image and label |
| | - Each card links to grade-specific PLP or category page |
| | - Responsive grid layout (`auto-fill minmax`) |
| | - Optimized images via `createOptimizedPicture` |
| | - Hover/focus effect on desktop |

### Story 3.5 — Shop By Category (Block #7)

| Field | Detail |
|-------|--------|
| **Title** | Implement image-led category tile navigation |
| **Description** | As a user, I want to browse by product category through image tiles so I can navigate to the product listings I'm interested in. |
| **Priority** | P0 |
| **Block Name** | `shop-by-category` |
| **Acceptance Criteria** | - Grid of category tiles with image and title |
| | - Each tile links to category PLP or page |
| | - Responsive grid layout |
| | - Hover effect on desktop (e.g., scale or overlay) |
| | - Optimized images |

### Story 3.6 — In-Page Banner (Block #8)

| Field | Detail |
|-------|--------|
| **Title** | Implement promotional in-page banner |
| **Description** | As a content author, I want to place hero-style promotional banners within the page content to highlight curated collections or seasonal promotions. |
| **Priority** | P1 |
| **Block Name** | `in-page-banner` |
| **Acceptance Criteria** | - Full-width or contained banner with image and text overlay |
| | - Heading, description text, and CTA button |
| | - Responsive layout |
| | - Optimized background image |
| | - Visually distinct from the hero banner block |

### Story 3.7 — Shop By Collection (Block #9)

| Field | Detail |
|-------|--------|
| **Title** | Implement collection showcase carousel |
| **Description** | As a user, I want to browse curated collections through a scrollable carousel so I can discover themed product groupings. |
| **Priority** | P1 |
| **Block Name** | `shop-by-collection` |
| **Acceptance Criteria** | - Horizontal scroll/carousel of collection cards |
| | - Each card has image, title, and link |
| | - Navigation arrows and/or dot indicators |
| | - Touch/swipe support on mobile |
| | - Accessible carousel pattern with `aria-roledescription` |

### Story 3.8 — Customer Stories Carousel (Block #10)

| Field | Detail |
|-------|--------|
| **Title** | Implement customer stories/testimonial carousel |
| **Description** | As a user, I want to see customer stories and testimonials in a carousel so I can read about real experiences from the Girl Scouts community. |
| **Priority** | P2 |
| **Block Name** | `customer-stories` |
| **Acceptance Criteria** | - Carousel of story cards with image, quote/text, and attribution |
| | - Auto-advances with configurable interval |
| | - Pauses on hover/focus interaction |
| | - Accessible: `aria-roledescription="carousel"`, `aria-live="polite"` |
| | - Navigation dots and/or arrows |

### Story 3.9 — Teaser Banner / Info Callout (Block #12)

| Field | Detail |
|-------|--------|
| **Title** | Implement static promotional teaser block |
| **Description** | As a content author, I want a teaser block with image, description, and CTA so I can promote specific products, pages, or campaigns within the page content. |
| **Priority** | P1 |
| **Block Name** | `teaser` |
| **Acceptance Criteria** | - Image + text + CTA layout |
| | - Responsive: stacked on mobile, side-by-side on desktop |
| | - Supports left-image and right-image variants via block variant class |
| | - Optimized image |

### Story 3.10 — Campaign Highlights Carousel (Block #13)

| Field | Detail |
|-------|--------|
| **Title** | Implement campaign/program highlights carousel |
| **Description** | As a user, I want to see campaigns, programs, or badge journeys showcased in a multi-card carousel so I can discover Girl Scouts activities and initiatives. |
| **Priority** | P2 |
| **Block Name** | `campaign-highlights` |
| **Acceptance Criteria** | - Carousel of campaign cards (image, title, description, CTA) |
| | - Displays 3-4 visible cards on desktop, 1-2 on mobile |
| | - Swipe and arrow navigation |
| | - Responsive card sizing |
| | - Accessible carousel pattern |

### Story 3.11 — Small Info Callout Teaser (Block #14)

| Field | Detail |
|-------|--------|
| **Title** | Implement compact teaser/callout block |
| **Description** | As a content author, I want a compact teaser block with title, image, description, and CTA so I can place smaller promotional callouts in the page. |
| **Priority** | P2 |
| **Block Name** | `small-teaser` |
| **Acceptance Criteria** | - Compact card layout with image, title, description, CTA |
| | - Supports grid of multiple teasers (2-3 per row) |
| | - Responsive sizing and stacking on mobile |
| | - Can be standalone block or variant of `teaser` block |

### Story 3.12 — Value Proposition Block (Block #18)

| Field | Detail |
|-------|--------|
| **Title** | Implement value proposition messaging block |
| **Description** | As a content author, I want a value proposition block that displays key messaging (e.g., free shipping, easy returns, secure checkout) so users see the benefits of shopping on the site. |
| **Priority** | P2 |
| **Block Name** | `value-props` |
| **Acceptance Criteria** | - Row or grid of value prop items, each with icon and text |
| | - Supports 3-4 items in a row |
| | - Responsive: horizontal on desktop, stacked or scrollable on mobile |
| | - Icons loaded from `/icons/` directory |
| | - Accessible icon + text pairing |

---

## Epic 4: Dynamic / Hybrid Blocks (Commerce Integration)

**Goal:** Implement blocks that require Commerce API integration for dynamic product data, user-specific content, or hybrid authored + dynamic content.

### Story 4.1 — Commerce Integration Layer

| Field | Detail |
|-------|--------|
| **Title** | Create shared Commerce API utility module |
| **Description** | As a developer, I need a shared utility module (`commerce.js`) that provides reusable functions for fetching product data, cart state, and user information from the Commerce APIs so that all dynamic blocks use a consistent integration pattern. |
| **Priority** | P0 |
| **Block Name** | N/A (utility in `/scripts/`) |
| **Acceptance Criteria** | - Reusable fetch functions for: products (by ID, category, recommendation), cart state, user/session data |
| | - Error handling with graceful fallbacks |
| | - Loading state indicators |
| | - API base URL configurable (environment-aware) |
| | - Caching strategy for product data (avoid redundant fetches) |
| | - Module exports clean async functions |

### Story 4.2 — Shared Product Card Component

| Field | Detail |
|-------|--------|
| **Title** | Create reusable product card renderer |
| **Description** | As a developer, I need a shared product card rendering function that multiple blocks (#6, #11, #15, #16, #17) can use so that product cards are visually consistent and maintainable from a single source. |
| **Priority** | P0 |
| **Block Name** | N/A (shared component) |
| **Acceptance Criteria** | - Renders: product image, name, price, star rating, add-to-cart button |
| | - Consistent styling across all consuming blocks |
| | - Handles missing/optional data gracefully (no rating, no image, etc.) |
| | - Accessible: alt text for images, button labels, semantic markup |
| | - Returns DOM element that blocks can append |

### Story 4.3 — Products Spotlight (Block #6)

| Field | Detail |
|-------|--------|
| **Title** | Implement tabbed product spotlight carousel |
| **Description** | As a user, I want to browse featured products organized by tabs (New Arrivals, Best Sellers, etc.) in a carousel so I can discover popular and new products on the homepage. |
| **Priority** | P0 |
| **Block Name** | `products-spotlight` |
| **Acceptance Criteria** | - Tabs rendered from authored configuration (tab labels + product category/query) |
| | - Tab selection fetches/filters products from Commerce API |
| | - Product cards render in carousel format |
| | - Loading skeleton displayed while fetching data |
| | - Accessible tab pattern: `role="tablist"`, `role="tab"`, `role="tabpanel"` |
| | - Keyboard navigation: arrow keys between tabs, Enter/Space to select |
| | - Empty state handled if no products returned |

### Story 4.4 — Council Product List Carousel (Block #11)

| Field | Detail |
|-------|--------|
| **Title** | Implement council-specific product carousel |
| **Description** | As a user, I want to see products specific to my local Girl Scouts council so I can purchase council-branded items and locally relevant products. |
| **Priority** | P1 |
| **Block Name** | `council-products` |
| **Acceptance Criteria** | - ZIP code input field or geolocation detection to determine council |
| | - Products filtered by council from Commerce API |
| | - Carousel of product cards using shared product card component |
| | - Fallback content for unknown/unsupported locations |
| | - Loading and empty states handled |
| | - ZIP code selection persisted in session |

### Story 4.5 — Shop by Troop Plan (Block #15)

| Field | Detail |
|-------|--------|
| **Title** | Implement troop plan product display |
| **Description** | As a troop leader, I want to see products organized by year/level plan so I can easily find everything needed for my troop's activities and progression. |
| **Priority** | P2 |
| **Block Name** | `shop-by-plan` |
| **Acceptance Criteria** | - Dropdown or selector for year/level plan |
| | - Products fetched from Commerce API based on selected plan |
| | - Product cards displayed in carousel or grid layout |
| | - Loading and empty states handled |
| | - Selection persisted during session |

### Story 4.6 — Recent Product Orders (Block #16)

| Field | Detail |
|-------|--------|
| **Title** | Implement recently ordered products block |
| **Description** | As a returning logged-in user, I want to see my recently ordered products on the homepage so I can quickly reorder items I've purchased before. |
| **Priority** | P2 |
| **Block Name** | `recent-orders` |
| **Acceptance Criteria** | - Checks user authentication state |
| | - Fetches order history from Commerce API for authenticated users |
| | - Renders product cards for most recent orders |
| | - Shows "Sign in to see your recent orders" prompt for anonymous users |
| | - Empty state for authenticated users with no order history |
| | - Quick reorder CTA on each product card |

### Story 4.7 — Recommended Products (Block #17)

| Field | Detail |
|-------|--------|
| **Title** | Implement product recommendations block |
| **Description** | As a user, I want to see personalized or curated product recommendations so I can discover products that are relevant to my interests or browsing history. |
| **Priority** | P1 |
| **Block Name** | `recommended-products` |
| **Acceptance Criteria** | - Accepts recommendation engine ID from authored block configuration |
| | - Fetches recommended products from Commerce API using the ID |
| | - Renders product cards in carousel layout |
| | - Fallback content if recommendation engine returns empty results |
| | - Loading skeleton while data is fetching |
| | - Shared product card component used for rendering |

---

## Epic 5: Content Migration

**Goal:** Migrate existing website content (homepage, navigation, footer, and supporting pages) to Edge Delivery Services authored documents.

### Story 5.1 — Migrate Homepage Content

| Field | Detail |
|-------|--------|
| **Title** | Migrate homepage to Edge Delivery Services |
| **Description** | As a content author, I need the existing homepage content migrated to an Edge Delivery Services document with all 19 block instances properly structured so that the homepage renders correctly on the new platform. |
| **Priority** | P0 |
| **Acceptance Criteria** | - All 19 blocks represented in homepage content document |
| | - Images referenced or uploaded to content source |
| | - Page renders correctly at `localhost:3000` |
| | - Content matches source page structure and hierarchy |
| | - Metadata (title, description, OG tags) migrated |
| | - Section metadata applied where needed |

### Story 5.2 — Migrate Navigation Structure

| Field | Detail |
|-------|--------|
| **Title** | Migrate full navigation hierarchy |
| **Description** | As a content author, I need the complete navigation hierarchy extracted from the source site and recreated in the `nav` content document so that the header block displays all categories and links correctly. |
| **Priority** | P0 |
| **Acceptance Criteria** | - All top-level navigation categories present |
| | - Flyout/mega-menu sub-categories migrated |
| | - Links point to correct target pages (mapped to new URL structure) |
| | - Navigation renders correctly in header block |
| | - Utility links (search, account, cart) configured |

### Story 5.3 — Migrate Footer Content

| Field | Detail |
|-------|--------|
| **Title** | Migrate footer content and links |
| **Description** | As a content author, I need the footer content extracted from the source site and recreated in the `footer` content document. |
| **Priority** | P1 |
| **Acceptance Criteria** | - All link columns present with correct URLs |
| | - Social media links migrated |
| | - Legal/copyright text migrated |
| | - Footer renders correctly in footer block |

### Story 5.4 — Create Page Templates

| Field | Detail |
|-------|--------|
| **Title** | Define reusable page templates |
| **Description** | As a content author, I need page templates defined for common page types (homepage, PLP, PDP, content page, landing page) so that new pages follow a consistent structure. |
| **Priority** | P1 |
| **Acceptance Criteria** | - Template structure documented for each page type |
| | - Section + block patterns defined per template |
| | - Template validated with sample content |
| | - Authors can create new pages from templates |

### Story 5.5 — Bulk Content Migration Plan

| Field | Detail |
|-------|--------|
| **Title** | Create import scripts for bulk page migration |
| **Description** | As a developer, I need import scripts and templates for bulk migration of remaining pages (category pages, content pages, landing pages) so that migration can be executed efficiently at scale. |
| **Priority** | P2 |
| **Acceptance Criteria** | - Page template mapping complete for all page types |
| | - Import script handles common content patterns |
| | - Tested successfully with 5+ pages of each template type |
| | - Image migration/reference strategy documented |
| | - URL mapping/redirect plan created |

---

## Epic 6: QA, Performance & Accessibility

**Goal:** Ensure the site meets Edge Delivery Services performance standards, accessibility requirements, and cross-browser compatibility before launch.

### Story 6.1 — Lighthouse 100 on Homepage

| Field | Detail |
|-------|--------|
| **Title** | Achieve Lighthouse score of 100 on all categories |
| **Description** | As a developer, I need to optimize the homepage to achieve a perfect Lighthouse score across all categories to meet Edge Delivery Services performance standards. |
| **Priority** | P0 |
| **Acceptance Criteria** | - Performance: 100 |
| | - Accessibility: 100 |
| | - Best Practices: 100 |
| | - SEO: 100 |
| | - Tested against `aem.page` preview URL using PageSpeed Insights |
| | - Results documented and shared with team |

### Story 6.2 — Accessibility Audit

| Field | Detail |
|-------|--------|
| **Title** | WCAG 2.1 AA compliance audit |
| **Description** | As a developer, I need to audit all blocks for WCAG 2.1 AA compliance and fix any violations so that the site is accessible to all users. |
| **Priority** | P1 |
| **Acceptance Criteria** | - All blocks pass axe-core automated accessibility tests |
| | - Keyboard navigation works for all interactive elements (tabs, carousels, menus, dropdowns) |
| | - Screen reader tested on: header navigation, hero carousel, product spotlight tabs, all carousels |
| | - Color contrast meets AA ratio requirements (4.5:1 body, 3:1 large text) |
| | - Focus management correct for all modal/overlay interactions |

### Story 6.3 — Cross-Browser Testing

| Field | Detail |
|-------|--------|
| **Title** | Verify cross-browser and cross-device rendering |
| **Description** | As a QA tester, I need to verify that all pages and blocks render correctly across major browsers and devices. |
| **Priority** | P1 |
| **Acceptance Criteria** | - No layout breaks on Chrome, Firefox, Safari, and Edge (latest 2 versions) |
| | - Interactive elements functional on all browsers |
| | - Carousels and touch interactions work on iOS Safari and Android Chrome |
| | - Responsive breakpoints verified on real devices (phone, tablet, desktop) |

### Story 6.4 — CLS & LCP Validation

| Field | Detail |
|-------|--------|
| **Title** | Validate Core Web Vitals across all page templates |
| **Description** | As a developer, I need to ensure Core Web Vitals (CLS, LCP, FID/INP) meet "Good" thresholds across all page templates to maintain Edge Delivery Services performance standards. |
| **Priority** | P0 |
| **Acceptance Criteria** | - CLS < 0.1 on all page templates |
| | - LCP < 2.5s on all page templates |
| | - INP < 200ms on interactive pages |
| | - No font-loading layout shifts (fallback fonts with `size-adjust`) |
| | - No image layout shifts (explicit width/height or aspect-ratio) |
| | - Validated on both mobile and desktop device profiles |

---

## Recommended Sprint Prioritization

### Sprint 1 — Foundation

**Focus:** Infrastructure, design system basics, and core content setup.

| Story | Epic | Priority |
|-------|------|----------|
| 0.1 Connect content source | Epic 0 | P0 |
| 0.2 Set up environment URLs | Epic 0 | P0 |
| 0.3 Create homepage content | Epic 0 | P0 |
| 0.4 Set up nav content | Epic 0 | P0 |
| 0.5 Set up footer content | Epic 0 | P0 |
| 0.7 Set up icons library | Epic 0 | P0 |
| 1.1 Brand color palette | Epic 1 | P0 |
| 1.2 Typography system | Epic 1 | P0 |
| 1.4 Button styles | Epic 1 | P0 |

### Sprint 2 — Core Blocks

**Focus:** Header navigation, hero, key navigation blocks, and Commerce foundation.

| Story | Epic | Priority |
|-------|------|----------|
| 2.2 Header: Logo | Epic 2 | P0 |
| 2.3 Header: Navigation with flyouts | Epic 2 | P0 |
| 3.1 Hero Banner / Carousel | Epic 3 | P0 |
| 3.4 Shop By Grade | Epic 3 | P0 |
| 3.5 Shop By Category | Epic 3 | P0 |
| 4.1 Commerce integration layer | Epic 4 | P0 |
| 4.2 Shared product card component | Epic 4 | P0 |

### Sprint 3 — Dynamic Blocks + More Static

**Focus:** Products Spotlight, promotional blocks, and header utilities.

| Story | Epic | Priority |
|-------|------|----------|
| 4.3 Products Spotlight | Epic 4 | P0 |
| 3.2 Looking For Strip | Epic 3 | P1 |
| 3.3 Quick Order Banner | Epic 3 | P1 |
| 3.6 In-Page Banner | Epic 3 | P1 |
| 3.9 Teaser Banner | Epic 3 | P1 |
| 2.1 Header: Promo banner | Epic 2 | P1 |
| 2.4 Header: Search | Epic 2 | P1 |
| 2.8 Footer block | Epic 2 | P1 |

### Sprint 4 — Remaining Blocks + Migration

**Focus:** Carousels, collections, Commerce blocks, and content migration.

| Story | Epic | Priority |
|-------|------|----------|
| 3.7 Shop By Collection | Epic 3 | P1 |
| 4.4 Council Product List | Epic 4 | P1 |
| 4.7 Recommended Products | Epic 4 | P1 |
| 1.3 Spacing scale | Epic 1 | P1 |
| 1.5 Layout tokens | Epic 1 | P1 |
| 5.1 Migrate homepage | Epic 5 | P0 |
| 5.2 Migrate navigation | Epic 5 | P0 |
| 5.3 Migrate footer | Epic 5 | P1 |

### Sprint 5 — Polish, Remaining Features & QA

**Focus:** Lower-priority blocks, QA, performance validation.

| Story | Epic | Priority |
|-------|------|----------|
| 3.8 Customer Stories Carousel | Epic 3 | P2 |
| 3.10 Campaign Highlights | Epic 3 | P2 |
| 3.11 Small Info Callout | Epic 3 | P2 |
| 3.12 Value Proposition | Epic 3 | P2 |
| 4.5 Shop by Troop Plan | Epic 4 | P2 |
| 4.6 Recent Product Orders | Epic 4 | P2 |
| 2.5 Header: Wishlist | Epic 2 | P2 |
| 2.6 Header: Cart | Epic 2 | P1 |
| 2.7 Header: Toggle view | Epic 2 | P2 |
| 5.4 Page templates | Epic 5 | P1 |
| 5.5 Bulk migration | Epic 5 | P2 |
| 6.1 Lighthouse 100 | Epic 6 | P0 |
| 6.2 Accessibility audit | Epic 6 | P1 |
| 6.3 Cross-browser testing | Epic 6 | P1 |
| 6.4 CLS & LCP validation | Epic 6 | P0 |
| 0.6 Configure .hlxignore | Epic 0 | P1 |
| 0.8 delayed.js integrations | Epic 0 | P2 |
| 1.6 lazy-styles.css | Epic 1 | P2 |

---

## Summary

| Epic | Stories | P0 | P1 | P2 |
|------|---------|----|----|-----|
| Epic 0: Infrastructure | 8 | 5 | 1 | 2 |
| Epic 1: Design System | 6 | 3 | 2 | 1 |
| Epic 2: Header & Footer | 8 | 2 | 3 | 3 |
| Epic 3: Static Blocks | 12 | 3 | 5 | 4 |
| Epic 4: Commerce Blocks | 7 | 3 | 2 | 2 |
| Epic 5: Content Migration | 5 | 2 | 2 | 1 |
| Epic 6: QA & Performance | 4 | 2 | 2 | 0 |
| **Total** | **50** | **20** | **17** | **13** |

---

*Document generated for Girl Scouts E-Commerce — Edge Delivery Services Migration Project*
