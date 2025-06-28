'use client';

import { motion } from 'motion/react';
import Image from "next/image";
import Link from "next/link";
/**
 * ProjectCard
 * padding: L & M: 40px, S: 20px
 * 
 * @param overtitle - string, TYPOGRAPHY.mono16, color white-98, uppercase
 * @param title - string, TYPOGRAPHY.h4, color white-100
 * @param subtitle - string, TYPOGRAPHY.text16, color white-98
 * @param image - string, image url
 * @param link - string, link url
 */
export default function ProjectCard({
  overtitle, 
  title, 
  subtitle, 
  image, 
  link
}: {
  overtitle: string; 
  title: string; 
  subtitle: string; 
  image: string; 
  link: string;
}) {
  return (
    <Link href={link} className="block">
      <motion.div 
        className="relative w-full aspect-[4/3] rounded-lg overflow-hidden group cursor-pointer"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Background Image */}
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 810px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-all duration-300" />
        
        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-5 l:p-10 m:p-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.6,
              ease: "easeOut"
            }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {/* Overtitle */}
            <motion.h3
              className="mono-16-s m:mono-16-m l:mono-16-l uppercase tracking-wider"
              style={{ 
                color: 'var(--color-white-98)',
                fontFamily: 'var(--font-mono)',
                fontWeight: 'var(--font-weight-regular)',
                lineHeight: '1.4em',
                letterSpacing: '0em',
                marginBottom: '0'
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
              {overtitle}
            </motion.h3>

            {/* Title */}
            <motion.h2
              className="text-h4-s m:text-h4-m l:text-h4-l"
              style={{ 
                color: 'var(--color-white-100)',
                fontWeight: 'var(--font-weight-bold)',
                lineHeight: '1.2em',
                letterSpacing: '-0.04em',
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
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              className="text-16-s m:text-16-m l:text-16-l max-w-md mx-auto"
              style={{ 
                color: 'var(--color-white-98)',
                fontWeight: 'var(--font-weight-regular)',
                lineHeight: '1.6em',
                letterSpacing: '-0.02em',
                marginBottom: '0'
              }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5,
                delay: 0.3,
                ease: "easeOut"
              }}
              viewport={{ once: true }}
            >
              {subtitle}
            </motion.p>
          </motion.div>
        </div>
      </motion.div>
    </Link>
  );
}