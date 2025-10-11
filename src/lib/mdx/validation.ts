import { ZodError } from "zod";
import {
  ArticleFrontmatterSchema,
  WorkFrontmatterSchema,
  type ArticleFrontmatter,
  type WorkFrontmatter,
  type ContentType,
} from "./types";

/**
 * Validation error with detailed information
 */
export class FrontmatterValidationError extends Error {
  constructor(
    public slug: string,
    public locale: string,
    public contentType: ContentType,
    public zodError: ZodError,
  ) {
    super(
      `Frontmatter validation failed for ${contentType} "${slug}" (${locale}):\n${zodError.message}`,
    );
    this.name = "FrontmatterValidationError";
  }
}

/**
 * Validate article frontmatter
 */
export function validateArticleFrontmatter(
  data: unknown,
  slug: string,
  locale: string,
): ArticleFrontmatter {
  try {
    return ArticleFrontmatterSchema.parse(data);
  } catch (error) {
    if (error instanceof ZodError) {
      throw new FrontmatterValidationError(slug, locale, "article", error);
    }
    throw error;
  }
}

/**
 * Validate work frontmatter
 */
export function validateWorkFrontmatter(
  data: unknown,
  slug: string,
  locale: string,
): WorkFrontmatter {
  try {
    return WorkFrontmatterSchema.parse(data);
  } catch (error) {
    if (error instanceof ZodError) {
      throw new FrontmatterValidationError(slug, locale, "work", error);
    }
    throw error;
  }
}

/**
 * Safe validation that returns either data or error
 */
export function safeValidateArticleFrontmatter(
  data: unknown,
  slug: string,
  locale: string,
): { success: true; data: ArticleFrontmatter } | { success: false; error: FrontmatterValidationError } {
  try {
    const validated = validateArticleFrontmatter(data, slug, locale);
    return { success: true, data: validated };
  } catch (error) {
    if (error instanceof FrontmatterValidationError) {
      return { success: false, error };
    }
    throw error;
  }
}

/**
 * Safe validation for work frontmatter
 */
export function safeValidateWorkFrontmatter(
  data: unknown,
  slug: string,
  locale: string,
): { success: true; data: WorkFrontmatter } | { success: false; error: FrontmatterValidationError } {
  try {
    const validated = validateWorkFrontmatter(data, slug, locale);
    return { success: true, data: validated };
  } catch (error) {
    if (error instanceof FrontmatterValidationError) {
      return { success: false, error };
    }
    throw error;
  }
}
