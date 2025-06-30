'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { SocialLink } from "@/lib/types";
import { TYPOGRAPHY } from '@/lib/typography';
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
    heading: string,
    email: string,
    phone: string,
    address: string[],
    showCurrentTime: boolean,
    socialLinks: SocialLink[],
    copyrightText: string
}) {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentLocation, setCurrentLocation] = useState<string>('');

  useEffect(() => {
    if (showCurrentTime) {
      const updateTime = () => {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-GB', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
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
      <div className="max-w-7xl mx-auto px-6 m:px-8 l:px-12">
        
        {/* Heading Row - Independent */}
        <div className="py-16 m:py-20 l:py-24">
          <p className={`${TYPOGRAPHY.h1} text-black-90 font-bold tracking-tight`}>
            {heading}
          </p>
        </div>

        {/* Content Row - Dynamic columns based on showCurrentTime */}
        <div className={`grid grid-cols-1 ${showCurrentTime ? 'm:grid-cols-4 l:grid-cols-4' : 'm:grid-cols-3 l:grid-cols-3'} gap-8 m:gap-12 l:gap-16 pb-16 m:pb-20 l:pb-24`}>
          
          {/* Column 1: Email and Phone Links */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <p className={`${TYPOGRAPHY.text18} text-black-90`}>
                {email}
              </p>
              <button 
                onClick={() => navigator.clipboard.writeText(email)}
                className="opacity-40 hover:opacity-70 transition-opacity"
                aria-label="Copy email"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M4 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/>
                </svg>
              </button>
            </div>
            
            <div className="flex items-center space-x-2">
              <p className={`${TYPOGRAPHY.text18} text-black-90`}>
                {phone}
              </p>
              <button 
                onClick={() => navigator.clipboard.writeText(phone)}
                className="opacity-40 hover:opacity-70 transition-opacity"
                aria-label="Copy phone"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M4 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Column 2: Current Time or Empty */}
          <div>
            {showCurrentTime && (
              <div>
                <p className={`${TYPOGRAPHY.text14} text-black-50 mb-1`}>
                  My current time
                </p>
                <p className={`${TYPOGRAPHY.text18} text-black-90 font-medium`}>
                  {currentTime} {currentLocation}
                </p>
              </div>
            )}
          </div>

          {/* Column 3: Physical Address */}
          <div className="space-y-2">
            {address.map((line, index) => (
              <p key={index} className={`${TYPOGRAPHY.text18} text-black-50`}>
                {line}
              </p>
            ))}
          </div>

          {/* Column 4: Social Links (Icons Only) */}
          <div className="space-y-3">
            {socialLinks.map((link, index) => (
              <Link 
                key={index}
                href={link.url}
                className={`${TYPOGRAPHY.text18} text-black-90 hover:text-black-50 transition-colors block`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.icon}
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
                href="/legal/privacy-policy"
                className={`${TYPOGRAPHY.text14} text-black-90 hover:text-black-50 transition-colors`}
              >
                Privacy Policy
              </Link>
              <Link 
                href="/legal/terms-and-conditions"
                className={`${TYPOGRAPHY.text14} text-black-90 hover:text-black-50 transition-colors`}
              >
                Terms & Conditions
              </Link>
              <Link 
                href="/legal/imprint"
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
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="opacity-40 hover:opacity-70 transition-opacity flex items-center justify-center"
                aria-label="Back to top"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="flex-shrink-0">
                  <path d="M8 2.5a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-1 0V4.707L3.354 8.854a.5.5 0 1 1-.708-.708l4.5-4.5A.5.5 0 0 1 8 3.5z"/>
                  <path d="M7.646 3.146a.5.5 0 0 1 .708 0l4.5 4.5a.5.5 0 0 1-.708.708L8 4.207 3.854 8.354a.5.5 0 1 1-.708-.708l4.5-4.5z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}