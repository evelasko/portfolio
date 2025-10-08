"use client";

import { useEffect } from "react";
import { useLayout } from "@/contexts/LayoutContext";

/**
 * Example: About page with simple footer, no hero
 */
export default function AboutPage() {
  const { setShowNavBar, setShowFooter, setFooterVariant } = useLayout();

  // Configure layout for this page
  useEffect(() => {
    setShowNavBar(true);
    setShowFooter(true);
    setFooterVariant("simple"); // Use simple footer variant
  }, [setShowNavBar, setShowFooter, setFooterVariant]);

  return (
    <div className="min-h-screen bg-white pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8">About</h1>
        <p className="text-lg text-gray-600 mb-4">
          This page demonstrates using a simple footer variant without a hero
          section.
        </p>
        <p className="text-lg text-gray-600">
          Notice how the NavBar behaves differently without hero detection.
        </p>
      </div>
    </div>
  );
}
