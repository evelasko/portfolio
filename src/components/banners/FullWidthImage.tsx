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
      <CldImage
        src={image}
        alt={alt}
        width={1920}
        height={1080}
        sizes="100vw"
        quality="auto"
        format="auto"
        className="h-auto w-full"
      />
      {children && <div className="absolute inset-0">{children}</div>}
    </div>
  );
}
