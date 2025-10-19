import Link from "next/link";
import { TYPOGRAPHY } from "@/lib/typography";
import { CloudinaryThumbnail } from "@/components/mdx/CloudinaryImage";

/**
 * Project Item Component
 * Fixed heigh of 300px
 * @param label - string, tag p style TYPOGRAPHY.mono16, color black-50, uppercase
 * @param title - string, tag h5 style TYPOGRAPHY.h7, color black-90
 * @param description - string, TYPOGRAPHY.text16, color black-50
 * @param image - string, image url height 200px (on hover scale proportionally to 250 px)
 * @param link - string, link url
 */
export default function ProjectItem({
  label,
  title,
  description,
  image,
  link,
}: {
  label: string;
  title: string;
  description: string;
  image: string;
  link: string;
}) {
  return (
    <div className="w-full border-t border-black-10 mb-12 m:mb-0 l:mb-0">
      <Link href={link} className="block w-full">
        <div className="w-full h-[400px] m:h-[300px] l:h-[300px] grid grid-cols-1 m:grid-cols-2 l:grid-cols-2 gap-0">
          {/* Content Column - First on mobile, second on large */}
          <div className="order-2 m:order-1 l:order-1 flex flex-col justify-center items-start p-6 m:p-8 l:p-12 bg-white">
            <div className="space-y-2">
              <p
                className={`${TYPOGRAPHY.mono16} text-black-50 uppercase pb-3`}
              >
                {label}
              </p>
              <h5 className={`${TYPOGRAPHY.h7} text-black-90 mb-2`}>{title}</h5>
              <p className={`${TYPOGRAPHY.text16} text-black-50`}>
                {description}
              </p>
            </div>
          </div>

          {/* Image Column - Second on mobile, first on large */}
          <div className="order-1 l:order-2 relative overflow-hidden h-[200px] m:h-full l:h-full flex items-center justify-center">
            <CloudinaryThumbnail
              src={image}
              alt={title}
              fill
              className="object-cover l:p-8 m:p-8"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </Link>
    </div>
  );
}
