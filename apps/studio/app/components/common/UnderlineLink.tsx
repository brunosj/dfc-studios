import React from 'react';
import Link from 'next/link';

type UnderlineColor =
  | 'dfc-teal'
  | 'dfc-dark-blue'
  | 'dfc-red'
  | 'dfc-yellow'
  | 'dfc-green'
  | 'dfc-purple';

interface UnderlineLinkProps {
  href?: string;
  isActive?: boolean;
  color?: UnderlineColor;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  target?: string;
  rel?: string;
}

const colorClasses: Record<UnderlineColor, string> = {
  'dfc-teal': 'var(--color-dfc-teal)',
  'dfc-dark-blue': 'var(--color-dfc-dark-blue)',
  'dfc-red': 'var(--color-dfc-red)',
  'dfc-yellow': 'var(--color-dfc-yellow)',
  'dfc-green': 'var(--color-dfc-green)',
  'dfc-purple': 'var(--color-dfc-purple)',
};

const UnderlineLink: React.FC<UnderlineLinkProps> = ({
  href,
  isActive = false,
  color = 'dfc-teal',
  className = '',
  children,
  onClick,
  target,
  rel,
}) => {
  const colorValue = colorClasses[color];
  const baseClasses = `
    relative text-base lg:text-xl font-medium text-current transition-opacity duration-300
    ${isActive ? 'opacity-100' : 'opacity-100 hover:opacity-50'}
  `;

  const underlineClasses = `
    absolute bottom-[-4px] left-0 h-[2px] 
    transition-all duration-500 ease-in-out
    ${isActive ? 'w-3/4' : 'w-0'}
  `;

  const content = (
    <>
      <span className={baseClasses}>{children}</span>
      <span
        className={underlineClasses}
        style={{ backgroundColor: colorValue }}
      />
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={`relative group inline-block ${className}`}
        target={target}
        rel={rel}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`relative group inline-block hover:cursor-pointer ${className}`}
    >
      {content}
    </button>
  );
};

export default UnderlineLink;
