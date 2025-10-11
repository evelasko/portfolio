/**
 * Typography Constants for Enrique Velasco Portfolio
 *
 * Simplified typography system with responsive font sizes built into each class.
 *
 * Key improvements:
 * - No hardcoded colors - use Tailwind color utilities (text-white-100, text-black-90, etc.)
 * - No default margins - control spacing explicitly with Tailwind spacing utilities
 * - Responsive sizes handled automatically by CSS media queries
 *
 * Usage:
 * ```tsx
 * import { TYPOGRAPHY } from "@/lib/typography";
 * import clsx from "clsx";
 *
 * <h1 className={clsx(TYPOGRAPHY.h1, "text-white-100 mb-6")}>Title</h1>
 * <p className={clsx(TYPOGRAPHY.text18, "text-black-80 mb-4")}>Body text</p>
 * ```
 */

// Typography Constants
export const TYPOGRAPHY = {
  // Headings (H1-H9) - Responsive font sizes built-in
  h1: "text-h1 text-h1-s m:text-h1-m l:text-h1-l",
  h2: "text-h2 text-h2-s m:text-h2-m l:text-h2-l",
  h3: "text-h3 text-h3-s m:text-h3-m l:text-h3-l",
  h4: "text-h4 text-h4-s m:text-h4-m l:text-h4-l",
  h5: "text-h5 text-h5-s m:text-h5-m l:text-h5-l",
  h6: "text-h6 text-h6-s m:text-h6-m l:text-h6-l",
  h7: "text-h7 text-h7-s m:text-h7-m l:text-h7-l",
  h8: "text-h8 text-h8-s m:text-h8-m l:text-h8-l",
  h9: "text-h9 text-h9-s m:text-h9-m l:text-h9-l",

  // Text Sizes - Responsive font sizes built-in
  text20: "text-20 text-20-s m:text-20-m l:text-20-l",
  text18: "text-18 text-18-s m:text-18-m l:text-18-l",
  text16: "text-16 text-16-s m:text-16-m l:text-16-l",
  text14: "text-14 text-14-s m:text-14-m l:text-14-l",

  // Monospace Sizes - Responsive font sizes built-in
  mono24: "mono-24 mono-24-s m:mono-24-m l:mono-24-l",
  mono20: "mono-20 mono-20-s m:mono-20-m l:mono-20-l",
  mono18: "mono-18 mono-18-s m:mono-18-m l:mono-18-l",
  mono16: "mono-16 mono-16-s m:mono-16-m l:mono-16-l",
  mono14: "mono-14 mono-14-s m:mono-14-m l:mono-14-l",

  // Menu and Navigation
  menu: "menu text-menu-s m:text-menu-m l:text-menu-l",
  navBar: "mono-18 mono-18-s m:mono-18-m l:mono-18-l uppercase",

  // Link Styles
  linkDark: "link-dark",
  linkLight: "link-light",
  linkWhiteToOrange: "link-white-to-orange",
  linkOrangeToOrange: "link-orange-to-orange",
} as const;

// Export individual constants for direct import
export const {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  h7,
  h8,
  h9,
  text20,
  text18,
  text16,
  text14,
  mono24,
  mono20,
  mono18,
  mono16,
  mono14,
  menu,
  navBar,
  linkDark,
  linkLight,
  linkWhiteToOrange,
  linkOrangeToOrange,
} = TYPOGRAPHY;

// Type for valid typography keys
export type TypographyKey = keyof typeof TYPOGRAPHY;

/**
 * Helper function to get typography classes
 * @param key - The typography constant key
 * @returns The complete responsive class string
 */
export function getTypography(key: TypographyKey): string {
  return TYPOGRAPHY[key];
}
