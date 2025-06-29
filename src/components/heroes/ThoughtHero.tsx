'use client';

import { motion } from 'motion/react';
import Image from "next/image";
import { TYPOGRAPHY } from '@/lib/typography';

/**
 * Thought Hero Component
 * 
 * A thought hero component that displays a title, subtitle, cover image, left info label, left info value, right info label, and right info value.
 * 
 * @param title - string, tag h1 style TYPOGRAPHY.h3, animated on appear with a fade from bottom (offset 140px, time 1 delay 0.2) and blur (10px)
 * @param coverImage - string, fullscreen background
 * @param leftInfoLabel - string, TYPOGRAPHY.text16 color black-40 same animation as the title but executed right after it
 * @param leftInfoValue - string, TYPOGRAPHY.text16 color black-100 same animation as the title but executed right after it
 * @param rightInfoLabel - string, TYPOGRAPHY.text16 color black-40 same animation as the title but executed right after it
 * @param rightInfoValue - string, TYPOGRAPHY.text16 color black-100 same animation as the title but executed right after it
 * @returns 
 */
export default function ThoughtHero({ 
  title, 
  coverImage, 
  leftInfoLabel, 
  leftInfoValue, 
  rightInfoLabel, 
  rightInfoValue
}: { 
  title: string; 
  coverImage: string; 
  leftInfoLabel: string; 
  leftInfoValue: string; 
  rightInfoLabel: string; 
  rightInfoValue: string;
}) {
  return (
    <div className="w-full bg-white">
      {/* Content Container */}
      <div className="max-w-6xl mx-auto px-4 s:px-4 m:px-8 l:px-12 py-12 m:py-16 l:py-20">
        
        {/* Title */}
        <motion.h1
          className={`${TYPOGRAPHY.h3} mb-8 m:mb-12 text-black-90`}
          style={{
            lineHeight: '1.2em',
            letterSpacing: '-0.02em'
          }}
          initial={{ 
            opacity: 0, 
            y: 140, 
            filter: "blur(10px)" 
          }}
          animate={{ 
            opacity: 1, 
            y: 0, 
            filter: "blur(0px)" 
          }}
          transition={{
            duration: 1,
            delay: 0.2,
            ease: "easeOut"
          }}
        >
          {title}
        </motion.h1>

        {/* Metadata Row */}
        <motion.div
          className="flex flex-col s:flex-row justify-between mb-8 m:mb-12 space-y-4 s:space-y-0"
          initial={{ 
            opacity: 0, 
            y: 140, 
            filter: "blur(10px)" 
          }}
          animate={{ 
            opacity: 1, 
            y: 0, 
            filter: "blur(0px)" 
          }}
          transition={{
            duration: 1,
            delay: 1.2, // Right after title animation
            ease: "easeOut"
          }}
        >
          {/* Left Info */}
          <div className="flex flex-col s:flex-row items-start gap-2">
            <span className={`${TYPOGRAPHY.text16} text-black-40`}>
              {leftInfoLabel}
            </span>
            <span className={`${TYPOGRAPHY.text16} text-black font-medium`}>
              {leftInfoValue}
            </span>
          </div>

          {/* Right Info */}
          <div className="flex flex-col s:flex-row items-start s:items-end gap-2">
            <span className={`${TYPOGRAPHY.text16} text-black-40`}>
              {rightInfoLabel}
            </span>
            <span className={`${TYPOGRAPHY.text16} text-black font-medium`}>
              {rightInfoValue}
            </span>
          </div>
        </motion.div>

        {/* Cover Image */}
        <motion.div
          className="relative w-full rounded-xl overflow-hidden"
          style={{
            aspectRatio: '16/9'
          }}
          initial={{ 
            opacity: 0, 
            y: 140, 
            filter: "blur(10px)" 
          }}
          animate={{ 
            opacity: 1, 
            y: 0, 
            filter: "blur(0px)" 
          }}
          transition={{
            duration: 1,
            delay: 2.4, // After metadata animations
            ease: "easeOut"
          }}
        >
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
            priority
          />
        </motion.div>
      </div>
    </div>
  );
}