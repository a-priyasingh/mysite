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
| **Screenshot - Desktop** | See [Variant Screenshots](#variant-screenshots) below |
| **Screenshot - Variations** | See [Variants](#variants) below |
| **Screenshot - Mobile** | See [Variant Screenshots](#variant-screenshots) below |
| **URLs** | [Volumescope SEM](https://www.thermofisher.com/us/en/home/electron-microscopy/products/scanning-electron-microscopes/volumescope-sem.html), [Environmental](https://www.thermofisher.com/us/en/home/industrial/environmental.html), [Carrier Screening](https://www.thermofisher.com/us/en/home/clinical/clinical-genomics/reproductive-health-solutions/reproductive-health-education/carrier-screening-information.html) |
| **Description** | A full-width banner that introduces the page with a background image, heading, and optional call-to-action. The H1 heading is pulled automatically from page metadata. Supports breadcrumb overlay, foreground images, gradient overlays, and dual CTAs. |
| **Comments** | H1 is derived from page `jcr:title`, not authored in the block. Breadcrumb content is derived from the site navigation hierarchy. |

---

## Authoring Criteria

- **Image** -- required. The hero background image.
- **Subtitle** -- optional. Secondary text below the heading.
- **Description (rich text)** -- optional. Supporting body copy.
- **CTA text + link** -- optional. A call-to-action button. Can add 0, 1, or 2.
- **Overlay breadcrumb (yes/no)** -- optional. Toggles a breadcrumb trail overlaid on the hero.
- **Foreground Image** -- optional. A product or decorative image overlaid on the background.

> The H1 heading is pulled automatically from page metadata -- authors do not author it within the block.

---

## Variants

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

- Author can add/replace the background image via the asset picker in Universal Editor.
- Author can optionally add a foreground image (used with `foreground-image` variant).
- Author can enter a subtitle (plain text) that renders below the H1.
- Author can enter a description (rich text) that renders below the subtitle.
- Author can add 0, 1, or 2 CTAs with configurable label, URL, open-in-new-tab toggle, and style (Primary/Outline).
- Author can toggle breadcrumb visibility on/off.
- Author can select one or more style variants (dark-text, center-align, foreground-image, gradient-overlay, image-focal-center) from the Style Options multiselect.
- H1 heading automatically reflects the page title (`jcr:title`) without requiring in-block authoring.

### End User Acceptance Criteria

- Hero renders full-width with the background image covering the banner area.
- H1 heading displays the page title prominently.
- Breadcrumb trail (when enabled) renders above the heading with correct navigation hierarchy.
- CTAs are clickable and navigate to the correct URLs; "open in new tab" works when configured.
- Foreground image (when present) renders overlaid on the right side of the hero.
- Gradient overlay (when enabled) provides sufficient contrast for white text over the background image.
- `image-focal-center` variant centers the background image focal point and centers the heading text.
- Hero is fully responsive across desktop (1200px+), tablet (600px-1199px), and mobile (<600px).
- Hero meets WCAG 2.1 AA accessibility standards (contrast ratios, alt text on images, heading hierarchy).

### Developer Notes

- The Hero block is a **leaf block** (flattened). All fields are on the block itself -- no child items, no container behavior, no repeatable groups.
- Dual CTA (0, 1, or 2 buttons) is handled by two fixed CTA field groups (primary + secondary), not by repeatable child items.
- H1 is derived from `jcr:title` on the page node -- it is NOT a field in the block model.
- Breadcrumb content is derived from the content hierarchy / site navigation structure. The block only toggles visibility via `overlayBreadcrumb`.
- Variants are applied as CSS classes on the block wrapper element via the `classes` multiselect field.
- Background image uses `object-fit: cover` with focal point alignment controlled by variant class.

---

## Technical Details

### 1. UE Authoring Contract

#### 1.1 AEM Resource

| Property | Value |
|---|---|
| **Resource Type** | `core/franklin/components/block/v1/block` |
| **Block Name** | Hero |
| **Model ID** | `hero` |
| **Block Type** | Simple (flattened -- leaf block, no children) |
| **Nested Authoring Strategy** | Flattened Block |

#### 1.2 Editable Properties in Universal Editor

When an author clicks the Hero block in Universal Editor, the following fields appear in the properties panel:

| JCR Property | UE Properties Panel | Field Type | Editable? | Notes |
|---|---|---|---|---|
| `classes` | Style Options (multiselect) | multiselect | Yes | Variant selection -- options: `dark-text`, `center-align`, `foreground-image`, `gradient-overlay`, `image-focal-center` |
| `image` | Background Image | reference | Yes | Opens asset picker |
| `imageAlt` | Background Image Alt Text | text | Yes | Collapsed into `image` element |
| `foregroundImage` | Foreground Image | reference | Yes | Optional -- used with `foreground-image` variant |
| `foregroundImageAlt` | Foreground Image Alt Text | text | Yes | Collapsed into `foregroundImage` element |
| `subtitle` | Subtitle | text | Yes | Secondary text below heading |
| `description` | Description | richtext | Yes | Supports bold, italic, links, lists |
| `overlayBreadcrumb` | Show Breadcrumb | boolean (toggle) | Yes | Toggles breadcrumb trail visibility |
| `primaryCtaLabel` | Primary CTA Text | text | Yes | From CTA partial |
| `primaryCtaHref` | Primary CTA URL | text | Yes | From CTA partial |
| `primaryCtaExternal` | Primary CTA New Tab | boolean (toggle) | Yes | From CTA partial |
| `primaryCtaType` | Primary CTA Style | select | Yes | Options: Primary, Outline |
| `secondaryCtaLabel` | Secondary CTA Text | text | Yes | From CTA partial |
| `secondaryCtaHref` | Secondary CTA URL | text | Yes | From CTA partial |
| `secondaryCtaExternal` | Secondary CTA New Tab | boolean (toggle) | Yes | From CTA partial |
| `secondaryCtaType` | Secondary CTA Style | select | Yes | Options: Primary, Outline |

#### 1.3 Container vs Leaf Fields

The Hero block is a **leaf block** (flattened). All fields are on the block itself. There are no child items, no container behavior, and no repeatable groups.

The dual CTA (0, 1, or 2 buttons) is handled by two fixed CTA field groups (primary + secondary), not by repeatable child items.

#### 1.4 References, Fragments, and Nested Items

| Reference Type | Field | UE Behavior |
|---|---|---|
| Background image | `image` (reference) | Opens DAM asset picker -- author browses and selects |
| Foreground image | `foregroundImage` (reference) | Opens DAM asset picker -- same behavior |
| CTA links | `primaryCtaHref`, `secondaryCtaHref` (text) | Author types URL or content path manually |
| H1 heading | Derived from `jcr:title` on page node | Not editable in block -- author edits in Page Properties |
| Breadcrumb trail | Derived from content hierarchy / navigation | Not editable -- `overlayBreadcrumb` shows breadcrumb above Hero block |

No fragments or nested items are used by the Hero block.

#### 1.5 Block Registration -- Component Definition

The Hero block is registered in `component-definition.json` (or `blocks/hero/_hero.json`) so that Universal Editor knows it exists and can present it in the block palette:

```json
{
  "title": "Hero",
  "id": "hero",
  "plugins": {
    "xwalk": {
      "page": {
        "resourceType": "core/franklin/components/block/v1/block",
        "template": {
          "name": "Hero",
          "model": "hero"
        }
      }
    }
  }
}
```

---

### 2. Component Model Definition (Field-Level)

#### 2.1 Field Definitions

| Field | Component | Label | Required | Default | Authored / Derived | Collapsed Into |
|---|---|---|---|---|---|---|
| `image` | reference | Background Image | No | -- | Authored | -- |
| `imageAlt` | text | Background Image Alt | -- | `""` | Authored | Collapsed into `image` |
| `foregroundImage` | reference | Foreground Image | No | -- | Authored | -- |
| `foregroundImageAlt` | text | Foreground Image Alt | Conditional (required if `foregroundImage` is set) | `""` | Authored | Collapsed into `foregroundImage` |
| `subtitle` | text | Subtitle | No | `""` | Authored | -- |
| `description` | richtext | Description | No | `""` | Authored | -- |
| `overlayBreadcrumb` | boolean | Show Breadcrumb | No | `false` | Authored | -- |
| `primaryCtaLabel` | text | Primary CTA Text | No | -- | Authored (CTA partial) | -- |
| `primaryCtaHref` | text | Primary CTA URL | No | -- | Authored (CTA partial) | -- |
| `primaryCtaExternal` | boolean | Primary CTA Open in New Tab | No | `false` | Authored (CTA partial) | -- |
| `primaryCtaType` | select | Primary CTA Style | No | `"primary"` | Authored (CTA partial) | -- |
| `secondaryCtaLabel` | text | Secondary CTA Text | No | -- | Authored (CTA partial) | -- |
| `secondaryCtaHref` | text | Secondary CTA URL | No | -- | Authored (CTA partial) | -- |
| `secondaryCtaExternal` | boolean | Secondary CTA Open in New Tab | No | `false` | Authored (CTA partial) | -- |
| `secondaryCtaType` | select | Secondary CTA Style | No | `"outline"` | Authored (CTA partial) | -- |
| `classes` | multiselect | Style Options | No | `""` (default variant) | Authored | NOT a table row -- applied as CSS class on block wrapper |

#### 2.2 Derived Fields (Not in Block Model)

| Property | Source | Used For | Why Not in Block Model |
|---|---|---|---|
| H1 Heading | `jcr:title` from page properties | Rendered as `<h1>` inside hero | Per specification: "The H1 heading is pulled automatically from page metadata -- authors do not author it within the block" |
| Breadcrumb content | Content hierarchy / site navigation structure | Rendered as breadcrumb trail when `overlayBreadcrumb = true` | Breadcrumb is structural/navigational. Block only toggles visibility. |

#### Governance in component-filters.json

The Hero block is included in the section-level filter:

```json
{
  "id": "section",
  "components": [
    "hero",
    "cards",
    "accordion",
    "tabs",
    "columns",
    "..."
  ]
}
```

The Hero block itself is **not** a container -- it has no filter entry of its own. Authors cannot drop child blocks inside a Hero.
