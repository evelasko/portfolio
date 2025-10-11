import { TYPOGRAPHY } from "@/lib/typography";
import { Link } from "@/i18n/navigation";
import clsx from "clsx";
import dayjs from "dayjs";
import type { ContentListItem, ArticleFrontmatter } from "@/lib/mdx";
import { ArticlesPageLayout } from "./ArticlesPageLayout";

interface ArticlesPageContentProps {
  articles: ContentListItem<ArticleFrontmatter>[];
  locale: string;
}

/**
 * Server component for articles listing page content
 */
export function ArticlesPageContent({
  articles,
  locale,
}: ArticlesPageContentProps) {
  // Group articles by category
  const articlesByCategory = articles.reduce(
    (acc, article) => {
      const category = article.frontmatter.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(article);
      return acc;
    },
    {} as Record<string, ContentListItem<ArticleFrontmatter>[]>
  );

  const categories = Object.keys(articlesByCategory).sort();

  return (
    <ArticlesPageLayout>
      {/* Hero Section */}
      <section className="min-h-[50vh] flex items-center justify-center px-6 py-24">
        <div className="max-w-4xl w-full text-center">
          <h1 className={clsx(TYPOGRAPHY.h1, "mb-6")}>Articles</h1>
          <p className={clsx(TYPOGRAPHY.text20, "text-black-96")}>
            Thoughts, ideas, and insights on design, development, and creativity
          </p>
        </div>
      </section>

      {/* Articles Content */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          {articles.length === 0 ? (
            <div className="text-center py-12">
              <p className={clsx(TYPOGRAPHY.text18, "text-black-96")}>
                No articles available yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="space-y-16">
              {categories.map(category => (
                <div key={category}>
                  {/* Category Header */}
                  <h2
                    className={clsx(
                      TYPOGRAPHY.h3,
                      "mb-8 pb-4 border-b border-black-30"
                    )}
                  >
                    {category}
                  </h2>

                  {/* Articles Grid */}
                  <div className="grid grid-cols-1 m:grid-cols-2 l:grid-cols-3 gap-8">
                    {articlesByCategory[category].map(article => (
                      <Link
                        key={article.slug}
                        href={`/articles/${article.slug}`}
                        className="group block"
                      >
                        {/* Card */}
                        <article className="h-full flex flex-col">
                          {/* Cover Image */}
                          {article.frontmatter.coverImage && (
                            <div className="mb-4 overflow-hidden rounded-lg bg-black-10 aspect-video">
                              <img
                                src={article.frontmatter.coverImage}
                                alt={article.frontmatter.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          )}

                          {/* Content */}
                          <div className="flex-1 flex flex-col">
                            {/* Featured Badge */}
                            {article.frontmatter.featured && (
                              <div className="mb-2">
                                <span
                                  className={clsx(
                                    TYPOGRAPHY.text14,
                                    "text-orange-100 uppercase tracking-wide"
                                  )}
                                >
                                  Featured
                                </span>
                              </div>
                            )}

                            {/* Title */}
                            <h3
                              className={clsx(
                                TYPOGRAPHY.h5,
                                "mb-3 group-hover:text-orange-100 transition-colors"
                              )}
                            >
                              {article.frontmatter.title}
                            </h3>

                            {/* Excerpt */}
                            {article.excerpt && (
                              <p
                                className={clsx(
                                  TYPOGRAPHY.text16,
                                  "text-black-96 mb-4 flex-1"
                                )}
                              >
                                {article.excerpt}
                              </p>
                            )}

                            {/* Metadata */}
                            <div className="flex items-center gap-3 text-black-96/60">
                              <time className={TYPOGRAPHY.text14}>
                                {dayjs(article.frontmatter.publishedAt).format(
                                  "MMM D, YYYY"
                                )}
                              </time>
                              {article.readingTime && (
                                <>
                                  <span>•</span>
                                  <span className={TYPOGRAPHY.text14}>
                                    {article.readingTime.text}
                                  </span>
                                </>
                              )}
                            </div>

                            {/* Tags */}
                            {article.frontmatter.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-4">
                                {article.frontmatter.tags
                                  .slice(0, 3)
                                  .map(tag => (
                                    <span
                                      key={tag}
                                      className={clsx(
                                        TYPOGRAPHY.text14,
                                        "px-2 py-0.5 bg-black-10 rounded text-black-96/80"
                                      )}
                                    >
                                      {tag}
                                    </span>
                                  ))}
                              </div>
                            )}
                          </div>
                        </article>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </ArticlesPageLayout>
  );
}
