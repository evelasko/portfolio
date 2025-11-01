"use client";

/**
 * Work View Tracker Component
 * Tracks when a work/project is viewed
 */

import { useEffect } from "react";
import { trackWorkView } from "@/lib/analytics/events";

interface WorkViewTrackerProps {
  workTitle: string;
  workCategory: string;
  workSlug: string;
  language: "en" | "es";
}

export function WorkViewTracker({
  workTitle,
  workCategory,
  workSlug,
  language,
}: WorkViewTrackerProps) {
  useEffect(() => {
    // Track work view once on mount
    trackWorkView({
      work_title: workTitle,
      work_category: workCategory,
      work_slug: workSlug,
      language,
    });

    // Log in development
    if (process.env.NODE_ENV === "development") {
      console.log("[Work View]", {
        title: workTitle,
        category: workCategory,
        slug: workSlug,
        language,
      });
    }
  }, [workTitle, workCategory, workSlug, language]);

  // This component doesn't render anything
  return null;
}
