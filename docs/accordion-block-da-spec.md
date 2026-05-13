# Accordion Block

**Map to:** Accordion / FAQ List Component

A collapsible panel block where each item has a clickable header that expands/collapses to reveal content. Used for FAQs, product specifications, and any content that benefits from progressive disclosure.

---

## Summary

| Property | Value |
|---|---|
| **Status** | GREENED |
| **Region** | CUSA |
| **Page Type** | All page types |
| **Customization** | Custom |
| **EDS Complexity** | Medium |
| **Integration Details/End Points** | Fragment pages fetched via `.plain.html` for complex content panels |
| **Static or Dynamic?** | Static (content) / Dynamic (expand/collapse interaction) |
| **Authoring Method** | Document Authoring (DA) — Google Docs / Microsoft Word |
| **Screenshot - Desktop** | See [Variant Screenshots](#variant-screenshots) below |
| **Screenshot - Variations** | See [Variants](#variants) below |
| **Screenshot - Mobile** | See [Variant Screenshots](#variant-screenshots) below |
| **URLs** | (Reference URLs from thermofisher.com where accordion is used) |
| **Description** | A collapsible panel block with repeatable items. Each item has a panel title (clickable header) and panel body (rich text or fragment reference). Supports multiple style variants. Replaces AEM 6.4 FAQ List / Accordion component. |
| **Comments** | Two usage patterns: (1) Simple FAQ content authored inline in column 2, (2) Complex content via fragment page link in column 2. Block JS handles both patterns. |

---

## Authoring Criteria

Authors create the Accordion block in a Google Doc or Microsoft Word document using a **2-column block table**. The header row contains the block name and optional variant. Each subsequent row represents one collapsible panel.

- **Panel Title** — required. The clickable header for each collapsible panel. Authored in **column 1** of each row.
- **Panel Body (simple)** — optional. Rich text content for the panel. Authored in **column 2** of each row. Supports bold, italic, links, lists, images.
- **Panel Body (complex via fragment)** — optional. For panels that need complex content (columns, video, product lists), author places a **hyperlink to a fragment page** in column 2 instead of inline content.
- **Style Variant** — optional. Specified in the header row in parentheses.

> Each row in the table = one accordion item. Authors add, remove, or reorder items by adding, deleting, or moving rows in the table.

> **Simple vs Complex content:** If a panel just needs text, author it directly in column 2. If it needs multi-block layouts (columns, video, etc.), create a separate fragment page with that content and link to it in column 2.

---

## Variants

Variants are specified in the block table header row in parentheses, e.g., `Accordion (icon-left)`.

| Variant | Description | Reference |
|---|---|---|
| **default** | Standard accordion with expand/collapse arrows on the right | Default FAQ-style accordion |
| **icon-left** | Expand/collapse icon positioned on the left side of the header | Used when icon placement on the left improves scannability |
| **classic-small** | Compact accordion with smaller text and tighter spacing | Used for dense content areas or sidebar FAQs |
| **classic-gray** | Accordion with gray background panels | Used for visually distinct FAQ sections |

---

## Variant Screenshots

### default
- **Description:** Standard accordion with panel titles as clickable headers. Expand/collapse chevron icon on the right. Panel body content appears below the header when expanded. Clean white background.

### icon-left
- **Description:** Same as default but the expand/collapse icon is positioned on the left side of the panel title, before the text.

### classic-small
- **Description:** Compact version with smaller font size for titles and tighter vertical padding. Suitable for sidebar or secondary content areas.

### classic-gray
- **Description:** Accordion panels have a light gray background. Provides visual separation from surrounding white content areas.

---

## Acceptance Criteria

### Author Acceptance Criteria

- Author can create an Accordion block by inserting a 2-column table in Google Docs / Word with the header row "Accordion" (or "Accordion (variant-name)").
- Author can add accordion items by adding rows — column 1 for panel title, column 2 for panel body.
- Author can add, remove, or reorder accordion items by manipulating table rows.
- Author can enter rich text (bold, italic, links, lists, images) in the panel body column.
- Author can link to a fragment page in column 2 for complex content panels (columns, video, product lists).
- Author specifies variants in the header row in parentheses, e.g., "Accordion (icon-left)".
- The block table structure is intuitive — each row is one panel, column 1 is always the title, column 2 is always the body.

### End User Acceptance Criteria

- Accordion renders with all panels collapsed by default.
- Clicking a panel title expands/collapses the panel body with smooth animation.
- Only one panel is open at a time (or multiple, depending on variant — define behavior).
- Panel body content renders correctly — rich text, images, links, lists.
- Fragment-referenced panels render the fragment content inline (including any blocks within the fragment).
- Accordion is fully responsive across desktop (1200px+), tablet (600px–1199px), and mobile (<600px).
- Accordion meets WCAG 2.1 AA accessibility standards (keyboard navigation, ARIA attributes, focus management).
- Screen readers announce panel state (expanded/collapsed).

### Developer Notes

- Block decoration code (`blocks/accordion/accordion.js`) receives the block table DOM and transforms it into `<details>`/`<summary>` HTML structure.
- Variants are applied as CSS classes on the block wrapper element, derived from the header row.
- Each table row maps to one `<details>` element: column 1 → `<summary>`, column 2 → panel body `<div>`.
- Fragment detection: if column 2 contains only a single link (and no other content), treat it as a fragment reference → fetch the linked page's `.plain.html` → render and decorate blocks inside the panel.
- If column 2 contains inline rich text, render it directly as the panel body.
- The block must handle empty panel bodies gracefully (title-only rows).
- Add appropriate ARIA attributes: `aria-expanded`, `aria-controls`, `role` as needed.

---

## Technical Details

### 1. Document Authoring Contract

#### 1.1 Block Table Structure

Authors create the Accordion block as a **2-column table** in Google Docs or Microsoft Word. The first row contains the block name and optional variant. Each subsequent row represents one accordion panel.

**Standard accordion (FAQ pattern):**

| Accordion | |
|---|---|
| What is Western Blotting? | Western blotting is a technique used to detect specific proteins in a sample. |
| How does it work? | The process involves separating proteins by gel electrophoresis, transferring them to a membrane, and probing with antibodies. |
| What are the applications? | Western blotting is used in molecular biology, biochemistry, and immunogenetics research. |

**Accordion with fragment reference (complex content):**

| Accordion | |
|---|---|
| Product Specifications | [View specifications](/fragments/product-specs) |
| Installation Guide | [View guide](/fragments/installation-guide) |
| Simple FAQ | This is plain text content that doesn't need a fragment. |

**Accordion with variant:**

| Accordion (icon-left) | |
|---|---|
| Panel Title 1 | Panel body content 1 |
| Panel Title 2 | Panel body content 2 |

#### 1.2 Block Table Rows

| Row # | Column 1 | Column 2 | Required? | Notes |
|---|---|---|---|---|
| Header | Block name + variant, e.g., `Accordion` or `Accordion (icon-left)` | (empty or merged) | Yes | Variant in parentheses; determines CSS class |
| 1..N | Panel Title (plain text) | Panel Body (rich text OR fragment link) | Col 1: Yes, Col 2: Optional | Each row = one collapsible panel. Author adds as many rows as needed |

#### 1.3 Variant Specification

Variants are declared in the header row of the block table:

| Syntax in Header Row | Resulting CSS Classes |
|---|---|
| `Accordion` | `.accordion` (default) |
| `Accordion (icon-left)` | `.accordion.icon-left` |
| `Accordion (classic-small)` | `.accordion.classic-small` |
| `Accordion (classic-gray)` | `.accordion.classic-gray` |

#### 1.4 Two Content Patterns in Column 2

The accordion block supports two content patterns in column 2, determined automatically by the block JS:

**Pattern 1: Inline Rich Text (Simple FAQ)**

Author types or pastes content directly into column 2. Supports bold, italic, links, lists, images, tables.

```
Column 1: "What is carrier screening?"
Column 2: "Carrier screening is a genetic testing approach used to determine
           whether an individual or couple carries pathogenic variants..."
```

**Pattern 2: Fragment Reference (Complex Content)**

Author inserts a hyperlink to a fragment page in column 2. The link is the only content in the cell.

```
Column 1: "Product Specifications"
Column 2: "View specifications" (hyperlinked to /fragments/product-specs)
```

The block JS detects this pattern (single link as only content) and fetches the linked page's `.plain.html` at render time, decorating any blocks within it.

**When to use which:**

| Content Type | Pattern | Why |
|---|---|---|
| Plain text, lists, bold/italic | Inline rich text | Simple — no fragment page needed |
| Text with a few links or images | Inline rich text | Still simple enough for inline |
| Multi-column layouts | Fragment reference | Requires Columns block — not possible inline |
| Embedded video | Fragment reference | Requires Video block |
| Product lists, forms, complex layouts | Fragment reference | Requires multiple blocks |

#### 1.5 Fragment Pages

Fragment pages are regular pages authored in Google Docs that contain the complex content. They are stored in a `/fragments/` path (convention, not enforced).

Example fragment page structure (a separate Google Doc):
```
Product Specifications        ← H1 (optional, may be hidden)

┌─────────────────┬──────────────────┐
│ Columns         │                  │
├─────────────────┼──────────────────┤
│ Specification A │ Value A          │
│ Specification B │ Value B          │
└─────────────────┴──────────────────┘

(Embedded video or other blocks can follow)
```

The accordion block JS fetches this fragment's `.plain.html` and renders it inside the accordion panel, including decorating any blocks within it.

---

### 2. Block Implementation

#### 2.1 File Structure

```
blocks/
  accordion/
    accordion.js      # Block decoration JavaScript
    accordion.css     # Block styles
```

#### 2.2 Delivered HTML (after aem.live processing)

When the document is previewed/published, the aem.live pipeline converts the block table into this HTML:

```html
<div class="accordion-wrapper">
  <div class="accordion block" data-block-name="accordion" data-block-status="loaded">
    <div>                              <!-- Row 1: Accordion item 1 -->
      <div>                            <!-- Column 1: Panel title -->
        <p>What is Western Blotting?</p>
      </div>
      <div>                            <!-- Column 2: Panel body -->
        <p>Western blotting is a technique used to detect...</p>
      </div>
    </div>
    <div>                              <!-- Row 2: Accordion item 2 -->
      <div>
        <p>How does it work?</p>
      </div>
      <div>
        <p>The process involves separating proteins...</p>
      </div>
    </div>
  </div>
</div>
```

For variant blocks:
```html
<div class="accordion icon-left block" data-block-name="accordion" ...>
```

#### 2.3 Block Decoration (accordion.js)

The `decorate` function transforms the delivered HTML into the final rendered structure:

```javascript
export default async function decorate(block) {
  // For each row (accordion item):
  //   1. Read column 1 → create <details> with <summary> (panel title)
  //   2. Check column 2:
  //      - If single link only → treat as fragment reference
  //        → fetch .plain.html → render inside panel body
  //        → decorate blocks inside fragment
  //      - If rich text content → render as panel body directly
  //      - If empty → render empty panel (title only)
  //   3. Add ARIA attributes for accessibility
  //   4. Add click/keyboard event handling
}
```

**Target rendered DOM:**

```html
<div class="accordion block">
  <details>
    <summary>What is Western Blotting?</summary>
    <div class="accordion-item-body">
      <p>Western blotting is a technique used to detect...</p>
    </div>
  </details>
  <details>
    <summary>How does it work?</summary>
    <div class="accordion-item-body">
      <p>The process involves separating proteins...</p>
    </div>
  </details>
</div>
```

#### 2.4 Fragment Loading Logic

```javascript
// Pseudocode for fragment detection and loading
function isFragmentLink(cell) {
  const links = cell.querySelectorAll('a');
  const text = cell.textContent.trim();
  // Single link as only content = fragment reference
  return links.length === 1
    && text === links[0].textContent.trim();
}

async function loadFragment(href) {
  const resp = await fetch(`${href}.plain.html`);
  if (resp.ok) {
    const html = await resp.text();
    const fragment = document.createElement('div');
    fragment.innerHTML = html;
    // Decorate blocks inside fragment
    decorateBlocks(fragment);
    await loadBlocks(fragment);
    return fragment;
  }
  return null;
}
```

#### 2.5 Styling (accordion.css)

Key styling considerations:

| Concern | Approach |
|---|---|
| Expand/collapse | Native `<details>`/`<summary>` for no-JS baseline; JS enhances animation |
| Chevron icon | CSS `::marker` or `::after` pseudo-element on `<summary>` |
| icon-left variant | `.accordion.icon-left summary` — flex-direction or pseudo-element on left |
| classic-small variant | `.accordion.classic-small` — smaller font-size, tighter padding |
| classic-gray variant | `.accordion.classic-gray details` — gray background-color |
| Panel body spacing | `.accordion-item-body` — padding for content area |
| Borders | Bottom border on each `<details>` for visual separation |
| Responsive | Mobile-first; `min-width` breakpoints at 600px / 900px |
| Accessibility | `:focus-visible` outline on `<summary>`, keyboard navigation |

---

### 3. Authoring Examples in Google Docs

#### Example 1: Simple FAQ Accordion

In Google Docs, the author creates:

1. **Insert table:** 2 columns × 4 rows (header + 3 items)
2. **Header row:** Type `Accordion`
3. **Row 1, Col 1:** Type "What is carrier screening?"
4. **Row 1, Col 2:** Type the answer text (can use bold, italic, links, lists)
5. **Row 2, Col 1:** Type "Who should consider carrier screening?"
6. **Row 2, Col 2:** Type the answer text
7. **Row 3, Col 1:** Type "How accurate is carrier screening?"
8. **Row 3, Col 2:** Type the answer text

That produces a 3-panel FAQ accordion with all content inline.

#### Example 2: Accordion with Complex Content (Fragment)

1. **First, create a fragment page** in a separate Google Doc (e.g., at path `/fragments/product-specs`):
   - Author the complex content (columns block, video embed, tables, etc.)
   - Preview/publish the fragment page

2. **Then, in your main page** create the accordion:
   - **Insert table:** 2 columns × 3 rows
   - **Header row:** Type `Accordion`
   - **Row 1, Col 1:** Type "Product Specifications"
   - **Row 1, Col 2:** Type "View specifications" → select text → Insert Link → paste `/fragments/product-specs`
   - **Row 2, Col 1:** Type "Simple FAQ Question"
   - **Row 2, Col 2:** Type the answer directly (no link needed)

This produces an accordion where panel 1 loads complex fragment content and panel 2 has simple inline text.

#### Example 3: Styled Accordion (icon-left variant)

1. **Insert table:** 2 columns × 3 rows
2. **Header row:** Type `Accordion (icon-left)`
3. Fill in items as per Example 1

The only difference is the header row text — the variant name in parentheses controls the styling.

---

### 4. Derived / Auto-Generated Content

| Content | Source | How It Works |
|---|---|---|
| Expand/collapse state | Browser native (`<details>` element) | All panels start collapsed; user clicks to expand |
| Fragment content | Linked fragment page `.plain.html` | Block JS fetches at render time; blocks inside fragment are decorated |
| ARIA attributes | Block JS decoration | Added programmatically: `aria-expanded`, `aria-controls`, keyboard handlers |

---

### 5. Relationship to AEM 6.4

| AEM 6.4 | DA (EDS) |
|---|---|
| Nested components inside accordion items (parsys per item) | Fragment reference pattern — complex content authored in fragment pages, linked in column 2 |
| FAQ List with FAQ Items (v1) | Same structure — each table row is one accordion item |
| Style System options per template | Variant in header row: `Accordion (icon-left)` |
| Drag-and-drop child items in author UI | Author adds/removes/reorders table rows in Google Doc |
| Content picker for references | Author pastes link URL or uses Insert Link in Google Docs |

---

### 6. Why Fragment Reference for Complex Content

EDS blocks are rendered from flat table rows — you cannot nest a Columns block or Video block inside an accordion panel row in a Google Doc. The fragment reference approach solves this:

1. Author creates complex content as a **separate fragment page** (Google Doc) with full block support
2. Accordion item references the fragment via a **hyperlink in column 2**
3. Accordion block JS **fetches and renders** the fragment inline at delivery time
4. Simple FAQ panels don't need fragments — just type content directly in column 2
