/**
 * Sitemap Index Route Handler
 * Returns a sitemap index pointing to segmented sitemaps
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  generateSitemapIndexXml,
  getSitemapHeaders,
  type SitemapIndexEntry,
} from "@/lib/sitemap/generator";

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
 * GET handler for sitemap index
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const baseUrl = getBaseUrl(request);

    // Define segmented sitemaps
    const sitemapTypes = ["pages", "articles", "works", "legal"];

    // Create sitemap index entries
    const indexEntries: SitemapIndexEntry[] = sitemapTypes.map(type => ({
      loc: `${baseUrl}/sitemap-${type}.xml`,
      lastmod: new Date().toISOString(),
    }));

    // Generate sitemap index XML
    const xml = generateSitemapIndexXml(indexEntries);

    // Return response with proper headers
    const headers = getSitemapHeaders();

    return new NextResponse(xml, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("Error generating sitemap index:", error);

    return new NextResponse("Internal Server Error", {
      status: 500,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
}

/**
 * Configure route segment options
 */
export const dynamic = "force-dynamic";
export const revalidate = 3600; // Revalidate every hour
