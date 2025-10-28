import { ArticlesPageContent } from "./ArticlesPageContent";

/**
 * Server component that loads articles and renders the listing page
 */
export default async function ArticlesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { getAllArticles } = await import("@/lib/mdx");
  const { locale } = await params;

  // Load all articles for the current locale
  const articles = await getAllArticles(locale, {
    includeDrafts: false,
    sortBy: "publishedAt",
    sortOrder: "desc",
  });

  return <ArticlesPageContent articles={articles} locale={locale} />;
}

/**
 * Generate metadata for SEO
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { generateArticleListMetadata } = await import("@/lib/seo/metadata");

  return generateArticleListMetadata(locale as "en" | "es");
}
