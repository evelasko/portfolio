"use client";

import { useRef, useEffect } from "react";
import AnimatedHero from "@/components/home/AnimatedHero";
import Message from "@/components/home/Message";
import { useLayout } from "@/contexts/LayoutContext";
import TheHow from "@/components/home/TheHow";
import TheWho from "@/components/home/TheWho";
import TheThoughts from "@/components/home/TheThoughts";
import TheWorks from "@/components/home/TheWorks";
import MessageSplit from "@/components/home/MessageSplit";
import { motion } from "motion/react";
import clsx from "clsx";
import { TYPOGRAPHY } from "@/lib/typography";
import { useTranslations } from "next-intl";
import type {
  ContentListItem,
  ArticleFrontmatter,
  WorkFrontmatter,
} from "@/lib/mdx/types";

export default function HomePage({
  locale,
  featuredArticles,
  featuredWorks,
}: {
  locale: string;
  featuredArticles: ContentListItem<ArticleFrontmatter>[];
  featuredWorks: ContentListItem<WorkFrontmatter>[];
}) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { setHeroRef, setShowNavBar, setShowFooter, setFooterVariant } =
    useLayout();

  // Configure layout for this page
  useEffect(() => {
    setHeroRef(heroRef);
    setShowNavBar(true);
    setShowFooter(true);
    setFooterVariant("full");
  }, [setHeroRef, setShowNavBar, setShowFooter, setFooterVariant]);

  const t = useTranslations("home");

  // Desktop/Tablet Row 2 Content
  const desktopRow2Content = (
    <div className="w-full flex flex-col justify-center gap-8">
      {/* First row: Two columns - text on left aligned right, empty on right */}
      <div className="flex w-full">
        <motion.div
          className="flex-1 flex justify-end pr-8"
          initial={{ opacity: 0, x: 50, y: 50 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            ease: [0.44, 0, 0.56, 1],
          }}
        >
          <span className={clsx(TYPOGRAPHY.h7, "pb-0 mb-0 text-white-100")}>
            You've been told a story
          </span>
        </motion.div>
        <div className="flex-1"></div>
      </div>

      {/* Second row: Centered 70% width column */}
      <div className="flex w-full justify-center">
        <motion.div
          className="w-[70%] text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            ease: [0.44, 0, 0.56, 1],
          }}
        >
          <span className={clsx(TYPOGRAPHY.h8, "text-white-100")}>
            that art and business are enemies,
            <br />
            that technology is a threat,
            <br />
            and that to be a true creator is to struggle
          </span>
        </motion.div>
      </div>

      {/* Third row: Two columns - empty on left, text on right aligned left */}
      <div className="flex w-full">
        <div className="flex-1"></div>
        <motion.div
          className="flex-1 flex justify-start pl-8"
          initial={{ opacity: 0, x: -50, y: -50 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            ease: [0.44, 0, 0.56, 1],
          }}
        >
          <span className={clsx(TYPOGRAPHY.h7, "text-white-100")}>
            That story is a lie.
            <br />
            It is a bug in our collective code.
          </span>
        </motion.div>
      </div>
    </div>
  );

  // Mobile Row 1 Content
  const mobileRow1Content = (
    <div className="flex flex-col gap-6 w-full">
      {/* Text 1: Left aligned */}
      <motion.div
        className="text-left"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          ease: [0.44, 0, 0.56, 1],
          delay: 0.3,
        }}
      >
        <span className={clsx(TYPOGRAPHY.h7, "pb-0 mb-0 text-white-100")}>
          You've been told a story
        </span>
      </motion.div>

      {/* Text 2: Left aligned */}
      <motion.div
        className="text-left"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          ease: [0.44, 0, 0.56, 1],
          delay: 0.5,
        }}
      >
        <span className={clsx(TYPOGRAPHY.h8, "text-white-100")}>
          that art and business are enemies,
          <br />
          that technology is a threat,
          <br />
          and that to be a true creator is to struggle
        </span>
      </motion.div>

      {/* Text 3: Right aligned */}
      <motion.div
        className="text-right"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          ease: [0.44, 0, 0.56, 1],
          delay: 0.7,
        }}
      >
        <span className={clsx(TYPOGRAPHY.h7, "text-white-100")}>
          That story is a lie.
          <br />
          It is a bug in our collective code.
        </span>
      </motion.div>
    </div>
  );

  return (
    <>
      <AnimatedHero
        sideTextHorizontal="2K25"
        sideTextVertical="./ PORTFOLIO"
        subtitle={t("subtitle")}
        images={[]}
        link="#documentation"
        video="https://res.cloudinary.com/evelasco/video/upload/v1760882884/eVelasco/videos/throwback-slo-mo_b1sycx.mp44"
        heroRef={heroRef}
        row2Content={desktopRow2Content}
        mobileRow1Content={mobileRow1Content}
      />
      <Message segments={t("sections.message").split("\n")} />

      <MessageSplit
        initialText={t("sections.messageSplit.initialText")}
        leftText={t("sections.messageSplit.leftText")}
        rightText={t("sections.messageSplit.rightText")}
        finalText={t("sections.messageSplit.finalText")}
        imagePath="https://res.cloudinary.com/misfitcoders/image/upload/v1760882564/eVelasco/backgrounds/curtain.jpg"
      />
      <TheHow />
      <TheWho locale={locale} />
      <TheWorks locale={locale} works={featuredWorks} />
      <TheThoughts locale={locale} articles={featuredArticles} />
    </>
  );
}
