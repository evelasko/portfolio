import CardGrid from "../content_blocks/CardGrid";
import MainHeading from "../headings/MainHeading";
import clsx from "clsx";
import { TYPOGRAPHY } from "@/lib/typography";

export default function TheHow() {
  return (
    <section id="the-how" className="w-full px-12">
      <MainHeading title="The Architect's Ecosystem" className="text-center" />
      <div className={clsx(TYPOGRAPHY.h7, "text-center px-12")}>
        This transformation requires a new kind of toolkit.
        <br />
        That's why I built CENIE: a center designed to provide the four pillars
        of your new foundation.
      </div>
      <CardGrid
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
    </section>
  );
}
