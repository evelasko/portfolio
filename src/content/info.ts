import { SocialLink } from "@/lib/types/navigation";

interface Info {
  name: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  social: SocialLink[];
}

export const INFO: Info = {
  name: "Enrique Velasco",
  email: "info@evelas.co",
  phone: "+34 609 971 307",
  address: "Calle Eduardo Rivas 14\n28019 Madrid\nSpain",
  website: "https://evelas.co",
  social: [
    {
      label: { en: "YT", es: "YT" },
      href: "https://youtube.com/evelasco",
      icon: "Youtube",
    },
    {
      label: { en: "IG", es: "IG" },
      href: "https://instagram.com/evelasco",
      icon: "Instagram",
    },
    {
      label: { en: "LI", es: "LI" },
      href: "https://linkedin.com/evelasco",
      icon: "Linkedin",
    },
    {
      label: { en: "GH", es: "GH" },
      href: "https://github.com/evelasco",
      icon: "Github",
    },
  ],
};
