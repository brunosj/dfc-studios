'use client';

import React, { useState, useEffect } from 'react';
import { Homepage, Color } from '@payload-types';
import { AnimatedText } from './AnimatedText';
import Link from 'next/link';
import { useTheme } from 'next-themes';

interface HeroSectionProps {
  homepage: Homepage;
}

const HeroSection: React.FC<HeroSectionProps> = ({ homepage }) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  // Ensure messages is always an array
  const messages = homepage.keyMessages || [];

  // Get array of colors from homepage
  const heroColors = React.useMemo(() => {
    if (Array.isArray(homepage.heroColors) && homepage.heroColors.length > 0) {
      return homepage.heroColors
        .map((color) =>
          typeof color === 'object' && color !== null ? (color as Color) : null
        )
        .filter(Boolean) as Color[];
    }
    return [
      {
        hexCode: 'var(--color-dfc-teal)',
        hexCodeDark: 'var(--color-dfc-teal)',
      },
    ];
  }, [homepage.heroColors]);

  // Get current color based on the message index and theme
  const currentColorIndex = currentMessageIndex % heroColors.length;
  const currentColor = heroColors[currentColorIndex];
  // Use light theme color during SSR and initial render
  const themeAwareColor = !mounted
    ? currentColor.hexCode
    : theme === 'dark'
    ? currentColor.hexCodeDark
    : currentColor.hexCode;

  // Handle mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (messages.length <= 1) return;

    const interval = setInterval(() => {
      // Start exit animation
      setIsExiting(true);

      // After exit animation completes
      setTimeout(() => {
        // Update index after exit animation
        setCurrentMessageIndex((prevIndex) =>
          prevIndex === messages.length - 1 ? 0 : prevIndex + 1
        );

        // Reset exit state after a short delay to ensure smooth transition
        setTimeout(() => {
          setIsExiting(false);
        }, 50);
      }, 500);
    }, 6000);

    return () => clearInterval(interval);
  }, [messages.length]);

  // Log the current message and color to debug
  const currentMessage = messages[currentMessageIndex]?.keyMessageText || '';

  const textAnimation = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.4,
      },
    },
  };

  const asteriskIcon = (
    <Link
      href='/about-us'
      className='h-4 w-4 lg:h-8 lg:w-8 inline-block align-top animate-spin-slow hover:opacity-70 duration-300 transition-all'
      style={{ color: themeAwareColor }}
    >
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256'>
        <path
          fill='currentColor'
          d='m212.45 107.14l-65.19 26.08l46.21 59.41a12 12 0 1 1-18.94 14.74L128 147.55l-46.53 59.82a12 12 0 0 1-18.94-14.74l46.21-59.41l-65.19-26.08a12 12 0 1 1 8.91-22.28L116 110.28V40a12 12 0 0 1 24 0v70.28l63.54-25.42a12 12 0 1 1 8.91 22.28'
        />
      </svg>
    </Link>
  );

  return (
    <section className='pt-20 relative'>
      <div className='layout'>
        <div className='w-full lg:w-5/6'>
          <div className=''>
            {messages.length > 0 ? (
              <div className='flex items-center justify-center h-full min-h-[40lvh] lg:min-h-[90lvh] lg:max-h-[90lvh]'>
                {/* Always show something even if isVisible is false */}
                <div className={'relative'}>
                  <AnimatedText
                    key={`message-${currentMessageIndex}`}
                    text={currentMessage || 'Welcome to DFC Studios'}
                    el='h1'
                    className='text-4xl md:text-8xl uppercase font-bold'
                    animation={textAnimation}
                    color={themeAwareColor}
                    icon={asteriskIcon}
                    isExiting={isExiting}
                  />
                </div>
              </div>
            ) : (
              <div className='flex items-center justify-center h-full min-h-[40lvh] lg:min-h-[90lvh]'>
                <h1
                  className='text-4xl md:text-8xl uppercase font-bold'
                  style={{ color: themeAwareColor }}
                >
                  Welcome to DFC Studios
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
