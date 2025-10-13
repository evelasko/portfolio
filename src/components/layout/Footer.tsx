"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { SocialLink } from "@/lib/types/navigation";
import { TYPOGRAPHY } from "@/lib/typography";
import { navigation, socialLinks as navSocialLinks } from "@/lib/navigation";
import EnriqueVelasco from "../graphics/EnriqueVelasco";
import Evelasco from "../graphics/Evelasco";
import { ClipboardCopy, Mail, Phone } from "lucide-react";
import clsx from "clsx";
import DynamicIcon from "./DynamicIcon";
/**
 * Footer Component
 * @param heading - string, p tag style TYPOGRAPHY.h1, color black-90
 * @param email - string, TYPOGRAPHY.text18, color black-90
 * @param phone - string, TYPOGRAPHY.text18, color black-90
 * @param address - string[], TYPOGRAPHY.text18, color black-50
 * @param showCurrentTime - boolean, show current time
 * @param socialLinks - SocialLink[], TYPOGRAPHY.text18, color black-90
 * @param copyrightText - string, TYPOGRAPHY.text14, color black-50
 * @returns Footer component
 */
export default function Footer({
  heading,
  email,
  phone,
  address,
  showCurrentTime,
  socialLinks,
  copyrightText,
}: {
  heading: string;
  email: string;
  phone: string;
  address: string[];
  showCurrentTime: boolean;
  socialLinks: SocialLink[];
  copyrightText: string;
}) {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentLocation, setCurrentLocation] = useState<string>("");

  useEffect(() => {
    if (showCurrentTime) {
      const updateTime = () => {
        const now = new Date();
        const timeString = now.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
        const locationString = `London (GMT)`;
        setCurrentTime(timeString);
        setCurrentLocation(locationString);
      };

      updateTime();
      const interval = setInterval(updateTime, 1000);

      return () => clearInterval(interval);
    }
  }, [showCurrentTime]);

  return (
    <footer className="bg-white border-t border-gray-100">
      {/* Heading Row - Independent */}
      <div className="px-2 py-16 m:py-20 l:py-24 w-full flex justify-center">
        <div className="md:hidden w-full">
          <Evelasco color="var(--color-black-90)" />
        </div>
        <div className="hidden md:block w-full">
          <EnriqueVelasco color="var(--color-black-90)" />
        </div>
      </div>
      <div className="mx-auto px-6 m:px-8 l:px-12">
        {/* Content Row - 4 columns */}
        <div className="grid grid-cols-1 m:grid-cols-2 l:grid-cols-4 gap-8 m:gap-12 l:gap-24 pb-16 m:pb-20 l:pb-24">
          {/* Column 1: Contact Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Mail className="text-black-70" />
              <p className={`${TYPOGRAPHY.text18} text-black-90`}>
                info@evelas.co
              </p>
              <button
                onClick={() => navigator.clipboard.writeText("info@evelas.co")}
                className="opacity-40 hover:opacity-70 transition-opacity"
                aria-label="Copy email"
              >
                <ClipboardCopy size={16} />
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <Phone className="text-black-70" />
              <p className={`${TYPOGRAPHY.text18} text-black-90`}>
                +34 609 971 307
              </p>
              <button
                onClick={() => navigator.clipboard.writeText("+34 609 971 307")}
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
              Calle Eduardo Rivas 14
            </p>
            <p className={`${TYPOGRAPHY.text18} text-black-90`}>28019 Madrid</p>
            <p className={`${TYPOGRAPHY.text18} text-black-90`}>Spain</p>
          </div>

          {/* Column 3: Navigation Links */}
          <div className="space-y-4 l:text-right">
            {navigation.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className={clsx(
                  TYPOGRAPHY.text18,
                  "font-bold",
                  "text-black-90 hover:text-orange-100 hover:underline transition-all duration-200 block"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Column 4: Social Links */}
          <div className="space-y-4">
            {navSocialLinks.map((link, index) => (
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
                  link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section with white-98 background */}
      <div className="bg-white-98 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 m:px-8 l:px-12 py-8">
          <div className="flex flex-col space-y-6 m:space-y-0 m:flex-row m:items-center m:justify-between">
            {/* Legal Links */}
            <div className="flex flex-col space-y-4 m:space-y-0 m:flex-row m:items-center m:space-x-8">
              <Link
                href="/privacy"
                className={`${TYPOGRAPHY.text14} text-black-90 hover:text-black-50 transition-colors`}
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className={`${TYPOGRAPHY.text14} text-black-90 hover:text-black-50 transition-colors`}
              >
                Terms & Conditions
              </Link>
              <Link
                href="/imprint"
                className={`${TYPOGRAPHY.text14} text-black-90 hover:text-black-50 transition-colors`}
              >
                Imprint
              </Link>
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
