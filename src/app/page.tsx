import InfoImageBlock from "@/components/content_blocks/InfoImageBlock";
import AnimatedHero from "@/components/home/AnimatedHero";
import Message from "@/components/home/Message";
import NavBar from "@/components/layout/NavBar";
import { navigation, socialLinks } from "@/lib/navigation";
import { type Metadata } from "next";

export default async function Page() {
  return (
    <>
      <NavBar links={navigation} socialLinks={socialLinks} />
      <AnimatedHero
        sideTextHorizontal="2K25"
        sideTextVertical="./ PORTFOLIO"
        subtitle="TIMELESS VISUAL STORIES FOR LEGENDARY BRANDS"
        images={[]}
        link="#documentation"
        video="/assets/videos/throwback-slo-mo.mp4"
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

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Home",
    description: "Home",
    openGraph: {
      images: [],
    },
  };
}
