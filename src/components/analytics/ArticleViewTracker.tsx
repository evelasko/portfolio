"use client";

/**
 * Article View Tracker Component
 * Tracks when an article is viewed with metadata
 */

import { useEffect } from "react";
import { trackArticleView } from "@/lib/analytics/events";

interface ArticleViewTrackerProps {
  articleTitle: string;
  articleCategory: string;
  articleSlug: string;
  readingTime: number;
  language: "en" | "es";
}

export function ArticleViewTracker({
  articleTitle,
  articleCategory,
  articleSlug,
  readingTime,
  language,
}: ArticleViewTrackerProps) {
  useEffect(() => {
    // Track article view once on mount
    trackArticleView({
      article_title: articleTitle,
      article_category: articleCategory,
      article_slug: articleSlug,
      reading_time: readingTime,
      language,
    });

    // Log in development
    if (process.env.NODE_ENV === "development") {
      console.log("[Article View]", {
        title: articleTitle,
        category: articleCategory,
        slug: articleSlug,
        readingTime,
        language,
      });
    }
  }, [articleTitle, articleCategory, articleSlug, readingTime, language]);

  // This component doesn't render anything
  return null;
}
