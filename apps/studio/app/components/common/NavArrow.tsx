'use client';

import React from 'react';

interface NavArrowProps {
  direction: 'left' | 'right';
  onClick: () => void;
  color?: string;
  ariaLabel?: string;
  variant?: 'outline' | 'filled';
}

const NavArrow: React.FC<NavArrowProps> = ({
  direction,
  onClick,
  color = 'dfc-teal',
  ariaLabel,
  variant = 'filled',
}) => {
  // Convert shorthand color to CSS variable format or use hex code directly
  const colorValue = color.startsWith('#')
    ? color
    : color.startsWith('var(--')
    ? color
    : `var(--color-${color})`;

  // Style and classes based on variant
  const isOutline = variant === 'outline';

  const styleProps = {
    color: isOutline ? colorValue : '#FFFFFF',
    borderColor: colorValue,
    backgroundColor: isOutline ? 'transparent' : colorValue,
    '--btn-color': colorValue,
    '--btn-hover-bg': isOutline ? colorValue : '#FFFFFF',
    '--btn-hover-color': isOutline ? '#FFFFFF' : colorValue,
    '--btn-dark-hover-bg': isOutline ? colorValue : '#1F2937',
    '--btn-dark-hover-color': isOutline ? '#1F2937' : colorValue,
  } as React.CSSProperties;

  const baseClasses =
    'w-8 h-8 rounded-full flex items-center justify-center border focus:outline-none hover:cursor-pointer p-1 duration-300 opacity-100 transition-all';

  const hoverClasses = `btn-hover-effect btn-${variant} dark:border-opacity-90 dark:text-opacity-90`;

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${hoverClasses}`}
      style={styleProps}
      aria-label={ariaLabel || `${direction === 'left' ? 'Previous' : 'Next'}`}
    >
      {direction === 'left' ? (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='32'
          height='32'
          viewBox='0 0 24 24'
        >
          <path
            fill='currentColor'
            d='m8.82 12l7.715 7.716q.22.22.218.528t-.224.529q-.221.221-.529.221t-.529-.221L7.83 13.136q-.243-.242-.354-.54q-.112-.298-.112-.596t.112-.596t.354-.54l7.64-7.644q.221-.221.532-.218q.31.003.531.224t.222.529t-.222.528z'
          />
        </svg>
      ) : (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='32'
          height='32'
          viewBox='0 0 24 24'
        >
          <path
            fill='currentColor'
            d='M15.187 12L7.47 4.285q-.221-.221-.218-.532q.003-.31.224-.532Q7.698 3 8.009 3q.31 0 .532.221l7.636 7.643q.242.242.354.54t.111.596t-.111.596t-.354.54L8.535 20.78q-.222.221-.53.218q-.307-.003-.528-.224t-.221-.532t.221-.531z'
          />
        </svg>
      )}
    </button>
  );
};

export default NavArrow;
