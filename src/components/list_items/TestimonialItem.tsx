import Image from "next/image";

/**
 * Testimonial Item Component
 * @param name - string, tag p style TYPOGRAPHY.mono18, color black-90, uppercase
 * @param title - string, tag p style TYPOGRAPHY.mono16, color black-50, uppercase
 * @param message - string, tag p style TYPOGRAPHY.h9, color black-70
 * @param avatar - string, image url 42px square
 */
export default function TestimonialItem({ name, title, message, avatar }: { name: string, title: string, message: string, avatar: string }) {
  return (
    <div>
      <h1>Testimonial Item</h1>
      <p>{name}</p>
      <p>{title}</p>
      <p>{message}</p>
      <Image src={avatar} alt={name} width={100} height={100} />
    </div>
  );
}