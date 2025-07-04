import Link from "next/link";

interface PortfolioButtonProps {
  children: React.ReactNode;
  // onClick?: () => void;
  href?: string;
  variant?: 'dark' | 'light'; // dark for dark backgrounds, light for light backgrounds
  className?: string;
}

export default function PortfolioButton({ 
  children, 
  href, 
  // onClick,
  variant = 'dark',
  className = '' 
}: PortfolioButtonProps) {
  const baseClasses = `
    inline-flex items-center justify-center
    text-14-s m:text-14-m l:text-14-l
    uppercase
    h-[54px] px-6
    rounded-full
    border-2
    transition-all duration-200 ease-in-out
    font-medium
    no-underline
    ${className}
  `;

  const darkVariantClasses = `
    border-[#1E2B3A] text-[#1E2B3A] bg-transparent
    hover:border-[#1E2B3A] hover:text-black-100 hover:bg-white-100
  `;

  const lightVariantClasses = `
    border-white-100 text-white-100 bg-transparent
    hover:border-white-100 hover:text-[#1E2B3A] hover:bg-white-100
  `;

  const variantClasses = variant === 'dark' ? darkVariantClasses : lightVariantClasses;
  const combinedClasses = `${baseClasses} ${variantClasses}`;

  if (href) {
    return (
      <a 
        href={href} 
        className={combinedClasses}
        style={{ marginBottom: 0 }}
      >
        {children}
      </a>
    );
  }

  return (
    <Link 
      href={href || ''}
      // onClick={onClick} 
      className={combinedClasses}
      style={{ marginBottom: 0 }}
    >
      {children}
    </Link>
  );
}