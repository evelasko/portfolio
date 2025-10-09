"use client";

import { useLayout } from "@/contexts/LayoutContext";
import { useEffect } from "react";
import ImageCard from "@/components/cards/ImageCard";

export default function ImageCardDemo() {
  const { setShowNavBar, setShowFooter } = useLayout();

  // Configure layout for this page - hide both NavBar and Footer
  useEffect(() => {
    setShowNavBar(false);
    setShowFooter(false);

    // Cleanup: restore defaults when leaving this page
    return () => {
      setShowNavBar(true);
      setShowFooter(true);
    };
  }, [setShowNavBar, setShowFooter]);

  const demoCards = [
    {
      image: "/assets/images/cards/card_1.jpg",
      label: "Recipe",
      title: "Crisp Spanish Tortilla Matzo Brei",
      description:
        "A delightful fusion of Spanish and Jewish culinary traditions, creating a crispy and flavorful dish.",
      link: "#",
      extraContent: (
        <div className="flex justify-between items-center text-white-100">
          <svg
            className="w-5 h-5 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12.1,18.55L12,18.65L11.89,18.55C7.14,14.24 4,11.39 4,8.5C4,6.5 5.5,5 7.5,5C9.04,5 10.54,6 11.07,7.36H12.93C13.46,6 14.96,5 16.5,5C18.5,5 20,6.5 20,8.5C20,11.39 16.86,14.24 12.1,18.55M16.5,3C14.76,3 13.09,3.81 12,5.08C10.91,3.81 9.24,3 7.5,3C4.42,3 2,5.41 2,8.5C2,12.27 5.4,15.36 10.55,20.03L12,21.35L13.45,20.03C18.6,15.36 22,12.27 22,8.5C22,5.41 19.58,3 16.5,3Z" />
          </svg>
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M19.03,7.39L20.45,5.97C20,5.46 19.55,5 19.04,4.56L17.62,6C16.07,4.74 14.12,4 12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22C17,22 21,17.97 21,13C21,10.88 20.26,8.93 19.03,7.39M11,14H13V8H11M15,1H9V3H15V1Z" />
            </svg>
            <span className="text-sm">15 min</span>
          </div>
        </div>
      ),
    },
    {
      image: "/assets/images/cards/card_2.jpg",
      label: "Travel",
      title: "Discover the Sea",
      description:
        "Explore the beauty of ocean waves and discover hidden gems along the coastline.",
      link: "#",
      extraContent: (
        <div className="flex justify-between items-center text-white-100">
          <svg
            className="w-5 h-5 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12.1,18.55L12,18.65L11.89,18.55C7.14,14.24 4,11.39 4,8.5C4,6.5 5.5,5 7.5,5C9.04,5 10.54,6 11.07,7.36H12.93C13.46,6 14.96,5 16.5,5C18.5,5 20,6.5 20,8.5C20,11.39 16.86,14.24 12.1,18.55M16.5,3C14.76,3 13.09,3.81 12,5.08C10.91,3.81 9.24,3 7.5,3C4.42,3 2,5.41 2,8.5C2,12.27 5.4,15.36 10.55,20.03L12,21.35L13.45,20.03C18.6,15.36 22,12.27 22,8.5C22,5.41 19.58,3 16.5,3Z" />
          </svg>
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M19.03,7.39L20.45,5.97C20,5.46 19.55,5 19.04,4.56L17.62,6C16.07,4.74 14.12,4 12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22C17,22 21,17.97 21,13C21,10.88 20.26,8.93 19.03,7.39M11,14H13V8H11M15,1H9V3H15V1Z" />
            </svg>
            <span className="text-sm">5 min</span>
          </div>
        </div>
      ),
    },
    {
      image: "/assets/images/cards/card_3.jpg",
      label: "Design",
      title: "Modern Architecture",
      description:
        "Contemporary architectural designs that blend functionality with aesthetic beauty.",
      link: "#",
      extraContent: (
        <div className="flex justify-between items-center text-white-100">
          <svg
            className="w-5 h-5 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12.1,18.55L12,18.65L11.89,18.55C7.14,14.24 4,11.39 4,8.5C4,6.5 5.5,5 7.5,5C9.04,5 10.54,6 11.07,7.36H12.93C13.46,6 14.96,5 16.5,5C18.5,5 20,6.5 20,8.5C20,11.39 16.86,14.24 12.1,18.55M16.5,3C14.76,3 13.09,3.81 12,5.08C10.91,3.81 9.24,3 7.5,3C4.42,3 2,5.41 2,8.5C2,12.27 5.4,15.36 10.55,20.03L12,21.35L13.45,20.03C18.6,15.36 22,12.27 22,8.5C22,5.41 19.58,3 16.5,3Z" />
          </svg>
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M19.03,7.39L20.45,5.97C20,5.46 19.55,5 19.04,4.56L17.62,6C16.07,4.74 14.12,4 12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22C17,22 21,17.97 21,13C21,10.88 20.26,8.93 19.03,7.39M11,14H13V8H11M15,1H9V3H15V1Z" />
            </svg>
            <span className="text-sm">8 min</span>
          </div>
        </div>
      ),
    },
    {
      image: "/assets/images/cards/card_4.jpg",
      label: "Nature",
      title: "Forest Serenity",
      description:
        "Find peace and tranquility in the heart of ancient forests and natural landscapes.",
      link: "#",
      extraContent: (
        <div className="flex justify-between items-center text-white-100">
          <svg
            className="w-5 h-5 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12.1,18.55L12,18.65L11.89,18.55C7.14,14.24 4,11.39 4,8.5C4,6.5 5.5,5 7.5,5C9.04,5 10.54,6 11.07,7.36H12.93C13.46,6 14.96,5 16.5,5C18.5,5 20,6.5 20,8.5C20,11.39 16.86,14.24 12.1,18.55M16.5,3C14.76,3 13.09,3.81 12,5.08C10.91,3.81 9.24,3 7.5,3C4.42,3 2,5.41 2,8.5C2,12.27 5.4,15.36 10.55,20.03L12,21.35L13.45,20.03C18.6,15.36 22,12.27 22,8.5C22,5.41 19.58,3 16.5,3Z" />
          </svg>
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M19.03,7.39L20.45,5.97C20,5.46 19.55,5 19.04,4.56L17.62,6C16.07,4.74 14.12,4 12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22C17,22 21,17.97 21,13C21,10.88 20.26,8.93 19.03,7.39M11,14H13V8H11M15,1H9V3H15V1Z" />
            </svg>
            <span className="text-sm">12 min</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-100 to-neutral-200 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-h2-s m:text-h2-m l:text-h2-l mb-4 font-bold text-black-90">
            ImageCard Component Demo
          </h1>
          <p className="text-18-s m:text-18-m l:text-18-l text-black-60 max-w-2xl mx-auto">
            Hover over the cards to see the interactive effects. Each card
            features smooth animations, overlay content, and responsive
            typography.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 m:grid-cols-2 l:grid-cols-4 gap-12 l:gap-16">
          {demoCards.map((card, index) => (
            <ImageCard key={index} {...card} />
          ))}
        </div>

        {/* Additional Cards Without Extra Content */}
        <div className="mt-20">
          <h2 className="text-h4-s m:text-h4-m l:text-h4-l mb-8 font-bold text-black-90 text-center">
            Cards Without Overlay Content
          </h2>
          <div className="grid grid-cols-1 m:grid-cols-2 l:grid-cols-3 gap-12 l:gap-16 max-w-5xl mx-auto">
            <ImageCard
              image="/assets/images/cards/card_1.jpg"
              label="Featured"
              title="Minimalist Design"
              description="Simple and clean card design without overlay content."
            />
            <ImageCard
              image="/assets/images/cards/card_2.jpg"
              title="Basic Card"
              description="A basic card implementation with just image, title, and description."
            />
            <ImageCard
              image="/assets/images/cards/card_3.jpg"
              label="Portfolio"
              title="Project Showcase"
              link="#"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
