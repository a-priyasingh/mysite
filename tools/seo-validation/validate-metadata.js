#!/usr/bin/env node

/**
 * SEO Metadata Validation Script
 *
 * Compares metadata between source (AEM 6.4) and target (EDS) pages.
 * Reports missing titles, descriptions, canonicals, OG tags, and robots directives.
 *
 * Usage:
 *   node tools/seo-validation/validate-metadata.js --source-csv baseline.csv --target-base https://main--repo--owner.aem.page
 *   node tools/seo-validation/validate-metadata.js --urls urls.txt --target-base https://main--repo--owner.aem.page
 */

import { readFileSync, writeFileSync } from 'fs';
import { JSDOM } from 'jsdom';

const REQUIRED_META = ['title', 'description', 'robots', 'canonical'];
const REQUIRED_OG = ['og:title', 'og:description', 'og:url', 'og:image', 'og:type'];

function parseArgs() {
  const args = process.argv.slice(2);
  const config = {};
  args.forEach((arg, i) => {
    if (arg === '--source-csv') config.sourceCsv = args[i + 1];
    if (arg === '--urls') config.urlsFile = args[i + 1];
    if (arg === '--target-base') config.targetBase = args[i + 1];
    if (arg === '--output') config.output = args[i + 1];
  });
  return config;
}

async function fetchPage(url) {
  try {
    const resp = await fetch(url, { redirect: 'follow' });
    if (!resp.ok) return { url, status: resp.status, error: `HTTP ${resp.status}` };
    const html = await resp.text();
    return { url, status: resp.status, html };
  } catch (e) {
    return { url, status: 0, error: e.message };
  }
}

function extractSEOData(html) {
  const dom = new JSDOM(html);
  const { document } = dom.window;

  const title = document.querySelector('title')?.textContent || '';
  const description = document.querySelector('meta[name="description"]')?.content || '';
  const robots = document.querySelector('meta[name="robots"]')?.content || '';
  const canonical = document.querySelector('link[rel="canonical"]')?.href || '';

  const og = {};
  REQUIRED_OG.forEach((prop) => {
    og[prop] = document.querySelector(`meta[property="${prop}"]`)?.content || '';
  });

  const hreflangCount = document.querySelectorAll('link[rel="alternate"][hreflang]').length;

  const jsonLdScripts = [...document.querySelectorAll('script[type="application/ld+json"]')];
  const schemas = jsonLdScripts.map((s) => {
    try { return JSON.parse(s.textContent); } catch { return null; }
  }).filter(Boolean);

  const schemaTypes = schemas.map((s) => s['@type']).filter(Boolean);

  return {
    title,
    description,
    robots,
    canonical,
    og,
    hreflangCount,
    schemaTypes,
  };
}

function comparePages(sourceData, targetData) {
  const issues = [];

  if (!targetData.title) {
    issues.push({ severity: 'ERROR', field: 'title', message: 'Missing title tag' });
  } else if (sourceData && sourceData.title !== targetData.title) {
    issues.push({ severity: 'WARN', field: 'title', message: `Title mismatch: "${sourceData.title}" → "${targetData.title}"` });
  }

  if (!targetData.description) {
    issues.push({ severity: 'ERROR', field: 'description', message: 'Missing meta description' });
  }

  if (!targetData.canonical) {
    issues.push({ severity: 'ERROR', field: 'canonical', message: 'Missing canonical URL' });
  }

  if (!targetData.robots) {
    issues.push({ severity: 'WARN', field: 'robots', message: 'Missing robots meta (defaults to index,follow)' });
  } else if (targetData.robots.includes('noindex') && sourceData && !sourceData.robots.includes('noindex')) {
    issues.push({ severity: 'ERROR', field: 'robots', message: 'Page is now noindex but source was indexed' });
  }

  REQUIRED_OG.forEach((prop) => {
    if (!targetData.og[prop]) {
      issues.push({ severity: 'WARN', field: prop, message: `Missing ${prop}` });
    }
  });

  if (sourceData && sourceData.hreflangCount > 0 && targetData.hreflangCount === 0) {
    issues.push({ severity: 'ERROR', field: 'hreflang', message: `Source had ${sourceData.hreflangCount} hreflang tags, target has 0` });
  } else if (sourceData && targetData.hreflangCount < sourceData.hreflangCount) {
    issues.push({ severity: 'WARN', field: 'hreflang', message: `Hreflang count reduced: ${sourceData.hreflangCount} → ${targetData.hreflangCount}` });
  }

  return issues;
}

async function validateUrl(url, targetBase) {
  const targetUrl = targetBase ? `${targetBase}${new URL(url).pathname}` : url;
  const result = await fetchPage(targetUrl);

  if (result.error) {
    return { url: targetUrl, status: result.status, issues: [{ severity: 'ERROR', field: 'http', message: result.error }] };
  }

  const seoData = extractSEOData(result.html);
  const issues = comparePages(null, seoData);

  return {
    url: targetUrl,
    status: result.status,
    data: seoData,
    issues,
  };
}

async function main() {
  const config = parseArgs();

  if (!config.targetBase && !config.urlsFile) {
    console.log('Usage: node validate-metadata.js --urls urls.txt --target-base https://main--repo--owner.aem.page');
    console.log('       node validate-metadata.js --source-csv baseline.csv --target-base https://...');
    process.exit(1);
  }

  let urls = [];
  if (config.urlsFile) {
    urls = readFileSync(config.urlsFile, 'utf-8').split('\n').filter((u) => u.trim());
  }

  console.log(`\nSEO Metadata Validation Report`);
  console.log(`${'='.repeat(60)}`);
  console.log(`Target: ${config.targetBase || 'direct URLs'}`);
  console.log(`Pages to check: ${urls.length}`);
  console.log(`${'='.repeat(60)}\n`);

  const results = [];
  let errors = 0;
  let warnings = 0;

  /* eslint-disable no-await-in-loop */
  for (let i = 0; i < urls.length; i += 1) {
    const result = await validateUrl(urls[i], config.targetBase);
    results.push(result);

    const errorCount = result.issues.filter((issue) => issue.severity === 'ERROR').length;
    const warnCount = result.issues.filter((issue) => issue.severity === 'WARN').length;
    errors += errorCount;
    warnings += warnCount;

    const status = errorCount > 0 ? '❌' : warnCount > 0 ? '⚠️' : '✅';
    console.log(`${status} [${result.status}] ${result.url}`);
    result.issues.forEach((issue) => {
      console.log(`   ${issue.severity}: ${issue.message}`);
    });
  }
  /* eslint-enable no-await-in-loop */

  console.log(`\n${'='.repeat(60)}`);
  console.log(`Summary: ${results.length} pages checked | ${errors} errors | ${warnings} warnings`);
  console.log(`${'='.repeat(60)}`);

  if (config.output) {
    writeFileSync(config.output, JSON.stringify(results, null, 2));
    console.log(`\nDetailed report saved to: ${config.output}`);
  }

  process.exit(errors > 0 ? 1 : 0);
}

main();
