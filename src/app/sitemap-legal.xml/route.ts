/**
 * Legal Sitemap Route Handler
 */

import type { NextRequest } from "next/server";
import { generateSitemapResponse } from "@/lib/sitemap/routes";

export async function GET(request: NextRequest) {
  return generateSitemapResponse(request, "legal");
}

export const dynamic = "force-dynamic";
export const revalidate = 3600;
