import { INFO } from "@/content/info";
import BioBlock from "../misc/BioBlock";
import TestimonialCarousel from "../lists_and_grids/TestimonialCarousel";
import MainHeading from "../headings/MainHeading";
import CenieBanner from "./CenieBanner";
import { testimonials } from "@/content/testimonials";

export default function TheWho({ locale }: { locale: string }) {
  return (
    <>
      <section id="the-who">
        <MainHeading
          title="about me"
          className="text-center bg-black-100 text-white"
        />
        <BioBlock
          photo_path="/assets/images/photos/photo_2.jpg"
          short_bio="My journey wasn't in one world, but at the intersection of two. From the stages of the **Netherlands Dans Theatre** to the command line of a programming terminal, I discovered the same core truth: **the most powerful creations come from a harmony of logic and soul**. I don't teach theory; I share a methodology I've lived. **My goal is to give you the compass I built for myself.**"
          social_links={INFO.social}
          other_links={[
            {
              href: "/",
              label: { en: "Read more", es: "Leer más" },
            },
            {
              href: "/",
              label: { en: "Contact me", es: "Contactarme" },
            },
          ]}
          margin={60}
        />
        <MainHeading
          title="Words about me"
          className="text-center text-white bg-black-100"
        />
        <TestimonialCarousel
          className="text-white bg-black-100"
          variant="dark"
          itemClassName="bg-white/10 border border-white/20"
          testimonials={testimonials.map(testimonial => ({
            ...testimonial,
            message:
              testimonial.message[locale as keyof typeof testimonial.message],
          }))}
        />
      </section>
      <div className="mb-28 m:mb-12">
        <CenieBanner />
      </div>
    </>
  );
}
