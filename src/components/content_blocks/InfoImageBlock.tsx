'use client';

import Image from "next/image";
import { motion } from 'motion/react';
import { TYPOGRAPHY } from '@/lib/typography';

/**
 * InfoImageBlock component
 * @param heading - string, TYPOGRAPHY.mono20, color black-90, uppercase
 * @param image_path - string, image source path
 * @param image_caption - string, TYPOGRAPHY.text16, color black-50, italic. Animate upon scroll into view (delay 0.1): fade the element from bottom, offset Y 30px, ease spring (time 0.6, delay & bounce 0)
 * @param info_text - string, TYPOGRAPHY.h9, color black-80. Same animation as image_caption
 * @param quote - string, TYPOGRAPHY.text18, color black-50, same animation as image_caption with delay 0.2
 */
export default function InfoImageBlock({ 
  heading, 
  image_path, 
  image_caption, 
  info_text, 
  quote
}: { 
  heading: string; 
  image_path: string; 
  image_caption: string; 
  info_text: string; 
  quote: string; 
}) {
  return (
    <div className="w-full">
      
      {/* Two Column Layout - Image and Content */}
      <div className="grid grid-cols-1 l:grid-cols-2 gap-8 l:gap-16">
        
        {/* Left Column - Heading, Image and Caption */}
        <div className="space-y-6">
          {/* Heading Section - at top of left column */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="w-full border-b border-black-10 pb-0 l:pb-0 mb-4 l:mb-6"
          >
            <motion.h2 
              className={`${TYPOGRAPHY.mono20} text-black-90 uppercase`}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    duration: 0.6
                  }
                }
              }}
            >
              {heading}
            </motion.h2>
          </motion.div>

          {/* Image */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="w-full"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: {
                  type: "spring",
                  duration: 0.6,
                  delay: 0.1,
                  bounce: 0
                }
              }
            }}
          >
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-sm">
              <Image 
                src={image_path} 
                alt={image_caption}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </motion.div>

          {/* Image Caption */}
          <motion.p 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className={`${TYPOGRAPHY.text16} text-black-50 italic`}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: {
                  type: "spring",
                  duration: 0.6,
                  delay: 0.15,
                  bounce: 0
                }
              }
            }}
          >
            {image_caption}
          </motion.p>
        </div>

        {/* Right Column - Main Content and Highlighted Quote */}
        <div className="space-y-8">
          {/* Main Info Text */}
          <motion.p 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className={`${TYPOGRAPHY.h9} text-black-80 leading-relaxed s:mt-4 l:mt-9`}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: {
                  type: "spring",
                  duration: 0.6,
                  delay: 0.1,
                  bounce: 0
                }
              }
            }}
          >
            {info_text}
          </motion.p>

          {/* Highlighted Quote Block */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="bg-gray-20 l:ml-0 m:ml-12 s:ml-6 p-6 l:p-8 rounded-sm border-l-2 border-black-20"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: {
                  type: "spring",
                  duration: 0.6,
                  delay: 0.2,
                  bounce: 0
                }
              }
            }}
          >
            <p className={`${TYPOGRAPHY.text18} text-black-50 tracking-[-0.03em] leading-relaxed`}>
              {quote}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}