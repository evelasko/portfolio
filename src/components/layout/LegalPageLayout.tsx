"use client";

import { useLayout } from "@/contexts/LayoutContext";
import { useEffect } from "react";

interface LegalPageLayoutProps {
  children: React.ReactNode;
}

/**
 * Client component wrapper for legal pages
 * Manages layout context (NavBar, Footer settings)
 */
export function LegalPageLayout({ children }: LegalPageLayoutProps) {
  const { setHeroRef, setShowNavBar, setShowFooter, setFooterVariant } =
    useLayout();

  useEffect(() => {
    setHeroRef(null); // No hero section: disable logo hiding on scroll
    setShowNavBar(true);
    setShowFooter(true);
    setFooterVariant("simple");
  }, [setHeroRef, setShowNavBar, setShowFooter, setFooterVariant]);

  return <>{children}</>;
}
