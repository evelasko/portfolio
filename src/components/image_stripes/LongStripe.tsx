"use client";

import { motion } from "motion/react";
import ImageSimpleStripe from "./ImageSimpleStripe";
import { CloudinaryImage } from "@/components/mdx/CloudinaryImage";

/**
 * LongStripe component
 * @param images - string[], array of images for multi-image rows (2-3 images per row)
 * @param featured_images - string[], array of featured images for single-image rows
 * @param row_height - number, height in pixels applied to multi-image rows
 * @param featured_row_height - number, optional height in pixels for featured rows (defaults to row_height)
 * @param margin - number, vertical margin in pixels between the entire stripe and surrounding content
 */
export default function LongStripe({
  images,
  featured_images,
  row_height,
  featured_row_height,
  margin = 0,
}: {
  images: string[];
  featured_images: string[];
  row_height: number;
  featured_row_height?: number;
  margin?: number;
}) {
  // Function to distribute images into alternating rows
  const distributeImages = (images: string[], featured_images: string[]) => {
    const rows: Array<{ type: "multi" | "featured"; images: string[] }> = [];
    let imageIndex = 0;
    let featuredIndex = 0;
    let isMultiRow = true; // Start with multi-image row

    while (
      imageIndex < images.length ||
      featuredIndex < featured_images.length
    ) {
      if (isMultiRow && imageIndex < images.length) {
        // Multi-image row logic
        const remainingImages = images.length - imageIndex;
        let imagesForThisRow;

        if (remainingImages <= 3) {
          // Take all remaining if 3 or fewer, but ensure at least 2 for multi-row
          imagesForThisRow = remainingImages >= 2 ? remainingImages : 0;
        } else {
          // Take 2 or 3, ensuring we don't leave exactly 1 image
          if (remainingImages === 4) {
            imagesForThisRow = 2; // Take 2, leave 2 for next multi-row
          } else {
            imagesForThisRow = 3; // Take 3
          }
        }

        // Only create multi-row if we have at least 2 images
        if (imagesForThisRow >= 2) {
          rows.push({
            type: "multi",
            images: images.slice(imageIndex, imageIndex + imagesForThisRow),
          });
          imageIndex += imagesForThisRow;
        }
        isMultiRow = false; // Next should be featured
      } else if (!isMultiRow && featuredIndex < featured_images.length) {
        // Featured row
        rows.push({
          type: "featured",
          images: [featured_images[featuredIndex]],
        });
        featuredIndex++;
        isMultiRow = true; // Next should be multi
      } else {
        // Switch row type if current type can't be fulfilled
        isMultiRow = !isMultiRow;

        // Prevent infinite loop
        if (
          imageIndex >= images.length &&
          featuredIndex >= featured_images.length
        ) {
          break;
        }
      }
    }

    // Handle any remaining single image by adding to last multi-row if possible
    if (imageIndex < images.length) {
      const remaining = images.slice(imageIndex);
      if (remaining.length === 1 && rows.length > 0) {
        const lastRow = rows[rows.length - 1];
        if (lastRow.type === "multi" && lastRow.images.length < 3) {
          lastRow.images.push(remaining[0]);
        } else {
          // If we can't add to existing row and have remaining featured images,
          // create alternating rows for remaining items
          rows.push({
            type: "multi",
            images:
              remaining.length >= 2 ? remaining : [remaining[0], remaining[0]], // Duplicate if only 1 to avoid single-image multi-row
          });
        }
      }
    }

    return rows;
  };

  const distributedRows = distributeImages(images, featured_images);

  // Use featured_row_height if provided, otherwise fall back to row_height
  const featuredHeight = featured_row_height ?? row_height;

  return (
    <div
      className="w-full"
      style={{
        marginTop: `${margin}px`,
        marginBottom: `${margin}px`,
      }}
    >
      {distributedRows.map((row, index) => (
        <div key={index} className="w-full">
          {row.type === "multi" ? (
            // Multi-image row using ImageSimpleStripe with no margin
            <ImageSimpleStripe
              images={row.images}
              height={row_height}
              margin={0}
            />
          ) : (
            // Featured image row
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="relative w-full overflow-hidden"
              style={{ height: `${featuredHeight}px` }}
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
              <CloudinaryImage
                src={row.images[0]}
                alt="Featured image"
                fill
                crop="fill"
                gravity="auto"
                quality="auto"
                className="object-cover"
                sizes="100vw"
              />
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
}
