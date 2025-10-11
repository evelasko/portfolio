import { hasLocale, NextIntlClientProvider } from "next-intl";
import ReactLenis from "lenis/react";
import { routing } from "../../i18n/routing";
import { notFound } from "next/navigation";
import LayoutContent from "@/components/layout/LayoutContent";
import { LayoutProvider } from "@/contexts/LayoutContext";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const awaitedParams = await params;
  const { locale } = awaitedParams;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <NextIntlClientProvider locale={locale}>
      <ReactLenis root>
        <LayoutProvider>
          <LayoutContent>
            {children}
            <SpeedInsights />
          </LayoutContent>
        </LayoutProvider>
      </ReactLenis>
    </NextIntlClientProvider>
  );
}
