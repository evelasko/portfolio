/**
 * Robots.txt Route Handler
 * Generates robots.txt with sitemap reference
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

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
 * Generate robots.txt content
 */
function generateRobotsTxt(baseUrl: string): string {
  const lines: string[] = [];

  // User-agent: * (all crawlers)
  lines.push("User-agent: *");

  // Allow most content
  lines.push("Allow: /");

  // Disallow demo routes
  lines.push("Disallow: /demo/");
  lines.push("Disallow: /en/demo/");

  // Disallow API routes (if any)
  lines.push("Disallow: /api/");

  // Disallow Next.js internal routes
  lines.push("Disallow: /_next/");
  lines.push("Disallow: /static/");

  // Add blank line
  lines.push("");

  // Sitemap reference
  lines.push(`Sitemap: ${baseUrl}/sitemap.xml`);

  return lines.join("\n");
}

/**
 * GET handler for robots.txt
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const baseUrl = getBaseUrl(request);
    const content = generateRobotsTxt(baseUrl);

    return new NextResponse(content, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=172800",
      },
    });
  } catch (error) {
    console.error("Error generating robots.txt:", error);

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
export const revalidate = 86400; // Revalidate every 24 hours
