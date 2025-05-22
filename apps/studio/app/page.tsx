import React from 'react';
import HomepageContent from '@components/Homepage/HomepageContent';
import { Homepage, Service, Testimonial, SiteMetadatum } from '@payload-types';
import { notFound } from 'next/navigation';
import { fetchCollection, fetchGlobal } from '@/app/utils/fetchData';
import { generateMetadata as generatePageMetadata } from '@/app/components/common/Metadata';

/**
 * Fetch the homepage data
 */
async function getHomepage(): Promise<Homepage | null> {
  try {
    // Using standard collection fetch with higher depth parameter
    const data = await fetchCollection<Homepage>('homepage', 1);

    if (!data?.docs || data.docs.length === 0) {
      console.error('[getHomepage] No homepage data found');
      return null;
    }

    return data.docs[0];
  } catch (error) {
    console.error('[getHomepage] Error fetching homepage:', error);
    return null;
  }
}

/**
 * Fetch all services
 */
async function getServices(): Promise<Service[]> {
  const data = await fetchCollection<Service>('services', 100);

  if (!data?.docs) {
    return [];
  }

  return data.docs;
}

/**
 * Fetch all testimonials
 */
async function getTestimonials(): Promise<Testimonial[]> {
  const data = await fetchCollection<Testimonial>('testimonials', 100);

  if (!data?.docs) {
    return [];
  }

  return data.docs;
}

// Generate metadata for SEO
export async function generateMetadata() {
  const [page, siteMetadata] = await Promise.all([
    getHomepage(),
    fetchGlobal<SiteMetadatum>('site-metadata'),
  ]);

  return generatePageMetadata({
    title: page?.meta?.title || undefined,
    description: page?.meta?.description || undefined,
    siteMetadata,
    pageImage: page?.meta?.image,
    fallbackTitle: 'DFC Studios',
    fallbackDescription: 'Welcome to DFC Studios',
  });
}

export default async function Home() {
  try {
    const homepage = await getHomepage();
    const services = await getServices();
    const testimonials = await getTestimonials();
    if (!homepage) {
      return notFound();
    }

    return (
      <HomepageContent
        homepage={homepage}
        services={services}
        testimonials={testimonials}
      />
    );
  } catch (error) {
    console.error('Error rendering page:', error);
    return notFound();
  }
}
