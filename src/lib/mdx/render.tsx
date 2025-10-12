import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import type { MDXComponents } from "mdx/types";
import type { ArticleFrontmatter, WorkFrontmatter } from "./types";

/**
 * Compile and render MDX content
 *
 * Uses remark-gfm to support GitHub Flavored Markdown features including:
 * - Tables
 * - Strikethrough
 * - Task lists
 * - Autolink literals
 */
export async function compileMDXContent<
  T extends ArticleFrontmatter | WorkFrontmatter,
>(
  source: string,
  components?: MDXComponents
): Promise<{
  content: React.ReactElement;
}> {
  const { content } = await compileMDX<T>({
    source,
    options: {
      parseFrontmatter: false, // We handle frontmatter separately with gray-matter
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [],
        format: "mdx",
      },
    },
    components,
  });

  return { content };
}
