'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Header as HeaderType } from '@payload-types';
import { resolvePayloadLink } from '@/app/utils/linkResolver';
import Logo from './Logo';
import UnderlineLink from '../common/UnderlineLink';
import { useTheme } from 'next-themes';

import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from 'motion/react';

interface HeaderProps {
  header: HeaderType;
}

const Header: React.FC<HeaderProps> = ({ header }) => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { scrollY } = useScroll();
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // After mounting, we can safely show the theme switcher
  useEffect(() => {
    setMounted(true);
  }, []);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    // Set hasScrolled state to apply background styles
    if (latest > 20) {
      setHasScrolled(true);
    } else {
      setHasScrolled(false);
    }

    // Hide header when scrolling down past threshold (50px)
    if (latest > lastScrollY && latest > 50 && isVisible) {
      setIsVisible(false);
    }
    // Show header when scrolling up
    else if (latest < lastScrollY && !isVisible) {
      setIsVisible(true);
    }

    setLastScrollY(latest);
  });

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  const isDark = resolvedTheme === 'dark';

  return (
    <motion.header
      className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
        hasScrolled ? ' ' : 'bg-transparent dark:bg-transparent'
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : -20,
      }}
      transition={{
        opacity: { duration: 0.4, ease: 'easeInOut', delay: 0.6 },
        y: { duration: 0.4, ease: 'easeInOut', delay: 0.6 },
      }}
    >
      <div className=''>
        <div className='layout py-2 flex justify-between items-center '>
          <div className='logo'>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.7 }}
            >
              <Link href='/' className='block'>
                <div className='w-18 lg:w-24 h-auto p-1 z-40'>
                  <Logo />
                </div>
              </Link>
            </motion.div>
          </div>

          {/* Desktop Navigation */}
          <nav className='hidden md:block'>
            <ul className='flex space-x-8 items-center'>
              {header?.navItems?.map((item, index) => {
                const href = resolvePayloadLink(item.link);
                const isActive =
                  pathname === href ||
                  (href !== '/' && pathname?.startsWith(href));

                return (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.8 + index * 0.1,
                      ease: 'easeOut',
                    }}
                  >
                    <UnderlineLink
                      href={href}
                      isActive={isActive}
                      color='dfc-red'
                      target={item.link?.newTab ? '_blank' : undefined}
                      rel={
                        item.link?.newTab ? 'noopener noreferrer' : undefined
                      }
                    >
                      {item.label}
                    </UnderlineLink>
                  </motion.li>
                );
              })}

              {/* Theme Switcher */}
              {mounted && (
                <motion.li
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: 1 + (header?.navItems?.length || 0) * 0.1,
                    ease: 'easeOut',
                  }}
                >
                  <button
                    onClick={toggleTheme}
                    className='p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors hover:cursor-pointer duration-300 ease-in-out'
                    aria-label='Toggle theme'
                  >
                    {isDark ? (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-6 h-6'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z'
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-6 h-6'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z'
                        />
                      </svg>
                    )}
                  </button>
                </motion.li>
              )}
            </ul>
          </nav>

          {/* Mobile Hamburger Button */}
          <div className='flex items-center md:hidden'>
            {/* Theme Switcher for Mobile */}
            {mounted && (
              <button
                onClick={toggleTheme}
                className='p-2 mr-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors z-50'
                aria-label='Toggle theme'
              >
                {isDark ? (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-6 h-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z'
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-6 h-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z'
                    />
                  </svg>
                )}
              </button>
            )}

            <button
              className='z-50 relative w-10 h-10 flex flex-col justify-center items-center'
              onClick={toggleMobileMenu}
              aria-label='Toggle menu'
            >
              <span
                className={`block w-6 h-0.5 mb-1.5 transition-transform duration-300 ${
                  mobileMenuOpen
                    ? 'rotate-45 translate-y-2 bg-black dark:bg-white'
                    : 'bg-black dark:bg-white'
                }`}
              ></span>
              <span
                className={`block w-6 h-0.5 mb-1.5 transition-opacity duration-300 ${
                  mobileMenuOpen
                    ? 'opacity-0 bg-black dark:bg-white'
                    : 'opacity-100 bg-black dark:bg-white'
                }`}
              ></span>
              <span
                className={`block w-6 h-0.5 transition-transform duration-300 ${
                  mobileMenuOpen
                    ? '-rotate-45 -translate-y-2 bg-black dark:bg-white'
                    : 'bg-black dark:bg-white'
                }`}
              ></span>
            </button>
          </div>

          {/* Mobile Menu Overlay */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                className='fixed inset-0 bg-dfc-yellow dark:bg-dfc-purple text-white z-40 overflow-hidden'
                initial={{ opacity: 0, x: '100%' }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: '100%' }}
                transition={{
                  duration: 0.4,
                  ease: [0.25, 0.1, 0.25, 1.0],
                  opacity: { duration: 0.3 },
                }}
              >
                <div className='h-full w-full flex flex-col justify-center items-center p-8'>
                  <nav className='w-full'>
                    <ul className='flex flex-col space-y-8 items-center justify-center'>
                      {header?.navItems?.map((item, index) => {
                        const href = resolvePayloadLink(item.link);
                        const isActive =
                          pathname === href ||
                          (href !== '/' && pathname?.startsWith(href));

                        return (
                          <motion.li
                            key={index}
                            className='text-center'
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.4,
                              delay: 0.3 + index * 0.1,
                              ease: [0.25, 0.1, 0.25, 1.0],
                            }}
                          >
                            <Link
                              href={href}
                              className={`text-4xl font-bold ${
                                isActive
                                  ? 'text-dfc-red'
                                  : ' hover:text-dfc-red transition-colors duration-300 text-black dark:text-white'
                              }`}
                              onClick={() => setMobileMenuOpen(false)}
                              target={item.link?.newTab ? '_blank' : undefined}
                              rel={
                                item.link?.newTab
                                  ? 'noopener noreferrer'
                                  : undefined
                              }
                            >
                              {item.label}
                            </Link>
                          </motion.li>
                        );
                      })}
                    </ul>
                  </nav>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
