import { Link } from "@/i18n/navigation";
import type { ComponentProps } from "react";

/**
 * Locale-aware link component for MDX content
 */
export function MDXLink({
  href,
  children,
  ...props
}: ComponentProps<"a"> & { href: string }) {
  // External links
  if (href.startsWith("http://") || href.startsWith("https://")) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-orange-100 hover:underline"
        {...props}
      >
        {children}
      </a>
    );
  }

  // Internal links - use locale-aware Link component
  return (
    <Link href={href} className="text-orange-100 hover:underline" {...props}>
      {children}
    </Link>
  );
}
