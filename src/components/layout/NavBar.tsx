"use client";

import { useState, useEffect, useRef, RefObject } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { TYPOGRAPHY } from "@/lib/typography";
import { AlignJustify, icons } from "lucide-react";
import Link from "next/link";
import { NavigationLink, SocialLink } from "@/lib/types";
import { cn } from "@/lib/utils";
import Evelasco from "@/components/graphics/Evelasco";

interface NavigationBarProps {
  links: NavigationLink[];
  socialLinks?: SocialLink[];
  heroRef?: RefObject<HTMLDivElement | null>;
}

export default function NavBar({
  links,
  socialLinks = [],
  heroRef,
}: NavigationBarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isHeroInView, setIsHeroInView] = useState(true);
  const lastScrollYRef = useRef(0);

  // Scroll direction detection and hero visibility tracking
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide/show nav based on scroll direction
      if (currentScrollY > lastScrollYRef.current && currentScrollY > 70) {
        // Scrolling down
        setIsNavVisible(false);
      } else {
        // Scrolling up
        setIsNavVisible(true);
      }

      // Check if hero is in view
      if (heroRef?.current) {
        const heroRect = heroRef.current.getBoundingClientRect();
        const heroBottom = heroRect.bottom;
        // Hero is out of view when its bottom is above the nav height
        setIsHeroInView(heroBottom > 70);
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initial check
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [heroRef]);

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
      <motion.nav
        className="hidden l:flex l:items-center l:w-full l:px-4 l:py-2 l:h-[70px] fixed top-0 left-0 right-0 z-50 bg-transparent"
        initial={{ y: 0 }}
        animate={{
          y: isNavVisible ? 0 : "-100%",
        }}
        transition={{
          duration: 0.3,
          ease: "easeOut",
        }}
      >
        {/* Logo - Extreme Left (Hidden when hero is in view) */}
        <motion.div
          className="overflow-hidden"
          initial={{ width: 0, opacity: 0 }}
          animate={{
            width: isHeroInView ? 0 : 102,
            opacity: isHeroInView ? 0 : 1,
          }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
        >
          <Evelasco />
        </motion.div>

        {/* Navigation Links - Spread when hero in view, aligned right when hero out of view */}
        <motion.div
          className="flex-1 flex items-center px-12"
          animate={{
            justifyContent: isHeroInView ? "space-around" : "flex-end",
            gap: isHeroInView ? undefined : "2rem",
          }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
        >
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
        </motion.div>

        {/* Social Links - Extreme Right (Always static) */}
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
      </motion.nav>

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
