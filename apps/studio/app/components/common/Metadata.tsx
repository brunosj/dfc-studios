import { Metadata } from 'next';
import { SiteMetadatum, Media } from '@payload-types';

interface MetadataProps {
  title?: string;
  description?: string;
  siteMetadata: SiteMetadatum | null;
  pageImage?: Media | string | null;
  fallbackTitle?: string;
  fallbackDescription?: string;
}

export async function generateMetadata({
  title,
  description,
  siteMetadata,
  pageImage,
  fallbackTitle = 'DFC Studios',
  fallbackDescription = 'Designers For Climate Studios',
}: MetadataProps): Promise<Metadata> {
  const finalTitle = title || siteMetadata?.title || fallbackTitle;
  const finalDescription =
    description || siteMetadata?.description || fallbackDescription;

  // Helper function to get image URL and alt text
  const getImageData = (image: Media | string | null | undefined) => {
    if (!image || typeof image === 'string') return null;

    const imageUrl = image.sizes?.og?.url || image.url;
    if (!imageUrl) return null;

    return {
      url: imageUrl,
      width: 1200,
      height: 630,
      alt: finalTitle,
    };
  };

  // Try to use page-specific image first, then fall back to site metadata image
  const imageData =
    getImageData(pageImage) || getImageData(siteMetadata?.ogImage);

  return {
    title: finalTitle,
    description: finalDescription,
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      images: imageData ? [imageData] : undefined,
    },
  };
}
