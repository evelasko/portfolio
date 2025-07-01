import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { isFilled, asDate, asText } from "@prismicio/client";
import { readingTime } from "reading-time-estimator";
import MainHero from "@/components/heroes/MainHero";
import MinimalHero from "@/components/heroes/MinimalHero";
import PhotoHero from "@/components/heroes/PhotoHero";
import ThoughtHero from "@/components/heroes/ThoughtHero";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {
  const { slice_type, variation } = slice;

  // Main variant (default)
  if (variation === "default") {
    // Extract image paths from group field
    const imagePaths = isFilled.group(slice.primary.image_paths) 
      ? slice.primary.image_paths.map(item => item.path || "").filter(Boolean)
      : [];

    // Validate required fields
    if (
      !isFilled.keyText(slice.primary.top_text) ||
      !isFilled.keyText(slice.primary.bottom_text) ||
      !isFilled.keyText(slice.primary.subtitle) ||
      !isFilled.keyText(slice.primary.link_to) ||
      (imagePaths.length === 0 && !isFilled.keyText(slice.primary.video_path))
    ) {
      return null;
    }

    return (
      <section
        data-slice-type={slice_type}
        data-slice-variation={variation}
      >
        <MainHero
          topText={slice.primary.top_text}
          bottomText={slice.primary.bottom_text}
          sideTextHorizontal="2K25"
          sideTextVertical="./portfolio"
          graphic={slice.primary.graphic_path || ""}
          graphicHeight={isFilled.number(slice.primary.graphic_height) ? slice.primary.graphic_height : 100}
          graphicWidth={isFilled.number(slice.primary.graphic_width) ? slice.primary.graphic_width : 100}
          subtitle={slice.primary.subtitle}
          images={imagePaths}
          link={slice.primary.link_to}
          video={isFilled.keyText(slice.primary.video_path) ? slice.primary.video_path : undefined}
          stayDuration={isFilled.number(slice.primary.slideshow_stay_duration) ? slice.primary.slideshow_stay_duration : 4000}
          transitionSpeed={isFilled.number(slice.primary.slideshow_transition_speed) ? slice.primary.slideshow_transition_speed : 1.2}
        />
      </section>
    );
  }

  // Minimal variant
  if (variation === "minimal") {
    // Validate required fields
    if (
      !isFilled.keyText(slice.primary.title) ||
      !isFilled.keyText(slice.primary.subtitle) ||
      !isFilled.keyText(slice.primary.image_path) ||
      !isFilled.keyText(slice.primary.link_to)
    ) {
      return null;
    }

    return (
      <section
        data-slice-type={slice_type}
        data-slice-variation={variation}
      >
        <MinimalHero
          title={slice.primary.title}
          subtitle={slice.primary.subtitle}
          image={slice.primary.image_path}
          link={slice.primary.link_to}
        />
      </section>
    );
  }

  // Photo variant
  if (variation === "photo") {
    // Validate required fields
    if (
      !isFilled.keyText(slice.primary.title) ||
      !isFilled.keyText(slice.primary.subtitle) ||
      !isFilled.keyText(slice.primary.image_path) ||
      !isFilled.keyText(slice.primary.photo_path) ||
      !isFilled.keyText(slice.primary.link_to)
    ) {
      return null;
    }

    return (
      <section
        data-slice-type={slice_type}
        data-slice-variation={variation}
      >
        <PhotoHero
          title={slice.primary.title}
          subtitle={slice.primary.subtitle}
          backgroundImage={slice.primary.image_path}
          photo={slice.primary.photo_path}
          link={slice.primary.link_to}
        />
      </section>
    );
  }

  // Thought variant
  if (variation === "thought") {
    let title = "";
    let coverImage = "";
    let leftInfoLabel = "";
    let leftInfoValue = "";
    let rightInfoLabel = "";
    let rightInfoValue = "";

    // Check if content relationship is filled and takes priority
    if (isFilled.contentRelationship(slice.primary.thought) && slice.primary.thought.data) {
      const thoughtData = slice.primary.thought.data;
      
      // Use content relationship data
      title = thoughtData.title || "";
      coverImage = thoughtData.cover_image_path || "";
      leftInfoLabel = "Published on";
      
      // Format date as 'July 13, 2025'
      if (isFilled.date(thoughtData.date_published)) {
        const date = asDate(thoughtData.date_published);
        leftInfoValue = date?.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long", 
          day: "numeric"
        }) || "";
      }
      
      rightInfoLabel = "Reading Time";
      
      // Calculate reading time from content
      if (isFilled.richText(thoughtData.content)) {
        const contentText = asText(thoughtData.content);
        const readingTimeResult = readingTime(contentText, 300);
        rightInfoValue = `${readingTimeResult.minutes} mins`;
      }
    } else {
      // Use fallback fields
      title = slice.primary.title || "";
      coverImage = slice.primary.cover_image_path || "";
      leftInfoLabel = slice.primary.left_info_label || "";
      leftInfoValue = slice.primary.left_info_value || "";
      rightInfoLabel = slice.primary.right_info_label || "";
      rightInfoValue = slice.primary.right_info_value || "";
    }

    // Validate we have required data
    if (!title || !coverImage) {
      return null;
    }

    return (
      <section
        data-slice-type={slice_type}
        data-slice-variation={variation}
      >
        <ThoughtHero
          title={title}
          coverImage={coverImage}
          leftInfoLabel={leftInfoLabel}
          leftInfoValue={leftInfoValue}
          rightInfoLabel={rightInfoLabel}
          rightInfoValue={rightInfoValue}
        />
      </section>
    );
  }

  return null;
};

export default Hero;
