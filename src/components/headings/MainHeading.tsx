'use client';

import { motion } from 'motion/react';
import { TYPOGRAPHY } from "@/lib/typography";

/**
 * MainHeading
 * padding: L: top 200 bottom 100, M & S: top 100 bottom 50
 * @param title - string, tag h2, TYPOGRAPHY.h8, color black-70, uppercase
 * @param subtitle - string, TYPOGRAPHY.h4, color black-90
 */
export default function MainHeading({ 
  title, 
  subtitle, 
  className 
}: { 
  title: string; 
  subtitle: string; 
  className?: string; 
}) {
  return (
    <section 
      className={`w-full main-heading ${className || ''}`}
      style={{ 
        paddingTop: '100px', 
        paddingBottom: '50px' 
      }}
    >
      {/* Title */}
      <motion.h2
        className={`${TYPOGRAPHY.h8} uppercase tracking-[0.3em]`}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.6,
          ease: "easeOut"
        }}
        viewport={{ once: true }}
      >
        {title}
      </motion.h2>

      {/* Subtitle */}
      {subtitle && subtitle.length > 0 && (
        <motion.div
          className={`${TYPOGRAPHY.h4}`}
          style={{ 
            color: 'var(--color-black-90)',
            fontWeight: 'var(--font-weight-bold)',
            lineHeight: '1.2em',
            letterSpacing: '-0.04em',
            marginBottom: '0'
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.6,
            delay: 0.2,
            ease: "easeOut"
          }}
          viewport={{ once: true }}
        >
          {subtitle}
        </motion.div>
      )}

      {/* Responsive Desktop Padding */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @media (min-width: 1200px) {
            .main-heading {
              padding-top: 200px !important;
              padding-bottom: 100px !important;
            }
          }
        `
      }} />
    </section>
  );
}