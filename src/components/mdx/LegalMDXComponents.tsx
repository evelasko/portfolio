import type { MDXComponents } from "mdx/types";
import { TYPOGRAPHY } from "@/lib/typography";
import clsx from "clsx";
import React from "react";
import {
  LegalSection,
  LegalHeading,
  LegalText,
  LegalList,
} from "./LegalSection";

/**
 * Custom MDX components for legal pages
 * Provides specific styling for legal content sections
 */
export function getLegalMDXComponents(): MDXComponents {
  return {
    // Use LegalHeading for h2 elements (section headings)
    h2: ({ children, ...props }) => (
      <LegalHeading {...props}>{children}</LegalHeading>
    ),

    // Paragraphs use legal text styling
    p: ({ children, ...props }) => (
      <LegalText {...props}>{children}</LegalText>
    ),

    // Lists use legal list styling
    ul: ({ children, ...props }) => (
      <LegalList {...props}>{children}</LegalList>
    ),

    // List items remain unchanged
    li: ({ children, ...props }) => <li {...props}>{children}</li>,

    // Strong/bold text
    strong: ({ children, ...props }) => (
      <strong className="font-bold" {...props}>
        {children}
      </strong>
    ),

    // Custom section component
    section: ({ children, ...props }) => (
      <LegalSection {...props}>{children}</LegalSection>
    ),

    // Links
    a: ({ children, href, ...props }) => (
      <a
        href={href}
        className="underline hover:text-orange-100 transition-colors"
        {...props}
      >
        {children}
      </a>
    ),
  };
}
