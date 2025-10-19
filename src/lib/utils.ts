import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";
import { enUS, es } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format article date for display
 * @param dateString - ISO date string (e.g., "2025-01-15")
 * @param locale - Locale code ("en" or "es")
 * @returns Formatted date string (e.g., "Jan 15, 2025" or "15 ene 2025")
 */
export function formatArticleDate(
  dateString: string,
  locale: string = "en"
): string {
  const date = new Date(dateString);
  const localeMap = {
    en: enUS,
    es: es,
  };

  const dateLocale = localeMap[locale as keyof typeof localeMap] || enUS;

  // Format: "MMM d, yyyy" for English, "d MMM yyyy" for Spanish
  const formatString = locale === "es" ? "d MMM yyyy" : "MMM d, yyyy";

  return format(date, formatString, { locale: dateLocale });
}
