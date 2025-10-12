import { ArticlePageContent } from "./ArticlePageContent";

/**
 * Server component that loads article data and renders the page
 */
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { getArticleData, getContentSlugs, compileMDXContent } = await import(
    "@/lib/mdx"
  );
  const { getMDXComponents } = await import("@/components/mdx");

  const { locale, slug } = await params;

  // Load article data
  const articleData = await getArticleData(locale, slug);

  // Compile MDX content
  const { content } = await compileMDXContent(
    articleData.content,
    getMDXComponents()
  );

  const article = {
    ...articleData,
    content,
  };

  return <ArticlePageContent article={article} />;
}

/**
 * Generate static params for all articles
 */
export async function generateStaticParams() {
  const { getContentSlugs } = await import("@/lib/mdx");
  const { routing } = await import("@/i18n/routing");

  const params: { locale: string; slug: string }[] = [];

  for (const locale of routing.locales) {
    const slugs = await getContentSlugs("article", locale);
    params.push(...slugs.map(slug => ({ locale, slug })));
  }

  return params;
}

/**
 * Generate metadata for SEO
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { getArticleData } = await import("@/lib/mdx");
  const { locale, slug } = await params;

  try {
    const article = await getArticleData(locale, slug);

    return {
      title: article.frontmatter.title,
      description: article.frontmatter.description,
      keywords: article.frontmatter.seo?.keywords,
      openGraph: {
        title: article.frontmatter.title,
        description:
          article.frontmatter.seo?.ogDescription ||
          article.frontmatter.description,
        images: article.frontmatter.seo?.ogImage
          ? [article.frontmatter.seo.ogImage]
          : article.frontmatter.coverImage
            ? [article.frontmatter.coverImage]
            : [],
        type: "article",
        publishedTime: article.frontmatter.publishedAt,
        modifiedTime: article.frontmatter.updatedAt,
        authors: [article.frontmatter.author],
        tags: article.frontmatter.tags,
      },
      twitter: {
        card: "summary_large_image",
        title: article.frontmatter.title,
        description:
          article.frontmatter.seo?.ogDescription ||
          article.frontmatter.description,
        images: article.frontmatter.seo?.ogImage
          ? [article.frontmatter.seo.ogImage]
          : article.frontmatter.coverImage
            ? [article.frontmatter.coverImage]
            : [],
      },
    };
  } catch {
    return {
      title: "Article Not Found",
      description: "The requested article could not be found.",
    };
  }
}
