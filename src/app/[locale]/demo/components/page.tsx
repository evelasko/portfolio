import React from "react";
import { TYPOGRAPHY } from "@/lib/typography";
import Link from "next/link";

export default function ComponentsDemo() {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4 space-y-16">
      {/* Page Header */}
      <header className="border-b border-gray-200 pb-8">
        <h1 className={`${TYPOGRAPHY.h1} text-black`}>Component Demo</h1>
        <p className={`${TYPOGRAPHY.text18} mt-4`}>
          List of interactive demonstrations pages of components with various
          configurations.
        </p>
      </header>

      <div className="space-y-12">
        <h2 className={`${TYPOGRAPHY.h2} text-black`}>Components</h2>
        <ul className="space-y-4">
          <li>
            <Link href="/demo/components/portfolio-button">
              PortfolioButton
            </Link>
          </li>
          <li>
            <Link href="/demo/components/block-quote-banner">
              BlockQuoteBanner
            </Link>
          </li>
          <li>
            <Link href="/demo/components/connect-banner">ConnectBanner</Link>
          </li>
          <li>
            <Link href="/demo/components/heroes/minimal-hero">MinimalHero</Link>
          </li>
          <li>
            <Link href="/demo/components/heroes/photo-hero">PhotoHero</Link>
          </li>
          <li>
            <Link href="/demo/components/heroes/thought-hero">ThoughtHero</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
