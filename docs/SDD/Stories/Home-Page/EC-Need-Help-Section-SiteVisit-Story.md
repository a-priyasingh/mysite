# ACCS Site Visit Story — "Need Help" Section (Frontend Rendering & UX)

**Type:** Story (ACCS Site Visit / Frontend)
**Component:** EDS Storefront (DA) — Content / CTA Block
**Related design:** Figma node 2751-47483 — `Need Help_Section` (Desktop 1280×85, Tablet 768×120, Mobile 360×139).
**Companion story:** EDS Authoring — "Need Help" Section (content model & authoring).
**Stream:** ACCS Site Visit (frontend rendering + user experience).

---

## User Story
**As a** girlscoutshop.com visitor,
**I want** a "Need Help" section that shows the support message and a link to help/FAQs,
**so that** I can quickly get support or answers to my questions.

---

## Design Specs (from Figma)
- Compact strip; content max ~1168; height ~85 (desktop).
- **Message (heading)**: Girl Scout 400 18/22, black.
- **Supporting line**: Trefoil Sans 400 20/21, black.
- **CTA**: "View help & faqs" — Trefoil Sans 500 16/21, green `#005640`, with arrow icon.
- **Responsive**: Desktop 1280×85, Tablet 768×120, Mobile 360×139 (content stacks / CTA wraps below on mobile).

### Hover / Touch
- CTA: underline + green `#005640` emphasis on hover; arrow nudges right ~4px.
- ≥44×44px tap target on mobile; respects `prefers-reduced-motion`.

---

## Acceptance Criteria (Behavior-based — pass/fail)

### Rendering under different content conditions
| # | Condition | Pass condition |
|---|-----------|----------------|
| R1 | All fields provided | Message, supporting line, and CTA all render in the designed layout. |
| R2 | Supporting line empty | Section renders message + CTA only; no empty gap where the supporting line would be. |
| R3 | CTA fields empty | Section renders message (and supporting line) with no CTA; layout remains intact. |
| R4 | Message empty | Section renders remaining elements; no broken layout, no placeholder text. |
| R5 | All fields empty | Section does not render a broken/empty shell (either collapses or renders nothing) — no visual defect. |

### Interaction behavior
| # | Behavior | Pass condition |
|---|----------|----------------|
| I1 | CTA navigation | Activating the CTA navigates to the authored Help/FAQ URL. |
| I2 | CTA opens correctly | Link opens in the correct target (same tab unless configured otherwise); no dead/`#` link when a URL is set. |
| I3 | Keyboard activation | CTA is reachable by Tab and activates with Enter/Space. |

### Responsive behavior
| # | Behavior | Pass condition |
|---|----------|----------------|
| P1 | Desktop (≥1200px) | Renders as a single-row strip (~85px) matching the Desktop design. |
| P2 | Tablet (768px) | Layout adapts (≈120px) without overflow or clipping. |
| P3 | Mobile (360px) | Content stacks / CTA wraps below; no horizontal scroll; text fully visible. |
| P4 | Touch target | CTA hit area ≥44×44px on mobile. |

### Accessibility behavior (WCAG 2.1 AA)
| # | Behavior | Pass condition |
|---|----------|----------------|
| X1 | Focus visible | CTA shows a visible focus indicator (≥3:1 contrast) on keyboard focus. |
| X2 | Accessible name | CTA has an accessible name reflecting its label (not "click here"/empty). |
| X3 | Heading semantics | The message uses appropriate heading/text semantics; reading order is logical. |
| X4 | Contrast | Text and CTA meet contrast requirements (normal text ≥4.5:1). |
| X5 | Reduced motion | Hover/arrow motion is disabled when `prefers-reduced-motion` is set. |

### Performance
| # | Behavior | Pass condition |
|---|----------|----------------|
| F1 | No layout shift | Section causes no CLS on load. |
| F2 | Non-blocking | Section does not block LCP (loads in lazy phase where applicable). |

---

## Acceptance Criteria (Given / When / Then)

### Rendering under different content conditions
**Scenario R1 — All fields provided**
- **Given** the Need Help block has a message, supporting line, and CTA
- **When** a visitor loads the page
- **Then** the message, supporting line, and CTA all render in the designed layout.

**Scenario R2 — Supporting line empty**
- **Given** the block has a message and CTA but no supporting line
- **When** the section renders
- **Then** only the message and CTA show, with no empty gap where the supporting line would be.

**Scenario R3 — CTA omitted**
- **Given** the block has no CTA label/link
- **When** the section renders
- **Then** the message (and supporting line) render with no CTA and the layout stays intact.

**Scenario R4 — Message empty**
- **Given** the block has no message
- **When** the section renders
- **Then** the remaining elements render with no broken layout and no placeholder text.

**Scenario R5 — All fields empty**
- **Given** the block has no content
- **When** the page renders
- **Then** no broken/empty shell is shown (the section collapses or renders nothing).

### Interaction behavior
**Scenario I1 — CTA navigation**
- **Given** the CTA has an authored URL
- **When** the visitor activates the CTA
- **Then** the browser navigates to the authored Help/FAQ URL.

**Scenario I2 — Keyboard activation**
- **Given** a keyboard user is on the page
- **When** they Tab to the CTA and press Enter/Space
- **Then** the CTA activates and navigates to its URL.

### Responsive behavior
**Scenario P1 — Desktop**
- **Given** a viewport ≥1200px
- **When** the section renders
- **Then** it displays as a single-row strip (~85px) per the Desktop design.

**Scenario P2 — Mobile**
- **Given** a 360px viewport
- **When** the section renders
- **Then** content stacks / the CTA wraps below, with no horizontal scroll and all text visible, and the CTA hit area is ≥44×44px.

### Accessibility behavior (WCAG 2.1 AA)
**Scenario X1 — Visible focus**
- **Given** a keyboard user
- **When** the CTA receives focus
- **Then** a visible focus indicator (≥3:1 contrast) is shown.

**Scenario X2 — Accessible name & contrast**
- **Given** a screen-reader / assistive-tech user
- **When** they reach the CTA
- **Then** the CTA exposes an accessible name matching its label, and text/CTA meet contrast (normal text ≥4.5:1).

**Scenario X3 — Reduced motion**
- **Given** the user has `prefers-reduced-motion` enabled
- **When** they hover/focus the CTA
- **Then** the hover/arrow motion is disabled.

### Performance
**Scenario F1 — No layout shift**
- **Given** the page is loading
- **When** the Need Help section renders
- **Then** it causes no cumulative layout shift and does not block LCP.

---

## Commerce Data Flow
- **None** — authored content only; CTA is an authored link to the Help/FAQ page. No ACCS catalog data.

## Dependencies
- EDS Authoring story (provides the content model this frontend renders).
- Help / FAQ page (CTA target).

## Open Items
- Confirm CTA target URL (Help/FAQ page path).
- Confirm placement (home footer-area strip and/or other pages).
- Confirm exact hover behavior with design (none defined in Figma).
