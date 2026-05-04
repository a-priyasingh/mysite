#!/usr/bin/env node

/**
 * Schema.org Structured Data Validation Script
 *
 * Validates JSON-LD structured data on migrated EDS pages.
 * Checks for required schema types per page template and validates structure.
 *
 * Usage:
 *   node tools/seo-validation/validate-schema.js --url https://main--repo--owner.aem.page/us/en/home.html
 *   node tools/seo-validation/validate-schema.js --urls urls.txt --target-base https://main--repo--owner.aem.page
 */

import { readFileSync, writeFileSync } from 'fs';
import { JSDOM } from 'jsdom';

/**
 * Expected schema types per page template.
 */
const SCHEMA_REQUIREMENTS = {
  homepage: {
    path: /\/home\.html$/,
    required: ['WebSite', 'Organization'],
    optional: ['ItemList'],
  },
  category: {
    path: /\/home\/[^/]+\/[^/]+\.html$/,
    required: ['BreadcrumbList'],
    optional: [],
  },
  product: {
    path: /\/order\/catalog\/product\//,
    required: ['Product'],
    optional: ['BreadcrumbList', 'AggregateOffer'],
  },
  blog: {
    path: /\/blog\//,
    required: ['BlogPosting'],
    optional: ['BreadcrumbList'],
  },
  default: {
    path: /.*/,
    required: [],
    optional: ['BreadcrumbList'],
  },
};

/**
 * Field validation rules per schema type.
 */
const SCHEMA_VALIDATORS = {
  WebSite: (schema) => {
    const issues = [];
    if (!schema.url) issues.push('Missing "url" field');
    if (!schema.name) issues.push('Missing "name" field');
    if (!schema.potentialAction) issues.push('Missing "potentialAction" (SearchAction)');
    if (schema.potentialAction && schema.potentialAction['@type'] !== 'SearchAction') {
      issues.push('potentialAction should be SearchAction');
    }
    return issues;
  },
  Organization: (schema) => {
    const issues = [];
    if (!schema.name) issues.push('Missing "name" field');
    if (!schema.url) issues.push('Missing "url" field');
    if (!schema.logo) issues.push('Missing "logo" field');
    if (!schema.sameAs || !Array.isArray(schema.sameAs)) issues.push('Missing or invalid "sameAs" array');
    return issues;
  },
  BreadcrumbList: (schema) => {
    const issues = [];
    if (!schema.itemListElement || !Array.isArray(schema.itemListElement)) {
      issues.push('Missing or invalid "itemListElement" array');
      return issues;
    }
    if (schema.itemListElement.length === 0) {
      issues.push('"itemListElement" is empty');
    }
    schema.itemListElement.forEach((item, i) => {
      if (item.position !== i + 1) issues.push(`Item ${i}: incorrect position (expected ${i + 1}, got ${item.position})`);
      if (!item.name) issues.push(`Item ${i}: missing "name"`);
    });
    return issues;
  },
  Product: (schema) => {
    const issues = [];
    if (!schema.name) issues.push('Missing "name" field');
    if (!schema.description) issues.push('Missing "description" field');
    if (!schema.sku) issues.push('Missing "sku" field');
    if (!schema.offers) issues.push('Missing "offers" field');
    return issues;
  },
  BlogPosting: (schema) => {
    const issues = [];
    if (!schema.headline) issues.push('Missing "headline" field');
    if (!schema.datePublished) issues.push('Missing "datePublished" field');
    if (!schema.url) issues.push('Missing "url" field');
    return issues;
  },
  ItemList: (schema) => {
    const issues = [];
    if (!schema.itemListElement || !Array.isArray(schema.itemListElement)) {
      issues.push('Missing or invalid "itemListElement" array');
    }
    return issues;
  },
};

function parseArgs() {
  const args = process.argv.slice(2);
  const config = {};
  args.forEach((arg, i) => {
    if (arg === '--url') config.singleUrl = args[i + 1];
    if (arg === '--urls') config.urlsFile = args[i + 1];
    if (arg === '--target-base') config.targetBase = args[i + 1];
    if (arg === '--output') config.output = args[i + 1];
  });
  return config;
}

function detectTemplate(url) {
  const path = new URL(url).pathname;
  const templates = Object.entries(SCHEMA_REQUIREMENTS);
  for (let i = 0; i < templates.length - 1; i += 1) {
    const [name, config] = templates[i];
    if (config.path.test(path)) return { name, ...config };
  }
  return { name: 'default', ...SCHEMA_REQUIREMENTS.default };
}

async function fetchAndValidate(url) {
  const result = { url, template: null, schemas: [], issues: [] };

  try {
    const resp = await fetch(url, { redirect: 'follow' });
    if (!resp.ok) {
      result.issues.push({ severity: 'ERROR', message: `HTTP ${resp.status}` });
      return result;
    }

    const html = await resp.text();
    const dom = new JSDOM(html);
    const { document } = dom.window;

    const template = detectTemplate(url);
    result.template = template.name;

    const jsonLdScripts = [...document.querySelectorAll('script[type="application/ld+json"]')];
    const schemas = jsonLdScripts.map((s) => {
      try { return JSON.parse(s.textContent); } catch { return null; }
    }).filter(Boolean);

    result.schemas = schemas.map((s) => s['@type']).filter(Boolean);

    // Check required schemas are present
    template.required.forEach((type) => {
      const found = schemas.some((s) => s['@type'] === type);
      if (!found) {
        result.issues.push({
          severity: 'ERROR',
          message: `Required schema "${type}" missing for ${template.name} template`,
        });
      }
    });

    // Validate schema structure
    schemas.forEach((schema) => {
      const type = schema['@type'];
      if (SCHEMA_VALIDATORS[type]) {
        const fieldIssues = SCHEMA_VALIDATORS[type](schema);
        fieldIssues.forEach((msg) => {
          result.issues.push({ severity: 'WARN', message: `${type}: ${msg}` });
        });
      }
    });
  } catch (e) {
    result.issues.push({ severity: 'ERROR', message: e.message });
  }

  return result;
}

async function main() {
  const config = parseArgs();
  let urls = [];

  if (config.singleUrl) {
    urls = [config.singleUrl];
  } else if (config.urlsFile) {
    urls = readFileSync(config.urlsFile, 'utf-8').split('\n').filter((u) => u.trim());
    if (config.targetBase) {
      urls = urls.map((u) => `${config.targetBase}${new URL(u).pathname}`);
    }
  } else {
    console.log('Usage: node validate-schema.js --url <url>');
    console.log('       node validate-schema.js --urls urls.txt --target-base https://...');
    process.exit(1);
  }

  console.log(`\nSchema.org Structured Data Validation Report`);
  console.log(`${'='.repeat(60)}`);
  console.log(`Pages to validate: ${urls.length}`);
  console.log(`${'='.repeat(60)}\n`);

  const results = [];
  let totalErrors = 0;
  let totalWarnings = 0;

  /* eslint-disable no-await-in-loop */
  for (let i = 0; i < urls.length; i += 1) {
    const result = await fetchAndValidate(urls[i]);
    results.push(result);

    const errorCount = result.issues.filter((issue) => issue.severity === 'ERROR').length;
    const warnCount = result.issues.filter((issue) => issue.severity === 'WARN').length;
    totalErrors += errorCount;
    totalWarnings += warnCount;

    const status = errorCount > 0 ? '❌' : warnCount > 0 ? '⚠️' : '✅';
    console.log(`${status} ${result.url}`);
    console.log(`   Template: ${result.template} | Schemas found: [${result.schemas.join(', ')}]`);
    result.issues.forEach((issue) => {
      console.log(`   ${issue.severity}: ${issue.message}`);
    });
    console.log('');
  }
  /* eslint-enable no-await-in-loop */

  console.log(`${'='.repeat(60)}`);
  console.log(`Summary: ${results.length} pages | ${totalErrors} errors | ${totalWarnings} warnings`);
  console.log(`${'='.repeat(60)}`);

  if (config.output) {
    writeFileSync(config.output, JSON.stringify(results, null, 2));
    console.log(`\nReport saved to: ${config.output}`);
  }

  process.exit(totalErrors > 0 ? 1 : 0);
}

main();
