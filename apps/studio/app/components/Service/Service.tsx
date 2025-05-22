import React from 'react';
import { Service as ServiceType, Color } from '@payload-types';
import { isColor } from '@/app/utils/isColor';

interface ServiceProps {
  service: ServiceType;
  secondarySkills?:
    | {
        skill?: string | null;
        skillLevel?:
          | (
              | '1-2 years'
              | '2-5 years'
              | '5-10 years'
              | '10+ years'
              | '20+ years'
            )
          | null;
        id?: string | null;
      }[]
    | null;
  avatarColor?: Color | null;
}

const getExperienceWidth = (years: string): string => {
  switch (years) {
    case '1-2 years':
      return '60%';
    case '2-5 years':
      return '70%';
    case '5-10 years':
      return '80%';
    case '10+ years':
      return '90%';
    case '20+ years':
      return '100%';
    default:
      return '60%';
  }
};

export default function Service({
  service,
  secondarySkills,
  avatarColor,
}: ServiceProps) {
  const { title, shortDescription } = service;
  const bgColor = isColor(avatarColor) ? avatarColor.hexCode : '#3B82F6';

  return (
    <div className='space-y-2'>
      <div className='flex items-center justify-between'>
        <h4 className='text-lg font-semibold'>{title}</h4>
      </div>
      {shortDescription && <p className='text-gray-600'>{shortDescription}</p>}
      <div className='relative h-1 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-600'>
        <div
          className='absolute left-0 top-0 h-full rounded-full transition-all duration-300 bg-gray-200 dark:bg-gray-600'
          style={{
            width: '100%',
          }}
        />
      </div>

      {/* Secondary skills */}
      {secondarySkills && secondarySkills.length > 0 && (
        <div className='space-y-4 mt-2'>
          <div className='grid grid-cols-2 gap-6'>
            {secondarySkills.map((skill, skillIndex) => (
              <div key={skillIndex} className='space-y-2'>
                <p className='font-medium leading-none lg:leading-normal'>
                  {skill.skill}
                </p>
                {skill.skillLevel && (
                  <div className='relative h-6 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-600'>
                    <div
                      className='absolute left-0 top-0 h-full rounded-full transition-all duration-300'
                      style={{
                        width: getExperienceWidth(skill.skillLevel),
                        backgroundColor: bgColor,
                      }}
                    />
                    <span className='absolute left-3 top-1/2 -translate-y-1/2 text-xs font-medium text-white'>
                      {skill.skillLevel}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
