/**
 * Legal pages URL collector
 * Collects URLs from utility/legal pages in structure
 */

import structure from "@/lib/structure";
import type {
  SitemapEntry,
  SitemapConfig,
  Locale,
  AlternateLink,
} from "../types";
import { DEFAULT_PRIORITIES, DEFAULT_CHANGE_FREQUENCIES } from "../types";

/**
 * Build full URL from base URL and path
 */
function buildUrl(baseUrl: string, path: string): string {
  const cleanBase = baseUrl.replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${cleanBase}${cleanPath}`;
}

/**
 * Build locale-aware URL
 */
function buildLocalizedUrl(
  baseUrl: string,
  path: string,
  locale: Locale,
  defaultLocale: Locale
): string {
  // Default locale has no prefix (as-needed behavior)
  if (locale === defaultLocale) {
    return buildUrl(baseUrl, path);
  }
  return buildUrl(baseUrl, `/${locale}${path}`);
}

/**
 * Get localized path for a route key
 */
function getLocalizedPath(key: string, locale: Locale): string {
  const item = structure.utility.find(item => item.key === key);

  if (!item) {
    return key;
  }

  return item.href[locale] || key;
}

/**
 * Create alternate links for a legal page
 */
function createAlternateLinks(
  baseUrl: string,
  key: string,
  config: SitemapConfig
): AlternateLink[] {
  const alternates: AlternateLink[] = [];

  // Add alternate links for each locale
  for (const locale of config.locales) {
    const localizedPath = getLocalizedPath(key, locale);
    const url = buildLocalizedUrl(
      baseUrl,
      localizedPath,
      locale,
      config.defaultLocale
    );

    alternates.push({
      hreflang: locale,
      href: url,
    });
  }

  // Add x-default pointing to default locale
  const defaultPath = getLocalizedPath(key, config.defaultLocale);
  const defaultUrl = buildLocalizedUrl(
    baseUrl,
    defaultPath,
    config.defaultLocale,
    config.defaultLocale
  );

  alternates.push({
    hreflang: "x-default",
    href: defaultUrl,
  });

  return alternates;
}

/**
 * Collect legal/utility page URLs from site structure
 */
export async function collectLegalPages(
  config: SitemapConfig
): Promise<SitemapEntry[]> {
  const entries: SitemapEntry[] = [];

  // Process utility/legal routes
  for (const route of structure.utility) {
    // Skip external links
    if (route.key.startsWith("http")) {
      continue;
    }

    // Create entry for each locale
    for (const locale of config.locales) {
      const localizedPath = route.href[locale];
      const url = buildLocalizedUrl(
        config.baseUrl,
        localizedPath,
        locale,
        config.defaultLocale
      );

      // Create alternate links
      const alternates = createAlternateLinks(config.baseUrl, route.key, config);

      entries.push({
        url,
        lastmod: new Date().toISOString(),
        changefreq: DEFAULT_CHANGE_FREQUENCIES.legal,
        priority: DEFAULT_PRIORITIES.legal,
        alternates,
      });
    }
  }

  return entries;
}
