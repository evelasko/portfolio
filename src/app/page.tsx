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
