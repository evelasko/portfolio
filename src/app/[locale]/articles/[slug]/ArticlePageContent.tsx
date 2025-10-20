import { TYPOGRAPHY } from "@/lib/typography";
import { getArticleCategoryName, type Locale } from "@/lib/categories";
import clsx from "clsx";
import "dayjs/locale/es";
import "dayjs/locale/en";
import dayjs from "dayjs";
import type { ArticleFrontmatter } from "@/lib/mdx";

interface ArticlePageContentProps {
  article: {
    slug: string;
    locale: string;
    frontmatter: ArticleFrontmatter;
    content: React.ReactElement;
    readingTime: {
      text: string;
      minutes: number;
      words: number;
    };
  };
}

/**
 * Server component for article page content
 */
export function ArticlePageContent({ article }: ArticlePageContentProps) {
  const categoryName = getArticleCategoryName(
    article.frontmatter.category,
    article.locale as Locale
  );

  return (
    <>
      {/* Hero Section */}
      <section className="min-h-[60vh] flex items-center justify-center px-6 py-24">
        <div className="max-w-4xl w-full">
          {/* Category */}
          <div className="mb-6">
            <span
              className={clsx(
                TYPOGRAPHY.text14,
                "text-orange-100 uppercase tracking-wide"
              )}
            >
              {categoryName}
            </span>
          </div>

          {/* Title */}
          <h1 className={clsx(TYPOGRAPHY.h2, "font-extrabold mb-6")}>
            {article.frontmatter.title}
          </h1>

          {/* Description */}
          <p className={clsx(TYPOGRAPHY.text20, "text-black-96 mb-8")}>
            {article.frontmatter.description}
          </p>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-black-96">
            <span className={TYPOGRAPHY.text16}>
              {article.frontmatter.author}
            </span>
            <span className={TYPOGRAPHY.text16}>•</span>
            <time className={TYPOGRAPHY.text16}>
              {dayjs(article.frontmatter.publishedAt)
                .locale(article.locale as Locale)
                .format("MMMM D, YYYY")}
            </time>
            <span className={TYPOGRAPHY.text16}>•</span>
            <span className={TYPOGRAPHY.text16}>
              {article.readingTime.text}
            </span>
          </div>

          {/* Tags */}
          {article.frontmatter.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {article.frontmatter.tags.map(tag => (
                <span
                  key={tag}
                  className={clsx(
                    TYPOGRAPHY.text14,
                    "px-3 py-1 bg-black-10 rounded-full text-black-96"
                  )}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Cover Image */}
      {article.frontmatter.coverImage && (
        <section className="px-6 mb-12">
          <div className="max-w-5xl mx-auto">
            <img
              src={article.frontmatter.coverImage}
              alt={article.frontmatter.title}
              className="w-full rounded-lg"
            />
          </div>
        </section>
      )}

      {/* Article Content */}
      <article className="px-6 pb-24">
        <div className="max-w-3xl mx-auto prose prose-invert">
          {article.content}
        </div>
      </article>

      {/* Updated Date */}
      {article.frontmatter.updatedAt && (
        <section className="px-6 pb-12">
          <div className="max-w-3xl mx-auto">
            <p className={clsx(TYPOGRAPHY.text14, "text-black-96/60")}>
              Last updated:{" "}
              {dayjs(article.frontmatter.updatedAt).format("MMMM D, YYYY")}
            </p>
          </div>
        </section>
      )}
    </>
  );
}
