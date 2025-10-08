"use client";

import { useRef } from "react";
import InfoImageBlock from "@/components/content_blocks/InfoImageBlock";
import AnimatedHero from "@/components/home/AnimatedHero";
import Message from "@/components/home/Message";
import NavBar from "@/components/layout/NavBar";
import { navigation, socialLinks } from "@/lib/navigation";

export default function Page() {
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <NavBar links={navigation} socialLinks={socialLinks} heroRef={heroRef} />
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
