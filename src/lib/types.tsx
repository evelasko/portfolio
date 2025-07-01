import { KeyTextField, LinkField } from "@prismicio/client";

export interface SocialLink {
    icon: string;
    label?: string;
    url: string;
}

export interface PrismicSocialLink {
    icon: KeyTextField;
    link: LinkField;
}