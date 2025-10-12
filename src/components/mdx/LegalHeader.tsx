"use client";

import { TYPOGRAPHY } from "@/lib/typography";
import clsx from "clsx";
import { ArrowLeft } from "lucide-react";

interface LegalHeaderProps {
  title: string;
  description: string;
}

/**
 * Legal page header component with back button and title/description
 */
export function LegalHeader({ title, description }: LegalHeaderProps) {
  return (
    <section
      id="header"
      className="my-32 px-16 bg-cover bg-center bg-no-repeat relative"
    >
      <div className="absolute inset-0 bg-[url('/assets/images/backgrounds/abstract_neutral_1.jpg')] bg-cover bg-center bg-no-repeat opacity-20"></div>
      <div className="relative grid grid-cols-[auto_1fr] gap-8 py-16">
        <div className="mt-6">
          <button
            onClick={() => window.history.back()}
            className="hover:opacity-70"
          >
            <ArrowLeft size={36} />
          </button>
        </div>
        <div>
          <h1 className={clsx(TYPOGRAPHY.h3, "text-black pb-6")}>{title}</h1>
          <p className={clsx(TYPOGRAPHY.text20, "text-black")}>{description}</p>
        </div>
      </div>
    </section>
  );
}
