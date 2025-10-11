"use client";

import { useEffect, useRef } from "react";
import { useLayout } from "@/contexts/LayoutContext";

/**
 * Client component wrapper for work page layout configuration
 */
export function WorkPageLayout({ children }: { children: React.ReactNode }) {
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
