"use client";

import { motion } from "motion/react";
import { TYPOGRAPHY } from "@/lib/typography";

/**
 * InfoSimpleBlock component
 * @param heading - string, TYPOGRAPHY.mono20, color black-90, uppercase
 * @param subheading - string, TYPOGRAPHY.text18, color black-50. Animate upon scroll into view (delay 0.1): fade the element from bottom, offset Y 30px, ease spring (time 0.6, delay & bounce 0)
 * @param info_text - string, TYPOGRAPHY.h9, color black-80. Same animation as subheading
 */
export default function InfoSimpleBlock({
  heading,
  subheading,
  info_text,
}: {
  heading: string;
  subheading: string;
  info_text: string;
}) {
  return (
    <div className="w-full">
      {/* Two Column Layout - Simple Content */}
      <div className="grid grid-cols-1 l:grid-cols-2 gap-8 l:gap-16">
        {/* Left Column - Heading and Subheading */}
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
                    duration: 0.6,
                  },
                },
              }}
            >
              {heading}
            </motion.h2>
          </motion.div>

          {/* Subheading Text */}
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className={`${TYPOGRAPHY.text18} text-black-50 leading-relaxed`}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  type: "spring",
                  duration: 0.6,
                  delay: 0.1,
                  bounce: 0,
                },
              },
            }}
          >
            {subheading}
          </motion.p>
        </div>

        {/* Right Column - Main Info Text */}
        <div>
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
                  bounce: 0,
                },
              },
            }}
          >
            {info_text}
          </motion.p>
        </div>
      </div>
    </div>
  );
}
