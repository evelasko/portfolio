import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Banner`.
 */
export type BannerProps = SliceComponentProps<Content.BannerSlice>;

/**
 * Component for "Banner" Slices.
 */
const Banner: FC<BannerProps> = ({ slice }) => {
  const { slice_type, variation } = slice;
  return (
    <section
      data-slice-type={slice_type}
      data-slice-variation={variation}
    >

    </section>
  );
};

export default Banner;
