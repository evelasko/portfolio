import { getAllArticles, getAllWorks } from "@/lib/mdx";
import HomePage from "./HomePage";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Fetch featured articles for TheThoughts section
  const featuredArticles = await getAllArticles(locale, {
    featured: true,
    includeDrafts: false,
    sortBy: "publishedAt",
    sortOrder: "desc",
  });

  // Fetch featured works for TheWorks section
  const featuredWorks = await getAllWorks(locale, {
    featured: true,
    includeDrafts: false,
    sortBy: "publishedAt",
    sortOrder: "desc",
  });

  return (
    <HomePage
      locale={locale}
      featuredArticles={featuredArticles}
      featuredWorks={featuredWorks}
    />
  );
}
