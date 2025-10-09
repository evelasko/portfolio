"use client";

import { motion } from "motion/react";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { TYPOGRAPHY } from "@/lib/typography";
import { Button } from "@/components/ui/button";

interface SimpleCardProps {
  icon: keyof typeof LucideIcons;
  title: string;
  subtitle?: string;
  bodyText: string;
  buttonLabel: string;
  buttonLink: string;
}

/**
 * BentoCard
 * A card component featuring an icon, title, subtitle, body text, and call-to-action button
 *
 * @param icon - Lucide icon name as string
 * @param title - Card title (H6 typography)
 * @param subtitle - Optional subtitle
 * @param bodyText - Card body text (supports markdown bold with **)
 * @param buttonLabel - Button label text
 * @param buttonLink - Button link URL
 */
export default function SimpleCard({
  icon,
  title,
  subtitle,
  bodyText,
  buttonLabel,
  buttonLink,
}: SimpleCardProps) {
  // Dynamically get the icon component
  const IconComponent = LucideIcons[icon] as LucideIcons.LucideIcon;

  // Convert markdown bold (**text**) to actual bold tags
  const formatBodyText = (text: string) => {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return (
          <strong key={index} style={{ fontWeight: "var(--font-weight-bold)" }}>
            {part}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <motion.div
      className="relative flex flex-col p-6 m:p-8 l:p-10 rounded-2xl bg-white-98 border border-black-10 hover:border-black-20 transition-colors duration-300"
      style={{
        backgroundColor: "var(--color-white-98)",
        borderColor: "var(--color-black-10)",
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}
      viewport={{ once: true, margin: "-50px" }}
    >
      {/* Icon */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.4,
          delay: 0.1,
          ease: "easeOut",
        }}
        viewport={{ once: true }}
      >
        <div
          className="inline-flex items-center justify-center w-14 h-14 l:w-16 l:h-16 rounded-xl"
          style={{
            backgroundColor: "var(--color-orange-100)",
          }}
        >
          {IconComponent && (
            <IconComponent
              size={32}
              strokeWidth={1.5}
              color="var(--color-white-100)"
              className="l:w-9 l:h-9"
            />
          )}
        </div>
      </motion.div>

      {/* Title */}
      <motion.h3
        className={`${TYPOGRAPHY.h6} leading-[1.1em] mb-3`}
        style={{
          marginBottom: "12px",
        }}
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.4,
          delay: 0.2,
          ease: "easeOut",
        }}
        viewport={{ once: true }}
      >
        {title}
      </motion.h3>

      {/* Subtitle (if provided) */}
      {subtitle && (
        <motion.p
          className={`${TYPOGRAPHY.text18} mb-3`}
          style={{
            color: "var(--color-black-70)",
            marginBottom: "12px",
          }}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: 0.25,
            ease: "easeOut",
          }}
          viewport={{ once: true }}
        >
          {subtitle}
        </motion.p>
      )}

      {/* Body Text */}
      <motion.p
        className={`${TYPOGRAPHY.text18} flex-grow mb-6`}
        style={{
          color: "var(--color-black-80)",
          marginBottom: "24px",
        }}
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.4,
          delay: 0.3,
          ease: "easeOut",
        }}
        viewport={{ once: true }}
      >
        {formatBodyText(bodyText)}
      </motion.p>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.4,
          delay: 0.35,
          ease: "easeOut",
        }}
        viewport={{ once: true }}
      >
        <Button
          asChild
          variant="outline"
          size="default"
          className={`${TYPOGRAPHY.mono16} uppercase tracking-wider transition-colors duration-300 [&:hover]:!bg-[var(--color-black-100)] [&:hover]:!text-[var(--color-white-100)] [&:hover]:!border-[var(--color-black-100)]`}
          style={{
            borderColor: "var(--color-black-90)",
            color: "var(--color-black-90)",
          }}
        >
          <Link href={buttonLink}>{buttonLabel}</Link>
        </Button>
      </motion.div>
    </motion.div>
  );
}
