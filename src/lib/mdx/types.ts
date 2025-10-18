import { z } from "zod";
import { getValidCategoryNames } from "@/lib/categories";

/**
 * SEO metadata schema for MDX content
 */
export const SEOMetadataSchema = z.object({
  keywords: z.array(z.string()).optional(),
  ogImage: z.string().optional(),
  ogDescription: z.string().optional(),
});

/**
 * Get valid category names for both English and Spanish
 * This is used to create the Zod enum for category validation
 */
const getValidCategories = (): [string, ...string[]] => {
  const enCategories = getValidCategoryNames("en");
  const esCategories = getValidCategoryNames("es");
  const allCategories = [...new Set([...enCategories, ...esCategories])];

  if (allCategories.length === 0) {
    // Fallback in case categories aren't loaded
    return ["Art + Technology"];
  }

  return allCategories as [string, ...string[]];
};

/**
 * Base frontmatter schema shared by all content types
 */
export const BaseFrontmatterSchema = z.object({
  title: z.string(),
  description: z.string(),
  publishedAt: z.string(),
  updatedAt: z.string().optional(),
  author: z.string().default("Enrique Velasco"),
  category: z.enum(getValidCategories(), {
    errorMap: () => ({
      message:
        "Invalid category. Must be a valid category from article-categories.json",
    }),
  }),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
  coverImage: z.string().optional(),
  readingTime: z.number().optional(),
  seo: SEOMetadataSchema.optional(),
  alternateLocales: z.record(z.string(), z.string()).optional(),
});

/**
 * Article-specific frontmatter schema
 */
export const ArticleFrontmatterSchema = BaseFrontmatterSchema.extend({
  contentType: z.literal("article").default("article"),
  // Article-specific fields can be added here
});

/**
 * Work/Project-specific frontmatter schema
 */
export const WorkFrontmatterSchema = BaseFrontmatterSchema.extend({
  contentType: z.literal("work").default("work"),
  // Work-specific fields
  client: z.string().optional(),
  projectUrl: z.string().url().optional(),
  technologies: z.array(z.string()).default([]),
  duration: z.string().optional(),
  role: z.string().optional(),
});

// TypeScript types derived from Zod schemas
export type SEOMetadata = z.infer<typeof SEOMetadataSchema>;
export type BaseFrontmatter = z.infer<typeof BaseFrontmatterSchema>;
export type ArticleFrontmatter = z.infer<typeof ArticleFrontmatterSchema>;
export type WorkFrontmatter = z.infer<typeof WorkFrontmatterSchema>;

// Union type for all content types
export type ContentFrontmatter = ArticleFrontmatter | WorkFrontmatter;

/**
 * Legal-specific frontmatter schema
 */
export const LegalFrontmatterSchema = z.object({
  contentType: z.literal("legal").default("legal"),
  title: z.string(),
  description: z.string(),
  updatedAt: z.string(),
  author: z.string().default("Enrique Velasco"),
  seo: SEOMetadataSchema.optional(),
  alternateLocales: z.record(z.string(), z.string()).optional(),
});

// Legal frontmatter TypeScript type
export type LegalFrontmatter = z.infer<typeof LegalFrontmatterSchema>;

/**
 * Content type discriminator
 */
export type ContentType = "article" | "work" | "legal";

/**
 * MDX content with metadata
 */
export interface MDXContent<T extends ContentFrontmatter = ContentFrontmatter> {
  slug: string;
  locale: string;
  frontmatter: T;
  content: React.ReactElement;
  readingTime?: {
    text: string;
    minutes: number;
    words: number;
  };
}

/**
 * Content listing item (without full content)
 */
export interface ContentListItem<
  T extends ContentFrontmatter = ContentFrontmatter,
> {
  slug: string;
  locale: string;
  frontmatter: T;
  excerpt?: string;
  readingTime?: {
    text: string;
    minutes: number;
    words: number;
  };
}

/**
 * Content category
 */
export interface ContentCategory {
  name: string;
  slug: string;
  count: number;
  locale: string;
}

/**
 * Search index entry
 */
export interface SearchIndexEntry {
  type: ContentType;
  slug: string;
  locale: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  content: string; // Processed text content
  url: string;
  publishedAt: string;
}
