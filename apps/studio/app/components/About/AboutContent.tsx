import React from 'react';
import { About, Team } from '@payload-types';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import Heading from '../common/Heading';
import TeamMemberCard from './TeamMemberCard';
import AnimatedText from '@/app/components/Homepage/AnimatedText';

interface AboutContentProps {
  about: About;
}

const AboutContent: React.FC<AboutContentProps> = ({ about }) => {
  const heroTitle = about.heroTitle || 'About Us';

  // Create a star icon for the end of the text
  const starIcon = (
    <span className='h-4 w-4 lg:h-6 lg:w-6 inline-block ml-1 mt-1 align-top text-dfc-hero-color1 duration-300 transition-opacity'>
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256'>
        <path
          fill='currentColor'
          d='m212.45 107.14l-65.19 26.08l46.21 59.41a12 12 0 1 1-18.94 14.74L128 147.55l-46.53 59.82a12 12 0 0 1-18.94-14.74l46.21-59.41l-65.19-26.08a12 12 0 1 1 8.91-22.28L116 110.28V40a12 12 0 0 1 24 0v70.28l63.54-25.42a12 12 0 1 1 8.91 22.28'
        />
      </svg>
    </span>
  );

  // Custom component to render the hero title with colored words
  const CustomHeroTitle = () => {
    const words = heroTitle.split(' ');

    return (
      <h1 className='mb-4 text-4xl md:text-6xl uppercase font-bold relative'>
        {words.map((word, index, array) => {
          // First word in teal
          if (index === 0) {
            return (
              <AnimatedText
                key={index}
                text={word}
                el='span'
                className='text-dfc-hero-color1 inline-block mr-2'
                animation={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.3, delay: index * 0.1 },
                  },
                }}
              />
            );
          }
          // Last word in red
          else if (index === array.length - 1) {
            return (
              <AnimatedText
                key={index}
                text={word}
                el='span'
                className='text-dfc-hero-color2 inline-block'
                animation={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.3, delay: index * 0.1 },
                  },
                }}
                icon={starIcon}
              />
            );
          }
          // Middle words in default color
          else {
            return (
              <AnimatedText
                key={index}
                text={word}
                el='span'
                className='inline-block mr-2'
                animation={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.3, delay: index * 0.1 },
                  },
                }}
              />
            );
          }
        })}
      </h1>
    );
  };

  return (
    <article className='pageMy relative'>
      {/* About-specific decorative elements */}
      <div className='absolute inset-0 pointer-events-none overflow-hidden'>
        {/* Abstract shapes in brand colors */}
        <div className='absolute top-32 right-[-15%] opacity-10 dark:opacity-10'>
          <svg
            width='480'
            height='480'
            viewBox='0 0 100 100'
            xmlns='http://www.w3.org/2000/svg'
          >
            <circle
              cx='50'
              cy='50'
              r='25'
              fill='none'
              stroke='var(--color-dfc-teal)'
              strokeWidth='0.3'
            />
            <circle
              cx='50'
              cy='50'
              r='40'
              fill='none'
              stroke='var(--color-dfc-teal)'
              strokeWidth='0.3'
            />
            <circle
              cx='50'
              cy='50'
              r='15'
              fill='none'
              stroke='var(--color-dfc-red)'
              strokeWidth='0.3'
            />
          </svg>
        </div>
      </div>

      <div className='layout'>
        {/* Hero Section */}
        <div className='sectionPy'>
          <CustomHeroTitle />

          <div className='py-6 lg:pt-12 prose max-w-none  gap-6 lg:gap-12 grid grid-cols-1 lg:grid-cols-3'>
            {about.heroFirstParagraph && (
              <RichText
                data={about.heroFirstParagraph as SerializedEditorState}
              />
            )}
            {about.heroSecondParagraph && (
              <RichText
                data={about.heroSecondParagraph as SerializedEditorState}
              />
            )}
            {about.heroThirdParagraph && (
              <RichText
                data={about.heroThirdParagraph as SerializedEditorState}
              />
            )}
          </div>
        </div>

        {/* Team Section */}
        <div className=''>
          <Heading color='dfc-teal'>{about.teamTitle || 'Our Team'}</Heading>

          <div className='mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8 lg:gap-y-16 px-4 pt-6'>
            {about.teamMembers?.map((member, index) => {
              return (
                <TeamMemberCard
                  key={index}
                  member={member as Team}
                  index={index}
                />
              );
            })}
          </div>
        </div>
      </div>
    </article>
  );
};

export default AboutContent;
