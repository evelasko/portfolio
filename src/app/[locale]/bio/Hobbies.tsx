"use client";

import { TYPOGRAPHY } from "@/lib/typography";
import { CloudinaryImage } from "@/components/mdx/CloudinaryImage";
import clsx from "clsx";

interface HobbyItem {
  title: string;
  description: string;
  imagePublicId: string;
  imagePosition: "left" | "right";
}

const hobbies: HobbyItem[] = [
  {
    title: "Kitesurfing",
    description:
      "You'll often find me on the water, kitesurfing. It's the ultimate conversation with a powerful, invisible system—a physical form of debugging in real-time.",
    imagePublicId:
      "https://res.cloudinary.com/evelasco/image/upload/v1761251216/eVelasco/photos/kitesurf.jpg",
    imagePosition: "left",
  },
  {
    title: "Blockchain & DeFi",
    description:
      "As a vehement evangelist for decentralized technology, I am an active member of communities like CryptoPlaza and BerChain, exploring the systems that will shape our future.",
    imagePublicId:
      "https://res.cloudinary.com/evelasco/image/upload/v1761250949/eVelasco/photos/cryptoplaza.jpg",
    imagePosition: "right",
  },
  {
    title: "Japanese Language",
    description:
      "My study of Japanese is an exploration of a different kind of operating system for thought and communication, a challenge that consistently reveals new perspectives.",
    imagePublicId:
      "https://res.cloudinary.com/evelasco/image/upload/v1761250707/eVelasco/photos/japanese.jpg",
    imagePosition: "left",
  },
];

export default function Hobbies() {
  return (
    <div className="space-y-12 m:space-y-16">
      {hobbies.map((hobby, index) => (
        <div
          key={index}
          className={clsx(
            // Mobile: single column
            "flex flex-col gap-6",
            // Medium & Large: side by side
            "m:flex-row m:gap-8 m:items-center",
            // Reverse direction when image is on the right
            hobby.imagePosition === "right" && "m:flex-row-reverse"
          )}
        >
          {/* Image Container */}
          <div
            className={clsx(
              // Mobile: full width, aspect-ratio 4:3
              "relative w-full aspect-[4/3]",
              // Medium & Large: 45% width, aspect-ratio 9:16
              "m:w-[45%] m:aspect-[3/4]",
              "flex-shrink-0 overflow-hidden rounded-lg"
            )}
          >
            <CloudinaryImage
              src={hobby.imagePublicId}
              alt={hobby.title}
              fill
              crop="fill"
              gravity="auto:subject"
              quality="auto"
              className="object-cover"
              sizes="(max-width: 810px) 100vw, 45vw"
            />
          </div>

          {/* Text Container */}
          <div className="flex flex-col gap-4 m:flex-1">
            <h3 className={clsx(TYPOGRAPHY.h6, "text-black-80")}>
              {hobby.title}
            </h3>
            <p className={TYPOGRAPHY.text18}>{hobby.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
