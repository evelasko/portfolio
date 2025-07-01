import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { isFilled, asDate } from "@prismicio/client";
import ContentHeadingBlock from "@/components/content_blocks/ContentHeadingBlock";
import InfoTextBlock from "@/components/content_blocks/InfoTextBlock";
import InfoImageBlock from "@/components/content_blocks/InfoImageBlock";
import InfoSimpleBlock from "@/components/content_blocks/InfoSimpleBlock";

/**
 * Props for `ContentBlock`.
 */
export type ContentBlockProps = SliceComponentProps<Content.ContentBlockSlice>;

/**
 * Component for "ContentBlock" Slices.
 */
const ContentBlock: FC<ContentBlockProps> = ({ slice }) => {
  const { slice_type, variation } = slice;

  // Heading variant (default)
  if (variation === "default") {
    // Extract list items from group field
    const listItems = isFilled.group(slice.primary.list_items) 
      ? slice.primary.list_items.map(item => item.list_item || "").filter(Boolean)
      : [];

    // Format date
    const formattedDate = isFilled.date(slice.primary.date) 
      ? asDate(slice.primary.date)?.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric"
        }) || ""
      : "";

    // Validate required fields
    if (
      !isFilled.keyText(slice.primary.overtitle) ||
      !isFilled.keyText(slice.primary.title) ||
      !isFilled.keyText(slice.primary.subtitle)
    ) {
      return null;
    }

    return (
      <section
        data-slice-type={slice_type}
        data-slice-variation={variation}
        style={{ paddingTop: '100px', paddingBottom: '100px' }}
      >
        <ContentHeadingBlock
          overtitle={slice.primary.overtitle}
          title={slice.primary.title}
          subtitle={slice.primary.subtitle}
          date={formattedDate}
          quote={slice.primary.quote || ""}
          list_label={slice.primary.list_label || ""}
          list_items={listItems}
        />
      </section>
    );
  }

  // Info Text Block variant
  if (variation === "infoTextBlock") {
    // Validate required fields
    if (
      !isFilled.keyText(slice.primary.heading) ||
      !isFilled.keyText(slice.primary.subheading_text) ||
      !isFilled.keyText(slice.primary.info_text)
    ) {
      return null;
    }

    return (
      <section
        data-slice-type={slice_type}
        data-slice-variation={variation}
        style={{ paddingTop: '100px', paddingBottom: '100px' }}
      >
        <InfoTextBlock
          heading={slice.primary.heading}
          subheading={slice.primary.subheading_text}
          info_text={slice.primary.info_text}
          quote={slice.primary.quote || ""}
          quote_author={`—${slice.primary.quote_author}` || ""} // Not available in this variant
        />
      </section>
    );
  }

  // Info Image Block variant
  if (variation === "infoImageBlock") {
    // Validate required fields
    if (
      !isFilled.keyText(slice.primary.heading) ||
      !isFilled.keyText(slice.primary.image_path) ||
      !isFilled.keyText(slice.primary.info_text)
    ) {
      return null;
    }

    return (
      <section
        data-slice-type={slice_type}
        data-slice-variation={variation}
        style={{ paddingTop: '100px', paddingBottom: '100px' }}
      >
        <InfoImageBlock
          heading={slice.primary.heading}
          image_path={slice.primary.image_path}
          image_caption={slice.primary.image_caption || ""}
          info_text={slice.primary.info_text}
          quote={slice.primary.quote || ""}
        />
      </section>
    );
  }

  // Info Simple Block variant
  if (variation === "infoSimpleBlock") {
    // Validate required fields
    if (
      !isFilled.keyText(slice.primary.heading) ||
      !isFilled.keyText(slice.primary.subheading) ||
      !isFilled.keyText(slice.primary.info_text)
    ) {
      return null;
    }

    return (
      <section
        data-slice-type={slice_type}
        data-slice-variation={variation}
        style={{ paddingTop: '100px', paddingBottom: '100px' }}
      >
        <InfoSimpleBlock
          heading={slice.primary.heading}
          subheading={slice.primary.subheading}
          info_text={slice.primary.info_text}
        />
      </section>
    );
  }

  return null;
};

export default ContentBlock;
