'use client';

import { motion } from 'motion/react';
import PortfolioButton from "../buttons/PortfolioButton";

/**
 * Connect Banner
 * 
 * @param primary_text - h6 tag, TYPOGRAPHY.h6, color white-98, animate fade from bottom (offset 190) with ease Spring (physics: stiffness: 200, damping: 60, mass: 1)
 * @param key_text - h4 tag, TYPOGRAPHY.h5, color and animation same as primary_text
 * @param cta_label - CTA label
 * @param cta_link - CTA link
 * @returns Connect Banner
 */
export default function ConnectBanner({
  primary_text, 
  key_text, 
  cta_label, 
  cta_link
}: {
  primary_text: string; 
  key_text: string; 
  cta_label: string; 
  cta_link: string;
}) {
  return (
    <section 
      className="w-full relative"
      style={{ 
        paddingTop: '200px', 
        paddingRight: '60px', 
        paddingBottom: '200px', 
        paddingLeft: '60px' 
      }}
    >
      {/* Desktop Layout (L) */}
      <div className="hidden l:grid l:grid-cols-2 l:gap-20 l:items-start">
        {/* Left Column - Primary Text */}
        <motion.h6
          className="text-h6-s m:text-h6-m l:text-h6-l"
          style={{ 
            color: 'var(--color-white-98)',
            fontWeight: 'var(--font-weight-bold)',
            lineHeight: '1.4em',
            letterSpacing: '-0.03em',
            marginBottom: '0'
          }}
          initial={{ opacity: 0, y: 190 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 200,
            damping: 60,
            mass: 1
          }}
          viewport={{ once: true }}
        >
          {primary_text}
        </motion.h6>

        {/* Right Column - Key Text and CTA */}
        <div className="flex flex-col gap-10">
          <motion.h4
            className="text-h5-s m:text-h5-m l:text-h5-l"
            style={{ 
              color: 'var(--color-white-98)',
              fontWeight: 'var(--font-weight-bold)',
              lineHeight: '1.4em',
              letterSpacing: '-0.04em',
              marginBottom: '0'
            }}
            initial={{ opacity: 0, y: 190 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 200,
              damping: 60,
              mass: 1
            }}
            viewport={{ once: true }}
          >
            {key_text}
          </motion.h4>

          <motion.div
            initial={{ opacity: 0, y: 148 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8,
              ease: [0.44, 0, 0.56, 1]
            }}
            viewport={{ once: true }}
          >
            <PortfolioButton variant="light" href={cta_link}>
              {cta_label}
            </PortfolioButton>
          </motion.div>
        </div>
      </div>

      {/* Tablet Layout (M) */}
      <div className="hidden m:flex l:hidden flex-col gap-16 items-center text-center">
        <motion.h6
          className="text-h6-s m:text-h6-m"
          style={{ 
            color: 'var(--color-white-98)',
            fontWeight: 'var(--font-weight-bold)',
            lineHeight: '1.4em',
            letterSpacing: '-0.03em',
            marginBottom: '0'
          }}
          initial={{ opacity: 0, y: 190 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 200,
            damping: 60,
            mass: 1
          }}
          viewport={{ once: true }}
        >
          {primary_text}
        </motion.h6>

        <motion.h4
          className="text-h5-s m:text-h5-m"
          style={{ 
            color: 'var(--color-white-98)',
            fontWeight: 'var(--font-weight-bold)',
            lineHeight: '1.4em',
            letterSpacing: '-0.04em',
            marginBottom: '0'
          }}
          initial={{ opacity: 0, y: 190 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 200,
            damping: 60,
            mass: 1
          }}
          viewport={{ once: true }}
        >
          {key_text}
        </motion.h4>

        <motion.div
          initial={{ opacity: 0, y: 148 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8,
            ease: [0.44, 0, 0.56, 1]
          }}
          viewport={{ once: true }}
        >
          <PortfolioButton variant="light" href={cta_link}>
            {cta_label}
          </PortfolioButton>
        </motion.div>
      </div>

      {/* Mobile Layout (S) */}
      <div className="flex m:hidden flex-col gap-12 items-center text-center">
        <motion.h6
          className="text-h6-s"
          style={{ 
            color: 'var(--color-white-98)',
            fontWeight: 'var(--font-weight-bold)',
            lineHeight: '1.4em',
            letterSpacing: '-0.03em',
            marginBottom: '0'
          }}
          initial={{ opacity: 0, y: 190 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 200,
            damping: 60,
            mass: 1
          }}
          viewport={{ once: true }}
        >
          {primary_text}
        </motion.h6>

        <motion.h4
          className="text-h5-s"
          style={{ 
            color: 'var(--color-white-98)',
            fontWeight: 'var(--font-weight-bold)',
            lineHeight: '1.4em',
            letterSpacing: '-0.04em',
            marginBottom: '0'
          }}
          initial={{ opacity: 0, y: 190 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 200,
            damping: 60,
            mass: 1
          }}
          viewport={{ once: true }}
        >
          {key_text}
        </motion.h4>

        <motion.div
          initial={{ opacity: 0, y: 148 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8,
            ease: [0.44, 0, 0.56, 1]
          }}
          viewport={{ once: true }}
        >
          <PortfolioButton variant="light" href={cta_link}>
            {cta_label}
          </PortfolioButton>
        </motion.div>
      </div>
    </section>
  );
}
