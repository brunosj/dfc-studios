'use client';

import React from 'react';
import { motion, useAnimation, Variant } from 'motion/react';
import { useEffect, useRef, ElementType, ReactNode } from 'react';

type AnimatedTextProps = {
  text: string | string[];
  el?: ElementType;
  className?: string;
  repeatDelay?: number;
  animation?: {
    hidden: Variant;
    visible: Variant;
    exit?: Variant;
  };
  color?: string;
  icon?: ReactNode;
  isExiting?: boolean;
};

const defaultAnimations = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.2,
    },
  },
};

export const AnimatedText = ({
  text,
  el: Wrapper = 'p',
  className,
  repeatDelay,
  animation = defaultAnimations,
  color,
  icon,
  isExiting = false,
}: AnimatedTextProps) => {
  const controls = useAnimation();
  // Ensure text is never empty and always an array
  const cleanText = text || 'Welcome';
  const textArray = Array.isArray(cleanText) ? cleanText : [cleanText];
  const ref = useRef(null);

  // Extract complex expression to a separate variable
  const textString = textArray.join(' ');

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    // Force animation to start even if not in view in production
    const show = () => {
      if (isExiting) {
        // Start exit animation
        controls.start('exit');
      } else {
        // Once exit animation is done, show the new text
        controls.start('hidden');

        // Small delay before showing the next text
        setTimeout(() => {
          controls.start('visible');
        }, 10);

        if (repeatDelay) {
          timeout = setTimeout(async () => {
            await controls.start('hidden');
            controls.start('visible');
          }, repeatDelay);
        }
      }
    };

    // Always try to show the text, even if not perfectly in view
    show();

    return () => clearTimeout(timeout);
  }, [controls, repeatDelay, isExiting, textString]);

  const Component = Wrapper as ElementType;

  return (
    <Component className={className} style={color ? { color } : undefined}>
      <span className='sr-only'>{text}</span>
      <motion.span
        ref={ref}
        initial='hidden'
        animate={controls}
        variants={{
          visible: { transition: { staggerChildren: 0.05 } },
          hidden: {},
        }}
        aria-hidden
      >
        {textArray.map((line, lineIndex) => {
          const words = line.split(' ');
          return (
            <span className='block' key={`line-${lineIndex}-${line}`}>
              {words.map((word, wordIndex) => (
                <React.Fragment key={`word-${lineIndex}-${wordIndex}-${word}`}>
                  <motion.span className='inline-block' variants={animation}>
                    {word}
                  </motion.span>

                  {/* Add space after each word except the last one */}
                  {wordIndex < words.length - 1 && (
                    <span className='inline-block'>&nbsp;</span>
                  )}

                  {/* Add icon after the last word of the last line */}
                  {wordIndex === words.length - 1 &&
                    lineIndex === textArray.length - 1 &&
                    icon && (
                      <motion.span
                        variants={animation}
                        className='inline-block ml-1 mt-1 align-top'
                      >
                        {icon}
                      </motion.span>
                    )}
                </React.Fragment>
              ))}
            </span>
          );
        })}
      </motion.span>
    </Component>
  );
};

export default AnimatedText;
