/**
 * Sitemap generation types and interfaces
 * Based on Sitemap Protocol 0.9: https://www.sitemaps.org/protocol.html
 */

/**
 * Change frequency for sitemap URLs
 */
export type ChangeFrequency =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

/**
 * Priority value (0.0 to 1.0)
 */
export type Priority = number;

/**
 * Supported locales in the application
 */
export type Locale = "en" | "es";

/**
 * Content type categories for sitemap segmentation
 */
export type ContentCategory = "pages" | "articles" | "works" | "legal";

/**
 * Alternate locale link for hreflang
 */
export interface AlternateLink {
  hreflang: string;
  href: string;
}

/**
 * Individual sitemap URL entry
 */
export interface SitemapEntry {
  /** Full absolute URL */
  url: string;
  /** Last modification date (ISO 8601) */
  lastmod?: string;
  /** Change frequency hint */
  changefreq?: ChangeFrequency;
  /** Priority (0.0 to 1.0) */
  priority?: Priority;
  /** Alternate language versions (hreflang) */
  alternates?: AlternateLink[];
}

/**
 * Sitemap index entry
 */
export interface SitemapIndexEntry {
  /** Full absolute URL to the sitemap */
  loc: string;
  /** Last modification date (ISO 8601) */
  lastmod?: string;
}

/**
 * Configuration for sitemap generation
 */
export interface SitemapConfig {
  /** Base URL of the website */
  baseUrl: string;
  /** Supported locales */
  locales: Locale[];
  /** Default locale */
  defaultLocale: Locale;
  /** Maximum URLs per sitemap (protocol limit: 50,000) */
  maxUrlsPerSitemap?: number;
  /** Whether to include demo routes */
  includeDemoRoutes?: boolean;
}

/**
 * Collector result with metadata
 */
export interface CollectorResult {
  /** Content category */
  category: ContentCategory;
  /** Collected sitemap entries */
  entries: SitemapEntry[];
  /** Collection timestamp */
  timestamp: Date;
  /** Number of entries */
  count: number;
}

/**
 * URL collector function interface
 */
export type URLCollector = (
  config: SitemapConfig
) => Promise<SitemapEntry[]> | SitemapEntry[];

/**
 * Validation error
 */
export interface ValidationError {
  /** Error type */
  type: "url" | "xml" | "hreflang" | "size" | "count";
  /** Error message */
  message: string;
  /** Related URL or identifier */
  identifier?: string;
}

/**
 * Validation result
 */
export interface ValidationResult {
  /** Whether validation passed */
  valid: boolean;
  /** List of validation errors */
  errors: ValidationError[];
  /** Total URLs validated */
  totalUrls: number;
  /** Validation timestamp */
  timestamp: Date;
}

/**
 * Cache entry for sitemap data
 */
export interface CacheEntry<T> {
  /** Cached data */
  data: T;
  /** Cache creation timestamp */
  createdAt: Date;
  /** Time-to-live in seconds */
  ttl: number;
}

/**
 * Default sitemap configuration values
 */
export const DEFAULT_SITEMAP_CONFIG: Partial<SitemapConfig> = {
  locales: ["en", "es"],
  defaultLocale: "es",
  maxUrlsPerSitemap: 50000,
  includeDemoRoutes: false,
};

/**
 * Default priority values by content category
 */
export const DEFAULT_PRIORITIES: Record<string, Priority> = {
  home: 1.0,
  mainPages: 0.8,
  articles: 0.6,
  works: 0.6,
  legal: 0.3,
};

/**
 * Default change frequencies by content category
 */
export const DEFAULT_CHANGE_FREQUENCIES: Record<string, ChangeFrequency> = {
  home: "daily",
  mainPages: "monthly",
  articles: "weekly",
  works: "weekly",
  legal: "yearly",
};
