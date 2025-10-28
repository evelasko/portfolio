/**
 * JSON-LD Schema Generators for SEO
 * Based on https://schema.org specifications
 * Provides type-safe, reusable schema objects for structured data
 */

import { INFO } from "@/content/info";

/**
 * Schema.org base types
 */
type Thing = {
  "@type": string;
  "@context"?: string;
  [key: string]: unknown;
};

type WithContext<T> = T & { "@context": "https://schema.org" };

/**
 * Person Schema - Represents Enrique Velasco
 * Used on: Bio page, Article author, Site-wide
 * https://schema.org/Person
 */
export interface PersonSchema extends Thing {
  "@type": "Person";
  name: string;
  jobTitle?: string;
  description?: string;
  url?: string;
  image?: string;
  email?: string;
  telephone?: string;
  address?: {
    "@type": "PostalAddress";
    streetAddress?: string;
    addressLocality?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  sameAs?: string[];
  knowsAbout?: string[];
  worksFor?: OrganizationSchema;
  foundedOrganization?: OrganizationSchema;
}

/**
 * Organization Schema - Represents CENIE or the portfolio site
 * Used on: Root layout, site-wide
 * https://schema.org/Organization
 */
export interface OrganizationSchema extends Thing {
  "@type": "Organization";
  name: string;
  description?: string;
  url?: string;
  logo?: string;
  sameAs?: string[];
  founder?: PersonSchema;
  contactPoint?: {
    "@type": "ContactPoint";
    email?: string;
    telephone?: string;
    contactType?: string;
  };
}

/**
 * Article/BlogPosting Schema - Represents blog articles
 * Used on: Article detail pages
 * https://schema.org/BlogPosting
 */
export interface ArticleSchema extends Thing {
  "@type": "BlogPosting" | "Article";
  headline: string;
  description?: string;
  image?: string | string[];
  datePublished: string;
  dateModified?: string;
  author: PersonSchema | string;
  publisher: OrganizationSchema | PersonSchema;
  keywords?: string | string[];
  articleBody?: string;
  wordCount?: number;
  inLanguage?: string;
  mainEntityOfPage?: {
    "@type": "WebPage";
    "@id": string;
  };
  articleSection?: string;
}

/**
 * BreadcrumbList Schema - Represents navigation breadcrumbs
 * Used on: All pages with depth > 1
 * https://schema.org/BreadcrumbList
 */
export interface BreadcrumbListSchema extends Thing {
  "@type": "BreadcrumbList";
  itemListElement: {
    "@type": "ListItem";
    position: number;
    name: string;
    item: string;
  }[];
}

/**
 * WebSite Schema - Represents the portfolio site
 * Used on: Homepage
 * https://schema.org/WebSite
 */
export interface WebSiteSchema extends Thing {
  "@type": "WebSite";
  name: string;
  description?: string;
  url: string;
  inLanguage?: string | string[];
  author?: PersonSchema;
  publisher?: PersonSchema | OrganizationSchema;
}

/**
 * ImageObject Schema - Represents images with metadata
 * Used on: Articles, Works with featured images
 * https://schema.org/ImageObject
 */
export interface ImageObjectSchema extends Thing {
  "@type": "ImageObject";
  url: string;
  width?: number | string;
  height?: number | string;
  caption?: string;
  author?: PersonSchema | string;
}

/**
 * Generate Person schema for Enrique Velasco
 */
export function generatePersonSchema(params?: {
  includeAddress?: boolean;
  includeContact?: boolean;
  jobTitle?: string;
  description?: string;
  knowsAbout?: string[];
}): WithContext<PersonSchema> {
  const { includeAddress, includeContact, jobTitle, description, knowsAbout } =
    params || {};

  // Parse address if needed
  const addressParts = INFO.address.split("\n");
  const address =
    includeAddress && addressParts.length >= 3
      ? {
          "@type": "PostalAddress" as const,
          streetAddress: addressParts[0],
          addressLocality: addressParts[1].split(" ")[1], // "Madrid" from "28019 Madrid"
          postalCode: addressParts[1].split(" ")[0], // "28019"
          addressCountry: addressParts[2], // "Spain"
        }
      : undefined;

  // Extract social profile URLs
  const sameAs = INFO.social
    .map(link => link.href)
    .filter(href => href.startsWith("http")); // Only full URLs

  const schema: PersonSchema = {
    "@type": "Person",
    name: INFO.name,
    url: INFO.website,
    image: INFO.profilePhoto,
    sameAs,
  };

  if (jobTitle) {
    schema.jobTitle = jobTitle;
  }

  if (description) {
    schema.description = description;
  }

  if (includeContact) {
    schema.email = INFO.email;
    schema.telephone = INFO.phone;
  }

  if (address) {
    schema.address = address;
  }

  if (knowsAbout && knowsAbout.length > 0) {
    schema.knowsAbout = knowsAbout;
  }

  // Add CENIE organization connection
  schema.foundedOrganization = {
    "@type": "Organization",
    name: "CENIE",
    description:
      "Creative Engineering Initiative - Bridging dance, code, and business",
  };

  return {
    ...schema,
    "@context": "https://schema.org" as const,
  };
}

/**
 * Generate Organization schema (for CENIE or the portfolio)
 */
export function generateOrganizationSchema(params: {
  name: string;
  description?: string;
  url?: string;
  logo?: string;
  includeFounder?: boolean;
}): WithContext<OrganizationSchema> {
  const { name, description, url, logo, includeFounder } = params;

  const schema: OrganizationSchema = {
    "@type": "Organization",
    name,
    description,
    url: url || INFO.website,
    logo: logo || INFO.profilePhoto,
    sameAs: INFO.social
      .map(link => link.href)
      .filter(href => href.startsWith("http")),
  };

  if (includeFounder) {
    schema.founder = {
      "@type": "Person",
      name: INFO.name,
      url: INFO.website,
      image: INFO.profilePhoto,
    };
  }

  return {
    ...schema,
    "@context": "https://schema.org" as const,
  };
}

/**
 * Generate Article/BlogPosting schema
 */
export function generateArticleSchema(params: {
  headline: string;
  description: string;
  url: string;
  image?: string | string[];
  datePublished: string;
  dateModified?: string;
  author?: string;
  keywords?: string[];
  articleBody?: string;
  wordCount?: number;
  locale?: string;
  category?: string;
}): WithContext<ArticleSchema> {
  const {
    headline,
    description,
    url,
    image,
    datePublished,
    dateModified,
    author = INFO.name,
    keywords,
    articleBody,
    wordCount,
    locale = "es",
    category,
  } = params;

  // Author can be simplified or full Person schema
  const authorSchema: PersonSchema = {
    "@type": "Person",
    name: author,
    url: INFO.website,
    image: INFO.profilePhoto,
  };

  // Publisher is Enrique Velasco as a Person
  const publisherSchema: PersonSchema = {
    "@type": "Person",
    name: INFO.name,
    url: INFO.website,
    image: INFO.profilePhoto,
  };

  const schema: ArticleSchema = {
    "@type": "BlogPosting",
    headline,
    description,
    image: image || INFO.profilePhoto,
    datePublished,
    dateModified: dateModified || datePublished,
    author: authorSchema,
    publisher: publisherSchema,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    inLanguage: locale,
  };

  if (keywords && keywords.length > 0) {
    schema.keywords = keywords.join(", ");
  }

  if (articleBody) {
    schema.articleBody = articleBody;
  }

  if (wordCount) {
    schema.wordCount = wordCount;
  }

  if (category) {
    schema.articleSection = category;
  }

  return {
    ...schema,
    "@context": "https://schema.org" as const,
  };
}

/**
 * Generate BreadcrumbList schema
 */
export function generateBreadcrumbSchema(
  breadcrumbs: { name: string; url: string }[]
): WithContext<BreadcrumbListSchema> {
  const itemListElement = breadcrumbs.map((crumb, index) => ({
    "@type": "ListItem" as const,
    position: index + 1,
    name: crumb.name,
    item: crumb.url,
  }));

  return {
    "@type": "BreadcrumbList",
    itemListElement,
    "@context": "https://schema.org",
  } as WithContext<BreadcrumbListSchema>;
}

/**
 * Generate WebSite schema (for homepage)
 */
export function generateWebSiteSchema(params: {
  name: string;
  description: string;
  url: string;
  locale?: string;
  includeAuthor?: boolean;
}): WithContext<WebSiteSchema> {
  const {
    name,
    description,
    url,
    locale = "es",
    includeAuthor = true,
  } = params;

  const schema: WebSiteSchema = {
    "@type": "WebSite",
    name,
    description,
    url,
    inLanguage: locale,
  };

  if (includeAuthor) {
    schema.author = {
      "@type": "Person",
      name: INFO.name,
      url: INFO.website,
      image: INFO.profilePhoto,
    };
  }

  return {
    ...schema,
    "@context": "https://schema.org" as const,
  };
}

/**
 * Generate ImageObject schema
 */
export function generateImageObjectSchema(params: {
  url: string;
  width?: number;
  height?: number;
  caption?: string;
  author?: string;
}): WithContext<ImageObjectSchema> {
  const { url, width, height, caption, author = INFO.name } = params;

  const schema: ImageObjectSchema = {
    "@type": "ImageObject",
    url,
    author,
  };

  if (width) schema.width = width;
  if (height) schema.height = height;
  if (caption) schema.caption = caption;

  return {
    ...schema,
    "@context": "https://schema.org" as const,
  };
}

/**
 * Helper to convert schema to JSON-LD script tag
 */
export function schemaToJsonLd(schema: Thing): string {
  return JSON.stringify(schema, null, 0);
}
