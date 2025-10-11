import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { readingTime as calculateReadingTime } from "reading-time-estimator";
import { notFound } from "next/navigation";
import {
  validateArticleFrontmatter,
  validateWorkFrontmatter,
} from "./validation";
import type {
  ArticleFrontmatter,
  WorkFrontmatter,
  ContentListItem,
  ContentCategory,
  ContentType,
} from "./types";

/**
 * Get the content directory path
 */
function getContentDir(contentType: ContentType): string {
  return path.join(process.cwd(), "content", contentType === "article" ? "articles" : "works");
}

/**
 * Get path to a specific MDX file
 */
function getContentPath(
  contentType: ContentType,
  locale: string,
  slug: string,
): string {
  return path.join(getContentDir(contentType), locale, `${slug}.mdx`);
}

/**
 * Check if MDX file exists
 */
export async function contentExists(
  contentType: ContentType,
  locale: string,
  slug: string,
): Promise<boolean> {
  try {
    const filePath = getContentPath(contentType, locale, slug);
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Read and parse MDX file
 */
async function readMDXFile(filePath: string): Promise<{
  content: string;
  data: Record<string, unknown>;
}> {
  try {
    const source = await fs.readFile(filePath, "utf-8");
    const { content, data } = matter(source);
    return { content, data };
  } catch (error) {
    throw new Error(`Failed to read MDX file at ${filePath}: ${error}`);
  }
}

/**
 * Get all MDX file slugs for a content type and locale
 */
export async function getContentSlugs(
  contentType: ContentType,
  locale: string,
): Promise<string[]> {
  try {
    const contentDir = path.join(getContentDir(contentType), locale);
    const files = await fs.readdir(contentDir);
    return files
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => file.replace(/\.mdx$/, ""))
      .sort();
  } catch (error) {
    console.warn(
      `No content found for ${contentType} in locale ${locale}:`,
      error,
    );
    return [];
  }
}

/**
 * Get raw article data (frontmatter + content)
 */
export async function getArticleData(
  locale: string,
  slug: string,
): Promise<{
  slug: string;
  locale: string;
  frontmatter: ArticleFrontmatter;
  content: string;
  readingTime: { text: string; minutes: number; words: number };
}> {
  const exists = await contentExists("article", locale, slug);
  if (!exists) {
    notFound();
  }

  const filePath = getContentPath("article", locale, slug);
  const { content, data } = await readMDXFile(filePath);

  // Validate frontmatter
  const frontmatter = validateArticleFrontmatter(data, slug, locale);

  // Calculate reading time if not provided
  const readingTime =
    frontmatter.readingTime !== undefined
      ? {
          text: `${frontmatter.readingTime} min read`,
          minutes: frontmatter.readingTime,
          words: content.split(/\s+/).length,
        }
      : calculateReadingTime(content, 200, "en");

  return {
    slug,
    locale,
    frontmatter,
    content,
    readingTime,
  };
}

/**
 * Get raw work data (frontmatter + content)
 */
export async function getWorkData(
  locale: string,
  slug: string,
): Promise<{
  slug: string;
  locale: string;
  frontmatter: WorkFrontmatter;
  content: string;
  readingTime: { text: string; minutes: number; words: number };
}> {
  const exists = await contentExists("work", locale, slug);
  if (!exists) {
    notFound();
  }

  const filePath = getContentPath("work", locale, slug);
  const { content, data } = await readMDXFile(filePath);

  // Validate frontmatter
  const frontmatter = validateWorkFrontmatter(data, slug, locale);

  // Calculate reading time
  const readingTime =
    frontmatter.readingTime !== undefined
      ? {
          text: `${frontmatter.readingTime} min read`,
          minutes: frontmatter.readingTime,
          words: content.split(/\s+/).length,
        }
      : calculateReadingTime(content, 200, "en");

  return {
    slug,
    locale,
    frontmatter,
    content,
    readingTime,
  };
}

/**
 * Get all articles for a locale
 */
export async function getAllArticles(
  locale: string,
  options: {
    includeDrafts?: boolean;
    sortBy?: "publishedAt" | "updatedAt" | "title";
    sortOrder?: "asc" | "desc";
    category?: string;
    featured?: boolean;
  } = {},
): Promise<ContentListItem<ArticleFrontmatter>[]> {
  const {
    includeDrafts = false,
    sortBy = "publishedAt",
    sortOrder = "desc",
    category,
    featured,
  } = options;

  const slugs = await getContentSlugs("article", locale);

  const articles = await Promise.all(
    slugs.map(async (slug) => {
      const data = await getArticleData(locale, slug);

      // Generate excerpt from content (first 160 characters)
      const excerpt = data.content
        .replace(/^#.*$/gm, "") // Remove headings
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Remove markdown links
        .replace(/[*_~`]/g, "") // Remove markdown formatting
        .trim()
        .slice(0, 160);

      return {
        slug: data.slug,
        locale: data.locale,
        frontmatter: data.frontmatter,
        excerpt: excerpt ? `${excerpt}...` : undefined,
        readingTime: data.readingTime,
      };
    }),
  );

  // Filter
  let filtered = articles;

  if (!includeDrafts) {
    filtered = filtered.filter((article) => !article.frontmatter.draft);
  }

  if (category) {
    filtered = filtered.filter(
      (article) =>
        article.frontmatter.category.toLowerCase() === category.toLowerCase(),
    );
  }

  if (featured !== undefined) {
    filtered = filtered.filter(
      (article) => article.frontmatter.featured === featured,
    );
  }

  // Sort
  filtered.sort((a, b) => {
    let aValue: string | boolean;
    let bValue: string | boolean;

    if (sortBy === "publishedAt") {
      aValue = a.frontmatter.publishedAt;
      bValue = b.frontmatter.publishedAt;
    } else if (sortBy === "updatedAt") {
      aValue = a.frontmatter.updatedAt || a.frontmatter.publishedAt;
      bValue = b.frontmatter.updatedAt || b.frontmatter.publishedAt;
    } else {
      aValue = a.frontmatter.title;
      bValue = b.frontmatter.title;
    }

    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1;
    }
    return aValue < bValue ? 1 : -1;
  });

  return filtered;
}

/**
 * Get all works for a locale
 */
export async function getAllWorks(
  locale: string,
  options: {
    includeDrafts?: boolean;
    sortBy?: "publishedAt" | "updatedAt" | "title";
    sortOrder?: "asc" | "desc";
    category?: string;
    featured?: boolean;
  } = {},
): Promise<ContentListItem<WorkFrontmatter>[]> {
  const {
    includeDrafts = false,
    sortBy = "publishedAt",
    sortOrder = "desc",
    category,
    featured,
  } = options;

  const slugs = await getContentSlugs("work", locale);

  const works = await Promise.all(
    slugs.map(async (slug) => {
      const data = await getWorkData(locale, slug);

      // Generate excerpt
      const excerpt = data.content
        .replace(/^#.*$/gm, "")
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
        .replace(/[*_~`]/g, "")
        .trim()
        .slice(0, 160);

      return {
        slug: data.slug,
        locale: data.locale,
        frontmatter: data.frontmatter,
        excerpt: excerpt ? `${excerpt}...` : undefined,
        readingTime: data.readingTime,
      };
    }),
  );

  // Filter
  let filtered = works;

  if (!includeDrafts) {
    filtered = filtered.filter((work) => !work.frontmatter.draft);
  }

  if (category) {
    filtered = filtered.filter(
      (work) =>
        work.frontmatter.category.toLowerCase() === category.toLowerCase(),
    );
  }

  if (featured !== undefined) {
    filtered = filtered.filter(
      (work) => work.frontmatter.featured === featured,
    );
  }

  // Sort
  filtered.sort((a, b) => {
    let aValue: string | boolean;
    let bValue: string | boolean;

    if (sortBy === "publishedAt") {
      aValue = a.frontmatter.publishedAt;
      bValue = b.frontmatter.publishedAt;
    } else if (sortBy === "updatedAt") {
      aValue = a.frontmatter.updatedAt || a.frontmatter.publishedAt;
      bValue = b.frontmatter.updatedAt || b.frontmatter.publishedAt;
    } else {
      aValue = a.frontmatter.title;
      bValue = b.frontmatter.title;
    }

    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1;
    }
    return aValue < bValue ? 1 : -1;
  });

  return filtered;
}

/**
 * Get all categories for a content type and locale
 */
export async function getContentCategories(
  contentType: ContentType,
  locale: string,
): Promise<ContentCategory[]> {
  const items =
    contentType === "article"
      ? await getAllArticles(locale, { includeDrafts: false })
      : await getAllWorks(locale, { includeDrafts: false });

  const categoryMap = new Map<string, number>();

  items.forEach((item) => {
    const category = item.frontmatter.category;
    categoryMap.set(category, (categoryMap.get(category) || 0) + 1);
  });

  return Array.from(categoryMap.entries())
    .map(([name, count]) => ({
      name,
      slug: name.toLowerCase().replace(/\s+/g, "-"),
      count,
      locale,
    }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Get alternate locale slug for content
 */
export async function getAlternateLocaleSlug(
  contentType: ContentType,
  currentLocale: string,
  currentSlug: string,
  targetLocale: string,
): Promise<string | null> {
  try {
    const data =
      contentType === "article"
        ? await getArticleData(currentLocale, currentSlug)
        : await getWorkData(currentLocale, currentSlug);

    return data.frontmatter.alternateLocales?.[targetLocale] || null;
  } catch {
    return null;
  }
}
