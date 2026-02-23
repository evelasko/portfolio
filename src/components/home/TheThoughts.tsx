"use client";

import MainHeading from "../headings/MainHeading";
import ThoughtCard from "../cards/ThoughtCard";
import clsx from "clsx";
import { TYPOGRAPHY } from "@/lib/typography";
import { formatArticleDate } from "@/lib/utils";
import type { ContentListItem, ArticleFrontmatter } from "@/lib/mdx/types";
import { useTranslations } from "next-intl";
import React from "react";
import { Button } from "../ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function TheThoughts({
  locale,
  articles,
}: {
  locale: string;
  articles: ContentListItem<ArticleFrontmatter>[];
}) {
  const t = useTranslations("home.sections.theThoughts");
  // Take first 4 featured articles
  const featuredArticles = articles.slice(0, 4);

  // If no featured articles, don't render the section
  if (featuredArticles.length === 0) {
    return null;
  }

  return (
    <section id="the-thoughts" className="py-12 m:py-16 l:py-20 bg-white-90">
      <div className="w-full max-w-7xl mx-auto px-4 m:px-8 l:px-12">
        <MainHeading
          title={t("title")}
          subtitle={t("subtitle")}
          className="text-center mb-12 m:mb-16 l:mb-20"
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

        <div className="grid grid-cols-1 m:grid-cols-2 l:grid-cols-2 gap-6 m:gap-8 l:gap-10">
          {featuredArticles.map(article => (
            <ThoughtCard
              key={article.slug}
              title={article.frontmatter.title}
              publishedAt={formatArticleDate(
                article.frontmatter.publishedAt,
                locale
              )}
              readingTime={article.readingTime?.minutes || 5}
              image={
                article.frontmatter.coverImage ||
                "https://res.cloudinary.com/evelasco/image/upload/v1760912221/eVelasco/covers/article-placeholder.jpg"
              }
              link={`/${locale}/articles/${article.slug}`}
            />
          ))}
        </div>
        <div className="flex justify-center pt-32 m:pt-48">
          <Link href="/articles">
            <Button
              variant="outline"
              brightness="light"
              size="lg"
              className={clsx(TYPOGRAPHY.mono18, "uppercase")}
            >
              Explore all articles
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
