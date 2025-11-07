import { ArticlePageContent } from "./ArticlePageContent";
import JsonLd from "@/components/seo/JsonLd";
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
} from "@/lib/seo/schemas";
import { BASE_URL } from "@/lib/seo/metadata";
import { getAbsoluteUrl } from "@/lib/seo/utils";
import { redirect } from "next/navigation";
import { routing } from "@/i18n/routing";
import structure from "@/lib/structure";

// Ensure dynamic rendering for locale detection
export const dynamic = "force-dynamic";

/**
 * Server component that loads article data and renders the page
 */
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { getArticleData, contentExists, compileMDXContent } = await import(
    "@/lib/mdx"
  );
  const { getMDXComponents } = await import("@/components/mdx");

  const { locale, slug } = await params;

  // Check if article exists in current locale, if not try other locale
  const existsInCurrentLocale = await contentExists("article", locale, slug);
  
  if (!existsInCurrentLocale) {
    // Try the other locale
    const otherLocale = routing.locales.find(l => l !== locale);
    if (otherLocale) {
      const existsInOtherLocale = await contentExists("article", otherLocale, slug);
      if (existsInOtherLocale) {
        // Redirect to the correct locale
        const articlesRoute = structure.routes.find(route => route.key === "/articles");
        const articlesPath = articlesRoute?.href[otherLocale] || "/articles";
        const redirectPath = otherLocale === routing.defaultLocale 
          ? `${articlesPath}/${slug}`
          : `/${otherLocale}${articlesPath}/${slug}`;
        redirect(redirectPath);
      }
    }
  }

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

  // Generate Article JSON-LD schema
  const articleUrl = getAbsoluteUrl(`/${locale}/articles/${slug}`, BASE_URL);
  const articleSchema = generateArticleSchema({
    headline: article.frontmatter.title,
    description: article.frontmatter.description,
    url: articleUrl,
    image: article.frontmatter.coverImage,
    datePublished: article.frontmatter.publishedAt,
    dateModified: article.frontmatter.updatedAt,
    author: article.frontmatter.author,
    keywords: article.frontmatter.seo?.keywords,
    wordCount: article.readingTime?.words,
    locale,
    category: article.frontmatter.category,
  });

  // Generate Breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    {
      name: locale === "en" ? "Home" : "Inicio",
      url: BASE_URL,
    },
    {
      name: locale === "en" ? "Articles" : "Artículos",
      url: getAbsoluteUrl(`/${locale}/articles`, BASE_URL),
    },
    {
      name: article.frontmatter.title,
      url: articleUrl,
    },
  ]);

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <ArticlePageContent article={article} />
    </>
  );
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
  const { generateBaseMetadata } = await import("@/lib/seo/metadata");
  const { locale, slug } = await params;

  try {
    const article = await getArticleData(locale, slug);

    // Use enhanced metadata generator with canonical + hreflang
    return generateBaseMetadata({
      title: article.frontmatter.title,
      description: article.frontmatter.description,
      path: `/articles/${slug}`,
      locale: locale as "en" | "es",
      keywords: article.frontmatter.seo?.keywords,
      image: article.frontmatter.seo?.ogImage || article.frontmatter.coverImage,
      imageAlt: article.frontmatter.title,
      type: "article",
      publishedTime: article.frontmatter.publishedAt,
      modifiedTime: article.frontmatter.updatedAt,
      authors: [article.frontmatter.author],
      section: article.frontmatter.category,
      tags: article.frontmatter.tags,
    });
  } catch {
    return {
      title: "Article Not Found",
      description: "The requested article could not be found.",
    };
  }
}
