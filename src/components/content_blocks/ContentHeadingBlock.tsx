"use client";

import { motion } from "motion/react";
import { TYPOGRAPHY } from "@/lib/typography";

/**
 * ContentHeadingBlock component
 * @param overtitle - string, TYPOGRAPHY.mono24, color black-40, uppercase, animate upon scroll into view: fade per word from bottom, offset Y 30px, ease spring (time 1, delay 0.03)
 * @param title - string, tag h1, TYPOGRAPHY.h1, color black-90, animate upon scroll into view (delay 0.2): per character from Y rotation 90deg, ease InOut (bezier 0.44, 0, 0.56, 1, time 0.6, delay 0.02)
 * @param subtitle - string, tag h6, TYPOGRAPHY.h9, color black-50, animate upon scroll into view (delay 0.3): fade per word from bottom, offset  Y 30px, ease spring (time 1, delay 0.03)
 * @param date - string, TYPOGRAPHY.mono24, color black-40, uppercase, same animation as subtitle with delay 0.4
 * @param quote - string, TYPOGRAPHY.h6, color black-80, same animation and delay as date
 * @param list_label - string, TYPOGRAPHY.mono16, color black-40, uppercase
 * @param list_items - string[], TYPOGRAPHY.mono16, color black-60, uppercase
 */
export default function ContentHeadingBlock({
  overtitle,
  title,
  subtitle,
  date,
  quote,
  list_label,
  list_items,
}: {
  overtitle: string;
  title: string;
  subtitle: string;
  date: string;
  quote: string;
  list_label: string;
  list_items: string[];
}) {
  // Split text into words for word-by-word animation
  const splitWords = (text: string) => text.split(" ");

  // Split text into characters for character-by-character animation
  const splitCharacters = (text: string) => text.split("");

  return (
    <div className="w-full space-y-0 l:space-y-12">
      {/* Overtitle - Word by word fade from bottom */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="overflow-hidden mt-12 m:mb-6 l:mb-0"
      >
        <motion.p
          className={`${TYPOGRAPHY.mono24} text-black-40 uppercase`}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.03,
              },
            },
          }}
        >
          {splitWords(overtitle).map((word, index) => (
            <motion.span
              key={index}
              className="inline-block mr-2"
              variants={{
                hidden: {
                  opacity: 0,
                  y: 30,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    type: "spring",
                    duration: 1,
                  },
                },
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.p>
      </motion.div>

      {/* Title - Character by character Y rotation */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="overflow-hidden  m:mb-6 l:mb-0"
      >
        <motion.h1
          className={`${TYPOGRAPHY.h3} text-black-90 font-bold tracking-[-0.03em] mb-6`}
          variants={{
            hidden: {},
            visible: {
              transition: {
                delay: 0.2,
                staggerChildren: 0.02,
              },
            },
          }}
        >
          {splitCharacters(title).map((char, index) => (
            <motion.span
              key={index}
              className="inline-block"
              style={{ transformOrigin: "center bottom" }}
              variants={{
                hidden: {
                  rotateY: 90,
                  opacity: 0,
                },
                visible: {
                  rotateY: 0,
                  opacity: 1,
                  transition: {
                    duration: 0.6,
                    ease: [0.44, 0, 0.56, 1],
                  },
                },
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h1>
      </motion.div>

      {/* Subtitle - Word by word fade from bottom with delay */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="overflow-hidden border-b border-black-10 pb-0 mb-6"
      >
        <motion.h6
          className={`${TYPOGRAPHY.h9} text-black-50 mb-6`}
          variants={{
            hidden: {},
            visible: {
              transition: {
                delay: 0.3,
                staggerChildren: 0.03,
              },
            },
          }}
        >
          {splitWords(subtitle).map((word, index) => (
            <motion.span
              key={index}
              className="inline-block mr-2"
              variants={{
                hidden: {
                  opacity: 0,
                  y: 30,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    type: "spring",
                    duration: 1,
                  },
                },
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h6>
      </motion.div>

      {/* Date - Same animation as subtitle with delay 0.4 */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="overflow-hidden"
      >
        <motion.p
          className={`${TYPOGRAPHY.mono24} text-black-40 uppercase`}
          variants={{
            hidden: {},
            visible: {
              transition: {
                delay: 0.4,
                staggerChildren: 0.03,
              },
            },
          }}
        >
          {splitWords(date).map((word, index) => (
            <motion.span
              key={index}
              className="inline-block mr-2"
              variants={{
                hidden: {
                  opacity: 0,
                  y: 30,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    type: "spring",
                    duration: 1,
                  },
                },
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.p>
      </motion.div>

      {/* Quote - Same animation and delay as date */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="overflow-hidden w-full l:pr-48 m:pr-32 s:pr-0"
      >
        <motion.p
          className={`${TYPOGRAPHY.h6} font-bold tracking-[-0.03em] leading-[1.4em] text-black-80`}
          variants={{
            hidden: {},
            visible: {
              transition: {
                delay: 0.4,
                staggerChildren: 0.03,
              },
            },
          }}
        >
          {splitWords(quote).map((word, index) => (
            <motion.span
              key={index}
              className="inline-block mr-2"
              variants={{
                hidden: {
                  opacity: 0,
                  y: 30,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    type: "spring",
                    duration: 1,
                  },
                },
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.p>
      </motion.div>

      {/* Services List - Two Column Layout with Borders */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="border-t border-b border-black-10 py-6 l:py-8 mb-16"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              delay: 0.6,
              duration: 0.6,
            },
          },
        }}
      >
        <div className="grid grid-cols-[auto_1fr] gap-6 l:gap-8 items-start">
          {/* Label Column - Fits Content */}
          <p className={`${TYPOGRAPHY.mono16} text-black-40 uppercase`}>
            {list_label}
          </p>

          {/* Items Column - Expands to Available Space */}
          <p className={`${TYPOGRAPHY.mono16} text-black-60 uppercase`}>
            {list_items.join(", ")}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
