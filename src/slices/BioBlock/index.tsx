import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { isFilled } from "@prismicio/client";
import BioBlock from "@/components/misc/BioBlock";
import { getSocialLinks } from "@/lib/queries";

/**
 * Props for `BioBlock`.
 */
export type BioBlockProps = SliceComponentProps<Content.BioBlockSlice>;

/**
 * Component for "BioBlock" Slices.
 */
const BioBlockSlice: FC<BioBlockProps> = async ({ slice }) => {
  const { slice_type, variation } = slice;

  // Validate required fields
  if (!isFilled.keyText(slice.primary.photo_path) || !isFilled.richText(slice.primary.short_bio)) {
    return null;
  }

  // Fetch social links using the custom query
  const socialLinks = await getSocialLinks();

  // Extract other links from the group field
  const otherLinks = slice.primary.other_links.map((item) => item.link);

  return (
    <section
      data-slice-type={slice_type}
      data-slice-variation={variation}
    >
      <BioBlock
        photo_path={slice.primary.photo_path}
        over_photo_text={isFilled.keyText(slice.primary.over_photo_text) ? slice.primary.over_photo_text : undefined}
        over_photo_graphic={isFilled.keyText(slice.primary.over_photo_graphic) ? slice.primary.over_photo_graphic : undefined}
        graphic_width={isFilled.number(slice.primary.graphic_width) ? slice.primary.graphic_width : undefined}
        graphic_height={isFilled.number(slice.primary.graphic_height) ? slice.primary.graphic_height : undefined}
        short_bio={slice.primary.short_bio}
        social_links={socialLinks}
        other_links={otherLinks}
        margin={isFilled.number(slice.primary.margin) ? slice.primary.margin : undefined}
      />
    </section>
  );
};

export default BioBlockSlice;
