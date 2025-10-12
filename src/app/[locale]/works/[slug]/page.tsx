import { WorkPageContent } from "./WorkPageContent";

/**
 * Server component that loads work data and renders the page
 */
export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { getWorkData, getContentSlugs, compileMDXContent } = await import(
    "@/lib/mdx"
  );
  const { getMDXComponents } = await import("@/components/mdx");

  const { locale, slug } = await params;

  // Load work data
  const workData = await getWorkData(locale, slug);

  // Compile MDX content
  const { content } = await compileMDXContent(
    workData.content,
    getMDXComponents()
  );

  const work = {
    ...workData,
    content,
  };

  return <WorkPageContent work={work} />;
}

/**
 * Generate static params for all works
 */
export async function generateStaticParams() {
  const { getContentSlugs } = await import("@/lib/mdx");
  const { routing } = await import("@/i18n/routing");

  const params: { locale: string; slug: string }[] = [];

  for (const locale of routing.locales) {
    const slugs = await getContentSlugs("work", locale);
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
  const { getWorkData } = await import("@/lib/mdx");
  const { locale, slug } = await params;

  try {
    const work = await getWorkData(locale, slug);

    return {
      title: work.frontmatter.title,
      description: work.frontmatter.description,
      keywords: work.frontmatter.seo?.keywords,
      openGraph: {
        title: work.frontmatter.title,
        description:
          work.frontmatter.seo?.ogDescription || work.frontmatter.description,
        images: work.frontmatter.seo?.ogImage
          ? [work.frontmatter.seo.ogImage]
          : work.frontmatter.coverImage
            ? [work.frontmatter.coverImage]
            : [],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: work.frontmatter.title,
        description:
          work.frontmatter.seo?.ogDescription || work.frontmatter.description,
        images: work.frontmatter.seo?.ogImage
          ? [work.frontmatter.seo.ogImage]
          : work.frontmatter.coverImage
            ? [work.frontmatter.coverImage]
            : [],
      },
    };
  } catch {
    return {
      title: "Work Not Found",
      description: "The requested work could not be found.",
    };
  }
}
