import { routing } from "./i18n/routing";
import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

/**
 * Map of old paths to new paths
 */
const oldPathRedirects: Record<string, string> = {
  "/art": "/works",
  "/design": "/works",
  "/coding": "/works",
  "/contact": "/",
};

/**
 * Check if URL contains invalid characters or patterns
 */
function isValidUrl(pathname: string): boolean {
  // Check for invalid characters like $, &, etc. (except query params)
  if (/[^/a-zA-Z0-9\-_.%]/.test(pathname.split("?")[0])) {
    return false;
  }

  // Check for malformed URLs with domains appended
  if (/\/www\.(facebook|twitter|linkedin|instagram)\.com/.test(pathname)) {
    return false;
  }

  return true;
}

/**
 * Clean up malformed URLs
 */
function cleanUrl(pathname: string): string | null {
  // Remove social media domain suffixes
  const cleaned = pathname.replace(
    /\/www\.(facebook|twitter|linkedin|instagram)\.com.*$/,
    ""
  );

  // Remove trailing invalid characters
  const trimmed = cleaned.replace(/[^/a-zA-Z0-9\-_.%]+$/, "");

  return trimmed !== pathname ? trimmed : null;
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle invalid URLs
  if (!isValidUrl(pathname)) {
    const cleaned = cleanUrl(pathname);
    if (cleaned) {
      const url = request.nextUrl.clone();
      url.pathname = cleaned;
      return NextResponse.redirect(url, 301);
    }
    // If we can't clean it, return 404
    return new NextResponse("Not Found", { status: 404 });
  }

  // Handle old path redirects
  const oldPath = oldPathRedirects[pathname];
  if (oldPath) {
    const url = request.nextUrl.clone();
    url.pathname = oldPath;
    return NextResponse.redirect(url, 301);
  }

  // Handle old paths with trailing slashes or subpaths
  for (const [oldPath, newPath] of Object.entries(oldPathRedirects)) {
    if (pathname.startsWith(oldPath + "/") || pathname === oldPath + "/") {
      const url = request.nextUrl.clone();
      // Preserve the rest of the path if it exists
      const rest = pathname.slice(oldPath.length);
      url.pathname = newPath + rest;
      return NextResponse.redirect(url, 301);
    }
  }

  // Let next-intl middleware handle the rest
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
    // For debugging purposes:
    // '/:path*',
  ],
};
