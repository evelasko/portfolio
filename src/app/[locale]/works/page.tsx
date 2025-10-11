import { WorksPageContent } from "./WorksPageContent";

/**
 * Server component that loads works and renders the listing page
 */
export default async function WorksPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { getAllWorks } = await import("@/lib/mdx");
  const { locale } = await params;

  // Load all works for the current locale
  const works = await getAllWorks(locale, {
    includeDrafts: false,
    sortBy: "publishedAt",
    sortOrder: "desc",
  });

  return <WorksPageContent works={works} locale={locale} />;
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

  return {
    title: "Works",
    description:
      "Selected projects and case studies showcasing design and development work",
  };
}
