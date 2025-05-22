'use client';

import React, { useState, useEffect } from 'react';
import { Homepage, Client } from '@payload-types';
import Image from 'next/image';
import Link from 'next/link';
import { getImageUrl } from '@/app/utils/image';
import Heading from '@/app/components/common/Heading';
import NavArrow from '@/app/components/common/NavArrow';
import { motion, AnimatePresence } from 'motion/react';

interface ClientsSectionProps {
  homepage: Homepage;
  clientsColor?: string;
}

const ClientsSection: React.FC<ClientsSectionProps> = ({
  homepage,
  clientsColor = 'var(--color-dfc-teal)',
}) => {
  const clients =
    homepage.featuredClients?.filter(
      (client): client is Client => typeof client !== 'string'
    ) || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const getClientIndex = (index: number) => {
    // Handle wrapping around
    if (index < 0) return clients.length + index;
    if (index >= clients.length) return index - clients.length;
    return index;
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % clients.length);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + clients.length) % clients.length);
  };

  // No-op function for when animation is in progress
  const noOp = () => {};

  // Update display index with delay after currentIndex changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayIndex(currentIndex);
      setIsAnimating(false);
    }, 350); // Slightly longer than the animation duration to ensure smooth transition

    return () => clearTimeout(timer);
  }, [currentIndex]);

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    if (clients.length <= 1) return;

    const interval = setInterval(() => {
      if (!isAnimating) {
        handleNext();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [clients.length, isAnimating]);

  // Get clients to display (2 on each side)
  const getClientDisplay = () => {
    if (clients.length <= 1) return { leftClients: [], rightClients: [] };

    return {
      leftClients: [
        clients[getClientIndex(displayIndex - 2)],
        clients[getClientIndex(displayIndex - 1)],
      ],
      rightClients: [
        clients[getClientIndex(displayIndex + 1)],
        clients[getClientIndex(displayIndex + 2)],
      ],
    };
  };

  if (clients.length === 0) {
    return null;
  }

  const { leftClients, rightClients } = getClientDisplay();
  const centerClient = clients[currentIndex];

  // Helper for rendering a small client logo
  const renderSmallClient = (client: Client) => (
    <div className='relative w-32 h-32 mx-auto'>
      {client.logo && (
        <Image
          src={getImageUrl(client.logo)}
          alt={client.organisation || 'Client logo'}
          fill
          className='object-contain'
        />
      )}
    </div>
  );

  return (
    <section className='pageMy'>
      <div className='layout'>
        {/* Section Title */}
        <Heading color={clientsColor}>
          {homepage.clientsTitle || 'Our Clients'}
        </Heading>

        {/* Client Carousel */}
        <div className='mt-12 bg-transparent dark:bg-white pb-12 rounded-xl'>
          <div className=' relative max-w-5xl mx-auto px-0 lg:px-10 '>
            {/* Carousel Content */}
            <div className='flex items-center justify-center relative'>
              {/* Left Clients (Smaller) - Side by Side */}
              {clients.length > 1 && (
                <div className='w-1/4 opacity-40 transform scale-85 transition-all duration-300 flex-row justify-center gap-6 hidden lg:flex items-center'>
                  {leftClients.map((client, idx) => (
                    <div
                      key={`left-${client.id || idx}`}
                      className='transition-all duration-300'
                    >
                      {renderSmallClient(client)}
                    </div>
                  ))}
                </div>
              )}

              {/* Center Client (Larger) */}
              <div className='w-full lg:w-1/2 z-10 transition-all duration-300 flex flex-col'>
                {/* Logo Container - We'll offset this to align with side logos */}
                <div className='relative'>
                  <AnimatePresence mode='wait'>
                    <motion.div
                      key={centerClient.id || currentIndex}
                      className='relative w-full h-72 lg:h-96'
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{
                        duration: 0.3,
                        ease: 'easeInOut',
                      }}
                      onAnimationComplete={() => {
                        if (isAnimating) {
                          setDisplayIndex(currentIndex);
                          setIsAnimating(false);
                        }
                      }}
                    >
                      {centerClient.logo && centerClient.url ? (
                        <Link
                          href={centerClient.url}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='block relative w-full h-full'
                        >
                          <Image
                            src={getImageUrl(centerClient.logo)}
                            alt={centerClient.organisation || 'Client logo'}
                            fill
                            className='object-contain hover:opacity-80 transition-opacity duration-300'
                          />
                        </Link>
                      ) : centerClient.logo ? (
                        <Image
                          src={getImageUrl(centerClient.logo)}
                          alt={centerClient.organisation || 'Client logo'}
                          fill
                          className='object-contain'
                        />
                      ) : null}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Client Info Container - Positioned below with absolute positioning */}
                <div className='absolute bottom-0 left-0 right-0 w-full max-w-2xl mx-auto'>
                  {/* Navigation Arrows - Fixed Position */}
                  <div className='hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 z-10'>
                    <NavArrow
                      direction='left'
                      onClick={isAnimating ? noOp : handlePrev}
                      color={clientsColor}
                      ariaLabel='Previous client'
                      variant='outline'
                    />
                  </div>
                  <div className='hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 z-10'>
                    <NavArrow
                      direction='right'
                      onClick={isAnimating ? noOp : handleNext}
                      color={clientsColor}
                      ariaLabel='Next client'
                      variant='outline'
                    />
                  </div>
                  {/* Client Info - Centered */}
                  <AnimatePresence mode='wait'>
                    <motion.div
                      key={centerClient.id || currentIndex}
                      className='text-center'
                      initial={{ opacity: 0, y: 0 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      {centerClient.url ? (
                        <Link
                          href={centerClient.url}
                          target='_blank'
                          rel='noopener noreferrer'
                          style={{ color: clientsColor }}
                          className='inline-block'
                        >
                          <h3 className='font-semibold text-2xl lg:text-3xl'>
                            {centerClient.organisation}
                          </h3>
                          <p className='text-lg lg:text-xl text-gray-500'>
                            {centerClient.country}
                          </p>
                        </Link>
                      ) : (
                        <>
                          <h3 className='font-semibold text-lg text-gray-800'>
                            {centerClient.organisation}
                          </h3>
                          <p className='text-lg lg:text-xl text-gray-500'>
                            {centerClient.country}
                          </p>
                        </>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Right Clients (Smaller) - Side by Side */}
              {clients.length > 1 && (
                <div className='w-1/4 opacity-40 transform scale-85 transition-all duration-300 flex-row justify-center gap-6 hidden lg:flex items-center'>
                  {rightClients.map((client, idx) => (
                    <div
                      key={`right-${client.id || idx}`}
                      className='transition-all duration-300'
                    >
                      {renderSmallClient(client)}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
