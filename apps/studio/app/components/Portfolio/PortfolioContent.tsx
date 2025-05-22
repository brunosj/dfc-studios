'use client';
import React, { useState, useMemo, useEffect } from 'react';
import { Portfolio, Service } from '@payload-types';
import { RichText } from '@payloadcms/richtext-lexical/react';
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import Heading from '../common/Heading';
import UnderlineLink from '../common/UnderlineLink';
import { usePathname } from 'next/navigation';
import ProjectCard from './ProjectCard';

interface PortfolioContentProps {
  portfolio: Portfolio;
}

const PortfolioContent: React.FC<PortfolioContentProps> = ({ portfolio }) => {
  const pathname = usePathname();
  const [selectedService, setSelectedService] = useState<string | null>(null);

  // Get all unique services from projects
  const services = useMemo(() => {
    const serviceMap = new Map<string, Service>();
    portfolio.featuredProjects?.forEach((project) => {
      if (typeof project !== 'string' && project.tags) {
        project.tags.forEach((tag) => {
          if (typeof tag !== 'string' && !serviceMap.has(tag.id)) {
            serviceMap.set(tag.id, tag);
          }
        });
      }
    });
    return Array.from(serviceMap.values());
  }, [portfolio.featuredProjects]);

  // Check for service slug in URL hash on component mount and when pathname changes
  useEffect(() => {
    // Function to handle hash changes
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);

      if (hash) {
        // Find the service that matches the slug in the hash
        const serviceMatch = services.find((service) => service.slug === hash);
        if (serviceMatch) {
          setSelectedService(serviceMatch.id);
        }
      } else {
        // If hash is removed, reset to showing all projects
        setSelectedService(null);
      }
    };

    // Initial check
    handleHashChange();

    // Add event listener for hash changes
    window.addEventListener('hashchange', handleHashChange);

    // Clean up
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [services, pathname]); // Add pathname as dependency to respond to route changes

  // Filter projects based on selected service
  const filteredProjects = useMemo(() => {
    if (!selectedService) return portfolio.featuredProjects || [];

    return (
      portfolio.featuredProjects?.filter((project) => {
        if (typeof project === 'string') return false;
        return project.tags?.some(
          (tag) => typeof tag !== 'string' && tag.id === selectedService
        );
      }) || []
    );
  }, [portfolio.featuredProjects, selectedService]);

  return (
    <article className='pageMy relative'>
      {/* Portfolio-specific decorative elements */}
      <div className='absolute inset-0 pointer-events-none overflow-hidden'>
        {/* Subtle wave pattern at the top */}
        <div className='absolute -top-12 left-0 w-full h-[200px] opacity-[0.035] dark:opacity-[0.035]'>
          <svg
            viewBox='0 0 1440 320'
            xmlns='http://www.w3.org/2000/svg'
            preserveAspectRatio='none'
          >
            <path
              fill='currentColor'
              fillOpacity='1'
              d='M0,128L48,138.7C96,149,192,171,288,186.7C384,203,480,213,576,197.3C672,181,768,139,864,122.7C960,107,1056,117,1152,138.7C1248,160,1344,192,1392,208L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z'
            ></path>
          </svg>
        </div>
      </div>

      <div className='sectionPy layout'>
        {/* Projects Title and Description */}
        <div className='mb-12'>
          <Heading color='dfc-teal'>
            {portfolio.projectsTitle || 'Our Work'}
          </Heading>
          {portfolio.projectsDescription && (
            <div className='mt-4 prose max-w-none'>
              <RichText
                data={portfolio.projectsDescription as SerializedEditorState}
              />
            </div>
          )}
        </div>

        {/* Filter Section */}
        <div className='mb-6 lg:mb-12'>
          <div className='flex flex-wrap gap-x-6 gap-y-2 lg:gap-x-8 lg:gap-y-4'>
            <UnderlineLink
              isActive={selectedService === null}
              color='dfc-teal'
              onClick={() => setSelectedService(null)}
            >
              All Projects
            </UnderlineLink>
            {services.map((service) => (
              <UnderlineLink
                key={service.id}
                isActive={selectedService === service.id}
                color='dfc-teal'
                className=''
                onClick={() => setSelectedService(service.id)}
              >
                {service.title}
              </UnderlineLink>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {filteredProjects.map((project) => (
            <ProjectCard
              key={typeof project !== 'string' ? project.id : project}
              project={project}
            />
          ))}
        </div>
      </div>
    </article>
  );
};

export default PortfolioContent;
