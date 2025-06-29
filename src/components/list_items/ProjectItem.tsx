import Image from "next/image";
import Link from "next/link";

/**
 * Project Item Component
 * Fixed heigh of 300px
 * @param label - string, tag p style TYPOGRAPHY.mono16, color black-50, uppercase
 * @param title - string, tag h5 style TYPOGRAPHY.h7, color black-90
 * @param description - string, TYPOGRAPHY.text16, color black-50
 * @param image - string, image url height 200px (on hover scale proportionally to 250 px)
 * @param link - string, link url
 */
export default function ProjectItem({ label, title, description, image, link}: { label: string, title: string, description: string, image: string, link: string }) {
  return (
    <Link href={link}>
        <div>
      <h1>Project Item</h1>
      <p>{label}</p>
      <h2>{title}</h2>
      <p>{description}</p>
      <Image src={image} alt={title} width={100} height={100} />
    </div></Link>
  );
}