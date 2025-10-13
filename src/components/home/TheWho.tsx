import { INFO } from "@/content/info";
import BioBlock from "../misc/BioBlock";
import TestimonialCarousel from "../lists_and_grids/TestimonialCarousel";
import MainHeading from "../headings/MainHeading";

export default function TheWho() {
  return (
    <section id="the-who">
      <BioBlock
        photo_path="/assets/images/photos/photo_2.jpg"
        short_bio="My journey wasn't in one world, but at the intersection of two. From the stages of the **Netherlands Dans Theatre** to the command line of a programming terminal, I discovered the same core truth: **the most powerful creations come from a harmony of logic and soul**. I don't teach theory; I share a methodology I've lived. **My goal is to give you the compass I built for myself.**"
        social_links={INFO.social}
        other_links={[
          {
            href: "/",
            label: { en: "Read more", es: "Leer más" },
          },
          {
            href: "/",
            label: { en: "Contact me", es: "Contactarme" },
          },
        ]}
        margin={60}
      />
      <MainHeading title="Words about me" className="text-center" />
      <TestimonialCarousel
        testimonials={[
          {
            name: "John Doe",
            title: "CEO",
            message:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eget vehicula ipsum. In eu aliquet magna. Nam posuere malesuada ornare. Vestibulum a dolor eget erat rutrum finibus in non diam. Duis finibus ante et ipsum vehicula venenatis.",
            avatar: "/assets/images/avatars/avatar_1.jpg",
          },
          {
            name: "Sam Eigenheer",
            title: "CEO",
            message:
              "In eget mauris neque. Fusce congue lectus dignissim neque tempor, id accumsan arcu blandit. Praesent rhoncus ultricies feugiat. Nam convallis convallis leo quis venenatis. Nulla gravida lectus ac eleifend varius. Sed sed iaculis velit. Mauris at pharetra dui. Nunc sollicitudin ex eget blandit facilisis. Nulla malesuada consequat velit sed malesuada.",
            avatar: "/assets/images/avatars/avatar_2.jpg",
          },
          {
            name: "Eddy Wolfers",
            title: "CEO",
            message:
              "Sed sed iaculis velit. Mauris at pharetra dui. Nunc sollicitudin ex eget blandit facilisis. Nulla malesuada consequat velit sed malesuada. Ut arcu est, finibus vel quam sed, dapibus tincidunt felis. Nunc tristique tempus eleifend. Integer laoreet interdum odio at condimentum.",
            avatar: "/assets/images/avatars/avatar_3.jpg",
          },
          {
            name: "Ralf Jacobs",
            title: "CEO",
            message:
              "Maecenas faucibus urna a laoreet tempor. Vestibulum aliquet, nibh non rhoncus porttitor, lorem massa varius risus, ac lacinia risus turpis ac eros. Maecenas eget neque vitae justo mollis tristique. Sed quis ultricies lorem. Suspendisse varius mi nec felis pretium euismod. Aliquam vel turpis id sapien auctor fringilla non vitae augue.",
            avatar: "/assets/images/avatars/avatar_4.jpg",
          },
          {
            name: "Niels Haardt",
            title: "CEO",
            message:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eget vehicula ipsum. In eu aliquet magna. Nam posuere malesuada ornare. Vestibulum a dolor eget erat rutrum finibus in non diam. Duis finibus ante et ipsum vehicula venenatis. Etiam vel mauris vestibulum, feugiat sem ut, aliquam ligula. Fusce dictum ligula nec nibh fringilla dignissim. Nulla purus lectus, euismod ut ultrices vel, ultricies id neque. Cras feugiat lectus nisl, a volutpat dui rutrum nec. Integer a nulla sit amet dui lobortis tempus ac eget nisi. Quisque in purus leo. Phasellus at viverra lectus.",
            avatar: "/assets/images/avatars/avatar_5.jpg",
          },
        ]}
      />
    </section>
  );
}
