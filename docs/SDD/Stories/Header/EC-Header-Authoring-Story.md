# EDS Authoring Story — Header (Offer Bar + Main Navigation) — Content Model & Authoring

**Type:** Story (EDS Authoring)
**Component:** EDS Storefront (DA) — Global Header
**Related design:** Figma node 2697-345643 — `Header` (Property 1 = Guest/Caregivers; 1280×179): Offer/Promo bar (1280×52) + Main Navigation (1280×127).
**Companion stories:** Commerce API — Header (cart/account/search state) · ACCS Site Visit — Header rendering & UX.
**Related:** existing combined `EC-Header-Footer-User-Stories`; existing Navigation and Search Bar stories (header hosts them).
**Stream:** EDS Authoring (content model, authoring rules, DA preview).

## INVEST
- **Independent:** authoring of header content (offer bar, logo, nav links) is testable on its own.
- **Negotiable:** offer-bar fields, nav structure, and utility links can be refined.
- **Valuable:** lets authors manage the site-wide header in one place.
- **Estimable:** bounded to the header's authorable content.
- **Small:** header authoring model only (nav tree detail lives in the Navigation story).
- **Testable:** pass/fail Given/When/Then below.

---

## User Story
**As a** content author,
**I want** to author the header's offer/promo bar and manage the navigation content in the global header document,
**so that** the site-wide header stays consistent without editing individual pages.

## Content Model
Header is authored once in the global header document (e.g., **`/nav`**) and loaded site-wide (lazy phase).

| Displayed data | Content is sourced from | Required |
|----------------|-------------------------|----------|
| Offer/promo bar message | EDS | N |
| Offer/promo bar code (e.g., promo code) | EDS | N |
| Offer bar CTA (label + link) | EDS | N |
| Offer bar dismissible (close) | Code | N/A |
| Logo image + home link | EDS | N |
| Utility links (left/right, e.g. Find a Troop, Help) | EDS | N |
| Primary navigation (categories) | EDS (mirrors ACCS categories) | N |
| Secondary navigation | EDS | N |
| Account / Cart / Search icons | Code (data via Commerce API story) | N/A |

- Primary/secondary nav detail (mega-menu columns, promo tiles) is authored per the **Navigation** story; this story covers the header container + offer bar authoring.

## Acceptance Criteria (Given / When / Then)

**Scenario A1 — Edit header globally**
- **Given** an author edits the global header document (`/nav`)
- **When** they publish
- **Then** the change applies to the header on all pages.

**Scenario A2 — Offer bar authorable**
- **Given** the header document
- **When** the author sets the offer-bar message, code, and CTA
- **Then** the offer bar renders with that content; when the message is empty, the offer bar does not render (no empty strip).

**Scenario A3 — Logo & home link**
- **Given** the header document
- **When** the author sets the logo image and its link
- **Then** the logo renders and links to the configured URL (home by default).

**Scenario A4 — Utility & primary/secondary links**
- **Given** the header document
- **When** the author edits utility links and the primary/secondary nav content
- **Then** those links render in the header (nav structure per the Navigation story).

**Scenario A5 — No mandatory fields / graceful blank**
- **Given** the author leaves any subset of authorable fields empty
- **When** the header renders
- **Then** it renders without error; only empty elements are omitted; no placeholder text.

**Scenario A6 — Preview parity**
- **Given** the author has edited the header
- **When** they view DA preview
- **Then** the preview matches what will render live site-wide.

## Dependencies
- Navigation story (primary/secondary nav content model).
- Commerce API — Header story (cart/account/search data the icons consume).
- Search Bar story (header search).

## Open Items
- Confirm the header document path (`/nav` default) and offer-bar field set.
- Confirm persona handling (Guest/Caregivers vs Leader header) — separate documents vs. one with context.
- Confirm which utility links are authored vs. fixed.
