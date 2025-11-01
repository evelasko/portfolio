/**
 * Google Analytics 4 Configuration
 * Centralized configuration for GA4 tracking
 */

/**
 * GA4 Measurement ID from environment variables
 */
export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ||
  process.env.GOOGLE_MEASUREMENT_ID;

/**
 * Check if GA4 is enabled
 */
export const isGAEnabled = (): boolean => {
  return !!GA_MEASUREMENT_ID && process.env.NODE_ENV === "production";
};

/**
 * Privacy-friendly GA4 configuration
 * Anonymizes IPs and respects user privacy
 */
export const GA_CONFIG = {
  // Anonymize IP addresses (privacy-friendly)
  anonymize_ip: true,

  // Cookie settings for GDPR compliance
  cookie_flags: "SameSite=None;Secure",

  // Cookie expiration (in seconds) - 2 years default, reduced to 90 days for privacy
  cookie_expires: 7776000, // 90 days

  // Allow Google to use data for advertising
  allow_google_signals: false,

  // Allow ad personalization
  allow_ad_personalization_signals: false,
} as const;

/**
 * Debug mode configuration
 */
export const GA_DEBUG = process.env.NODE_ENV === "development";
