import { TYPOGRAPHY } from "@/lib/typography";
import clsx from "clsx";
import { CloudinaryImage } from "@/components/mdx/CloudinaryImage";

export interface TestimonialItemProps {
  name: string;
  title: string;
  message: string;
  avatar: string;
  className?: string;
  textClassName?: string;
  variant?: "light" | "dark";
}

/**
 * Testimonial Item Component
 * @param name - string, tag p style TYPOGRAPHY.mono18, color black-90, uppercase
 * @param title - string, tag p style TYPOGRAPHY.mono16, color black-50, uppercase
 * @param message - string, tag p style TYPOGRAPHY.h9, color black-70
 * @param avatar - string, image url 42px square
 */
export default function TestimonialItem({
  name,
  title,
  message,
  avatar,
  className,
  textClassName,
  variant = "light",
}: TestimonialItemProps) {
  return (
    <div
      className={clsx(
        "bg-black/[0.02] p-8 m:p-10 l:p-12 rounded-lg shadow-sm border border-gray-100",
        className
      )}
    >
      {/* Testimonial Message */}
      <div className="mb-8 l:mb-10">
        <p
          className={clsx(
            `${TYPOGRAPHY.h9} text-black-70 leading-relaxed`,
            textClassName,
            variant === "dark" ? "text-white" : "text-black-70"
          )}
        >
          {message}
        </p>
      </div>

      {/* Author Information */}
      <div className="flex items-center space-x-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="relative w-[42px] h-[42px] rounded-full overflow-hidden">
            <CloudinaryImage
              src={avatar}
              alt={name}
              width={42}
              height={42}
              crop="thumb"
              gravity="face"
              quality="auto"
              className="object-cover"
              sizes="42px"
            />
          </div>
        </div>

        {/* Name and Title */}
        <div className="flex flex-col space-y-1">
          <p
            className={clsx(
              `${TYPOGRAPHY.mono18} uppercase`,
              variant === "dark" ? "text-white/70" : "text-black-90"
            )}
          >
            {name}
          </p>
          <p
            className={clsx(
              `${TYPOGRAPHY.mono16} text-black-50 uppercase`,
              variant === "dark" ? "text-white" : "text-black-50"
            )}
          >
            {title}
          </p>
        </div>
      </div>
    </div>
  );
}
