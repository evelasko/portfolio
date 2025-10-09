import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function ArrowButton({ href }: { href: string }) {
  return (
    <Link href={href}>
      <div className="relative w-10 h-10 rounded-full border border-black-50 group hover:border-black transition-colors duration-300">
        {/* Arrow that flies away */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <ArrowUpRight className="w-6 h-6 group-hover:translate-x-[200%] group-hover:-translate-y-[200%] group-hover:opacity-0 transition-all duration-500 text-black-50 group-hover:text-black" />
        </div>

        {/* Arrow that comes back */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <ArrowUpRight className="w-6 h-6 translate-x-[-200%] translate-y-[200%] opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-300 text-black-50 group-hover:text-black" />
        </div>
      </div>
    </Link>
  );
}
