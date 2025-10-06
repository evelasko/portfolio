"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TYPOGRAPHY } from "@/lib/typography";
import { AlignJustify, icons } from "lucide-react";
import Link from "next/link";
import { NavigationLink, SocialLink } from "@/lib/types";
import { cn } from "@/lib/utils";

interface NavigationBarProps {
  links: NavigationLink[];
  socialLinks?: SocialLink[];
}

export default function NavigationBarStatic({
  links,
  socialLinks = [],
}: NavigationBarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Component to render dynamic icon from Lucide
  const DynamicIcon = ({
    iconName,
    className,
  }: {
    iconName: string;
    className?: string;
  }) => {
    const LucideIcon = icons[iconName as keyof typeof icons];
    return LucideIcon ? <LucideIcon className={className} /> : null;
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden l:flex l:items-center l:w-full l:px-4 l:py-2 fixed top-0 left-0 right-0 z-50 bg-transparent">
        {/* Logo - Extreme Left */}
        <div
          className={cn(
            "mono-18 !font-sans font-extrabold",
            "w-[160px]",
            "text-white !mb-0 uppercase tracking-wide",
            "flex items-center justify-start mb-[40px]"
          )}
        >
          E. VELASCO
        </div>

        {/* Navigation Links - Center, Evenly Distributed */}
        <div className="flex-1 flex justify-around px-12 items-center">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className={cn(
                TYPOGRAPHY.mono18,
                "text-white !mb-0 uppercase tracking-tighter hover:underline transition-all duration-200"
              )}
            >
              {link.label || "Link"}
            </Link>
          ))}
        </div>

        {/* Social Links - Extreme Right */}
        <div className="flex space-x-4 justify-end items-center">
          {socialLinks.map((socialLink, index) => (
            <Link
              key={index}
              href={socialLink.href}
              className={cn(
                TYPOGRAPHY.mono18,
                "text-white !mb-0 uppercase tracking-tighter hover:underline transition-all duration-200 flex items-center"
              )}
            >
              {socialLink.label}
              {socialLink.icon && (
                <DynamicIcon iconName={socialLink.icon} className="w-5 h-5" />
              )}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile and Tablet Navigation */}
      <nav className="flex l:hidden justify-between items-center w-full px-6 py-2 fixed top-0 left-0 right-0 z-50 bg-black">
        {/* Logo/Brand Name */}
        <div
          className={cn(TYPOGRAPHY.h4, "text-white uppercase tracking-wide")}
        >
          E. VELASCO
        </div>

        {/* Hamburger Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="flex flex-col justify-center items-center w-8 h-8 space-y-1"
          aria-label="Toggle menu"
        >
          <AlignJustify className="w-6 h-6 text-white" />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-50 flex flex-col"
          >
            {/* Header with Brand and Close Button */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-800">
              <div
                className={cn(
                  TYPOGRAPHY.h4,
                  "text-white uppercase tracking-wide"
                )}
              >
                E. VELASCO
              </div>

              <button
                onClick={closeMobileMenu}
                className="w-8 h-8 flex items-center justify-center"
                aria-label="Close menu"
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Menu Content */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="flex-1 flex flex-col justify-center items-center space-y-8 px-6"
            >
              {/* Main Navigation Links */}
              <div className="flex flex-col space-y-4 w-full items-end mb-32">
                {links.map((link, index) => (
                  <motion.div
                    key={index}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      onClick={closeMobileMenu}
                      className={cn(
                        TYPOGRAPHY.menu,
                        "text-white uppercase tracking-wider"
                      )}
                    >
                      {link.label || "Link"}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              {socialLinks.length > 0 && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.3 }}
                  className="flex justify-between w-full mt-12 px-8"
                >
                  {socialLinks.map((socialLink, index) => (
                    <Link
                      key={index}
                      href={socialLink.href}
                      onClick={closeMobileMenu}
                      className={cn(
                        TYPOGRAPHY.h7,
                        "text-white uppercase tracking-wider flex items-center"
                      )}
                    >
                      {socialLink.icon ? (
                        <DynamicIcon
                          iconName={socialLink.icon}
                          className="w-6 h-6"
                        />
                      ) : (
                        socialLink.label || "Link"
                      )}
                    </Link>
                  ))}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
