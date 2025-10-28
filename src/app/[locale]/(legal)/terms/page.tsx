import { getLegalData } from "@/lib/mdx/loader";
import { compileMDXContent } from "@/lib/mdx/render";
import { LegalHeader, getLegalMDXComponents } from "@/components/mdx";
import { LegalPageLayout } from "@/components/layout/LegalPageLayout";
import { Metadata } from "next";
import { generateLegalMetadata } from "@/lib/seo/metadata";

interface TermsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

/**
 * Generate metadata for terms page
 */
export async function generateMetadata({
  params,
}: TermsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const legalData = await getLegalData(locale, "terms");

  return generateLegalMetadata({
    title: legalData.frontmatter.title,
    description: legalData.frontmatter.description,
    path: "/terms",
    locale: locale as "en" | "es",
    noIndex: false,
  });
}

export default async function TermsPage({ params }: TermsPageProps) {
  const { locale } = await params;
  const legalData = await getLegalData(locale, "terms");
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
