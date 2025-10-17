/**
 * Articles URL collector
 * Collects URLs from MDX articles with frontmatter
 */

import { getAllArticles } from "@/lib/mdx/loader";
import structure from "@/lib/structure";
import type { SitemapEntry, SitemapConfig, Locale, AlternateLink } from "../types";
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
 * Build locale-aware URL for article
 */
function buildArticleUrl(
  baseUrl: string,
  slug: string,
  locale: Locale,
  defaultLocale: Locale
): string {
  // Get the localized path for /articles from structure
  const articlesRoute = structure.routes.find(route => route.key === "/articles");
  const articlesPath = articlesRoute?.href[locale] || "/articles";

  // For default locale, no prefix
  if (locale === defaultLocale) {
    return buildUrl(baseUrl, `${articlesPath}/${slug}`);
  }

  // For non-default locales, add locale prefix
  return buildUrl(baseUrl, `/${locale}${articlesPath}/${slug}`);
}

/**
 * Create alternate links for an article
 */
async function createAlternateLinks(
  baseUrl: string,
  slug: string,
  locale: Locale,
  config: SitemapConfig
): Promise<AlternateLink[]> {
  const alternates: AlternateLink[] = [];
  const { getAlternateLocaleSlug } = await import("@/lib/mdx/loader");

  // Add alternate link for current locale
  const currentUrl = buildArticleUrl(baseUrl, slug, locale, config.defaultLocale);
  alternates.push({
    hreflang: locale,
    href: currentUrl,
  });

  // Find alternate locales
  for (const targetLocale of config.locales) {
    if (targetLocale === locale) {
      continue;
    }

    // Try to get the alternate slug from frontmatter
    const alternateSlug = await getAlternateLocaleSlug(
      "article",
      locale,
      slug,
      targetLocale
    );

    if (alternateSlug) {
      const alternateUrl = buildArticleUrl(
        baseUrl,
        alternateSlug,
        targetLocale,
        config.defaultLocale
      );

      alternates.push({
        hreflang: targetLocale,
        href: alternateUrl,
      });

      // If this is the default locale, also add x-default
      if (targetLocale === config.defaultLocale) {
        alternates.push({
          hreflang: "x-default",
          href: alternateUrl,
        });
      }
    }
  }

  // If no x-default yet and current is default locale, add it
  if (
    locale === config.defaultLocale &&
    !alternates.some(alt => alt.hreflang === "x-default")
  ) {
    alternates.push({
      hreflang: "x-default",
      href: currentUrl,
    });
  }

  return alternates;
}

/**
 * Collect article URLs from MDX files
 */
export async function collectArticles(
  config: SitemapConfig
): Promise<SitemapEntry[]> {
  const entries: SitemapEntry[] = [];

  // Process each locale
  for (const locale of config.locales) {
    // Get all articles for this locale (exclude drafts)
    const articles = await getAllArticles(locale, {
      includeDrafts: false,
      sortBy: "publishedAt",
      sortOrder: "desc",
    });

    // Create sitemap entry for each article
    for (const article of articles) {
      const url = buildArticleUrl(
        config.baseUrl,
        article.slug,
        locale,
        config.defaultLocale
      );

      // Get alternate links
      const alternates = await createAlternateLinks(
        config.baseUrl,
        article.slug,
        locale,
        config
      );

      // Use updatedAt if available, otherwise publishedAt
      const lastmod =
        article.frontmatter.updatedAt || article.frontmatter.publishedAt;

      entries.push({
        url,
        lastmod,
        changefreq: DEFAULT_CHANGE_FREQUENCIES.articles,
        priority: article.frontmatter.featured
          ? DEFAULT_PRIORITIES.articles + 0.1
          : DEFAULT_PRIORITIES.articles,
        alternates,
      });
    }
  }

  // Remove duplicate entries (same URL)
  const uniqueEntries = entries.filter(
    (entry, index, self) => index === self.findIndex(e => e.url === entry.url)
  );

  return uniqueEntries;
}
