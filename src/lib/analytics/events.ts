/**
 * Google Analytics 4 Event Tracking
 * Type-safe event definitions and tracking functions
 */

/**
 * Event parameter types
 */
export interface ArticleViewParams {
  article_title: string;
  article_category: string;
  reading_time: number;
  language: "en" | "es";
  article_slug: string;
}

export interface ArticleScrollParams {
  scroll_depth: 25 | 50 | 75 | 100;
  article_title: string;
  article_slug: string;
}

export interface WorkViewParams {
  work_title: string;
  work_category: string;
  language: "en" | "es";
  work_slug: string;
}

export interface CVDownloadParams {
  location: "bio_page" | "header" | "footer";
  language: "en" | "es";
}

export interface ExternalClickParams {
  link_url: string;
  link_type: "work" | "social" | "project" | "external";
  link_text?: string;
}

export interface EmailClickParams {
  source: "bio" | "footer" | "header" | "contact";
  email: string;
}

export interface SocialClickParams {
  platform: "LinkedIn" | "GitHub" | "Instagram" | "YouTube";
  location: "bio" | "footer" | "header";
  profile_url: string;
}

export interface LanguageChangeParams {
  from: "en" | "es";
  to: "en" | "es";
  page: string;
}

export interface ContactClickParams {
  source: "bio" | "footer" | "header";
  contact_type: "email" | "phone" | "form";
}

/**
 * Type-safe event tracking function
 * Wrapper around gtag for better TypeScript support
 */
declare global {
  interface Window {
    gtag?: (
      command: string,
      eventName: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

/**
 * Check if gtag is available
 */
const isGtagAvailable = (): boolean => {
  return typeof window !== "undefined" && typeof window.gtag === "function";
};

/**
 * Base event tracking function
 */
function trackEvent(eventName: string, params?: Record<string, unknown>): void {
  if (!isGtagAvailable()) {
    if (process.env.NODE_ENV === "development") {
      console.log("[GA4 Event]", eventName, params);
    }
    return;
  }

  window.gtag!("event", eventName, params);
}

/**
 * Track article view
 */
export function trackArticleView(params: ArticleViewParams): void {
  trackEvent("article_view", {
    article_title: params.article_title,
    article_category: params.article_category,
    reading_time: params.reading_time,
    language: params.language,
    article_slug: params.article_slug,
  });
}

/**
 * Track article scroll depth (PRIORITY EVENT)
 */
export function trackArticleScroll(params: ArticleScrollParams): void {
  trackEvent("article_scroll", {
    scroll_depth: params.scroll_depth,
    article_title: params.article_title,
    article_slug: params.article_slug,
  });
}

/**
 * Track work/project view
 */
export function trackWorkView(params: WorkViewParams): void {
  trackEvent("work_view", {
    work_title: params.work_title,
    work_category: params.work_category,
    language: params.language,
    work_slug: params.work_slug,
  });
}

/**
 * Track CV download (conversion event)
 */
export function trackCVDownload(params: CVDownloadParams): void {
  trackEvent("cv_download", {
    location: params.location,
    language: params.language,
  });
}

/**
 * Track external link clicks
 */
export function trackExternalClick(params: ExternalClickParams): void {
  trackEvent("external_click", {
    link_url: params.link_url,
    link_type: params.link_type,
    link_text: params.link_text,
  });
}

/**
 * Track email clicks (PRIMARY CONVERSION)
 */
export function trackEmailClick(params: EmailClickParams): void {
  trackEvent("email_click", {
    source: params.source,
    email: params.email,
  });
}

/**
 * Track social media clicks
 */
export function trackSocialClick(params: SocialClickParams): void {
  trackEvent("social_click", {
    platform: params.platform,
    location: params.location,
    profile_url: params.profile_url,
  });
}

/**
 * Track language changes
 */
export function trackLanguageChange(params: LanguageChangeParams): void {
  trackEvent("language_change", {
    from: params.from,
    to: params.to,
    page: params.page,
  });
}

/**
 * Track contact intention
 */
export function trackContactClick(params: ContactClickParams): void {
  trackEvent("contact_click", {
    source: params.source,
    contact_type: params.contact_type,
  });
}

/**
 * Generic page view tracking (for manual tracking)
 */
export function trackPageView(url: string, title: string): void {
  trackEvent("page_view", {
    page_location: url,
    page_title: title,
  });
}
