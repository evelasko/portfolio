/**
 * Sitemap validation utilities
 * Validates URLs, XML structure, and hreflang consistency
 */

import type {
  SitemapEntry,
  ValidationError,
  ValidationResult,
  AlternateLink,
} from "./types";

/**
 * Validate URL format
 */
function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

/**
 * Validate priority value (must be between 0.0 and 1.0)
 */
function isValidPriority(priority?: number): boolean {
  if (priority === undefined) {
    return true;
  }
  return priority >= 0.0 && priority <= 1.0;
}

/**
 * Validate change frequency value
 */
function isValidChangeFreq(changefreq?: string): boolean {
  if (!changefreq) {
    return true;
  }

  const validValues = [
    "always",
    "hourly",
    "daily",
    "weekly",
    "monthly",
    "yearly",
    "never",
  ];

  return validValues.includes(changefreq);
}

/**
 * Validate date format (should be W3C format: YYYY-MM-DD or ISO 8601)
 */
function isValidDate(date?: string): boolean {
  if (!date) {
    return true;
  }

  const parsed = new Date(date);
  return !isNaN(parsed.getTime());
}

/**
 * Validate a single sitemap entry
 */
function validateSitemapEntry(
  entry: SitemapEntry,
  index: number
): ValidationError[] {
  const errors: ValidationError[] = [];

  // Validate URL
  if (!isValidUrl(entry.url)) {
    errors.push({
      type: "url",
      message: `Invalid URL format at entry ${index}`,
      identifier: entry.url,
    });
  }

  // Validate priority
  if (!isValidPriority(entry.priority)) {
    errors.push({
      type: "url",
      message: `Invalid priority value at entry ${index} (must be 0.0-1.0)`,
      identifier: entry.url,
    });
  }

  // Validate changefreq
  if (!isValidChangeFreq(entry.changefreq)) {
    errors.push({
      type: "url",
      message: `Invalid changefreq value at entry ${index}`,
      identifier: entry.url,
    });
  }

  // Validate lastmod
  if (!isValidDate(entry.lastmod)) {
    errors.push({
      type: "url",
      message: `Invalid lastmod date format at entry ${index}`,
      identifier: entry.url,
    });
  }

  // Validate alternate links
  if (entry.alternates) {
    for (const alt of entry.alternates) {
      if (!isValidUrl(alt.href)) {
        errors.push({
          type: "hreflang",
          message: `Invalid alternate URL for hreflang ${alt.hreflang} at entry ${index}`,
          identifier: entry.url,
        });
      }
    }
  }

  return errors;
}

/**
 * Validate hreflang consistency
 * Ensures bidirectional hreflang links
 */
function validateHreflangConsistency(
  entries: SitemapEntry[]
): ValidationError[] {
  const errors: ValidationError[] = [];

  // Build a map of URL to alternates
  const urlToAlternates = new Map<string, AlternateLink[]>();

  for (const entry of entries) {
    if (entry.alternates) {
      urlToAlternates.set(entry.url, entry.alternates);
    }
  }

  // Check bidirectional consistency
  for (const [url, alternates] of urlToAlternates) {
    for (const alt of alternates) {
      // Skip x-default
      if (alt.hreflang === "x-default") {
        continue;
      }

      // Check if the alternate URL exists in our sitemap
      const alternateEntry = entries.find(e => e.url === alt.href);

      if (!alternateEntry) {
        // Not necessarily an error - the alternate might be in a different sitemap segment
        continue;
      }

      // Check if the alternate points back to this URL
      if (alternateEntry.alternates) {
        const backLink = alternateEntry.alternates.find(a => a.href === url);

        if (!backLink) {
          errors.push({
            type: "hreflang",
            message: `Missing bidirectional hreflang link between ${url} and ${alt.href}`,
            identifier: url,
          });
        }
      }
    }
  }

  return errors;
}

/**
 * Validate sitemap size constraints
 */
function validateSitemapConstraints(
  entries: SitemapEntry[]
): ValidationError[] {
  const errors: ValidationError[] = [];

  // Check URL count (max 50,000 per sitemap)
  if (entries.length > 50000) {
    errors.push({
      type: "count",
      message: `Sitemap exceeds 50,000 URL limit (${entries.length} URLs)`,
    });
  }

  // Check for duplicate URLs
  const urlSet = new Set<string>();
  const duplicates = new Set<string>();

  for (const entry of entries) {
    if (urlSet.has(entry.url)) {
      duplicates.add(entry.url);
    } else {
      urlSet.add(entry.url);
    }
  }

  if (duplicates.size > 0) {
    errors.push({
      type: "url",
      message: `Found ${duplicates.size} duplicate URLs`,
      identifier: Array.from(duplicates).join(", "),
    });
  }

  return errors;
}

/**
 * Validate XML structure (basic check)
 */
export function validateXmlStructure(xml: string): ValidationError[] {
  const errors: ValidationError[] = [];

  // Check for required XML declaration
  if (!xml.startsWith('<?xml version="1.0"')) {
    errors.push({
      type: "xml",
      message: "Missing XML declaration",
    });
  }

  // Check for required namespace
  if (!xml.includes("http://www.sitemaps.org/schemas/sitemap/0.9")) {
    errors.push({
      type: "xml",
      message: "Missing required sitemap namespace",
    });
  }

  // Check for balanced tags
  const openUrlset = (xml.match(/<urlset/g) || []).length;
  const closeUrlset = (xml.match(/<\/urlset>/g) || []).length;

  if (openUrlset !== closeUrlset) {
    errors.push({
      type: "xml",
      message: "Unbalanced urlset tags",
    });
  }

  // Estimate size (max 50MB)
  const sizeInMB = Buffer.byteLength(xml, "utf8") / (1024 * 1024);
  if (sizeInMB > 50) {
    errors.push({
      type: "size",
      message: `Sitemap exceeds 50MB limit (${sizeInMB.toFixed(2)}MB)`,
    });
  }

  return errors;
}

/**
 * Validate complete sitemap
 */
export function validateSitemap(entries: SitemapEntry[]): ValidationResult {
  const errors: ValidationError[] = [];

  // Validate each entry
  entries.forEach((entry, index) => {
    const entryErrors = validateSitemapEntry(entry, index);
    errors.push(...entryErrors);
  });

  // Validate constraints
  const constraintErrors = validateSitemapConstraints(entries);
  errors.push(...constraintErrors);

  // Validate hreflang consistency
  const hreflangErrors = validateHreflangConsistency(entries);
  errors.push(...hreflangErrors);

  return {
    valid: errors.length === 0,
    errors,
    totalUrls: entries.length,
    timestamp: new Date(),
  };
}

/**
 * Format validation result for logging
 */
export function formatValidationResult(result: ValidationResult): string {
  const lines: string[] = [];

  lines.push(`Sitemap Validation Report`);
  lines.push(`========================`);
  lines.push(`Total URLs: ${result.totalUrls}`);
  lines.push(`Status: ${result.valid ? "✓ VALID" : "✗ INVALID"}`);
  lines.push(`Timestamp: ${result.timestamp.toISOString()}`);

  if (result.errors.length > 0) {
    lines.push(`\nErrors (${result.errors.length}):`);

    // Group errors by type
    const errorsByType = new Map<string, ValidationError[]>();

    for (const error of result.errors) {
      const existing = errorsByType.get(error.type) || [];
      existing.push(error);
      errorsByType.set(error.type, existing);
    }

    for (const [type, errors] of errorsByType) {
      lines.push(`\n${type.toUpperCase()} ERRORS (${errors.length}):`);
      for (const error of errors) {
        lines.push(
          `  - ${error.message}${error.identifier ? ` [${error.identifier}]` : ""}`
        );
      }
    }
  }

  return lines.join("\n");
}
