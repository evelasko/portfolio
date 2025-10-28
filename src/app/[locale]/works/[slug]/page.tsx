import { WorkPageContent } from "./WorkPageContent";
import JsonLd from "@/components/seo/JsonLd";
import { generateBreadcrumbSchema } from "@/lib/seo/schemas";
import { BASE_URL } from "@/lib/seo/metadata";
import { getAbsoluteUrl } from "@/lib/seo/utils";

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

  // Generate Breadcrumb schema
  const workUrl = getAbsoluteUrl(`/${locale}/works/${slug}`, BASE_URL);
  const breadcrumbSchema = generateBreadcrumbSchema([
    {
      name: locale === "en" ? "Home" : "Inicio",
      url: BASE_URL,
    },
    {
      name: locale === "en" ? "Works" : "Trabajos",
      url: getAbsoluteUrl(`/${locale}/works`, BASE_URL),
    },
    {
      name: work.frontmatter.title,
      url: workUrl,
    },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <WorkPageContent work={work} />
    </>
  );
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
  const { generateBaseMetadata } = await import("@/lib/seo/metadata");
  const { locale, slug } = await params;

  try {
    const work = await getWorkData(locale, slug);

    // Use enhanced metadata generator with canonical + hreflang
    return generateBaseMetadata({
      title: work.frontmatter.title,
      description: work.frontmatter.description,
      path: `/works/${slug}`,
      locale: locale as "en" | "es",
      keywords: work.frontmatter.seo?.keywords,
      image: work.frontmatter.seo?.ogImage || work.frontmatter.coverImage,
      imageAlt: work.frontmatter.title,
      type: "website",
    });
  } catch {
    return {
      title: "Work Not Found",
      description: "The requested work could not be found.",
    };
  }
}
