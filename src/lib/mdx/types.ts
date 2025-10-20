import { z } from "zod";
import type { ArticleCategoryKey, WorkCategoryKey } from "@/lib/categories";
import {
  getValidArticleCategoryKeys,
  getValidWorkCategoryKeys,
} from "@/lib/categories";

/**
 * SEO metadata schema for MDX content
 */
export const SEOMetadataSchema = z.object({
  keywords: z.array(z.string()).optional(),
  ogImage: z.string().optional(),
  ogDescription: z.string().optional(),
});

/**
 * Get valid article category keys for validation
 */
const getArticleCategoryKeysForZod = (): [string, ...string[]] => {
  const keys = getValidArticleCategoryKeys();
  return keys as [string, ...string[]];
};

/**
 * Get valid work category keys for validation
 */
const getWorkCategoryKeysForZod = (): [string, ...string[]] => {
  const keys = getValidWorkCategoryKeys();
  return keys as [string, ...string[]];
};

/**
 * Base frontmatter schema (without category - to be extended)
 */
const BaseWithoutCategorySchema = z.object({
  title: z.string(),
  description: z.string(),
  publishedAt: z.string(),
  updatedAt: z.string().optional(),
  author: z.string().default("Enrique Velasco"),
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
export const ArticleFrontmatterSchema = BaseWithoutCategorySchema.extend({
  contentType: z.literal("article").default("article"),
  category: z.enum(getArticleCategoryKeysForZod(), {
    message:
      "Invalid category. Must be a valid article category key from article-categories.json",
  }) as z.ZodType<ArticleCategoryKey>,
  // Article-specific fields can be added here
});

/**
 * Work/Project-specific frontmatter schema
 */
export const WorkFrontmatterSchema = BaseWithoutCategorySchema.extend({
  contentType: z.literal("work").default("work"),
  category: z.enum(getWorkCategoryKeysForZod(), {
    message:
      "Invalid category. Must be a valid work category key from work-categories.json",
  }) as z.ZodType<WorkCategoryKey>,
  // Work-specific fields
  client: z.string().optional(),
  projectUrl: z.string().url().optional(),
  technologies: z.array(z.string()).default([]),
  duration: z.string().optional(),
  role: z.string().optional(),
});

// TypeScript types derived from Zod schemas
export type SEOMetadata = z.infer<typeof SEOMetadataSchema>;
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
