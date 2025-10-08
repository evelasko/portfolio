"use client";

import { ReactNode } from "react";
import { useLayout } from "@/contexts/LayoutContext";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { navigation, socialLinks } from "@/lib/navigation";

interface LayoutContentProps {
  children: ReactNode;
}

export default function LayoutContent({ children }: LayoutContentProps) {
  const { config } = useLayout();

  return (
    <>
      {/* Conditionally render NavBar */}
      {config.showNavBar && (
        <NavBar
          links={navigation}
          socialLinks={socialLinks}
          heroRef={config.heroRef}
        />
      )}

      {/* Page content */}
      <main>{children}</main>

      {/* Conditionally render Footer based on variant */}
      {config.showFooter && (
        <>
          {config.footerVariant === "full" && (
            <Footer
              heading="LET'S BUILD SOMETHING GREAT TOGETHER"
              email="hello@evelasco.com"
              phone="+1 (555) 123-4567"
              address={[
                "123 Creative Street",
                "Design District",
                "San Francisco, CA 94103",
              ]}
              showCurrentTime={true}
              socialLinks={socialLinks}
              copyrightText="© 2025 Enrique Velasco"
            />
          )}

          {config.footerVariant === "simple" && (
            <Footer
              heading="GET IN TOUCH"
              email="hello@evelasco.com"
              phone="+1 (555) 123-4567"
              address={["San Francisco, CA"]}
              showCurrentTime={false}
              socialLinks={socialLinks}
              copyrightText="© 2025 E.V."
            />
          )}

          {config.footerVariant === "minimal" && (
            <footer className="bg-white border-t border-gray-100 py-8">
              <div className="max-w-7xl mx-auto px-6 m:px-8 l:px-12">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-black-50">
                    © 2025 Enrique Velasco
                  </p>
                  <button
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                    className="text-sm text-black-90 hover:text-black-50 transition-colors"
                  >
                    Back to top ↑
                  </button>
                </div>
              </div>
            </footer>
          )}
        </>
      )}
    </>
  );
}
