"use client";

import { useEffect, useRef } from "react";
import { useLayout } from "@/contexts/LayoutContext";

/**
 * Client component wrapper for articles listing page layout configuration
 */
export default function ArticlesPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { setHeroRef, setShowNavBar, setShowFooter, setFooterVariant } =
    useLayout();

  useEffect(() => {
    setHeroRef(heroRef);
    setShowNavBar(true);
    setShowFooter(true);
    setFooterVariant("simple");
  }, [setHeroRef, setShowNavBar, setShowFooter, setFooterVariant]);

  return <>{children}</>;
}
