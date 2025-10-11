import { TYPOGRAPHY } from "@/lib/typography";
import clsx from "clsx";
import type { ComponentProps } from "react";

/**
 * Code block component for MDX content
 * Handles both inline code and code blocks
 */
export function CodeBlock({
  children,
  className,
  ...props
}: ComponentProps<"code">) {
  const isInline = !className;

  if (isInline) {
    return (
      <code
        className={clsx(
          TYPOGRAPHY.mono14,
          "bg-black-10 text-orange-100 px-1.5 py-0.5 rounded"
        )}
        {...props}
      >
        {children}
      </code>
    );
  }

  // Extract language from className (format: language-xxx)
  const language = className?.replace(/language-/, "") || "text";

  return (
    <div className="my-6 rounded-lg overflow-hidden bg-black-10">
      <div className="px-4 py-2 bg-black-20 border-b border-black-30">
        <span className={clsx(TYPOGRAPHY.mono14, "text-black-96")}>
          {language}
        </span>
      </div>
      <pre className="p-4 overflow-x-auto">
        <code
          className={clsx(TYPOGRAPHY.mono14, "text-black-98", className)}
          {...props}
        >
          {children}
        </code>
      </pre>
    </div>
  );
}
