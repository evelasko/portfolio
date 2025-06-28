'use client';

import { motion } from 'motion/react';
import Link from "next/link";
import Image from "next/image";
/**
 * ThoughtCardMinimal
 * padding: L & M: 40px horizontal, 20px vertical, S: 20px horizontal, 10px vertical
 * @param title - string, TYPOGRAPHY.h6, color black-80
 * @param publishedAt - string, TYPOGRAPHY.text16, color black-40
 * @param image - string, image url
 * @param link - string, link url
 */
export default function ThoughtCardMinimal({ 
  title, 
  publishedAt, 
  image, 
  link
}: {
  title: string; 
  publishedAt: string; 
  image: string; 
  link: string;
}) {
  return (
    <Link href={link} className="block group">
      <motion.article 
        className="w-full"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.6,
          ease: "easeOut"
        }}
        viewport={{ once: true }}
      >
        {/* Image */}
        <div className="relative w-full aspect-[16/9] overflow-hidden rounded-lg mb-6">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 810px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        
        {/* Content */}
        <div className="px-5 py-3 l:px-10 l:py-5 m:px-10 m:py-5">
          {/* Published Date */}
          <motion.p
            className="text-16-s m:text-16-m l:text-16-l uppercase tracking-wider mb-4"
            style={{ 
              color: 'var(--color-black-40)',
              fontWeight: 'var(--font-weight-regular)',
              lineHeight: '1.6em',
              letterSpacing: '0.1em',
              marginBottom: '16px'
            }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5,
              delay: 0.1,
              ease: "easeOut"
            }}
            viewport={{ once: true }}
          >
            {publishedAt}
          </motion.p>

          {/* Title */}
          <motion.h6
            className="text-h6-s m:text-h6-m l:text-h6-l group-hover:text-black-60 transition-colors duration-300"
            style={{ 
              color: 'var(--color-black-80)',
              fontWeight: 'var(--font-weight-bold)',
              lineHeight: '1.4em',
              letterSpacing: '-0.03em',
              marginBottom: '0'
            }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5,
              delay: 0.2,
              ease: "easeOut"
            }}
            viewport={{ once: true }}
          >
            {title}
          </motion.h6>
        </div>
      </motion.article>
    </Link>
  );
}