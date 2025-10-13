type LocalizedLabel = {
  en: string;
  es: string;
};

export type NavigationLink = {
  label?: LocalizedLabel;
  href: string;
};

export type SocialLink = NavigationLink & {
  icon?: string;
};
