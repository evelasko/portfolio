"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { LocaleString } from "@/lib/types/intl";
import { TYPOGRAPHY } from "@/lib/typography";
import clsx from "clsx";
import { routing } from "@/i18n/routing";

export default function LanguageSwitcher() {
  const currentLocale = useLocale() as LocaleString;
  const pathname = usePathname();
  const router = useRouter();

  // Find the next locale that isn't the current one
  const nextLocale = routing.locales.find(
    locale => locale !== currentLocale
  ) as LocaleString;

  const handleLocaleChange = () => {
    // Navigate to the same pathname but with the next locale
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <button
      onClick={handleLocaleChange}
      className={clsx(
        TYPOGRAPHY.mono18,
        "uppercase px-2 rounded-xs tracking-tighter bg-white/70 hover:bg-white-100 transition-all duration-200"
      )}
      aria-label={`Switch to ${nextLocale.toUpperCase()}`}
    >
      {nextLocale.toUpperCase()}
    </button>
  );
}
