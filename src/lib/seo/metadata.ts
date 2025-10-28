/**
 * Metadata helpers for Next.js generateMetadata
 * Provides reusable metadata objects with proper hreflang, canonicals, and OpenGraph
 */

import { Metadata } from "next";
import { INFO } from "@/content/info";

/**
 * Base domain for canonical URLs and OpenGraph
 */
export const BASE_URL = INFO.domain;

/**
 * Supported locales
 */
export type Locale = "en" | "es";

/**
 * Generate alternates (canonical + hreflang) for a page
 */
export function generateAlternates(params: {
  path: string;
  locale: Locale;
  includeXDefault?: boolean;
}) {
  const { path, locale, includeXDefault = true } = params;

  // Ensure path starts with /
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  // For default locale (es), no prefix needed due to "as-needed" config
  // For other locales, add prefix
  const getLocalePath = (loc: Locale) => {
    if (loc === "es") {
      return cleanPath;
    }
    return `/${loc}${cleanPath}`;
  };

  const canonical = `${BASE_URL}${getLocalePath(locale)}`;

  const languages: Record<string, string> = {
    en: `${BASE_URL}${getLocalePath("en")}`,
    es: `${BASE_URL}${getLocalePath("es")}`,
  };

  if (includeXDefault) {
    languages["x-default"] = `${BASE_URL}${getLocalePath("es")}`; // Default to Spanish
  }

  return {
    canonical,
    languages,
  };
}

/**
 * Generate base metadata for a page
 */
export function generateBaseMetadata(params: {
  title: string;
  description: string;
  path: string;
  locale: Locale;
  keywords?: string[];
  image?: string;
  imageAlt?: string;
  type?: "website" | "article" | "profile";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
  tags?: string[];
  noIndex?: boolean;
}): Metadata {
  const {
    title,
    description,
    path,
    locale,
    keywords,
    image,
    imageAlt,
    type = "website",
    publishedTime,
    modifiedTime,
    authors,
    section,
    tags,
    noIndex = false,
  } = params;

  // Default OG image if none provided
  const ogImage = image || INFO.profilePhoto;

  // Alternates (canonical + hreflang)
  const alternates = generateAlternates({ path, locale });

  // Base metadata
  const metadata: Metadata = {
    title,
    description,
    alternates,
  };

  // Keywords
  if (keywords && keywords.length > 0) {
    metadata.keywords = keywords;
  }

  // OpenGraph - build conditionally based on type
  const baseOG = {
    title,
    description,
    url: alternates.canonical,
    siteName: INFO.name,
    locale: locale === "es" ? "es_ES" : "en_US",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: imageAlt || title,
      },
    ],
  };

  if (type === "article") {
    metadata.openGraph = {
      ...baseOG,
      type: "article",
      publishedTime,
      modifiedTime,
      authors,
      section,
      tags,
    };
  } else if (type === "profile") {
    metadata.openGraph = {
      ...baseOG,
      type: "profile",
      firstName: "Enrique",
      lastName: "Velasco",
    };
  } else {
    metadata.openGraph = {
      ...baseOG,
      type: "website",
    };
  }

  // Twitter Card
  metadata.twitter = {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage],
    creator: "@evelasko", // Add your Twitter handle if different
  };

  // Robots
  if (noIndex) {
    metadata.robots = {
      index: false,
      follow: true,
    };
  } else {
    metadata.robots = {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    };
  }

  return metadata;
}

/**
 * Site-wide default OpenGraph config for root layout
 */
export const defaultOpenGraphConfig = {
  siteName: INFO.name,
  locale: "es_ES",
  type: "website" as const,
};

/**
 * Site-wide default Twitter config for root layout
 */
export const defaultTwitterConfig = {
  card: "summary_large_image" as const,
  site: "@evelasko", // Update with your actual Twitter handle
  creator: "@evelasko",
};

/**
 * Generate metadata for article list page
 */
export function generateArticleListMetadata(locale: Locale): Metadata {
  const titles = {
    en: "Articles - Enrique Velasco",
    es: "Artículos - Enrique Velasco",
  };

  const descriptions = {
    en: "Thoughts on creative technology, dance, code, and building sustainable creative careers.",
    es: "Reflexiones sobre tecnología creativa, danza, código y construcción de carreras creativas sostenibles.",
  };

  return generateBaseMetadata({
    title: titles[locale],
    description: descriptions[locale],
    path: "/articles",
    locale,
    keywords: [
      "creative technology",
      "dance",
      "code",
      "creative career",
      "blog",
      "articles",
    ],
    type: "website",
  });
}

/**
 * Generate metadata for works list page
 */
export function generateWorksListMetadata(locale: Locale): Metadata {
  const titles = {
    en: "Works - Enrique Velasco",
    es: "Trabajos - Enrique Velasco",
  };

  const descriptions = {
    en: "Selected projects bridging dance, technology, and creative engineering.",
    es: "Proyectos seleccionados que conectan danza, tecnología e ingeniería creativa.",
  };

  return generateBaseMetadata({
    title: titles[locale],
    description: descriptions[locale],
    path: "/works",
    locale,
    keywords: [
      "creative projects",
      "dance technology",
      "creative engineering",
      "portfolio",
      "works",
    ],
    type: "website",
  });
}

/**
 * Generate metadata for bio page
 */
export function generateBioMetadata(locale: Locale): Metadata {
  const titles = {
    en: "About - Enrique Velasco",
    es: "Acerca de - Enrique Velasco",
  };

  const descriptions = {
    en: "Harmonious Engineer: Bridging Dance, Code & Business to Transform Creative Careers. Learn about my journey from stage to screen.",
    es: "Ingeniero Armónico: Conectando Danza, Código y Negocios para Transformar Carreras Creativas. Conoce mi viaje del escenario a la pantalla.",
  };

  return generateBaseMetadata({
    title: titles[locale],
    description: descriptions[locale],
    path: "/bio",
    locale,
    keywords: [
      "Enrique Velasco",
      "creative technologist",
      "dancer",
      "engineer",
      "CENIE",
      "bio",
      "about",
    ],
    type: "profile",
    image: INFO.profilePhoto,
  });
}

/**
 * Generate metadata for legal pages
 */
export function generateLegalMetadata(params: {
  title: string;
  description: string;
  path: string;
  locale: Locale;
  noIndex?: boolean;
}): Metadata {
  return generateBaseMetadata({
    ...params,
    type: "website",
    noIndex: params.noIndex ?? true, // Default to noindex for legal pages
  });
}
