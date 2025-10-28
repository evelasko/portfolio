import { getLegalData } from "@/lib/mdx/loader";
import { compileMDXContent } from "@/lib/mdx/render";
import { LegalHeader, getLegalMDXComponents } from "@/components/mdx";
import { LegalPageLayout } from "@/components/layout/LegalPageLayout";
import { Metadata } from "next";
import { generateLegalMetadata } from "@/lib/seo/metadata";

interface PrivacyPageProps {
  params: Promise<{
    locale: string;
  }>;
}

/**
 * Generate metadata for privacy page
 */
export async function generateMetadata({
  params,
}: PrivacyPageProps): Promise<Metadata> {
  const { locale } = await params;
  const legalData = await getLegalData(locale, "privacy");

  return generateLegalMetadata({
    title: legalData.frontmatter.title,
    description: legalData.frontmatter.description,
    path: "/privacy",
    locale: locale as "en" | "es",
    noIndex: false, // Set to true if you don't want to index legal pages
  });
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = await params;
  const legalData = await getLegalData(locale, "privacy");
  const compiledContent = await compileMDXContent(
    legalData.content,
    getLegalMDXComponents()
  );

  return (
    <LegalPageLayout>
      <div>
        <LegalHeader
          title={legalData.frontmatter.title}
          description={legalData.frontmatter.description}
        />
        <div
          id="content"
          className="grid grid-cols-1 md:grid-cols-2 gap-16 px-16"
        >
          {compiledContent.content}
        </div>
      </div>
    </LegalPageLayout>
  );
}
