import { getAllArticles, getAllWorks } from "@/lib/mdx";
import HomePage from "./HomePage";
import { Metadata } from "next";
import { generateBaseMetadata } from "@/lib/seo/metadata";
import { INFO } from "@/content/info";
import JsonLd from "@/components/seo/JsonLd";
import { generatePersonSchema, generateWebSiteSchema } from "@/lib/seo/schemas";

type Props = {
  params: Promise<{ locale: string }>;
};

/**
 * Generate metadata for homepage
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const titles = {
    en: `${INFO.name} - Creative Technologist`,
    es: `${INFO.name} - Tecnólogo Creativo`,
  };

  const descriptions = {
    en: "Harmonious Engineer: Bridging Dance, Code & Business to Transform Creative Careers. Explore my work at the intersection of technology and art.",
    es: "Ingeniero Armónico: Conectando Danza, Código y Negocios para Transformar Carreras Creativas. Explora mi trabajo en la intersección de tecnología y arte.",
  };

  return generateBaseMetadata({
    title: titles[locale as "en" | "es"],
    description: descriptions[locale as "en" | "es"],
    path: "/",
    locale: locale as "en" | "es",
    keywords: [
      "Enrique Velasco",
      "creative technology",
      "dance",
      "software engineer",
      "CENIE",
      "creative engineering",
      "portfolio",
    ],
    image: INFO.profilePhoto,
    type: "website",
  });
}

export default async function Page({ params }: Props) {
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

  // Generate Person schema for homepage
  const personSchema = generatePersonSchema({
    jobTitle: INFO.tagline,
    description:
      locale === "en"
        ? "Creative technologist and engineer bridging dance, code, and business"
        : "Tecnólogo creativo e ingeniero que conecta danza, código y negocios",
    knowsAbout: [
      "Creative Technology",
      "Dance",
      "Software Engineering",
      "Business Development",
    ],
  });

  // Generate WebSite schema
  const websiteSchema = generateWebSiteSchema({
    name: INFO.name,
    description:
      locale === "en"
        ? "Portfolio of Enrique Velasco - Creative Technologist"
        : "Portafolio de Enrique Velasco - Tecnólogo Creativo",
    url: INFO.website,
    locale,
  });

  return (
    <>
      <JsonLd data={personSchema} />
      <JsonLd data={websiteSchema} />
      <HomePage
        locale={locale}
        featuredArticles={featuredArticles}
        featuredWorks={featuredWorks}
      />
    </>
  );
}
