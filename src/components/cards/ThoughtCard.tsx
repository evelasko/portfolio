"use client";

import { motion } from "motion/react";
import { TYPOGRAPHY } from "@/lib/typography";
import clsx from "clsx";
import Link from "next/link";
import { CloudinaryThumbnail } from "@/components/mdx/CloudinaryImage";

/**
 * ThoughtCard
 * padding: L & M: 40px horizontal, 20px vertical, S: 20px horizontal, 10px vertical
 * publishedAt and readingTime labels: TYPOGRAPHY.text16, color black-40.
 * @param title - string, h6 tag,TYPOGRAPHY.h6, color black-80
 * @param publishedAt - string, TYPOGRAPHY.text16, color black-90
 * @param readingTime - number, TYPOGRAPHY.text16, color black-90
 * @param image - string, image url
 * @param link - string, link url
 */
export default function ThoughtCard({
  title,
  publishedAt,
  readingTime,
  image,
  link,
}: {
  title: string;
  publishedAt: string;
  readingTime: number;
  image: string;
  link: string;
}) {
  return (
    <Link href={link} className="block">
      <motion.article
        className="bg-white-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 group"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Image */}
        <div className="relative w-full aspect-[16/9] overflow-hidden">
          <CloudinaryThumbnail
            src={image}
            alt={title}
            sizes="(max-width: 810px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            fill
          />
        </div>

        {/* Content */}
        <div className="px-5 py-3 l:px-10 l:py-5 m:px-10 m:py-5">
          {/* Title */}
          <motion.h6
            className={clsx(TYPOGRAPHY.h6, "text-black-80 mb-4")}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
            }}
            viewport={{ once: true }}
          >
            {title}
          </motion.h6>

          {/* Metadata */}
          <motion.div
            className="flex flex-col gap-2 l:flex-row l:justify-between l:items-center"
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
            <div className="flex items-center gap-2">
              <span className={clsx(TYPOGRAPHY.text16, "text-black-40")}>
                Published
              </span>
              <span className={clsx(TYPOGRAPHY.text16, "text-black-90")}>
                {publishedAt}
              </span>
            </div>

            {/* Reading Time */}
            <div className="flex items-center gap-2">
              <span className={clsx(TYPOGRAPHY.text16, "text-black-40")}>
                Reading Time
              </span>
              <span className={clsx(TYPOGRAPHY.text16, "text-black-90")}>
                {readingTime} min{readingTime > 1 ? "s" : ""}
              </span>
            </div>
          </motion.div>
        </div>
      </motion.article>
    </Link>
  );
}
