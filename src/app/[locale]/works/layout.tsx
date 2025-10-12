"use client";

import { useEffect, useRef } from "react";
import { useLayout } from "@/contexts/LayoutContext";

/**
 * Client component wrapper for works listing page layout configuration
 */
export default function WorksPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
