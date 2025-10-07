import AnimatedHero from "@/components/home/AnimatedHero";
import NavigationBarStatic from "@/components/navigation_bar/NavigationBarStatic";
import { navigation, socialLinks } from "@/lib/navigation";
import { type Metadata } from "next";

export default async function Page() {
  return (
    <>
      <NavigationBarStatic links={navigation} socialLinks={socialLinks} />
      <AnimatedHero
        topText="ENRIQUE"
        bottomText="VELASCO"
        sideTextHorizontal="2K25"
        sideTextVertical="./ PORTFOLIO"
        graphic="/assets/graphics/signature.svg"
        graphicHeight={100}
        graphicWidth={100}
        subtitle="TIMELESS VISUAL STORIES FOR LEGENDARY BRANDS"
        images={[]}
        link="#documentation"
        video="/assets/videos/throwback-slo-mo.mp4"
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
