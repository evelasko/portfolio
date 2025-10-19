"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { TYPOGRAPHY } from "@/lib/typography";

interface MessageSplitProps {
  initialText: string;
  imagePath: string;
  leftText: string;
  rightText: string;
  finalText: string;
}

export default function MessageSplit({
  initialText,
  imagePath,
  leftText,
  rightText,
  finalText,
}: MessageSplitProps) {
  const messageRef = useRef<HTMLDivElement>(null);

  // Track scroll progress through the message section
  const { scrollYProgress: messageScrollProgress } = useScroll({
    target: messageRef,
    offset: ["start start", "end end"],
  });

  // Background image grayscale filter: starts at 100% grayscale, becomes colored as text reveals
  // Fully colored by the time all text is revealed (60%)
  const backgroundFilter = useTransform(
    messageScrollProgress,
    [0, 0.6],
    ["grayscale(100%)", "grayscale(0%)"]
  );

  // VHS effect opacity: fades out as grayscale fades out (0-60%)
  const vhsOpacity = useTransform(messageScrollProgress, [0, 0.6], [1, 0]);

  // Left text animations: fades in from the right (0-30%)
  const leftTextOpacity = useTransform(messageScrollProgress, [0, 0.3], [0, 1]);
  const leftTextX = useTransform(messageScrollProgress, [0, 0.3], [100, 0]);

  // Right text animations: fades in from the left (30-60%)
  const rightTextOpacity = useTransform(
    messageScrollProgress,
    [0.3, 0.6],
    [0, 1]
  );
  const rightTextX = useTransform(messageScrollProgress, [0.3, 0.6], [-100, 0]);

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

  return (
    <div
      id="message-background"
      ref={messageRef}
      className="relative min-h-[200vh] bg-black"
    >
      {/* Sticky container that holds everything and accounts for navbar height */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-between px-4 m:px-8 l:px-16 py-8 m:py-12 l:py-16 overflow-hidden">
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
            backgroundImage: "url(/assets/ui/noise.png)",
            backgroundRepeat: "repeat",
            mixBlendMode: "overlay",
            opacity: vhsOpacity,
          }}
        />

        {/* VHS Animated Stripes/Distortion Overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-[3]"
          style={{
            backgroundImage: "url(/assets/ui/stripes.gif)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            mixBlendMode: "screen",
            opacity: vhsOpacity,
          }}
        />

        {/* Initial text at the top */}
        <h3 className={`${TYPOGRAPHY.h3} text-white text-center relative z-10`}>
          {initialText}
        </h3>

        {/* Two-column text layout - centered vertically in remaining space */}
        <div className="flex items-center justify-center flex-1 w-full relative z-10">
          <div className="grid grid-cols-1 m:grid-cols-2 gap-8 m:gap-12 l:gap-16 w-full max-w-7xl">
            {/* Left text - fades in from right */}
            <motion.div
              style={{
                opacity: leftTextOpacity,
                x: leftTextX,
              }}
              className="text-center m:text-right"
            >
              <h3 className={`${TYPOGRAPHY.h7} text-white`}>{leftText}</h3>
            </motion.div>

            {/* Right text - fades in from left */}
            <motion.div
              style={{
                opacity: rightTextOpacity,
                x: rightTextX,
              }}
              className="text-center m:text-left"
            >
              <h3 className={`${TYPOGRAPHY.h7} text-white`}>{rightText}</h3>
            </motion.div>
          </div>
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
