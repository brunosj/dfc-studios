import React from 'react';
import { Team, Media, Service as ServiceType, Color } from '@payload-types';
import Image from 'next/image';
import { RichText } from '@payloadcms/richtext-lexical/react';
import Service from '@/app/components/Service/Service';
import Milestone from '@/app/components/Milestone/Milestone';
import { fetchCollection } from '@/app/utils/fetchData';
import TeamMemberCardCompact from '@/app/components/Team/TeamMemberCardCompact';
import { getImageUrl } from '@/app/utils/image';
import { isColor } from '@/app/utils/isColor';

interface TeamContentProps {
  teamMember: Team;
}

interface HeadingWithLineProps {
  color: Color | null;
  text: string;
}

const isMedia = (value: string | Media): value is Media => {
  return typeof value !== 'string' && 'url' in value;
};

const isService = (value: string | ServiceType): value is ServiceType => {
  return typeof value !== 'string' && 'title' in value;
};

const HeadingWithLine: React.FC<HeadingWithLineProps> = ({ color, text }) => {
  const bgColor = isColor(color) ? color.hexCode : '#3B82F6';

  return (
    <div className='space-y-6 lg:space-y-12 mb-4 lg:mb-8'>
      <div className='relative h-1 w-full overflow-hidden rounded-full bg-gray-200'>
        <div
          className='absolute left-0 top-0 h-full rounded-full transition-all duration-300'
          style={{
            width: '100%',
            backgroundColor: bgColor,
          }}
        />
      </div>
      <h2 className='text-2xl font-semibold' style={{ color: bgColor }}>
        {text}
      </h2>
    </div>
  );
};

export default async function TeamContent({ teamMember }: TeamContentProps) {
  const {
    name,
    position,
    // email,
    longBio,
    avatar,
    normalPicture,
    sillyPicture,
    skillsList,
    nationality,
    languages,
    avatarColor,
    milestones,
  } = teamMember;

  // Fetch all team members
  const allTeamMembers = await fetchCollection<Team>('team', 100);
  const otherTeamMembers =
    allTeamMembers?.docs.filter((member) => member.id !== teamMember.id) || [];

  const validAvatarColor =
    avatarColor && isColor(avatarColor) ? avatarColor : null;

  // Determine picture display logic
  const hasNormalPicture = normalPicture && isMedia(normalPicture);
  const hasSillyPicture = sillyPicture && isMedia(sillyPicture);
  const hasAvatar = avatar && isMedia(avatar);
  const hasBothPictures = hasNormalPicture && hasSillyPicture;
  const showAvatarInMainColumn = !hasNormalPicture && !hasSillyPicture;
  const showAvatarAtTop = hasAvatar && (hasNormalPicture || hasSillyPicture);

  return (
    <div className='pageMy layout'>
      <div className='grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16'>
        {/* Left column - Images 
            Use negative margin to extend to the edge and a width calculation */}
        <div
          className='md:sticky md:top-24 md:self-start col-span-1 md:col-span-5 
                        md:ml-[calc(-5vw_-_0.5rem)]
                        md:w-[calc(100%_+_5vw)] pt-6 lg:pt-0'
        >
          {showAvatarInMainColumn && hasAvatar && (
            <div className='relative aspect-square w-3/4 overflow-hidden ml-16'>
              <Image
                src={getImageUrl(avatar)}
                alt={avatar.alt || name}
                fill
                className='object-cover'
              />
            </div>
          )}

          {hasBothPictures ? (
            <div className='relative aspect-square w-full overflow-hidden rounded-lg group'>
              {/* Normal picture (default) */}
              <Image
                src={getImageUrl(normalPicture)}
                alt={normalPicture.alt || `${name} - Normal`}
                fill
                className='object-cover transition-opacity duration-300 group-hover:opacity-0 '
              />
              {/* Silly picture (shown on hover) */}
              <Image
                src={getImageUrl(sillyPicture)}
                alt={sillyPicture.alt || `${name} - Silly`}
                fill
                className='object-cover absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 grayscale'
              />
            </div>
          ) : (
            <>
              {hasNormalPicture && (
                <div className='relative aspect-square w-full overflow-hidden rounded-lg'>
                  <Image
                    src={getImageUrl(normalPicture)}
                    alt={normalPicture.alt || `${name} - Normal`}
                    fill
                    className='object-cover grayscale'
                  />
                </div>
              )}

              {hasSillyPicture && (
                <div className='relative aspect-square w-full overflow-hidden rounded-lg'>
                  <Image
                    src={getImageUrl(sillyPicture)}
                    alt={sillyPicture.alt || `${name} - Silly`}
                    fill
                    className='object-cover'
                  />
                </div>
              )}
            </>
          )}
        </div>

        {/* Right column - Content */}
        <div className='col-span-1 md:col-span-7 space-y-6 lg:space-y-12'>
          <div className='relative'>
            {showAvatarAtTop && (
              <div className='absolute -top-3 lg:-top-8 right-0 w-16 h-16 md:w-24 md:h-24 overflow-hidden hover:rotate-6 duration-300 ease-in-out'>
                <Image
                  src={getImageUrl(avatar)}
                  alt={avatar.alt || name}
                  fill
                  className='object-cover'
                />
              </div>
            )}
            <h1 className='text-3xl lg:text-4xl font-bold mb-0 lg:mb-2'>
              {name}
            </h1>
            {position && <p className='text-lg lg:text-xl mb-4'>{position}</p>}
            {longBio && (
              <div className='prose max-w-none mt-6'>
                <RichText data={longBio} />
              </div>
            )}
          </div>

          {/* Key Details Section */}
          {((nationality && nationality.length > 0) ||
            (languages && languages.length > 0)) && (
            <div className='flex flex-col gap-2 mt-6'>
              <HeadingWithLine color={validAvatarColor} text='Key Details' />

              <div className='grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-x-0  lg:gap-x-4 gap-y-0 lg:gap-y-2'>
                {/* {email && (
                <>
                  <span className='font-medium'>Email:</span>
                  <a
                    href={`mailto:${email}`}
                    className='text-blue-600 hover:text-blue-800'
                  >
                    {email}
                  </a>
                </>
              )} */}
                {nationality && nationality.length > 0 && (
                  <>
                    <p className='font-medium'>Nationality:</p>
                    <p className='mt-2 lg:mt-0 ml-2 lg:ml-0'>{nationality}</p>
                  </>
                )}
                {languages && languages.length > 0 && (
                  <>
                    <p className='font-medium pt-3 lg:pt-0'>Languages:</p>
                    <ul className='flex flex-col gap-1 mt-2 lg:mt-0'>
                      {languages
                        .map((lang) => lang.language)
                        .filter(Boolean)
                        .map((language, index) => (
                          <li
                            key={index}
                            className='mb-0 leading-tight ml-2 lg:ml-0'
                          >
                            <p>{language}</p>
                          </li>
                        ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          )}

          {skillsList && skillsList.length > 0 && (
            <div className=''>
              <HeadingWithLine
                color={validAvatarColor}
                text='Skills & Expertise'
              />
              <div className='space-y-6'>
                {skillsList.map((skillGroup, index) => (
                  <div key={index} className='space-y-6'>
                    {skillGroup.primarySkills &&
                      isService(skillGroup.primarySkills) && (
                        <Service
                          service={skillGroup.primarySkills}
                          secondarySkills={skillGroup.secondarySkills}
                          avatarColor={validAvatarColor}
                        />
                      )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {milestones && milestones.length > 0 && (
            <div className=''>
              <HeadingWithLine
                color={validAvatarColor}
                text='Career Milestones'
              />
              <div className='space-y-2'>
                {milestones.map((milestone, index) => (
                  <Milestone
                    key={index}
                    year={milestone.milestoneYear || ''}
                    title={milestone.milestoneTitle || ''}
                    subtitle={milestone.milestoneSubtitle || undefined}
                    description={milestone.milestoneDescription || null}
                    avatarColor={validAvatarColor}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Other Team Members Section */}
      {otherTeamMembers.length > 0 && (
        <div className='pageMt'>
          <h2
            className='text-3xl font-bold mb-24 uppercase'
            style={{ color: validAvatarColor?.hexCode }}
          >
            Meet the Team
          </h2>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-16'>
            {otherTeamMembers.map((member, index) => (
              <TeamMemberCardCompact
                key={member.id}
                member={member}
                index={index}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
