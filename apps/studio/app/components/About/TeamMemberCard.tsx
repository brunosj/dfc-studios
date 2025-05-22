'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getImageUrl } from '@/app/utils/image';
import { Team } from '@payload-types';

interface TeamMemberCardProps {
  member: Team;
  index: number;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member, index }) => {
  const groupIndex = Math.floor(index / 3);
  const isEvenGroup = groupIndex % 2 === 0;
  const firstName = member?.name?.split(' ')[0];
  const lastName = member?.name?.split(' ')[1];
  return (
    <Link
      href={`/team/${member.slug}`}
      className='block relative mb-6 group cursor-pointer'
    >
      {/* Avatar image - positioned absolutely for offset effect */}
      <div
        className={`absolute z-10 w-32 h-32 lg:w-36 lg:h-36 overflow-hidden shrink-0 ${
          isEvenGroup
            ? 'group-hover:-rotate-6 -left-8'
            : 'group-hover:rotate-6 -right-8'
        } -top-12 lg:-top-16 transition-transform duration-500 ease-in-out`}
      >
        {member.avatar && (
          <Image
            src={getImageUrl(member.avatar)}
            alt={member.name}
            width={160}
            height={160}
            className='object-cover w-full h-full'
          />
        )}
      </div>

      {/* Main content card with yellow border */}
      <div className='relative border-2 rounded-md p-3 lg:p-6 pt-6 pb-4  border-dfc-yellow transition-colors overflow-hidden hover:bg-dfc-yellow duration-300 ease-in-out hover:dark:text-black'>
        {/* Name */}
        <div className={`flex w-full ${isEvenGroup ? 'pl-28' : 'pr-24'}`}>
          <div
            className={`inline-flex flex-col  transition-colors duration-500 ease-in-out`}
          >
            <h3 className='text-lg lg:text-xl leading-tight'>
              {firstName} <span className='font-bold'>{lastName}</span>
            </h3>
            {member.position && (
              <p className='text-sm lg:text-base  font-light'>
                {member.position}
              </p>
            )}
          </div>
        </div>

        {/* Bio section - takes full width under name and avatar */}
        <div className='prose prose-sm mt-5 pt-0 lg:pt-4 transition-colors duration-500 ease-in-out'>
          <div className='line-clamp-3'>
            {member.shortBio ? (
              <p className='text-sm lg:text-base'>{member.shortBio}</p>
            ) : (
              <p className='text-sm lg:text-base'>
                Team member at DFC Studios.
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TeamMemberCard;
