"use client";

/**
 * Tracked Link Component
 * Wrapper for links that tracks various click events
 * Handles: CV downloads, email clicks, social clicks, external links
 */

import React from "react";
import Link from "next/link";
import {
  trackCVDownload,
  trackEmailClick,
  trackSocialClick,
  trackExternalClick,
} from "@/lib/analytics/events";

type TrackedLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  // Tracking specific props
  trackingType?: "cv_download" | "email" | "social" | "external" | "none";
  trackingData?: {
    // For CV download
    location?: "bio_page" | "header" | "footer";
    language?: "en" | "es";
    // For email
    email?: string;
    source?: "bio" | "footer" | "header" | "contact";
    // For social
    platform?: "LinkedIn" | "GitHub" | "Instagram" | "YouTube";
    // For external
    linkType?: "work" | "social" | "project" | "external";
    linkText?: string;
  };
};

export function TrackedLink({
  href,
  children,
  className,
  target,
  rel,
  trackingType = "none",
  trackingData = {},
}: TrackedLinkProps) {
  const handleClick = () => {
    // Track based on type
    switch (trackingType) {
      case "cv_download":
        trackCVDownload({
          location: trackingData.location || "bio_page",
          language: trackingData.language || "es",
        });
        break;

      case "email":
        trackEmailClick({
          email: trackingData.email || href.replace("mailto:", ""),
          source: trackingData.source || "bio",
        });
        break;

      case "social":
        if (trackingData.platform) {
          // Filter out "contact" as it's not a valid location for social clicks
          const validLocation: "bio" | "footer" | "header" =
            trackingData.source && trackingData.source !== "contact"
              ? trackingData.source
              : "bio";
          trackSocialClick({
            platform: trackingData.platform,
            location: validLocation,
            profile_url: href,
          });
        }
        break;

      case "external":
        trackExternalClick({
          link_url: href,
          link_type: trackingData.linkType || "external",
          link_text: trackingData.linkText,
        });
        break;

      default:
        // No tracking
        break;
    }

    // Log in development
    if (process.env.NODE_ENV === "development" && trackingType !== "none") {
      console.log(`[Link Click] ${trackingType}:`, href, trackingData);
    }
  };

  // Determine if it's an external link
  const isExternal =
    href.startsWith("http") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:");

  // Use regular <a> for external links, Next Link for internal
  if (isExternal) {
    return (
      <a
        href={href}
        className={className}
        target={target}
        rel={rel || "noopener noreferrer"}
        onClick={handleClick}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={className}
      target={target}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}
