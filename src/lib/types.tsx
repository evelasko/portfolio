import { KeyTextField, LinkField } from "@prismicio/client";

export type NavigationLink = {
  label?: string;
  href: string;
};

export type SocialLink = NavigationLink & {
  icon?: string;
};

export interface PrismicSocialLink {
  icon: KeyTextField;
  link: LinkField;
}
