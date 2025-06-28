'use client';

import { motion } from 'motion/react';

export default function BlockQuoteBanner({ quote }: { quote: string }) {
  return (
    <section className="w-full bg-white-100" style={{ paddingTop: '200px', paddingRight: '60px', paddingBottom: '200px', paddingLeft: '60px' }}>
      <motion.h4
        className="text-h5-s m:text-h5-m l:text-h5-l"
        style={{ 
          color: 'var(--color-black-60)',
          fontWeight: 'var(--font-weight-bold)',
          lineHeight: '1.4em',
          letterSpacing: '-0.04em',
          marginBottom: '0'
        }}
        initial={{ opacity: 0, y: -100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ 
          type: "spring",
          stiffness: 100,
          damping: 20,
          duration: 0.8 
        }}
        viewport={{ once: true }}
      >
        {quote}
      </motion.h4>
    </section>
  );
}
