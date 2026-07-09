# ACCS Site Visit — "Need Help" Support Bar (Frontend Rendering)

> **Sample story** demonstrating the refined ticket standard (consolidated Jira feedback). Component: the "Need Help" support bar rendered on the ACCS storefront (girlscoutshop.com). This ticket is self-contained — Figma is a visual reference only.

**Type:** Story — ACCS Site Visit (frontend rendering & UX)
**Epic / Parent:** Home Page Content Blocks
**Component (system):** ACCS Storefront (EDS-delivered) — "Need Help" support bar
**Personas:** All site visitors (Guest, Caregiver, Leader) — no persona-specific behavior.
**Platforms / Pages:** Home page (and any page where the block is placed); Desktop, Tablet, Mobile.
**Companion tickets:** "Need Help" — EDS Authoring (content model & authoring).

---

## User Story
**As a** site visitor on girlscoutshop.com,
**I want** a clearly visible "Need Help" support bar with a link to help/FAQs,
**so that** I can reach support answers quickly without searching the site.

**Business value:** reduces support friction and drop-off by surfacing a persistent, one-click path to help content.

## Scope
- In scope: rendering and interaction of the support bar on the storefront across Desktop/Tablet/Mobile.
- Out of scope: authoring/content model (see companion EDS Authoring ticket); the Help/FAQ destination page itself.

## Business Rules (authoritative — do not rely on Figma)
1. The bar displays a **message** and a single **CTA** linking to the Help/FAQ page.
2. The **CTA is mandatory** for the bar to render; if no CTA link is configured, the bar is not shown (a support bar with no working link is invalid).
3. The **message is mandatory**; a supporting line is optional.
4. The CTA opens the Help/FAQ destination in the **same tab**.
5. The bar is **not persona-specific** — identical for Guest, Caregiver, and Leader.
6. On mobile the CTA wraps below the message; the CTA hit area is **≥44×44px**.
7. Brand: CTA uses GS green `#005640`; message text meets contrast (normal text ≥4.5:1).

## Visual Reference (non-authoritative)
Figma node 2751-47483 — Desktop 1280×85, Tablet 768×120, Mobile 360×139. Message: Girl Scout 18/22; supporting line: Trefoil Sans 20/21; CTA "View help & faqs": Trefoil Sans 16/21, green `#005640`. *(Reference only — the Business Rules above govern acceptance.)*

## Acceptance Criteria (acceptance conditions only — Given/When/Then)
Each criterion states the single condition required for acceptance; QA verifies pass/fail objectively.

**AC1 — Bar renders with valid content**
- Given the block has a message and a CTA link
- When a visitor loads the page
- Then the support bar displays the message and the CTA.

**AC2 — CTA navigates to Help/FAQ**
- Given the support bar is displayed
- When the visitor activates the CTA
- Then the browser navigates to the configured Help/FAQ page in the same tab.

**AC3 — Bar suppressed when CTA link is missing**
- Given no CTA link is configured
- When the page renders
- Then the support bar is not displayed (no empty bar).

**AC4 — Optional supporting line**
- Given no supporting line is provided
- When the bar renders
- Then the bar displays the message and CTA with no empty gap where the supporting line would be.

**AC5 — Responsive (mobile)**
- Given a 360px viewport
- When the bar renders
- Then the CTA wraps below the message, all text is visible, there is no horizontal scroll, and the CTA hit area is ≥44×44px.

**AC6 — Keyboard operability**
- Given a keyboard user
- When they tab to the CTA and press Enter
- Then a visible focus indicator is shown and the CTA activates (navigates as in AC2).

**AC7 — Accessibility (WCAG 2.1 AA)**
- Given assistive technology
- When the visitor reaches the bar
- Then the CTA exposes an accessible name matching its visible label, and message text and CTA meet contrast (normal text ≥4.5:1).

**AC8 — Performance**
- Given the page loads
- When the bar renders
- Then it causes no cumulative layout shift and does not block LCP.

## Definition of Done (shippable)
- All AC pass on Desktop, Tablet, and Mobile in a supported browser.
- Renders correctly for Guest, Caregiver, and Leader (identical).
- No console errors; passes lint and Lighthouse accessibility/performance budget.
- Verified against the Business Rules above (not just Figma).

## Dependencies
- EDS Authoring ticket (provides the content model this frontend renders).
- Help/FAQ destination page must exist for the CTA link.

## Implementation Notes (for developers — not required for QA acceptance)
- Rendered by the EDS block in the lazy phase; content authored in DA.
- Suggested block name/table: `Need Help`.
- CTA color token: GS green `#005640` (map to the GSUSA design token in styles.css).
