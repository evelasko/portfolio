import { SocialLink } from "@/lib/types/navigation";

interface Info {
  name: string;
  tagline: string;
  email: string;
  profilePhoto: string;
  phone: string;
  address: string;
  website: string;
  domain: string;
  social: SocialLink[];
}

export const INFO: Info = {
  name: "Enrique Velasco",
  tagline:
    "Harmonious Engineer: Bridging Dance, Code & Business to Transform Creative Careers",
  email: "info@evelas.co",
  phone: "+34 609 971 307",
  profilePhoto:
    "https://res.cloudinary.com/evelasco/image/upload/v1761655819/common/protrait-1_w9waah.jpg",
  address: "Calle Eduardo Rivas 14\n28019 Madrid\nSpain",
  website: "https://evelas.co",
  domain: "https://evelas.co",
  social: [
    {
      label: { en: "YT", es: "YT" },
      href: "www.youtube.com/@EnriqueVelasco81",
      icon: "Youtube",
    },
    {
      label: { en: "IG", es: "IG" },
      href: "https://www.instagram.com/evelas.co/",
      icon: "Instagram",
    },
    {
      label: { en: "LI", es: "LI" },
      href: "https://www.linkedin.com/in/velascoenrique/",
      icon: "Linkedin",
    },
    {
      label: { en: "GH", es: "GH" },
      href: "https://github.com/evelasko",
      icon: "Github",
    },
  ],
};
