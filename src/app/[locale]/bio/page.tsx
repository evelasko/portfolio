import BlockQuoteBanner from "@/components/banners/BlockQuoteBanner";
import FullWidthImage from "@/components/banners/FullWidthImage";
import TwoColContent from "@/components/banners/TwoColContent";
import ImageCard from "@/components/cards/ImageCard";
import CenieLogo from "@/components/graphics/CenieLogo";
import MainHeading from "@/components/headings/MainHeading";
import Hobbies from "./Hobbies";
import PhotoHero from "@/components/heroes/PhotoHero";
import { Button } from "@/components/ui/button";
import { TYPOGRAPHY } from "@/lib/typography";
import clsx from "clsx";
import { FileText } from "lucide-react";
import WaitlistForm from "@/components/forms/WaitlistForm";
import InlineSlideshow from "@/components/banners/InlineSlideshow";
import { getTranslations } from "next-intl/server";
import React from "react";
import JsonLd from "@/components/seo/JsonLd";
import {
  generatePersonSchema,
  generateBreadcrumbSchema,
} from "@/lib/seo/schemas";
import { BASE_URL } from "@/lib/seo/metadata";
import { getAbsoluteUrl } from "@/lib/seo/utils";
import { INFO } from "@/content/info";
import { Metadata } from "next";
import { generateBioMetadata } from "@/lib/seo/metadata";
import { TrackedLink } from "@/components/analytics/TrackedLink";

type Props = {
  params: Promise<{ locale: string }>;
};

/**
 * Generate metadata for bio page
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generateBioMetadata(locale as "en" | "es");
}

export default async function BioPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations("bio");

  // Generate Person schema
  const personSchema = generatePersonSchema({
    includeAddress: true,
    includeContact: true,
    jobTitle: INFO.tagline,
    description: t("subtitle"),
    knowsAbout: [
      "Creative Technology",
      "Dance",
      "Software Engineering",
      "Business Development",
      "Choreography",
      "Full-Stack Development",
    ],
  });

  // Generate Breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    {
      name: locale === "en" ? "Home" : "Inicio",
      url: BASE_URL,
    },
    {
      name: locale === "en" ? "About" : "Acerca de",
      url: getAbsoluteUrl(`/${locale}/bio`, BASE_URL),
    },
  ]);

  return (
    <>
      <JsonLd data={personSchema} />
      <JsonLd data={breadcrumbSchema} />
      <section>
        <PhotoHero
          title={t("title")}
          subtitle={t("subtitle")}
          backgroundImage="https://res.cloudinary.com/misfitcoders/image/upload/v1760995083/eVelasco/backgrounds/seating-layout.jpg"
          photo="https://res.cloudinary.com/misfitcoders/image/upload/v1761043101/eVelasco/profile/protrait-1.jpg"
          link="#documentation"
        />
      </section>

      <section>
        <BlockQuoteBanner quote={t("quote")} />

        <TwoColContent
          content={[
            {
              imagePath:
                "https://res.cloudinary.com/misfitcoders/image/upload/v1760882564/eVelasco/backgrounds/curtain.jpg",
              heading: t("twoCol.stage.heading"),
              text: t("twoCol.stage.text"),
            },
            {
              imagePath:
                "https://res.cloudinary.com/misfitcoders/image/upload/v1761995034/eVelasco/backgrounds/computer-code.jpg",
              heading: t("twoCol.machine.heading"),
              text: t("twoCol.machine.text"),
            },
          ]}
          className="mt-12"
        />
      </section>
      <section className="mx-12">
        <MainHeading
          title={t("synthesis.title")}
          subtitle={t("synthesis.subtitle")}
          className="mt-24 mb-12 text-center"
        />
        <p className={clsx(TYPOGRAPHY.text20)}>{t("synthesis.paragraph1")}</p>
        <div className="w-full my-12">
          <InlineSlideshow
            className="w-full"
            aspectRatio="16:9"
            maxHeight="400px"
            borderRadius="12px"
            objectFit="cover"
            autoPlay={true}
            slideDirection="left"
            showIndicators={true}
            slideDuration={5000}
            transitionDuration={0.6}
            images={[
              "https://res.cloudinary.com/misfitcoders/image/upload/v1761254001/eVelasco/photos/rehearsal-3.jpg",
              "https://res.cloudinary.com/misfitcoders/image/upload/v1761254001/eVelasco/photos/rehearsal-2.jpg",
              "https://res.cloudinary.com/misfitcoders/image/upload/v1761254001/eVelasco/photos/rehearsal-1.jpg",
              "https://res.cloudinary.com/misfitcoders/image/upload/v1761253998/eVelasco/photos/computer-1.jpg",
              "https://res.cloudinary.com/misfitcoders/image/upload/v1761253998/eVelasco/photos/computer-2.jpg",
              "https://res.cloudinary.com/misfitcoders/image/upload/v1761253998/eVelasco/photos/computer-3.jpg",
            ]}
          />
        </div>
        <p className={clsx(TYPOGRAPHY.text20)}>{t("synthesis.paragraph2")}</p>
      </section>
      <section className="mx-4 m:mx-12">
        <MainHeading
          title={t("milestones.title")}
          subtitle={t("milestones.subtitle")}
          className="mt-24 mb-12 text-center"
        />
        <div className="grid grid-cols-2 m:grid-cols-3 gap-4 m:gap-12">
          {[
            {
              heading: t("milestones.grid.academic.heading"),
              content: t("milestones.grid.academic.text"),
              imagePath:
                "https://res.cloudinary.com/misfitcoders/image/upload/v1761996873/eVelasco/covers/milestones/academic-rigor_clkiff.jpg",
            },
            {
              heading: t("milestones.grid.performance.heading"),
              content: t("milestones.grid.performance.text"),
              imagePath:
                "https://res.cloudinary.com/misfitcoders/image/upload/v1761996938/eVelasco/covers/milestones/theatrical-performance_vckj7y.jpg",
            },
            {
              heading: t("milestones.grid.creative.heading"),
              content: t("milestones.grid.creative.text"),
              imagePath:
                "https://res.cloudinary.com/misfitcoders/image/upload/v1761996879/eVelasco/covers/milestones/creative-innovation_kud8pz.jpg",
            },
            {
              heading: t("milestones.grid.technology.heading"),
              content: t("milestones.grid.technology.text"),
              imagePath:
                "https://res.cloudinary.com/misfitcoders/image/upload/v1761996934/eVelasco/covers/milestones/technological-entrepeneurship_unzhdw.jpg",
            },
            {
              heading: t("milestones.grid.automation.heading"),
              content: t("milestones.grid.automation.text"),
              imagePath:
                "https://res.cloudinary.com/misfitcoders/image/upload/v1761996876/eVelasco/covers/milestones/ai-automation_bpetv2.jpg",
            },
            {
              heading: t("milestones.grid.recognition.heading"),
              content: t("milestones.grid.recognition.text"),
              imagePath:
                "https://res.cloudinary.com/misfitcoders/image/upload/v1761996931/eVelasco/covers/milestones/peer-recognition_oe3ple.jpg",
            },
          ].map(item => (
            <ImageCard
              key={item.heading}
              image={item.imagePath}
              title={item.heading}
              description={item.content}
              centerTitle={true}
              centerContent={true}
            />
          ))}
        </div>
        <div className="flex flex-col justify-center items-center gap-8 my-12">
          <div className={clsx(TYPOGRAPHY.text20, "mt-12 text-center")}>
            {t("cvText")
              .split("|")
              .map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < t("cvText").split("|").length - 1 && <br />}
                </React.Fragment>
              ))}
          </div>
          <TrackedLink
            href="/downloads/resume-EnriqueVelasco.pdf"
            trackingType="cv_download"
            trackingData={{
              location: "bio_page",
              language: locale as "en" | "es",
            }}
            className={clsx(TYPOGRAPHY.mono18)}
            target="_blank"
          >
            <Button variant="outline" className="uppercase border-black-60">
              <FileText /> {t("cvLabel")}
            </Button>
          </TrackedLink>
        </div>
      </section>
      <section className="w-full">
        <MainHeading
          title={t("transference.title")}
          subtitle={t("transference.subtitle")}
          className="mt-32 mb-0 text-center"
        />
        <div className="w-full">
          <FullWidthImage
            image="https://res.cloudinary.com/misfitcoders/image/upload/v1761210986/eVelasco/backgrounds/fabric-folds-orange-6.jpg"
            alt="CENIE Ecosystem"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center items-center relative z-10">
              <div className="flex justify-center items-center p-32 md:p-12">
                <CenieLogo
                  color="rgba(0, 0, 0, 0.9)"
                  className="drop-shadow-lg"
                />
              </div>
              <div
                className="flex flex-col gap-6 px-6 pb-6 md:px-0 md:pb-0 md:pr-24"
                style={{ mixBlendMode: "difference" }}
              >
                <p
                  className={clsx(
                    TYPOGRAPHY.text18,
                    "font-semibold",
                    "text-center md:text-left",
                    "text-black",
                    "mix-blend-difference!",
                    "bg-white/30 rounded-lg p-6 backdrop-blur-3xl"
                  )}
                >
                  {t("transference.text")}
                </p>
                <div className="mt-6">
                  <WaitlistForm
                    translationNamespace="bio.transference"
                    variant="light"
                  />
                </div>
              </div>
            </div>
          </FullWidthImage>
        </div>
      </section>
      <section className="mx-12">
        <MainHeading
          title={t("beyond.title")}
          subtitle={t("beyond.subtitle")}
          className="mt-32 mb-12 text-center"
        />
        <p className={clsx(TYPOGRAPHY.text20, "text-center pb-32")}>
          {t("beyond.text")
            .split("|")
            .map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i < t("beyond.text").split("|").length - 1 && <br />}
              </React.Fragment>
            ))}
        </p>
        <Hobbies />
      </section>
      <section className="mt-24 px-12 bg-black">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-24">
          <div>
            <h3
              className={clsx(TYPOGRAPHY.h2, "mt-12 font-extrabold text-white")}
            >
              {t("connect.title")
                .split("|")
                .map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < t("connect.title").split("|").length - 1 && <br />}
                  </React.Fragment>
                ))}
            </h3>
          </div>
          <div className="flex flex-col gap-6">
            <p className={clsx(TYPOGRAPHY.text20, "text-white")}>
              {t("connect.text")}
            </p>
            <TrackedLink
              href="mailto:info@evelas.co"
              trackingType="email"
              trackingData={{ email: "info@evelas.co", source: "bio" }}
              className={clsx(TYPOGRAPHY.mono20, "uppercase py-24 text-white")}
            >
              {t("connect.buttonLabel")}
            </TrackedLink>
          </div>
        </div>
      </section>
    </>
  );
}
