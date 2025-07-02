'use client';

import { PrismicSocialLink } from "@/lib/types";
import { RichTextField, LinkField } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
import { isFilled } from "@prismicio/client";
import { motion } from 'motion/react';
import { TYPOGRAPHY } from '@/lib/typography';
import Image from "next/image";
import { icons } from 'lucide-react';

export default function BioBlock({ 
  photo_path, 
  over_photo_text, 
  over_photo_graphic, 
  graphic_width = 100, 
  graphic_height = 100, 
  short_bio, 
  social_links, 
  other_links,
  margin = 0
}: { 
  photo_path: string, 
  over_photo_text?: string, 
  over_photo_graphic?: string, 
  graphic_width?: number, 
  graphic_height?: number, 
  short_bio: RichTextField, 
  social_links: PrismicSocialLink[], 
  other_links: LinkField[],
  margin?: number
}) {
  // Component to render dynamic icon from Lucide
  const DynamicIcon = ({ iconName, className }: { iconName: string; className?: string }) => {
    const LucideIcon = icons[iconName as keyof typeof icons];
    return LucideIcon ? <LucideIcon className={className} /> : null;
  };

  // Spring animation settings
  const photoSpringSettings = {
    type: "spring" as const,
    stiffness: 200,
    damping: 65,
    mass: 1
  };

  const overPhotoSpringSettings = {
    type: "spring" as const,
    stiffness: 200,
    damping: 65,
    mass: 1
  };

  return (
    <div 
      className="w-full bg-black-100 p-12"
      style={{ 
        paddingTop: `${margin}px`, 
        paddingBottom: `${margin}px` 
      }}
    >
      <div className="flex flex-col l:flex-row m:flex-row gap-8 l:gap-12">
        {/* Photo Section - 40% width on medium+ screens, full width on mobile */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0, y: 150, scale: 1.4 },
            visible: { 
              opacity: 1, 
              y: 0,
              scale: 1,
              transition: photoSpringSettings
            }
          }}
          className="relative w-full m:w-[40%] l:w-[40%] aspect-[1/1.5] overflow-hidden rounded-lg"
        >
          {/* Main Photo with Black & White Effect */}
          <Image 
            src={photo_path} 
            alt="Bio photo"
            fill
            className="object-cover grayscale"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
          
          {/* Over Photo Elements - Half width of photo container */}
          <div className="absolute inset-0 flex flex-col justify-center items-center">
            <div className="w-1/2 flex flex-col items-center">
              {/* Over Photo Graphic */}
              {over_photo_graphic && (
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={{
                    hidden: { opacity: 0, y: 300, scale: 0.9 },
                    visible: { 
                      opacity: 1, 
                      y: 0,
                      scale: 1,
                      transition: overPhotoSpringSettings
                    }
                  }}
                  className="mb-4"
                >
                  <Image 
                    src={over_photo_graphic}
                    alt="Over photo graphic"
                    width={graphic_width}
                    height={graphic_height}
                    className="object-contain"
                  />
                </motion.div>
              )}

              {/* Over Photo Text */}
              {over_photo_text && (
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={{
                    hidden: { opacity: 0, y: 160, scale: 0.9 },
                    visible: { 
                      opacity: 1, 
                      y: 0,
                      scale: 1,
                      transition: overPhotoSpringSettings
                    }
                  }}
                  className={`${TYPOGRAPHY.mono14} text-white-96 text-center`}
                >
                  {over_photo_text}
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Content Section - Takes remaining space */}
        <div className="flex-1 space-y-8">
          {/* Bio Text */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: {
                  type: "tween",
                  ease: "easeInOut",
                  duration: 0.6
                }
              }
            }}
            className={`${TYPOGRAPHY.h9} text-black-40 pb-12 mb-12 border-b border-black-80`}
          >
            <PrismicRichText
              field={short_bio}
              components={{
                paragraph: ({ children }) => <p className="mb-4 last:mb-0 text-black-40">{children}</p>,
                strong: ({ children }) => <span className="text-white font-medium">{children}</span>,
                hyperlink: ({ children, node }) => (
                  <a 
                    href={node.data.url || '#'} 
                    className="text-black-40 hover:text-white transition-colors duration-200"
                  >
                    {children}
                  </a>
                ),
                label: ({ children, node }) => {
                  if (node.data.label === 'code') {
                    return <code className={`${TYPOGRAPHY.mono18} text-black-40`}>{children}</code>;
                  }
                  return <span>{children}</span>;
                }
              }}
            />
          </motion.div>

          {/* Social Links */}
          {social_links.length > 0 && (
            <div className="flex gap-12 flex-wrap pb-4">
              {social_links.map((socialLink, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: { 
                      opacity: 1, 
                      y: 0,
                      transition: {
                        type: "spring",
                        duration: 1,
                        bounce: 0.2,
                        delay: 0.5 + (index * 0.1)
                      }
                    }
                  }}
                >
                  {isFilled.link(socialLink.link) && isFilled.keyText(socialLink.icon) && (
                    <PrismicNextLink 
                      field={socialLink.link}
                      className="text-black-40 hover:text-white transition-colors duration-200"
                    >
                      <DynamicIcon 
                        iconName={socialLink.icon} 
                        className="w-6 h-6"
                      />
                    </PrismicNextLink>
                  )}
                </motion.div>
              ))}
            </div>
          )}

          {/* Other Links */}
          {other_links.length > 0 && (
            <div className="flex gap-12 flex-wrap">
              {other_links.map((link, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: { 
                      opacity: 1, 
                      y: 0,
                      transition: {
                        type: "spring",
                        duration: 1,
                        bounce: 0.2,
                        delay: 0.7 + (index * 0.1)
                      }
                    }
                  }}
                >
                  {isFilled.link(link) && (
                    <PrismicNextLink 
                      field={link}
                      className={`${TYPOGRAPHY.mono18} uppercase text-black-30 hover:text-white transition-colors duration-200`}
                    >
                      {link.text || 'LINK'}
                    </PrismicNextLink>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}