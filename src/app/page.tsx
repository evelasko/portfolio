"use client";

import { useRef, useEffect } from "react";
import InfoImageBlock from "@/components/content_blocks/InfoImageBlock";
import AnimatedHero from "@/components/home/AnimatedHero";
import Message from "@/components/home/Message";
import { useLayout } from "@/contexts/LayoutContext";

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
      <Message />
      <InfoImageBlock
        heading="TIMELESS VISUAL STORIES FOR LEGENDARY BRANDS"
        image_path="/assets/images/info-image-block.jpg"
        image_caption="TIMELESS VISUAL STORIES FOR LEGENDARY BRANDS"
        info_text="TIMELESS VISUAL STORIES FOR LEGENDARY BRANDS"
        quote="TIMELESS VISUAL STORIES FOR LEGENDARY BRANDS"
      />
    </>
  );
}
