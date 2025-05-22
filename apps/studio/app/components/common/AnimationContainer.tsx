import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Animation types we support
type AnimationType = 'fade' | 'scale' | 'slide' | 'none';

// Type for animation properties
type AnimationProperties = {
  opacity?: number;
  scale?: number;
  x?: number;
  y?: number;
};

interface AnimationContainerProps {
  children: React.ReactNode;
  show?: boolean;
  duration?: number;
  delay?: number;
  className?: string;
  distance?: number;
  /**
   * Direction to animate from
   * @default 'none'
   */
  fadeInFrom?: 'top' | 'bottom' | 'left' | 'right' | 'none';
  /**
   * Type of animation to use
   * @default 'fade'
   */
  animationType?: AnimationType;
  /**
   * Scale value for scale animations (initial scale)
   * @default 0.95
   */
  initialScale?: number;
  onAnimationComplete?: () => void;
}

const AnimationContainer: React.FC<AnimationContainerProps> = ({
  children,
  show = true,
  duration = 0.4,
  delay = 0,
  className = '',
  distance = 20,
  fadeInFrom = 'none',
  animationType = 'fade',
  initialScale = 0.95,
  onAnimationComplete,
}) => {
  // Set up initial animation values based on animation type and direction
  const getInitialValues = (): AnimationProperties => {
    const initial: AnimationProperties = {};

    // Apply fade effect
    if (animationType === 'fade' || animationType === 'slide') {
      initial.opacity = 0;
    }

    // Apply scale effect
    if (animationType === 'scale') {
      initial.opacity = 0;
      initial.scale = initialScale;
    }

    // Apply slide/direction effect
    if (animationType === 'slide' || fadeInFrom !== 'none') {
      switch (fadeInFrom) {
        case 'top':
          initial.y = -distance;
          break;
        case 'bottom':
          initial.y = distance;
          break;
        case 'left':
          initial.x = -distance;
          break;
        case 'right':
          initial.x = distance;
          break;
      }
    }

    return initial;
  };

  // Reset animation values for the visible state
  const getAnimateValues = (): AnimationProperties => {
    const animate: AnimationProperties = {};

    // Always animate to full opacity if we're fading
    if (
      animationType === 'fade' ||
      animationType === 'scale' ||
      animationType === 'slide'
    ) {
      animate.opacity = 1;
    }

    // Reset scale to 1
    if (animationType === 'scale') {
      animate.scale = 1;
    }

    // Reset position to 0 if we're using direction animations
    if (animationType === 'slide' || fadeInFrom !== 'none') {
      if (fadeInFrom === 'top' || fadeInFrom === 'bottom') {
        animate.y = 0;
      } else if (fadeInFrom === 'left' || fadeInFrom === 'right') {
        animate.x = 0;
      }
    }

    return animate;
  };

  // Exit animation values - reverse of initial animation
  const getExitValues = (): AnimationProperties => {
    const exit: AnimationProperties = {};

    // Fade out
    if (
      animationType === 'fade' ||
      animationType === 'scale' ||
      animationType === 'slide'
    ) {
      exit.opacity = 0;
    }

    // Scale down
    if (animationType === 'scale') {
      exit.scale = initialScale;
    }

    // Slide out
    if (animationType === 'slide' || fadeInFrom !== 'none') {
      switch (fadeInFrom) {
        case 'top':
          exit.y = -distance;
          break;
        case 'bottom':
          exit.y = distance;
          break;
        case 'left':
          exit.x = -distance;
          break;
        case 'right':
          exit.x = distance;
          break;
      }
    }

    return exit;
  };

  // If animation type is 'none', just show/hide the content without animations
  if (animationType === 'none') {
    return show ? <div className={className}>{children}</div> : null;
  }

  return (
    <AnimatePresence mode='wait'>
      {show && (
        <motion.div
          className={className}
          initial={getInitialValues()}
          animate={getAnimateValues()}
          exit={getExitValues()}
          transition={{
            duration,
            delay,
            ease: 'easeInOut',
          }}
          onAnimationComplete={onAnimationComplete}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimationContainer;
