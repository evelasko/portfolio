"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { TYPOGRAPHY } from "@/lib/typography";
import { useState, useMemo } from "react";
import clsx from "clsx";
import { CloudinaryThumbnail } from "@/components/mdx/CloudinaryImage";
import { getOptimizedImageUrl, isCloudinaryUrl } from "@/lib/cloudinary";

interface ImageCardProps {
  image: string;
  imageAlt?: string;
  label?: string;
  title: string;
  description?: string;
  link?: string;
  extraContent?: React.ReactNode;
}

export default function ImageCard({
  image,
  imageAlt,
  label,
  title,
  description,
  link,
  extraContent,
}: ImageCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Generate optimized background URL for CSS background-image
  const backgroundImageUrl = useMemo(() => {
    if (isCloudinaryUrl(image)) {
      return getOptimizedImageUrl(image, {
        width: 800,
        height: 600,
        crop: "fill",
        gravity: "auto:subject",
        quality: "auto",
      });
    }
    return image;
  }, [image]);

  const CardContent = (
    <motion.article
      className="relative bg-white-100 rounded-xl overflow-hidden shadow-md"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      animate={{
        scale: isHovered ? 1.1 : 1,
        boxShadow: isHovered
          ? "0px 30px 18px -8px rgba(0, 0, 0, 0.1)"
          : "0px 13px 10px -7px rgba(0, 0, 0, 0.1)",
      }}
      transition={{ duration: 0.4, ease: [0.175, 0.885, 0, 1] }}
    >
      {/* Base Image - Static, only visible */}
      <div className="relative w-full aspect-[4/3]">
        <CloudinaryThumbnail
          src={image}
          alt={imageAlt || title}
          fill
          className="object-cover invisible"
          sizes="(max-width: 810px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Hover Image Overlay - Expands to fill entire card height on hover */}
      <motion.div
        className="absolute top-0 left-0 right-0 bg-cover bg-center bg-no-repeat rounded-t-xl"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        animate={{
          height: isHovered ? "100%" : "235px",
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />

      {/* White Overlay - Fades in on hover */}
      <motion.div
        className="absolute top-0 left-0 right-0 rounded-t-xl"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.4)",
        }}
        animate={{
          height: isHovered ? "100%" : "235px",
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />

      {/* Extra Content Overlay - Positioned at top, fades in from bottom */}
      {extraContent && (
        <motion.div
          className="absolute top-0 left-0 right-0 p-4 z-30"
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 10,
          }}
          transition={{ duration: 0.2 }}
        >
          {extraContent}
        </motion.div>
      )}

      {/* Info Section - Background becomes transparent on hover */}
      <motion.div
        className="relative z-20 rounded-b-xl px-6 py-5 l:px-8 l:py-6"
        animate={{
          backgroundColor: isHovered
            ? "rgba(255, 255, 255, 0)"
            : "rgba(255, 255, 255, 1)",
        }}
        transition={{ duration: 0.2 }}
      >
        {/* Label/Category */}
        {label && (
          <p
            className={clsx(
              TYPOGRAPHY.text14,
              "uppercase tracking-wider block mb-2"
            )}
            style={{
              color: isHovered ? "black" : "rgb(68, 68, 68)",
              fontWeight: "var(--font-weight-medium)",
            }}
          >
            {label}
          </p>
        )}

        {/* Title */}
        <h3
          className={clsx(
            TYPOGRAPHY.h8,
            "mb-3 leading-[1.1em] font-extrabold",
            "text-black-90",
            "hover:text-white transition-all duration-300 ease-in-out"
          )}
        >
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p
            className={clsx(TYPOGRAPHY.text16)}
            style={{
              color: isHovered ? "black" : "rgb(102, 102, 102)",
            }}
          >
            {description}
          </p>
        )}
      </motion.div>
    </motion.article>
  );

  // Wrap in Link if link is provided
  if (link) {
    return (
      <Link href={link} className="block">
        {CardContent}
      </Link>
    );
  }

  return CardContent;
}
