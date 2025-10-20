"use client";

import { TYPOGRAPHY } from "@/lib/typography";
import {
  getWorkCategoryName,
  getWorkCategories,
  type Locale,
  type WorkCategoryKey,
} from "@/lib/categories";
import clsx from "clsx";
import type { ContentListItem, WorkFrontmatter } from "@/lib/mdx";
import ProjectItem from "@/components/list_items/ProjectItem";
import ProjectCard from "@/components/cards/ProjectCard";
import { useState, useMemo } from "react";
import { CldImage } from "next-cloudinary";
import { ArrowDownNarrowWide, ArrowUpNarrowWide } from "lucide-react";
import { useTranslations } from "next-intl";

interface WorksPageContentProps {
  works: ContentListItem<WorkFrontmatter>[];
  locale: string;
}

const WORK_PLACEHOLDER =
  "https://res.cloudinary.com/misfitcoders/image/upload/v1760912222/eVelasco/covers/work-placeholder.jpg";

/**
 * Client component for works listing page content with filtering and sorting
 */
export function WorksPageContent({ works, locale }: WorksPageContentProps) {
  const [selectedCategory, setSelectedCategory] = useState<
    WorkCategoryKey | "all"
  >("all");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");

  // Get all available categories from the works
  const availableCategories = useMemo(() => {
    const categories = getWorkCategories();
    const categoryKeys = new Set(works.map(work => work.frontmatter.category));
    return categories.filter(cat => categoryKeys.has(cat.key));
  }, [works]);

  // Filter and sort works
  const filteredAndSortedWorks = useMemo(() => {
    let filtered = works;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = works.filter(
        work => work.frontmatter.category === selectedCategory
      );
    }

    // Sort by date
    return [...filtered].sort((a, b) => {
      const dateA = new Date(a.frontmatter.publishedAt || 0).getTime();
      const dateB = new Date(b.frontmatter.publishedAt || 0).getTime();
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });
  }, [works, selectedCategory, sortOrder]);

  // Group works by category for display
  const worksByCategory = filteredAndSortedWorks.reduce(
    (acc, work) => {
      const categoryKey = work.frontmatter.category;
      if (!acc[categoryKey]) {
        acc[categoryKey] = [];
      }
      acc[categoryKey].push(work);
      return acc;
    },
    {} as Record<string, ContentListItem<WorkFrontmatter>[]>
  );

  const categoryKeys = Object.keys(worksByCategory).sort() as WorkCategoryKey[];

  const t = useTranslations();

  return (
    <div className="relative">
      {/* Background Image */}
      {/* <div className="absolute top-0 left-0 w-full overflow-hidden pointer-events-none z-0">
        <CldImage
          src="eVelasco/backgrounds/fabric-folds-orange-4"
          alt=""
          width={1920}
          height={600}
          className="w-full h-auto object-cover object-top"
          priority
        />
      </div> */}

      {/* Hero Section */}
      <section className="relative z-10 min-h-[25vh] md:min-h-[50vh] flex items-start md:items-center justify-center px-6 py-24">
        <div className="max-w-4xl w-full text-center">
          <h1
            className={clsx(
              TYPOGRAPHY.h1,
              "mt-3 md:mt-0 mb-6 text-black-100 tracking-tight"
            )}
          >
            {t("works.heading")}
          </h1>
          <p className={clsx(TYPOGRAPHY.h9, "mt-12 text-black-100")}>
            {t("works.subtitle")}
          </p>
        </div>
      </section>

      {/* Filter and Sort Controls */}
      <section className="relative z-10 px-6 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col m:flex-row gap-6 items-start m:items-center justify-between">
            {/* Category Filters - Dropdown on small screens */}
            <div className="w-full m:w-auto">
              {/* Mobile Dropdown */}
              <select
                value={selectedCategory}
                onChange={e =>
                  setSelectedCategory(e.target.value as WorkCategoryKey | "all")
                }
                className={clsx(
                  TYPOGRAPHY.text14,
                  "m:hidden w-full px-4 py-2 rounded-full transition-colors backdrop-blur-md bg-gray-300/40 border border-white/15 text-black-100 appearance-none cursor-pointer"
                )}
              >
                <option value="all">{t("common.all")}</option>
                {availableCategories.map(category => (
                  <option key={category.key} value={category.key}>
                    {category.getName(locale as Locale)}
                  </option>
                ))}
              </select>

              {/* Desktop Chips */}
              <div className="hidden m:flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={clsx(
                    TYPOGRAPHY.text14,
                    "px-4 py-2 rounded-full transition-colors backdrop-blur-md",
                    selectedCategory === "all"
                      ? "bg-orange-100 text-white-100 hover:bg-orange-700 transition-colors"
                      : "bg-black-10 text-black-100 hover:bg-black-20"
                  )}
                >
                  {t("common.all")}
                </button>
                {availableCategories.map(category => (
                  <button
                    key={category.key}
                    onClick={() => setSelectedCategory(category.key)}
                    className={clsx(
                      TYPOGRAPHY.text14,
                      "px-4 py-2 rounded-full transition-colors backdrop-blur-md",
                      selectedCategory === category.key
                        ? "bg-orange-100 text-white-100"
                        : "bg-gray-300/40 border border-white/15 text-black-100 hover:bg-black-20"
                    )}
                  >
                    {category.getName(locale as Locale)}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Toggle */}
            <button
              onClick={() =>
                setSortOrder(sortOrder === "desc" ? "asc" : "desc")
              }
              className={clsx(
                TYPOGRAPHY.text16,
                "px-4 py-2 rounded-md bg-orange-100 border border-white/15 text-white-100 hover:bg-orange-700 transition-colors whitespace-nowrap backdrop-blur-md flex items-center gap-2 self-end"
              )}
            >
              {sortOrder === "desc" ? (
                <ArrowDownNarrowWide className="w-4 h-4" />
              ) : (
                <ArrowUpNarrowWide className="w-4 h-4" />
              )}
              <span>
                {sortOrder === "desc"
                  ? t("common.sort.newest")
                  : t("common.sort.oldest")}
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Works Content */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          {filteredAndSortedWorks.length === 0 ? (
            <div className="text-center py-12">
              <p className={clsx(TYPOGRAPHY.text18, "text-black-90")}>
                No projects found. Try adjusting your filters.
              </p>
            </div>
          ) : selectedCategory === "all" ? (
            <div className="space-y-16">
              {categoryKeys.map(categoryKey => {
                const categoryName = getWorkCategoryName(
                  categoryKey,
                  locale as Locale
                );
                return (
                  <div key={categoryKey}>
                    {/* Category Header */}
                    <h2
                      className={clsx(
                        TYPOGRAPHY.h3,
                        "mb-8 pb-4 border-b border-black-30"
                      )}
                    >
                      {categoryName}
                    </h2>

                    {/* Works Grid */}
                    <div className="grid grid-cols-1 m:grid-cols-2 gap-8">
                      {worksByCategory[categoryKey].map(work => (
                        <div key={work.slug}>
                          <div className="hidden l:block">
                            <ProjectCard
                              overtitle={categoryName}
                              title={work.frontmatter.title}
                              subtitle={
                                work.excerpt || work.frontmatter.description
                              }
                              image={
                                work.frontmatter.coverImage || WORK_PLACEHOLDER
                              }
                              link={`/works/${work.slug}`}
                            />
                          </div>
                          <div className="l:hidden">
                            <ProjectItem
                              label={categoryName}
                              title={work.frontmatter.title}
                              description={
                                work.excerpt || work.frontmatter.description
                              }
                              image={
                                work.frontmatter.coverImage || WORK_PLACEHOLDER
                              }
                              link={`/works/${work.slug}`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-1 m:grid-cols-2 gap-8">
              {filteredAndSortedWorks.map(work => {
                const categoryName = getWorkCategoryName(
                  work.frontmatter.category,
                  locale as Locale
                );
                return (
                  <div key={work.slug}>
                    <div className="hidden l:block">
                      <ProjectCard
                        overtitle={categoryName}
                        title={work.frontmatter.title}
                        subtitle={work.excerpt || work.frontmatter.description}
                        image={work.frontmatter.coverImage || WORK_PLACEHOLDER}
                        link={`/works/${work.slug}`}
                      />
                    </div>
                    <div className="l:hidden">
                      <ProjectItem
                        label={categoryName}
                        title={work.frontmatter.title}
                        description={
                          work.excerpt || work.frontmatter.description
                        }
                        image={work.frontmatter.coverImage || WORK_PLACEHOLDER}
                        link={`/works/${work.slug}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
