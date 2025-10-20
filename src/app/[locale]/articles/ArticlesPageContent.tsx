"use client";

import { TYPOGRAPHY } from "@/lib/typography";
import {
  getArticleCategoryName,
  getArticleCategories,
  type Locale,
  type ArticleCategoryKey,
} from "@/lib/categories";
import clsx from "clsx";
import type { ContentListItem, ArticleFrontmatter } from "@/lib/mdx";
import ImageCard from "@/components/cards/ImageCard";
import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import ThoughtCardMinimal from "@/components/cards/ThoughtCardMinimal";
import { CldImage } from "next-cloudinary";
import "dayjs/locale/es";
import "dayjs/locale/en";
import dayjs from "dayjs";
import { ArrowDownNarrowWide, ArrowUpNarrowWide } from "lucide-react";

interface ArticlesPageContentProps {
  articles: ContentListItem<ArticleFrontmatter>[];
  locale: string;
}

const ARTICLE_PLACEHOLDER =
  "https://res.cloudinary.com/misfitcoders/image/upload/v1760912221/eVelasco/covers/article-placeholder.jpg";

/**
 * Client component for articles listing page content with filtering and sorting
 */
export function ArticlesPageContent({
  articles,
  locale,
}: ArticlesPageContentProps) {
  const [selectedCategory, setSelectedCategory] = useState<
    ArticleCategoryKey | "all"
  >("all");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");

  // Get all available categories from the articles
  const availableCategories = useMemo(() => {
    const categories = getArticleCategories();
    const categoryKeys = new Set(
      articles.map(article => article.frontmatter.category)
    );
    return categories.filter(cat => categoryKeys.has(cat.key));
  }, [articles]);

  // Filter and sort articles
  const filteredAndSortedArticles = useMemo(() => {
    let filtered = articles;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = articles.filter(
        article => article.frontmatter.category === selectedCategory
      );
    }

    // Sort by date
    return [...filtered].sort((a, b) => {
      const dateA = new Date(a.frontmatter.publishedAt || 0).getTime();
      const dateB = new Date(b.frontmatter.publishedAt || 0).getTime();
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });
  }, [articles, selectedCategory, sortOrder]);

  // Group articles by category for display
  const articlesByCategory = filteredAndSortedArticles.reduce(
    (acc, article) => {
      const categoryKey = article.frontmatter.category;
      if (!acc[categoryKey]) {
        acc[categoryKey] = [];
      }
      acc[categoryKey].push(article);
      return acc;
    },
    {} as Record<string, ContentListItem<ArticleFrontmatter>[]>
  );

  const categoryKeys = Object.keys(
    articlesByCategory
  ).sort() as ArticleCategoryKey[];

  const t = useTranslations();

  return (
    <div className="relative">
      {/* Background Image */}
      {/* <div className="absolute top-0 left-0 w-full overflow-hidden pointer-events-none z-0">
        <CldImage
          src="eVelasco/backgrounds/fabric-folds-orange-5"
          alt=""
          width={1920}
          height={600}
          className="w-full h-auto object-cover object-top"
          priority
        />
      </div> */}

      {/* Hero Section */}
      <section className="relative z-10 min-h-[25vh] md:min-h-[50vh] flex items-center justify-center px-6 py-24">
        <div className="max-w-4xl w-full text-center">
          <h1
            className={clsx(
              TYPOGRAPHY.h1,
              "mt-6 md:mt-0 mb-6 text-black-100 tracking-tight"
            )}
          >
            {t("articles.heading")}
          </h1>
          <p className={clsx(TYPOGRAPHY.h9, "mt-12 text-black-100")}>
            {t("articles.subtitle")}
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
                  setSelectedCategory(
                    e.target.value as ArticleCategoryKey | "all"
                  )
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

      {/* Articles Content */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          {filteredAndSortedArticles.length === 0 ? (
            <div className="text-center py-12">
              <p className={clsx(TYPOGRAPHY.text18, "text-black-96")}>
                {t("articles.none-found")}
              </p>
            </div>
          ) : selectedCategory === "all" ? (
            <div className="space-y-16">
              {categoryKeys.map(categoryKey => {
                const categoryName = getArticleCategoryName(
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

                    {/* Articles Grid */}
                    <div className="grid grid-cols-1 m:grid-cols-2 l:grid-cols-3 gap-8">
                      {articlesByCategory[categoryKey].map(article => (
                        <ThoughtCardMinimal
                          key={article.slug}
                          title={article.frontmatter.title}
                          publishedAt={dayjs(article.frontmatter.publishedAt)
                            .locale(locale)
                            .format("MMMM YYYY")}
                          readingTime={`${article.readingTime?.minutes || 5} min ${t("common.reading-time")}`}
                          image={
                            article.frontmatter.coverImage ||
                            ARTICLE_PLACEHOLDER
                          }
                          link={`/articles/${article.slug}`}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div
              className={clsx(
                "border-t border-black-10 pb-8 mt-8 pt-16",
                "grid grid-cols-1 m:grid-cols-2 l:grid-cols-3 gap-8"
              )}
            >
              {filteredAndSortedArticles.map(article => (
                <ThoughtCardMinimal
                  key={article.slug}
                  title={article.frontmatter.title}
                  publishedAt={dayjs(article.frontmatter.publishedAt)
                    .locale(locale)
                    .format("MMMM YYYY")}
                  readingTime={`${article.readingTime?.minutes || 5} min ${t("common.reading-time")}`}
                  image={article.frontmatter.coverImage || ARTICLE_PLACEHOLDER}
                  link={`/articles/${article.slug}`}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
