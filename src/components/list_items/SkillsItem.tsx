'use client';

import { motion } from 'motion/react';
import { TYPOGRAPHY } from '@/lib/typography';

/**
 * Skills Item Component
 * animated on appear with a fade from bottom (offset 170px) ease Spring with physics (stiffness 300, damping 60, mass 1)
 * @param title - string, tag h6 style TYPOGRAPHY.h6, color black-90
 * @param description - string, TYPOGRAPHY.text16, color black-50
 * @param itemNumber - number, tag p style TYPOGRAPHY.mono16, color black-40
 * @param skills - array of strings, tag span style TYPOGRAPHY.mono16, color black-90, uppercase
 * @returns 
 */
export default function SkillsItem({ 
  title, 
  description, 
  itemNumber, 
  skills 
}: { 
  title: string; 
  description: string; 
  itemNumber: number; 
  skills: string[]; 
}) {
  return (
    <motion.div
      className="grid grid-cols-1 l:grid-cols-[70%_30%] gap-6 l:gap-8"
      initial={{ 
        opacity: 0, 
        y: 170,
        filter: "blur(10px)" 
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        filter: "blur(0px)" 
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 60,
        mass: 1,
        duration: 0.8
      }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Left Column: Number, Title, Description */}
      <div className="space-y-6 l:space-y-8 text-left">
        {/* Item Number */}
        <p className={`${TYPOGRAPHY.mono16} text-black-40`}>
          /.{itemNumber.toString().padStart(2, '0')}
        </p>

        {/* Title */}
        <h6 className={`${TYPOGRAPHY.h6} text-black-90`} >
          {title}
        </h6>

        {/* Description */}
        <p
          className={`${TYPOGRAPHY.text16} text-black-50`}
          style={{
            fontWeight: 'var(--font-weight-regular)',
            lineHeight: '1.6em',
            letterSpacing: '-0.02em',
            marginBottom: '0'
          }}
        >
          {description}
        </p>
      </div>

      {/* Right Column: Skills List */}
      <div>
        <ul
          className="space-y-2"
        >
          {skills.map((skill, index) => (
            <li
              key={index}
              className={`${TYPOGRAPHY.mono16} text-black-90 uppercase pb-5 pt-4 border-b-black-10 border-b-[1px] text-center l:text-left`}
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}