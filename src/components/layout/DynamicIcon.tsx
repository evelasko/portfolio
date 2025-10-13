import { icons } from "lucide-react";

// Component to render dynamic icon from Lucide
export default function DynamicIcon({
  iconName,
  className,
}: {
  iconName: string;
  className?: string;
}) {
  const LucideIcon = icons[iconName as keyof typeof icons];
  return LucideIcon ? <LucideIcon className={className} /> : null;
}
