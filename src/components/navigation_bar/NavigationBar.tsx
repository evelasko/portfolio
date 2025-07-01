'use client';

import { useState } from 'react';
import { LinkField } from "@prismicio/client";
import { isFilled } from "@prismicio/helpers";
import { PrismicNextLink } from "@prismicio/next";
import { motion, AnimatePresence } from 'motion/react';
import { TYPOGRAPHY } from '@/lib/typography';
import { AlignJustify, icons } from 'lucide-react';
import { PrismicSocialLink } from '@/lib/types';

interface NavigationBarProps {
  links: LinkField[];
  socialLinks?: PrismicSocialLink[];
}

export default function NavigationBar({ links, socialLinks = [] }: NavigationBarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Component to render dynamic icon from Lucide
  const DynamicIcon = ({ iconName, className }: { iconName: string; className?: string }) => {
    const LucideIcon = icons[iconName as keyof typeof icons];
    return LucideIcon ? <LucideIcon className={className} /> : null;
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden l:flex l:justify-between l:items-center l:w-full l:px-8 l:py-6">
        {/* Main Navigation Links - Expand to take available space */}
        <div className="flex space-x-12 flex-1">
          {links.map((link, index) => 
            isFilled.link(link) ? (
              <PrismicNextLink 
                key={index} 
                field={link}
                className={`${TYPOGRAPHY.mono18} text-white uppercase tracking-wide hover:underline transition-all duration-200`}
              >
                {link.text || 'Link'}
              </PrismicNextLink>
            ) : null
          )}
        </div>

        {/* Social Links - Shrink to fit content */}
        <div className="flex space-x-8 flex-shrink-0">
          {socialLinks.map((socialLink, index) => 
            isFilled.link(socialLink.link) ? (
              <PrismicNextLink 
                key={index} 
                field={socialLink.link}
                className={`${TYPOGRAPHY.mono18} text-white uppercase tracking-wide hover:underline transition-all duration-200 flex items-center`}
              >
                {isFilled.keyText(socialLink.icon) ? (
                  <DynamicIcon iconName={socialLink.icon} className="w-5 h-5" />
                ) : (
                  socialLink.link.text || 'Link'
                )}
              </PrismicNextLink>
            ) : null
          )}
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="flex l:hidden justify-between items-center w-full px-6 py-4">
        {/* Logo/Brand Name */}
        <div className={`${TYPOGRAPHY.h4} text-white uppercase tracking-wide`}>
          MARK ASHTON
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
            className="fixed inset-0 bg-black z-50 flex flex-col l:hidden"
          >
            {/* Header with Brand and Close Button */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-800">
              <div className={`${TYPOGRAPHY.h4} text-white uppercase tracking-wide`}>
                MARK ASHTON
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
                {links.map((link, index) => 
                  isFilled.link(link) ? (
                    <motion.div
                      key={index}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 + (index * 0.1), duration: 0.3 }}
                    >
                      <PrismicNextLink 
                        field={link}
                        onClick={closeMobileMenu}
                        className={`${TYPOGRAPHY.menu} text-white uppercase tracking-wider`}
                      >
                        {link.text || 'Link'}
                      </PrismicNextLink>
                    </motion.div>
                  ) : null
                )}
              </div>

              {/* Social Links */}
              {socialLinks.length > 0 && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.3 }}
                  className="flex justify-between w-full mt-12 px-8"
                >
                  {socialLinks.map((socialLink, index) => 
                    isFilled.link(socialLink.link) ? (
                      <PrismicNextLink 
                        key={index}
                        field={socialLink.link}
                        onClick={closeMobileMenu}
                        className={`${TYPOGRAPHY.h7} text-white uppercase tracking-wider flex items-center`}
                      >
                        {isFilled.keyText(socialLink.icon) ? (
                          <DynamicIcon iconName={socialLink.icon} className="w-6 h-6" />
                        ) : (
                          socialLink.link.text || 'Link'
                        )}
                      </PrismicNextLink>
                    ) : null
                  )}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}