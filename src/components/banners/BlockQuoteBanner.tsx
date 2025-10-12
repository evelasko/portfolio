"use client";

import { motion } from "motion/react";
import { TYPOGRAPHY } from "@/lib/typography";
import clsx from "clsx";

export default function BlockQuoteBanner({ quote }: { quote: string }) {
  return (
    <section
      className="w-full bg-white-100"
      style={{
        paddingTop: "200px",
        paddingRight: "60px",
        paddingBottom: "200px",
        paddingLeft: "60px",
      }}
    >
      <motion.h4
        className={clsx(TYPOGRAPHY.h5, "text-black-60")}
        initial={{ opacity: 0, y: -100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          duration: 0.8,
        }}
        viewport={{ once: true }}
      >
        {quote}
      </motion.h4>
    </section>
  );
}
