"use client";

import CardGrid from "../content_blocks/CardGrid";
import MainHeading from "../headings/MainHeading";
import clsx from "clsx";
import { TYPOGRAPHY } from "@/lib/typography";
import CenieFullLogo from "../graphics/CenieFullLogo";
import { useTranslations } from "next-intl";
import WaitlistForm from "../forms/WaitlistForm";

export default function TheHow() {
  const t = useTranslations("home.sections.theHow");
  return (
    <section id="the-how" className="w-full bg-white">
      <MainHeading title={t("title")} className="text-center mb-0" />
      <div
        className={clsx(
          TYPOGRAPHY.h7,
          "text-center px-12 mb-0! pb-0! leading-tight"
        )}
      >
        {t("subtitle")
          .split(`|`)
          .map((line, i) => (
            <div key={i}>{line}</div>
          ))}
      </div>
      <div
        className="w-full aspect-16/18 bg-cover bg-center mt-0! mb-0! pt-0!  bg-black"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/misfitcoders/image/upload/v1760882567/eVelasco/backgrounds/fabric-folds-orange-1.jpg')",
        }}
      >
        <CardGrid
          className="mt-0 pt-12 m:pt-16 l:pt-20 px-5 m:px-10 l:px-20"
          cardClassName="!bg-white/50 backdrop-blur-lg"
          cards={[
            {
              icon: "Book",
              title: t("grid.editorial.title"),
              bodyText: t("grid.editorial.text"),
              buttonLabel: t("grid.editorial.label"),
              buttonLink: "https://editorial.cenie.org",
            },
            {
              icon: "DraftingCompass",
              title: t("grid.academy.title"),
              bodyText: t("grid.academy.text"),
              buttonLabel: t("grid.academy.label"),
              buttonLink: "https://academia.cenie.org",
            },
            {
              icon: "Bot",
              title: t("grid.agency.title"),
              bodyText: t("grid.agency.text"),
              buttonLabel: t("grid.agency.label"),
              buttonLink: "https://agencia.cenie.org",
            },
            {
              icon: "Drama",
              title: t("grid.spoke.title"),
              bodyText: t("grid.spoke.text"),
              buttonLabel: t("grid.spoke.label"),
              buttonLink: "https://cenie.org",
            },
          ]}
        />
        <div className="flex flex-col items-center justify-center pb-12">
          <MainHeading title={t("intro")} className="text-center text-white" />
          <div className="w-2/3 mb-12">
            <CenieFullLogo color="rgba(255, 255, 255, 0.9)" />
          </div>
          <WaitlistForm
            translationNamespace="home.sections.theHow"
            className="max-w-md px-5"
            variant="dark"
          />
        </div>
      </div>
    </section>
  );
}
