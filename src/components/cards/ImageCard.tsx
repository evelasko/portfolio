"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { TYPOGRAPHY } from "@/lib/typography";
import { useState, useMemo } from "react";
import clsx from "clsx";
import { CloudinaryThumbnail } from "@/components/mdx/CloudinaryImage";
import {
  getOptimizedImageUrl,
  isCloudinaryUrl,
  extractPublicId,
} from "@/lib/cloudinary";
import React from "react";

interface ImageCardProps {
  image: string;
  imageAlt?: string;
  label?: string;
  title: string;
  description?: string;
  link?: string;
  extraContent?: React.ReactNode;
  centerTitle?: boolean;
  centerContent?: boolean;
}

export default function ImageCard({
  image,
  imageAlt,
  label,
  title,
  description,
  link,
  extraContent,
  centerTitle = false,
  centerContent = false,
}: ImageCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Generate optimized background URL for CSS background-image
  const backgroundImageUrl = useMemo(() => {
    if (isCloudinaryUrl(image)) {
      // Extract public ID from full URL to avoid double-stacking URLs
      const publicId = extractPublicId(image);
      return getOptimizedImageUrl(publicId, {
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
      className="relative bg-black/[0.02] rounded-xl border border-black/5 overflow-hidden shadow-md"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      animate={{
        scale: isHovered ? 1.02 : 1,
        boxShadow: isHovered
          ? "0px 30px 18px -8px rgba(0, 0, 0, 0.1)"
          : "0px 13px 10px -7px rgba(0, 0, 0, 0.1)",
      }}
      transition={{ duration: 0.4, ease: [0.175, 0.885, 0, 1] }}
    >
      {/* Image Container - Visible image area, prevents text overlap */}
      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-t-xl">
        {/* Base Image - Provides aspect ratio and displays the actual image */}
        <CloudinaryThumbnail
          src={image}
          alt={imageAlt || title}
          fill
          className="object-cover"
          sizes="(max-width: 810px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Hover Image Overlay - Expands to cover entire card on hover */}
      <motion.div
        className="absolute top-0 left-0 right-0 bg-cover bg-center bg-no-repeat rounded-t-xl overflow-hidden pointer-events-none"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        animate={{
          height: isHovered ? "100%" : "0%",
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Inner image with subtle scale animation */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImageUrl})` }}
          animate={{
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </motion.div>

      {/* White Overlay - Fades in on hover */}
      <motion.div
        className="absolute top-0 left-0 right-0 rounded-t-xl pointer-events-none"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.4)",
        }}
        animate={{
          height: isHovered ? "100%" : "0%",
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
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
        className={clsx(
          "relative z-20 rounded-b-xl px-6 pt-6 pb-1 l:px-8 l:pt-8 l:pb-2",
          centerContent ? "text-center" : ""
        )}
        animate={{
          backgroundColor: isHovered
            ? "rgba(255, 255, 255, 0)"
            : "rgba(0, 0, 0, 0.002)",
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
            "mb-6 leading-[1.1em] font-extrabold",
            "text-black-90",
            "transition-all duration-300 ease-in-out",
            "text-shadow-zinc-600/[0.05] text-shadow-lg",
            centerTitle ? "text-center" : ""
          )}
        >
          {title.includes("|")
            ? title.split("|").map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < title.split("|").length - 1 && <br />}
                </React.Fragment>
              ))
            : title}
        </h3>

        {/* Description */}
        {description && (
          <p
            className={clsx(TYPOGRAPHY.text16, "pb-6")}
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
