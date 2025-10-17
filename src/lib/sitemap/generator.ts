/**
 * Sitemap XML generation utilities
 * Generates sitemap XML compliant with Sitemap Protocol 0.9
 */

import type {
  SitemapEntry,
  SitemapIndexEntry,
  AlternateLink,
} from "./types";

// Re-export types for convenience
export type { SitemapEntry, SitemapIndexEntry, AlternateLink };

/**
 * Escape XML special characters
 */
function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Format date to W3C format (YYYY-MM-DD)
 * Accepts ISO 8601 dates and converts them
 */
function formatDate(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;

  if (isNaN(d.getTime())) {
    return new Date().toISOString().split("T")[0];
  }

  return d.toISOString().split("T")[0];
}

/**
 * Generate alternate link XML (hreflang)
 */
function generateAlternateLinks(alternates: AlternateLink[]): string {
  if (!alternates || alternates.length === 0) {
    return "";
  }

  return alternates
    .map(
      alt =>
        `    <xhtml:link rel="alternate" hreflang="${escapeXml(alt.hreflang)}" href="${escapeXml(alt.href)}" />`
    )
    .join("\n");
}

/**
 * Generate a single URL entry XML
 */
function generateUrlEntry(entry: SitemapEntry): string {
  const parts: string[] = ["  <url>"];

  // Required: loc
  parts.push(`    <loc>${escapeXml(entry.url)}</loc>`);

  // Optional: lastmod
  if (entry.lastmod) {
    parts.push(`    <lastmod>${formatDate(entry.lastmod)}</lastmod>`);
  }

  // Optional: changefreq
  if (entry.changefreq) {
    parts.push(`    <changefreq>${entry.changefreq}</changefreq>`);
  }

  // Optional: priority
  if (entry.priority !== undefined) {
    // Clamp between 0.0 and 1.0, format to 1 decimal place
    const priority = Math.max(0.0, Math.min(1.0, entry.priority)).toFixed(1);
    parts.push(`    <priority>${priority}</priority>`);
  }

  // Optional: alternate links (hreflang)
  if (entry.alternates && entry.alternates.length > 0) {
    parts.push(generateAlternateLinks(entry.alternates));
  }

  parts.push("  </url>");

  return parts.join("\n");
}

/**
 * Generate complete sitemap XML
 */
export function generateSitemapXml(entries: SitemapEntry[]): string {
  const header = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

  const footer = `</urlset>`;

  const urlEntries = entries.map(entry => generateUrlEntry(entry)).join("\n");

  return `${header}\n${urlEntries}\n${footer}`;
}

/**
 * Generate a single sitemap index entry XML
 */
function generateSitemapIndexEntry(entry: SitemapIndexEntry): string {
  const parts: string[] = ["  <sitemap>"];

  // Required: loc
  parts.push(`    <loc>${escapeXml(entry.loc)}</loc>`);

  // Optional: lastmod
  if (entry.lastmod) {
    parts.push(`    <lastmod>${formatDate(entry.lastmod)}</lastmod>`);
  }

  parts.push("  </sitemap>");

  return parts.join("\n");
}

/**
 * Generate sitemap index XML
 */
export function generateSitemapIndexXml(entries: SitemapIndexEntry[]): string {
  const header = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  const footer = `</sitemapindex>`;

  const sitemapEntries = entries
    .map(entry => generateSitemapIndexEntry(entry))
    .join("\n");

  return `${header}\n${sitemapEntries}\n${footer}`;
}

/**
 * Split entries into chunks for multiple sitemaps
 * (if exceeding 50,000 URLs or 50MB limit)
 */
export function chunkEntries(
  entries: SitemapEntry[],
  maxUrlsPerSitemap: number = 50000
): SitemapEntry[][] {
  const chunks: SitemapEntry[][] = [];

  for (let i = 0; i < entries.length; i += maxUrlsPerSitemap) {
    chunks.push(entries.slice(i, i + maxUrlsPerSitemap));
  }

  return chunks;
}

/**
 * Calculate approximate XML size in bytes
 */
export function estimateXmlSize(xml: string): number {
  return Buffer.byteLength(xml, "utf8");
}

/**
 * Validate sitemap size (should be under 50MB)
 */
export function isValidSitemapSize(xml: string): boolean {
  const MAX_SIZE = 50 * 1024 * 1024; // 50MB
  return estimateXmlSize(xml) <= MAX_SIZE;
}

/**
 * Generate Response headers for sitemap
 */
export function getSitemapHeaders(): Headers {
  const headers = new Headers();
  headers.set("Content-Type", "application/xml; charset=utf-8");
  headers.set("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=7200");
  return headers;
}
