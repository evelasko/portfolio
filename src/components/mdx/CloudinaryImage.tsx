import { CldImage } from "next-cloudinary";
import Image from "next/image";
import type { ImageProps } from "next/image";

/**
 * Extract Cloudinary public ID from full URL
 * Example: https://res.cloudinary.com/cloud/image/upload/v123/folder/image.jpg -> folder/image
 */
function extractPublicId(url: string): string {
  if (!url.includes("cloudinary.com")) {
    return url;
  }

  try {
    // Remove base URL and version
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
 * Check if a URL or path is a Cloudinary URL
 */
function isCloudinaryUrl(src: string): boolean {
  return src.includes("cloudinary.com") || src.includes("res.cloudinary");
}

export interface CloudinaryImageProps extends Omit<ImageProps, "src" | "quality"> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  crop?: "fill" | "fit" | "scale" | "thumb" | "pad";
  gravity?: "auto" | "auto:subject" | "center" | "face" | "faces";
  quality?: "auto" | "auto:best" | "auto:good" | "auto:eco" | "auto:low";
  format?: "auto";
}

/**
 * Enhanced image component that automatically optimizes Cloudinary images
 * while falling back to Next.js Image for local files
 */
export function CloudinaryImage({
  src,
  alt,
  width = 800,
  height = 450,
  crop = "fill",
  gravity = "auto",
  quality = "auto",
  format = "auto",
  className = "",
  sizes,
  priority = false,
  fill,
  ...props
}: CloudinaryImageProps) {
  // Handle Cloudinary URLs
  if (isCloudinaryUrl(src)) {
    const publicId = extractPublicId(src);

    // Handle fill mode
    if (fill) {
      return (
        <CldImage
          src={publicId}
          alt={alt}
          fill
          crop={crop}
          gravity={gravity}
          quality={quality}
          format={format}
          loading={priority ? undefined : "lazy"}
          sizes={sizes}
          className={className}
          {...props}
        />
      );
    }

    return (
      <CldImage
        src={publicId}
        width={width}
        height={height}
        alt={alt}
        crop={crop}
        gravity={gravity}
        quality={quality}
        format={format}
        loading={priority ? undefined : "lazy"}
        sizes={sizes}
        className={className}
        {...props}
      />
    );
  }

  // Fallback to Next.js Image for local files
  const imageSrc = src.startsWith("/") ? src : `/${src}`;

  // Handle fill mode for local images
  if (fill) {
    return (
      <Image
        src={imageSrc}
        alt={alt}
        fill
        className={className}
        sizes={sizes}
        priority={priority}
        {...props}
      />
    );
  }

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      sizes={sizes}
      priority={priority}
      {...props}
    />
  );
}

/**
 * Responsive CloudinaryImage with automatic srcset generation
 * Best for article/work cover images
 */
export function ResponsiveCloudinaryImage({
  src,
  alt,
  aspectRatio = "16/9",
  className = "",
  priority = false,
  ...props
}: Omit<CloudinaryImageProps, "width" | "height"> & {
  aspectRatio?: "16/9" | "4/3" | "1/1" | "21/9";
}) {
  // Calculate dimensions based on aspect ratio
  const aspectRatios = {
    "16/9": { width: 1600, height: 900 },
    "4/3": { width: 1600, height: 1200 },
    "1/1": { width: 1200, height: 1200 },
    "21/9": { width: 2100, height: 900 },
  };

  const { width, height } = aspectRatios[aspectRatio];

  return (
    <CloudinaryImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes="(max-width: 810px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className={className}
      priority={priority}
      {...props}
    />
  );
}

/**
 * CloudinaryImage optimized for article/work card thumbnails
 */
export function CloudinaryThumbnail({
  src,
  alt,
  className = "",
  fill,
  ...props
}: Omit<CloudinaryImageProps, "width" | "height" | "crop" | "gravity">) {
  // If fill mode is requested, don't pass width/height
  if (fill) {
    return (
      <CloudinaryImage
        src={src}
        alt={alt}
        fill
        crop="fill"
        gravity="auto:subject"
        quality="auto"
        className={className}
        {...props}
      />
    );
  }

  // Otherwise use fixed dimensions
  return (
    <CloudinaryImage
      src={src}
      alt={alt}
      width={800}
      height={450}
      crop="fill"
      gravity="auto:subject"
      quality="auto"
      className={className}
      {...props}
    />
  );
}