import React from 'react';
import AboutContent from '@components/About/AboutContent';
import { About } from '@payload-types';
import { notFound } from 'next/navigation';
import { fetchCollection, fetchGlobal } from '@/app/utils/fetchData';
import { SiteMetadatum } from '@payload-types';
import { generateMetadata as generatePageMetadata } from '@/app/components/common/Metadata';

/**
 * Fetch the about data
 */
async function getAbout(): Promise<About | null> {
  const data = await fetchCollection<About>('about', 1, undefined);

  if (!data?.docs || data.docs.length === 0) {
    return null;
  }

  return data.docs[0] || null;
}

// Generate metadata for SEO
export async function generateMetadata() {
  const [page, siteMetadata] = await Promise.all([
    getAbout(),
    fetchGlobal<SiteMetadatum>('site-metadata'),
  ]);

  return generatePageMetadata({
    title: page?.meta?.title || undefined,
    description: page?.meta?.description || undefined,
    siteMetadata,
    pageImage: page?.meta?.image,
    fallbackTitle: 'About Us - DFC Studios',
    fallbackDescription: 'Learn more about DFC Studios',
  });
}

export default async function AboutPage() {
  try {
    const about = await getAbout();

    if (!about) {
      return notFound();
    }

    return <AboutContent about={about} />;
  } catch (error) {
    console.error('Error rendering about:', error);
    return notFound();
  }
}
