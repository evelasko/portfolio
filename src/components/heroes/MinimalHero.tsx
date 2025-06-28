'use client';

import { motion } from 'motion/react';
import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { TYPOGRAPHY } from '@/lib/typography';

/**
 * Minimal Hero Component
 * 
 * A minimal hero component that displays a title, subtitle, and image.
 * 
 * @param title - string, tag h1 style TYPOGRAPHY.h3, animated on appear with a fade from bottom (offset 140px, time 1 delay 0.2) and blur (10px)
 * @param subtitle - string, TYPOGRAPHY.text18, with the same animation as the title but executed right after the title
 * @param image - string, fullscreen background
 * @param link - string, link to the page
 * @returns 
 */
export default function MinimalHero({ 
  title, 
  subtitle, 
  image, 
  link 
}: { 
  title: string; 
  subtitle: string; 
  image: string; 
  link: string; 
}) {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/20 z-10" />
      </div>

      {/* Content */}
      <div className="relative z-20 w-full h-full flex flex-col justify-end pb-20 px-8 s:px-4 m:px-12 l:px-20">
        
        {/* Main Content Area */}
        <div className="max-w-4xl">
          
          {/* Title */}
          <motion.h1
            className={`${TYPOGRAPHY.h3} mb-6 text-white font-medium`}
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

          {/* Subtitle */}
          <motion.p
            className={`${TYPOGRAPHY.text18} text-white/90 mb-12 max-w-2xl`}
            style={{
              lineHeight: '1.6em'
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
              delay: 1.2, // Executed right after title animation
              ease: "easeOut"
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
              ease: "easeOut"
            }}
          >
            <Link href={link} className="group inline-block">
              <motion.div
                animate={{ 
                  y: [0, 8, 0] 
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
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
  );
}