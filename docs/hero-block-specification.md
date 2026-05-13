# Hero Block

**Map to:** Page Heading Hero Component

A full-width banner that introduces the page with a background image, heading, and optional call-to-action.

---

## Summary

| Property | Value |
|---|---|
| **Status** | GREENED |
| **Region** | CUSA |
| **Page Type** | Explore/Landing Page, Product Detail Page |
| **Customization** | Custom |
| **EDS Complexity** | Medium |
| **Integration Details/End Points** | None |
| **Static or Dynamic?** | Static |
| **Authoring Method** | Document Authoring (DA) — Google Docs / Microsoft Word |
| **Screenshot - Desktop** | See [Variant Screenshots](#variant-screenshots) below |
| **Screenshot - Variations** | See [Variants](#variants) below |
| **Screenshot - Mobile** | See [Variant Screenshots](#variant-screenshots) below |
| **URLs** | [Volumescope SEM](https://www.thermofisher.com/us/en/home/electron-microscopy/products/scanning-electron-microscopes/volumescope-sem.html), [Environmental](https://www.thermofisher.com/us/en/home/industrial/environmental.html), [Carrier Screening](https://www.thermofisher.com/us/en/home/clinical/clinical-genomics/reproductive-health-solutions/reproductive-health-education/carrier-screening-information.html) |
| **Description** | A full-width banner that introduces the page with a background image, heading, and optional call-to-action. The H1 heading is the first heading on the page (authored as default content above the block, or as the page title in metadata). Supports foreground images, gradient overlays, and dual CTAs. |
| **Comments** | Breadcrumb is auto-generated from the site navigation hierarchy and is not authored in the block. |

---

## Authoring Criteria

Authors create the Hero block in a Google Doc or Microsoft Word document using a block table. The block table header row contains the block name and variant (e.g., `Hero`, `Hero (foreground-image)`).

- **Image** — required. The hero background image. Author inserts an image into the appropriate table cell.
- **Subtitle** — optional. Secondary text below the heading. Authored as plain text in its own row.
- **Description (rich text)** — optional. Supporting body copy. Authored as rich text (bold, italic, links supported) in its own row.
- **CTA text + link** — optional. A call-to-action button. Author creates a link in the CTA row. Can add 0, 1, or 2 CTAs separated into individual rows or combined in one row.
- **Foreground Image** — optional. A product or decorative image overlaid on the background. Author inserts a second image in a dedicated row.

> The H1 heading is authored as the first heading on the page (above the block table, as default content) or derived from page metadata. It is **not** authored inside the Hero block table.

> Breadcrumb is auto-generated from the site navigation structure — it is not authored in the block.

---

## Variants

Variants are specified in the block table header row in parentheses, e.g., `Hero (gradient-overlay)`. Multiple variants can be combined, e.g., `Hero (gradient-overlay, center-align)`.

| Variant | Description | Reference |
|---|---|---|
| **default** | Text is white and aligned to the left | (Default hero with white left-aligned text over background image) |
| **dark-text** | Text is black | (Hero with dark/black text for use on lighter background images) |
| **center-align** | Text is centered on the hero | (Hero with centered heading text) |
| **foreground-image** | Includes both a background image and a foreground image | [Volumescope SEM](https://www.thermofisher.com/us/en/home/electron-microscopy/products/scanning-electron-microscopes/volumescope-sem.html) |
| **gradient-overlay** | Dark gradient overlay on top of background image | [Environmental](https://www.thermofisher.com/us/en/home/industrial/environmental.html) |
| **image-focal-center** | Background image focal point is centered; heading is centered | [Carrier Screening](https://www.thermofisher.com/us/en/home/clinical/clinical-genomics/reproductive-health-solutions/reproductive-health-education/carrier-screening-information.html#resources) |

---

## Variant Screenshots

### foreground-image
- **URL:** https://www.thermofisher.com/us/en/home/electron-microscopy/products/scanning-electron-microscopes/volumescope-sem.html
- **Description:** Hero with light gray background, left-aligned H1 "Volumescope 2 SEM", breadcrumb trail (Electron Microscopes > Scanning Electron Microscopes > Volumescope 2 SEM), two CTA buttons ("Contact us" primary red, "Download datasheet" outline), and a large foreground product image (3D SEM sample block + microscope instrument) on the right side.

### gradient-overlay
- **URL:** https://www.thermofisher.com/us/en/home/industrial/environmental.html
- **Description:** Hero with full-bleed nature/grass background image, dark gradient overlay for text legibility, breadcrumb trail (Home > Industrial and Applied Sciences > Environmental), white left-aligned H1 "Environmental", no CTAs, no foreground image.

### image-focal-center
- **URL:** https://www.thermofisher.com/us/en/home/clinical/clinical-genomics/reproductive-health-solutions/reproductive-health-education/carrier-screening-information.html#resources
- **Description:** Hero with full-bleed teal/blue science-themed background image (DNA helix, embryo), background image focal point centered, breadcrumb trail (Molecular Testing Solutions > Reproductive Health Education), white center-aligned H1 "Carrier Screening Information", no CTAs, no foreground image.

---

## Acceptance Criteria

### Author Acceptance Criteria

- Author can create a Hero block by inserting a table in Google Docs / Word with the header row `Hero` (or `Hero (variant-name)`).
- Author can insert a background image into the designated image row of the block table.
- Author can optionally insert a foreground image in a separate row (used with `foreground-image` variant).
- Author can enter a subtitle as plain text in the subtitle row.
- Author can enter rich text (bold, italic, links) in the description row.
- Author can add 0, 1, or 2 CTAs by creating hyperlinks in the CTA row(s). CTA style (Primary / Outline) is indicated by the text format or a keyword in the row.
- Author specifies variants in the block table header row in parentheses, e.g., `Hero (gradient-overlay)`.
- H1 heading is authored as the first heading on the page above the block table (default content), not inside the block.
- The block table structure is clear and intuitive — each row serves one purpose.

### End User Acceptance Criteria

- Hero renders full-width with the background image covering the banner area.
- H1 heading displays the page title prominently.
- Breadcrumb trail renders above the heading with correct navigation hierarchy (auto-generated).
- CTAs are clickable and navigate to the correct URLs.
- Foreground image (when present) renders overlaid on the right side of the hero.
- Gradient overlay (when enabled) provides sufficient contrast for white text over the background image.
- `image-focal-center` variant centers the background image focal point and centers the heading text.
- Hero is fully responsive across desktop (1200px+), tablet (600px–1199px), and mobile (<600px).
- Hero meets WCAG 2.1 AA accessibility standards (contrast ratios, alt text on images, heading hierarchy).

### Developer Notes

- Block decoration code (`blocks/hero/hero.js`) receives the block table DOM and transforms it into the rendered hero structure.
- Variants are applied as CSS classes on the block wrapper element, derived from the block table header row.
- H1 is default content authored above the block — the `decorate` function should not create or duplicate the H1.
- Breadcrumb is handled globally (auto-blocking or header/navigation logic), not by the Hero block itself.
- Background image uses `object-fit: cover` with focal point alignment controlled by variant class.
- The block must handle optional rows gracefully — if subtitle, description, CTA, or foreground image rows are omitted, the block still renders correctly.

---

## Technical Details

### 1. Document Authoring Contract

#### 1.1 Block Table Structure

Authors create the Hero block as a table in Google Docs or Microsoft Word. The first row contains the block name and optional variant(s). Subsequent rows contain the block content.

**Default variant:**

| Hero | |
|---|---|
| (background image) | |
| Subtitle text | |
| Description rich text | |
| [CTA Label](url) | |

**foreground-image variant:**

| Hero (foreground-image) | |
|---|---|
| (background image) | (foreground image) |
| Subtitle text | |
| Description rich text | |
| [Primary CTA Label](url) | |
| [Secondary CTA Label](url) | |

**gradient-overlay variant:**

| Hero (gradient-overlay) | |
|---|---|
| (background image) | |

**image-focal-center variant:**

| Hero (image-focal-center) | |
|---|---|
| (background image) | |

#### 1.2 Block Table Rows

| Row # | Content | Required? | Notes |
|---|---|---|---|
| Header | Block name + variant, e.g., `Hero` or `Hero (foreground-image)` | Yes | Variant in parentheses; multiple variants comma-separated |
| 1 | Background image (col 1), Foreground image (col 2, optional) | Yes (col 1) | Author inserts image(s) directly into the cell. Col 2 only used for `foreground-image` variant |
| 2 | Subtitle | No | Plain text. If omitted, row is skipped |
| 3 | Description | No | Rich text — supports bold, italic, links, lists |
| 4 | Primary CTA | No | Hyperlink — link text becomes button label, URL becomes button target |
| 5 | Secondary CTA | No | Hyperlink — same format as primary CTA |

#### 1.3 Variant Specification

Variants are declared in the header row of the block table:

| Syntax in Header Row | Resulting CSS Classes |
|---|---|
| `Hero` | `.hero` (default) |
| `Hero (dark-text)` | `.hero.dark-text` |
| `Hero (center-align)` | `.hero.center-align` |
| `Hero (foreground-image)` | `.hero.foreground-image` |
| `Hero (gradient-overlay)` | `.hero.gradient-overlay` |
| `Hero (image-focal-center)` | `.hero.image-focal-center` |
| `Hero (gradient-overlay, center-align)` | `.hero.gradient-overlay.center-align` |

#### 1.4 Content Above the Block (Default Content)

The H1 heading is authored as **default content** above the Hero block table. In the Google Doc / Word document, the author types the page heading as a Heading 1 before inserting the Hero block table.

Example document structure:
```
# Volumescope 2 SEM        ← H1 (default content, above block table)

| Hero (foreground-image) |                          |
|-------------------------|--------------------------|
| [background image]      | [foreground image]       |
|                         |                          |
| [Contact us](url)       |                          |
| [Download datasheet](url)|                         |
```

#### 1.5 Metadata Sheet

Page-level metadata (title, description, image) is authored in a **Metadata** block table at the bottom of the document:

| Metadata | |
|---|---|
| title | Volumescope 2 SEM |
| description | 3D SEM serial block-face imaging... |
| image | (og:image for social sharing) |

The page title in the Metadata table should match the H1 authored as default content above the Hero block.

---

### 2. Block Implementation

#### 2.1 File Structure

```
blocks/
  hero/
    hero.js      # Block decoration JavaScript
    hero.css     # Block styles
```

#### 2.2 Delivered HTML (after aem.live processing)

When the document is previewed/published, the aem.live pipeline converts the block table into the following HTML structure:

```html
<div class="hero-wrapper">
  <div class="hero block" data-block-name="hero" data-block-status="loaded">
    <div>                          <!-- Row 1: Images -->
      <div>
        <picture>...</picture>     <!-- Background image -->
      </div>
      <div>
        <picture>...</picture>     <!-- Foreground image (if present) -->
      </div>
    </div>
    <div>                          <!-- Row 2: Subtitle -->
      <div>
        <p>Subtitle text</p>
      </div>
    </div>
    <div>                          <!-- Row 3: Description -->
      <div>
        <p>Description rich text</p>
      </div>
    </div>
    <div>                          <!-- Row 4: Primary CTA -->
      <div>
        <p><a href="url">CTA Label</a></p>
      </div>
    </div>
    <div>                          <!-- Row 5: Secondary CTA -->
      <div>
        <p><a href="url">CTA Label</a></p>
      </div>
    </div>
  </div>
</div>
```

For variant blocks, classes are added to the outer div:

```html
<div class="hero gradient-overlay block" data-block-name="hero" data-block-status="loaded">
```

#### 2.3 Block Decoration (hero.js)

The `decorate` function transforms the delivered HTML into the final rendered structure:

```javascript
export default async function decorate(block) {
  // 1. Extract rows from the block table
  // 2. Identify background image, foreground image, subtitle, description, CTAs
  // 3. Build the final hero DOM structure
  // 4. Handle optional rows gracefully (missing subtitle, no CTAs, etc.)
  // 5. Apply variant-specific behavior if needed
}
```

#### 2.4 Styling (hero.css)

Key styling considerations:

| Concern | Approach |
|---|---|
| Full-width layout | `.hero-wrapper` spans full viewport width |
| Background image | `background-size: cover; background-position: center` or `<picture>` with `object-fit: cover` |
| Foreground image | Absolutely positioned or flexbox-aligned to the right |
| Text overlay | `position: relative` / `z-index` layering over the background |
| Gradient overlay | `::before` or `::after` pseudo-element with `linear-gradient` |
| dark-text variant | `.hero.dark-text` sets `color: #000` or dark color token |
| center-align variant | `.hero.center-align` sets `text-align: center` with centered flexbox |
| image-focal-center | `.hero.image-focal-center` adjusts `background-position` and centers text |
| Responsive | Mobile-first; `min-width` breakpoints at 600px / 900px / 1200px |

---

### 3. Authoring Examples in Google Docs

#### Example 1: Default Hero (Environmental page)

In Google Docs, the author creates:

1. **Above the table (default content):** Type "Environmental" and format as Heading 1
2. **Insert table:** 1 column × 1 row
3. **Header row:** Type `Hero (gradient-overlay)`
4. **Row 1:** Insert the background image (nature/grass photo)

That's it — no subtitle, no description, no CTAs needed for this variant.

#### Example 2: Foreground Image Hero (Volumescope page)

1. **Above the table:** Type "Volumescope 2 SEM" as Heading 1
2. **Insert table:** 2 columns × 4 rows
3. **Header row:** Type `Hero (foreground-image)`
4. **Row 1, Col 1:** Insert background image (gray gradient)
5. **Row 1, Col 2:** Insert foreground image (3D SEM + microscope)
6. **Row 2:** Leave empty (no subtitle)
7. **Row 3:** Type "Contact us" and hyperlink to the contact form URL
8. **Row 4:** Type "Download datasheet" and hyperlink to the datasheet URL

#### Example 3: Image Focal Center Hero (Carrier Screening page)

1. **Above the table:** Type "Carrier Screening Information" as Heading 1
2. **Insert table:** 1 column × 1 row
3. **Header row:** Type `Hero (image-focal-center)`
4. **Row 1:** Insert the background image (teal DNA/embryo image)

---

### 4. Derived / Auto-Generated Content

| Content | Source | How It Works |
|---|---|---|
| H1 Heading | Default content above block table | Author types H1 as Heading 1 in the doc; rendered above the hero by EDS page decoration |
| Breadcrumb | Site navigation hierarchy | Auto-generated from the page's position in the content tree; not authored in the block |
| Page Metadata | Metadata block table at bottom of doc | Title, description, og:image for SEO and social sharing |
