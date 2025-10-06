"use client";

import TestimonialItem from "@/components/list_items/TestimonialItem";
import type { Content } from "@prismicio/client";

interface TestimonialCarouselProps {
  testimonials: Content.TestimonialDocument[];
}

export default function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  if (testimonials.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-6 m:gap-8 pb-4" style={{ width: 'max-content' }}>
          {testimonials.map((testimonial, index) => {
            // Extract testimonial data
            const testimonialData = testimonial.data;
            
            if (!testimonialData) return null;

            return (
              <div
                key={testimonial.id || index}
                className="flex-none w-80 m:w-96"
              >
                <TestimonialItem
                  name={testimonialData.name || ""}
                  title={testimonialData.title || ""}
                  message={testimonialData.message || ""}
                  avatar={testimonialData.avatar || ""}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Scroll Indicators/Fade Effect */}
      <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none" />

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