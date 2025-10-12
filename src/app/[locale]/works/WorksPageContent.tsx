import { TYPOGRAPHY } from "@/lib/typography";
import { Link } from "@/i18n/navigation";
import clsx from "clsx";
import dayjs from "dayjs";
import type { ContentListItem, WorkFrontmatter } from "@/lib/mdx";

interface WorksPageContentProps {
  works: ContentListItem<WorkFrontmatter>[];
  locale: string;
}

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
                      <Link
                        key={work.slug}
                        href={`/works/${work.slug}`}
                        className="group block"
                      >
                        {/* Card */}
                        <article className="h-full flex flex-col">
                          {/* Cover Image */}
                          {work.frontmatter.coverImage && (
                            <div className="mb-4 overflow-hidden rounded-lg bg-black-10 aspect-video">
                              <img
                                src={work.frontmatter.coverImage}
                                alt={work.frontmatter.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          )}

                          {/* Content */}
                          <div className="flex-1 flex flex-col">
                            {/* Category + Featured */}
                            <div className="flex items-center gap-2 mb-2">
                              <span
                                className={clsx(
                                  TYPOGRAPHY.text14,
                                  "text-orange-100 uppercase tracking-wide"
                                )}
                              >
                                {work.frontmatter.category}
                              </span>
                              {work.frontmatter.featured && (
                                <>
                                  <span className="text-black-90">•</span>
                                  <span
                                    className={clsx(
                                      TYPOGRAPHY.text14,
                                      "text-black-90 uppercase tracking-wide"
                                    )}
                                  >
                                    Featured
                                  </span>
                                </>
                              )}
                            </div>

                            {/* Title */}
                            <h3
                              className={clsx(
                                TYPOGRAPHY.h4,
                                "mb-3 group-hover:text-orange-100 transition-colors"
                              )}
                            >
                              {work.frontmatter.title}
                            </h3>

                            {/* Excerpt */}
                            {work.excerpt && (
                              <p
                                className={clsx(
                                  TYPOGRAPHY.text16,
                                  "text-black-90 mb-4 flex-1"
                                )}
                              >
                                {work.excerpt}
                              </p>
                            )}

                            {/* Client & Role */}
                            <div className="flex flex-wrap items-center gap-3 text-black-90/60 mb-4">
                              {work.frontmatter.client && (
                                <span className={TYPOGRAPHY.text14}>
                                  {work.frontmatter.client}
                                </span>
                              )}
                              {work.frontmatter.client &&
                                work.frontmatter.role && <span>•</span>}
                              {work.frontmatter.role && (
                                <span className={TYPOGRAPHY.text14}>
                                  {work.frontmatter.role}
                                </span>
                              )}
                            </div>

                            {/* Technologies */}
                            {work.frontmatter.technologies.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-auto">
                                {work.frontmatter.technologies
                                  .slice(0, 4)
                                  .map(tech => (
                                    <span
                                      key={tech}
                                      className={clsx(
                                        TYPOGRAPHY.text14,
                                        "px-2 py-0.5 bg-black-10 rounded text-black-90/80"
                                      )}
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                {work.frontmatter.technologies.length > 4 && (
                                  <span
                                    className={clsx(
                                      TYPOGRAPHY.text14,
                                      "px-2 py-0.5 text-black-90/60"
                                    )}
                                  >
                                    +{work.frontmatter.technologies.length - 4}{" "}
                                    more
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </article>
                      </Link>
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
