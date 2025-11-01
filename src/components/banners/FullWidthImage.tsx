"use client";
import { CldImage } from "next-cloudinary";
import clsx from "clsx";

export default function FullWidthImage({
  image,
  alt,
  className,
  children,
}: {
  image: string;
  alt: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={clsx("relative w-full", className)}>
      {/* Mobile: Image as absolute background, container expands for content */}
      {/* Desktop: Image flows naturally, content absolutely positioned */}
      <CldImage
        src={image}
        alt={alt}
        width={1920}
        height={1080}
        sizes="100vw"
        quality="auto"
        format="auto"
        className="absolute inset-0 h-full w-full object-cover md:relative md:h-auto md:object-contain"
      />
      {children && (
        <div className="relative z-10 min-h-[56.25vw] md:absolute md:inset-0 md:min-h-0" style={{ isolation: 'auto' }}>
          {children}
        </div>
      )}
    </div>
  );
}
