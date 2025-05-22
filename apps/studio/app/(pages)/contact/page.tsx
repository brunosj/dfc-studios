import React from 'react';
import ContactContent from '@components/Contact/ContactContent';
import { Contact } from '@payload-types';
import { notFound } from 'next/navigation';
import { fetchCollection, fetchGlobal } from '@/app/utils/fetchData';
import { SiteMetadatum } from '@payload-types';
import { generateMetadata as generatePageMetadata } from '@/app/components/common/Metadata';

/**
 * Fetch the contact data
 */
async function getContact(): Promise<Contact | null> {
  const data = await fetchCollection<Contact>('contact', 1, undefined);

  if (!data?.docs || data.docs.length === 0) {
    return null;
  }

  return data.docs[0] || null;
}

// Generate metadata for SEO
export async function generateMetadata() {
  const [page, siteMetadata] = await Promise.all([
    getContact(),
    fetchGlobal<SiteMetadatum>('site-metadata'),
  ]);

  return generatePageMetadata({
    title: page?.meta?.title || undefined,
    description: page?.meta?.description || undefined,
    siteMetadata,
    pageImage: page?.meta?.image,
    fallbackTitle: 'Contact Us - DFC Studios',
    fallbackDescription: 'Get in touch with DFC Studios',
  });
}

export default async function ContactPage() {
  try {
    const contact = await getContact();

    if (!contact) {
      return notFound();
    }

    return <ContactContent contact={contact} />;
  } catch (error) {
    console.error('Error rendering contact:', error);
    return notFound();
  }
}
