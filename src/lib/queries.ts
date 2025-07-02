import type * as prismic from "@prismicio/client";
import { createClient } from "@/prismicio";
import type { 
  SettingsDocument, 
  SettingsDocumentDataMainNavigationItem,
  TestimonialDocument 
} from "../../prismicio-types";
import type { PrismicSocialLink } from "./types";

/**
 * Query options that allow passing an existing client
 */
interface QueryOptions {
  client?: prismic.Client;
}

/**
 * Fetches the social links from the settings document
 * 
 * @param options - Query options including optional client
 * @returns Promise containing the social links data mapped to PrismicSocialLink
 */
export async function getSocialLinks(
  options: QueryOptions = {}
): Promise<PrismicSocialLink[]> {
  const client = options.client || createClient();
  
  try {
    const settings = await client.getSingle<SettingsDocument>("settings");
    const socialLinks = settings.data.social_links || [];
    
    // Map the Prismic data to our custom type
    return socialLinks.map((item): PrismicSocialLink => ({
      icon: item.icon_name,
      link: item.link,
    }));
  } catch (error) {
    console.error("Error fetching social links:", error);
    return [];
  }
}

/**
 * Fetches the main navigation links from the settings document
 * 
 * @param options - Query options including optional client
 * @returns Promise containing the navigation links data
 */
export async function getNavigationLinks(
  options: QueryOptions = {}
): Promise<SettingsDocumentDataMainNavigationItem[]> {
  const client = options.client || createClient();
  
  try {
    const settings = await client.getSingle<SettingsDocument>("settings");
    return settings.data.main_navigation || [];
  } catch (error) {
    console.error("Error fetching navigation links:", error);
    return [];
  }
}

/**
 * Fetches the complete settings document
 * 
 * @param options - Query options including optional client
 * @returns Promise containing the full settings document
 */
export async function getSettings(
  options: QueryOptions = {}
): Promise<SettingsDocument | null> {
  const client = options.client || createClient();
  
  try {
    const settings = await client.getSingle<SettingsDocument>("settings");
    return settings;
  } catch (error) {
    console.error("Error fetching settings:", error);
    return null;
  }
}

/**
 * Fetches all published testimonial documents
 * 
 * @param options - Query options including optional client
 * @returns Promise containing all published testimonials
 */
export async function getTestimonials(
  options: QueryOptions = {}
): Promise<TestimonialDocument[]> {
  const client = options.client || createClient();
  
  try {
    const testimonials = await client.getAllByType<TestimonialDocument>("testimonial");
    return testimonials;
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }
}
