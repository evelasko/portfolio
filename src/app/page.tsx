"use client";

import { useRef, useEffect } from "react";
import InfoImageBlock from "@/components/content_blocks/InfoImageBlock";
import AnimatedHero from "@/components/home/AnimatedHero";
import Message from "@/components/home/Message";
import { useLayout } from "@/contexts/LayoutContext";
import MessageBackground from "@/components/home/MessageBackground";

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
          "I believe in a new language",
          "A language where a line of code can be as elegant as a line of choreography.",
          "Where a business model can be a work of art.",
          "And where an artist can be the architect of their own future.",
        ]}
      />
      <MessageBackground
        segments={[
          "Stop being a performer, waiting for permission, subject to a broken system.",
          "The new model empowers you to be a sovereign creator who designs their own systems, builds their own value, and owns their own career.",
          "This is not a change in tactics; it is a change in identity.",
        ]}
        finalText="Become an Architect"
        imagePath="/assets/images/backgrounds/curtain.jpg"
      />
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
