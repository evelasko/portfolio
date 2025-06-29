'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { DynamicIcon, IconName } from 'lucide-react/dynamic';
import { SocialLink } from "@/lib/types";
import { TYPOGRAPHY } from '@/lib/typography';
import { ArrowUp, PhoneOutgoing, Send } from 'lucide-react';
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

        {/* Content Row - 4 columns on large/medium, 1 column on small */}
        <div className="grid grid-cols-1 m:grid-cols-4 l:grid-cols-4 gap-8 m:gap-12 l:gap-16 pb-16 m:pb-20 l:pb-24">
          
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
                <Send className="black-90" size={16}/>
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
                <PhoneOutgoing className="black-90" size={16}/>
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
          <div className="space-y-3 flex flex-col items-end pr-8">
            {socialLinks.map((link, index) => (
              <Link 
                key={index}
                href={link.url}
                className={`${TYPOGRAPHY.text18} text-black-90 hover:text-black-50 transition-colors`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.icon && <DynamicIcon name={link.icon as unknown as IconName} size={24} className="black-90"/>}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section with white-98 background */}
      <div className="bg-white-98 border-t pt-3 border-gray-100 uppercase">
        <div className="max-w-7xl mx-auto px-6 m:px-8 l:px-12 py-8">
          <div className="flex flex-col space-y-6 m:space-y-0 m:flex-row m:items-center m:justify-between">
            
            {/* Legal Links */}
            <div className="flex flex-col space-y-4 m:space-y-0 m:flex-row m:space-x-8">
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
            <div className="flex items-start space-x-4 justify-center">
              <p className={`${TYPOGRAPHY.text14} text-black-50 flex items-start`}>
                {copyrightText}
              </p>
              
              {/* Back to top button */}
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="opacity-40 hover:opacity-70 transition-opacity flex h-[18px] mt-1 ml-4"
                aria-label="Back to top"
              >
               <ArrowUp className="black-90" size={18}/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}