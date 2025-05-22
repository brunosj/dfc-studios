'use client';

import React, { useState } from 'react';
import { Homepage, Service } from '@payload-types';
import ServicesMegaphone from './ServicesMegaphone';
import { RichText } from '@payloadcms/richtext-lexical/react';
import Button from '@/app/components/common/Button';
import { useMetadata } from '@/app/contexts/MetadataContext';
import Heading from '@/app/components/common/Heading';
import AnimationContainer from '@/app/components/common/AnimationContainer';
import NavArrow from '@/app/components/common/NavArrow';
import AnimatedLogo from './AnimatedLogo';

interface ServicesSectionProps {
  homepage: Homepage;
  services?: Service[];
}

const ServicesSection: React.FC<ServicesSectionProps> = ({
  homepage,
  services = [],
}) => {
  const { metadata } = useMetadata();
  const [selectedService, setSelectedService] = useState<string | undefined>(
    'information-design'
  );

  // const servicesColor =
  //   typeof homepage.servicesColor === 'object'
  //     ? homepage.servicesColor?.hexCode
  //     : 'var(--color-dfc-teal)';

  const servicesColor = 'var(--color-dfc-teal)';

  // Service IDs in order for navigation
  const serviceIds = [
    'information-design',
    'layouting',
    'illustration',
    'branding',
    'web',
  ];

  const handleServiceClick = (id: string) => {
    setSelectedService(id);
  };

  // Navigate to previous service
  const handlePrevious = () => {
    const currentIndex = selectedService
      ? serviceIds.indexOf(selectedService)
      : 0;
    // Get previous service or loop to the end
    const prevIndex =
      currentIndex <= 0 ? serviceIds.length - 1 : currentIndex - 1;
    setSelectedService(serviceIds[prevIndex]);
  };

  // Navigate to next service
  const handleNext = () => {
    const currentIndex = selectedService
      ? serviceIds.indexOf(selectedService)
      : 0;
    // Get next service or loop to the beginning
    const nextIndex =
      currentIndex >= serviceIds.length - 1 ? 0 : currentIndex + 1;
    setSelectedService(serviceIds[nextIndex]);
  };

  const getServiceContent = () => {
    if (!selectedService || !services || services.length === 0) {
      return (
        <div className='flex flex-col justify-center h-full'>
          <p className='text-gray-500 italic'>
            Select a service to view details
          </p>
        </div>
      );
    }

    const service = services.find(
      (s) => s.id === selectedService || s.slug === selectedService
    );

    if (!service) {
      return (
        <div className='flex flex-col justify-center h-full'>
          <p className='text-gray-500 italic'>Service information not found</p>
        </div>
      );
    }

    return (
      <div key={`service-container-${service.id || service.slug}`}>
        <AnimationContainer
          animationType='slide'
          fadeInFrom='right'
          duration={0.4}
        >
          <h3
            className='text-xl lg:text-2xl font-bold mb-2 lg:mb-4'
            style={{ color: servicesColor }}
          >
            {service.title}
          </h3>
          {service.longDescription && (
            <div className='prose prose-sm lg:prose-base'>
              <RichText data={service.longDescription} />
            </div>
          )}

          <div className='mt-6 lg:mt-10 flex gap-4 flex-wrap'>
            <Button
              label='See our work'
              href={`/our-work/#${service.slug}`}
              color={servicesColor}
              variant='outline'
            />
          </div>
        </AnimationContainer>
      </div>
    );
  };

  return (
    <section className='sectionPy pageMt'>
      <div className='layout mx-auto lg:grid grid-cols-1 md:grid-cols-5 gap-x-8 lg:gap-x-16 gap-y-8 lg:gap-y-16 space-y-8 lg:space-y-0'>
        <div className='col-span-3'>
          {metadata && (
            <div className='uppercase mb-6'>
              <p
                className='text-xl lg:text-2xl font-light'
                style={{ color: servicesColor }}
              >
                {metadata.title}:
              </p>
              <Heading color={servicesColor}>{metadata.tagline}</Heading>
            </div>
          )}

          {homepage.servicesText && (
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-0 lg:gap-6 pt-6 lg:pt-0'>
              {homepage.servicesText.firstParagraph && (
                <p className=' mb-4'>{homepage.servicesText.firstParagraph}</p>
              )}
              {homepage.servicesText.secondParagraph && (
                <p className=''>{homepage.servicesText.secondParagraph}</p>
              )}
            </div>
          )}
        </div>
        <div className='col-span-2 m-auto  w-full lg:w-3/4 h-full pb-12 lg:pb-0'>
          <AnimatedLogo />
        </div>

        <div className='col-span-3 relative space-y-8 lg:space-y-0'>
          {homepage.servicesUSP && (
            <div className='lg:hidden'>
              <Heading color={servicesColor}>{homepage.servicesUSP}</Heading>
            </div>
          )}

          <div className='relative space-y-8 lg:space-y-0'>
            {homepage.servicesUSP && (
              <div className='hidden lg:block z-10'>
                <Heading color={servicesColor}>{homepage.servicesUSP}</Heading>
              </div>
            )}
            <ServicesMegaphone
              selectedId={selectedService}
              onServiceClick={handleServiceClick}
              // color={servicesColor}
            />

            {/* Navigation Arrows */}
            <div className='absolute bottom-0 lg:bottom-4 right-8 flex gap-2'>
              <NavArrow
                direction='left'
                onClick={handlePrevious}
                color={servicesColor}
                ariaLabel='Previous service'
                variant='outline'
              />
              <NavArrow
                direction='right'
                onClick={handleNext}
                color={servicesColor}
                ariaLabel='Next service'
                variant='outline'
              />
            </div>
          </div>
        </div>
        <div className='col-span-2 pt-6 lg:pt-0'>{getServiceContent()}</div>
      </div>
    </section>
  );
};

export default ServicesSection;
