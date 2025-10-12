import Image from "next/image";
import type { ImageProps } from "next/image";

/**
 * Optimized image component for MDX content
 */
export function MDXImage({
  src,
  alt,
  width,
  height,
  ...props
}: ImageProps & { src: string; alt: string }) {
  // Handle relative paths
  const imageSrc = src.startsWith("/")
    ? src
    : src.includes("cloudinary") || src.includes("https")
      ? src
      : `/${src}`;

  // If width and height are provided, use them
  if (width && height) {
    return (
      <Image
        src={imageSrc}
        alt={alt}
        width={Number(width)}
        height={Number(height)}
        className="rounded-lg my-8"
        {...props}
      />
    );
  }

  // Otherwise use fill mode with aspect ratio container
  return (
    <div className="relative w-full my-8" style={{ aspectRatio: "16/9" }}>
      <Image
        src={imageSrc}
        alt={alt}
        fill
        className="rounded-lg object-cover"
        {...props}
      />
    </div>
  );
}
