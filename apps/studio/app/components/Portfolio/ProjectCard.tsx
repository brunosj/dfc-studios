import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { Project, Service } from '@payload-types';
import { getImageUrl } from '@utils/image';
import { motion, AnimatePresence } from 'motion/react';

interface ProjectCardProps {
  project: Project | string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // If project is a string reference, we can't render anything meaningful
  const isValidProject = typeof project !== 'string';

  // Get all available images from the images array
  const allImages = useMemo(() => {
    if (!isValidProject) return [];

    // Only use images from the images array
    return (project.images || []).filter(
      (img) => img !== null && img !== undefined
    );
  }, [isValidProject, project]);

  // Auto-rotate images every 4 seconds
  useEffect(() => {
    if (!isValidProject) return;

    let interval: NodeJS.Timeout;

    if (allImages.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === allImages.length - 1 ? 0 : prevIndex + 1
        );
      }, 4000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [allImages.length, isValidProject]);

  // Go to next/previous image
  const goToNextImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) =>
      prevIndex === allImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? allImages.length - 1 : prevIndex - 1
    );
  };

  // Extract tags for display
  const projectTags = useMemo(() => {
    if (!isValidProject || !project.tags) return [];
    return project.tags.filter(
      (tag): tag is Service => typeof tag !== 'string'
    );
  }, [isValidProject, project]);

  // Early return if we don't have a valid project
  if (!isValidProject) return null;

  return (
    <div className='group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-sm transition-all duration-300'>
      {/* Image carousel */}
      <div className='relative aspect-[4/3] overflow-hidden'>
        {allImages.length > 0 ? (
          <>
            <AnimatePresence mode='wait'>
              <motion.div
                key={currentImageIndex}
                className='absolute inset-0'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                <Image
                  src={getImageUrl(allImages[currentImageIndex]) || ''}
                  alt={project.title}
                  fill
                  className='object-cover transform group-hover:scale-105 transition-transform duration-700'
                />
              </motion.div>
            </AnimatePresence>

            {/* Navigation arrows - enhanced styling */}
            {allImages.length > 1 && (
              <>
                <motion.button
                  onClick={goToPrevImage}
                  className='absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center z-10
                    bg-white/30 backdrop-blur-sm border border-white/50 opacity-0 group-hover:opacity-90 transition-opacity duration-300 group-hover:cursor-pointer'
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    // boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)',
                  }}
                  transition={{ duration: 0.2 }}
                  aria-label='Previous image'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='rgba(0, 0, 0, 0.8)'
                    strokeWidth='2.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='drop-shadow-md'
                  >
                    <path d='m15 18-6-6 6-6' />
                  </svg>
                </motion.button>
                <motion.button
                  onClick={goToNextImage}
                  className='absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center z-10
                    bg-white/30 backdrop-blur-sm border border-white/50 opacity-0 group-hover:opacity-90 transition-opacity duration-300 group-hover:cursor-pointer'
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)',
                  }}
                  transition={{ duration: 0.2 }}
                  aria-label='Next image'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='rgba(0, 0, 0, 0.8)'
                    strokeWidth='2.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='drop-shadow-md'
                  >
                    <path d='m9 18 6-6-6-6' />
                  </svg>
                </motion.button>
              </>
            )}

            {/* Indicator dots - only show when multiple images */}
            {/* {allImages.length > 1 && (
              <div className='absolute bottom-3 left-0 right-0 flex justify-center gap-2 z-10'>
                {allImages.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      goToImage(index);
                    }}
                    className='rounded-full'
                    initial={false}
                    animate={{
                      width: currentImageIndex === index ? 24 : 8,
                      height: 8,
                      backgroundColor:
                        currentImageIndex === index
                          ? 'rgba(255, 255, 255, 1)'
                          : 'rgba(255, 255, 255, 0.6)',
                    }}
                    whileHover={{
                      backgroundColor:
                        currentImageIndex === index
                          ? 'rgba(255, 255, 255, 1)'
                          : 'rgba(255, 255, 255, 0.8)',
                      scale: 1.1,
                    }}
                    transition={{ duration: 0.3 }}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            )} */}
          </>
        ) : (
          <div className='w-full h-full bg-gray-200 flex items-center justify-center'>
            <span className=''>No image</span>
          </div>
        )}

        {/* Tags overlay */}
        {projectTags.length > 0 && (
          <div className='absolute top-0 left-0 p-3 z-10 flex flex-wrap gap-2 max-w-[80%]'>
            {projectTags.slice(0, 3).map((tag) => (
              <div
                key={tag.id}
                className='px-3 py-1 text-xs font-medium rounded-full bg-white/80 backdrop-blur-sm text-gray-800 shadow-sm'
              >
                {tag.title}
              </div>
            ))}
            {projectTags.length > 3 && (
              <div className='px-3 py-1 text-xs font-medium rounded-full bg-white/80 backdrop-blur-sm text-gray-800 shadow-sm'>
                +{projectTags.length - 3}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Content section with modern styling */}
      <div className='p-5'>
        <h2 className='text-xl font-bold mb-2 text-gray-800 dark:text-white group-hover:text-dfc-teal transition-colors duration-300'>
          {project.title}
        </h2>

        <p className='text-gray-600 dark:text-gray-300 line-clamp-2 mb-3 text-sm'>
          {project.shortDescription}
        </p>

        {/* Year/date display */}
        {project.date && (
          <div className='text-xs font-medium text-gray-500 dark:text-gray-400 mt-auto flex items-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-4 w-4 mr-1 opacity-70'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
              />
            </svg>
            {new Date(project.date).getFullYear()}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
