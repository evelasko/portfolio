import clsx from "clsx";
import type { MDXComponents } from "mdx/types";
import { TYPOGRAPHY } from "./lib/typography";

const components: MDXComponents = {
  h1: ({ children }) => (
    <h1 className={clsx(TYPOGRAPHY.h1, "mb-4")}>{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className={clsx(TYPOGRAPHY.h2, "mb-4")}>{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className={clsx(TYPOGRAPHY.h3, "mb-4")}>{children}</h3>
  ),
  h4: ({ children }) => (
    <h4 className={clsx(TYPOGRAPHY.h4, "mb-4")}>{children}</h4>
  ),
  h5: ({ children }) => (
    <h5 className={clsx(TYPOGRAPHY.h5, "mb-4")}>{children}</h5>
  ),
  h6: ({ children }) => (
    <h6 className={clsx(TYPOGRAPHY.h6, "mb-4")}>{children}</h6>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
