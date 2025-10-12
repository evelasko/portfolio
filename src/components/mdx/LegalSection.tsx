import { TYPOGRAPHY } from "@/lib/typography";
import clsx from "clsx";
import React from "react";

interface LegalSectionProps {
  children: React.ReactNode;
}

/**
 * Wrapper component for legal page sections
 * Used to wrap heading + content blocks in the two-column grid
 */
export function LegalSection({ children }: LegalSectionProps) {
  return <section>{children}</section>;
}

interface LegalHeadingProps {
  children: React.ReactNode;
}

/**
 * Heading component for legal page sections (h2 elements)
 */
export function LegalHeading({ children }: LegalHeadingProps) {
  return (
    <h2 className={clsx(TYPOGRAPHY.h6, "text-black font-extrabold pb-4")}>
      {children}
    </h2>
  );
}

interface LegalTextProps {
  children: React.ReactNode;
}

/**
 * Text component for legal page content (p elements)
 */
export function LegalText({ children }: LegalTextProps) {
  return <p className={clsx(TYPOGRAPHY.text16, "text-black")}>{children}</p>;
}

interface LegalListProps {
  children: React.ReactNode;
}

/**
 * List component for legal page content (ul elements)
 */
export function LegalList({ children }: LegalListProps) {
  return (
    <ul
      className={clsx(TYPOGRAPHY.text16, "text-black", "list-disc pl-4 py-4")}
    >
      {children}
    </ul>
  );
}
