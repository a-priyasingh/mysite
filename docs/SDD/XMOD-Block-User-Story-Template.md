# XMOD / Model-Driven EDS Block — User Story Template

## Purpose

This template defines everything a user story must capture so that an EDS block
can be developed with a **model-driven workflow (XMOD)** with minimal back-and-forth.

On a Document Authoring / Universal Editor (crosswalk) project, a model-driven block
generator works against three definition files plus field hinting in the authored
content. Whatever the generator is called, these are the artifacts it produces or
consumes, so the user story must supply enough detail to define them unambiguously:

- `component-definition.json` — registers the block and its **title** (the source of truth for the name)
- `component-models.json` — the **field schema** for the block (and for each repeated item)
- `component-filters.json` — what components/blocks are **allowed inside** containers
- **Field hinting** in the authored content cells — required so parsers map cells to model fields

> Note: If your XMOD tooling consumes a different input format (e.g. a single block-model
> spec or a field sheet), the *content* below is still what it needs — only the file
> packaging differs. Confirm the exact input format with your XMOD owner and map these
> sections onto it.

---

## Required Story Sections

### 1. Block Identity
Capture exactly, because names must match across all three JSON files and the markdown title:

| Item | Notes | Example |
|------|-------|---------|
| Block title | Exact, case-sensitive; source of truth | `Carousel` |
| Block name/key | Lowercase block class | `carousel` |
| Variant(s) | Additional classes that switch behavior/style | `carousel (hero)` |
| Block kind | simple / container (composite, repeating) / key-value config | container + repeating item |
| Model id(s) | Container model id and item model id | `carousel`, `carousel-item` |

> For composite/repeating blocks: the **container model** and the **item model** are
> separate. The item model name should end in `-item`. The container model must never
> map to the repeated item.

### 2. Field Model (per model — container AND item)
For every authorable field, specify all columns below. This is the heart of the XMOD input.

| Field name | Component (field type) | Value type | Required | Default / fallback | Validation / constraints | Maps to (rendered element) |
|-----------|------------------------|-----------|----------|--------------------|--------------------------|----------------------------|
| e.g. `heading` | text | string | Yes | — | max 80 chars | `<h2>` |
| e.g. `eyebrow` | text | string | No | hide if empty | — | `.eyebrow` |
| e.g. `image` | reference | string (aem-content) | Yes | — | image only | `<picture>` background |
| e.g. `primaryCta` | aem-content / link | string | No | hide if empty | url required | button link |

Field-type vocabulary (Universal Editor model components): `text`, `richtext`,
`reference` (image/asset), `aem-content` (link/path), `select` (with options),
`multiselect`, `boolean`, `number`, `date-time`, container/group.

Also note where relevant:
- **Field collapsing** — when an image + its alt/link collapse into one logical field
- **Element grouping** — grouping related fields in the editor UI
- **Repeating** — which fields belong to the repeated item vs. the container

### 3. DA Authoring Structure + Field Hinting
- Exact table layout authors use (block name in first cell; one row per repeated item)
- Which cell maps to which model field, and the **field hint** required in each cell
- How element roles are inferred (e.g., first line = eyebrow, H-level = heading, link order = primary then secondary)
- A **sample authored document** that validates against the model

### 4. Rendered DOM Contract
- Target HTML after JS decoration (wrapper, item track, content container, controls)
- Class names, data attributes, and ARIA hooks the JS relies on
- Loading phase (eager / lazy)

### 5. Design Tokens & Styling
- Verified design values (fonts, sizes, colors, spacing, breakpoints) — ideally from Figma
- States: default / hover / focus / active
- Required fonts and whether they are declared in `fonts.css`

### 6. Behavior, Accessibility, Responsive
- Interaction logic and keyboard model
- ARIA pattern and announcements
- Breakpoints and responsive adaptations

### 7. Validation / Acceptance Criteria (model-specific)
Include these XMOD-specific checks in addition to functional/visual AC:
- [ ] Block title matches **exactly** across markdown, `component-definition.json`, and template name
- [ ] `component-models.json` defines the container model and a separate `-item` model (for repeating blocks)
- [ ] `component-filters.json` allows the item component inside the container
- [ ] Every block has its associated `_<block>.json` (header/footer exempt)
- [ ] Field hints present and correct in each authored cell (parsers map cleanly)
- [ ] Sample content validates against the Universal Editor block model
- [ ] Authoring in Universal Editor produces the expected DOM and renders correctly

---

## Quick Definition-of-Ready Checklist (XMOD)
Before a model-driven block story enters a sprint, confirm:
1. Block title, name, variants, and kind are fixed
2. Container model fields AND item model fields are fully specified (type, required, default, validation)
3. Field hinting per cell is documented
4. Sample authored document exists
5. Rendered DOM contract + class/ARIA hooks are defined
6. Design tokens are verified (not guessed)
7. Acceptance criteria include the model-file consistency checks above
