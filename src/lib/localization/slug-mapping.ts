/**
 * Slug mapping utilities for localized content
 * Maps pathname keys to locale-specific file slugs
 */

type LocaleSlugMap = {
  [key: string]: {
    en: string;
    es: string;
  };
};

/**
 * Legal page slug mappings
 * Maps the pathname key to the actual file slug for each locale
 */
const legalSlugMap: LocaleSlugMap = {
  "/privacy": {
    en: "privacy",
    es: "privacidad",
  },
  "/terms": {
    en: "terms",
    es: "terminos",
  },
  "/imprint": {
    en: "imprint",
    es: "aviso", // File is named aviso.mdx
  },
};

/**
 * Get the content file slug for a pathname key and locale
 * @param pathnameKey - The pathname key (e.g., "/privacy")
 * @param locale - The locale (e.g., "en" or "es")
 * @param contentType - The type of content (e.g., "legal")
 * @returns The file slug to use when loading content
 */
export function getContentSlug(
  pathnameKey: string,
  locale: "en" | "es",
  contentType: "legal" | "work" | "article" = "legal"
): string {
  // For legal pages, use the mapping
  if (contentType === "legal") {
    const mapping = legalSlugMap[pathnameKey];
    if (mapping) {
      return mapping[locale];
    }
  }

  // For works and articles, the slug is the last part of the pathname
  // (they already use the same slug across locales)
  const parts = pathnameKey.split("/");
  return parts[parts.length - 1];
}

/**
 * Get the pathname key for a content slug and locale
 * Inverse of getContentSlug - used for generating URLs
 * @param slug - The content file slug
 * @param locale - The locale
 * @param contentType - The type of content
 * @returns The pathname key
 */
export function getPathnameKey(
  slug: string,
  locale: "en" | "es",
  contentType: "legal" | "work" | "article" = "legal"
): string {
  if (contentType === "legal") {
    // Find the key that maps to this slug
    for (const [key, mapping] of Object.entries(legalSlugMap)) {
      if (mapping[locale] === slug) {
        return key;
      }
    }
  }

  // For works and articles, construct the pathname
  const basePathMap = {
    work: "/works",
    article: "/articles",
    legal: "", // legal pages don't have a base path
  };

  return `${basePathMap[contentType]}/${slug}`;
}
