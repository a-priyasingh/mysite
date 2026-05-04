#!/usr/bin/env node

/**
 * Redirect Validation Script
 *
 * Validates that old URLs properly redirect (301) to new target URLs.
 * Detects broken redirects, redirect chains, loops, and incorrect targets.
 *
 * Usage:
 *   node tools/seo-validation/validate-redirects.js --map redirects.csv
 *   node tools/seo-validation/validate-redirects.js --map redirects.csv --output report.json
 *
 * CSV format (no header): source_url,target_url
 *   https://www.thermofisher.com/us/en/old-page.html,https://www.thermofisher.com/us/en/new-page.html
 */

import { readFileSync, writeFileSync } from 'fs';

const MAX_REDIRECTS = 5;
const ACCEPTABLE_STATUS = [301, 302, 308];

function parseArgs() {
  const args = process.argv.slice(2);
  const config = {};
  args.forEach((arg, i) => {
    if (arg === '--map') config.mapFile = args[i + 1];
    if (arg === '--output') config.output = args[i + 1];
    if (arg === '--concurrency') config.concurrency = parseInt(args[i + 1], 10);
  });
  config.concurrency = config.concurrency || 5;
  return config;
}

function parseRedirectMap(filePath) {
  const lines = readFileSync(filePath, 'utf-8').split('\n').filter((l) => l.trim() && !l.startsWith('#'));
  return lines.map((line) => {
    const [source, target] = line.split(',').map((s) => s.trim());
    return { source, target };
  }).filter((r) => r.source && r.target);
}

async function followRedirects(url) {
  const chain = [];
  let currentUrl = url;

  for (let i = 0; i < MAX_REDIRECTS; i += 1) {
    try {
      /* eslint-disable no-await-in-loop */
      const resp = await fetch(currentUrl, { redirect: 'manual' });
      /* eslint-enable no-await-in-loop */
      chain.push({ url: currentUrl, status: resp.status });

      if (resp.status >= 300 && resp.status < 400) {
        const location = resp.headers.get('location');
        if (!location) {
          return { chain, finalUrl: currentUrl, error: 'Redirect with no Location header' };
        }
        currentUrl = new URL(location, currentUrl).href;

        // loop detection
        if (chain.some((c) => c.url === currentUrl)) {
          return { chain, finalUrl: currentUrl, error: 'Redirect loop detected' };
        }
      } else {
        return { chain, finalUrl: currentUrl, error: null };
      }
    } catch (e) {
      return { chain, finalUrl: currentUrl, error: e.message };
    }
  }

  return { chain, finalUrl: currentUrl, error: `Exceeded max redirects (${MAX_REDIRECTS})` };
}

function validateRedirect(result, expectedTarget) {
  const issues = [];

  if (result.error) {
    issues.push({ severity: 'ERROR', message: result.error });
    return issues;
  }

  const firstHop = result.chain[0];
  if (!firstHop) {
    issues.push({ severity: 'ERROR', message: 'No response received' });
    return issues;
  }

  // Check if source redirects at all
  if (firstHop.status === 200) {
    issues.push({ severity: 'ERROR', message: 'Source URL returns 200 (no redirect)' });
    return issues;
  }

  if (firstHop.status === 404) {
    issues.push({ severity: 'ERROR', message: 'Source URL returns 404' });
    return issues;
  }

  // Check redirect status code
  if (!ACCEPTABLE_STATUS.includes(firstHop.status)) {
    issues.push({ severity: 'WARN', message: `Non-standard redirect status: ${firstHop.status}` });
  }

  if (firstHop.status !== 301) {
    issues.push({ severity: 'WARN', message: `Expected 301, got ${firstHop.status} (temporary redirect loses link equity)` });
  }

  // Check for chains (more than 1 redirect hop)
  const redirectHops = result.chain.filter((c) => c.status >= 300 && c.status < 400).length;
  if (redirectHops > 1) {
    issues.push({ severity: 'WARN', message: `Redirect chain detected (${redirectHops} hops) — consolidate to single redirect` });
  }

  // Check final destination matches expected target
  const normalizeUrl = (u) => u.replace(/\/$/, '').replace(/\/index\.html$/, '');
  if (normalizeUrl(result.finalUrl) !== normalizeUrl(expectedTarget)) {
    issues.push({
      severity: 'ERROR',
      message: `Final URL mismatch: expected "${expectedTarget}", got "${result.finalUrl}"`,
    });
  }

  // Check final destination is reachable (200)
  const lastHop = result.chain[result.chain.length - 1];
  if (lastHop.status !== 200) {
    issues.push({ severity: 'ERROR', message: `Final destination returns ${lastHop.status} (not 200)` });
  }

  return issues;
}

async function processInBatches(items, batchSize, processor) {
  const results = [];
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch.map(processor));
    results.push(...batchResults);
  }
  return results;
}

async function main() {
  const config = parseArgs();

  if (!config.mapFile) {
    console.log('Usage: node validate-redirects.js --map redirects.csv [--output report.json] [--concurrency 5]');
    console.log('\nCSV format (no header): source_url,target_url');
    process.exit(1);
  }

  const redirectMap = parseRedirectMap(config.mapFile);

  console.log(`\nRedirect Validation Report`);
  console.log(`${'='.repeat(60)}`);
  console.log(`Redirect map: ${config.mapFile}`);
  console.log(`Entries to check: ${redirectMap.length}`);
  console.log(`Concurrency: ${config.concurrency}`);
  console.log(`${'='.repeat(60)}\n`);

  const results = await processInBatches(redirectMap, config.concurrency, async (entry) => {
    const redirectResult = await followRedirects(entry.source);
    const issues = validateRedirect(redirectResult, entry.target);

    return {
      source: entry.source,
      expectedTarget: entry.target,
      actualTarget: redirectResult.finalUrl,
      chain: redirectResult.chain,
      issues,
    };
  });

  let totalErrors = 0;
  let totalWarnings = 0;
  let passed = 0;

  results.forEach((result) => {
    const errorCount = result.issues.filter((i) => i.severity === 'ERROR').length;
    const warnCount = result.issues.filter((i) => i.severity === 'WARN').length;
    totalErrors += errorCount;
    totalWarnings += warnCount;

    if (errorCount === 0 && warnCount === 0) {
      passed += 1;
      console.log(`✅ ${result.source} → ${result.actualTarget}`);
    } else {
      const status = errorCount > 0 ? '❌' : '⚠️';
      console.log(`${status} ${result.source}`);
      console.log(`   Expected: ${result.expectedTarget}`);
      console.log(`   Actual:   ${result.actualTarget}`);
      result.issues.forEach((issue) => {
        console.log(`   ${issue.severity}: ${issue.message}`);
      });
    }
  });

  console.log(`\n${'='.repeat(60)}`);
  console.log(`Summary: ${results.length} redirects checked`);
  console.log(`  ✅ Passed: ${passed}`);
  console.log(`  ❌ Errors: ${totalErrors}`);
  console.log(`  ⚠️  Warnings: ${totalWarnings}`);
  console.log(`${'='.repeat(60)}`);

  if (config.output) {
    writeFileSync(config.output, JSON.stringify(results, null, 2));
    console.log(`\nDetailed report saved to: ${config.output}`);
  }

  process.exit(totalErrors > 0 ? 1 : 0);
}

main();
