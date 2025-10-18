/**
 * Article Category System
 *
 * This module provides utilities for working with article categories.
 * Categories are centrally defined and provide consistent translations
 * across all locales.
 *
 * @example
 * ```ts
 * import { getCategory, getCategoryByKey, getAllCategories } from "@/lib/categories";
 *
 * // Get category by English or Spanish name
 * const category = getCategory("Art + Technology");
 * console.log(category.getName("es")); // "Arte + Tecnología"
 *
 * // Get category by key
 * const category = getCategoryByKey("art-technology");
 *
 * // Get all categories
 * const categories = getAllCategories();
 * ```
 */

import categoriesData from "@/content/article-categories.json";
import type {
  ArticleCategoriesConfig,
  Category,
  CategoryDefinition,
  CategoryKey,
  Locale,
} from "./types";

/**
 * Validated and typed category configuration
 */
const config = categoriesData as ArticleCategoriesConfig;

/**
 * Cache for enhanced category objects
 */
const categoryCache = new Map<CategoryKey, Category>();

/**
 * Create an enhanced category object with helper methods
 */
function createCategory(definition: CategoryDefinition): Category {
  return {
    ...definition,
    getName: (locale: Locale): string => {
      return definition.translations[locale] || definition.translations.en;
    },
    matches: (value: string): boolean => {
      return Object.values(definition.translations).some(
        (translation) => translation === value
      );
    },
  };
}

/**
 * Get a category by its key
 *
 * @param key - The category key
 * @returns The category object, or undefined if not found
 *
 * @example
 * ```ts
 * const category = getCategoryByKey("art-technology");
 * console.log(category?.getName("es")); // "Arte + Tecnología"
 * ```
 */
export function getCategoryByKey(key: CategoryKey): Category | undefined {
  if (categoryCache.has(key)) {
    return categoryCache.get(key);
  }

  const definition = config.categories[key];
  if (!definition) {
    return undefined;
  }

  const category = createCategory(definition);
  categoryCache.set(key, category);
  return category;
}

/**
 * Get a category by its localized name (English or Spanish)
 *
 * @param name - The category name in any supported locale
 * @returns The category object, or undefined if not found
 *
 * @example
 * ```ts
 * const category = getCategory("Art + Technology");
 * // or
 * const category = getCategory("Arte + Tecnología");
 * ```
 */
export function getCategory(name: string): Category | undefined {
  const key = Object.keys(config.categories).find((k) => {
    const def = config.categories[k as CategoryKey];
    return Object.values(def.translations).includes(name);
  }) as CategoryKey | undefined;

  if (!key) {
    return undefined;
  }

  return getCategoryByKey(key);
}

/**
 * Get all categories
 *
 * @returns Array of all category objects
 *
 * @example
 * ```ts
 * const categories = getAllCategories();
 * categories.forEach(cat => {
 *   console.log(`${cat.getName("en")} / ${cat.getName("es")}`);
 * });
 * ```
 */
export function getAllCategories(): Category[] {
  return Object.keys(config.categories).map((key) =>
    getCategoryByKey(key as CategoryKey)
  ) as Category[];
}

/**
 * Get category name for a specific locale
 *
 * @param key - The category key
 * @param locale - The target locale
 * @returns The localized category name
 *
 * @example
 * ```ts
 * getCategoryName("art-technology", "es"); // "Arte + Tecnología"
 * ```
 */
export function getCategoryName(key: CategoryKey, locale: Locale): string {
  const category = getCategoryByKey(key);
  return category?.getName(locale) || key;
}

/**
 * Get category translation (for use in translation scripts)
 *
 * @param englishName - The English category name
 * @param targetLocale - The target locale
 * @returns The translated category name, or undefined if not found
 *
 * @example
 * ```ts
 * getCategoryTranslation("Art + Technology", "es"); // "Arte + Tecnología"
 * ```
 */
export function getCategoryTranslation(
  englishName: string,
  targetLocale: Locale
): string | undefined {
  const category = getCategory(englishName);
  return category?.translations[targetLocale];
}

/**
 * Validate if a string is a valid category name
 *
 * @param name - The category name to validate
 * @param locale - Optional locale to validate against
 * @returns True if the name is a valid category
 *
 * @example
 * ```ts
 * isValidCategory("Art + Technology"); // true
 * isValidCategory("Invalid Category"); // false
 * isValidCategory("Arte + Tecnología", "es"); // true
 * ```
 */
export function isValidCategory(name: string, locale?: Locale): boolean {
  if (!locale) {
    // Check if valid in any locale
    return getCategory(name) !== undefined;
  }

  // Check if valid in specific locale
  return getAllCategories().some(
    (cat) => cat.translations[locale] === name
  );
}

/**
 * Get category key from localized name
 *
 * @param name - The category name in any locale
 * @returns The category key, or undefined if not found
 *
 * @example
 * ```ts
 * getCategoryKey("Art + Technology"); // "art-technology"
 * getCategoryKey("Arte + Tecnología"); // "art-technology"
 * ```
 */
export function getCategoryKey(name: string): CategoryKey | undefined {
  const category = getCategory(name);
  return category?.key;
}

/**
 * Get all valid category names for a specific locale
 *
 * @param locale - The target locale
 * @returns Array of all category names in the specified locale
 *
 * @example
 * ```ts
 * getValidCategoryNames("en");
 * // ["Art + Technology", "Creative Process", ...]
 *
 * getValidCategoryNames("es");
 * // ["Arte + Tecnología", "Proceso Creativo", ...]
 * ```
 */
export function getValidCategoryNames(locale: Locale): string[] {
  return getAllCategories().map((cat) => cat.getName(locale));
}

/**
 * Get categories grouped by a custom criteria
 *
 * @param groupBy - Function to determine group key
 * @returns Object with categories grouped by the criteria
 *
 * @example
 * ```ts
 * // Group by first letter
 * const grouped = getGroupedCategories(cat =>
 *   cat.getName("en")[0].toUpperCase()
 * );
 * ```
 */
export function getGroupedCategories(
  groupBy: (category: Category) => string
): Record<string, Category[]> {
  const categories = getAllCategories();
  const grouped: Record<string, Category[]> = {};

  categories.forEach((category) => {
    const key = groupBy(category);
    if (!grouped[key]) {
      grouped[key] = [];
    }
    grouped[key].push(category);
  });

  return grouped;
}

/**
 * Export types for consumers
 */
export type { Category, CategoryDefinition, CategoryKey, Locale } from "./types";

/**
 * Export raw configuration for advanced use cases
 */
export { config as categoryConfig };