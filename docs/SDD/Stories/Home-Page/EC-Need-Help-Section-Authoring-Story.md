# EDS Authoring Story — "Need Help" Section (Content Model & Authoring)

**Type:** Story (EDS Authoring)
**Component:** EDS Storefront (DA) — Content / CTA Block
**Related design:** Figma node 2751-47483 — `Need Help_Section` (Desktop 1280×85, Tablet 768×120, Mobile 360×139).
**Companion story:** ACCS Site Visit — "Need Help" Section (frontend rendering + UX).
**Stream:** EDS Authoring (content model, authoring rules, preview).

---

## User Story
**As a** content author,
**I want** to author the "Need Help" section's message, supporting line, and CTA (label + link) in DA,
**so that** I can create and maintain the support prompt without developer involvement.

---

## Content Model

| Displayed data | Content is sourced from | Required |
|----------------|-------------------------|----------|
| Message / heading (Need Help?) | EDS | N |
| Supporting line | EDS | N |
| CTA label ("View help & faqs") | EDS | N |
| CTA link (Help/FAQ page) | EDS | N |

- Authored as a block table (e.g., **`Need Help`**) in the page document.
- All fields are optional (no mandatory field).

---

## Acceptance Criteria (Authoring — pass/fail)

| # | Criterion | Pass condition |
|---|-----------|----------------|
| A1 | Block can be added in DA | Author can insert the `Need Help` block into a page document and it appears in preview. |
| A2 | Message is authorable | Author-entered message text renders in the block; editing it updates the rendered text after preview/publish. |
| A3 | Supporting line is authorable | Author-entered supporting line renders; if left empty, no supporting line is output (block still renders). |
| A4 | CTA label is authorable | Author-entered CTA label renders on the CTA; if empty, no CTA is output. |
| A5 | CTA link is authorable | Author-entered URL is applied to the CTA `href`; the CTA is not rendered as a link if no URL is provided. |
| A6 | No field is mandatory | The block saves and renders with any subset of fields filled (including none) without error. |
| A7 | Graceful blank | For each empty field, only that element is omitted; the block never breaks or shows placeholder text. |
| A8 | Preview reflects authoring | Changes are visible in DA preview before publish, matching what will render live. |

---

## Dependencies
- DA authoring environment / block registration.
- Help / FAQ page must exist for the CTA link target (authored URL).

## Open Items
- Confirm the block name/table label used in DA.
- Confirm default/fallback behavior if the author provides a link but no CTA label.
