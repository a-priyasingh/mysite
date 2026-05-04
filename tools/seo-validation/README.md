# SEO Validation Tools

Automated regression and validation tools for the Thermo Fisher AEM 6.4 → EDS migration.

## Setup

```bash
cd tools/seo-validation
npm install
```

## Scripts

### 1. Metadata Validation (`validate-metadata.js`)

Checks every migrated page for required SEO metadata: title, description, canonical, robots, and Open Graph tags.

```bash
# Validate a list of target URLs
node validate-metadata.js --urls urls.txt --target-base https://main--repo--owner.aem.page

# Save detailed report
node validate-metadata.js --urls urls.txt --target-base https://main--repo--owner.aem.page --output report.json
```

**Checks performed:**
- Title tag present and matching source
- Meta description present
- Canonical URL present and self-referencing
- Robots directive correct (no unintended noindex)
- All OG tags present (og:title, og:description, og:url, og:image, og:type)
- Hreflang tag count matches source

### 2. Schema Validation (`validate-schema.js`)

Validates JSON-LD structured data per page template type.

```bash
# Validate a single URL
node validate-schema.js --url https://main--repo--owner.aem.page/us/en/home.html

# Validate multiple URLs
node validate-schema.js --urls urls.txt --target-base https://main--repo--owner.aem.page
```

**Schema requirements by template:**
| Template | Required Schemas | Detection Pattern |
|----------|-----------------|-------------------|
| Homepage | WebSite, Organization | `/home.html` |
| Category | BreadcrumbList | `/home/{section}/{subsection}.html` |
| Product | Product | `/order/catalog/product/` |
| Blog | BlogPosting | `/blog/` |

### 3. Redirect Validation (`validate-redirects.js`)

Validates the redirect mapping from old to new URLs.

```bash
# Validate redirect map
node validate-redirects.js --map redirects.csv

# With concurrency and output
node validate-redirects.js --map redirects.csv --concurrency 10 --output report.json
```

**Checks performed:**
- Source URL actually redirects (not 200 or 404)
- Status code is 301 (permanent)
- No redirect chains (>1 hop)
- No redirect loops
- Final destination matches expected target
- Final destination returns 200

### 4. Hreflang Reciprocity (`validate-hreflang.js`)

Validates bidirectional hreflang linking between locale variants.

```bash
# Check a single page
node validate-hreflang.js --url https://www.thermofisher.com/us/en/home.html

# Check multiple pages, sample 5 locales each
node validate-hreflang.js --urls urls.txt --sample 5
```

**Checks performed:**
- Hreflang tags are present
- Target pages link back to source (reciprocity)
- Hreflang count is consistent across locales

## Redirect Map Template

Use `redirects.csv` as a starting point. Populate with all indexed URLs from:
1. Google Search Console → Performance → Pages export
2. Screaming Frog crawl of source site
3. XML sitemap extraction

## CI Integration

Add to your CI pipeline (GitHub Actions example):

```yaml
- name: SEO Regression Check
  run: |
    cd tools/seo-validation
    npm install
    node validate-metadata.js --urls ../../seo-urls.txt --target-base ${{ env.PREVIEW_URL }} --output metadata-report.json
    node validate-schema.js --urls ../../seo-urls.txt --target-base ${{ env.PREVIEW_URL }} --output schema-report.json
```

## Exit Codes

All scripts exit with:
- `0` — All checks passed (warnings may be present)
- `1` — One or more errors detected (requires investigation)
