import { generatePathnames } from "../lib/structure";
import structure from "../lib/structure";
import { Pathnames } from "next-intl/routing";

// Generate pathnames from the single source of truth structure
const generatedPathnames = generatePathnames(structure);

// Extend with dynamic routes
export const pathnames: Pathnames<["en", "es"]> = {
  ...generatedPathnames,
  // Dynamic routes for works
  "/works/[slug]": {
    en: "/works/[slug]",
    es: "/trabajos/[slug]",
  },
  // Dynamic routes for articles
  "/articles/[slug]": {
    en: "/articles/[slug]",
    es: "/articulos/[slug]",
  },
};
