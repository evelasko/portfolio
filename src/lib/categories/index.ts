/**
 * Generalized Category System
 *
 * This module provides utilities for working with categories across different content types.
 * Supports articles, works, and potentially other content types with consistent APIs.
 *
 * @example
 * ```ts
 * import { getCategoryName, getArticleCategories, getWorkCategories } from "@/lib/categories";
 *
 * // Get category name for any category type
 * const articleCat = getCategoryName("art-technology", "es", "article");
 * const workCat = getCategoryName("interactive-art", "en", "work");
 *
 * // Get all categories of a specific type
 * const articles = getArticleCategories();
 * const works = getWorkCategories();
 * ```
 */

import articleCategoriesData from "@/content/article-categories.json";
import workCategoriesData from "@/content/work-categories.json";
import type {
  ArticleCategoriesConfig,
  WorkCategoriesConfig,
  Category,
  CategoryDefinition,
  ArticleCategoryKey,
  WorkCategoryKey,
  Locale,
  CategoryType,
} from "./types";

/**
 * Validated and typed category configurations
 */
const articleConfig = articleCategoriesData as ArticleCategoriesConfig;
const workConfig = workCategoriesData as WorkCategoriesConfig;

/**
 * Cache for enhanced category objects
 */
const articleCategoryCache = new Map<ArticleCategoryKey, Category<ArticleCategoryKey>>();
const workCategoryCache = new Map<WorkCategoryKey, Category<WorkCategoryKey>>();

/**
 * Create an enhanced category object with helper methods
 */
function createCategory<K extends string>(
  definition: CategoryDefinition<K>
): Category<K> {
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
 * Get an article category by its key
 */
export function getArticleCategoryByKey(
  key: ArticleCategoryKey
): Category<ArticleCategoryKey> | undefined {
  if (articleCategoryCache.has(key)) {
    return articleCategoryCache.get(key);
  }

  const definition = articleConfig.categories[key];
  if (!definition) {
    return undefined;
  }

  const category = createCategory(definition);
  articleCategoryCache.set(key, category);
  return category;
}

/**
 * Get a work category by its key
 */
export function getWorkCategoryByKey(
  key: WorkCategoryKey
): Category<WorkCategoryKey> | undefined {
  if (workCategoryCache.has(key)) {
    return workCategoryCache.get(key);
  }

  const definition = workConfig.categories[key];
  if (!definition) {
    return undefined;
  }

  const category = createCategory(definition);
  workCategoryCache.set(key, category);
  return category;
}

/**
 * Get a category by its key (generic - auto-detects type)
 */
export function getCategoryByKey(
  key: ArticleCategoryKey | WorkCategoryKey,
  type?: CategoryType
): Category<string> | undefined {
  // If type is specified, use the specific getter
  if (type === "article") {
    return getArticleCategoryByKey(key as ArticleCategoryKey);
  }
  if (type === "work") {
    return getWorkCategoryByKey(key as WorkCategoryKey);
  }

  // Try article categories first, then work categories
  const articleCat = getArticleCategoryByKey(key as ArticleCategoryKey);
  if (articleCat) return articleCat;

  return getWorkCategoryByKey(key as WorkCategoryKey);
}

/**
 * Get all article categories
 */
export function getArticleCategories(): Category<ArticleCategoryKey>[] {
  return Object.keys(articleConfig.categories).map(
    (key) => getArticleCategoryByKey(key as ArticleCategoryKey)!
  );
}

/**
 * Get all work categories
 */
export function getWorkCategories(): Category<WorkCategoryKey>[] {
  return Object.keys(workConfig.categories).map(
    (key) => getWorkCategoryByKey(key as WorkCategoryKey)!
  );
}

/**
 * Get category name for a specific locale
 *
 * @example
 * ```ts
 * getCategoryName("art-technology", "es", "article"); // "Arte + Tecnología"
 * getCategoryName("interactive-art", "en", "work"); // "Interactive Art"
 * ```
 */
export function getCategoryName(
  key: ArticleCategoryKey | WorkCategoryKey,
  locale: Locale,
  type?: CategoryType
): string {
  const category = getCategoryByKey(key, type);
  return category?.getName(locale) || key;
}

/**
 * Get article category name
 */
export function getArticleCategoryName(
  key: ArticleCategoryKey,
  locale: Locale
): string {
  const category = getArticleCategoryByKey(key);
  return category?.getName(locale) || key;
}

/**
 * Get work category name
 */
export function getWorkCategoryName(
  key: WorkCategoryKey,
  locale: Locale
): string {
  const category = getWorkCategoryByKey(key);
  return category?.getName(locale) || key;
}

/**
 * Validate if a string is a valid article category key
 */
export function isValidArticleCategory(key: string): key is ArticleCategoryKey {
  return key in articleConfig.categories;
}

/**
 * Validate if a string is a valid work category key
 */
export function isValidWorkCategory(key: string): key is WorkCategoryKey {
  return key in workConfig.categories;
}

/**
 * Get all valid article category keys
 */
export function getValidArticleCategoryKeys(): ArticleCategoryKey[] {
  return Object.keys(articleConfig.categories) as ArticleCategoryKey[];
}

/**
 * Get all valid work category keys
 */
export function getValidWorkCategoryKeys(): WorkCategoryKey[] {
  return Object.keys(workConfig.categories) as WorkCategoryKey[];
}

/**
 * Export types for consumers
 */
export type {
  Category,
  CategoryDefinition,
  ArticleCategoryKey,
  WorkCategoryKey,
  CategoryType,
  Locale,
} from "./types";

/**
 * Export raw configurations for advanced use cases
 */
export { articleConfig as articleCategoryConfig, workConfig as workCategoryConfig };

/**
 * Legacy exports for backward compatibility
 * @deprecated Use specific getArticleCategories() or getWorkCategories() instead
 */
export const getAllCategories = getArticleCategories;
export const getCategoryByKey_Legacy = getArticleCategoryByKey;
