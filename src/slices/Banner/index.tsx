import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { isFilled } from "@prismicio/client";
import { asLink } from "@prismicio/client";
import BlockQuoteBanner from "@/components/banners/BlockQuoteBanner";
import ConnectBanner from "@/components/banners/ConnectBanner";

/**
 * Props for `Banner`.
 */
export type BannerProps = SliceComponentProps<Content.BannerSlice>;

/**
 * Component for "Banner" Slices.
 */
const Banner: FC<BannerProps> = ({ slice }) => {
  const { slice_type, variation } = slice;

  // Quote variant (default)
  if (variation === "default") {
    if (!isFilled.keyText(slice.primary.quote_text)) {
      return null;
    }

    return (
      <section
        data-slice-type={slice_type}
        data-slice-variation={variation}
      >
        <BlockQuoteBanner quote={slice.primary.quote_text} />
      </section>
    );
  }

  // Connect variant
  if (variation === "connect") {
    if (
      !isFilled.keyText(slice.primary.primary_text) ||
      !isFilled.keyText(slice.primary.key_text) ||
      !isFilled.link(slice.primary.cta_link)
    ) {
      return null;
    }

    const ctaLink = asLink(slice.primary.cta_link) || "";
    const ctaLabel = slice.primary.cta_link.text || "Learn More";

    return (
      <section
        data-slice-type={slice_type}
        data-slice-variation={variation}
        style={{
          backgroundImage: isFilled.keyText(slice.primary.background_image_path) 
            ? `url(${slice.primary.background_image_path})` 
            : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0
        }}
      >
        <ConnectBanner
          primary_text={slice.primary.primary_text}
          key_text={slice.primary.key_text}
          cta_label={ctaLabel}
          cta_link={ctaLink}
        />
      </section>
    );
  }

  return null;
};

export default Banner;
