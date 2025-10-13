import Link from "next/link";
import { TYPOGRAPHY } from "@/lib/typography";
import { legalLinks, navigation } from "@/lib/structure";
import { INFO } from "@/content/info";
import EnriqueVelasco from "../graphics/EnriqueVelasco";
import Evelasco from "../graphics/Evelasco";
import { ClipboardCopy, Mail, Phone } from "lucide-react";
import clsx from "clsx";
import DynamicIcon from "./DynamicIcon";
import { LocaleString } from "@/lib/types/intl";
import { Fragment } from "react";
/**
 * Footer Component
 * @param variant - "full" | "simple" | "minimal" - Controls footer layout
 * @param copyrightText - string, TYPOGRAPHY.text14, color black-50
 * @returns Footer component
 */
export default function Footer({
  locale,
  variant = "full",
  copyrightText,
}: {
  locale: LocaleString;
  variant?: "full" | "simple" | "minimal";
  copyrightText: string;
}) {
  const showHeading = variant === "full";
  const showContent = variant === "full" || variant === "simple";
  const contentBgClass =
    variant === "simple" ? "bg-white-98 pt-24 mt-24" : "bg-white";
  const borderClass = variant === "full" ? "border-t" : "border-t-0";

  return (
    <footer className={clsx("bg-white mt-24 border-gray-100", borderClass)}>
      {/* Heading Row - Independent */}
      {showHeading && (
        <div className="px-2 py-16 m:py-20 l:py-24 w-full flex justify-center">
          <div className="md:hidden w-full">
            <Evelasco color="var(--color-black-90)" />
          </div>
          <div className="hidden md:block w-full">
            <EnriqueVelasco color="var(--color-black-90)" />
          </div>
        </div>
      )}
      {/* Content Area - Contact Info, Physical Address, Navigation Links, Social Links */}
      {showContent && (
        <div className={clsx("mx-auto px-6 m:px-8 l:px-12", contentBgClass)}>
          {/* Content Row - 4 columns */}
          <div className="grid grid-cols-2 m:grid-cols-2 l:grid-cols-4 gap-8 m:gap-12 l:gap-24 space-y-6 m:space-y-0 pb-16 m:pb-20 l:pb-24">
            {/* Column 1: Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Mail className="text-black-70" />
                <p className={`${TYPOGRAPHY.text18} text-black-90`}>
                  {INFO.email}
                </p>
                <button
                  onClick={() => navigator.clipboard.writeText(INFO.email)}
                  className="opacity-40 hover:opacity-70 transition-opacity"
                  aria-label="Copy email"
                >
                  <ClipboardCopy size={16} />
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <Phone className="text-black-70" />
                <p className={`${TYPOGRAPHY.text18} text-black-90`}>
                  {INFO.phone}
                </p>
                <button
                  onClick={() => navigator.clipboard.writeText(INFO.phone)}
                  className="opacity-40 hover:opacity-70 transition-opacity"
                  aria-label="Copy phone"
                >
                  <ClipboardCopy size={16} />
                </button>
              </div>
            </div>

            {/* Column 2: Physical Address */}
            <div className="space-y-4">
              <p className={`${TYPOGRAPHY.text18} text-black-90`}>
                {INFO.address.split("\n").map((line, index) => (
                  <Fragment key={index}>
                    {line}
                    <br />
                  </Fragment>
                ))}
              </p>
            </div>

            {/* Column 3: Navigation Links */}
            <div className="space-y-4 mr-6 m:mr-0 text-right">
              {navigation.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className={clsx(
                    TYPOGRAPHY.mono18,
                    "uppercase",
                    "text-black-90 hover:text-orange-100 hover:underline transition-all duration-200 block"
                  )}
                >
                  {link.label?.[locale]}
                </Link>
              ))}
            </div>

            {/* Column 4: Social Links */}
            <div className="space-y-4">
              {INFO.social.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className={`${TYPOGRAPHY.text18} text-black-90 hover:text-orange-100 transition-colors block`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {(link.icon && (
                    <DynamicIcon iconName={link.icon} className="w-6 h-6" />
                  )) ||
                    link.label?.[locale]}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Section with white-98 background */}
      <div className="bg-white-98 border-gray-100">
        <div
          className={clsx(
            "max-w-7xl mx-auto px-6 m:px-8 l:px-12 py-8",
            variant === "simple" ? "border-t border-t-black-10" : "border-t-0"
          )}
        >
          <div className="flex flex-col space-y-6 m:space-y-0 m:flex-row m:items-center m:justify-between">
            {/* Legal Links */}
            <div className="flex flex-col space-y-4 m:space-y-0 m:flex-row m:items-center m:space-x-8">
              {legalLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className={`${TYPOGRAPHY.text14} text-black-90 hover:text-black-50 transition-colors`}
                >
                  {link.label?.[locale]}
                </Link>
              ))}
            </div>

            {/* Copyright and Back to Top */}
            <div className="flex items-center space-x-4">
              <p className={`${TYPOGRAPHY.text14} text-black-90 leading-none`}>
                {copyrightText}
              </p>

              {/* Back to top button */}
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="opacity-40 hover:opacity-70 transition-opacity flex items-center justify-center"
                aria-label="Back to top"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="flex-shrink-0"
                >
                  <path d="M8 2.5a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-1 0V4.707L3.354 8.854a.5.5 0 1 1-.708-.708l4.5-4.5A.5.5 0 0 1 8 3.5z" />
                  <path d="M7.646 3.146a.5.5 0 0 1 .708 0l4.5 4.5a.5.5 0 0 1-.708.708L8 4.207 3.854 8.354a.5.5 0 1 1-.708-.708l4.5-4.5z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
