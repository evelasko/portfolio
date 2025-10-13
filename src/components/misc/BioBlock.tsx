"use client";

import React from "react";
import { SocialLink, NavigationLink } from "@/lib/types/navigation";
import { motion } from "motion/react";
import { TYPOGRAPHY } from "@/lib/typography";
import Image from "next/image";
import { icons } from "lucide-react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { LocaleString } from "@/lib/types/intl";

export default function BioBlock({
  photo_path,
  over_photo_text,
  over_photo_graphic,
  graphic_width = 100,
  graphic_height = 100,
  short_bio,
  social_links,
  other_links,
  margin = 0,
}: {
  photo_path: string;
  over_photo_text?: string;
  over_photo_graphic?: string;
  graphic_width?: number;
  graphic_height?: number;
  short_bio: string;
  social_links: SocialLink[];
  other_links: NavigationLink[];
  margin?: number;
}) {
  const locale = useLocale();
  const localeString = locale as LocaleString;
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

  // Format markdown-like text to JSX
  const formatBioText = (text: string) => {
    // Split text into paragraphs
    const paragraphs = text.split("\n\n");

    return paragraphs.map((paragraph, pIndex) => {
      // Process the paragraph for inline formatting
      const processInlineFormatting = (
        text: string
      ): (string | React.ReactElement)[] => {
        const result: (string | React.ReactElement)[] = [];
        let remaining = text;
        let tempKeyIndex = 0;

        while (remaining.length > 0) {
          // Check for bold (**text**)
          const boldMatch = remaining.match(/\*\*(.*?)\*\*/);
          if (boldMatch && boldMatch.index !== undefined) {
            // Add text before bold
            if (boldMatch.index > 0) {
              result.push(remaining.slice(0, boldMatch.index));
            }
            // Add bold text
            result.push(
              <span
                key={`bold-${tempKeyIndex++}`}
                className="text-white font-medium"
              >
                {boldMatch[1]}
              </span>
            );
            remaining = remaining.slice(boldMatch.index + boldMatch[0].length);
            continue;
          }

          // Check for links [text](url)
          const linkMatch = remaining.match(/\[(.*?)\]\((.*?)\)/);
          if (linkMatch && linkMatch.index !== undefined) {
            // Add text before link
            if (linkMatch.index > 0) {
              result.push(remaining.slice(0, linkMatch.index));
            }
            // Add link
            result.push(
              <a
                key={`link-${tempKeyIndex++}`}
                href={linkMatch[2]}
                className="text-black-40 hover:text-white transition-colors duration-200"
              >
                {linkMatch[1]}
              </a>
            );
            remaining = remaining.slice(linkMatch.index + linkMatch[0].length);
            continue;
          }

          // Check for inline code (`code`)
          const codeMatch = remaining.match(/`(.*?)`/);
          if (codeMatch && codeMatch.index !== undefined) {
            // Add text before code
            if (codeMatch.index > 0) {
              result.push(remaining.slice(0, codeMatch.index));
            }
            // Add code
            result.push(
              <code
                key={`code-${tempKeyIndex++}`}
                className={`${TYPOGRAPHY.mono18} text-black-40`}
              >
                {codeMatch[1]}
              </code>
            );
            remaining = remaining.slice(codeMatch.index + codeMatch[0].length);
            continue;
          }

          // No more matches, add remaining text
          result.push(remaining);
          break;
        }

        return result;
      };

      const formattedContent = processInlineFormatting(paragraph);

      return (
        <p key={`p-${pIndex}`} className="mb-4 last:mb-0 text-black-40">
          {formattedContent}
        </p>
      );
    });
  };

  // Spring animation settings
  const photoSpringSettings = {
    type: "spring" as const,
    stiffness: 200,
    damping: 65,
    mass: 1,
  };

  const overPhotoSpringSettings = {
    type: "spring" as const,
    stiffness: 200,
    damping: 65,
    mass: 1,
  };

  return (
    <div
      className="w-full bg-black-100 p-12"
      style={{
        paddingTop: `${margin}px`,
        paddingBottom: `${margin}px`,
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
              transition: photoSpringSettings,
            },
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
                      transition: overPhotoSpringSettings,
                    },
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
                      transition: overPhotoSpringSettings,
                    },
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
                  duration: 0.6,
                },
              },
            }}
            className={`${TYPOGRAPHY.h9} text-black-40 pb-12 mb-12 border-b border-black-80`}
          >
            {formatBioText(short_bio)}
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
                        delay: 0.5 + index * 0.1,
                      },
                    },
                  }}
                >
                  {socialLink.href && socialLink.icon && (
                    <Link
                      href={socialLink.href}
                      className="text-black-40 hover:text-white transition-colors duration-200"
                    >
                      <DynamicIcon
                        iconName={socialLink.icon}
                        className="w-6 h-6"
                      />
                    </Link>
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
                        delay: 0.7 + index * 0.1,
                      },
                    },
                  }}
                >
                  {link.href && (
                    <Link
                      href={link.href}
                      className={`${TYPOGRAPHY.mono18} uppercase text-black-30 hover:text-white transition-colors duration-200`}
                    >
                      {link.label?.[localeString] || "LINK"}
                    </Link>
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
