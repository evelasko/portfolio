import { getLegalData } from "@/lib/mdx/loader";
import { compileMDXContent } from "@/lib/mdx/render";
import { LegalHeader, getLegalMDXComponents } from "@/components/mdx";
import { LegalPageLayout } from "@/components/layout/LegalPageLayout";

interface ImprintPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function ImprintPage({ params }: ImprintPageProps) {
  const { locale } = await params;
  const legalData = await getLegalData(locale, "imprint");
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
