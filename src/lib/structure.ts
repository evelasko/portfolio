import {
  type SiteStructure,
  type StructureItem,
  type NavigationItem,
  NavigationLink,
} from "./types";
import { type Pathnames } from "next-intl/routing";

export const structure: SiteStructure = {
  routes: [
    {
      key: "/",
      href: { en: "/", es: "/" },
      label: { en: "home", es: "inicio" },
    },
    {
      key: "/works",
      href: { en: "/works", es: "/trabajos" },
      label: { en: "works", es: "trabajos" },
    },
    {
      key: "/articles",
      href: { en: "/articles", es: "/articulos" },
      label: { en: "articles", es: "artículos" },
    },
    {
      key: "/bio",
      href: { en: "/bio", es: "/bio" },
      label: { en: "bio", es: "bio" },
    },
  ],
  external: [],
  utility: [
    {
      key: "/privacy",
      href: { en: "/privacy", es: "/privacidad" },
      label: { en: "Privacy Policy", es: "Política de Privacidad" },
    },
    {
      key: "/terms",
      href: { en: "/terms", es: "/terminos" },
      label: { en: "Terms of Service", es: "Términos de Servicio" },
    },
    {
      key: "/imprint",
      href: { en: "/imprint", es: "/aviso" },
      label: { en: "Imprint", es: "Aviso Legal" },
    },
  ],
};

export const navigation: NavigationLink[] = structure.routes
  .filter(route => route.key !== "/")
  .map(route => ({
    label: route.label,
    href: route.key,
  }));

export const legalLinks: NavigationLink[] = structure.utility.map(route => ({
  label: route.label,
  href: route.key,
}));

// Generator function for pathnames
export function generatePathnames(
  structure: SiteStructure
): Pathnames<["en", "es"]> {
  const pathnames: Record<string, any> = {};

  function processItem(item: StructureItem) {
    // Only include routes that are actual pages (not external)
    if (!item.key.startsWith("http")) {
      pathnames[item.key] = {
        en: item.href.en,
        es: item.href.es,
      };
    }

    item.children?.forEach(processItem);
  }

  structure.routes.forEach(processItem);
  structure.utility.forEach(processItem);

  return pathnames as Pathnames<["en", "es"]>;
}

// Validation function for structure consistency
export function validateStructure(structure: SiteStructure): string[] {
  const errors: string[] = [];
  const seenKeys = new Set<string>();

  function validateItem(item: StructureItem, path: string = "") {
    // Check for duplicate keys
    if (seenKeys.has(item.key)) {
      errors.push(`Duplicate key found: ${item.key} at ${path}`);
    } else {
      seenKeys.add(item.key);
    }

    // Check for missing translations
    if (!item.label.en || !item.label.es) {
      errors.push(`Missing label translation for key: ${item.key} at ${path}`);
    }

    if (!item.href.en || !item.href.es) {
      errors.push(`Missing href translation for key: ${item.key} at ${path}`);
    }

    // Check for consistency between key and English href for internal routes
    if (!item.key.startsWith("http") && item.key !== item.href.en) {
      errors.push(
        `Key "${item.key}" doesn't match English href "${item.href.en}" at ${path}`
      );
    }

    item.children?.forEach((child, index) =>
      validateItem(child, `${path}.children[${index}]`)
    );
  }

  structure.routes.forEach((item, index) =>
    validateItem(item, `routes[${index}]`)
  );

  structure.external.forEach((item, index) =>
    validateItem(item, `external[${index}]`)
  );

  structure.utility.forEach((item, index) =>
    validateItem(item, `utility[${index}]`)
  );

  return errors;
}

export default structure;
