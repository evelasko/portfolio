"use client";

import { TYPOGRAPHY } from "@/lib/typography";
import { getWorkCategoryName, type Locale } from "@/lib/categories";
import MainHeading from "../headings/MainHeading";
import ProjectItem from "../list_items/ProjectItem";
import clsx from "clsx";
import BentoGrid from "../cards/BentoGrid";
import type { ContentListItem, WorkFrontmatter } from "@/lib/mdx/types";
import { useTranslations } from "next-intl";
import React from "react";

export default function TheWorks({
  locale,
  works,
}: {
  locale: string;
  works: ContentListItem<WorkFrontmatter>[];
}) {
  const t = useTranslations("home.sections.theWorks");
  // Take first 4 works for display
  const featuredWorks = works.slice(0, 4);

  // If no works, don't render the section
  if (featuredWorks.length === 0) {
    return null;
  }

  const projects = featuredWorks.map(work => ({
    label: getWorkCategoryName(work.frontmatter.category, locale as Locale),
    title: work.frontmatter.title,
    description: work.frontmatter.description,
    image:
      work.frontmatter.coverImage ||
      "https://res.cloudinary.com/evelasco/image/upload/v1760912222/eVelasco/covers/work-placeholder.jpg",
    link: `/${locale}/works/${work.slug}`,
  }));

  return (
    <section id="the-works" className="w-full py-12 m:py-16 l:py-20">
      <div className="w-full max-w-7xl mx-auto px-4 m:px-6">
        <MainHeading
          title={t("title")}
          subtitle={t("subtitle")}
          className="text-center mb-12"
        />
        <div
          className={clsx(TYPOGRAPHY.text20, "text-center px-4 m:px-12 mb-12")}
        >
          {t("description")
            .split(`|`)
            .map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i < t("description").split(`|`).length - 1 && <br />}
              </React.Fragment>
            ))}
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
          subtitle={t("moreButtonLabel")}
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
            heading={t("bento.art.heading")}
            title={t("bento.art.title")}
            description={t("bento.art.description")}
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
            heading={t("bento.tech.heading")}
            title={t("bento.tech.title")}
            description={t("bento.tech.description")}
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
            heading={t("bento.synth.heading")}
            title={t("bento.synth.title")}
            description={t("bento.synth.description")}
            link="/works"
            gridBox="box-7"
          />
        </BentoGrid>
      </div>
    </section>
  );
}
