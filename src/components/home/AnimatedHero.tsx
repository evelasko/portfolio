"use client";

import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { useState, useEffect } from "react";
import clsx from "clsx";
import { TYPOGRAPHY } from "@/lib/typography";
import Enrique from "@/components/graphics/Enrique";
import Velasco from "@/components/graphics/Velasco";

/**
 * MainHero
 *
 * The sideTextHorizontal and sideTextVertical are animated upon scroll to a Y offset of -404px with an ease In Out of bezier 0.44, 0, 0.56, 1, time 1 (these are treated as one block)
 * The background can be either a video (if video prop is provided) or a carrousel of images (without any indicators) animated as a sideways transitioning slideshow
 * @param topText - string, TYPOGRAPHY.h1, color white-100, uppercase, animates on appear per character with a delay of 0.6 from a blur of 10px and a Y offset of 150px using an ease In Out with bezier 0.44, 0, 0.56, 1 time 0.6
 * @param bottomText - string, same style and animation as topText
 * @param sideTextHorizontal - string, TYPOGRAPHY.mono24, color white-100, uppercase
 * @param sideTextVertical - string, TYPOGRAPHY.mono24, color white-100, uppercase
 * @param graphic - string, `/public/${string}.svg` or `/public/${string}.png`
 * @param graphicHeight - number, default 100
 * @param graphicWidth - number, default 100
 * @param subtitle - string, TYPOGRAPHY.mono24, color white-100, uppercase, same style and animation as topText but instead of an offset of Y it animates from an X offset of 100px
 * @param images - string[], image urls for carousel (ignored if video is provided)
 * @param link - string, link url
 * @param video - string, optional video URL for background video instead of image carousel
 * @param stayDuration - number, how long each image stays visible in milliseconds, default 4000 (4 seconds) - only applies to image carousel
 * @param transitionSpeed - number, how fast the slide transition happens in seconds, default 1.2 - only applies to image carousel
 */
export default function HomeHero({
  topText,
  bottomText,
  sideTextHorizontal = "2K25",
  sideTextVertical = "./portfolio",
  graphic,
  graphicHeight = 100,
  graphicWidth = 100,
  subtitle,
  images,
  link,
  video,
  stayDuration = 4000,
  transitionSpeed = 1.2,
}: {
  topText: string;
  bottomText: string;
  sideTextHorizontal: string;
  sideTextVertical: string;
  graphic: string;
  graphicHeight: number;
  graphicWidth: number;
  subtitle: string;
  images: string[];
  link: string;
  video?: string;
  stayDuration?: number;
  transitionSpeed?: number;
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Image carousel effect (only when not using video)
  useEffect(() => {
    if (!video && images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex(prevIndex =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }, stayDuration);
      return () => clearInterval(interval);
    }
  }, [video, images.length, stayDuration]);

  return (
    <>
      <div className="relative w-full h-screen overflow-hidden">
        {/* Background Video or Image Carousel */}
        <div className="absolute inset-0 z-0">
          {video ? (
            /* Video Background */
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectFit: "cover" }}
            >
              <source src={video} type="video/mp4" />
              <source src={video.replace(".mp4", ".webm")} type="video/webm" />
              {/* Fallback for browsers that don't support video */}
              <div className="absolute inset-0 bg-gray-800" />
            </video>
          ) : (
            /* Image Carousel */
            <AnimatePresence>
              <motion.div
                key={currentImageIndex}
                initial={{ x: "100%" }}
                animate={{ x: "0%" }}
                exit={{ x: "-100%" }}
                transition={{
                  duration: transitionSpeed,
                  ease: [0.44, 0, 0.56, 1],
                }}
                className="absolute inset-0"
              >
                <Image
                  src={images[currentImageIndex]}
                  alt="Hero background"
                  fill
                  className="object-cover"
                  priority
                  sizes="100vw"
                />
              </motion.div>
            </AnimatePresence>
          )}
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/30 z-10" />
        </div>

        {/* Content */}
        <div className="relative z-20 w-full h-full">
          {/* DESKTOP/TABLET LAYOUT (M & L) */}
          <div className="hidden m:flex l:flex flex-col w-full h-full px-4 m:px-4 l:px-4">
            {/* Row 1: topText only (fixed height based on content) */}
            <div
              id="row1"
              className="flex-shrink-0 flex items-start justify-start pt-8 m:pt-8 l:pt-8 w-[47.8%]"
            >
              <Enrique />
            </div>

            {/* Row 2: sideText block + graphic (expandable to fill remaining space) */}
            <div id="row2" className="flex-1 flex items-center">
              {/* Column 1: Side Text Block */}
              <div className="flex-1 flex flex-col items-start">
                <motion.div
                  initial={{ opacity: 0, y: -404 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1,
                    ease: "easeOut",
                  }}
                  className="space-y-2"
                >
                  <div
                    className={clsx(
                      TYPOGRAPHY.mono24,
                      "uppercase tracking-wider text-white-100"
                    )}
                  >
                    {sideTextHorizontal}
                  </div>
                  <div
                    className={clsx(
                      TYPOGRAPHY.mono24,
                      "uppercase tracking-wider"
                    )}
                    style={{
                      color: "var(--color-white-100)",
                      lineHeight: "1.2em",
                      letterSpacing: "0.05em",
                      writingMode: "vertical-rl",
                      textOrientation: "mixed",
                      transform: "rotate(180deg)",
                    }}
                  >
                    {sideTextVertical}
                  </div>
                </motion.div>
              </div>

              {/* Column 2: Graphic (centered, then pushed right) */}
              <div
                id="row2-graphic"
                className="flex-1 flex items-center justify-center pl-8 m:pl-12 l:pl-16"
              ></div>
            </div>

            {/* Row 3: subtitle+button + bottomText (fixed height based on bottomText content) */}
            <div id="row3" className="flex-shrink-0 flex pb-8 m:pb-8 l:pb-0">
              {/* Column 1: Subtitle + Button (flexible, yields space) */}
              <div className="flex-1 flex flex-col min-w-0 h-full">
                {/* Subtitle row - aligned to top baseline of bottomText */}
                <div
                  id="row3-subtitle"
                  className="flex-shrink-0 overflow-hidden flex items-start"
                >
                  <motion.div
                    className={clsx(
                      TYPOGRAPHY.mono24,
                      "uppercase tracking-wider"
                    )}
                    style={{
                      color: "var(--color-white-100)",
                      lineHeight: "1.2em",
                      letterSpacing: "0.05em",
                      overflow: "hidden",
                    }}
                    initial={{ opacity: 0, x: 100, filter: "blur(10px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    transition={{
                      delay: 1.8,
                      duration: 0.6,
                      ease: "easeOut",
                    }}
                  >
                    {subtitle}
                  </motion.div>
                </div>

                {/* Button row - aligned to bottom baseline of bottomText */}
                <div
                  id="row3-button"
                  className="flex-shrink-0 flex items-baseline-last"
                >
                  <Link href={link} className="group">
                    <motion.div
                      animate={{
                        y: [0, 10, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <ArrowDown
                        size={24}
                        className="group-hover:scale-110 transition-transform duration-300"
                        style={{ color: "var(--color-white-100)" }}
                      />
                    </motion.div>
                  </Link>
                </div>
              </div>

              {/* Column 2: Bottom Text (expands as needed, right-aligned) */}
              <div
                id="row3-bottom-text"
                className="flex-shrink-0 flex items-start ml-4 w-[52.2%]"
              >
                <Velasco />
              </div>
            </div>
          </div>

          {/* MOBILE LAYOUT (S) */}
          <div className="flex m:hidden l:hidden flex-col h-full px-4">
            {/* Row 1: sideText block (can expand, pushes others down) */}
            <div className="flex-1 flex items-start justify-start pt-24 min-h-0">
              <motion.div
                initial={{ opacity: 0, y: -404 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1,
                  ease: "easeOut",
                  delay: 0.3,
                }}
                className="space-y-2"
              >
                <div
                  className={clsx(
                    TYPOGRAPHY.mono24,
                    "uppercase tracking-wider text-white-100"
                  )}
                >
                  {sideTextHorizontal}
                </div>
                <div
                  className={clsx(
                    TYPOGRAPHY.mono24,
                    "uppercase tracking-wider"
                  )}
                  style={{
                    color: "var(--color-white-100)",
                    lineHeight: "1.2em",
                    letterSpacing: "0.05em",
                    writingMode: "vertical-rl",
                    textOrientation: "mixed",
                    transform: "rotate(180deg)",
                  }}
                >
                  {`${sideTextVertical} ————————`}
                </div>
              </motion.div>
            </div>

            {/* Row 2: subtitle (full width, no cutting) */}
            <div className="flex-shrink-0 py-4">
              <motion.div
                className={clsx(TYPOGRAPHY.mono24, "uppercase tracking-wider")}
                style={{
                  color: "var(--color-white-100)",
                  lineHeight: "1.6em",
                  letterSpacing: "0.05em",
                }}
                initial={{ opacity: 0, x: 100, filter: "blur(10px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                transition={{
                  delay: 1.8,
                  duration: 0.6,
                  ease: "easeOut",
                }}
              >
                {subtitle.split("\n").map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 0, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                      delay: 1.8 + i * 0.05,
                      duration: 0.6,
                      ease: "easeOut",
                    }}
                  >
                    {line}
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Row 3: topText + bottomText concatenated (bottom-aligned with margin) */}
            <div className="flex-shrink-0 pb-8">
              <div className="flex flex-row gap-4">
                <motion.h1
                  className="text-h1-s font-bold uppercase tracking-tight"
                  style={{
                    color: "var(--color-white-100)",
                    lineHeight: "0.85em",
                    letterSpacing: "-0.05em",
                  }}
                  initial={{ opacity: 0, y: 150, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    delay: 0.6,
                    duration: 0.6,
                    ease: "easeOut",
                  }}
                >
                  {(topText.length > 5 ? `${topText.slice(0, 1)}.` : topText)
                    .split("")
                    .map((char, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 150, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{
                          delay: 0.6 + i * 0.05,
                          duration: 0.6,
                          ease: "easeOut",
                        }}
                        className="inline-block"
                      >
                        {char === " " ? "\u00A0" : char}
                      </motion.span>
                    ))}
                </motion.h1>

                <motion.h1
                  className="text-h1-s font-bold uppercase tracking-tight"
                  style={{
                    color: "var(--color-white-100)",
                    lineHeight: "0.85em",
                    letterSpacing: "-0.05em",
                  }}
                  initial={{ opacity: 0, y: 150, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    delay: 1.2,
                    duration: 0.6,
                    ease: "easeOut",
                  }}
                >
                  {bottomText.split("").map((char, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 150, filter: "blur(10px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{
                        delay: 1.2 + i * 0.05,
                        duration: 0.6,
                        ease: "easeOut",
                      }}
                      className="inline-block"
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </motion.h1>
              </div>

              {/* Arrow for mobile */}
              <div className="flex justify-center">
                <Link href={link} className="group">
                  <motion.div
                    animate={{
                      y: [0, 10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <ArrowDown
                      size={24}
                      className="group-hover:scale-110 transition-transform duration-300"
                      style={{ color: "var(--color-white-100)" }}
                    />
                  </motion.div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black p-24">
        <div className={TYPOGRAPHY.h3}>
          <span className="text-white">I believe in a new language</span>A
          language where a line of code can be as elegant as a line of
          choreography. Where a business model can be a work of art. And where
          an artist can be the architect of their own future.
        </div>
      </div>
    </>
  );
}
