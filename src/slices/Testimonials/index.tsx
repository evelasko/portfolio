import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { isFilled } from "@prismicio/client";
import { getTestimonials } from "@/lib/queries";
import MainHeading from "@/components/headings/MainHeading";
import TestimonialCarousel from "@/components/lists_and_grids/TestimonialCarousel";

/**
 * Props for `Testimonials`.
 */
export type TestimonialsProps = SliceComponentProps<Content.TestimonialsSlice>;

/**
 * Component for "Testimonials" Slices.
 */
const Testimonials: FC<TestimonialsProps> = async ({ slice }) => {
  const { slice_type, variation } = slice;

  // Validate required fields
  if (!isFilled.keyText(slice.primary.title)) {
    return null;
  }

  // Determine testimonials data source
  let testimonialsData: Content.TestimonialDocument[] = [];

  if (slice.primary.include_all_published) {
    // Fetch all published testimonials
    const allTestimonials = await getTestimonials();
    testimonialsData = allTestimonials;
  } else {
    // Use testimonials from the group field
    if (isFilled.group(slice.primary.testimonials)) {
      testimonialsData = slice.primary.testimonials.map<Content.TestimonialDocument | null>(item => isFilled.contentRelationship(item.testimonial_item) ? item.testimonial_item as unknown as Content.TestimonialDocument : null).filter(item => item !== null);
    }
  }

  // Return early if no testimonials
  if (testimonialsData.length === 0) {
    return null;
  }
  console.log(testimonialsData);

  return (
    <section
      data-slice-type={slice_type}
      data-slice-variation={variation}
      className="py-16 m:py-20 l:py-24"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <MainHeading title={slice.primary.title as string} subtitle={slice.primary.subtitle as string} className="text-center" />

        {/* Testimonials Carousel */}
        <TestimonialCarousel testimonials={testimonialsData} />
      </div>
    </section>
  );
};

export default Testimonials;
