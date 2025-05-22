import React from 'react';
import { notFound } from 'next/navigation';
import TeamContent from '@/app/components/Team/TeamContent';
import {
  fetchCollection,
  getTeamBySlug,
  fetchGlobal,
} from '@/app/utils/fetchData';
import { Team, SiteMetadatum } from '@payload-types';
import { generateMetadata as generatePageMetadata } from '@/app/components/common/Metadata';

/**
 * Generate static params for all published team members
 */
export async function generateStaticParams() {
  try {
    const data = await fetchCollection<Team>('team', 100);

    if (!data?.docs) {
      return [];
    }

    // Only include team members that have a slug
    return data.docs
      .filter((teamMember) => teamMember.slug)
      .map((teamMember) => ({
        slug: teamMember.slug,
      }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const [teamMember, siteMetadata] = await Promise.all([
    getTeamBySlug<Team>(resolvedParams.slug),
    fetchGlobal<SiteMetadatum>('site-metadata'),
  ]);

  if (!teamMember) {
    return generatePageMetadata({
      title: 'Team Member Not Found',
      description: 'The requested team member could not be found.',
      siteMetadata,
      fallbackTitle: 'Team Member Not Found - DFC Studios',
      fallbackDescription: 'The requested team member could not be found.',
    });
  }

  return generatePageMetadata({
    title: `${teamMember.name} - DFC Studios`,
    description: teamMember.shortBio || undefined,
    siteMetadata,
    pageImage: teamMember.normalPicture || teamMember.avatar,
    fallbackTitle: `${teamMember.name} - DFC Studios`,
    fallbackDescription:
      teamMember.shortBio || 'Learn more about our team member',
  });
}

export default async function TeamMemberPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  try {
    const resolvedParams = await params;
    const teamMember = await getTeamBySlug<Team>(resolvedParams.slug);

    if (!teamMember) {
      return notFound();
    }

    return <TeamContent teamMember={teamMember} />;
  } catch (error) {
    console.error('Error rendering team member page:', error);
    return notFound();
  }
}
