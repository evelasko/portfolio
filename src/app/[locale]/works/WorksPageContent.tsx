import { TYPOGRAPHY } from "@/lib/typography";
import clsx from "clsx";
import type { ContentListItem, WorkFrontmatter } from "@/lib/mdx";
import ProjectItem from "@/components/list_items/ProjectItem";
import ProjectCard from "@/components/cards/ProjectCard";

interface WorksPageContentProps {
  works: ContentListItem<WorkFrontmatter>[];
  locale: string;
}

const WORK_PLACEHOLDER = "/assets/placeholders/work-placeholder.jpg";

/**
 * Server component for works listing page content
 */
export function WorksPageContent({ works, locale }: WorksPageContentProps) {
  // Group works by category
  const worksByCategory = works.reduce(
    (acc, work) => {
      const category = work.frontmatter.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(work);
      return acc;
    },
    {} as Record<string, ContentListItem<WorkFrontmatter>[]>
  );

  const categories = Object.keys(worksByCategory).sort();

  return (
    <>
      {/* Hero Section */}
      <section className="min-h-[50vh] flex items-center justify-center px-6 py-24">
        <div className="max-w-4xl w-full text-center">
          <h1 className={clsx(TYPOGRAPHY.h1, "mb-6")}>Works</h1>
          <p className={clsx(TYPOGRAPHY.text20, "text-black-90")}>
            Selected projects and case studies showcasing design and development
            work
          </p>
        </div>
      </section>

      {/* Works Content */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          {works.length === 0 ? (
            <div className="text-center py-12">
              <p className={clsx(TYPOGRAPHY.text18, "text-black-90")}>
                No projects available yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="space-y-16">
              {categories.map(category => (
                <div key={category}>
                  {/* Category Header */}
                  <h2
                    className={clsx(
                      TYPOGRAPHY.h3,
                      "mb-8 pb-4 border-b border-black-30"
                    )}
                  >
                    {category}
                  </h2>

                  {/* Works Grid */}
                  <div className="grid grid-cols-1 m:grid-cols-2 gap-8">
                    {worksByCategory[category].map(work => (
                      <div key={work.slug}>
                        <div className="hidden l:block">
                          <ProjectCard
                            key={work.slug}
                            overtitle={work.frontmatter.category}
                            title={work.frontmatter.title}
                            subtitle={
                              work.excerpt || work.frontmatter.description
                            }
                            image={
                              work.frontmatter.coverImage || WORK_PLACEHOLDER
                            }
                            link={`/works/${work.slug}`}
                          />
                        </div>
                        <div className="l:hidden">
                          <ProjectItem
                            key={work.slug}
                            label={work.frontmatter.category}
                            title={work.frontmatter.title}
                            description={
                              work.excerpt || work.frontmatter.description
                            }
                            image={
                              work.frontmatter.coverImage || WORK_PLACEHOLDER
                            }
                            link={`/works/${work.slug}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
