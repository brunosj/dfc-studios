import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getImageUrl } from '@/app/utils/image';
import { Team } from '@payload-types';

interface TeamMemberCardCompactProps {
  member: Team;
  index: number;
}

const TeamMemberCardCompact: React.FC<TeamMemberCardCompactProps> = ({
  member,
}) => {
  return (
    <>
      <Link
        href={`/team/${member.slug}`}
        className='block relative mb-6 group cursor-pointer'
      >
        {/* Avatar image - centered at top */}
        <div className='absolute z-10 w-24 h-24 overflow-hidden shrink-0 left-1/2 -translate-x-1/2 -top-16 transition-transform duration-500 ease-in-out group-hover:rotate-6'>
          {member.avatar && (
            <Image
              src={getImageUrl(member.avatar)}
              alt={member.name}
              width={96}
              height={96}
              className='object-cover w-full h-full'
            />
          )}
        </div>

        {/* Main content card with yellow border */}
        <div className='relative border-2 rounded-md p-4 pt-8 pb-2 flex flex-col border-dfc-yellow transition-colors overflow-hidden group-hover:bg-dfc-yellow duration-300 ease-in-out hover:dark:text-black'>
          {/* Name - centered */}
          <div className='text-center transition-colors duration-500 ease-in-out pt-2'>
            <h3 className='text-lg leading-tight'>
              {member.name?.split(' ')[0]}{' '}
              <span className='font-bold'>{member.name?.split(' ')[1]}</span>
            </h3>
            {member.position && (
              <p className='text-sm lg:text-base  font-light mt-1 lg:mt-2 leading-tight'>
                {member.position}
              </p>
            )}
          </div>
        </div>
      </Link>
    </>
  );
};

export default TeamMemberCardCompact;
