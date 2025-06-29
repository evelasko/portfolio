import Image from "next/image";
import { TYPOGRAPHY } from '@/lib/typography';

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
  avatar 
}: { 
  name: string; 
  title: string; 
  message: string; 
  avatar: string; 
}) {
  return (
    <div className="bg-white p-8 m:p-10 l:p-12 rounded-lg shadow-sm border border-gray-100">
      {/* Testimonial Message */}
      <div className="mb-8 l:mb-10">
        <p className={`${TYPOGRAPHY.h9} text-black-70 leading-relaxed`}>
          {message}
        </p>
      </div>

      {/* Author Information */}
      <div className="flex items-center space-x-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="relative w-[42px] h-[42px] rounded-full overflow-hidden">
            <Image 
              src={avatar} 
              alt={name} 
              fill
              className="object-cover"
              sizes="42px"
            />
          </div>
        </div>

        {/* Name and Title */}
        <div className="flex flex-col space-y-1">
          <p className={`${TYPOGRAPHY.mono18} text-black-90 uppercase`}>
            {name}
          </p>
          <p className={`${TYPOGRAPHY.mono16} text-black-50 uppercase`}>
            {title}
          </p>
        </div>
      </div>
    </div>
  );
}