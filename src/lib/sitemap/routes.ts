/**
 * Shared route handler logic for sitemap segments
 * Used by individual sitemap route files
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  generateSitemapXml,
  getSitemapHeaders,
  isValidSitemapSize,
} from "./generator";
import {
  collectStaticPages,
  collectArticles,
  collectWorks,
  collectLegalPages,
} from "./collectors";
import type { SitemapConfig, SitemapEntry, ContentCategory } from "./types";
import { withCache, generateSitemapCacheKey } from "./cache";

/**
 * Get the base URL from environment or request
 */
function getBaseUrl(request: NextRequest): string {
  // Try to get from environment variable first
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (envUrl) {
    return envUrl.replace(/\/$/, "");
  }

  // Fallback to request headers
  const host = request.headers.get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  return `${protocol}://${host}`;
}

/**
 * Create sitemap configuration
 */
function createSitemapConfig(baseUrl: string): SitemapConfig {
  return {
    baseUrl,
    locales: ["en", "es"],
    defaultLocale: "es",
    maxUrlsPerSitemap: 50000,
    includeDemoRoutes: false,
  };
}

/**
 * Collect URLs based on sitemap type
 */
async function collectUrlsByType(
  type: ContentCategory,
  config: SitemapConfig
): Promise<SitemapEntry[]> {
  switch (type) {
    case "pages":
      return await collectStaticPages(config);

    case "articles":
      return await collectArticles(config);

    case "works":
      return await collectWorks(config);

    case "legal":
      return await collectLegalPages(config);

    default:
      throw new Error(`Unknown sitemap type: ${type}`);
  }
}

/**
 * Generate sitemap response for a specific content type
 */
export async function generateSitemapResponse(
  request: NextRequest,
  type: ContentCategory
): Promise<NextResponse> {
  try {
    const baseUrl = getBaseUrl(request);
    const config = createSitemapConfig(baseUrl);

    // Collect URLs with caching
    const cacheKey = generateSitemapCacheKey(type);
    const entries = await withCache(
      cacheKey,
      async () => await collectUrlsByType(type, config),
      3600 // 1 hour TTL
    );

    // Generate sitemap XML
    const xml = generateSitemapXml(entries);

    // Validate size
    if (!isValidSitemapSize(xml)) {
      console.error(`Sitemap ${type} exceeds 50MB limit`);
      return new NextResponse("Sitemap too large", {
        status: 500,
        headers: {
          "Content-Type": "text/plain",
        },
      });
    }

    // Return response with proper headers
    const headers = getSitemapHeaders();

    return new NextResponse(xml, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error(`Error generating ${type} sitemap:`, error);

    return new NextResponse("Internal Server Error", {
      status: 500,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
}
