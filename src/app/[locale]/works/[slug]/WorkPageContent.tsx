import { TYPOGRAPHY } from "@/lib/typography";
import clsx from "clsx";
import dayjs from "dayjs";
import { ExternalLink } from "lucide-react";
import type { WorkFrontmatter } from "@/lib/mdx";
import MinimalHero from "@/components/heroes/MinimalHero";

interface WorkPageContentProps {
  work: {
    slug: string;
    locale: string;
    frontmatter: WorkFrontmatter;
    content: React.ReactElement;
    readingTime: {
      text: string;
      minutes: number;
      words: number;
    };
  };
}

/**
 * Server component for work page content
 */
export function WorkPageContent({ work }: WorkPageContentProps) {
  return (
    <>
      {/* Hero Section */}
      {work.frontmatter.coverImage && (
        <MinimalHero
          title={work.frontmatter.title}
          subtitle={work.frontmatter.description}
          image={work.frontmatter.coverImage}
          link={`/works/${work.slug}`}
        />
      )}
      <section className="min-h-[60vh] flex items-center justify-center px-6 py-24">
        <div className="max-w-4xl w-full">
          {/* Category */}
          <div className="mb-6">
            <span
              className={clsx(
                TYPOGRAPHY.text14,
                "text-orange-100 uppercase tracking-wide"
              )}
            >
              {work.frontmatter.category}
            </span>
          </div>

          {/* Title */}
          <h1 className={clsx(TYPOGRAPHY.h1, "mb-6")}>
            {work.frontmatter.title}
          </h1>

          {/* Description */}
          <p className={clsx(TYPOGRAPHY.text20, "text-black-96 mb-8")}>
            {work.frontmatter.description}
          </p>

          {/* Metadata Grid */}
          <div className="grid grid-cols-1 s:grid-cols-2 m:grid-cols-4 gap-6 mb-8">
            {/* Client */}
            {work.frontmatter.client && (
              <div>
                <div
                  className={clsx(TYPOGRAPHY.text14, "text-black-96/60 mb-1")}
                >
                  Client
                </div>
                <div className={clsx(TYPOGRAPHY.text16, "text-black-100")}>
                  {work.frontmatter.client}
                </div>
              </div>
            )}

            {/* Role */}
            {work.frontmatter.role && (
              <div>
                <div
                  className={clsx(TYPOGRAPHY.text14, "text-black-96/60 mb-1")}
                >
                  Role
                </div>
                <div className={clsx(TYPOGRAPHY.text16, "text-black-100")}>
                  {work.frontmatter.role}
                </div>
              </div>
            )}

            {/* Duration */}
            {work.frontmatter.duration && (
              <div>
                <div
                  className={clsx(TYPOGRAPHY.text14, "text-black-96/60 mb-1")}
                >
                  Duration
                </div>
                <div className={clsx(TYPOGRAPHY.text16, "text-black-100")}>
                  {work.frontmatter.duration}
                </div>
              </div>
            )}

            {/* Date */}
            <div>
              <div className={clsx(TYPOGRAPHY.text14, "text-black-96/60 mb-1")}>
                Date
              </div>
              <div className={clsx(TYPOGRAPHY.text16, "text-black-100")}>
                {dayjs(work.frontmatter.publishedAt).format("MMMM YYYY")}
              </div>
            </div>
          </div>

          {/* Technologies */}
          {work.frontmatter.technologies.length > 0 && (
            <div className="mb-8">
              <div className={clsx(TYPOGRAPHY.text14, "text-black-96/60 mb-3")}>
                Technologies
              </div>
              <div className="flex flex-wrap gap-2">
                {work.frontmatter.technologies.map(tech => (
                  <span
                    key={tech}
                    className={clsx(
                      TYPOGRAPHY.text14,
                      "px-3 py-1 bg-black-10 rounded-full text-black-96"
                    )}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {work.frontmatter.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {work.frontmatter.tags.map(tag => (
                <span
                  key={tag}
                  className={clsx(
                    TYPOGRAPHY.text14,
                    "px-3 py-1 border border-black-30 rounded-full text-black-96"
                  )}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Project URL */}
          {work.frontmatter.projectUrl && (
            <div className="mt-8">
              <a
                href={work.frontmatter.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={clsx(
                  TYPOGRAPHY.text16,
                  "inline-flex items-center gap-2 text-orange-100 hover:underline"
                )}
              >
                View Live Project
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Work Content */}
      <article className="px-6 pb-24">
        <div className="max-w-3xl mx-auto prose prose-invert">
          {work.content}
        </div>
      </article>
    </>
  );
}
