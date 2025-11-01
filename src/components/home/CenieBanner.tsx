import Image from "next/image";
import CenieFullLogo from "@/components/graphics/CenieFullLogo";
import PortfolioButton from "@/components/buttons/PortfolioButton";
import { TYPOGRAPHY } from "@/lib/typography";
import { ArrowUpRight } from "lucide-react";
import clsx from "clsx";
import CenieLogo from "../graphics/CenieLogo";
import { useTranslations } from "next-intl";

export default function CenieBanner() {
  const t = useTranslations("home.sections.theWho");
  return (
    <section className="relative w-full bg-black-100 -mb-px">
      {/* Background Image Container - Square aspect ratio */}
      <div className="relative w-full aspect-square -mt-px">
        <Image
          src="https://res.cloudinary.com/misfitcoders/image/upload/v1760882574/eVelasco/backgrounds/fabric-folds-orange-3.jpg"
          alt=""
          fill
          className="object-cover"
          priority={false}
          quality={100}
        />
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center px-6 m:px-12 l:px-24">
        <div className="w-full max-w-7xl">
          {/* Two Column Grid - Single column on mobile */}
          <div className="grid grid-cols-1 l:grid-cols-2 gap-12 l:gap-24 items-center">
            {/* Column 1: Logo */}
            <div className="flex justify-center l:justify-end">
              <div className="w-1/3 l:w-1/2">
                <CenieLogo color="var(--color-white-100)" />
              </div>
            </div>

            {/* Column 2: Text and Button */}
            <div className="flex flex-col gap-8 l:gap-10 items-center l:items-end justify-center l:justify-end">
              <h2
                className={clsx(
                  TYPOGRAPHY.h5,
                  "text-white-100 text-center l:text-right"
                )}
              >
                {t("cenieBannerText")}
              </h2>
              {/* <div className="mix-blend-difference! l:mix-blend-normal! mt-10 l:mt-0">
                <PortfolioButton href="https://cenie.org" variant="light">
                  <span>{t("cenieBannerLabel")}</span>
                  <ArrowUpRight className="ml-2" size={20} />
                </PortfolioButton>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
