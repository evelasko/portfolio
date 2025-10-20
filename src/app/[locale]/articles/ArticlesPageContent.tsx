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
    <>
      {/* Hero Section */}
      <section className="min-h-[50vh] flex items-center justify-center px-6 py-24">
        <div className="max-w-4xl w-full text-center">
          <h1 className={clsx(TYPOGRAPHY.h1, "mb-6")}>
            {t("articles.heading")}
          </h1>
          <p className={clsx(TYPOGRAPHY.text20, "text-black-96")}>
            {t("articles.subtitle")}
          </p>
        </div>
      </section>

      {/* Filter and Sort Controls */}
      <section className="px-6 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col m:flex-row gap-6 items-start m:items-center justify-between">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory("all")}
                className={clsx(
                  TYPOGRAPHY.text16,
                  "px-4 py-2 rounded-full transition-colors",
                  selectedCategory === "all"
                    ? "bg-orange-100 text-white-100"
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
                    TYPOGRAPHY.text16,
                    "px-4 py-2 rounded-full transition-colors",
                    selectedCategory === category.key
                      ? "bg-orange-100 text-white-100"
                      : "bg-black-10 text-black-100 hover:bg-black-20"
                  )}
                >
                  {category.getName(locale as Locale)}
                </button>
              ))}
            </div>

            {/* Sort Toggle */}
            <button
              onClick={() =>
                setSortOrder(sortOrder === "desc" ? "asc" : "desc")
              }
              className={clsx(
                TYPOGRAPHY.text16,
                "px-4 py-2 rounded-full bg-black-10 text-black-100 hover:bg-black-20 transition-colors whitespace-nowrap"
              )}
            >
              {sortOrder === "desc"
                ? t("common.sort.newest")
                : t("common.sort.oldest")}
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
                        <ImageCard
                          key={article.slug}
                          image={
                            article.frontmatter.coverImage ||
                            ARTICLE_PLACEHOLDER
                          }
                          imageAlt={article.frontmatter.title}
                          label={
                            article.frontmatter.featured
                              ? t("common.featured")
                              : undefined
                          }
                          title={article.frontmatter.title}
                          description={article.excerpt}
                          link={`/articles/${article.slug}`}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-1 m:grid-cols-2 l:grid-cols-3 gap-8">
              {filteredAndSortedArticles.map(article => (
                <ImageCard
                  key={article.slug}
                  image={article.frontmatter.coverImage || ARTICLE_PLACEHOLDER}
                  imageAlt={article.frontmatter.title}
                  label={
                    article.frontmatter.featured
                      ? t("common.featured")
                      : undefined
                  }
                  title={article.frontmatter.title}
                  description={article.excerpt}
                  link={`/articles/${article.slug}`}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
