#!/usr/bin/env node

/**
 * Hreflang Reciprocity Validation Script
 *
 * Validates that hreflang tags are reciprocal across locale variants.
 * A page with hreflang pointing to another locale must be pointed back to by that locale.
 *
 * Usage:
 *   node tools/seo-validation/validate-hreflang.js --url https://www.thermofisher.com/us/en/home.html
 *   node tools/seo-validation/validate-hreflang.js --urls urls.txt --sample 5
 */

import { readFileSync, writeFileSync } from 'fs';
import { JSDOM } from 'jsdom';

function parseArgs() {
  const args = process.argv.slice(2);
  const config = {};
  args.forEach((arg, i) => {
    if (arg === '--url') config.singleUrl = args[i + 1];
    if (arg === '--urls') config.urlsFile = args[i + 1];
    if (arg === '--sample') config.sample = parseInt(args[i + 1], 10);
    if (arg === '--output') config.output = args[i + 1];
  });
  config.sample = config.sample || 3;
  return config;
}

async function fetchHreflangTags(url) {
  try {
    const resp = await fetch(url, { redirect: 'follow' });
    if (!resp.ok) return { url, error: `HTTP ${resp.status}`, tags: [] };
    const html = await resp.text();
    const dom = new JSDOM(html);
    const { document } = dom.window;

    const tags = [...document.querySelectorAll('link[rel="alternate"][hreflang]')].map((link) => ({
      hreflang: link.getAttribute('hreflang'),
      href: link.getAttribute('href'),
    }));

    return { url, error: null, tags };
  } catch (e) {
    return { url, error: e.message, tags: [] };
  }
}

async function validateReciprocity(sourceUrl, sourceTags, sample) {
  const issues = [];
  const sampled = sourceTags.slice(0, sample);

  /* eslint-disable no-await-in-loop */
  for (let i = 0; i < sampled.length; i += 1) {
    const { hreflang, href } = sampled[i];
    const targetResult = await fetchHreflangTags(href);

    if (targetResult.error) {
      issues.push({
        severity: 'ERROR',
        hreflang,
        href,
        message: `Cannot fetch target: ${targetResult.error}`,
      });
    } else {
      // Check if target page links back to source
      const linksBack = targetResult.tags.some((tag) => {
        const normalizeUrl = (u) => u.replace(/\/$/, '');
        return normalizeUrl(tag.href) === normalizeUrl(sourceUrl);
      });

      if (!linksBack) {
        issues.push({
          severity: 'ERROR',
          hreflang,
          href,
          message: `No reciprocal hreflang: ${href} does not link back to ${sourceUrl}`,
        });
      }

      // Check if target has same number of hreflang tags
      if (Math.abs(targetResult.tags.length - sourceTags.length) > 2) {
        issues.push({
          severity: 'WARN',
          hreflang,
          href,
          message: `Hreflang count mismatch: source has ${sourceTags.length}, target (${hreflang}) has ${targetResult.tags.length}`,
        });
      }
    }
  }
  /* eslint-enable no-await-in-loop */

  return issues;
}

async function main() {
  const config = parseArgs();
  let urls = [];

  if (config.singleUrl) {
    urls = [config.singleUrl];
  } else if (config.urlsFile) {
    urls = readFileSync(config.urlsFile, 'utf-8').split('\n').filter((u) => u.trim());
  } else {
    console.log('Usage: node validate-hreflang.js --url <url>');
    console.log('       node validate-hreflang.js --urls urls.txt --sample 5');
    console.log('\n--sample N: Check reciprocity for N locale variants per page (default: 3)');
    process.exit(1);
  }

  console.log(`\nHreflang Reciprocity Validation Report`);
  console.log(`${'='.repeat(60)}`);
  console.log(`Pages to check: ${urls.length}`);
  console.log(`Reciprocity sample: ${config.sample} locales per page`);
  console.log(`${'='.repeat(60)}\n`);

  const results = [];
  let totalErrors = 0;
  let totalWarnings = 0;

  /* eslint-disable no-await-in-loop */
  for (let i = 0; i < urls.length; i += 1) {
    const url = urls[i];
    console.log(`Checking: ${url}`);

    const sourceResult = await fetchHreflangTags(url);

    if (sourceResult.error) {
      console.log(`  ❌ ERROR: ${sourceResult.error}\n`);
      results.push({ url, error: sourceResult.error, issues: [{ severity: 'ERROR', message: sourceResult.error }] });
      totalErrors += 1;
    } else if (sourceResult.tags.length === 0) {
      console.log(`  ⚠️  No hreflang tags found\n`);
      results.push({ url, tagCount: 0, issues: [{ severity: 'WARN', message: 'No hreflang tags found' }] });
      totalWarnings += 1;
    } else {
      console.log(`  Found ${sourceResult.tags.length} hreflang tags`);
      console.log(`  Checking reciprocity for ${config.sample} locales...`);

      const issues = await validateReciprocity(url, sourceResult.tags, config.sample);

      const errorCount = issues.filter((issue) => issue.severity === 'ERROR').length;
      const warnCount = issues.filter((issue) => issue.severity === 'WARN').length;
      totalErrors += errorCount;
      totalWarnings += warnCount;

      issues.forEach((issue) => {
        console.log(`  ${issue.severity}: ${issue.message}`);
      });

      if (issues.length === 0) {
        console.log(`  ✅ All sampled locales have reciprocal hreflang`);
      }
      console.log('');

      results.push({ url, tagCount: sourceResult.tags.length, issues });
    }
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
