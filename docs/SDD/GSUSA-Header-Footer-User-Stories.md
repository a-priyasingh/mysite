# GSUSA Header & Footer — EDS User Stories

Source: Figma "Guest/Caregivers B2C" canvas (node 40-13). Brand tokens: Girl Scout (display) + Trefoil Sans (UI) fonts; primary green `#005640`; copyright text Trefoil Sans 400 14/18 white.

> Note: Header and footer in EDS are **special blocks** — they are authored as standalone documents (`/nav` and `/footer` by default) and loaded into every page by `scripts.js` during the lazy phase. They are NOT authored per-page. Content is edited once in DA and applies site-wide.

---

## STORY 1 — Header / Global Navigation

### User Story
**As a** girlscoutshop.com visitor,
**I want** a consistent global header with the GSUSA logo, search, category navigation (mega menu), account, and cart on every page,
**so that** I can search, browse categories, manage my account, and reach my cart from anywhere on the site.

**As a** content author,
**I want** to manage the header's promo bar, navigation links, and mega-menu content in one place,
**so that** site-wide navigation and promotions stay consistent without editing every page.

### Structure (verified from Figma)
- **Promo / Offer bar** (`Offer - Code`, 1280×52) — dismissible site-wide promo message + optional offer code.
- **Main Navigation** (`Main_Naviagtion`, 1280×127): logo (left), category nav triggering **Mega Menu**, search input, account/sign-in, cart icon with live count.
- **Mega Menu** (1280×436–699): multi-column category links + 2 promotional banner slots + a 1:1 image tile.
- **Mobile**: collapses to **Hamburger nav** (full-screen panel, accordion categories, "Choose your experience" switcher).

### EDS DA Authoring Details
- Header is authored in a single DA document at **`/nav`** (the default header path; configurable via `fstab`/metadata).
- **Promo bar**: authored as a short text + link row at the top of the `/nav` document. Author can edit message, link, and (optionally) an offer code. Leaving it empty hides the bar.
- **Logo**: image placed in the nav document; links to home (`/`).
- **Navigation links**: authored as a nested list (bulleted list in the DA doc). Top-level list items = main categories; nested lists = mega-menu columns/sub-links.
- **Mega-menu promo slots**: authored as image + link blocks within the relevant category's nested content.
- **Search**: rendered by the block (wired to ACCS Live Search); no per-link authoring needed.
- Decoration is handled by the header block JS (reuses/extends the boilerplate header; instrument via the navigation pattern). Mobile hamburger is the same content, responsively decorated.

### Authoring Acceptance Criteria
- [ ] Author can edit header content in the `/nav` DA document and changes apply to **all pages** after publish.
- [ ] Author can add/edit/remove the promo bar message, link, and offer code; emptying it hides the bar with no layout gap.
- [ ] Author can set the logo image and its link target.
- [ ] Author can build the category navigation as a nested list; top-level items become main nav, nested items become mega-menu columns/links.
- [ ] Author can add promotional image+link slots within a mega-menu category.
- [ ] Author can reorder categories by reordering list items.
- [ ] Omitting optional elements (promo, a mega-menu promo slot) does not break the header.
- [ ] Preview reflects changes before publish.

### User Acceptance Criteria
- [ ] Header appears consistently on every page (home, PLP, PDP, cart, checkout).
- [ ] Logo links to home; cart icon shows the current item count and links to cart.
- [ ] Hovering/focusing a top-level category opens its mega menu; menu is keyboard-navigable (arrow keys), dismissible with Esc, and closes on outside click.
- [ ] Search accepts a query and routes to Live Search results; suggestions (if enabled) are keyboard accessible.
- [ ] On mobile, the hamburger opens a full-screen nav with accordion categories; focus is trapped while open; tap targets ≥44×44px.
- [ ] Header is sticky (if specified) without obscuring content; no layout shift (CLS) on load.
- [ ] Promo bar is dismissible and stays dismissed for the session.
- [ ] WCAG 2.1 AA: landmark `<header>`/`<nav>`, visible focus, correct ARIA for menu/expanded state, sufficient contrast.

### Commerce Data Flow
- **Cart icon count**: live item count from the ACCS cart (drop-in/GraphQL).
- **Search**: query routed to ACCS Live Search; type-ahead suggestions from Live Search (if enabled).
- **Account state**: signed-in/out state from auth (Okta/commerce session) toggles account label.
- **Category links**: structure mirrors the ACCS catalog categories (authored to match, or generated from catalog).

---

## STORY 2 — Footer

### User Story
**As a** girlscoutshop.com visitor,
**I want** a global footer with organized link columns, newsletter signup, social links, and legal/copyright info,
**so that** I can find help, policies, account links, and follow GSUSA from any page.

**As a** content author,
**I want** to manage footer link columns, the newsletter prompt, social links, and legal text in one place,
**so that** footer content stays consistent site-wide.

### Structure (verified from Figma)
- **Link columns** (`Footer Accordion` ×4) — grouped navigation links; **collapse into accordions on mobile**.
- **Newsletter signup** (`Input form` → `Text input container`, 720×78) — email input + subscribe button.
- **Social / message bar** (`Footer Message`, `Nav & Footer Links`, 720×105) — social icons + secondary links.
- **Copyright** — "© 2025 Girl Scouts of the USA", Trefoil Sans 400 14/18, white on green/dark footer.

### EDS DA Authoring Details
- Footer is authored in a single DA document at **`/footer`** (the default footer path).
- **Link columns**: authored as headed lists — a heading (column title) followed by a bulleted list of links. Each heading+list becomes one column (desktop) / one accordion (mobile).
- **Newsletter signup**: authored as a labeled block (heading + prompt text); the email input + subscribe action is rendered by the block and wired to the email/marketing tool.
- **Social links**: authored as a list of links with platform icons (icon resolved by URL or label).
- **Legal / copyright**: authored as a text line + a list of legal links (Privacy, Terms, Accessibility).
- Decoration handled by the footer block JS (reuses/extends boilerplate footer; instrument via the footer pattern). Accordion behavior is mobile-specific decoration of the same content.

### Authoring Acceptance Criteria
- [ ] Author can edit footer content in the `/footer` DA document and changes apply to **all pages** after publish.
- [ ] Author can add/edit/remove/reorder link columns (each = heading + link list).
- [ ] Author can edit the newsletter heading/prompt; can disable it (omitting hides the section cleanly).
- [ ] Author can add/edit/remove social links; correct platform icon renders per link.
- [ ] Author can edit copyright text and legal links.
- [ ] Columns render as accordions on mobile automatically (no separate mobile authoring).
- [ ] Preview reflects changes before publish.

### User Acceptance Criteria
- [ ] Footer appears consistently at the bottom of every page.
- [ ] All footer links navigate correctly; legal links reach the right pages.
- [ ] Newsletter: visitor can enter an email and subscribe; success/error feedback is shown; invalid email is validated.
- [ ] Social icons link out to the correct GSUSA profiles (open appropriately, e.g., new tab with `rel="noopener"`).
- [ ] On mobile, link columns collapse into tappable accordions (chevron rotates, `aria-expanded` toggles); tap targets ≥44×44px.
- [ ] WCAG 2.1 AA: `<footer>` landmark, heading structure per column, visible focus, sufficient contrast (white text on footer background passes 4.5:1).
- [ ] No layout shift; footer loads in lazy phase without blocking LCP.

### Commerce Data Flow
- **Footer is primarily static/authored content — no commerce catalog data.**
- **Newsletter signup**: email submitted to the GSUSA email/marketing tool (e.g., Dispatch) via its API/endpoint — not ACCS catalog. Confirm target endpoint.
- Account/legal links are static authored URLs.

---

## Shared Notes & Open Items
- **Header and footer are global blocks** authored once (`/nav`, `/footer`) and loaded site-wide in the lazy phase — confirmed EDS pattern, not per-page authoring.
- **Verified from Figma**: structural composition (promo bar, main nav, mega menu; footer accordion columns, newsletter, social, copyright) and the copyright type/color. Exact nav link labels and footer column contents were **not populated in the instances on this canvas** (they reference master components elsewhere) — authors will supply final labels/links in DA.
- **Hover/interaction states** are recommendations based on GS brand green `#005640` and standard patterns; confirm with design.
- **Newsletter endpoint** (Dispatch or other) to be confirmed for the signup integration.
- **Mega menu** has its own detailed story candidate (multi-column + promo slots) — can be split out if needed.
