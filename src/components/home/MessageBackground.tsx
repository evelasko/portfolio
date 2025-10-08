"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { TYPOGRAPHY } from "@/lib/typography";

interface MessageBackgroundProps {
  imagePath: string;
  segments: string[];
  finalText: string;
}

export default function MessageBackground({
  imagePath,
  segments,
  finalText,
}: MessageBackgroundProps) {
  const messageRef = useRef<HTMLDivElement>(null);

  // Track scroll progress through the message section
  const { scrollYProgress: messageScrollProgress } = useScroll({
    target: messageRef,
    offset: ["start start", "end end"],
  });

  // Track when the section's end starts moving up until it leaves viewport
  const { scrollYProgress: messageEndScrollProgress } = useScroll({
    target: messageRef,
    offset: ["end start", "end -100%"], // From when end hits viewport top until it's fully off screen
  });

  console.log(messageEndScrollProgress.get());

  // Map scroll progress to active segment index (0-3 for 4 segments)
  // Same progression as Message component
  const activeSegmentIndex = useTransform(
    messageScrollProgress,
    [0, 0.15, 0.3, 0.45, 0.6, 0.75],
    [0, 1, 2, 3, 4, 5]
  );

  // Background image grayscale filter: starts at 100% grayscale, becomes colored as segments reveal
  // Fully colored by the time all segments are white (60%)
  const backgroundFilter = useTransform(
    messageScrollProgress,
    [0, 0.6],
    ["grayscale(100%)", "grayscale(0%)"]
  );

  // Final text animations
  // Opacity: fades in from 55-70% and stays visible
  const finalTextOpacity = useTransform(
    messageScrollProgress,
    [0.55, 0.7],
    [0, 1]
  );

  // Scale animation in two phases:
  // Phase A (55-75%): After highlights, while component is still sticky - scale from 0.8 to 1
  // Phase B (75-100%): After component releases and leaves viewport - scale from 1 to 1.2
  const finalTextScale = useTransform(
    messageScrollProgress,
    [0.55, 0.75, 1],
    [0.8, 1, 1.2]
  );

  // Create color transforms for each segment
  const segmentColors = segments.map((_, index) =>
    useTransform(activeSegmentIndex, value => {
      // If this segment's index is < current active segment (fully revealed), white
      if (index < Math.floor(value)) return "rgb(255, 255, 255)";
      // If this is the currently revealing segment, interpolate based on progress
      if (index === Math.floor(value)) {
        const progress = value - Math.floor(value); // 0 to 1
        const grey = 100;
        const white = 255;
        const r = Math.round(grey + (white - grey) * progress);
        const g = Math.round(grey + (white - grey) * progress);
        const b = Math.round(grey + (white - grey) * progress);
        return `rgb(${r}, ${g}, ${b})`;
      }
      // Otherwise grey (not yet revealed)
      return "rgb(100, 100, 100)";
    })
  );

  return (
    <div
      id="message-background"
      ref={messageRef}
      className="relative min-h-[200vh] bg-black"
    >
      {/* Sticky container that holds everything */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-4 m:px-8 l:px-16 overflow-hidden">
        {/* Background Image with grayscale animation */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-10"
          style={{
            backgroundImage: `url(${imagePath})`,
            filter: backgroundFilter,
          }}
        />

        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40 -z-10" />

        {/* Segments text */}
        <h3 className={TYPOGRAPHY.h3}>
          {segments.map((segment, index) => (
            <motion.span
              key={index}
              style={{
                color: segmentColors[index],
              }}
              className="transition-colors duration-300 ease-in-out"
            >
              {segment}{" "}
            </motion.span>
          ))}
        </h3>

        {/* Final text with stronger appearance */}
        <motion.h2
          className={`${TYPOGRAPHY.h2} text-white mt-12 font-bold text-center`}
          style={{
            opacity: finalTextOpacity,
            scale: finalTextScale,
          }}
        >
          {finalText}
        </motion.h2>
      </div>
    </div>
  );
}
