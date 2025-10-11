"use client";

import { useEffect, useRef } from "react";
import { useLayout } from "@/contexts/LayoutContext";

/**
 * Client component wrapper for article page layout configuration
 */
export function ArticlePageLayout({ children }: { children: React.ReactNode }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { setHeroRef, setShowNavBar, setShowFooter, setFooterVariant } =
    useLayout();

  useEffect(() => {
    setHeroRef(heroRef);
    setShowNavBar(true);
    setShowFooter(true);
    setFooterVariant("full");
  }, [setHeroRef, setShowNavBar, setShowFooter, setFooterVariant]);

  return <>{children}</>;
}
