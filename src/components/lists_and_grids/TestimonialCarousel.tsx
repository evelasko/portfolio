"use client";

import TestimonialItem from "@/components/list_items/TestimonialItem";
import type { TestimonialItemProps } from "@/components/list_items/TestimonialItem";
import clsx from "clsx";

interface TestimonialCarouselProps {
  testimonials: TestimonialItemProps[];
  className?: string;
  variant?: "dark" | "light";
  itemClassName?: string;
}

export default function TestimonialCarousel({
  testimonials,
  className,
  variant = "light",
  itemClassName,
}: TestimonialCarouselProps) {
  if (testimonials.length === 0) {
    return null;
  }

  return (
    <div className={clsx("relative", className)}>
      <div className="overflow-x-auto scrollbar-hide">
        <div
          className="flex gap-6 m:gap-8 pb-4"
          style={{ width: "max-content" }}
        >
          {testimonials.map(({ name, title, message, avatar }, index) => {
            // Extract testimonial data

            if (!name || !title || !message || !avatar) return null;

            return (
              <div key={name || index} className="flex-none w-80 m:w-96">
                <TestimonialItem
                  className={itemClassName}
                  name={name || ""}
                  title={title || ""}
                  message={message || ""}
                  avatar={avatar || ""}
                  variant={variant}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Scroll Indicators/Fade Effect */}
      <div
        className={clsx(
          "absolute top-0 right-0 bottom-0 w-8 lg:w-24 bg-gradient-to-l pointer-events-none",
          variant === "dark"
            ? "from-black-100 to-transparent"
            : "from-white to-transparent"
        )}
      />
      <div
        className={clsx(
          "absolute top-0 left-0 bottom-0 w-8 lg:w-24 bg-gradient-to-r pointer-events-none",
          variant === "dark"
            ? "from-black-100 to-transparent"
            : "from-white to-transparent"
        )}
      />

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
