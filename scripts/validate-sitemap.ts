#!/usr/bin/env node

/**
 * Sitemap Validation CLI Script
 * Validates sitemap XML, URLs, and hreflang consistency
 *
 * Usage:
 *   pnpm tsx scripts/validate-sitemap.ts
 *   pnpm tsx scripts/validate-sitemap.ts --url=https://example.com
 */

import {
  collectStaticPages,
  collectArticles,
  collectWorks,
  collectLegalPages,
} from "../src/lib/sitemap/collectors";
import {
  validateSitemap,
  validateXmlStructure,
  formatValidationResult,
} from "../src/lib/sitemap/validators";
import { generateSitemapXml } from "../src/lib/sitemap/generator";
import type { SitemapConfig, SitemapEntry } from "../src/lib/sitemap/types";

/**
 * Parse command line arguments
 */
function parseArgs(): { baseUrl: string } {
  const args = process.argv.slice(2);
  let baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  for (const arg of args) {
    if (arg.startsWith("--url=")) {
      baseUrl = arg.substring(6);
    }
  }

  return { baseUrl: baseUrl.replace(/\/$/, "") };
}

/**
 * Create sitemap configuration
 */
function createConfig(baseUrl: string): SitemapConfig {
  return {
    baseUrl,
    locales: ["en", "es"],
    defaultLocale: "es",
    maxUrlsPerSitemap: 50000,
    includeDemoRoutes: false,
  };
}

/**
 * Collect all URLs
 */
async function collectAllUrls(
  config: SitemapConfig
): Promise<{ type: string; entries: SitemapEntry[] }[]> {
  console.log("Collecting URLs from all sources...\n");

  const results = await Promise.all([
    collectStaticPages(config).then(entries => ({ type: "pages", entries })),
    collectArticles(config).then(entries => ({ type: "articles", entries })),
    collectWorks(config).then(entries => ({ type: "works", entries })),
    collectLegalPages(config).then(entries => ({ type: "legal", entries })),
  ]);

  return results;
}

/**
 * Validate a single sitemap segment
 */
function validateSegment(
  type: string,
  entries: SitemapEntry[]
): { success: boolean; report: string } {
  console.log(`\n${"=".repeat(60)}`);
  console.log(`Validating ${type.toUpperCase()} sitemap (${entries.length} URLs)`);
  console.log("=".repeat(60));

  // Validate entries
  const validationResult = validateSitemap(entries);
  const report = formatValidationResult(validationResult);

  console.log(report);

  // Generate and validate XML
  console.log("\nValidating XML structure...");
  const xml = generateSitemapXml(entries);
  const xmlErrors = validateXmlStructure(xml);

  if (xmlErrors.length > 0) {
    console.log("\nXML STRUCTURE ERRORS:");
    for (const error of xmlErrors) {
      console.log(`  ✗ ${error.message}`);
    }
  } else {
    console.log("  ✓ XML structure is valid");
  }

  const success = validationResult.valid && xmlErrors.length === 0;

  return {
    success,
    report: report + (xmlErrors.length > 0 ? "\n\nXML errors found" : ""),
  };
}

/**
 * Print summary statistics
 */
function printSummary(results: { type: string; entries: SitemapEntry[] }[]): void {
  console.log("\n" + "=".repeat(60));
  console.log("SUMMARY");
  console.log("=".repeat(60));

  const totalUrls = results.reduce((sum, r) => sum + r.entries.length, 0);

  console.log(`\nTotal URLs across all sitemaps: ${totalUrls}`);
  console.log("\nBreakdown by type:");

  for (const result of results) {
    console.log(`  ${result.type.padEnd(12)}: ${result.entries.length} URLs`);
  }

  // Check for duplicate URLs across all sitemaps
  const allUrls = new Set<string>();
  const duplicates = new Set<string>();

  for (const result of results) {
    for (const entry of result.entries) {
      if (allUrls.has(entry.url)) {
        duplicates.add(entry.url);
      } else {
        allUrls.add(entry.url);
      }
    }
  }

  if (duplicates.size > 0) {
    console.log(`\n⚠ WARNING: Found ${duplicates.size} duplicate URLs across sitemaps`);
  }

  // Check hreflang coverage
  let totalAlternates = 0;
  let entriesWithAlternates = 0;

  for (const result of results) {
    for (const entry of result.entries) {
      if (entry.alternates && entry.alternates.length > 0) {
        entriesWithAlternates++;
        totalAlternates += entry.alternates.length;
      }
    }
  }

  console.log(
    `\nHreflang coverage: ${entriesWithAlternates}/${totalUrls} URLs (${Math.round((entriesWithAlternates / totalUrls) * 100)}%)`
  );
  console.log(`Total alternate links: ${totalAlternates}`);
}

/**
 * Main execution
 */
async function main(): Promise<void> {
  console.log("Sitemap Validation Tool");
  console.log("=======================\n");

  try {
    const { baseUrl } = parseArgs();
    console.log(`Base URL: ${baseUrl}\n`);

    const config = createConfig(baseUrl);

    // Collect all URLs
    const results = await collectAllUrls(config);

    // Print summary
    printSummary(results);

    // Validate each segment
    let allValid = true;

    for (const result of results) {
      const { success } = validateSegment(result.type, result.entries);
      if (!success) {
        allValid = false;
      }
    }

    // Final result
    console.log("\n" + "=".repeat(60));
    if (allValid) {
      console.log("✓ All sitemaps are VALID");
      console.log("=".repeat(60));
      process.exit(0);
    } else {
      console.log("✗ Validation FAILED - see errors above");
      console.log("=".repeat(60));
      process.exit(1);
    }
  } catch (error) {
    console.error("\nFATAL ERROR:");
    console.error(error);
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}

export { main };
