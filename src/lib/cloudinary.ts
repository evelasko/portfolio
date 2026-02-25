/**
 * Cloudinary Configuration and Utilities
 *
 * This module provides helper functions for working with Cloudinary images
 * in your portfolio project.
 */

/**
 * Cloudinary configuration
 * Update this with your Cloudinary cloud name
 */
export const cloudinaryConfig = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "evelasco",
  baseUrl: `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "evelasco"}/image/upload`,
};

/**
 * Image transformation options
 */
export interface CloudinaryTransformOptions {
  width?: number;
  height?: number;
  crop?: "fill" | "fit" | "scale" | "thumb" | "pad" | "limit";
  gravity?: "auto" | "auto:subject" | "center" | "face" | "faces" | "north";
  quality?:
    | "auto"
    | "auto:best"
    | "auto:good"
    | "auto:eco"
    | "auto:low"
    | number;
  format?: "auto" | "webp" | "avif" | "jpg" | "png";
  effect?: string;
  dpr?: "auto" | 1 | 2 | 3;
}

/**
 * Generate an optimized Cloudinary URL
 *
 * @param publicId - The Cloudinary public ID (e.g., "articles/my-article")
 * @param options - Transformation options
 * @returns Optimized Cloudinary URL
 *
 * @example
 * ```ts
 * const url = getOptimizedImageUrl("articles/ai-choreographer", {
 *   width: 800,
 *   height: 450,
 *   crop: "fill",
 *   quality: "auto",
 * });
 * ```
 */
export function getOptimizedImageUrl(
  publicId: string,
  options: CloudinaryTransformOptions = {}
): string {
  const {
    width = 800,
    height = 450,
    crop = "fill",
    gravity = "auto",
    quality = "auto",
    format = "auto",
    effect,
    dpr = "auto",
  } = options;

  // Build transformation string
  const transformations: string[] = [];

  if (crop) transformations.push(`c_${crop}`);
  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (gravity) transformations.push(`g_${gravity}`);
  if (quality) transformations.push(`q_${quality}`);
  if (format) transformations.push(`f_${format}`);
  if (dpr) transformations.push(`dpr_${dpr}`);
  if (effect) transformations.push(`e_${effect}`);

  const transformString = transformations.join(",");

  return `${cloudinaryConfig.baseUrl}/${transformString}/${publicId}`;
}

/**
 * Preset configurations for common use cases
 */
export const cloudinaryPresets = {
  /**
   * Article/Work card thumbnail (800x450)
   */
  thumbnail: (publicId: string) =>
    getOptimizedImageUrl(publicId, {
      width: 800,
      height: 450,
      crop: "fill",
      gravity: "auto:subject",
      quality: "auto",
      format: "auto",
    }),

  /**
   * Article hero image (1920x1080)
   */
  hero: (publicId: string) =>
    getOptimizedImageUrl(publicId, {
      width: 1920,
      height: 1080,
      crop: "fill",
      gravity: "auto",
      quality: "auto:best",
      format: "auto",
    }),

  /**
   * Mobile thumbnail (400x225)
   */
  mobileThumbnail: (publicId: string) =>
    getOptimizedImageUrl(publicId, {
      width: 400,
      height: 225,
      crop: "fill",
      gravity: "auto:subject",
      quality: "auto",
      format: "auto",
    }),

  /**
   * Blur placeholder for loading states (50x28)
   */
  blurPlaceholder: (publicId: string) =>
    getOptimizedImageUrl(publicId, {
      width: 50,
      height: 28,
      crop: "fill",
      quality: "auto:low",
      effect: "blur:1000",
    }),

  /**
   * Square profile image (400x400)
   */
  profile: (publicId: string) =>
    getOptimizedImageUrl(publicId, {
      width: 400,
      height: 400,
      crop: "fill",
      gravity: "face",
      quality: "auto",
      format: "auto",
    }),

  /**
   * Full width responsive image
   */
  fullWidth: (publicId: string) =>
    getOptimizedImageUrl(publicId, {
      width: 2400,
      crop: "limit",
      quality: "auto",
      format: "auto",
    }),
};

/**
 * Generate responsive srcset for different screen sizes
 *
 * @param publicId - The Cloudinary public ID
 * @param widths - Array of widths to generate (default: [400, 800, 1200, 1600, 2400])
 * @returns Object with srcset and sizes strings
 *
 * @example
 * ```ts
 * const { srcset, sizes } = getResponsiveSrcSet("articles/my-article");
 * <img srcSet={srcset} sizes={sizes} />
 * ```
 */
export function getResponsiveSrcSet(
  publicId: string,
  widths: number[] = [400, 800, 1200, 1600, 2400]
): { srcset: string; sizes: string } {
  const srcset = widths
    .map(width => {
      const url = getOptimizedImageUrl(publicId, {
        width,
        crop: "scale",
        quality: "auto",
        format: "auto",
      });
      return `${url} ${width}w`;
    })
    .join(", ");

  const sizes = "(max-width: 810px) 100vw, (max-width: 1200px) 50vw, 33vw";

  return { srcset, sizes };
}

/**
 * Check if a string is a Cloudinary URL
 */
export function isCloudinaryUrl(url: string): boolean {
  return url.includes("cloudinary.com") || url.includes("res.cloudinary");
}

/**
 * Extract public ID from Cloudinary URL
 *
 * @param url - Full Cloudinary URL
 * @returns Public ID
 *
 * @example
 * ```ts
 * extractPublicId("https://res.cloudinary.com/demo/image/upload/v123/sample.jpg")
 * // Returns: "sample"
 * ```
 */
export function extractPublicId(url: string): string {
  if (!isCloudinaryUrl(url)) {
    return url;
  }

  try {
    const parts = url.split("/upload/");
    if (parts.length < 2) return url;

    let publicId = parts[1];

    // Remove version number (v1234567890/)
    publicId = publicId.replace(/^v\d+\//, "");

    // Remove file extension
    publicId = publicId.replace(/\.(jpg|jpeg|png|gif|webp|avif)$/i, "");

    return publicId;
  } catch (error) {
    console.error("Error extracting Cloudinary public ID:", error);
    return url;
  }
}

/**
 * Content author helpers - simplified interfaces
 */
export const contentHelpers = {
  /**
   * Get a Cloudinary URL for an article cover image
   * Just provide the folder/filename, get back optimized URL
   */
  articleCover: (filename: string) =>
    cloudinaryPresets.thumbnail(`articles/${filename}`),

  /**
   * Get a Cloudinary URL for a work cover image
   */
  workCover: (filename: string) =>
    cloudinaryPresets.thumbnail(`works/${filename}`),

  /**
   * Get a Cloudinary URL for any image in your library
   */
  image: (path: string, options?: CloudinaryTransformOptions) =>
    getOptimizedImageUrl(path, options),
};
