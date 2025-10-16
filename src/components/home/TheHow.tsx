import CardGrid from "../content_blocks/CardGrid";
import MainHeading from "../headings/MainHeading";
import clsx from "clsx";
import { TYPOGRAPHY } from "@/lib/typography";
import CenieFullLogo from "../graphics/CenieFullLogo";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

export default function TheHow() {
  return (
    <section id="the-how" className="w-full bg-white">
      <MainHeading
        title="The Architect's Ecosystem"
        className="text-center mb-0"
      />
      <div
        className={clsx(
          TYPOGRAPHY.h7,
          "text-center px-12 !mb-0 !pb-0 leading-tight"
        )}
      >
        This transformation requires a new kind of toolkit.
        <br />
        That's why I built CENIE: a center designed to provide the four pillars
        of your new foundation.
      </div>
      <div
        className="w-full aspect-[16/18] bg-cover bg-center !mt-0 !mb-0 !pt-0  bg-black"
        style={{
          backgroundImage:
            "url('/assets/images/backgrounds/fabric-folds-orange-1.jpg')",
        }}
      >
        <CardGrid
          className="mt-0 pt-12 m:pt-16 l:pt-20 px-5 m:px-10 l:px-20"
          cardClassName="!bg-white/50 backdrop-blur-lg"
          cards={[
            {
              icon: "Book",
              title: "Deepen Your Craft.",
              bodyText:
                "Access rigorous research and pioneering ideas through **CENIE Editorial**.",
              buttonLabel: "browse",
              buttonLink: "https://cenie.org",
            },
            {
              icon: "DraftingCompass",
              title: "Build Your Skills.",
              bodyText:
                "Master the tools of technology, finance, and strategy with the **CENIE Academy**.",
              buttonLabel: "explore",
              buttonLink: "https://cenie.org",
            },
            {
              icon: "Bot",
              title: "Automate Your Work.",
              bodyText:
                "Implement intelligent systems to scale your impact with the **CENIE Agency**.",
              buttonLabel: "discover",
              buttonLink: "https://cenie.org",
            },
            {
              icon: "Drama",
              title: "Incubate Your Vision.",
              bodyText:
                "Develop and showcase your next great work within the **CENIE Creations Hub**.",
              buttonLabel: "connect",
              buttonLink: "https://cenie.org",
            },
          ]}
        />
        <div className="flex flex-col items-center justify-center">
          <MainHeading title="introducing" className="text-center text-white" />
          <div className="w-2/3 mb-24">
            <CenieFullLogo color="rgba(255, 255, 255, 0.9)" />
          </div>
          <Button
            variant="outline"
            size="lg"
            className={clsx(
              "text-white hover:text-orange-100 bg-transparent",
              TYPOGRAPHY.mono18,
              "uppercase"
            )}
          >
            Explore the CENIE Ecosystem
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
