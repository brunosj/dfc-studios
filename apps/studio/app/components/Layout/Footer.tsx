'use client';
import React from 'react';
import Link from 'next/link';
import { Footer as FooterType, Header as HeaderType } from '@payload-types';
import { resolvePayloadLink } from '@/app/utils/linkResolver';
import { useMetadata } from '@/app/contexts/MetadataContext';

import { RichText } from '@payloadcms/richtext-lexical/react';
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';

interface FooterProps {
  footer: FooterType;
  header: HeaderType;
}

const Footer: React.FC<FooterProps> = ({ footer, header }) => {
  const { metadata } = useMetadata();

  return (
    <>
      <div
        className='h-screen relative z-[99]'
        style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
      >
        <footer className='h-screen fixed bottom-0 w-full transition-transform duration-700'>
          <div className='h-full w-full bg-dfc-dark-blue dark:bg-white text-white dark:text-gray-900 flex flex-col relative overflow-hidden'>
            {/* Footer background decorative elements */}
            <div className='absolute inset-0 pointer-events-none'>
              {/* Dot grid pattern that matches layout pattern style */}
              <div className='absolute inset-0 opacity-5'>
                <svg
                  width='100%'
                  height='100%'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <pattern
                    id='footer-dots'
                    x='0'
                    y='0'
                    width='40'
                    height='40'
                    patternUnits='userSpaceOnUse'
                  >
                    <path
                      d='M 40 0 L 0 0 0 40'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='0.5'
                      opacity='0.3'
                    />
                    <circle cx='20' cy='20' r='1' fill='currentColor' />
                  </pattern>
                  <rect width='100%' height='100%' fill='url(#footer-dots)' />
                </svg>
              </div>

              {/* Wavy line at the top that provides transition */}
              <div className='absolute top-0 left-0 w-full opacity-10'>
                <svg
                  viewBox='0 0 1440 100'
                  xmlns='http://www.w3.org/2000/svg'
                  preserveAspectRatio='none'
                >
                  <path
                    fill='none'
                    stroke='var(--color-dfc-teal)'
                    strokeWidth='0.5'
                    d='M0,50 C240,80 480,20 720,50 C960,80 1200,20 1440,50'
                  />
                </svg>
              </div>

              {/* Abstract elements that match layout theme */}
              <div className='absolute bottom-20 right-10 opacity-5 dark:opacity-15'>
                <svg
                  width='400'
                  height='400'
                  viewBox='0 0 100 100'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M10,90 L50,10 L90,90 Z'
                    fill='none'
                    stroke='var(--color-dfc-teal)'
                    strokeWidth='0.5'
                  />
                  <path
                    d='M30,90 L50,30 L70,90 Z'
                    fill='none'
                    stroke='var(--color-dfc-teal)'
                    strokeWidth='0.5'
                  />
                </svg>
              </div>
            </div>

            <div className='layout w-full flex-grow flex flex-col justify-center py-8 sm:py-12'>
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 '>
                {/* Column 1 DFC Font */}
                <div className='flex flex-col items-start space-y-6'>
                  <div className='uppercase text-dfc-red dark:text-dfc-teal'>
                    <p className='text-lg sm:text-2xl font-bold leading-none'>
                      {metadata?.title || 'Designers for Climate Studios'}
                    </p>

                    <p className='sm:text-left text-sm lg:text-lg font-medium leading-none'>
                      {metadata?.tagline || footer.slogan}
                    </p>
                  </div>

                  <div className=' sm:text-left text-sm sm:text-base'>
                    <RichText data={footer.address as SerializedEditorState} />
                  </div>
                </div>

                {/* Column 2: Header nav items */}
                <div className='flex justify-end sm:justify-end pt-12 lg:pt-0'>
                  <div className=' sm:text-left'>
                    <ul className='flex flex-col gap-2 sm:gap-3 items-center sm:items-start'>
                      {header?.navItems?.map((item, index) => {
                        const href = resolvePayloadLink(item.link);
                        return (
                          <li key={`header-${index}`}>
                            <Link
                              href={href}
                              className='text-white hover:text-white/80 dark:text-gray-900 dark:hover:text-gray-900/80 transition-colors text-base sm:text-xl font-medium'
                              target={item.link?.newTab ? '_blank' : undefined}
                              rel={
                                item.link?.newTab
                                  ? 'noopener noreferrer'
                                  : undefined
                              }
                            >
                              {item.label}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>

                {/* Column 3: Footer nav items */}
                <div className='flex justify-end sm:justify-start lg:justify-center'>
                  <div className=' sm:text-left'>
                    <ul className='flex flex-col gap-2 sm:gap-3 items-center sm:items-start'>
                      {footer?.navItems?.map((item, index) => {
                        const href = resolvePayloadLink(item.link);
                        return (
                          <li key={`footer-${index}`}>
                            <Link
                              href={href}
                              className='text-white hover:text-white/80 dark:text-gray-900 dark:hover:text-gray-900/80 transition-colors text-base sm:text-xl font-medium'
                              target={item.link?.newTab ? '_blank' : undefined}
                              rel={
                                item.link?.newTab
                                  ? 'noopener noreferrer'
                                  : undefined
                              }
                            >
                              {item.label}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className='mt-auto'>
              <div className='layout mb-4 sm:mb-6 mx-auto  text-right lg:text-left small-text'>
                <p>
                  © {new Date().getFullYear()} Designers For Climate Studios.
                  All rights reserved.
                </p>
                <RichText data={footer.bottomText as SerializedEditorState} />
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;
