import { TYPOGRAPHY } from "@/lib/typography";
import clsx from "clsx";
import type { ContentListItem, ArticleFrontmatter } from "@/lib/mdx";
import ImageCard from "@/components/cards/ImageCard";

interface ArticlesPageContentProps {
  articles: ContentListItem<ArticleFrontmatter>[];
  locale: string;
}

const ARTICLE_PLACEHOLDER = "/assets/placeholders/article-placeholder.jpg";

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
    <>
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
                      <ImageCard
                        key={article.slug}
                        image={
                          article.frontmatter.coverImage || ARTICLE_PLACEHOLDER
                        }
                        imageAlt={article.frontmatter.title}
                        label={
                          article.frontmatter.featured ? "Featured" : undefined
                        }
                        title={article.frontmatter.title}
                        description={article.excerpt}
                        link={`/articles/${article.slug}`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
