"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { CloudinaryThumbnail } from "@/components/mdx/CloudinaryImage";
import clsx from "clsx";
import { TYPOGRAPHY } from "@/lib/typography";
/**
 * ThoughtCardMinimal
 * padding: L & M: 40px horizontal, 20px vertical, S: 20px horizontal, 10px vertical
 * @param title - string, TYPOGRAPHY.h6, color black-80
 * @param publishedAt - string, TYPOGRAPHY.text16, color black-40
 * @param readingTime - string (optional), TYPOGRAPHY.text16, color black-40
 * @param image - string, image url (Cloudinary URL or public ID)
 * @param link - string, link url
 */
export default function ThoughtCardMinimal({
  title,
  publishedAt,
  image,
  link,
  readingTime,
}: {
  title: string;
  publishedAt: string;
  image: string;
  link: string;
  readingTime?: string;
}) {
  return (
    <Link href={link} className="block group">
      <motion.article
        className="w-full"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
        viewport={{ once: true }}
      >
        {/* Image */}
        <div className="relative w-full aspect-video overflow-hidden rounded-lg mb-6">
          <CloudinaryThumbnail
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 810px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Content */}
        <div className="px-0 py-0">
          {/* Published Date & Reading Time Row */}
          <motion.div
            className="flex justify-between items-center mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.1,
              ease: "easeOut",
            }}
            viewport={{ once: true }}
          >
            {/* Published Date */}
            <p
              className={clsx(TYPOGRAPHY.mono14, "uppercase tracking-wider")}
              style={{
                color: "var(--color-black-40)",
                fontWeight: "var(--font-weight-regular)",
                lineHeight: "1.6em",
                letterSpacing: "0.1em",
              }}
            >
              {publishedAt}
            </p>

            {/* Reading Time */}
            {readingTime && (
              <p
                className={clsx(TYPOGRAPHY.mono14, "uppercase tracking-wider")}
                style={{
                  color: "var(--color-black-40)",
                  fontWeight: "var(--font-weight-regular)",
                  lineHeight: "1.6em",
                  letterSpacing: "0.1em",
                }}
              >
                {readingTime}
              </p>
            )}
          </motion.div>

          {/* Title */}
          <motion.h6
            className={clsx(
              TYPOGRAPHY.h9,
              "font-extrabold!",
              "group-hover:text-black-60 transition-colors duration-300"
            )}
            style={{
              color: "var(--color-black-80)",
              fontWeight: "var(--font-weight-bold)",
              lineHeight: "1.4em",
              letterSpacing: "-0.03em",
              marginBottom: "0",
            }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.2,
              ease: "easeOut",
            }}
            viewport={{ once: true }}
          >
            {title}
          </motion.h6>
        </div>
      </motion.article>
    </Link>
  );
}
