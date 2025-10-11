export type LocaleString = "en" | "es";

export const stringToLocaleString = (string: string): LocaleString => {
  if (string !== "en" && string !== "es") {
    throw new Error("Invalid locale string");
  }
  return string as LocaleString;
};

export type LocalizedLabel = {
  [key in LocaleString]: string;
};

export type LocalizedHref = {
  [key in LocaleString]: string;
};

export interface NavigationItem {
  label: LocalizedLabel;
  href: string;
  icon?: React.ReactNode;
  items?: NavigationItem[];
}

// Enhanced structure interfaces for single source of truth
export interface StructureItem {
  // Route information
  key: string; // Used as the English href and pathnames key
  href: LocalizedHref; // Localized paths
  label: LocalizedLabel; // Localized labels

  // Hierarchy
  children?: StructureItem[];
}

export interface SiteStructure {
  routes: StructureItem[];
  external: StructureItem[]; // For external links like academia.cenie.org
  utility: StructureItem[]; // For legal pages, search, account, etc.
}
