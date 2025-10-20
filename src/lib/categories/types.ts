/**
 * Generalized Category System - Type Definitions
 *
 * This module provides TypeScript types for the category system.
 * Supports multiple category types (articles, works, etc.) with
 * consistent, localized category names across the portfolio.
 */

/**
 * Supported locale codes
 */
export type Locale = "en" | "es";

/**
 * Article category key identifiers
 * These match the keys in article-categories.json
 */
export type ArticleCategoryKey =
  | "art-technology"
  | "creative-process"
  | "business-strategy"
  | "business-growth"
  | "career-business"
  | "client-management"
  | "community-collaboration"
  | "creative-thinking"
  | "growth-learning"
  | "methodology"
  | "philosophy-mindset"
  | "philosophy-values"
  | "technical-guide"
  | "tools-resources"
  | "demo"
  | "development";

/**
 * Work category key identifiers
 * These match the keys in work-categories.json
 */
export type WorkCategoryKey =
  | "interactive-art"
  | "web-development"
  | "creative-technology"
  | "performance-art"
  | "installation"
  | "digital-experience"
  | "motion-graphics"
  | "ai-ml"
  | "demo"
  | "development";

/**
 * Union of all category keys
 */
export type CategoryKey = ArticleCategoryKey | WorkCategoryKey;

/**
 * Category definition structure (generic)
 */
export interface CategoryDefinition<K extends string = string> {
  /** Unique identifier for the category */
  key: K;

  /** URL-friendly slug */
  slug: string;

  /** Localized category names */
  translations: Record<Locale, string>;

  /** English description of the category */
  description?: string;
}

/**
 * Complete category configuration (generic)
 */
export interface CategoriesConfig<K extends string = string> {
  /** Category definitions keyed by category key */
  categories: Record<K, CategoryDefinition<K>>;

  /** Metadata about the category system */
  metadata: {
    version: string;
    lastUpdated: string;
    supportedLocales: Locale[];
  };
}

/**
 * Article categories configuration
 */
export type ArticleCategoriesConfig = CategoriesConfig<ArticleCategoryKey>;

/**
 * Work categories configuration
 */
export type WorkCategoriesConfig = CategoriesConfig<WorkCategoryKey>;

/**
 * Category with computed properties (generic)
 */
export interface Category<K extends string = string>
  extends CategoryDefinition<K> {
  /** Get the category name for a specific locale */
  getName: (locale: Locale) => string;

  /** Check if this category matches a given string */
  matches: (value: string) => boolean;
}

/**
 * Category type discriminator
 */
export type CategoryType = "article" | "work";