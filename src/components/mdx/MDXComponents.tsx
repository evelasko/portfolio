import type { MDXComponents } from "mdx/types";
import { TYPOGRAPHY } from "@/lib/typography";
import clsx from "clsx";
import { MDXImage } from "./MDXImage";
import { MDXLink } from "./MDXLink";
import { CodeBlock } from "./CodeBlock";
import { Callout } from "./Callout";
import React from "react";

/**
 * Custom MDX components for rendering MDX content
 * Maps HTML elements to custom React components with proper styling
 */
export function getMDXComponents(): MDXComponents {
  return {
    // Headings
    h1: ({ children, ...props }) => (
      <h1 className={clsx(TYPOGRAPHY.h1, "mt-12 mb-6")} {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2 className={clsx(TYPOGRAPHY.h2, "mt-10 mb-5")} {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 className={clsx(TYPOGRAPHY.h3, "mt-8 mb-4")} {...props}>
        {children}
      </h3>
    ),
    h4: ({ children, ...props }) => (
      <h4 className={clsx(TYPOGRAPHY.h4, "mt-6 mb-3")} {...props}>
        {children}
      </h4>
    ),
    h5: ({ children, ...props }) => (
      <h5 className={clsx(TYPOGRAPHY.h5, "mt-6 mb-3")} {...props}>
        {children}
      </h5>
    ),
    h6: ({ children, ...props }) => (
      <h6 className={clsx(TYPOGRAPHY.h6, "mt-6 mb-3")} {...props}>
        {children}
      </h6>
    ),

    // Paragraphs and text
    p: ({ children, ...props }) => {
      // Check if children contains only an img element (which gets mapped to MDXImage)
      // This prevents the hydration error of div-in-p
      const childrenArray = React.Children.toArray(children);
      const hasOnlyImage =
        childrenArray.length === 1 &&
        React.isValidElement(childrenArray[0]) &&
        (childrenArray[0].type === "img" ||
          (childrenArray[0].props as any)?.mdxType === "img");

      if (hasOnlyImage) {
        return <>{children}</>;
      }

      return (
        <p className={clsx(TYPOGRAPHY.text18, "my-4 text-black-96")} {...props}>
          {children}
        </p>
      );
    },

    // Links
    a: props => <MDXLink {...props} />,

    // Images
    img: props => <MDXImage {...(props as any)} />,

    // Code
    code: props => <CodeBlock {...props} />,
    pre: ({ children }) => <>{children}</>, // Pass through to CodeBlock

    // Lists
    ul: ({ children, ...props }) => (
      <ul
        className={clsx(TYPOGRAPHY.text18, "my-4 ml-6 list-disc text-black-96")}
        {...props}
      >
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol
        className={clsx(
          TYPOGRAPHY.text18,
          "my-4 ml-6 list-decimal text-black-96"
        )}
        {...props}
      >
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="my-2" {...props}>
        {children}
      </li>
    ),

    // Blockquote
    blockquote: ({ children, ...props }) => (
      <blockquote
        className={clsx(
          TYPOGRAPHY.text18,
          "my-6 pl-4 border-l-4 border-orange-100 italic text-black-96"
        )}
        {...props}
      >
        {children}
      </blockquote>
    ),

    // Horizontal rule
    hr: props => <hr className="my-8 border-black-30" {...props} />,

    // Table
    table: ({ children, ...props }) => (
      <div className="my-8 overflow-x-auto rounded-lg border border-black-30">
        <table
          className={clsx(TYPOGRAPHY.text16, "w-full border-collapse")}
          {...props}
        >
          {children}
        </table>
      </div>
    ),
    thead: ({ children, ...props }) => (
      <thead className="bg-black-10" {...props}>
        {children}
      </thead>
    ),
    tbody: ({ children, ...props }) => (
      <tbody className="divide-y divide-black-20" {...props}>
        {children}
      </tbody>
    ),
    tr: ({ children, ...props }) => (
      <tr className="hover:bg-black-10/50 transition-colors" {...props}>
        {children}
      </tr>
    ),
    th: ({ children, ...props }) => (
      <th
        className={clsx(
          TYPOGRAPHY.text16,
          "px-6 py-3 text-left font-semibold text-black-100 border-b border-black-30"
        )}
        {...props}
      >
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td
        className={clsx(TYPOGRAPHY.text16, "px-6 py-4 text-black-96")}
        {...props}
      >
        {children}
      </td>
    ),

    // Custom components
    Callout,
  };
}
