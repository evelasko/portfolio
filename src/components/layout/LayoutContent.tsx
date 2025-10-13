"use client";

import { ReactNode } from "react";
import { useLocale } from "next-intl";
import { useLayout } from "@/contexts/LayoutContext";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { navigation } from "@/lib/structure";
import { INFO } from "@/content/info";
import { LocaleString } from "@/lib/types/intl";

interface LayoutContentProps {
  children: ReactNode;
}

export default function LayoutContent({ children }: LayoutContentProps) {
  const locale = useLocale();
  const { config } = useLayout();

  return (
    <>
      {/* Conditionally render NavBar */}
      {config.showNavBar && (
        <NavBar
          locale={locale as LocaleString}
          links={navigation}
          socialLinks={INFO.social}
          heroRef={config.heroRef}
        />
      )}

      {/* Page content */}
      <main>{children}</main>

      {/* Conditionally render Footer based on variant */}
      {config.showFooter && (
        <Footer
          locale={locale as LocaleString}
          variant={config.footerVariant}
          copyrightText={
            config.footerVariant === "full"
              ? "© 2025 Enrique Velasco"
              : "© 2025 E.V."
          }
        />
      )}
    </>
  );
}
