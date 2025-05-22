'use client';

import React from 'react';
import Link from 'next/link';
import { LinkType, resolvePayloadLink } from '@/app/utils/linkResolver';

interface ButtonProps {
  label: string;
  color?: string;
  variant?: 'outline' | 'filled';
  link?: LinkType | string;
  href?: string;
  className?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  label,
  color = 'dfc-teal',
  variant = 'outline',
  link,
  href,
  className = '',
  onClick,
}) => {
  // Convert shorthand color to CSS variable format or use hex code directly
  const colorValue = color.startsWith('#')
    ? color
    : color.startsWith('var(--')
    ? color
    : `var(--color-${color})`;

  // Determine the href
  const linkHref = href || (link ? resolvePayloadLink(link) : undefined);

  // Determine variant from link appearance if provided
  let buttonVariant = variant;
  if (typeof link === 'object' && link.appearance) {
    if (link.appearance === 'outline' || link.appearance === 'filled') {
      buttonVariant = link.appearance;
    } else if (link.appearance === 'default') {
      buttonVariant = 'outline'; // Set default appearance to outline
    }
  }

  // Define Tailwind classes
  const baseClasses =
    'inline-block px-6 py-2 rounded-full text-sm lg:text-base font-medium text-center uppercase border';

  // Add hover effect classes from globals.css
  const hoverClasses = `btn-hover-effect btn-${buttonVariant}`;

  // Style props for colors with dark mode considerations
  const styleProps = {
    // Set CSS variables for the hover effect
    '--btn-color': colorValue,
    '--btn-hover-bg': buttonVariant === 'outline' ? colorValue : '#FFFFFF',
    '--btn-hover-color': buttonVariant === 'outline' ? '#FFFFFF' : colorValue,
    '--btn-dark-hover-bg': buttonVariant === 'outline' ? colorValue : '#1F2937',
    '--btn-dark-hover-color':
      buttonVariant === 'outline' ? '#1F2937' : colorValue,

    // Direct styles
    borderColor: colorValue,
    ...(buttonVariant === 'filled' && { backgroundColor: colorValue }),
    color: buttonVariant === 'outline' ? colorValue : '#FFFFFF',
  } as React.CSSProperties;

  // Combined classes with dark mode
  const allClasses =
    `${baseClasses} ${hoverClasses} dark:border-opacity-90 dark:text-opacity-90 ${className}`.trim();

  // If we have an href, render a Link component
  if (linkHref) {
    return (
      <Link href={linkHref} className={allClasses} style={styleProps}>
        {label}
      </Link>
    );
  }

  // Otherwise, render a button element
  return (
    <button onClick={onClick} className={allClasses} style={styleProps}>
      {label}
    </button>
  );
};

export default Button;
