"use client";
import { TYPOGRAPHY } from "@/lib/typography";
import clsx from "clsx";
import { CloudinaryImage } from "@/components/mdx/CloudinaryImage";

export type ColContent = {
  imagePath?: string;
  heading?: string;
  text?: string;
};

export interface TwoColContentProps {
  content: ColContent[];
  className?: string;
}

export default function TwoColContent({
  content,
  className,
}: TwoColContentProps) {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 m:grid-cols-2 gap-12 mt-8 px-18",
        className
      )}
    >
      {content.map((item, index) => (
        <div key={index}>
          {item.imagePath && (
            <div className="relative w-full aspect-video mb-6 overflow-hidden rounded-lg">
              <CloudinaryImage
                src={item.imagePath}
                alt={item.heading || "Image"}
                fill
                crop="fill"
                gravity="auto:subject"
                quality="auto"
                sizes="(max-width: 810px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          )}
          {item.heading && (
            <h4 className={clsx(TYPOGRAPHY.h5, "mb-4")}>{item.heading}</h4>
          )}
          {item.text && <p className={clsx(TYPOGRAPHY.text18)}>{item.text}</p>}
        </div>
      ))}
    </div>
  );
}
