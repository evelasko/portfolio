/**
 * SEO utility functions
 * Helper functions for SEO-related tasks
 */

/**
 * Truncate text to a maximum length with ellipsis
 * Useful for meta descriptions and OG descriptions
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }

  // Find the last space before maxLength to avoid cutting words
  const truncated = text.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");

  if (lastSpace > 0) {
    return truncated.slice(0, lastSpace) + "...";
  }

  return truncated + "...";
}

/**
 * Generate excerpt from content for meta description
 * Strips MDX/HTML tags and truncates
 */
export function generateExcerpt(
  content: string,
  maxLength: number = 160
): string {
  // Remove MDX/HTML tags
  const stripped = content
    .replace(/<[^>]*>/g, "") // Remove HTML tags
    .replace(/#{1,6}\s/g, "") // Remove markdown headers
    .replace(/[*_`]/g, "") // Remove markdown formatting
    .replace(/\n+/g, " ") // Replace newlines with spaces
    .replace(/\s+/g, " ") // Normalize spaces
    .trim();

  return truncateText(stripped, maxLength);
}

/**
 * Sanitize and format keywords array
 */
export function sanitizeKeywords(keywords: string[]): string[] {
  return keywords
    .map(keyword => keyword.trim().toLowerCase())
    .filter(keyword => keyword.length > 0)
    .filter((keyword, index, array) => array.indexOf(keyword) === index); // Remove duplicates
}

/**
 * Generate reading time estimate
 */
export function calculateReadingTime(
  text: string,
  wordsPerMinute: number = 200
): {
  text: string;
  minutes: number;
  words: number;
} {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);

  return {
    text: `${minutes} min read`,
    minutes,
    words,
  };
}

/**
 * Format date for ISO 8601 (required by schema.org)
 */
export function formatDateForSchema(date: string | Date): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toISOString();
}

/**
 * Get category display name from category key
 * This should match your category system
 */
export function getCategoryDisplayName(
  categoryKey: string,
  locale: "en" | "es"
): string {
  // This is a placeholder - integrate with your actual category system
  // from @/lib/categories if needed
  const categoryMap: Record<string, Record<string, string>> = {
    "creative-technology": {
      en: "Creative Technology",
      es: "Tecnología Creativa",
    },
    dance: {
      en: "Dance",
      es: "Danza",
    },
    business: {
      en: "Business",
      es: "Negocios",
    },
    "personal-development": {
      en: "Personal Development",
      es: "Desarrollo Personal",
    },
  };

  return categoryMap[categoryKey]?.[locale] || categoryKey;
}

/**
 * Extract plain text from React element (for articleBody in schema)
 */
export function extractTextFromReactElement(element: unknown): string {
  // This is a simplified version - you may need to enhance it
  // based on your actual content structure
  if (typeof element === "string") {
    return element;
  }

  if (typeof element === "number") {
    return String(element);
  }

  if (Array.isArray(element)) {
    return element.map(extractTextFromReactElement).join(" ");
  }

  if (
    element &&
    typeof element === "object" &&
    "props" in element &&
    element.props
  ) {
    const props = element.props as { children?: unknown };
    if (props.children) {
      return extractTextFromReactElement(props.children);
    }
  }

  return "";
}

/**
 * Generate breadcrumb items from path
 */
export function generateBreadcrumbsFromPath(params: {
  path: string;
  locale: "en" | "es";
  baseUrl: string;
  includeHome?: boolean;
}): { name: string; url: string }[] {
  const { path, locale, baseUrl, includeHome = true } = params;

  const breadcrumbs: { name: string; url: string }[] = [];

  // Add home
  if (includeHome) {
    breadcrumbs.push({
      name: locale === "en" ? "Home" : "Inicio",
      url: baseUrl,
    });
  }

  // Split path and build breadcrumbs
  const pathParts = path.split("/").filter(part => part.length > 0);

  let currentPath = "";
  for (const part of pathParts) {
    currentPath += `/${part}`;

    // Skip locale in breadcrumb display
    if (part === locale) {
      continue;
    }

    // Capitalize and format part
    const name = part
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    breadcrumbs.push({
      name,
      url: `${baseUrl}${currentPath}`,
    });
  }

  return breadcrumbs;
}

/**
 * Validate and normalize URL
 */
export function normalizeUrl(url: string): string {
  // Ensure HTTPS
  if (url.startsWith("http://")) {
    url = url.replace("http://", "https://");
  }

  // Remove trailing slash (except for root)
  if (url.length > 1 && url.endsWith("/")) {
    url = url.slice(0, -1);
  }

  return url;
}

/**
 * Check if running in production
 */
export function isProduction(): boolean {
  return process.env.NODE_ENV === "production";
}

/**
 * Get absolute URL for a path
 */
export function getAbsoluteUrl(path: string, baseUrl: string): string {
  // Remove trailing slash from baseUrl
  const cleanBase = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;

  // Ensure path starts with /
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  return normalizeUrl(`${cleanBase}${cleanPath}`);
}
