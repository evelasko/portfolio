import { INFO } from "@/content/info";
import BioBlock from "../misc/BioBlock";
import TestimonialCarousel from "../lists_and_grids/TestimonialCarousel";
import MainHeading from "../headings/MainHeading";
import CenieBanner from "./CenieBanner";
import { testimonials } from "@/content/testimonials";
import { useTranslations } from "next-intl";

export default function TheWho({ locale }: { locale: string }) {
  const t = useTranslations("home.sections.theWho");
  return (
    <>
      <section id="the-who" className="pt-32 bg-black-100">
        <MainHeading
          title={t("title")}
          className="text-center bg-black-100 text-white pt-32"
        />
        <BioBlock
          photo_path="https://res.cloudinary.com/evelasco/image/upload/v1761045901/eVelasco/profile/portrait-2-cropped.jpg"
          short_bio={t("shortBio")}
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
        {/* <MainHeading
          title={t("testimonialsHeading")}
          className="text-center text-white bg-black-100 mt-24 pt-12"
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
        /> */}
      </section>
      <div className="mb-28 m:mb-12">
        <CenieBanner />
      </div>
    </>
  );
}
