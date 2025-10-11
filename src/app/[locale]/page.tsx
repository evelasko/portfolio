"use client";

import { useRef, useEffect } from "react";
import InfoImageBlock from "@/components/content_blocks/InfoImageBlock";
import AnimatedHero from "@/components/home/AnimatedHero";
import Message from "@/components/home/Message";
import { useLayout } from "@/contexts/LayoutContext";
import MessageBackground from "@/components/home/MessageBackground";
import TheHow from "@/components/home/TheHow";
import TheWho from "@/components/home/TheWho";
import ConnectBanner from "@/components/banners/ConnectBanner";
import TheThoughts from "@/components/home/TheThoughts";
import TheWorks from "@/components/home/TheWorks";
import MessageSplit from "@/components/home/MessageSplit";
import { motion } from "motion/react";
import clsx from "clsx";
import { TYPOGRAPHY } from "@/lib/typography";

export default function Page() {
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
        subtitle="TIMELESS VISUAL STORIES FOR LEGENDARY BRANDS"
        images={[]}
        link="#documentation"
        video="/assets/videos/throwback-slo-mo.mp4"
        heroRef={heroRef}
        row2Content={desktopRow2Content}
        mobileRow1Content={mobileRow1Content}
      />
      <Message
        segments={[
          "I believe in a new language.",
          "A language where a line of code can be as elegant as a line of choreography.",
          "Where a business model can be a work of art.",
          "And where an artist can be the architect of their own future.",
        ]}
      />

      <MessageSplit
        initialText="Reach beyond your art"
        leftText="The old model casts you as a performer, waiting for permission, subject to a broken system."
        rightText="The new model empowers you as an architect: a sovereign creator who designs their own systems, builds their own value, and owns their own career."
        finalText="Become an Architect"
        imagePath="/assets/images/backgrounds/curtain.jpg"
      />
      <TheHow />
      <TheWho />
      <ConnectBanner
        primary_text="Start Exploring"
        key_text="The path of an architect begins with a single, intentional step."
        cta_label="ENTER CENIE →"
        cta_link="https://www.cenie.org"
      />
      <TheWorks />
      <TheThoughts />
    </>
  );
}
