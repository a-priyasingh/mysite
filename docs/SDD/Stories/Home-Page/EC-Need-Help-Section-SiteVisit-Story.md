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

## Commerce Data Flow
- **None** — authored content only; CTA is an authored link to the Help/FAQ page. No ACCS catalog data.

## Dependencies
- EDS Authoring story (provides the content model this frontend renders).
- Help / FAQ page (CTA target).

## Open Items
- Confirm CTA target URL (Help/FAQ page path).
- Confirm placement (home footer-area strip and/or other pages).
- Confirm exact hover behavior with design (none defined in Figma).
