"use client";

import { useEffect } from "react";
import { useLayout } from "@/contexts/LayoutContext";

/**
 * Example: Contact form with no NavBar or Footer
 * Perfect for focused conversion pages or forms
 */
export default function ContactFormExamplePage() {
  const { setShowNavBar, setShowFooter } = useLayout();

  // Configure layout for this page - hide both NavBar and Footer
  useEffect(() => {
    setShowNavBar(false);
    setShowFooter(false);

    // Cleanup: restore defaults when leaving this page
    return () => {
      setShowNavBar(true);
      setShowFooter(true);
    };
  }, [setShowNavBar, setShowFooter]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-2">Get in Touch</h1>
        <p className="text-gray-600 mb-6">
          This page has no NavBar or Footer for a distraction-free experience.
        </p>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Your message..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors"
          >
            Send Message
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <a
            href="/"
            className="text-sm text-gray-600 hover:text-black transition-colors"
          >
            ← Back to home
          </a>
        </div>
      </div>
    </div>
  );
}
