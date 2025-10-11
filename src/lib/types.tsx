export type NavigationLink = {
  label?: string;
  href: string;
};

export type SocialLink = NavigationLink & {
  icon?: string;
};
