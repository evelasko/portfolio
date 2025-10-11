import { z } from "zod";

/**
 * SEO metadata schema for MDX content
 */
export const SEOMetadataSchema = z.object({
  keywords: z.array(z.string()).optional(),
  ogImage: z.string().optional(),
  ogDescription: z.string().optional(),
});

/**
 * Base frontmatter schema shared by all content types
 */
export const BaseFrontmatterSchema = z.object({
  title: z.string(),
  description: z.string(),
  publishedAt: z.string(),
  updatedAt: z.string().optional(),
  author: z.string().default("Enrique Velasco"),
  category: z.string(),
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
 * Content type discriminator
 */
export type ContentType = "article" | "work";

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
