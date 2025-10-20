"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { TYPOGRAPHY } from "@/lib/typography";
import { CloudinaryImage } from "@/components/mdx/CloudinaryImage";

/**
 * Photo Hero Component
 *
 * A photo hero component that displays a title, subtitle, background image, photo, and link.
 *
 * @param title - string, tag h1 style TYPOGRAPHY.h3, animated on appear with a fade from bottom (offset 140px, time 1 delay 0.2) and blur (10px)
 * @param subtitle - string, TYPOGRAPHY.text18, with the same animation as the title but executed right after the title
 * @param backgroundImage - string, fullscreen background
 * @param photo - string, photo, animated on appear with a fade from bottom (offset 140px, time 1 delay 0.2) and blur (10px)
 * @param link - string, link to the page
 * @returns
 */
export default function PhotoHero({
  title,
  subtitle,
  backgroundImage,
  photo,
  link,
}: {
  title: string;
  subtitle: string;
  backgroundImage: string;
  photo: string;
  link: string;
}) {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <CloudinaryImage
          src={backgroundImage}
          alt="Background"
          fill
          crop="fill"
          gravity="auto"
          quality="auto:best"
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/30 z-10" />
      </div>

      {/* Content */}
      <div className="relative z-20 w-full h-full">
        {/* Desktop & Tablet Layout (M & L) */}
        <div className="hidden m:flex l:flex h-full">
          <div className="flex w-full h-full px-8 m:px-12 l:px-20">
            {/* Left Column - Text Content */}
            <div className="flex-1 flex flex-col justify-end pb-20 pr-8">
              <div className="max-w-2xl">
                {/* Title */}
                <motion.h1
                  className={`${TYPOGRAPHY.h3} mb-6 text-white font-medium`}
                  style={{
                    lineHeight: "1.2em",
                    letterSpacing: "-0.02em",
                  }}
                  initial={{
                    opacity: 0,
                    y: 140,
                    filter: "blur(10px)",
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                  }}
                  transition={{
                    duration: 1,
                    delay: 0.2,
                    ease: "easeOut",
                  }}
                >
                  {title}
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  className={`${TYPOGRAPHY.text18} text-white/90 mb-12`}
                  style={{
                    lineHeight: "1.6em",
                  }}
                  initial={{
                    opacity: 0,
                    y: 140,
                    filter: "blur(10px)",
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                  }}
                  transition={{
                    duration: 1,
                    delay: 1.2, // Executed right after title animation
                    ease: "easeOut",
                  }}
                >
                  {subtitle}
                </motion.p>

                {/* Arrow Link */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 2.4,
                    ease: "easeOut",
                  }}
                >
                  <Link href={link} className="group inline-block">
                    <motion.div
                      animate={{
                        y: [0, 8, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="p-2"
                    >
                      <ArrowDown
                        size={28}
                        className="text-white group-hover:scale-110 transition-transform duration-300"
                      />
                    </motion.div>
                  </Link>
                </motion.div>
              </div>
            </div>

            {/* Right Column - Photo */}
            <div className="flex-1 flex items-end justify-center pb-20 pl-8">
              <motion.div
                className="relative"
                initial={{
                  opacity: 0,
                  y: 140,
                  filter: "blur(10px)",
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                }}
                transition={{
                  duration: 1,
                  delay: 0.2,
                  ease: "easeOut",
                }}
              >
                <CloudinaryImage
                  src={photo}
                  alt="Profile photo"
                  width={400}
                  height={500}
                  crop="fill"
                  gravity="face"
                  quality="auto"
                  className="object-cover rounded-lg"
                  style={{
                    maxWidth: "350px",
                    width: "100%",
                    height: "auto",
                    aspectRatio: "4/5",
                  }}
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Mobile Layout (S) */}
        <div className="flex m:hidden l:hidden h-full px-4">
          <div className="flex flex-col w-full h-full justify-end pb-16">
            {/* Photo - Mobile positioned at top center */}
            <div className="flex-1 flex items-center justify-center pt-16 pb-8">
              <motion.div
                className="relative"
                initial={{
                  opacity: 0,
                  y: 140,
                  filter: "blur(10px)",
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                }}
                transition={{
                  duration: 1,
                  delay: 0.2,
                  ease: "easeOut",
                }}
              >
                <CloudinaryImage
                  src={photo}
                  alt="Profile photo"
                  width={280}
                  height={350}
                  crop="fill"
                  gravity="face"
                  quality="auto"
                  className="object-cover rounded-lg"
                  style={{
                    maxWidth: "280px",
                    width: "100%",
                    height: "auto",
                    aspectRatio: "4/5",
                  }}
                />
              </motion.div>
            </div>

            {/* Text Content - Mobile positioned at bottom */}
            <div className="flex-shrink-0">
              <div className="max-w-full">
                {/* Title */}
                <motion.h1
                  className={`${TYPOGRAPHY.h3} mb-4 text-white font-medium`}
                  style={{
                    lineHeight: "1.2em",
                    letterSpacing: "-0.02em",
                  }}
                  initial={{
                    opacity: 0,
                    y: 140,
                    filter: "blur(10px)",
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                  }}
                  transition={{
                    duration: 1,
                    delay: 0.2,
                    ease: "easeOut",
                  }}
                >
                  {title}
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  className={`${TYPOGRAPHY.text18} text-white/90 mb-8`}
                  style={{
                    lineHeight: "1.6em",
                  }}
                  initial={{
                    opacity: 0,
                    y: 140,
                    filter: "blur(10px)",
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                  }}
                  transition={{
                    duration: 1,
                    delay: 1.2, // Executed right after title animation
                    ease: "easeOut",
                  }}
                >
                  {subtitle}
                </motion.p>

                {/* Arrow Link */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 2.4,
                    ease: "easeOut",
                  }}
                  className="flex justify-center"
                >
                  <Link href={link} className="group inline-block">
                    <motion.div
                      animate={{
                        y: [0, 8, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="p-2"
                    >
                      <ArrowDown
                        size={28}
                        className="text-white group-hover:scale-110 transition-transform duration-300"
                      />
                    </motion.div>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
