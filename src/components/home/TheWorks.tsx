import { TYPOGRAPHY } from "@/lib/typography";
import MainHeading from "../headings/MainHeading";
import ProjectItem from "../list_items/ProjectItem";
import clsx from "clsx";
import BentoGrid from "../cards/BentoGrid";

export default function TheWorks() {
  const projects = [
    {
      label: "Web Development",
      title: "E-Commerce Platform Redesign",
      description:
        "Complete redesign and development of a modern e-commerce platform with seamless user experience and increased conversion rates.",
      image: "/assets/images/cards/card_1.jpg",
      link: "/works/ecommerce-platform",
    },
    {
      label: "Choreography",
      title: "Hey Siri, do you love me?",
      description:
        "Comprehensive brand identity design including logo, color palette, typography, and brand guidelines for a SaaS startup.",
      image: "/assets/images/cards/card_2.jpg",
      link: "/works/tech-startup-branding",
    },
    {
      label: "Mobile App",
      title: "Alicialonso Campus App",
      description:
        "Native mobile app design and development for iOS and Android, featuring workout tracking and personalized fitness plans.",
      image: "/assets/images/cards/card_3.jpg",
      link: "/works/fitness-app",
    },
    {
      label: "Show Control",
      title: "Qlab Automation Scripts",
      description:
        "Intuitive dashboard design for data visualization and analytics, helping businesses make data-driven decisions.",
      image: "/assets/images/cards/card_4.jpg",
      link: "/works/dashboard-analytics",
    },
  ];

  return (
    <section id="the-works" className="w-full py-12 m:py-16 l:py-20">
      <div className="w-full max-w-7xl mx-auto px-4 m:px-6">
        <MainHeading
          title="The Works"
          subtitle="Proof in Practice"
          className="text-center mb-12"
        />
        <div
          className={clsx(TYPOGRAPHY.text20, "text-center px-4 m:px-12 mb-12")}
        >
          A philosophy is only as strong as the work it produces.
          <br />
          Here is the synthesis of art and technology in action.
        </div>

        <div className="space-y-0">
          {projects.map((project, index) => (
            <ProjectItem
              key={index}
              label={project.label}
              title={project.title}
              description={project.description}
              image={project.image}
              link={project.link}
            />
          ))}
        </div>
        <MainHeading
          subtitle="Dig deeper into the works"
          className="text-center pt-12"
        />
        <BentoGrid
          bentoClass="bento-grid"
          className={clsx(
            "grid rounded-4xl border border-black-10 overflow-hidden w-full bg-black",
            "p-2 gap-2 grid-cols-3 grid-rows-[200px_200px_200px_200px_200px]",
            "m:p-4 m:gap-4 m:grid-cols-4 m:grid-rows-[200px_200px_200px]"
          )}
        >
          <BentoGrid.ContentRow
            heading="Choreography / Graphic / Lighting …"
            title="Artistic Works"
            description="Comprehensive brand identity design including logo, color palette, typography, and brand guidelines for a SaaS startup."
            link="/works"
            gridBox="box-1"
          />
          <BentoGrid.ImageRow
            imagePath={projects[0].image}
            imageAlt={projects[0].title}
            gridBox="box-2"
          />
          <BentoGrid.ImageRow
            imagePath={projects[1].image}
            imageAlt={projects[1].title}
            gridBox="box-3"
          />
          <BentoGrid.ContentRow
            heading="Development / Automation / Engineering …"
            title="Technology Works"
            description="Intuitive dashboard design for data visualization and analytics, helping businesses make data-driven decisions."
            link="/works"
            gridBox="box-4"
          />
          <BentoGrid.ImageRow
            imagePath={projects[2].image}
            imageAlt={projects[2].title}
            gridBox="box-5"
          />
          <BentoGrid.ImageRow
            imagePath={projects[3].image}
            imageAlt={projects[3].title}
            gridBox="box-6"
          />
          <BentoGrid.ContentRow
            heading="where stage meets silicon"
            title="Synthesised Works"
            description="Complete redesign and development of a modern e-commerce platform with seamless user experience and increased conversion rates."
            link="/works"
            gridBox="box-7"
          />
        </BentoGrid>
      </div>
    </section>
  );
}
