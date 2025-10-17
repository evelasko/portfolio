/**
 * Sitemap caching utilities
 * Simple in-memory cache for sitemap generation
 */

import type { CacheEntry } from "./types";

/**
 * In-memory cache store
 */
const cache = new Map<string, CacheEntry<unknown>>();

/**
 * Check if cache entry is expired
 */
function isExpired<T>(entry: CacheEntry<T>): boolean {
  const now = new Date();
  const expiresAt = new Date(entry.createdAt.getTime() + entry.ttl * 1000);
  return now > expiresAt;
}

/**
 * Get item from cache
 */
export function getCached<T>(key: string): T | null {
  const entry = cache.get(key) as CacheEntry<T> | undefined;

  if (!entry) {
    return null;
  }

  if (isExpired(entry)) {
    cache.delete(key);
    return null;
  }

  return entry.data;
}

/**
 * Set item in cache
 */
export function setCached<T>(key: string, data: T, ttl: number = 3600): void {
  const entry: CacheEntry<T> = {
    data,
    createdAt: new Date(),
    ttl,
  };

  cache.set(key, entry as CacheEntry<unknown>);
}

/**
 * Delete item from cache
 */
export function deleteCached(key: string): void {
  cache.delete(key);
}

/**
 * Clear all cache entries
 */
export function clearCache(): void {
  cache.clear();
}

/**
 * Get cache statistics
 */
export function getCacheStats(): {
  size: number;
  keys: string[];
  expired: number;
} {
  let expiredCount = 0;

  for (const [key, entry] of cache) {
    if (isExpired(entry)) {
      expiredCount++;
    }
  }

  return {
    size: cache.size,
    keys: Array.from(cache.keys()),
    expired: expiredCount,
  };
}

/**
 * Clean up expired cache entries
 */
export function cleanupExpiredCache(): number {
  let cleaned = 0;

  for (const [key, entry] of cache) {
    if (isExpired(entry)) {
      cache.delete(key);
      cleaned++;
    }
  }

  return cleaned;
}

/**
 * Cached function executor
 * Wraps a function with caching logic
 */
export async function withCache<T>(
  key: string,
  fn: () => Promise<T> | T,
  ttl: number = 3600
): Promise<T> {
  // Check cache first
  const cached = getCached<T>(key);
  if (cached !== null) {
    return cached;
  }

  // Execute function
  const result = await fn();

  // Store in cache
  setCached(key, result, ttl);

  return result;
}

/**
 * Generate cache key for sitemap
 */
export function generateSitemapCacheKey(type: string, locale?: string): string {
  if (locale) {
    return `sitemap:${type}:${locale}`;
  }
  return `sitemap:${type}`;
}
