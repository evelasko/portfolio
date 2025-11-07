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

  // Debug logging for Spanish article URLs
  const isSpanishArticlePath = pathname.startsWith("/articulos/");
  const isSpanishWorkPath = pathname.startsWith("/trabajos/");

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

  // Let next-intl middleware handle the request first
  const response = intlMiddleware(request);

  // Special handling for Spanish pathnames: intercept incorrect redirects
  if (isSpanishArticlePath || isSpanishWorkPath) {
    // Extract the slug from the pathname
    const slug = pathname.split("/").slice(2).join("/");

    // If next-intl is trying to redirect (likely to English), intercept and fix it
    if (response.status === 307 || response.status === 308) {
      const location = response.headers.get("location");
      if (location) {
        try {
          const redirectUrl = new URL(location, request.url);

          // If redirecting to English version of Spanish pathname, rewrite instead
          // This happens when next-intl doesn't recognize the Spanish pathname
          if (redirectUrl.pathname.startsWith("/en/")) {
            // Rewrite to internal Spanish route structure
            const internalPath = isSpanishArticlePath
              ? `/${routing.defaultLocale}/articles/${slug}`
              : `/${routing.defaultLocale}/works/${slug}`;

            const url = request.nextUrl.clone();
            url.pathname = internalPath;

            // Rewrite preserves the original URL in browser
            const rewrite = NextResponse.rewrite(url);
            rewrite.headers.set("x-original-pathname", pathname);
            rewrite.headers.set("x-next-intl-locale", routing.defaultLocale);

            return rewrite;
          }

          // Check for redirect loops
          const normalizedRedirectPath = redirectUrl.pathname.replace(
            /^\/es\//,
            "/"
          );
          const normalizedCurrentPath = pathname.replace(/^\/es\//, "/");

          if (normalizedRedirectPath === normalizedCurrentPath) {
            // Rewrite to internal route structure
            const internalPath = isSpanishArticlePath
              ? `/${routing.defaultLocale}/articles/${slug}`
              : `/${routing.defaultLocale}/works/${slug}`;

            const url = request.nextUrl.clone();
            url.pathname = internalPath;

            const rewrite = NextResponse.rewrite(url);
            rewrite.headers.set("x-original-pathname", pathname);
            rewrite.headers.set("x-next-intl-locale", routing.defaultLocale);

            return rewrite;
          }
        } catch (e) {
          console.error("[MIDDLEWARE] Error processing redirect:", e);
        }
      }
    }

    // If no redirect, but response is not a rewrite, check if we need to rewrite
    // This handles the case where next-intl doesn't recognize the pathname at all
    if (response.status === 200 || response.status === 404) {
      // Check if the response is actually handling the Spanish pathname correctly
      // If not, we need to rewrite it
      const internalPath = isSpanishArticlePath
        ? `/${routing.defaultLocale}/articles/${slug}`
        : `/${routing.defaultLocale}/works/${slug}`;

      const url = request.nextUrl.clone();
      url.pathname = internalPath;

      const rewrite = NextResponse.rewrite(url);
      rewrite.headers.set("x-original-pathname", pathname);
      rewrite.headers.set("x-next-intl-locale", routing.defaultLocale);

      return rewrite;
    }
  }

  // Log other redirects for debugging
  if (response.status === 307 || response.status === 308) {
    const location = response.headers.get("location");
    if (location) {
      console.log("[MIDDLEWARE] Redirect detected:", {
        from: pathname,
        to: location,
        status: response.status,
      });
    }
  }

  return response;
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
