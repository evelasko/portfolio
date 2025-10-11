"use client";

import { useEffect } from "react";
import { useLayout } from "@/contexts/LayoutContext";

/**
 * Example: Blog post with minimal footer
 */
export default function BlogExamplePage() {
  const { setShowNavBar, setShowFooter, setFooterVariant } = useLayout();

  // Configure layout for this page
  useEffect(() => {
    setShowNavBar(true);
    setShowFooter(true);
    setFooterVariant("minimal"); // Use minimal footer for blog posts
  }, [setShowNavBar, setShowFooter, setFooterVariant]);

  return (
    <article className="min-h-screen bg-white pt-32 pb-16">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-5xl font-bold mb-4">Example Blog Post</h1>
        <p className="text-gray-500 mb-8">Published on January 15, 2025</p>

        <div className="prose prose-lg">
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            This is an example blog post page that uses the minimal footer
            variant. The minimal footer is perfect for content-focused pages
            where you want to keep distractions to a minimum.
          </p>

          <h2 className="text-3xl font-bold mt-8 mb-4">
            Context Pattern Benefits
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            The Context pattern allows each page to configure its own layout
            needs:
          </p>

          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
            <li>Full footer with time and all social links (home page)</li>
            <li>Simple footer with essential info (about, portfolio pages)</li>
            <li>Minimal footer for focused content (blog posts, articles)</li>
            <li>Option to hide NavBar or Footer entirely (forms, modals)</li>
          </ul>
        </div>
      </div>
    </article>
  );
}
