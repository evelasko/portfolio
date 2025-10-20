"use client";

import { motion } from "motion/react";
import { TYPOGRAPHY } from "@/lib/typography";
import clsx from "clsx";
import PortfolioButton from "../buttons/PortfolioButton";
import { useMemo } from "react";
import { getOptimizedImageUrl, isCloudinaryUrl } from "@/lib/cloudinary";

/**
 * Connect Banner
 *
 * @param primary_text - h6 tag, TYPOGRAPHY.h6, color white-98, animate fade from bottom (offset 190) with ease Spring (physics: stiffness: 200, damping: 60, mass: 1)
 * @param key_text - h4 tag, TYPOGRAPHY.h5, color and animation same as primary_text
 * @param cta_label - CTA label
 * @param cta_link - CTA link
 * @returns Connect Banner
 */
export default function ConnectBanner({
  primary_text,
  key_text,
  cta_label,
  cta_link,
  background_image_path,
}: {
  primary_text: string;
  key_text: string;
  cta_label: string;
  cta_link: string;
  background_image_path?: string;
}) {
  const backgroundUrl = useMemo(() => {
    const imagePath = background_image_path || "/assets/backgrounds/abstract_neutral_1.jpg";

    if (isCloudinaryUrl(imagePath)) {
      return getOptimizedImageUrl(imagePath, {
        width: 2400,
        crop: "fill",
        gravity: "auto",
        quality: "auto",
        format: "auto",
      });
    }
    return imagePath;
  }, [background_image_path]);

  return (
    <section
      className="w-full relative bg-cover bg-center bg-no-repeat"
      style={{
        paddingTop: "200px",
        paddingRight: "60px",
        paddingBottom: "200px",
        paddingLeft: "60px",
        backgroundImage: `url(${backgroundUrl})`,
      }}
    >
      {/* Desktop Layout (L) */}
      <div className="hidden l:grid l:grid-cols-2 l:gap-20 l:items-start">
        {/* Left Column - Primary Text */}
        <motion.h6
          className={clsx(TYPOGRAPHY.h6, "text-white-98")}
          initial={{ opacity: 0, y: 190 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 60,
            mass: 1,
          }}
          viewport={{ once: true }}
        >
          {primary_text}
        </motion.h6>

        {/* Right Column - Key Text and CTA */}
        <div className="flex flex-col gap-10">
          <motion.h4
            className={clsx(TYPOGRAPHY.h5, "text-white-98")}
            initial={{ opacity: 0, y: 190 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 60,
              mass: 1,
            }}
            viewport={{ once: true }}
          >
            {key_text}
          </motion.h4>

          <motion.div
            initial={{ opacity: 0, y: 148 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.44, 0, 0.56, 1],
            }}
            viewport={{ once: true }}
          >
            <PortfolioButton variant="light" href={cta_link}>
              {cta_label}
            </PortfolioButton>
          </motion.div>
        </div>
      </div>

      {/* Tablet Layout (M) */}
      <div className="hidden m:flex l:hidden flex-col gap-16 items-center text-center">
        <motion.h6
          className={clsx(TYPOGRAPHY.h6, "text-white-98")}
          initial={{ opacity: 0, y: 190 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 60,
            mass: 1,
          }}
          viewport={{ once: true }}
        >
          {primary_text}
        </motion.h6>

        <motion.h4
          className={clsx(TYPOGRAPHY.h5, "text-white-98")}
          initial={{ opacity: 0, y: 190 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 60,
            mass: 1,
          }}
          viewport={{ once: true }}
        >
          {key_text}
        </motion.h4>

        <motion.div
          initial={{ opacity: 0, y: 148 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.44, 0, 0.56, 1],
          }}
          viewport={{ once: true }}
        >
          <div className="!mix-blend-soft-light">
            <PortfolioButton variant="dark" href={cta_link}>
              {cta_label}
            </PortfolioButton>
          </div>
        </motion.div>
      </div>

      {/* Mobile Layout (S) */}
      <div className="flex m:hidden flex-col gap-12 items-center text-center">
        <motion.h6
          className={clsx(TYPOGRAPHY.h6, "text-white-98")}
          initial={{ opacity: 0, y: 190 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 60,
            mass: 1,
          }}
          viewport={{ once: true }}
        >
          {primary_text}
        </motion.h6>

        <motion.h4
          className={clsx(TYPOGRAPHY.h5, "text-white-98")}
          initial={{ opacity: 0, y: 190 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 60,
            mass: 1,
          }}
          viewport={{ once: true }}
        >
          {key_text}
        </motion.h4>

        <motion.div
          initial={{ opacity: 0, y: 148 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.44, 0, 0.56, 1],
          }}
          viewport={{ once: true }}
        >
          <PortfolioButton variant="light" href={cta_link}>
            {cta_label}
          </PortfolioButton>
        </motion.div>
      </div>
    </section>
  );
}
