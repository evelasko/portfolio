"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { TYPOGRAPHY } from "@/lib/typography";
import clsx from "clsx";

interface MessageBackgroundProps {
  initialText: string;
  imagePath: string;
  segments: string[];
  finalText: string;
}

export default function MessageBackground({
  initialText,
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

  // VHS effect opacity: fades out as grayscale fades out (0-60%)
  const vhsOpacity = useTransform(messageScrollProgress, [0, 0.6], [1, 0]);

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
      {/* Sticky container that holds everything and accounts for navbar height */}
      <div className="sticky top-12 l:top-[70px] h-screen flex flex-col items-center justify-between px-4 m:px-8 l:px-16 py-12 m:py-12 l:py-16 overflow-hidden">
        {/* Background Image with grayscale animation */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage: `url(${imagePath})`,
            filter: backgroundFilter,
          }}
        />

        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40 z-[1]" />

        {/* VHS Noise Texture Overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-[2]"
          style={{
            backgroundImage: "url(/assets/textures/noise.png)",
            backgroundRepeat: "repeat",
            mixBlendMode: "overlay",
            opacity: vhsOpacity,
          }}
        />

        {/* VHS Scan Lines Overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-[3]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              rgba(0, 0, 0, 0.15),
              rgba(0, 0, 0, 0.15) 1px,
              transparent 1px,
              transparent 2px
            )`,
            opacity: vhsOpacity,
          }}
        />

        {/* Initial text at the top */}
        <h3
          className={clsx(
            TYPOGRAPHY.h3,
            "text-white text-center relative z-10"
          )}
        >
          {initialText}
        </h3>

        {/* Segments text - centered vertically in remaining space */}
        <div className="flex items-center justify-center flex-1 relative z-10">
          <h3 className={`${TYPOGRAPHY.h7} text-center`}>
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
        </div>

        {/* Final text with stronger appearance at the bottom */}
        <motion.h2
          className={`${TYPOGRAPHY.h2} text-white font-bold text-center relative z-10`}
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
