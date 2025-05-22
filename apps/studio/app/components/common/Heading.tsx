'use client';

import React, { useRef } from 'react';
import { useInView } from 'motion/react';
import AnimationContainer from './AnimationContainer';

type HeadingColor =
  | 'default'
  | 'dfc-teal'
  | 'dfc-dark-blue'
  | 'dfc-red'
  | 'dfc-yellow'
  | 'dfc-green'
  | 'dfc-purple'
  | string;

// MarginType from Motion's types
type MarginValue = `${number}${'px' | '%'}`;
type MarginType =
  | MarginValue
  | `${MarginValue} ${MarginValue}`
  | `${MarginValue} ${MarginValue} ${MarginValue}`
  | `${MarginValue} ${MarginValue} ${MarginValue} ${MarginValue}`;

interface HeadingProps {
  children: React.ReactNode;
  color?: HeadingColor;
  className?: string;
  /**
   * Enable or disable animation
   * @default true
   */
  animate?: boolean;
  /**
   * Type of animation to use
   * @default 'fade'
   */
  animationType?: 'fade' | 'scale' | 'slide' | 'none';
  /**
   * The amount of margin around the element that should trigger the animation
   * Uses CSS format like "0px" or "10% 20px"
   * @default "0px"
   */
  margin?: MarginType;
  /**
   * A value between 0 and 1, or "some", or "all" indicating how much should be visible
   * @default "some"
   */
  amount?: 'some' | 'all' | number;
  /**
   * If true, animation triggers only once when element comes into view
   * @default true
   */
  once?: boolean;
  /**
   * Direction to animate from
   * @default "bottom"
   */
  fadeInFrom?: 'top' | 'bottom' | 'left' | 'right' | 'none';
  /**
   * Animation duration in seconds
   * @default 0.4
   */
  duration?: number;
  /**
   * Initial scale for scale animations
   * @default 0.95
   */
  initialScale?: number;
}

const colorClasses: Record<string, string> = {
  default: 'text-gray-900',
  'dfc-teal': 'text-dfc-teal',
  'dfc-dark-blue': 'text-dfc-dark-blue',
  'dfc-red': 'text-dfc-red',
  'dfc-yellow': 'text-dfc-yellow',
  'dfc-green': 'text-dfc-green',
  'dfc-purple': 'text-dfc-purple',
};

const Heading: React.FC<HeadingProps> = ({
  children,
  color = 'default',
  className = '',
  animate = true,
  animationType = 'fade',
  margin = '0px',
  amount = 'some',
  once = true,
  fadeInFrom = 'bottom',
  duration = 0.4,
  initialScale = 0.95,
}) => {
  // Handle hex codes and CSS variables
  const style =
    color.startsWith('#') || color.startsWith('var(--') ? { color } : undefined;

  // Use color classes for predefined colors
  const colorClass = (!style && colorClasses[color]) || '';

  // InView implementation using Motion's useInView
  const ref = useRef(null);
  const isInView = useInView(ref, {
    margin,
    amount,
    once,
  });

  const headingContent = (
    <h1
      className={`text-2xl lg:text-4xl font-bold uppercase leading-none ${colorClass} ${className}`}
      style={style}
    >
      {children}
    </h1>
  );

  if (!animate) {
    return headingContent;
  }

  return (
    <div
      ref={ref}
      className='min-h-[calc(1.75rem)] lg:min-h-[calc(2.5rem)] relative'
    >
      <AnimationContainer
        show={isInView}
        fadeInFrom={fadeInFrom}
        animationType={animationType}
        duration={duration}
        initialScale={initialScale}
        className='w-full absolute'
      >
        {headingContent}
      </AnimationContainer>
    </div>
  );
};

export default Heading;
