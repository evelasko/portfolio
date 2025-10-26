"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { TYPOGRAPHY } from "@/lib/typography";

export default function Message({ segments }: { segments: string[] }) {
  const messageRef = useRef<HTMLDivElement>(null);

  // Track scroll progress through the message section
  const { scrollYProgress: messageScrollProgress } = useScroll({
    target: messageRef,
    offset: ["start start", "end end"],
  });

  // Map scroll progress to active segment index (0-3 for 4 segments)
  // Slower progression: each segment takes more scroll to reveal
  // 0-15%: segment 0, 15-30%: segment 1, 30-45%: segment 2, 45-60%: segment 3
  // 60-75%: all segments stay white, 75-100%: fade out
  const activeSegmentIndex = useTransform(
    messageScrollProgress,
    [0, 0.15, 0.3, 0.45, 0.6, 0.75],
    [0, 1, 2, 3, 4, 5]
  );

  // Final fade: turn all grey at 75%, then fade out slowly from 75-98%
  const messageFinalOpacity = useTransform(
    messageScrollProgress,
    [0.75, 0.98],
    [1, 0]
  );

  // Create color transforms for each segment
  const segmentColors = segments.map((_, index) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTransform(activeSegmentIndex, value => {
      // If we're in fade-out phase (value >= 5), turn all grey
      if (value >= 5) return "rgb(50, 50, 50)";
      // If this segment's index is < current active segment (fully revealed), white
      // Use Math.floor to ensure clean transitions - only fully revealed segments stay white
      if (index < Math.floor(value)) return "rgb(255, 255, 255)";
      // If this is the currently revealing segment, interpolate based on progress
      if (index === Math.floor(value)) {
        const progress = value - Math.floor(value); // 0 to 1
        const grey = 50;
        const white = 255;
        const r = Math.round(grey + (white - grey) * progress);
        const g = Math.round(grey + (white - grey) * progress);
        const b = Math.round(grey + (white - grey) * progress);
        return `rgb(${r}, ${g}, ${b})`;
      }
      // Otherwise grey (not yet revealed)
      return "rgb(50, 50, 50)";
    })
  );

  return (
    <div
      id="message"
      ref={messageRef}
      className="relative bg-black min-h-[200vh]"
    >
      <motion.div
        className="sticky top-0 h-screen flex items-center justify-center px-18 m:px-32 l:px-64"
        style={{ opacity: messageFinalOpacity }}
      >
        <h3 className={TYPOGRAPHY.h3}>
          {segments.map((segment, index) => (
            <motion.span
              key={index}
              style={{
                color: segmentColors[index],
              }}
              className="transition-colors duration-300 ease-in-out"
            >
              {segment}
              {index === 0 ? <br /> : " "}
            </motion.span>
          ))}
        </h3>
      </motion.div>
    </div>
  );
}
