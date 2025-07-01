import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { isFilled } from "@prismicio/client";
import ImageSimpleStripe from "@/components/image_stripes/ImageSimpleStripe";
import LongStripe from "@/components/image_stripes/LongStripe";

/**
 * Props for `ImageStripe`.
 */
export type ImageStripeProps = SliceComponentProps<Content.ImageStripeSlice>;

/**
 * Component for "ImageStripe" Slices.
 */
const ImageStripe: FC<ImageStripeProps> = ({ slice }) => {
  const { slice_type, variation } = slice;

  // SimpleStripe variant (default)
  if (variation === "default") {
    // Extract image paths from group field
    const imagePaths = isFilled.group(slice.primary.images) 
      ? slice.primary.images.map(item => item.image_path || "").filter(Boolean)
      : [];

    // Validate that we have images
    if (imagePaths.length === 0) {
      return null;
    }

    return (
      <section
        data-slice-type={slice_type}
        data-slice-variation={variation}
      >
        <ImageSimpleStripe
          images={imagePaths}
          height={isFilled.number(slice.primary.height) ? slice.primary.height : undefined}
          margin={isFilled.number(slice.primary.margin) ? slice.primary.margin : 0}
        />
      </section>
    );
  }

  // LongStripe variant
  if (variation === "longStripe") {
    // Extract image paths from group fields
    const imagePaths = isFilled.group(slice.primary.images) 
      ? slice.primary.images.map(item => item.image_path || "").filter(Boolean)
      : [];

    const featuredImagePaths = isFilled.group(slice.primary.featured_images) 
      ? slice.primary.featured_images.map(item => item.image_path || "").filter(Boolean)
      : [];

    // Validate that we have images and row_height
    if ((imagePaths.length === 0 && featuredImagePaths.length === 0) || !isFilled.number(slice.primary.row_height)) {
      return null;
    }

    return (
      <section
        data-slice-type={slice_type}
        data-slice-variation={variation}
      >
        <LongStripe
          images={imagePaths}
          featured_images={featuredImagePaths}
          row_height={slice.primary.row_height}
          featured_row_height={isFilled.number(slice.primary.featured_row_height) ? slice.primary.featured_row_height : undefined}
          margin={isFilled.number(slice.primary.margin) ? slice.primary.margin : 0}
        />
      </section>
    );
  }

  return null;
};

export default ImageStripe;
