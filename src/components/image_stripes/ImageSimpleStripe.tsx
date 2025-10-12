"use client";

import Image from "next/image";
import { motion } from "motion/react";

/**
 * ImageSimpleStripe component
 * @param images - string[], image source paths (max 3 images)
 * @param height - number, optional custom height in pixels (default: maintains 4:3 aspect ratio)
 * @param margin - number, optional vertical margin in pixels (default: 0)
 */
export default function ImageSimpleStripe({
  images,
  height,
  margin = 0,
}: {
  images: string[];
  height?: number;
  margin?: number;
}) {
  // Limit to maximum 3 images
  const displayImages = images.slice(0, 3);
  const imageCount = displayImages.length;

  // Determine grid columns based on image count
  const getGridCols = () => {
    switch (imageCount) {
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-1 m:grid-cols-2";
      case 3:
        return "grid-cols-1 m:grid-cols-2 l:grid-cols-3";
      default:
        return "grid-cols-1";
    }
  };

  return (
    <div
      className="w-full"
      style={{
        marginTop: `${margin}px`,
        marginBottom: `${margin}px`,
      }}
    >
      <div className={`grid ${getGridCols()}`}>
        {displayImages.map((image, index) => (
          <motion.div
            key={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className={`relative w-full overflow-hidden ${height ? "" : "aspect-[4/3]"}`}
            style={height ? { height: `${height}px` } : undefined}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  type: "spring",
                  duration: 0.6,
                  delay: index * 0.1,
                  bounce: 0,
                },
              },
            }}
          >
            <Image
              src={image}
              alt={`Image ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
