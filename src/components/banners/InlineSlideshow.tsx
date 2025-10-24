"use client";

import { useEffect, useState, useCallback } from "react";
import { CldImage, type CldImageProps } from "next-cloudinary";
import { motion, AnimatePresence } from "motion/react";
import clsx from "clsx";

export interface InlineSlideshowProps {
  /**
   * Array of Cloudinary public IDs or full URLs
   * @example ["my-folder/image1", "my-folder/image2"]
   */
  images: string[];

  /**
   * Aspect ratio for the slideshow (e.g., "16:9", "4:3", "1:1", "21:9")
   * @default "16:9"
   */
  aspectRatio?: string;

  /**
   * Maximum height constraint for the slideshow
   * @example "600px" or "50vh"
   */
  maxHeight?: string;

  /**
   * Duration each slide stays visible in milliseconds
   * @default 5000
   */
  slideDuration?: number;

  /**
   * Duration of the slide transition animation in seconds
   * @default 0.6
   */
  transitionDuration?: number;

  /**
   * Border radius for the slideshow container
   * @default "0"
   */
  borderRadius?: string;

  /**
   * Object fit for images
   * @default "cover"
   */
  objectFit?: "cover" | "contain" | "fill" | "none";

  /**
   * Whether to auto-play the slideshow
   * @default true
   */
  autoPlay?: boolean;

  /**
   * Direction of slide animation
   * @default "left"
   */
  slideDirection?: "left" | "right";

  /**
   * Whether to show navigation dots
   * @default true
   */
  showIndicators?: boolean;

  /**
   * Additional CSS classes for the container (use for width control like w-full, w-1/2)
   */
  className?: string;

  /**
   * Cloudinary transformation options
   */
  cloudinaryOptions?: Omit<
    CldImageProps,
    "src" | "alt" | "fill" | "sizes" | "style"
  >;

  /**
   * Callback fired when slide changes
   */
  onSlideChange?: (currentIndex: number) => void;
}

export default function InlineSlideshow({
  images,
  aspectRatio = "16:9",
  maxHeight,
  slideDuration = 5000,
  transitionDuration = 0.6,
  borderRadius = "0",
  objectFit = "cover",
  autoPlay = true,
  slideDirection = "left",
  showIndicators = true,
  className,
  cloudinaryOptions = {},
  onSlideChange,
}: InlineSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Calculate padding-bottom percentage from aspect ratio
  const calculatePaddingBottom = (ratio: string): string => {
    const [width, height] = ratio.split(":").map(Number);
    return `${(height / width) * 100}%`;
  };

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % images.length;
      onSlideChange?.(newIndex);
      return newIndex;
    });
  }, [images.length, onSlideChange]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex - 1 + images.length) % images.length;
      onSlideChange?.(newIndex);
      return newIndex;
    });
  }, [images.length, onSlideChange]);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || images.length <= 1) return;

    const interval = setInterval(() => {
      if (slideDirection === "left") {
        goToNext();
      } else {
        goToPrevious();
      }
    }, slideDuration);

    return () => clearInterval(interval);
  }, [autoPlay, slideDuration, slideDirection, goToNext, goToPrevious, images.length]);

  // Handle empty images array
  if (!images || images.length === 0) {
    return (
      <div
        className={clsx("flex items-center justify-center bg-black-10", className)}
        style={{
          aspectRatio,
          maxHeight,
          borderRadius,
        }}
      >
        <p className="text-black-50">No images provided</p>
      </div>
    );
  }

  // Animation variants
  const slideVariants = {
    enter: (direction: string) => ({
      x: direction === "left" ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: string) => ({
      x: direction === "left" ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  return (
    <div
      className={clsx("relative w-full overflow-hidden", className)}
      style={{
        maxHeight: maxHeight,
        borderRadius: borderRadius,
      }}
    >
      {/* Aspect ratio spacer */}
      <div
        style={{
          paddingBottom: calculatePaddingBottom(aspectRatio),
        }}
      />

      {/* Content container */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false} custom={slideDirection}>
          <motion.div
            key={currentIndex}
            custom={slideDirection}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: transitionDuration,
              ease: [0.44, 0, 0.56, 1], // Custom easing matching project style
            }}
            className="absolute inset-0"
          >
            <CldImage
              src={images[currentIndex]}
              alt={`Slide ${currentIndex + 1}`}
              fill
              sizes="100vw"
              style={{
                objectFit,
              }}
              {...cloudinaryOptions}
            />
          </motion.div>
        </AnimatePresence>

        {/* Slide indicators */}
        {showIndicators && images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  onSlideChange?.(index);
                }}
                className={clsx(
                  "h-2 rounded-full transition-all duration-300",
                  index === currentIndex
                    ? "w-8 bg-white-100"
                    : "w-2 bg-white-100/50 hover:bg-white-100/75"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}