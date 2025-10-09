"use client";

import SimpleCard from "@/components/cards/SimpleCard";
import * as LucideIcons from "lucide-react";

interface SimpleCardData {
  icon: keyof typeof LucideIcons;
  title: string;
  subtitle?: string;
  bodyText: string;
  buttonLabel: string;
  buttonLink: string;
}

interface CardGridProps {
  cards: SimpleCardData[];
}

/**
 * BentoGrid
 * A responsive grid container for BentoCard components
 * Desktop: Bento grid layout (4 columns)
 * Mobile: Single column layout
 * @param cards - Array of card data objects
 */
export default function CardGrid({ cards }: CardGridProps) {
  return (
    <div className="w-full py-12 m:py-16 l:py-20 px-5 m:px-10 l:px-20">
      {/* Bento Grid */}
      <div className="grid grid-cols-1 m:grid-cols-2 l:grid-cols-4 gap-4 m:gap-6 l:gap-6 max-w-[1400px] mx-auto">
        {cards.map((card, index) => (
          <SimpleCard
            key={index}
            icon={card.icon}
            title={card.title}
            subtitle={card.subtitle}
            bodyText={card.bodyText}
            buttonLabel={card.buttonLabel}
            buttonLink={card.buttonLink}
          />
        ))}
      </div>
    </div>
  );
}
