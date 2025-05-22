import React from 'react';
import PortfolioContent from '@components/Portfolio/PortfolioContent';
import { Portfolio, SiteMetadatum } from '@payload-types';
import { notFound } from 'next/navigation';
import { fetchCollection, fetchGlobal } from '@/app/utils/fetchData';
import { generateMetadata as generatePageMetadata } from '@/app/components/common/Metadata';

/**
 * Fetch the portfolio data
 */
async function getPortfolio(): Promise<Portfolio | null> {
  const data = await fetchCollection<Portfolio>('portfolio', 1);

  if (!data?.docs || data.docs.length === 0) {
    return null;
  }

  return data.docs[0] || null;
}

// Generate metadata for SEO
export async function generateMetadata() {
  const [page, siteMetadata] = await Promise.all([
    getPortfolio(),
    fetchGlobal<SiteMetadatum>('site-metadata'),
  ]);

  return generatePageMetadata({
    title: page?.meta?.title || undefined,
    description: page?.meta?.description || undefined,
    siteMetadata,
    pageImage: page?.meta?.image,
    fallbackTitle: 'Our Work - DFC Studios',
    fallbackDescription: 'Explore our portfolio of work',
  });
}

export default async function PortfolioPage() {
  try {
    const portfolio = await getPortfolio();

    if (!portfolio) {
      return notFound();
    }

    return <PortfolioContent portfolio={portfolio} />;
  } catch (error) {
    console.error('Error rendering page:', error);
    return notFound();
  }
}
