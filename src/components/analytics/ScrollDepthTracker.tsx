"use client";

/**
 * Scroll Depth Tracker Component
 * Tracks article reading depth at 25%, 50%, 75%, and 100%
 * PRIORITY: Critical for understanding engagement
 */

import { useEffect, useRef } from "react";
import { trackArticleScroll } from "@/lib/analytics/events";

interface ScrollDepthTrackerProps {
  articleTitle: string;
  articleSlug: string;
}

export function ScrollDepthTracker({
  articleTitle,
  articleSlug,
}: ScrollDepthTrackerProps) {
  const trackedDepths = useRef<Set<number>>(new Set());

  useEffect(() => {
    // Reset tracked depths on article change
    trackedDepths.current = new Set();

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || window.pageYOffset;

      // Calculate scroll percentage
      const scrollableHeight = documentHeight - windowHeight;
      const scrollPercentage = (scrollTop / scrollableHeight) * 100;

      // Define milestones
      const milestones: Array<25 | 50 | 75 | 100> = [25, 50, 75, 100];

      // Track each milestone once
      for (const milestone of milestones) {
        if (
          scrollPercentage >= milestone &&
          !trackedDepths.current.has(milestone)
        ) {
          trackedDepths.current.add(milestone);

          // Track the event
          trackArticleScroll({
            scroll_depth: milestone,
            article_title: articleTitle,
            article_slug: articleSlug,
          });

          // Log in development
          if (process.env.NODE_ENV === "development") {
            console.log(
              `[Scroll Depth] ${milestone}% - ${articleTitle} (${articleSlug})`
            );
          }
        }
      }
    };

    // Add scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Check initial scroll position
    handleScroll();

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [articleTitle, articleSlug]);

  // This component doesn't render anything
  return null;
}
