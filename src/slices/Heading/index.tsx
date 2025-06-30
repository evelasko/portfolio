import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { isFilled } from "@prismicio/client";
import MainHeading from "@/components/headings/MainHeading";

/**
 * Props for `Heading`.
 */
export type HeadingProps = SliceComponentProps<Content.HeadingSlice>;

/**
 * Component for "Heading" Slices.
 */
const Heading: FC<HeadingProps> = ({ slice }) => {
  // Check if both required fields are filled
  if (!isFilled.keyText(slice.primary.heading) || !isFilled.keyText(slice.primary.subheading)) {
    return null;
  }

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <MainHeading
        title={slice.primary.heading}
        subtitle={slice.primary.subheading}
        className="text-center"
      />
    </section>
  );
};

export default Heading;
