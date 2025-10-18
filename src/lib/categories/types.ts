/**
 * Article Category System - Type Definitions
 *
 * This module provides TypeScript types for the article category system.
 * Categories are defined in src/content/article-categories.json and provide
 * consistent, localized category names across the portfolio.
 */

/**
 * Supported locale codes
 */
export type Locale = "en" | "es";

/**
 * Category key identifiers
 * These match the keys in article-categories.json
 */
export type CategoryKey =
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
 * Category definition structure
 */
export interface CategoryDefinition {
  /** Unique identifier for the category */
  key: CategoryKey;

  /** URL-friendly slug */
  slug: string;

  /** Localized category names */
  translations: Record<Locale, string>;

  /** English description of the category */
  description?: string;
}

/**
 * Complete category configuration
 */
export interface ArticleCategoriesConfig {
  /** Category definitions keyed by category key */
  categories: Record<CategoryKey, CategoryDefinition>;

  /** Metadata about the category system */
  metadata: {
    version: string;
    lastUpdated: string;
    supportedLocales: Locale[];
  };
}

/**
 * Category with computed properties
 */
export interface Category extends CategoryDefinition {
  /** Get the category name for a specific locale */
  getName: (locale: Locale) => string;

  /** Check if this category matches a given string */
  matches: (value: string) => boolean;
}