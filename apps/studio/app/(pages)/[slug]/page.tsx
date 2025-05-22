import React from 'react';
import { notFound } from 'next/navigation';
import GenericPageContent from '@/app/components/GenericPage/GenericPageContent';
import {
  fetchCollection,
  getPageBySlug,
  fetchGlobal,
} from '@/app/utils/fetchData';
import { Page, SiteMetadatum } from '@payload-types';
import { generateMetadata as generatePageMetadata } from '@/app/components/common/Metadata';

/**
 * Generate static params for all published pages
 */
export async function generateStaticParams() {
  try {
    const data = await fetchCollection<Page>('pages', 100);

    if (!data?.docs) {
      return [];
    }

    // Only include pages that have a slug
    return data.docs
      .filter((page) => page.slug)
      .map((page) => ({
        slug: page.slug,
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
  const [page, siteMetadata] = await Promise.all([
    getPageBySlug<Page>(resolvedParams.slug),
    fetchGlobal<SiteMetadatum>('site-metadata'),
  ]);

  if (!page) {
    return generatePageMetadata({
      title: 'Page Not Found',
      description: 'The requested page could not be found.',
      siteMetadata,
      fallbackTitle: 'Page Not Found - DFC Studios',
      fallbackDescription: 'The requested page could not be found.',
    });
  }

  return generatePageMetadata({
    title: page.meta?.title || undefined,
    description: page.meta?.description || undefined,
    siteMetadata,
    pageImage: page.meta?.image,
    fallbackTitle: `${page.title} - DFC Studios`,
    fallbackDescription:
      page.meta?.description || 'Learn more about DFC Studios',
  });
}

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  try {
    const resolvedParams = await params;
    const page = await getPageBySlug<Page>(resolvedParams.slug);

    if (!page) {
      return notFound();
    }

    return <GenericPageContent page={page} />;
  } catch (error) {
    console.error('Error rendering page:', error);
    return notFound();
  }
}
